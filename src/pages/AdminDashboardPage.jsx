import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import {
  QrCode, Share2, Copy, Check, ExternalLink, Download,
  Maximize2, X, Utensils, Bell, CreditCard, Clock,
  Printer, Shield, ChevronRight, AlertTriangle, LogOut, Lock,
  LayoutDashboard, TrendingUp, Users, Table2, History,
  RefreshCw, ChevronDown, Filter, ArrowUpRight, Eye,
  Wallet, CheckCircle2, Circle, XCircle, BarChart2,
  UtensilsCrossed, CalendarDays
} from 'lucide-react';
import { restaurantAreas, allTables } from '../data/tablesData';
import {
  subscribeToAllActiveOrders,
  updateOrderStatus,
  closeTableSession,
  subscribeToServiceCalls,
  dismissServiceCall,
  subscribeToReservations,
  updateReservationStatus
} from '../utils/tableOrderManager';
import { auth, googleProvider } from '../firebase/config';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { useAdminSession } from '../hooks/useAdminSession';
import SEOHead from '../components/SEOHead';

const AUTHORIZED_ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || 'yayijovisleprince@gmail.com').toLowerCase();

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getAllOrdersHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem('lucente_live_table_orders');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function formatTime(isoString) {
  if (!isoString) return '--';
  try {
    return new Date(isoString).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  } catch { return '--'; }
}

function formatDate(isoString) {
  if (!isoString) return '--';
  try {
    return new Date(isoString).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  } catch { return '--'; }
}

