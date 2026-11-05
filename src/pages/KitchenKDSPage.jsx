import React, { useState, useEffect } from 'react';
import { 
  Utensils, Clock, CheckCircle2, AlertTriangle, 
  Flame, Bell, Coffee, Wine, CreditCard, ChevronRight, Check, X, RefreshCw
} from 'lucide-react';
import { 
  subscribeToAllActiveOrders, 
  updateOrderStatus, 
  closeTableSession,
  subscribeToServiceCalls,
  dismissServiceCall
} from '../utils/tableOrderManager';
import SEOHead from '../components/SEOHead';

export default function KitchenKDSPage() {
  const [orders, setOrders] = useState([]);
  const [serviceCalls, setServiceCalls] = useState([]);
  const [filterStatus, setFilterStatus] = useState('active'); // 'all' | 'active' | 'preparing' | 'served'
  const [currentTime, setCurrentTime] = useState('');

  // Clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subscriptions
  useEffect(() => {
    const unsubOrders = subscribeToAllActiveOrders((allOrders) => {
      setOrders(allOrders);
    });
    const unsubCalls = subscribeToServiceCalls((calls) => {
      setServiceCalls(calls);
    });
    return () => {
      unsubOrders();
      unsubCalls();
    };
  }, []);

  // Filtered orders
  const filteredOrders = orders.filter(o => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return o.status !== 'served' && o.status !== 'closed';
    if (filterStatus === 'preparing') return o.status === 'preparing' || o.status === 'plating';
    if (filterStatus === 'served') return o.status === 'served';
    return true;
  });

  const activeTablesCount = new Set(orders.filter(o => o.status !== 'closed').map(o => o.tableId)).size;
  const preparingCount = orders.filter(o => o.status === 'preparing' || o.status === 'received').length;

  const getElapsedMinutes = (dateString) => {
    if (!dateString) return 0;
    const diffMs = Date.now() - new Date(dateString).getTime();
    return Math.floor(diffMs / 60000);
  };

  const handleNextStatus = async (order) => {
    if (order.status === 'received') {
      await updateOrderStatus(order.id, 'preparing');
    } else if (order.status === 'preparing') {
      await updateOrderStatus(order.id, 'plating');
    } else if (order.status === 'plating') {
      await updateOrderStatus(order.id, 'served');
    }
  };

  return (
    <>
      <SEOHead 
        title="Kitchen Display System (KDS) | Brigade LUCENTE"
        description="Console de gestion des commandes de table en direct pour la brigade de cuisine et le maître d'hôtel."
      />

      <div className="min-h-screen bg-nero text-ivoire pt-24 pb-16 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-or-subtle pb-5 mb-6">
          <div>
            <div className="mb-1">
              <span className="typo-metadata text-[10px] text-or uppercase tracking-widest font-mono">
                Brigade Vincenzo Moretti · Live KDS
              </span>
            </div>
            <h1 className="font-serif-luxury text-2xl sm:text-4xl text-ivoire font-light">
              Écran Cuisine & Service en Direct
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-surface px-4 py-2 border border-white/10 rounded-sm text-right">
              <div className="text-[10px] text-muted font-mono uppercase">Service Milano</div>
              <div className="font-mono text-lg text-or font-bold">{currentTime || '20:00:00'}</div>
            </div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-surface p-4 border border-white/10 rounded-sm">
            <div className="text-[10px] text-muted font-mono uppercase">Tables Actives</div>
            <div className="font-mono text-2xl text-ivoire font-bold mt-1">{activeTablesCount}</div>
          </div>
          <div className="bg-surface p-4 border border-white/10 rounded-sm">
            <div className="text-[10px] text-muted font-mono uppercase">Commandes à Traiter</div>
            <div className="font-mono text-2xl text-or font-bold mt-1">{preparingCount}</div>
          </div>
          <div className="bg-surface p-4 border border-white/10 rounded-sm">
            <div className="text-[10px] text-muted font-mono uppercase">Appels de Salle</div>
            <div className="font-mono text-2xl text-amber-400 font-bold mt-1">{serviceCalls.length}</div>
          </div>
          <div className="bg-surface p-4 border border-white/10 rounded-sm">
            <div className="text-[10px] text-muted font-mono uppercase">Total Commandes Jour</div>
            <div className="font-mono text-2xl text-or font-bold mt-1">{orders.length}</div>
          </div>
        </div>

        {/* Service Alerts Banner (Calls from Tables) */}
        {serviceCalls.length > 0 && (
          <div className="mb-8 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Bell size={13} className="animate-bounce" />
              <span>Demandes Immédiates en Salle ({serviceCalls.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {serviceCalls.map((call) => (
                <div 
                  key={call.id}
                  className="bg-amber-950/40 border border-amber-500/50 p-3.5 rounded-sm flex items-start justify-between gap-3 animate-pulse"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-amber-300 font-bold">{call.tableName}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-400 text-nero font-bold">
                        {call.type === 'bill' ? 'ADDITION' : call.type === 'sommelier' ? 'SOMMELIER' : 'SERVICE'}
                      </span>
                    </div>
                    <p className="text-xs text-ivoire/90">{call.notes || 'Demande d\'assistance à table'}</p>
                    {call.paymentMethod && (
                      <div className="text-[10px] text-amber-200/80 font-mono">
                        Règlement : {call.paymentMethod.toUpperCase()}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => dismissServiceCall(call.id)}
                    className="p-1.5 rounded bg-amber-500 text-nero hover:bg-amber-400 transition-colors shrink-0"
                    title="Marquer comme traité"
                  >
                    <Check size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'active', label: 'Commandes Actives' },
            { id: 'preparing', label: 'En Cuisson / Dressage' },
            { id: 'served', label: 'Déjà Servies' },
            { id: 'all', label: 'Toutes les Commandes' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterStatus(btn.id)}
              className={`py-1.5 px-3.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-all ${
                filterStatus === btn.id
                  ? 'border-or bg-or text-nero font-bold'
                  : 'border-white/10 text-muted hover:border-white/30'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-surface border border-white/10 rounded-sm">
            <Utensils size={32} className="mx-auto text-muted/40 mb-3" />
            <p className="text-sm text-muted">Aucune commande ne correspond au filtre actif.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => {
              const elapsed = getElapsedMinutes(order.createdAt);
              const isUrgent = elapsed > 25 && order.status !== 'served';

              return (
                <div 
                  key={order.id}
                  className={`bg-surface border rounded-sm p-5 flex flex-col justify-between transition-all ${
                    isUrgent 
                      ? 'border-terracotta bg-terracotta/10 shadow-lg shadow-terracotta/10' 
                      : order.status === 'served'
                        ? 'border-white/10 opacity-70'
                        : 'border-or-subtle hover:border-or'
                  }`}
                >
                  <div>
                    {/* Order Header */}
                    <div className="flex justify-between items-start gap-2 border-b border-white/10 pb-3 mb-3">
                      <div>
                        <div className="font-mono text-xs text-or font-bold uppercase">
                          {order.tableName}
                        </div>
                        <div className="text-[10px] text-muted font-mono">
                          Réf: {order.reference} · {order.areaName}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded font-semibold ${
                          elapsed > 20 ? 'bg-terracotta/30 text-terracotta' : 'bg-white/10 text-ivoire'
                        }`}>
                          {elapsed} min
                        </span>
                        <div className="text-[10px] text-muted font-mono mt-0.5">
                          {order.paymentStatus === 'paid' ? 'Payé Mobile' : 'À table'}
                        </div>
                      </div>
                    </div>

                    {/* Table Notes / Allergies alert */}
                    {order.notes && (
                      <div className="mb-3 p-2 bg-terracotta/20 border border-terracotta/40 text-terracotta text-xs rounded-sm flex items-center gap-1.5 font-mono">
                        <AlertTriangle size={13} className="shrink-0" />
                        <span>Note : {order.notes}</span>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="space-y-2.5 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-2 text-xs">
                          <div className="flex justify-between font-medium text-ivoire">
                            <span>
                              <strong className="text-or font-mono mr-1.5">{item.quantity}x</strong>
                              {item.name}
                            </span>
                            <span className="font-mono text-muted">{item.price * item.quantity} €</span>
                          </div>

                          {item.cooking && (
                            <div className="text-[10px] text-amber-300 font-mono mt-0.5">
                              → Cuisson : {item.cooking}
                            </div>
                          )}

                          {item.allergies && item.allergies.length > 0 && (
                            <div className="text-[10px] text-terracotta font-semibold mt-0.5">
                              → ALLERGIE : {item.allergies.join(', ')}
                            </div>
                          )}

                          {item.winePairing && (
                            <div className="text-[10px] text-or/90 italic mt-0.5">
                              → {item.winePairing}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    {order.status !== 'served' ? (
                      <button
                        onClick={() => handleNextStatus(order)}
                        className="flex-1 py-2 px-3 bg-or hover:bg-or-light text-nero font-mono text-xs uppercase font-bold tracking-wider rounded-sm transition-all flex items-center justify-center gap-1.5 shadow"
                      >
                        {order.status === 'received' && <span>Lancer Préparation</span>}
                        {order.status === 'preparing' && <span>Prêt pour Dressage</span>}
                        {order.status === 'plating' && <span>Marquer comme Servi</span>}
                        <ChevronRight size={14} />
                      </button>
                    ) : (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-xs text-or font-mono flex items-center gap-1">
                          <CheckCircle2 size={13} />
                          <span>Servie en Salle</span>
                        </span>
                        <button
                          onClick={() => closeTableSession(order.tableId)}
                          className="py-1 px-2.5 text-[10px] font-mono text-muted hover:text-terracotta border border-white/10 hover:border-terracotta/40 rounded transition-colors"
                        >
                          Clôturer Table
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </>
  );
}

