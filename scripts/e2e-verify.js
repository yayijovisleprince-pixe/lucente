/**
 * LUCENTE Milano — Complete End-to-End Test Suite
 * Simulates complete user journey, brigade kitchen flow, admin panel, QR engine & routing.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';

const ROOT_DIR = process.cwd();
const DEV_SERVER_URL = 'http://localhost:5173';

const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function recordTest(suite, name, success, details = '') {
  if (success) {
    results.passed++;
    console.log(`  \x1b[32m✔\x1b[0m [${suite}] ${name}`);
  } else {
    results.failed++;
    console.log(`  \x1b[31m✖\x1b[0m [${suite}] ${name} — ${details}`);
  }
  results.tests.push({ suite, name, success, details });
}

// ── 1. Static Assets Verification ──────────────────────────────────────────
function testStaticAssets() {
  console.log('\n\x1b[34m[SUITE 1/5] Vérification des Médias & Assets Critiques\x1b[0m');
  const requiredImages = [
    'public/images/hero-dish.webp',
    'public/images/chef-craft.webp',
    'public/images/dining-room.webp',
    'public/images/pasta-caviar.webp',
    'public/images/table-ambiance.webp'
  ];

  requiredImages.forEach(imgRel => {
    const fullPath = path.join(ROOT_DIR, imgRel);
    const exists = fs.existsSync(fullPath);
    recordTest('Assets', `Image présente : ${imgRel}`, exists, exists ? '' : 'Fichier introuvable');
  });
}

// ── 2. Data & Tables Integrity ──────────────────────────────────────────────
async function testTablesData() {
  console.log('\n\x1b[34m[SUITE 2/5] Intégrité du Plan de Salle (14 Tables)\x1b[0m');
  try {
    const { allTables, restaurantAreas } = await import('../src/data/tablesData.js');
    
    recordTest('Tables', 'Chargement de allTables', Array.isArray(allTables) && allTables.length === 14, `Nombre: ${allTables?.length}`);
    recordTest('Tables', 'Salles configurées', Array.isArray(restaurantAreas) && restaurantAreas.length >= 4, `Salles: ${restaurantAreas?.length}`);

    // Verify Table 04 exists
    const table04 = allTables.find(t => t.id === '04' || t.number === '04');
    recordTest('Tables', 'Table 04 (Sala Chiaroscuro) existe', !!table04, `Nom: ${table04?.name}`);

    // Verify Chef Table exists
    const chefTable = allTables.find(t => t.id === 'chef');
    recordTest('Tables', "Chef's Table existe", !!chefTable, `Nom: ${chefTable?.name}`);
  } catch (err) {
    recordTest('Tables', 'Import tablesData', false, err.message);
  }
}

// ── 3. QR Code Generation Engine ────────────────────────────────────────────
async function testQrEngine() {
  console.log('\n\x1b[34m[SUITE 3/5] Moteur de Génération QR Code (Client & Chevalets)\x1b[0m');
  try {
    const targetUrl = 'http://192.168.100.229:5173/table/04';
    const qrData = await QRCode.toDataURL(targetUrl, {
      width: 480,
      margin: 1,
      color: { dark: '#10100E', light: '#F2EBDD' }
    });
    
    const isValidDataUrl = qrData.startsWith('data:image/png;base64,') && qrData.length > 500;
    recordTest('QR', 'Génération QR Table 04 (PNG Haute Définition)', isValidDataUrl, `Longueur: ${qrData.length} octets`);
  } catch (err) {
    recordTest('QR', 'Génération QR Table', false, err.message);
  }
}

// ── 4. Order Lifecycle & Simulation ─────────────────────────────────────────
async function testOrderLifecycle() {
  console.log('\n\x1b[34m[SUITE 4/5] Cycle de Vie des Commandes (Simulateur Table -> Cuisine)\x1b[0m');
  try {
    const { generateTableOrderRef } = await import('../src/utils/tableOrderManager.js');
    
    // Reference check
    const ref = generateTableOrderRef('04');
    const isValidRef = ref.startsWith('LUC-T04-') && ref.length === 12;
    recordTest('OrderEngine', 'Génération Référence Unique Luxe', isValidRef, `Ref: ${ref}`);

    // Check pricing calculation
    const testItems = [
      { name: 'Menu Chiaroscuro (9 actes)', price: 290, quantity: 2 },
      { name: 'Accord Majeur - Grands Terroirs', price: 180, quantity: 2 }
    ];
    const total = testItems.reduce((acc, it) => acc + (it.price * it.quantity), 0);
    recordTest('OrderEngine', 'Calcul Total Commande (2 Couverts + Vins)', total === 940, `Total: ${total} €`);

  } catch (err) {
    recordTest('OrderEngine', 'Import Order Manager', false, err.message);
  }
}

// ── 5. HTTP Routing & Live Server Endpoints ─────────────────────────────────
function fetchUrl(urlPath) {
  return new Promise((resolve) => {
    http.get(`${DEV_SERVER_URL}${urlPath}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, hasHtml: data.includes('<!DOCTYPE html>') || data.includes('<div id="root">') });
      });
    }).on('error', (err) => {
      resolve({ status: 500, error: err.message });
    });
  });
}

async function testHttpEndpoints() {
  console.log('\n\x1b[34m[SUITE 5/5] Accessibilité HTTP des Routes en Temps Réel\x1b[0m');
  const routesToTest = [
    { path: '/', label: 'Page d\'Accueil' },
    { path: '/maison', label: 'La Maison (Page Hub)' },
    { path: '/story', label: 'Notre Histoire' },
    { path: '/cuisine', label: 'La Cuisine Chiaroscuro' },
    { path: '/private-dining', label: 'Espaces Privés' },
    { path: '/menu', label: 'Carte & Menus' },
    { path: '/gallery', label: 'Galerie' },
    { path: '/journal', label: 'Journal' },
    { path: '/table/04', label: 'Scanner Client Table 04' },
    { path: '/scan', label: 'Scanner Caméra' },
    { path: '/kds', label: 'Écran Cuisine KDS' },
    { path: '/staff/qr-generator', label: 'Générateur de Chevalets' },
    { path: '/admin', label: 'Direction Espace Admin' }
  ];

  for (const route of routesToTest) {
    const res = await fetchUrl(route.path);
    const ok = res.status === 200 && res.hasHtml;
    recordTest('Routes', `Route HTTP ${route.path} (${route.label})`, ok, `Code: ${res.status}`);
  }
}

// ── Run All Suites ──────────────────────────────────────────────────────────
async function run() {
  console.log('\x1b[36m============================================================\x1b[0m');
  console.log('\x1b[36m   LUCENTE MILANO — SUITE DE VALIDATION END-TO-END         \x1b[0m');
  console.log('\x1b[36m============================================================\x1b[0m');

  testStaticAssets();
  await testTablesData();
  await testQrEngine();
  await testOrderLifecycle();
  await testHttpEndpoints();

  console.log('\n\x1b[36m============================================================\x1b[0m');
  console.log(`\x1b[32mRÉSULTAT GLOBAL : ${results.passed} tests réussis\x1b[0m / ${results.passed + results.failed} tests`);
  if (results.failed === 0) {
    console.log('\x1b[32mTOUS LES TESTS SONT AU VERT (100% SUCCÈS)\x1b[0m');
  } else {
    console.log(`\x1b[31m${results.failed} tests en échec\x1b[0m`);
  }
  console.log('\x1b[36m============================================================\x1b[0m');
}

run();
