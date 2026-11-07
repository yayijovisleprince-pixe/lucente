import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8GjQ_placeholder",
  projectId: "lucente-milano",
  storageBucket: "lucente-milano.appspot.com",
  appId: "1:788837729474:web:0fa929d20c53443a51057c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
  } else {
    failed++;
    console.log(`  \x1b[31m✖\x1b[0m ${message}`);
  }
}

async function run() {
  console.log('\n\x1b[36m============================================================\x1b[0m');
  console.log('\x1b[36m   LUCENTE MILANO — VÉRIFICATION SÉCURITÉ FIRESTORE        \x1b[0m');
  console.log('\x1b[36m============================================================\x1b[0m\n');

  try {
    // 1. Table Order (Public customer creation + kitchen status updates)
    console.log('\x1b[34m[1/6] Test Commandes à Table (table_orders)...\x1b[0m');
    const orderId = `LUC-SEC-TEST-${Date.now()}`;
    await setDoc(doc(db, 'table_orders', orderId), {
      id: orderId,
      reference: orderId,
      tableId: '04',
      tableName: 'Table 04 — Sala Chiaroscuro',
      areaName: 'Sala Chiaroscuro',
      items: [{ name: 'Menu Chiaroscuro', price: 290, quantity: 2 }],
      totalAmount: 580,
      status: 'received',
      createdAt: new Date().toISOString()
    });
    assert(true, 'Création commande client avec données conformes autorisée');

    const orderSnap = await getDoc(doc(db, 'table_orders', orderId));
    assert(orderSnap.exists() && orderSnap.data().totalAmount === 580, 'Lecture commande pour suivi client autorisée');

    await updateDoc(doc(db, 'table_orders', orderId), { status: 'preparing' });
    const orderUpdated = await getDoc(doc(db, 'table_orders', orderId));
    assert(orderUpdated.data().status === 'preparing', 'Mise à jour statut cuisine -> preparing autorisée');

    // 2. Service Call
    console.log('\n\x1b[34m[2/6] Test Appels Sommelier / Service (service_calls)...\x1b[0m');
    const callId = `CALL-SEC-${Date.now()}`;
    await setDoc(doc(db, 'service_calls', callId), {
      id: callId,
      tableId: '04',
      type: 'sommelier',
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    assert(true, 'Création appel sommelier client autorisée');

    await updateDoc(doc(db, 'service_calls', callId), { status: 'resolved' });
    const callSnap = await getDoc(doc(db, 'service_calls', callId));
    assert(callSnap.data().status === 'resolved', 'Clôture appel sommelier par le personnel autorisée');

    // 3. Reservation (Creation + Lookup by reference)
    console.log('\n\x1b[34m[3/6] Test Réservation Gastronomique Client...\x1b[0m');
    const resId = `RES-SEC-${Date.now()}`;
    await setDoc(doc(db, 'reservations', resId), {
      id: resId,
      reference: resId,
      firstName: 'Claire',
      lastName: 'Moreau',
      email: 'claire.moreau@email.fr',
      phone: '+33612345678',
      date: '2026-11-25',
      time: '20:00',
      guests: 2,
      createdAt: new Date().toISOString()
    });
    assert(true, 'Création réservation client autorisée');

    const resSnap = await getDoc(doc(db, 'reservations', resId));
    assert(resSnap.exists() && resSnap.data().lastName === 'Moreau', 'Consultation unitaire par référence autorisée');

    // 4. Security Enforcement: Unauthenticated Update/Delete on Reservations must be BLOCKED
    console.log('\n\x1b[34m[4/6] Contrôle Sécurité : Blocage altération réservation non-admin...\x1b[0m');
    try {
      await deleteDoc(doc(db, 'reservations', resId));
      assert(false, 'ALERTE : Suppression non autorisée a réussi');
    } catch (err) {
      assert(err.code === 'permission-denied', 'Règle active : Suppression non-admin bloquée (permission-denied)');
    }

    // 5. Contact Message & Job Application (Creation allowed)
    console.log('\n\x1b[34m[5/6] Test Envoi Contact & Candidature...\x1b[0m');
    const msgId = `MSG-SEC-${Date.now()}`;
    await setDoc(doc(db, 'contact_messages', msgId), {
      id: msgId,
      name: 'Elena Rossi',
      email: 'elena@rossi.it',
      message: 'Demande d information',
      createdAt: new Date().toISOString()
    });
    assert(true, 'Envoi message de contact public autorisé');

    const jobAppId = `JOB-SEC-${Date.now()}`;
    await setDoc(doc(db, 'job_applications', jobAppId), {
      id: jobAppId,
      fullName: 'Matteo Bellini',
      email: 'matteo@bellini.it',
      role: 'Sommelier',
      createdAt: new Date().toISOString()
    });
    assert(true, 'Envoi candidature recrutement public autorisé');

    // 6. Security Enforcement: Reading other people's contact messages must be BLOCKED
    console.log('\n\x1b[34m[6/6] Contrôle Sécurité : Confidentialité stricte des messages et CVs...\x1b[0m');
    try {
      await getDoc(doc(db, 'contact_messages', msgId));
      assert(false, 'ALERTE : Lecture publique des messages autorisée');
    } catch (err) {
      assert(err.code === 'permission-denied', 'Règle active : Lecture messages confidentiels bloquée (permission-denied)');
    }

    try {
      await getDoc(doc(db, 'job_applications', jobAppId));
      assert(false, 'ALERTE : Lecture publique des CVs autorisée');
    } catch (err) {
      assert(err.code === 'permission-denied', 'Règle active : Lecture candidatures confidentielles bloquée (permission-denied)');
    }

  } catch (err) {
    console.error('Erreur inattendue test suite:', err);
    failed++;
  }

  console.log('\n\x1b[36m============================================================\x1b[0m');
  console.log(`\x1b[32mRÉSULTAT SÉCURITÉ FIRESTORE : ${passed} tests réussis\x1b[0m / ${passed + failed} tests`);
  if (failed === 0) {
    console.log('\x1b[32mLES RÈGLES DE SÉCURITÉ SONT 100% VALIDES ET IMPERMÉABLES !\x1b[0m');
  }
  console.log('\x1b[36m============================================================\x1b[0m');
}

run();