function statusLabel(status) {
  const map = {
    received: { label: 'Reçue', color: 'text-blue-400 border-blue-400/40 bg-blue-950/20' },
    preparing: { label: 'En Cuisine', color: 'text-amber-400 border-amber-400/40 bg-amber-950/20' },
    plating: { label: 'Dressage', color: 'text-orange-400 border-orange-400/40 bg-orange-950/20' },
    served: { label: 'Servie', color: 'text-or border-or/40 bg-or/10' },
    closed: { label: 'Clôturée', color: 'text-muted border-white/10 bg-surface' },
  };
  return map[status] || { label: status, color: 'text-muted border-white/10' };
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, accent = 'text-or', border = 'border-white/10' }) {
  return (
    <div className={`bg-surface border ${border} p-5 rounded-sm flex flex-col justify-between gap-4`}>
      <div className="flex items-start justify-between gap-2">
        <div className={`w-9 h-9 rounded-sm flex items-center justify-center ${accent === 'text-or' ? 'bg-or/10' : accent === 'text-amber-400' ? 'bg-amber-500/10' : 'bg-blue-500/10'}`}>
          <Icon size={18} className={accent} />
        </div>
        <span className={`font-mono text-2xl font-bold ${accent}`}>{value}</span>
      </div>
      <div>
        <div className="font-mono text-xs text-muted uppercase tracking-wider">{label}</div>
        {sub && <div className="text-[11px] text-muted/60 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabBtn({ id, active, onClick, icon: Icon, label, badge }) {
  return (
    <button
      onClick={() => onClick(id)}
      className={`py-2 px-3 sm:px-4 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
        active
          ? 'bg-or text-nero font-bold shadow-md'
          : 'bg-surface border border-white/10 text-muted hover:text-ivoire'
      }`}
    >
      <Icon size={13} />
      <span className="hidden sm:inline">{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-nero/20 text-nero' : 'bg-or/20 text-or'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminDashboardPage() {
  // ── Auth State ──────────────────────────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  // ── UI State ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedArea, setSelectedArea] = useState('all');
  const [baseUrl, setBaseUrl] = useState('');
  const [qrCodes, setQrCodes] = useState({});
  const [activeOrders, setActiveOrders] = useState([]);
  const [allOrdersHistory, setAllOrdersHistory] = useState([]);
  const [serviceCalls, setServiceCalls] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [copiedTableId, setCopiedTableId] = useState(null);
  const [fullscreenTable, setFullscreenTable] = useState(null);
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all' | 'closed' | 'served'
  const [now, setNow] = useState(Date.now());

  // Live clock for relative timing
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(t);
  }, []);

  // ── Auth Listener ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!auth) { 
      setAuthLoading(false); 
      return; 
    }
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setIsSigningIn(true);
    try {
      if (!auth) throw new Error("Firebase Auth n'est pas initialisé.");
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      if (err.code === 'auth/configuration-not-found') {
        setAuthError("Activez le fournisseur Google dans la console Firebase (projet lucente-milano) puis réessayez.");
      } else {
        setAuthError(err.message || 'Échec de la connexion Google.');
      }
    } finally { setIsSigningIn(false); }
  };

  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(null);

  const handleSignOut = async (reason = null) => {
    try {
      if (auth) await signOut(auth);
      setCurrentUser(null);
      if (reason === 'inactivity') {
        setSessionExpiredNotice("Votre session de direction a expiré automatiquement après 15 minutes d'inactivité pour préserver la sécurité de la console.");
      } else if (reason === 'max_lifetime') {
        setSessionExpiredNotice("Votre session de service a atteint la durée maximale autorisée (8 heures). Veuillez vous réauthentifier.");
      }
    } catch {}
  };

  const isAuthorized = useMemo(() => {
    return !!(currentUser && currentUser.email && currentUser.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL);
  }, [currentUser]);

  const {
    secondsRemaining,
    timeRemainingFormatted,
    isWarningOpen,
    extendSession
  } = useAdminSession({
    isActive: isAuthorized,
    onExpire: (reason) => handleSignOut(reason)
  });

  // ── Base URL ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    setBaseUrl(isLocal ? 'http://192.168.100.229:5173' : window.location.origin);
  }, []);

  // ── QR Generation ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!baseUrl) return;
    allTables.forEach(async (table) => {
      try {
        const dataUrl = await QRCode.toDataURL(`${baseUrl}/table/${table.id}`, {
          width: 480, margin: 1,
          color: { dark: '#10100E', light: '#F2EBDD' }
        });
        setQrCodes((prev) => ({ ...prev, [table.id]: dataUrl }));
      } catch {}
    });
  }, [baseUrl]);

  // ── Live Subscriptions ─────────────────────────────────────────────────────
  useEffect(() => {
    const unsubOrders = subscribeToAllActiveOrders((orders) => {
      setActiveOrders(orders);
      // Also refresh history each time orders update
      setAllOrdersHistory(getAllOrdersHistory());
    });
    const unsubCalls = subscribeToServiceCalls((calls) => setServiceCalls(calls));
    const unsubRes = subscribeToReservations((resList) => setReservations(resList));
    setAllOrdersHistory(getAllOrdersHistory());
    return () => { unsubOrders(); unsubCalls(); unsubRes(); };
  }, []);

  // ── Computed Stats ────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const allOrders = allOrdersHistory;
    const activeTables = new Set(activeOrders.map(o => o.tableId)).size;
    const occupancyPct = Math.round((activeTables / allTables.length) * 100);
    const closedToday = allOrders.filter(o => o.status === 'closed');
    const revenueToday = closedToday.reduce((acc, o) => acc + (Number(o.totalAmount) || 0), 0);
    const coversToday = closedToday.length;

    // Most ordered dishes
    const dishCount = {};
    allOrders.forEach(o => {
      (o.items || []).forEach(it => {
        dishCount[it.name] = (dishCount[it.name] || 0) + (it.quantity || 1);
      });
    });
    const topDishes = Object.entries(dishCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Average order value
    const paidOrders = allOrders.filter(o => o.totalAmount > 0);
    const avgOrderValue = paidOrders.length > 0
      ? (paidOrders.reduce((s, o) => s + o.totalAmount, 0) / paidOrders.length).toFixed(0)
      : 0;

    return { activeTables, occupancyPct, revenueToday, coversToday, topDishes, avgOrderValue };
  }, [activeOrders, allOrdersHistory]);

  // ── QR Helpers ────────────────────────────────────────────────────────────
  const handleCopyLink = (table) => {
    navigator.clipboard.writeText(`${baseUrl}/table/${table.id}`);
    setCopiedTableId(table.id);
    setTimeout(() => setCopiedTableId(null), 2500);
  };

  const handleDownloadQr = (table) => {
    const dataUrl = qrCodes[table.id];
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `LUCENTE_QR_Table_${table.number}.png`;
    a.click();
  };

  const filteredTables = allTables.filter(t => selectedArea === 'all' || t.areaId === selectedArea);

  const getOrdersForTable = (tableId) =>
    activeOrders.filter(o => o.tableId === String(tableId) && o.status !== 'closed');

  const getTableStatus = (tableId) => {
    const orders = getOrdersForTable(tableId);
    const hasCall = serviceCalls.some(c => c.tableId === String(tableId));
    if (hasCall) return { label: 'Appel', color: 'border-amber-500/50 text-amber-400 bg-amber-950/20' };
    if (orders.length > 0) return { label: 'Active', color: 'border-or text-or bg-or/10' };
    return { label: 'Libre', color: 'border-white/10 text-muted bg-surface' };
  };

  // ── Filtered History ───────────────────────────────────────────────────────
  const filteredHistory = useMemo(() => {
    const all = allOrdersHistory;
    if (historyFilter === 'all') return all;
    return all.filter(o => o.status === historyFilter);
  }, [allOrdersHistory, historyFilter]);

  // ══════════════════════════════════════════════════════════════════════════
  // 1. Loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-nero flex items-center justify-center p-4 text-ivoire">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-or border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-mono text-xs text-muted uppercase tracking-wider">Vérification de l'accès Direction...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-nero text-ivoire flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface border border-or/40 p-8 rounded-sm shadow-2xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-or/10 border border-or/40 flex items-center justify-center mx-auto text-or">
            <Lock size={22} />
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury tracking-[0.25em] text-or text-xs uppercase block font-semibold">LUCENTE MILANO</span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-light text-ivoire">Espace Direction</h1>
            <p className="text-xs text-muted leading-relaxed font-serif italic pt-1">
              « Espace strictement réservé à la direction du restaurant. Veuillez vous identifier avec le compte Google autorisé. »
            </p>
          </div>

          {sessionExpiredNotice && (
            <div className="p-3.5 bg-or/15 border border-or/60 text-ivoire text-xs rounded-sm flex items-start gap-2.5 text-left shadow-lg">
              <span className="text-or text-sm font-serif">✦</span>
              <p className="leading-relaxed font-serif text-or-light">
                {sessionExpiredNotice}
              </p>
            </div>
          )}

          {authError && (
            <div className="space-y-3 text-left">
              <div className="p-3 bg-terracotta/20 border border-terracotta/40 text-terracotta text-xs rounded-sm flex items-start gap-2">
                <AlertTriangle size={15} className="shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
              <div className="p-3.5 bg-nero border border-or/30 rounded space-y-2">
                <div className="text-or font-mono text-[11px] uppercase font-bold">Activation Google dans Firebase :</div>
                <p className="text-muted text-[11px] leading-relaxed">
                  Dans la console Firebase du projet <strong className="text-ivoire">lucente-milano</strong>, activez le fournisseur Google :
                </p>
                <a
                  href="https://console.firebase.google.com/project/lucente-milano/authentication/providers"
                  target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-or hover:underline font-mono pt-1"
                >
                  <span>Console Firebase › Authentication › Providers</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="button" disabled={isSigningIn} onClick={handleGoogleSignIn}
              className="w-full py-3.5 px-5 bg-or hover:bg-or-light text-nero font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-lg shadow-or/20"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isSigningIn ? 'Connexion Google...' : 'Se connecter avec Google'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Unauthorized account
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-nero text-ivoire flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-surface border border-terracotta/40 p-8 rounded-sm shadow-2xl text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-terracotta/15 border border-terracotta flex items-center justify-center mx-auto text-terracotta">
            <Shield size={24} />
          </div>
          <div className="space-y-1">
            <span className="font-serif-luxury tracking-[0.25em] text-terracotta text-xs uppercase block font-semibold">Accès Restreint</span>
            <h1 className="font-serif-luxury text-2xl font-light text-ivoire">Accès Non Autorisé</h1>
            <p className="text-xs text-muted leading-relaxed font-serif italic pt-1">
              « Ce compte Google n'est pas habilité à administrer LUCENTE Milano. Veuillez utiliser le compte de direction. »
            </p>
          </div>
          <button
            type="button" onClick={handleSignOut}
            className="w-full py-3 px-5 bg-surface hover:bg-surface-elevated text-ivoire hover:text-or border border-white/15 hover:border-or text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <LogOut size={14} />
            <span>Se déconnecter / Changer de compte</span>
          </button>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // 4. AUTHORIZED ADMIN DASHBOARD
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <SEOHead
        title="Espace Direction | LUCENTE Milano"
        description="Console d'administration LUCENTE Milano."
      />

      <div className="min-h-screen bg-nero text-ivoire pt-24 pb-24 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">

        {/* ── Admin Header ─────────────────────────────────────────────── */}
        <div className="border-b border-or-subtle pb-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-block px-3 py-1 bg-or/10 border border-or/30 rounded-full text-[10px] text-or uppercase tracking-widest font-mono mb-2">
                Direction · Espace Administration
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire font-light">
                Tableau de Bord
              </h1>
              <p className="typo-editorial text-xs sm:text-sm text-muted italic mt-1">
                « Vue complète du service en temps réel. »
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* User chip */}
              <div className="flex items-center gap-2.5 p-2 px-3 bg-surface border border-or/30 rounded-sm">
                {currentUser?.photoURL ? (
                  <img src={currentUser.photoURL} alt="Admin" className="w-7 h-7 rounded-full border border-or shrink-0" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-or/20 border border-or text-or flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {currentUser?.email?.[0]?.toUpperCase() || 'A'}
                  </div>
                )}
                <div className="text-left">
                  <div className="font-mono text-xs text-or font-semibold">Direction Autorisée</div>
                </div>
                <button
                  type="button" onClick={() => handleSignOut()}
                  title="Se déconnecter"
                  className="ml-2 p-1.5 text-muted hover:text-terracotta transition-colors"
                >
                  <LogOut size={14} />
                </button>
              </div>

              {/* Session Timer & Security Badge */}
              <div className="flex items-center gap-2 p-2 px-3 bg-surface border border-or/30 rounded-sm">
                <Clock size={13} className="text-or shrink-0" />
                <div className="text-left font-mono text-xs">
                  <span className="text-muted text-[9px] block uppercase leading-none">Session</span>
                  <span className={`font-semibold tracking-wider ${secondsRemaining <= 120 ? 'text-terracotta animate-pulse' : 'text-or'}`}>
                    {timeRemainingFormatted}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={extendSession}
                  title="Prolonger la session (réinitialise le délai à 15 minutes)"
                  className="ml-1 p-1 text-muted hover:text-or transition-colors"
                >
                  <RefreshCw size={12} />
                </button>
              </div>

              {/* Quick KPIs */}
              <div className="flex items-center gap-2">
                <div className="p-2.5 bg-surface border border-white/10 rounded-sm text-center min-w-[72px]">
                  <div className="text-[9px] font-mono text-muted uppercase">Tables</div>
                  <div className="font-mono text-base text-or font-bold">{allTables.length}</div>
                </div>
                <div className="p-2.5 bg-surface border border-white/10 rounded-sm text-center min-w-[72px]">
                  <div className="text-[9px] font-mono text-muted uppercase">Actives</div>
                  <div className="font-mono text-base text-ivoire font-bold">{stats.activeTables}</div>
                </div>
                <div className="p-2.5 bg-surface border border-amber-500/20 rounded-sm text-center min-w-[72px]">
                  <div className="text-[9px] font-mono text-muted uppercase">Appels</div>
                  <div className="font-mono text-base text-amber-400 font-bold">{serviceCalls.length}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ──────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 scrollbar-hide">
            <TabBtn id="overview"     active={activeTab==='overview'}     onClick={setActiveTab} icon={LayoutDashboard} label="Vue d'ensemble" />
            <TabBtn id="tables"       active={activeTab==='tables'}       onClick={setActiveTab} icon={QrCode}          label="Codes QR" badge={allTables.length} />
            <TabBtn id="kds"          active={activeTab==='kds'}          onClick={setActiveTab} icon={Utensils}        label="Cuisine" badge={activeOrders.length} />
            <TabBtn id="calls"        active={activeTab==='calls'}        onClick={setActiveTab} icon={Bell}            label="Appels" badge={serviceCalls.length} />
            <TabBtn id="reservations" active={activeTab==='reservations'} onClick={setActiveTab} icon={CalendarDays}    label="Réservations" badge={reservations.length} />
            <TabBtn id="history"      active={activeTab==='history'}      onClick={setActiveTab} icon={History}         label="Historique" />

            <Link
              to="/staff/qr-generator"
              className="ml-auto py-2 px-3 sm:px-4 rounded-sm text-[11px] font-mono uppercase tracking-wider bg-surface border border-white/10 text-muted hover:text-or transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Printer size={13} />
              <span className="hidden sm:inline">Chevalets</span>
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            TAB 1: OVERVIEW
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">

            {/* KPI Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard
                label="Tables Actives"
                value={`${stats.activeTables}/${allTables.length}`}
                sub={`Taux d'occupation : ${stats.occupancyPct}%`}
                icon={Table2}
                accent="text-or"
              />
              <StatCard
                label="Appels en Attente"
                value={serviceCalls.length}
                sub={serviceCalls.length === 0 ? 'Tout est calme' : `${serviceCalls.filter(c=>c.type==='bill').length} demande(s) d'addition`}
                icon={Bell}
                accent={serviceCalls.length > 0 ? 'text-amber-400' : 'text-or'}
                border={serviceCalls.length > 0 ? 'border-amber-500/30' : 'border-white/10'}
              />
              <StatCard
                label="Couverts Clôturés"
                value={stats.coversToday}
                sub="Commandes fermées"
                icon={Users}
                accent="text-or"
              />
              <StatCard
                label="Recettes Clôturées"
                value={`${stats.revenueToday} €`}
                sub={`Moy. ${stats.avgOrderValue} € / commande`}
                icon={Wallet}
                accent="text-or"
              />
            </div>

            {/* Plan de salle + Appels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Plan de salle */}
              <div className="lg:col-span-2 bg-surface border border-white/10 rounded-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif-luxury text-xl text-ivoire font-light">Plan de Salle</h2>
                  <span className="text-[10px] font-mono text-muted uppercase">Temps réel</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {allTables.map(table => {
                    const st = getTableStatus(table.id);
                    const orders = getOrdersForTable(table.id);
                    const hasCall = serviceCalls.some(c => c.tableId === String(table.id));
                    return (
                      <button
                        key={table.id}
                        onClick={() => { setSelectedArea('all'); setActiveTab('tables'); }}
                        className={`p-3 rounded-sm border text-left transition-all ${st.color} hover:border-or/60`}
                      >
                        <div className="font-mono text-[10px] uppercase font-bold mb-0.5">Table {table.number}</div>
                        <div className="font-serif text-xs text-ivoire/80 truncate">{table.name}</div>
                        <div className={`text-[9px] font-mono mt-1 ${st.color.split(' ')[0]}`}>{st.label}</div>
                        {orders.length > 0 && (
                          <div className="text-[9px] font-mono text-muted mt-0.5">{orders.length} cmd</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Alertes rapides */}
              <div className="bg-surface border border-white/10 rounded-sm p-5 flex flex-col gap-4">
                <h2 className="font-serif-luxury text-xl text-ivoire font-light">Alertes Service</h2>

                {serviceCalls.length === 0 && activeOrders.length === 0 && (
                  <div className="text-center py-8 flex-1 flex flex-col items-center justify-center gap-2">
                    <CheckCircle2 size={28} className="text-or/40" />
                    <p className="text-xs text-muted">Aucune alerte active</p>
                  </div>
                )}

                <div className="space-y-2 overflow-y-auto max-h-72">
                  {serviceCalls.map(call => (
                    <div key={call.id} className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-sm flex items-start justify-between gap-2">
                      <div>
                        <div className="font-mono text-xs text-amber-400 font-bold">{call.tableName}</div>
                        <div className="text-[11px] text-ivoire/80">
                          {call.type === 'bill' ? 'Demande d\'addition' :
                           call.type === 'sommelier' ? 'Sommelier' :
                           call.type === 'water_bread' ? 'Eau / Pain' : 'Appel serveur'}
                        </div>
                        <div className="text-[10px] text-muted">{formatTime(call.createdAt)}</div>
                      </div>
                      <button
                        onClick={() => dismissServiceCall(call.id)}
                        className="p-1.5 rounded bg-amber-500 text-nero hover:bg-amber-400 transition-colors shrink-0"
                      >
                        <Check size={12} />
                      </button>
                    </div>
                  ))}

                  {activeOrders.slice(0, 4).map(order => (
                    <div key={order.id} className="p-3 bg-or/5 border border-or/20 rounded-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-mono text-xs text-or font-bold">{order.tableName}</div>
                          <div className="text-[11px] text-ivoire/80">{order.items.length} plat(s) · {order.totalAmount} €</div>
                        </div>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${statusLabel(order.status).color}`}>
                          {statusLabel(order.status).label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Links */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <button onClick={() => setActiveTab('kds')} className="w-full py-2 px-3 bg-nero border border-white/10 hover:border-or/40 text-muted hover:text-ivoire rounded-sm text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between">
                    <span>Voir la Cuisine</span>
                    <ChevronRight size={13} />
                  </button>
                  <Link to="/kds" target="_blank" className="w-full py-2 px-3 bg-nero border border-white/10 hover:border-or/40 text-muted hover:text-ivoire rounded-sm text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-between">
                    <span>KDS Plein Écran</span>
                    <ExternalLink size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Top Plats */}
            {stats.topDishes.length > 0 && (
              <div className="bg-surface border border-white/10 rounded-sm p-5">
                <h2 className="font-serif-luxury text-xl text-ivoire font-light mb-4">Plats les Plus Commandés</h2>
                <div className="space-y-3">
                  {stats.topDishes.map((dish, i) => {
                    const max = stats.topDishes[0]?.count || 1;
                    const pct = Math.round((dish.count / max) * 100);
                    return (
                      <div key={dish.name} className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted w-5 text-right">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-ivoire truncate">{dish.name}</span>
                            <span className="font-mono text-xs text-or ml-2">{dish.count}x</span>
                          </div>
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-or rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Accès Rapides */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Codes QR Tables', desc: 'Partager aux convives', icon: QrCode, tab: 'tables' },
                { label: 'Cuisine KDS', desc: 'Suivi en temps réel', icon: Utensils, tab: 'kds' },
                { label: 'Appels Service', desc: 'Additions & sommelier', icon: Bell, tab: 'calls' },
                { label: 'Historique', desc: 'Commandes passées', icon: History, tab: 'history' },
              ].map(item => (
                <button
                  key={item.tab}
                  onClick={() => setActiveTab(item.tab)}
                  className="p-4 bg-surface border border-white/10 hover:border-or/50 rounded-sm text-left transition-all group"
                >
                  <item.icon size={20} className="text-or mb-2 group-hover:scale-110 transition-transform" />
                  <div className="font-mono text-xs text-ivoire font-semibold uppercase tracking-wide">{item.label}</div>
                  <div className="text-[11px] text-muted mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            TAB 2: QR CODES / TABLES
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'tables' && (
          <div className="space-y-6">

            {/* Target URL Selector */}
            <div className="p-4 bg-surface border border-or/30 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="text-xs font-mono uppercase tracking-wider text-or font-semibold">Cible des Codes QR</div>
                <p className="text-[11px] text-muted">Adresse de destination quand le client scanne.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: 'Wi-Fi Mobile', url: 'http://192.168.100.229:5173' },
                  { label: 'Domaine Public', url: 'https://lucente-milano.com' },
                  { label: 'Localhost', url: 'http://localhost:5173' },
                ].map(opt => (
                  <button
                    key={opt.url}
                    onClick={() => setBaseUrl(opt.url)}
                    className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                      baseUrl === opt.url
                        ? 'bg-or text-nero font-bold shadow'
                        : 'bg-nero border border-white/10 text-muted hover:text-ivoire'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedArea('all')}
                className={`py-1.5 px-3 rounded text-xs font-mono uppercase tracking-wider transition-all ${selectedArea === 'all' ? 'bg-or text-nero font-bold' : 'bg-surface border border-white/10 text-muted hover:text-ivoire'}`}
              >
                Toutes ({allTables.length})
              </button>
              {restaurantAreas.map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelectedArea(a.id)}
                  className={`py-1.5 px-3 rounded text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap ${selectedArea === a.id ? 'bg-or text-nero font-bold' : 'bg-surface border border-white/10 text-muted hover:text-ivoire'}`}
                >
                  {a.name.fr}
                </button>
              ))}
            </div>

            {/* Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTables.map((table) => {
                const qrData = qrCodes[table.id];
                const status = getTableStatus(table.id);
                const tableOrders = getOrdersForTable(table.id);
                return (
                  <div key={table.id} className="bg-surface border border-white/10 hover:border-or/60 p-5 rounded-sm flex flex-col justify-between transition-all">
                    <div>
                      <div className="flex justify-between items-start gap-3 border-b border-white/5 pb-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs text-or font-bold uppercase">Table {table.number}</span>
                            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${status.color}`}>{status.label}</span>
                          </div>
                          <h3 className="font-serif-luxury text-xl text-ivoire font-light mt-0.5">{table.name}</h3>
                          <p className="text-[10px] text-muted font-serif italic">{table.areaSubtitle?.fr || table.shape} · {table.capacity}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 bg-nero/60 p-3.5 border border-white/10 rounded-sm mb-4">
                        <div
                          onClick={() => setFullscreenTable(table)}
                          className="w-24 h-24 p-1.5 bg-[#F2EBDD] rounded-sm shrink-0 cursor-pointer hover:ring-2 hover:ring-or transition-all flex items-center justify-center shadow"
                        >
                          {qrData ? (
                            <img src={qrData} alt={`QR Table ${table.number}`} className="w-full h-full object-contain" />
                          ) : (
                            <div className="text-[9px] font-mono text-nero">QR...</div>
                          )}
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-0">
                          <button
                            onClick={() => setFullscreenTable(table)}
                            className="w-full py-2 px-2.5 bg-or/15 hover:bg-or hover:text-nero text-or border border-or/40 rounded text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 font-semibold"
                          >
                            <Maximize2 size={12} />
                            <span>Montrer le QR</span>
                          </button>
                          <button
                            onClick={() => handleCopyLink(table)}
                            className="w-full py-1.5 px-2.5 bg-surface hover:bg-surface-elevated text-muted hover:text-ivoire border border-white/10 rounded text-[11px] font-mono transition-all flex items-center justify-center gap-1.5"
                          >
                            {copiedTableId === table.id ? (
                              <><Check size={12} className="text-or" /><span className="text-or">Lien Copié !</span></>
                            ) : (
                              <><Copy size={12} /><span>Copier le Lien</span></>
                            )}
                          </button>
                        </div>
                      </div>

                      {tableOrders.length > 0 && (
                        <div className="mb-4 p-2.5 bg-or/5 border border-or/20 rounded-sm text-xs space-y-1">
                          <div className="font-mono text-[10px] text-or uppercase font-semibold">
                            {tableOrders.length} commande(s) en cours :
                          </div>
                          {tableOrders.map(o => (
                            <div key={o.id} className="flex justify-between text-[11px] text-ivoire/90">
                              <span>{o.reference}</span>
                              <span className="font-mono text-or">{o.totalAmount} €</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <a
                        href={`/table/${table.id}`} target="_blank" rel="noreferrer"
                        className="text-muted hover:text-or transition-colors flex items-center gap-1 font-mono text-[11px]"
                      >
                        <span>Ouvrir la Table</span>
                        <ExternalLink size={11} />
                      </a>
                      <button
                        onClick={() => handleDownloadQr(table)}
                        className="text-muted hover:text-ivoire transition-colors flex items-center gap-1 font-mono text-[11px]"
                      >
                        <Download size={11} />
                        <span>Télécharger PNG</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            TAB 3: KDS / CUISINE
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'kds' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div>
                <h2 className="font-serif-luxury text-2xl text-ivoire font-light">Commandes en Cuisine</h2>
                <p className="text-xs text-muted mt-0.5">{activeOrders.length} commande(s) active(s) en ce moment.</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/kds" target="_blank"
                  className="py-2 px-4 bg-or hover:bg-or-light text-nero rounded-sm text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 font-bold"
                >
                  <ExternalLink size={13} />
                  <span>KDS Cuisine (Plein Écran)</span>
                </Link>
              </div>
            </div>

            {activeOrders.length === 0 ? (
              <div className="text-center py-20 bg-surface border border-white/10 rounded-sm">
                <UtensilsCrossed size={36} className="mx-auto text-muted/30 mb-3" />
                <p className="text-sm text-muted">Aucune commande active pour le moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeOrders.map(order => {
                  const st = statusLabel(order.status);
                  const elapsed = Math.round((Date.now() - new Date(order.createdAt).getTime()) / 60000);
                  return (
                    <div key={order.id} className="bg-surface border border-or-subtle p-5 rounded-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-3">
                          <div>
                            <div className="font-mono text-xs text-or font-bold uppercase">{order.tableName}</div>
                            <div className="text-[10px] text-muted font-mono">{order.reference}</div>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-sm text-ivoire font-bold">{order.totalAmount} €</span>
                            <div className={`text-[9px] font-mono px-1.5 py-0.5 rounded border mt-1 ${st.color}`}>{st.label}</div>
                          </div>
                        </div>

                        <div className="space-y-1.5 mb-4 text-xs">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between text-ivoire/90">
                              <span>{it.quantity}x {it.name}</span>
                              <span className="font-mono text-muted">{it.price * it.quantity} €</span>
                            </div>
                          ))}
                        </div>

                        {order.notes && (
                          <div className="p-2 bg-nero border border-white/10 rounded text-[11px] text-muted italic mb-3">
                            {order.notes}
                          </div>
                        )}

                        <div className="flex items-center gap-1.5 text-[10px] text-muted font-mono">
                          <Clock size={10} />
                          <span>Il y a {elapsed} min — {order.serviceRound === 'direct' ? 'Service direct' : order.serviceRound}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 space-y-2 mt-3">
                        <div className="grid grid-cols-3 gap-1.5">
                          {['preparing', 'plating', 'served'].map(s => (
                            <button
                              key={s}
                              onClick={() => updateOrderStatus(order.id, s)}
                              disabled={order.status === s}
                              className={`py-1.5 px-2 rounded text-[10px] font-mono uppercase font-bold transition-all ${
                                order.status === s
                                  ? 'bg-or text-nero cursor-default'
                                  : 'bg-nero border border-white/10 text-muted hover:border-or/40 hover:text-ivoire'
                              }`}
                            >
                              {s === 'preparing' ? 'Cuisine' : s === 'plating' ? 'Dressage' : 'Servi'}
                            </button>
                          ))}
                        </div>
                        <button
                          onClick={() => closeTableSession(order.tableId)}
                          className="w-full py-1.5 px-3 text-xs font-mono text-muted hover:text-terracotta border border-white/10 hover:border-terracotta/40 rounded transition-all"
                        >
                          Clôturer la Table
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            TAB 4: APPELS & ADDITIONS
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'calls' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-serif-luxury text-2xl text-ivoire font-light">Appels de Table</h2>
                <p className="text-xs text-muted mt-0.5">{serviceCalls.length} demande(s) en attente.</p>
              </div>
            </div>

            {serviceCalls.length === 0 ? (
              <div className="text-center py-20 bg-surface border border-white/10 rounded-sm">
                <CheckCircle2 size={36} className="mx-auto text-or/30 mb-3" />
                <p className="text-sm text-muted">Aucun appel ni demande d'addition en attente.</p>
                <p className="text-xs text-muted/60 mt-1">Toutes les tables sont sereines.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {serviceCalls.map(call => {
                  const typeInfo = {
                    bill: { label: 'Demande d\'Addition', border: 'border-amber-500/50', accent: 'text-amber-400', bg: 'bg-amber-950/20' },
                    sommelier: { label: 'Appel Sommelier', border: 'border-or/50', accent: 'text-or', bg: 'bg-or/5' },
                    water_bread: { label: 'Eau / Pain', border: 'border-blue-500/40', accent: 'text-blue-400', bg: 'bg-blue-950/20' },
                    waiter: { label: 'Appel Serveur', border: 'border-white/20', accent: 'text-ivoire', bg: 'bg-surface-elevated' },
                  }[call.type] || { label: call.type, border: 'border-white/20', accent: 'text-ivoire', bg: 'bg-surface' };

                  return (
                    <div key={call.id} className={`bg-surface border ${typeInfo.border} p-4 rounded-sm flex flex-col gap-3`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className={`font-mono text-sm font-bold ${typeInfo.accent}`}>{call.tableName}</div>
                          <div className="text-xs text-ivoire font-medium mt-0.5">{typeInfo.label}</div>
                          {call.notes && <p className="text-[11px] text-muted mt-1">{call.notes}</p>}
                          {call.paymentMethod && (
                            <div className={`text-[10px] font-mono mt-1.5 ${typeInfo.accent}`}>
                              Paiement : {call.paymentMethod.toUpperCase()}
                            </div>
                          )}
                          <div className="text-[10px] text-muted/60 font-mono mt-1">{formatTime(call.createdAt)}</div>
                        </div>
                        <button
                          onClick={() => dismissServiceCall(call.id)}
                          className="p-2 rounded bg-or text-nero hover:bg-or-light transition-colors shrink-0"
                          title="Marquer comme traité"
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            TAB 5: HISTORIQUE
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'history' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-luxury text-2xl text-ivoire font-light">Historique des Commandes</h2>
                <p className="text-xs text-muted mt-0.5">{filteredHistory.length} commande(s) enregistrée(s).</p>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'served', label: 'Servies' },
                  { id: 'closed', label: 'Clôturées' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setHistoryFilter(f.id)}
                    className={`py-1.5 px-3 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                      historyFilter === f.id ? 'bg-or text-nero font-bold' : 'bg-surface border border-white/10 text-muted hover:text-ivoire'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredHistory.length === 0 ? (
              <div className="text-center py-20 bg-surface border border-white/10 rounded-sm">
                <History size={36} className="mx-auto text-muted/30 mb-3" />
                <p className="text-sm text-muted">Aucune commande dans l'historique.</p>
              </div>
            ) : (
              <div className="bg-surface border border-white/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/10 bg-nero/40">
                        <th className="text-left py-3 px-4 font-mono text-muted uppercase tracking-wider text-[10px]">Référence</th>
                        <th className="text-left py-3 px-4 font-mono text-muted uppercase tracking-wider text-[10px]">Table</th>
                        <th className="text-left py-3 px-4 font-mono text-muted uppercase tracking-wider text-[10px]">Articles</th>
                        <th className="text-right py-3 px-4 font-mono text-muted uppercase tracking-wider text-[10px]">Montant</th>
                        <th className="text-left py-3 px-4 font-mono text-muted uppercase tracking-wider text-[10px]">Statut</th>
                        <th className="text-left py-3 px-4 font-mono text-muted uppercase tracking-wider text-[10px]">Date</th>
                        <th className="text-left py-3 px-4 font-mono text-muted uppercase tracking-wider text-[10px]">Heure</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredHistory.map((order, i) => {
                        const st = statusLabel(order.status);
                        return (
                          <tr key={order.id || i} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 px-4 font-mono text-or text-[11px]">{order.reference || order.id}</td>
                            <td className="py-3 px-4 text-ivoire/80">{order.tableName}</td>
                            <td className="py-3 px-4 text-muted">
                              {(order.items || []).slice(0, 2).map(it => `${it.quantity}x ${it.name}`).join(', ')}
                              {(order.items || []).length > 2 && ` +${order.items.length - 2}`}
                            </td>
                            <td className="py-3 px-4 text-right font-mono text-ivoire font-semibold">{order.totalAmount} €</td>
                            <td className="py-3 px-4">
                              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${st.color}`}>{st.label}</span>
                            </td>
                            <td className="py-3 px-4 font-mono text-muted text-[10px]">{formatDate(order.createdAt)}</td>
                            <td className="py-3 px-4 font-mono text-muted text-[10px]">{formatTime(order.createdAt)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/10 bg-nero/40">
                        <td colSpan={3} className="py-3 px-4 font-mono text-xs text-muted">
                          {filteredHistory.length} commande(s)
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-or font-bold text-sm">
                          {filteredHistory.reduce((s, o) => s + (Number(o.totalAmount) || 0), 0)} €
                        </td>
                        <td colSpan={3} />
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            TAB: RÉSERVATIONS DE TABLES
        ════════════════════════════════════════════════════════════════ */}
        {activeTab === 'reservations' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-luxury text-2xl text-ivoire font-light">Réservations Enregistrées</h2>
                <p className="text-xs text-muted mt-0.5">{reservations.length} réservation(s) synchronisée(s) en direct avec Cloud Firestore.</p>
              </div>
            </div>

            {reservations.length === 0 ? (
              <div className="text-center py-20 bg-surface border border-white/10 rounded-sm">
                <CalendarDays size={36} className="mx-auto text-or/30 mb-3" />
                <p className="text-sm text-muted">Aucune réservation pour le moment.</p>
                <p className="text-xs text-muted/60 mt-1">Les réservations effectuées par les convives apparaîtront ici automatiquement.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reservations.map((res) => {
                  const statusColors = {
                    confirmed: 'text-or border-or/40 bg-or/10',
                    arrived: 'text-emerald-400 border-emerald-400/40 bg-emerald-950/20',
                    cancelled: 'text-terracotta border-terracotta/40 bg-terracotta/10'
                  };
                  const statusText = {
                    confirmed: 'Confirmée',
                    arrived: 'Convives à Table',
                    cancelled: 'Annulée'
                  };

                  return (
                    <div key={res.id} className="bg-surface border border-white/10 hover:border-or/50 p-5 rounded-sm flex flex-col justify-between transition-all">
                      <div>
                        <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-3">
                          <div>
                            <div className="font-mono text-xs text-or font-bold">{res.reference}</div>
                            <div className="font-serif-luxury text-lg text-ivoire mt-0.5">{res.firstName} {res.lastName}</div>
                          </div>
                          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${statusColors[res.status] || statusColors.confirmed}`}>
                            {statusText[res.status] || res.status}
                          </span>
                        </div>

                        <div className="space-y-1.5 text-xs text-muted mb-4 font-mono">
                          <div className="flex justify-between">
                            <span>Date :</span>
                            <span className="text-ivoire font-semibold">{res.date} · {res.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Convives :</span>
                            <span className="text-ivoire">{res.guests}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Espace :</span>
                            <span className="text-ivoire">{res.seating}</span>
                          </div>
                          {res.phone && (
                            <div className="flex justify-between">
                              <span>Tél :</span>
                              <span className="text-ivoire">{res.phone}</span>
                            </div>
                          )}
                          {res.email && (
                            <div className="flex justify-between">
                              <span>Email :</span>
                              <span className="text-ivoire truncate max-w-[170px]">{res.email}</span>
                            </div>
                          )}
                          {res.specialOccasion && res.specialOccasion !== 'Aucune' && (
                            <div className="p-2 bg-or/5 border border-or/20 rounded text-[11px] text-or mt-2 font-serif italic">
                              Occasion : {res.specialOccasion}
                            </div>
                          )}
                          {res.dietaryNotes && (
                            <div className="p-2 bg-amber-950/20 border border-amber-500/20 rounded text-[11px] text-amber-200 mt-1">
                              Allergies : {res.dietaryNotes}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                        {res.status !== 'arrived' && (
                          <button
                            type="button"
                            onClick={() => updateReservationStatus(res.id, 'arrived')}
                            className="flex-1 py-1.5 px-3 bg-or hover:bg-or-light text-nero font-mono text-xs uppercase font-bold rounded transition-all"
                          >
                            Marquer Arrivé
                          </button>
                        )}
                        {res.status !== 'cancelled' && (
                          <button
                            type="button"
                            onClick={() => updateReservationStatus(res.id, 'cancelled')}
                            className="py-1.5 px-3 text-xs font-mono text-muted hover:text-terracotta border border-white/10 hover:border-terracotta/40 rounded transition-all"
                          >
                            Annuler
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Fullscreen QR Modal ──────────────────────────────────────── */}
        {fullscreenTable && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md"
            onClick={() => setFullscreenTable(null)}
          >
            <div
              className="relative w-full max-w-sm bg-[#10100E] border-2 border-[#B89B5E] p-8 text-center rounded-sm shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setFullscreenTable(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-nero border border-white/15 flex items-center justify-center text-muted hover:text-or"
              >
                <X size={18} />
              </button>
              <div className="space-y-1">
                <span className="font-serif-luxury tracking-[0.25em] text-[#B89B5E] text-xs uppercase block font-semibold">LUCENTE MILANO</span>
                <div className="font-mono text-xs text-[#B89B5E] uppercase font-bold">TABLE {fullscreenTable.number}</div>
                <h3 className="font-serif-luxury text-2xl text-[#F2EBDD] font-light">{fullscreenTable.name}</h3>
              </div>
              <div className="p-4 bg-[#F2EBDD] rounded-sm shadow-2xl border border-or inline-block">
                {qrCodes[fullscreenTable.id] && (
                  <img
                    src={qrCodes[fullscreenTable.id]}
                    alt={`QR Code Table ${fullscreenTable.number}`}
                    className="w-64 h-64 mx-auto object-contain"
                  />
                )}
              </div>
              <div className="space-y-1">
                <p className="font-serif text-sm text-[#F2EBDD]">Pointez votre appareil photo pour commander</p>
                <p className="text-[10px] text-muted font-mono break-all">{baseUrl}/table/{fullscreenTable.id}</p>
              </div>
              <button
                onClick={() => handleCopyLink(fullscreenTable)}
                className="w-full py-2.5 px-4 bg-surface hover:bg-surface-elevated text-or border border-or/40 rounded text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {copiedTableId === fullscreenTable.id ? (
                  <><Check size={13} /><span>Lien Copié dans le Presse-Papier</span></>
                ) : (
                  <><Copy size={13} /><span>Copier le Lien Direct</span></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ── Admin Session Expiry Warning Modal ────────────────────────────── */}
        {isWarningOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface border-2 border-or/80 p-6 sm:p-8 rounded-sm shadow-2xl space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-or/15 border border-or flex items-center justify-center mx-auto text-or shadow-lg shadow-or/20">
                <Clock size={28} className="animate-spin" />
              </div>

              <div className="space-y-2">
                <span className="font-serif-luxury tracking-[0.25em] text-or text-xs uppercase block font-semibold">
                  Sécurité de Direction
                </span>
                <h2 className="font-serif-luxury text-2xl text-ivoire font-light">
                  Expiration Imminente de la Session
                </h2>
                <p className="text-xs text-muted leading-relaxed font-serif italic">
                  « Aucune interaction détectée depuis 13 minutes. Pour préserver la sécurité de la console, votre session sera verrouillée dans : »
                </p>
              </div>

              <div className="py-3 px-6 bg-nero border border-or/40 rounded font-mono text-3xl font-bold text-or tracking-widest inline-block shadow-inner">
                {timeRemainingFormatted}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={extendSession}
                  className="w-full py-3.5 px-5 bg-or hover:bg-or-light text-nero font-semibold text-xs font-mono uppercase tracking-wider transition-all shadow-lg shadow-or/20"
                >
                  Prolonger ma Session (15 min)
                </button>
                <button
                  type="button"
                  onClick={() => handleSignOut('inactivity')}
                  className="w-full py-3.5 px-5 bg-surface hover:bg-surface-elevated text-muted hover:text-ivoire border border-white/10 text-xs font-mono uppercase tracking-wider transition-all"
                >
                  Verrouiller Maintenant
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
