/**
 * LUCENTE Milano — Table Order & Live Synchronization Engine
 * Hybrid Architecture: Real-time Firestore Sync + Local BroadcastChannel Fallback
 */

import { db } from '../firebase/config.js';
import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  query, 
  where, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';

const LOCAL_STORAGE_ORDERS_KEY = 'lucente_live_table_orders';
const LOCAL_STORAGE_CALLS_KEY = 'lucente_live_service_calls';

// Cross-tab zero-latency channel
const channel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('lucente_kitchen_sync')
  : null;

/**
 * Generate a luxury table order reference (e.g. LUC-T04-8291)
 */
export function generateTableOrderRef(tableId = '01') {
  const cleanId = String(tableId).toUpperCase().padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `LUC-T${cleanId}-${randomSuffix}`;
}

// =========================================================================
// LOCAL STORAGE HELPERS (Guarantees zero-lag fallback offline / standalone)
// =========================================================================
function getLocalOrders() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalOrders(orders) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    if (channel) channel.postMessage({ type: 'ORDERS_UPDATED', orders });
    window.dispatchEvent(new CustomEvent('lucente:table-orders-changed', { detail: { orders } }));
  } catch (e) {
    console.error('LUCENTE LocalStorage save error:', e);
  }
}

function getLocalCalls() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CALLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalCalls(calls) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_CALLS_KEY, JSON.stringify(calls));
    if (channel) channel.postMessage({ type: 'CALLS_UPDATED', calls });
    window.dispatchEvent(new CustomEvent('lucente:service-calls-changed', { detail: { calls } }));
  } catch (e) {
    console.error('LUCENTE LocalStorage calls error:', e);
  }
}

// =========================================================================
// HYBRID ORDER CREATION & TRACKING
// =========================================================================

/**
 * Submit a new table order
 */
