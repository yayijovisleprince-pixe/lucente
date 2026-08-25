import React, { useState, useEffect } from 'react';
import { 
  X, ShoppingBag, Calendar, Clock, Users, Trash2, 
  Copy, Check, Search, ArrowRight, Utensils, ShieldCheck, ChevronRight 
} from 'lucide-react';
import { getOrders, deleteOrder, searchOrders } from '../utils/orderHistory';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

export default function OrderHistoryModal({ isOpen, onClose }) {
  const [orders, setOrders] = useState([]);
  const [copiedRef, setCopiedRef] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'lookup'
  const { lang, t } = useLanguage();

  const refreshOrders = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    if (isOpen) {
      refreshOrders();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleOrdersUpdated = () => {
      refreshOrders();
    };

    window.addEventListener('lucente:orders-updated', handleOrdersUpdated);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('lucente:orders-updated', handleOrdersUpdated);
    };
  }, [isOpen]);

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyRef = (ref) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(ref);
    setTimeout(() => {
      setCopiedRef('');
    }, 2500);
  };

  const handleDelete = (ref) => {
    if (window.confirm(lang === 'it' ? 'Vuoi rimuovere questo ordine dallo storico locale?' : lang === 'en' ? 'Remove this order from your local history?' : 'Supprimer cette commande de votre historique local ?')) {
      deleteOrder(ref);
      refreshOrders();
    }
  };

  const searchResults = searchQuery.trim() ? searchOrders(searchQuery) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-orders-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-nero/95 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20 pb-28 sm:pb-16 animate-fadeIn"
    >
      <div className="relative w-full max-w-3xl bg-surface border border-or/40 shadow-2xl p-5 sm:p-8 md:p-10 my-auto sm:my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted hover:text-ivoire transition-colors z-10"
          aria-label={lang === 'it' ? 'Chiudi' : lang === 'en' ? 'Close' : 'Fermer'}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 border-b border-white/10 pb-6 pr-8">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-or" />
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-or font-semibold">
              {lang === 'it' ? 'Espace Conciergerie' : lang === 'en' ? 'Concierge Space' : 'Espace Conciergerie'}
            </span>
          </div>
          <h2 id="modal-orders-title" className="font-serif text-2xl sm:text-3xl text-ivoire">
            {lang === 'it' ? 'I Miei Ordini & Prenotazioni' : lang === 'en' ? 'My Orders & Reservations' : 'Mes Commandes & Réservations'}
          </h2>
          <p className="text-xs sm:text-sm text-muted font-sans leading-relaxed">
            {lang === 'it'
              ? 'Consultate i dettagli dei vostri preordini registrati su questo dispositivo.'
              : lang === 'en'
              ? 'View the details of your pre-orders saved on this device.'
              : 'Consultez les détails de vos précommandes et réservations enregistrées sur cet appareil.'}
          </p>
        </div>

        {/* Navigation Tabs (Mes Commandes / Retrouver une commande) */}
        <div className="flex items-center gap-2 border-b border-white/10 pt-4 pb-1">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border-b-2 ${
              activeTab === 'list'
                ? 'border-or text-or font-bold'
                : 'border-transparent text-muted hover:text-ivoire'
            }`}
          >
            {lang === 'it' ? `I Miei Ordini (${orders.length})` : lang === 'en' ? `My Orders (${orders.length})` : `Mes Commandes (${orders.length})`}
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'lookup'
                ? 'border-or text-or font-bold'
                : 'border-transparent text-muted hover:text-ivoire'
            }`}
          >
            <Search size={12} />
            <span>{lang === 'it' ? 'Cerca Ordine' : lang === 'en' ? 'Find Order' : 'Rechercher'}</span>
          </button>
        </div>

        {/* Tab 1: Orders List */}
        {activeTab === 'list' && (
          <div className="pt-6 space-y-6">
            {orders.length === 0 ? (
              <div className="py-12 text-center space-y-4 border border-dashed border-white/10 p-6 bg-nero/50">
                <Utensils size={36} className="text-or/50 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-ivoire">
                    {lang === 'it' ? 'Nessun ordine registrato' : lang === 'en' ? 'No orders recorded' : 'Aucune commande enregistrée'}
                  </h3>
                  <p className="text-xs text-muted max-w-md mx-auto">
                    {lang === 'it'
                      ? 'I vostri preordini alla carta appariranno automaticamente qui dopo la conferma.'
                      : lang === 'en'
                      ? 'Your à la carte pre-orders will automatically appear here once confirmed.'
                      : 'Vos précommandes à la carte apparaîtront automatiquement ici après confirmation.'}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    to="/menu"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-or text-[#10100E] font-bold text-xs uppercase tracking-wider hover:bg-ivoire transition-all"
                  >
                    <span>{lang === 'it' ? 'Esplora il Menu' : lang === 'en' ? 'Explore Menu' : 'Découvrir la Carte'}</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {orders.map((ord) => (
                  <div 
                    key={ord.reference}
                    className="border border-white/10 bg-nero/60 p-4 sm:p-6 space-y-4 hover:border-or/40 transition-colors shadow-lg"
                  >
                    {/* Order Top Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs text-or font-bold bg-surface-elevated px-2.5 py-1 border border-or/30">
                            {ord.reference}
                          </span>
                          <button
                            onClick={() => handleCopyRef(ord.reference)}
                            className="text-[10px] font-mono text-muted hover:text-or flex items-center gap-1 transition-colors px-1.5 py-0.5 border border-white/10 hover:border-or/40"
                            title="Copier la référence"
                          >
                            {copiedRef === ord.reference ? (
                              <>
                                <Check size={11} className="text-green-400" />
                                <span className="text-green-400">{lang === 'it' ? 'Copiato' : lang === 'en' ? 'Copied' : 'Copié'}</span>
                              </>
                            ) : (
                              <>
                                <Copy size={11} />
                                <span>{lang === 'it' ? 'Copia' : lang === 'en' ? 'Copy' : 'Copier'}</span>
                              </>
                            )}
                          </button>
                        </div>
                        <span className="text-[11px] font-mono text-muted block">
                          {new Date(ord.createdAt).toLocaleDateString(lang === 'it' ? 'it-IT' : lang === 'en' ? 'en-US' : 'fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono bg-or/15 border border-or/40 text-or uppercase font-semibold">
                          <ShieldCheck size={12} />
                          {lang === 'it' ? 'Confermato' : lang === 'en' ? 'Confirmed' : 'Enregistrée'}
                        </span>
                        <button
                          onClick={() => handleDelete(ord.reference)}
                          className="p-1.5 text-muted/60 hover:text-red-400 transition-colors"
                          title={lang === 'it' ? 'Rimuovi' : lang === 'en' ? 'Remove' : 'Supprimer'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Booking Meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-muted bg-surface/50 p-2.5 border border-white/5">
                      <div>
                        <span className="text-[9px] uppercase text-or block">Date</span>
                        <span className="text-ivoire">{ord.date}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-or block">Heure</span>
                        <span className="text-ivoire">{ord.time}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-or block">Convives</span>
                        <span className="text-ivoire">{ord.guests}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase text-or block">Nom</span>
                        <span className="text-ivoire truncate block">{ord.name}</span>
                      </div>
                    </div>

                    {/* Items Breakdown */}
                    {ord.items && ord.items.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] uppercase font-mono text-or tracking-widest block">
                          {lang === 'it' ? 'Dettaglio Piatti :' : lang === 'en' ? 'Dishes Detail:' : 'Détail des Plats :'}
                        </span>
                        <div className="divide-y divide-white/5 text-xs bg-surface-elevated p-3 border border-white/5">
                          {ord.items.map((item, idx) => (
                            <div key={idx} className="py-1.5 flex items-start justify-between gap-3">
                              <div>
                                <p className="font-serif text-ivoire text-xs sm:text-sm">
                                  <strong className="text-or font-mono mr-1.5">{item.quantity}x</strong>
                                  {item.name}
                                </p>
                                {item.category && (
                                  <span className="text-[10px] text-muted font-mono">{item.category}</span>
                                )}
                              </div>
                              <span className="font-mono text-or font-semibold shrink-0">
                                {item.price * item.quantity} €
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Notes if any */}
                    {ord.notes && (
                      <p className="text-xs text-muted/80 font-sans italic bg-surface p-2 border border-white/5">
                        « {ord.notes} »
                      </p>
                    )}

                    {/* Total */}
                    <div className="flex justify-between items-baseline font-mono border-t border-white/10 pt-3">
                      <span className="text-xs uppercase text-muted">
                        {lang === 'it' ? 'Totale Stimato :' : lang === 'en' ? 'Estimated Total:' : 'Total Estimé :'}
                      </span>
                      <span className="text-base sm:text-lg text-or font-bold">
                        {ord.totalPrice} €
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Lookup / Search */}
        {activeTab === 'lookup' && (
          <div className="pt-6 space-y-5">
            <div className="space-y-2">
              <label className="block text-xs uppercase font-mono text-muted tracking-wider">
                {lang === 'it'
                  ? 'Inserisci il tuo codice di riferimento o indirizzo email'
                  : lang === 'en'
                  ? 'Enter your reference code or email address'
                  : 'Saisissez votre référence de commande ou votre email'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: LUC-2026... ou votre@email.com"
                  className="flex-1 px-4 py-2.5 text-xs input-luxury bg-surface-elevated text-ivoire"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-2 text-muted hover:text-ivoire text-xs font-mono"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>

            {searchQuery.trim() && (
              <div className="space-y-4 pt-2">
                <span className="text-xs font-mono text-or uppercase tracking-wider block">
                  {searchResults.length} {lang === 'it' ? 'risultati trovati' : lang === 'en' ? 'results found' : 'résultat(s) trouvé(s)'}
                </span>

                {searchResults.length === 0 ? (
                  <p className="text-xs text-muted font-sans py-4">
                    {lang === 'it'
                      ? 'Nessun ordine trovato per questa ricerca su questo dispositivo.'
                      : lang === 'en'
                      ? 'No orders found matching this query on this device.'
                      : 'Aucune commande trouvée pour cette recherche sur cet appareil.'}
                  </p>
                ) : (
                  <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                    {searchResults.map((ord) => (
                      <div key={ord.reference} className="p-4 border border-or/40 bg-surface-elevated space-y-2">
                        <div className="flex justify-between items-center font-mono text-xs">
                          <span className="text-or font-bold">{ord.reference}</span>
                          <span className="text-muted">{ord.date} · {ord.totalPrice} €</span>
                        </div>
                        <p className="text-xs text-ivoire font-serif">
                          {ord.name} ({ord.guests})
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
