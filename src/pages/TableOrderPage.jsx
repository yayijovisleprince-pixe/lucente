import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Utensils, Wine, Coffee, Bell, CreditCard, 
  ShoppingBag, Check, Plus, Minus, Trash2, Clock, 
  ChevronRight, AlertCircle, ShieldCheck, ArrowLeft, Send, X
} from 'lucide-react';
import { getTableById, allTables } from '../data/tablesData';
import { getTastingMenus, getALaCarteSections } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  submitTableOrder, 
  subscribeToTableOrders 
} from '../utils/tableOrderManager';
import TableItemModal from '../components/TableItemModal';
import TableServiceModal from '../components/TableServiceModal';
import SEOHead from '../components/SEOHead';
import confetti from 'canvas-confetti';

export default function TableOrderPage() {
  const { tableId } = useParams();
  const { lang, t } = useLanguage();

  const table = useMemo(() => getTableById(tableId), [tableId]);

  // Menu data
  const tastingMenus = useMemo(() => getTastingMenus(lang), [lang]);
  const aLaCarte = useMemo(() => getALaCarteSections(lang), [lang]);

  // State
  const [activeTab, setActiveTab] = useState('antipasti'); // 'tasting' | 'antipasti' | 'primi' | 'secondi' | 'dolci' | 'vini'
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all' | 'gluten_free' | 'vegetarian' | 'lactose_free'
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Active table orders tracked live
  const [activeOrders, setActiveOrders] = useState([]);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderSuccessBanner, setOrderSuccessBanner] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [paymentPreference, setPaymentPreference] = useState('table'); // 'table' | 'hybrid_online'
  const [guestCount, setGuestCount] = useState('2 convives');
  const [tableNotes, setTableNotes] = useState('');

  // Subscribe to live orders for this table
  useEffect(() => {
    if (!table) return;
    const unsubscribe = subscribeToTableOrders(table.id, (orders) => {
      setActiveOrders(orders);
    });
    return () => unsubscribe();
  }, [table]);

  // Cart calculations
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleAddToCart = (customizedItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(i => 
        i.name === customizedItem.name && 
        i.cooking === customizedItem.cooking && 
        i.winePairing === customizedItem.winePairing &&
        i.serviceRound === customizedItem.serviceRound
      );
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].quantity += customizedItem.quantity;
        return copy;
      }
      return [...prev, customizedItem];
    });
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.9 },
      colors: ['#B89B5E', '#F2EBDD']
    });
  };

  const handleUpdateCartQty = (index, delta) => {
    setCart((prev) => {
      const copy = [...prev];
      copy[index].quantity += delta;
      if (copy[index].quantity <= 0) {
        return copy.filter((_, idx) => idx !== index);
      }
      return copy;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSendOrderToKitchen = async () => {
    if (cart.length === 0 || !table) return;
    setIsSubmittingOrder(true);
    setOrderError(null);

    try {
      const order = await submitTableOrder({
        tableId: table.id,
        tableName: table.name,
        areaName: table.areaName ? (table.areaName[lang] || table.areaName.fr) : 'Salle',
        items: cart,
        totalAmount: totalCartPrice,
        guestCount,
        notes: tableNotes,
        paymentPreference
      });

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#B89B5E', '#D4BD88', '#F2EBDD']
      });

      setCart([]);
      setIsCartOpen(false);
      setOrderSuccessBanner(order?.reference || 'Transmise');
      setTimeout(() => setOrderSuccessBanner(null), 9000);
    } catch (err) {
      console.error('Error submitting table order:', err);
      setOrderError(err.message || 'Impossible de transmettre la commande en cuisine.');
    } finally {
      setIsSubmittingOrder(false);
    }
  };

  // If table not found, provide a selector
  if (!table) {
    return (
      <div className="min-h-screen bg-nero pt-28 pb-16 px-4">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-or/15 border border-or flex items-center justify-center mx-auto text-or">
            <AlertCircle size={32} />
          </div>
          <h1 className="font-serif-luxury text-3xl text-ivoire">
            Table non identifiée
          </h1>
          <p className="text-muted text-sm leading-relaxed">
            Le QR code scanné n'a pas pu être associé à une table spécifique. Veuillez choisir votre table ci-dessous pour débuter votre commande :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-left pt-4">
            {allTables.map(t => (
              <Link
                key={t.id}
                to={`/table/${t.id}`}
                className="p-3 bg-surface hover:bg-surface-elevated border border-white/10 hover:border-or/60 transition-all rounded-sm block"
              >
                <div className="font-mono text-xs text-or uppercase tracking-wider font-semibold">
                  Table {t.number}
                </div>
                <div className="text-xs text-ivoire truncate mt-0.5">
                  {t.name}
                </div>
                <div className="text-[10px] text-muted mt-1">
                  {t.capacity}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active status color helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'received':
        return { label: 'Reçue en Cuisine', color: 'bg-blue-900/40 text-blue-300 border-blue-500/30' };
      case 'preparing':
        return { label: 'En Préparation par la Brigade', color: 'bg-amber-900/40 text-amber-300 border-amber-500/30' };
      case 'plating':
        return { label: 'Dressage & Envoi Imminent', color: 'bg-or/20 text-or border-or/40' };
      case 'served':
        return { label: 'Servie à Table', color: 'bg-or/20 text-or border-or/40' };
      default:
        return { label: 'En cours', color: 'bg-white/10 text-ivoire border-white/20' };
    }
  };

  return (
    <>
      <SEOHead 
        title={`Commande à Table — ${table.name} | LUCENTE Milano`}
        description="Expérience gastronomique en direct : commandez à votre table, personnalisez vos mets et suivez la préparation de la brigade."
      />

      <div className="min-h-screen bg-nero text-ivoire pt-24 pb-32 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* Success Banner */}
        {orderSuccessBanner && (
          <div className="mb-6 p-4 bg-or/15 border border-or text-ivoire rounded-sm flex items-start justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-or text-base font-serif">✦</span>
              <div>
                <p className="font-serif-luxury text-sm text-or font-medium">
                  Commande {orderSuccessBanner} transmise avec succès à la brigade
                </p>
                <p className="text-xs text-muted mt-0.5">
                  La brigade Moretti prépare vos mets. Suivez l'avancement en direct ci-dessous.
                </p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={() => setOrderSuccessBanner(null)} 
              className="text-muted hover:text-ivoire transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Error Banner */}
        {orderError && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 text-red-200 rounded-sm flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="text-red-400 shrink-0" />
              <p className="text-xs">{orderError}</p>
            </div>
            <button 
              type="button" 
              onClick={() => setOrderError(null)} 
              className="text-red-400 hover:text-red-200"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Top Table Welcome Banner */}
        <div className="bg-surface border border-or-subtle/50 p-4 sm:p-6 mb-8 rounded-sm shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="typo-metadata text-[10px] text-or uppercase tracking-widest font-mono">
                  Session de Table Active · {table.areaName ? (table.areaName[lang] || table.areaName.fr) : 'LUCENTE'}
                </span>
              </div>
              <h1 className="font-serif-luxury text-2xl sm:text-4xl font-light text-ivoire">
                {table.name}
              </h1>
              <p className="typo-editorial text-xs sm:text-sm text-muted italic">
                « {table.shape} · {table.capacity} — Benvenuto a tavola »
              </p>
            </div>

            {/* Concierge Services Quick Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(true)}
                className="py-2.5 px-4 bg-or/15 hover:bg-or/25 border border-or/50 text-or text-xs font-mono uppercase tracking-wider rounded-sm transition-all flex items-center gap-2"
              >
                <Bell size={13} />
                <span>Conciergerie & Services</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Active Orders Tracker (if orders exist for this table) */}
        {activeOrders.length > 0 && (
          <div className="mb-10 bg-surface-card border border-or/40 p-4 sm:p-6 rounded-sm shadow-2xl">
            <div className="flex items-center justify-between border-b border-or-subtle pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-or animate-spin" />
                <h3 className="font-serif-luxury text-lg sm:text-xl text-ivoire font-light">
                  Suivi en Direct de Vos Commandes à Table
                </h3>
              </div>
              <span className="font-mono text-xs text-or">
                {activeOrders.length} {activeOrders.length > 1 ? 'commandes transmises' : 'commande transmise'}
              </span>
            </div>

            <div className="space-y-4">
              {activeOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <div key={order.id} className="p-3.5 bg-nero/50 border border-white/10 rounded-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-or font-semibold">{order.reference}</span>
                        <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-ivoire font-bold">
                        {order.totalAmount} €
                      </span>
                    </div>

                    <div className="text-xs text-muted space-y-1">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px]">
                          <span>
                            {it.quantity}x {it.name}
                            {it.cooking && <span className="text-or/80 ml-1">({it.cooking})</span>}
                            {it.winePairing && <span className="text-or ml-1">+ Accord Vin</span>}
                          </span>
                          <span className="font-mono">{it.price * it.quantity} €</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-white/10">
          {[
            { id: 'antipasti', label: 'Antipasti' },
            { id: 'primi', label: 'Primi Piatti (Pâtes & Riz)' },
            { id: 'secondi', label: 'Secondi (Viandes & Poissons)' },
            { id: 'dolci', label: 'Dolci (Desserts)' },
            { id: 'tasting', label: 'Menus Dégustation' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`py-2 px-4 whitespace-nowrap text-xs uppercase font-mono tracking-wider transition-all rounded-sm border ${
                activeTab === cat.id
                  ? 'border-or bg-or text-nero font-bold'
                  : 'border-white/10 text-muted hover:text-ivoire hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeTab === 'tasting' ? (
            tastingMenus.map((menu) => (
              <div 
                key={menu.id}
                className="bg-surface border border-or-subtle/40 p-6 rounded-sm flex flex-col justify-between hover:border-or transition-all"
              >
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <div>
                      <span className="typo-metadata text-[10px] text-or uppercase tracking-widest">{menu.tag ? (menu.tag[lang] || menu.tag.fr) : 'Menu'}</span>
                      <h3 className="font-serif-luxury text-2xl text-ivoire font-light mt-0.5">{menu.name}</h3>
                      <p className="font-serif text-xs text-or italic">{menu.italianName}</p>
                    </div>
                    <span className="font-mono text-xl text-or font-semibold">{menu.price}</span>
                  </div>
                  <p className="typo-editorial text-xs text-muted leading-relaxed mb-4">
                    « {menu.description ? (menu.description[lang] || menu.description.fr) : ''} »
                  </p>
                  <div className="text-[11px] text-or-light font-serif italic mb-4">
                    {menu.winePairingPrice ? (menu.winePairingPrice[lang] || menu.winePairingPrice.fr) : ''}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedItemForCustomization({
                    name: menu.name,
                    price: menu.price,
                    description: menu.description,
                    pairing: menu.winePairingPrice ? (menu.winePairingPrice[lang] || menu.winePairingPrice.fr) : null,
                    pairingPrice: '130 €',
                    category: 'MENU DEGUSTAZIONE'
                  })}
                  className="w-full py-2.5 px-4 btn-table-choice text-xs font-mono uppercase tracking-widest text-center font-semibold"
                >
                  Commander ce Menu à Table
                </button>
              </div>
            ))
          ) : (
            // A La Carte items
            (() => {
              const currentSection = aLaCarte.find(s => s.id === activeTab) || aLaCarte[0];
              if (!currentSection) return null;
              return currentSection.items.map((dish, idx) => (
                <div 
                  key={idx}
                  className="bg-surface border border-white/10 hover:border-or/60 p-5 rounded-sm flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <h4 className="font-serif-luxury text-lg sm:text-xl text-ivoire font-light group-hover:text-or transition-colors">
                        {dish.name}
                      </h4>
                      <span className="font-mono text-base text-or font-semibold shrink-0">
                        {dish.price}
                      </span>
                    </div>

                    <p className="typo-editorial text-xs text-muted leading-relaxed mb-3 italic">
                      « {dish.description} »
                    </p>

                    {dish.allergens && (
                      <div className="text-[10px] text-muted/70 font-mono mb-4">
                        Allergènes : {dish.allergens}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedItemForCustomization({
                      ...dish,
                      category: currentSection.category
                    })}
                    className="w-full py-2.5 px-4 btn-table-choice text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 font-semibold"
                  >
                    <Plus size={13} />
                    <span>Choisir & Personnaliser</span>
                  </button>
                </div>
              ));
            })()
          )}
        </div>

        {/* Floating Table Cart Button */}
        {totalCartCount > 0 && (
          <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="pointer-events-auto max-w-md w-full py-4 px-6 bg-or hover:bg-or-light text-nero font-medium shadow-2xl shadow-black rounded-full flex items-center justify-between gap-4 transition-all transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-nero text-or flex items-center justify-center font-mono text-xs font-bold">
                  {totalCartCount}
                </div>
                <div className="text-left">
                  <div className="typo-button text-xs uppercase tracking-wider font-bold">
                    Carrello Tavolo {table.number}
                  </div>
                  <div className="text-[10px] opacity-80 font-mono">
                    Prêt pour envoi en cuisine
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-base font-bold">
                <span>{totalCartPrice} €</span>
                <ChevronRight size={18} />
              </div>
            </button>
          </div>
        )}

        {/* Cart Drawer / Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nero/85 backdrop-blur-md animate-fade-in">
            <div 
              className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-surface-card border border-or/40 shadow-2xl rounded-sm p-6 sm:p-8 text-ivoire"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCartOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-nero/70 border border-white/10 flex items-center justify-center text-muted hover:text-or"
              >
                <X size={16} />
              </button>

              <div className="border-b border-or-subtle pb-4 mb-5">
                <span className="typo-metadata text-[10px] text-or uppercase tracking-widest">
                  LUCENTE Milano · {table.name}
                </span>
                <h3 className="font-serif-luxury text-2xl font-light text-ivoire mt-0.5">
                  Récapitulatif de Commande
                </h3>
              </div>

              {/* Items List */}
              <div className="space-y-3.5 mb-6 max-h-60 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="p-3 bg-surface border border-white/10 rounded-sm flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="font-serif-luxury text-base text-ivoire">{item.name}</div>
                      <div className="text-[11px] text-or font-mono">{item.price} € / portion</div>
                      {item.cooking && (
                        <div className="text-[10px] text-muted">Cuisson : {item.cooking}</div>
                      )}
                      {item.winePairing && (
                        <div className="text-[10px] text-or/90">Accord vin inclus</div>
                      )}
                      {item.allergies && item.allergies.length > 0 && (
                        <div className="text-[10px] text-terracotta">Allergies : {item.allergies.join(', ')}</div>
                      )}
                      {item.notes && (
                        <div className="text-[10px] text-muted italic">Note : {item.notes}</div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleUpdateCartQty(idx, -1)}
                        className="w-6 h-6 rounded bg-nero border border-white/15 flex items-center justify-center text-muted hover:text-or"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-sm w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateCartQty(idx, 1)}
                        className="w-6 h-6 rounded bg-nero border border-white/15 flex items-center justify-center text-muted hover:text-or"
                      >
                        <Plus size={12} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromCart(idx)}
                        className="ml-2 text-muted/60 hover:text-terracotta"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hybride Payment Preference */}
              <div className="mb-6 p-4 bg-surface border border-or-subtle/30 rounded-sm space-y-3">
                <label className="block typo-metadata text-xs uppercase tracking-wider text-or">
                  Option de Règlement
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentPreference('table')}
                    className={`p-3 text-left border rounded-sm transition-all ${
                      paymentPreference === 'table'
                        ? 'border-or bg-or/15 text-or font-medium'
                        : 'border-white/10 text-muted'
                    }`}
                  >
                    <div className="text-xs font-semibold">Payer à Table</div>
                    <div className="text-[10px] text-muted mt-0.5">Règlement au serveur en fin de repas (CB, Espèces)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentPreference('hybrid_online')}
                    className={`p-3 text-left border rounded-sm transition-all ${
                      paymentPreference === 'hybrid_online'
                        ? 'border-or bg-or/15 text-or font-medium'
                        : 'border-white/10 text-muted'
                    }`}
                  >
                    <div className="text-xs font-semibold">Paiement Mobile Direct</div>
                    <div className="text-[10px] text-muted mt-0.5">Carte bancaire & Mobile Money</div>
                  </button>
                </div>

                {paymentPreference === 'hybrid_online' && (
                  <div className="p-2.5 bg-or/10 border border-or/30 rounded-sm text-xs font-serif italic text-or/90">
                    Le module de paiement en ligne direct est actuellement en cours d'activation. Votre commande sera transmise immédiatement en cuisine, et vous pourrez régler l'addition directement auprès de votre serveur à table.
                  </div>
                )}
              </div>

              {/* Total & Submit */}
              <div className="border-t border-or-subtle pt-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono text-muted uppercase">Total Commande</div>
                  <div className="font-mono text-2xl text-or font-bold">{totalCartPrice} €</div>
                </div>

                <button
                  type="button"
                  disabled={isSubmittingOrder}
                  onClick={handleSendOrderToKitchen}
                  className="flex-1 max-w-[280px] py-3.5 px-5 bg-or hover:bg-or-light disabled:opacity-60 text-nero font-medium typo-button text-xs uppercase tracking-widest transition-all shadow-lg shadow-or/20 flex items-center justify-center gap-2"
                >
                  {isSubmittingOrder ? (
                    <>
                      <Clock size={14} className="animate-spin" />
                      <span>Transmission...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Envoyer en Cuisine</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Item Customization Modal */}
        <TableItemModal
          item={selectedItemForCustomization}
          isOpen={!!selectedItemForCustomization}
          onClose={() => setSelectedItemForCustomization(null)}
          onAddToCart={handleAddToCart}
        />

        {/* Table Concierge Service Modal */}
        <TableServiceModal
          table={table}
          isOpen={isServiceModalOpen}
          onClose={() => setIsServiceModalOpen(false)}
        />
      </div>
    </>
  );
}