export async function submitTableOrder({
  tableId,
  tableName,
  areaName,
  items,
  totalAmount,
  guestCount = '2 convives',
  serviceRound = 'direct', // 'antipasti' | 'secondi' | 'dolci' | 'direct'
  notes = '',
  paymentPreference = 'table' // 'table' (Payer au serveur) | 'hybrid_online' (Payé en ligne)
}) {
  const reference = generateTableOrderRef(tableId);
  const now = new Date().toISOString();

  const newOrder = {
    id: reference,
    reference,
    tableId: String(tableId),
    tableName: tableName || `Table ${tableId}`,
    areaName: areaName || 'Salle Chiaroscuro',
    items: items || [],
    totalAmount: Number(totalAmount) || 0,
    guestCount,
    serviceRound,
    notes,
    paymentPreference,
    paymentStatus: paymentPreference === 'hybrid_online' ? 'paid' : 'pending_at_table',
    status: 'received', // 'received' | 'preparing' | 'plating' | 'served' | 'closed'
    createdAt: now,
    updatedAt: now
  };

  // 1. Save in local cache first for instant UI response
  const localOrders = getLocalOrders();
  const updatedOrders = [newOrder, ...localOrders.filter(o => o.id !== reference)];
  saveLocalOrders(updatedOrders);

  // 2. Synchronize to Firebase Firestore if connected
  if (db) {
    try {
      await setDoc(doc(db, 'table_orders', reference), {
        ...newOrder,
        serverCreatedAt: serverTimestamp(),
        serverUpdatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('LUCENTE Firestore sync notice (operating in local resilience):', err.message);
    }
  }

  return newOrder;
}

/**
 * Update order status (used by Chef & Kitchen Staff)
 */
export async function updateOrderStatus(orderId, newStatus) {
  const now = new Date().toISOString();

  // Local update
  const localOrders = getLocalOrders();
  const updated = localOrders.map(order => {
    if (order.id === orderId || order.reference === orderId) {
      return { ...order, status: newStatus, updatedAt: now };
    }
    return order;
  });
  saveLocalOrders(updated);

  // Firestore update
  if (db) {
    try {
      const orderRef = doc(db, 'table_orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        serverUpdatedAt: serverTimestamp()
      });
    } catch (err) {
      console.warn('LUCENTE Firestore update notice:', err.message);
    }
  }
}

/**
 * Close/Archive all orders for a settled table
 */
export async function closeTableSession(tableId) {
  const cleanId = String(tableId);
  const localOrders = getLocalOrders();
  const updated = localOrders.map(o => o.tableId === cleanId ? { ...o, status: 'closed' } : o);
  saveLocalOrders(updated);

  // Resolve pending calls for this table
  const localCalls = getLocalCalls();
  const updatedCalls = localCalls.filter(c => c.tableId !== cleanId);
  saveLocalCalls(updatedCalls);
}

// =========================================================================
// HYBRID REAL-TIME SUBSCRIPTIONS
// =========================================================================

/**
 * Subscribe to orders for a specific table (used by Table Order page)
 */
export function subscribeToTableOrders(tableId, onUpdate) {
  const cleanId = String(tableId);

  // Initial call with local data
  const initialLocal = getLocalOrders().filter(o => o.tableId === cleanId && o.status !== 'closed');
  onUpdate(initialLocal);

  // Listen to local BroadcastChannel and custom events
  const handleLocalChange = () => {
    const current = getLocalOrders().filter(o => o.tableId === cleanId && o.status !== 'closed');
    onUpdate(current);
  };

  window.addEventListener('lucente:table-orders-changed', handleLocalChange);
  if (channel) {
    channel.addEventListener('message', (e) => {
      if (e.data?.type === 'ORDERS_UPDATED') handleLocalChange();
    });
  }

  // Firestore live listener
  let unsubscribeFirestore = null;
  if (db) {
    try {
      const q = query(
        collection(db, 'table_orders'),
        where('tableId', '==', cleanId)
      );
      unsubscribeFirestore = onSnapshot(q, (snapshot) => {
        const firestoreOrders = [];
        snapshot.forEach(docSnap => {
          firestoreOrders.push(docSnap.data());
        });
        if (firestoreOrders.length > 0) {
          // Merge with local state
          const activeOnly = firestoreOrders.filter(o => o.status !== 'closed');
          onUpdate(activeOnly);
        }
      }, (err) => {
        console.warn('Firestore subscription fallback:', err.message);
      });
    } catch (e) {
      console.warn('Firestore query error:', e.message);
    }
  }

  return () => {
    window.removeEventListener('lucente:table-orders-changed', handleLocalChange);
    if (unsubscribeFirestore) unsubscribeFirestore();
  };
}

/**
 * Subscribe to all active orders (used by Kitchen KDS & Staff Dashboard)
 */
export function subscribeToAllActiveOrders(onUpdate) {
  // Initial call with local data
  const initialLocal = getLocalOrders().filter(o => o.status !== 'closed');
  onUpdate(initialLocal);

  const handleLocalChange = () => {
    const current = getLocalOrders().filter(o => o.status !== 'closed');
    onUpdate(current);
  };

  window.addEventListener('lucente:table-orders-changed', handleLocalChange);
  if (channel) {
    channel.addEventListener('message', (e) => {
      if (e.data?.type === 'ORDERS_UPDATED') handleLocalChange();
    });
  }

  // Firestore live listener
  let unsubscribeFirestore = null;
  if (db) {
    try {
      const q = query(
        collection(db, 'table_orders')
      );
      unsubscribeFirestore = onSnapshot(q, (snapshot) => {
        const firestoreOrders = [];
        snapshot.forEach(docSnap => {
          firestoreOrders.push(docSnap.data());
        });
        if (firestoreOrders.length > 0) {
          const activeOnly = firestoreOrders
            .filter(o => o.status !== 'closed')
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          onUpdate(activeOnly);
        }
      }, (err) => {
        console.warn('Firestore KDS subscription fallback:', err.message);
      });
    } catch (e) {
      console.warn('Firestore KDS error:', e.message);
    }
  }

  return () => {
    window.removeEventListener('lucente:table-orders-changed', handleLocalChange);
    if (unsubscribeFirestore) unsubscribeFirestore();
  };
}

// =========================================================================
// SERVICE CALLS (SOMMELIER, SERVICE, BREAD/WATER, BILL)
// =========================================================================

export async function submitServiceCall({
  tableId,
  tableName,
  type, // 'sommelier' | 'water_bread' | 'waiter' | 'bill'
  notes = '',
  paymentMethod = 'card' // 'card' | 'cash' | 'amex' | 'company'
}) {
  const callId = `CALL-${tableId}-${Date.now()}`;
  const now = new Date().toISOString();

  const newCall = {
    id: callId,
    tableId: String(tableId),
    tableName: tableName || `Table ${tableId}`,
    type,
    notes,
    paymentMethod,
    status: 'pending',
    createdAt: now
  };

  // Local storage
  const calls = getLocalCalls();
  const updated = [newCall, ...calls.filter(c => c.id !== callId)];
  saveLocalCalls(updated);

  // Firestore sync
  if (db) {
    try {
      await setDoc(doc(db, 'service_calls', callId), {
        ...newCall,
        serverCreatedAt: serverTimestamp()
      });
    } catch (e) {
      console.warn('Firestore service call error:', e.message);
    }
  }

  return newCall;
}

export function subscribeToServiceCalls(onUpdate) {
  onUpdate(getLocalCalls());

  const handleLocalChange = () => {
    onUpdate(getLocalCalls());
  };

  window.addEventListener('lucente:service-calls-changed', handleLocalChange);
  if (channel) {
    channel.addEventListener('message', (e) => {
      if (e.data?.type === 'CALLS_UPDATED') handleLocalChange();
    });
  }

  let unsubscribeFirestore = null;
  if (db) {
    try {
      const q = query(collection(db, 'service_calls'));
      unsubscribeFirestore = onSnapshot(q, (snapshot) => {
        const calls = [];
        snapshot.forEach(docSnap => calls.push(docSnap.data()));
        if (calls.length > 0) {
          const activeOnly = calls.filter(c => c.status === 'pending');
          onUpdate(activeOnly);
        }
      }, () => {});
    } catch {}
  }

  return () => {
    window.removeEventListener('lucente:service-calls-changed', handleLocalChange);
    if (unsubscribeFirestore) unsubscribeFirestore();
  };
}

export async function dismissServiceCall(callId) {
  const calls = getLocalCalls();
  const filtered = calls.filter(c => c.id !== callId);
  saveLocalCalls(filtered);

  if (db) {
    try {
      await updateDoc(doc(db, 'service_calls', callId), {
        status: 'resolved'
      });
    } catch {}
  }
}
