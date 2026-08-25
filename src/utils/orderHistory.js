/**
 * LUCENTE Milano — Order & Reservation History Manager (No-Account Architecture)
 * Handles client-side persistence, unique luxury reference generation, and lookup.
 */

const STORAGE_KEY = 'lucente_orders_history';

/**
 * Generate a luxury unique reference code (e.g. LUC-2026-8492-MI)
 */
export function generateOrderReference() {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const suffix = ['MI', 'IT', 'LU', 'EX'][Math.floor(Math.random() * 4)];
  return `LUC-${year}-${randomNum}-${suffix}`;
}

/**
 * Retrieve all saved orders sorted newest first
 */
export function getOrders() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading LUCENTE order history:', err);
    return [];
  }
}

/**
 * Get the total count of saved orders
 */
export function getOrderCount() {
  return getOrders().length;
}

/**
 * Save a new pre-order / reservation to local history
 */
export function saveOrder(orderData) {
  if (typeof window === 'undefined') return null;
  try {
    const reference = orderData.reference || generateOrderReference();
    const newOrder = {
      id: reference,
      reference,
      createdAt: new Date().toISOString(),
      status: 'confirmed', // 'confirmed' | 'pending' | 'completed'
      name: orderData.name || 'Invité LUCENTE',
      email: orderData.email || '',
      phone: orderData.phone || '',
      date: orderData.date || new Date().toISOString().split('T')[0],
      time: orderData.time || '20:00',
      guests: orderData.guests || '2 convives',
      notes: orderData.notes || '',
      items: orderData.items || [],
      totalPrice: orderData.totalPrice || 0,
      totalCount: orderData.totalCount || (orderData.items ? orderData.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0),
      type: orderData.type || 'preorder' // 'preorder' | 'booking'
    };

    const existing = getOrders();
    const updated = [newOrder, ...existing.filter(o => o.reference !== reference)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch global event for instant reactive UI updates
    window.dispatchEvent(new CustomEvent('lucente:orders-updated', { detail: { order: newOrder } }));

    return newOrder;
  } catch (err) {
    console.error('Error saving LUCENTE order:', err);
    return null;
  }
}

/**
 * Delete an order by reference
 */
export function deleteOrder(reference) {
  if (typeof window === 'undefined') return false;
  try {
    const existing = getOrders();
    const filtered = existing.filter(o => o.reference !== reference);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('lucente:orders-updated'));
    return true;
  } catch (err) {
    console.error('Error deleting LUCENTE order:', err);
    return false;
  }
}

/**
 * Search orders by reference code or email address
 */
export function searchOrders(query) {
  if (!query || typeof query !== 'string') return [];
  const clean = query.trim().toLowerCase();
  const all = getOrders();
  return all.filter(o => 
    (o.reference && o.reference.toLowerCase().includes(clean)) ||
    (o.email && o.email.toLowerCase().includes(clean)) ||
    (o.phone && o.phone.replace(/\s+/g, '').includes(clean))
  );
}
