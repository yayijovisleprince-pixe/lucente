import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD8GjQ_placeholder", // not needed for open firestore rules read/write
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
  console.log('\x1b[36m   LUCENTE MILANO — VALIDATION FIRESTORE TEMPS RÉEL        \x1b[0m');
  console.log('\x1b[36m============================================================\x1b[0m\n');

  try {
    // 1. Test Table Order write & read
    const orderId = `LUC-TEST-LIVE-${Date.now()}`;
    const orderData = {
      id: orderId,
      reference: orderId,
      tableId: '04',
      tableName: 'Table 04 — Sala Chiaroscuro',
      areaName: 'Sala Chiaroscuro',
      items: [
        { name: 'Menu Chiaroscuro (9 actes)', price: 290, quantity: 2 },
        { name: 'Accord Majeur', price: 180, quantity: 2 }
      ],
      totalAmount: 940,
      guestCount: '2 convives',
      notes: 'Test table order e2e',
      paymentPreference: 'table',
      paymentStatus: 'pending_at_table',
      status: 'received',
      createdAt: new Date().toISOString()
    };

    console.log('\x1b[34m[1/5] Test Commande de Table (table_orders)...\x1b[0m');
    await setDoc(doc(db, 'table_orders', orderId), orderData);
    assert(true, `Commande créée avec succès : ${orderId}`);

    const orderSnap = await getDoc(doc(db, 'table_orders', orderId));
    assert(orderSnap.exists() && orderSnap.data().totalAmount === 940, 'Lecture commande vérifiée (Montant = 940 €)');

    await updateDoc(doc(db, 'table_orders', orderId), { status: 'preparing' });
    const orderPrepSnap = await getDoc(doc(db, 'table_orders', orderId));
    assert(orderPrepSnap.data().status === 'preparing', 'Mise à jour statut Cuisine -> preparing vérifiée');

    // 2. Test Reservation write, read, update
    console.log('\n\x1b[34m[2/5] Test Réservation Gastronomique (reservations)...\x1b[0m');
    const resId = `RES-TEST-${Date.now()}`;
    const resData = {
      id: resId,
      reference: `LUC-${new Date().getFullYear()}-9999`,
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'guest@lucente-milano.com',
      phone: '+33612345678',
      date: '2026-11-20',
      time: '20:30',
      guests: 2,
      seating: 'main',
      dietary: ['Sans gluten'],
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'reservations', resId), resData);
    assert(true, `Réservation créée avec succès : ${resId}`);

    const resSnap = await getDoc(doc(db, 'reservations', resId));
    assert(resSnap.exists() && resSnap.data().lastName === 'Dupont', 'Lecture réservation confirmée (Nom: Dupont)');

    await updateDoc(doc(db, 'reservations', resId), { status: 'arrived' });
    const resArrSnap = await getDoc(doc(db, 'reservations', resId));
    assert(resArrSnap.data().status === 'arrived', 'Mise à jour statut Admin -> arrived vérifiée');

    // 3. Test Service Call write & resolve
    console.log('\n\x1b[34m[3/5] Test Appel de Service / Conciergerie (service_calls)...\x1b[0m');
    const callId = `CALL-TEST-${Date.now()}`;
    const callData = {
      id: callId,
      tableId: '04',
      tableName: 'Table 04 — Sala Chiaroscuro',
      type: 'sommelier',
      status: 'pending',
      notes: 'Demande conseil millésime Barolo',
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'service_calls', callId), callData);
    assert(true, `Appel sommelier créé : ${callId}`);

    await updateDoc(doc(db, 'service_calls', callId), { status: 'resolved' });
    const callSnap = await getDoc(doc(db, 'service_calls', callId));
    assert(callSnap.data().status === 'resolved', 'Clôture appel sommelier -> resolved vérifiée');

    // 4. Test Contact Message
    console.log('\n\x1b[34m[4/5] Test Formulaire de Contact (contact_messages)...\x1b[0m');
    const msgId = `MSG-TEST-${Date.now()}`;
    await setDoc(doc(db, 'contact_messages', msgId), {
      id: msgId,
      name: 'Claire de Vignoble',
      email: 'claire@vignoble.it',
      phone: '+39 02 1234 567',
      subject: 'Privatisation événementielle',
      message: 'Demande de privatisation pour 30 personnes le 15 décembre.',
      createdAt: new Date().toISOString()
    });
    const msgSnap = await getDoc(doc(db, 'contact_messages', msgId));
    assert(msgSnap.exists() && msgSnap.data().name === 'Claire de Vignoble', 'Enregistrement message contact vérifié');

    // 5. Test Job Application
    console.log('\n\x1b[34m[5/5] Test Recrutement & Candidature (job_applications)...\x1b[0m');
    const jobAppId = `JOB-TEST-${Date.now()}`;
    await setDoc(doc(db, 'job_applications', jobAppId), {
      id: jobAppId,
      fullName: 'Marcello Rossi',
      email: 'marcello.rossi@email.it',
      phone: '+39 340 000 1122',
      role: 'Sommelier — Cantina & Vini Vulcanici',
      message: 'Diplômé AIS avec 4 ans d expérience en restaurant étoilé.',
      createdAt: new Date().toISOString()
    });
    const jobSnap = await getDoc(doc(db, 'job_applications', jobAppId));
    assert(jobSnap.exists() && jobSnap.data().role.includes('Sommelier'), 'Enregistrement candidature vérifié');

    // Clean up test documents
    console.log('\n\x1b[33mNettoyage des données de test...\x1b[0m');
    await deleteDoc(doc(db, 'table_orders', orderId));
    await deleteDoc(doc(db, 'reservations', resId));
    await deleteDoc(doc(db, 'service_calls', callId));
    await deleteDoc(doc(db, 'contact_messages', msgId));
    await deleteDoc(doc(db, 'job_applications', jobAppId));
    assert(true, 'Documents de test purgés proprement de Firestore');

  } catch (err) {
    console.error('Erreur test Firestore:', err);
    failed++;
  }

  console.log('\n\x1b[36m============================================================\x1b[0m');
  console.log(`\x1b[32mRÉSULTAT FIRESTORE : ${passed} tests réussis\x1b[0m / ${passed + failed} tests`);
  if (failed === 0) {
    console.log('\x1b[32mLA BASE DE DONNÉES CLOUD FIRESTORE EST 100% OPÉRATIONNELLE !\x1b[0m');
  }
  console.log('\x1b[36m============================================================\x1b[0m');
}

run();
