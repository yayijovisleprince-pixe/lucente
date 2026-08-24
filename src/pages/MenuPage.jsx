import React, { useState, useMemo, useRef } from 'react';
import { getTastingMenus, getALaCarteSections } from '../data/restaurantData';
import { 
  Wine, ArrowRight, Download, Eye, Sparkles, Check, Info, 
  ShieldAlert, Utensils, ShoppingBag, Plus, Minus, X, 
  ChevronDown, Calendar, Users, Clock, Send, CheckCircle2, Shield
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function MenuPage({ onSelectMenuForBooking }) {
  const [viewMode, setViewMode] = useState('tasting');
  const { lang, t } = useLanguage();

  const localizedTastingMenus = useMemo(() => getTastingMenus(lang), [lang]);
  const localizedALaCarteSections = useMemo(() => getALaCarteSections(lang), [lang]);

  const [activeTastingId, setActiveTastingId] = useState(localizedTastingMenus[0].id);
  const activeTasting = localizedTastingMenus.find((m) => m.id === activeTastingId) || localizedTastingMenus[0];

  const tastingDetailsRef = useRef(null);

  // ==========================================
  // PRE-ORDER SYSTEM STATE (À LA CARTE)
  // ==========================================
  const [preOrder, setPreOrder] = useState({});
  const [isPreOrderModalOpen, setIsPreOrderModalOpen] = useState(false);
  const [preOrderSubmitted, setPreOrderSubmitted] = useState(false);
  const [preOrderForm, setPreOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '20:00',
    guests: '2 convives',
    notes: ''
  });

  const parsePrice = (priceStr) => {
    return parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10) || 0;
  };

  const handleAddToPreOrder = (item, category) => {
    setPreOrder((prev) => {
      const existing = prev[item.name];
      const numericPrice = parsePrice(item.price);
      return {
        ...prev,
        [item.name]: {
          name: item.name,
          price: numericPrice,
          priceStr: item.price,
          category,
          quantity: existing ? existing.quantity + 1 : 1
        }
      };
    });
  };

  const handleUpdateQuantity = (itemName, delta) => {
    setPreOrder((prev) => {
      const existing = prev[itemName];
      if (!existing) return prev;
      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        const copy = { ...prev };
        delete copy[itemName];
        return copy;
      }
      return {
        ...prev,
        [itemName]: { ...existing, quantity: newQty }
      };
    });
  };

  const handleRemoveFromPreOrder = (itemName) => {
    setPreOrder((prev) => {
      const copy = { ...prev };
      delete copy[itemName];
      return copy;
    });
  };

  const preOrderList = Object.values(preOrder);
  const totalPreOrderCount = preOrderList.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPreOrderPrice = preOrderList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleSubmitPreOrder = (e) => {
    e.preventDefault();
    setPreOrderSubmitted(true);
  };

  const scrollToTastingDetails = () => {
    if (tastingDetailsRef.current) {
      tastingDetailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const menuSchema = {
    '@type': 'Menu',
    '@id': 'https://lucente-milano.com/menu#menu',
    'name': 'Percorsi Gastronomici & Carte | LUCENTE Milano',
    'description': 'Les menus dégustation Terra & Memoria (7 actes · 210€), Mare & Orizzonte (9 actes · 240€) et Luce Assoluta (11 actes · 290€) du Chef Vincenzo Moretti.',
    'url': 'https://lucente-milano.com/menu',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Menus & Carte', 'item': 'https://lucente-milano.com/menu' }
      ]
    },
    'hasMenuItem': localizedTastingMenus.map(m => ({
      '@type': 'MenuItem',
      'name': m.name,
      'description': m.description,
      'offers': {
        '@type': 'Offer',
        'price': m.price.replace(/[^0-9]/g, ''),
        'priceCurrency': 'EUR'
      }
    }))
  };

  return (
    <div className="bg-nero text-ivoire min-h-screen pt-28 sm:pt-32 pb-28">
      <SEOHead
        title={lang === 'it' ? 'Menu Degustazione & Carta | LUCENTE — Milano' : lang === 'en' ? 'Tasting Menus & À La Carte | LUCENTE — Milano' : 'Menus Dégustation & Carte | LUCENTE — Milano'}
        description={lang === 'it' ? 'Terra & Memoria (7 atti · 210€), Mare & Orizzonte (9 atti · 240€), Luce Assoluta (11 atti · 290€). Abbinamenti vino a cura di Gianluca Ferri.' : lang === 'en' ? 'Terra & Memoria (7 acts · 210€), Mare & Orizzonte (9 acts · 240€), Luce Assoluta (11 acts · 290€). Wine pairings by Gianluca Ferri.' : 'Terra & Memoria (7 actes · 210€), Mare & Orizzonte (9 actes · 240€), Luce Assoluta (11 actes · 290€). Accords mets & vins par Gianluca Ferri.'}
        image="/images/pasta-caviar.webp"
        path="/menu"
        schema={menuSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-16">
        
        {/* =========================================================================
            HEADER
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="typo-eyebrow text-or block">
            {t('menu.eyebrow')}
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-ivoire font-light leading-tight">
            {t('menu.heroTitle1')}<br />
            <span className="italic text-or">{t('menu.heroTitle2')}</span>
          </h1>
          <div className="w-12 sm:w-16 h-[1px] bg-or mx-auto mt-3" />
          <p className="text-sm sm:text-base text-muted max-w-xl mx-auto pt-2 font-serif italic">
            {t('menu.heroSubtitle')}
          </p>
        </div>

        {/* =========================================================================
            MODE SWITCHER (Tasting vs À La Carte)
           ========================================================================= */}
        <div className="flex justify-center w-full">
          <div className="w-full sm:w-auto grid grid-cols-2 sm:flex bg-surface p-1 border border-white/10 rounded-none shadow-lg">
            <button
              onClick={() => setViewMode('tasting')}
              className={`px-3 sm:px-6 py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold transition-all text-center ${
                viewMode === 'tasting' ? 'bg-or text-nero shadow-lg' : 'text-muted hover:text-ivoire'
              }`}
            >
              {t('menu.tastingMenus')}
            </button>
            <button
              onClick={() => setViewMode('carte')}
              className={`px-3 sm:px-6 py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold transition-all text-center flex items-center justify-center gap-1.5 ${
                viewMode === 'carte' ? 'bg-or text-nero shadow-lg' : 'text-muted hover:text-ivoire'
              }`}
            >
              <span>{t('menu.aLaCarte')}</span>
              {totalPreOrderCount > 0 && (
                <span className={`px-1.5 py-0.2 text-[10px] font-mono rounded-none font-bold ${
                  viewMode === 'carte' ? 'bg-nero text-or' : 'bg-or text-nero'
                }`}>
                  {totalPreOrderCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            TASTING MENUS VIEW — ACCORDION DIRECT DÉPLIABLE EN PLACE
           ========================================================================= */}
        {viewMode === 'tasting' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            {localizedTastingMenus.map((menu) => {
              const isExpanded = activeTastingId === menu.id;
              const coursesCount = menu.courses?.length || 0;

              return (
                <div
                  key={menu.id}
                  className={`border transition-all duration-300 bg-surface shadow-xl overflow-hidden ${
                    isExpanded 
                      ? 'border-or ring-1 ring-or/40 bg-surface-elevated' 
                      : 'border-white/10 hover:border-or/30'
                  }`}
                >
                  {/* Card Header (Non-clickable container, only buttons are clickable) */}
                  <div className="p-5 sm:p-7 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-or font-semibold px-2 py-0.5 bg-nero border border-or/20">
                          {menu.tag}
                        </span>
                        <span className="text-[11px] font-mono text-muted">
                          {coursesCount} {lang === 'it' ? 'atti gastronomici' : lang === 'en' ? 'gastronomic acts' : 'actes gastronomiques'}
                        </span>
                      </div>

                      <div>
                        <h2 className="font-serif text-2xl sm:text-3xl text-ivoire">{menu.name}</h2>
                        <span className="text-xs font-serif italic text-or/80 block mt-0.5">{menu.italianName}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-muted font-sans max-w-2xl leading-relaxed">
                        {menu.description}
                      </p>
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 shrink-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <div className="text-left md:text-right">
                        <span className="font-serif text-2xl sm:text-3xl text-or font-medium block">{menu.price}</span>
                        <span className="text-xs text-muted font-mono">{menu.winePairingPrice}</span>
                      </div>

                      <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        {/* THE ONLY BUTTON THAT EXPANDS THE DISHES */}
                        <button
                          type="button"
                          onClick={() => setActiveTastingId(isExpanded ? '' : menu.id)}
                          className={`flex-1 sm:flex-none px-4 py-2.5 text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 border ${
                            isExpanded
                              ? 'bg-or text-[#10100E] font-bold border-or shadow-md hover:bg-[#F2EBDD]'
                              : 'bg-surface-elevated text-ivoire border-or/50 hover:border-or hover:bg-or/15 hover:text-or'
                          }`}
                        >
                          <span className={isExpanded ? 'text-[#10100E] font-bold' : 'text-ivoire'}>
                            {isExpanded
                              ? (lang === 'it' ? 'Nascondi Piatti' : lang === 'en' ? 'Hide Dishes' : 'Masquer les Plats')
                              : (lang === 'it' ? 'Vedi Piatti' : lang === 'en' ? 'View Dishes' : 'Voir les Plats')}
                          </span>
                          <ChevronDown 
                            size={14} 
                            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#10100E]' : 'text-or'}`} 
                          />
                        </button>

                        {/* Direct Booking Button */}
                        <button
                          type="button"
                          onClick={() => onSelectMenuForBooking(menu.name)}
                          className="flex-1 sm:flex-none px-5 py-2.5 bg-or text-[#10100E] font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shadow-md text-center shrink-0"
                        >
                          {lang === 'it' ? 'Prenota' : lang === 'en' ? 'Book' : 'Réserver'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* INLINE EXPANDED DISHES (Unfolds right under this menu card) */}
                  {isExpanded && (
                    <div className="border-t border-or/20 bg-nero/70 p-5 sm:p-8 md:p-10 space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="text-xs uppercase font-mono tracking-widest text-or font-semibold">
                          {lang === 'it' ? `Sequenza degli ${coursesCount} Atti` : lang === 'en' ? `Sequence of ${coursesCount} Acts` : `Partition des ${coursesCount} Actes`}
                        </span>
                        <span className="text-[11px] text-muted font-mono hidden sm:inline">
                          {menu.name} · {menu.price}
                        </span>
                      </div>

                      <div className="divide-y divide-white/5 space-y-5">
                        {menu.courses?.map((c, i) => (
                          <div key={i} className="pt-5 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-3 group">
                            <div className="space-y-1 max-w-2xl">
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-mono text-or font-semibold shrink-0">
                                  {lang === 'it' ? `Atto ${c.act}` : lang === 'en' ? `Act ${c.act}` : `Acte ${c.act}`}
                                </span>
                                <h4 className="font-serif text-lg text-ivoire group-hover:text-or transition-colors">
                                  {c.name}
                                </h4>
                              </div>
                              <p className="text-xs text-muted leading-relaxed font-sans pl-0 sm:pl-8">
                                {c.ingredients}
                              </p>
                            </div>

                            {c.pairing && (
                              <div className="flex items-center gap-2 text-xs text-or/90 bg-surface px-3 py-1.5 border border-white/5 shrink-0 self-start md:self-center">
                                <Wine size={13} className="text-or shrink-0" />
                                <span className="font-mono text-[11px]">{c.pairing}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* In-place footer booking trigger */}
                      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface p-4 sm:p-5 border border-white/5">
                        <div className="text-center sm:text-left">
                          <span className="text-[10px] uppercase font-mono text-or tracking-widest block">
                            {lang === 'it' ? 'Menu Completo' : lang === 'en' ? 'Complete Menu' : 'Menu Complet'}
                          </span>
                          <span className="font-serif text-lg text-ivoire">
                            {menu.name} — <span className="text-or font-semibold">{menu.price}</span>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectMenuForBooking(menu.name)}
                          className="w-full sm:w-auto px-7 py-3 bg-or text-nero font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                          <span>{t('menu.bookThisMenu')}</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            À LA CARTE VIEW + PRE-ORDER INTEGRATION
           ========================================================================= */}
        {viewMode === 'carte' && (
          <div className="space-y-10 sm:space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <p className="text-sm text-muted font-serif italic">
                {lang === 'it'
                  ? "Per chi desidera comporre la propria sequenza. Due antipasti, un piatto, un dessert — o altro. La sala si adatta al vostro ritmo."
                  : lang === 'en'
                  ? "For those who wish to compose their own sequence. Two starters, a main, a dessert — or something else. The dining room adapts to your pace."
                  : "Pour ceux qui souhaitent composer leur propre partition. Deux entrées, un plat, un dessert — ou autre chose. La salle s'adapte à votre rythme."
                }
              </p>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-or font-mono uppercase tracking-wider bg-surface px-3 py-1 border border-or/20">
                <ShoppingBag size={12} />
                {lang === 'it' ? 'Possibilità di preordinare i piatti desiderati prima del vostro arrivo' : lang === 'en' ? 'You can pre-order your desired dishes prior to arrival' : 'Précommandez vos plats d’orfèvre pour votre venue'}
              </span>
            </div>

            {localizedALaCarteSections.map((sec) => (
              <div key={sec.id} className="bg-surface border border-white/10 p-5 sm:p-8 md:p-10 space-y-6 shadow-xl">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-2xl text-ivoire">{sec.category}</h3>
                  <p className="text-xs text-muted italic font-serif">{sec.tagline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {sec.items.map((item, idx) => {
                    const currentItemPreOrder = preOrder[item.name];
                    const qty = currentItemPreOrder ? currentItemPreOrder.quantity : 0;

                    return (
                      <div key={idx} className="space-y-3 border-b border-white/5 pb-4 last:border-none flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="font-serif text-lg text-ivoire font-normal">{item.name}</h4>
                            <span className="font-serif text-lg text-or shrink-0 font-medium">{item.price}</span>
                          </div>
                          <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                          {item.allergens && (
                            <p className="text-[10px] text-muted/60 font-mono">
                              {lang === 'it' ? 'Allergeni: ' : lang === 'en' ? 'Allergens: ' : 'Allergènes : '}
                              {item.allergens}
                            </p>
                          )}
                        </div>

                        {/* Pre-order Action Controls */}
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-[10px] text-muted/70 uppercase font-mono">
                            {qty > 0 ? (
                              <span className="text-or font-semibold">
                                {qty} {lang === 'it' ? 'nel preordine' : lang === 'en' ? 'in pre-order' : 'en précommande'}
                              </span>
                            ) : (
                              <span>{lang === 'it' ? 'Servito al momento' : lang === 'en' ? 'Made to order' : 'Dressé minute'}</span>
                            )}
                          </span>

                          {qty === 0 ? (
                            <button
                              onClick={() => handleAddToPreOrder(item, sec.category)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated hover:bg-or hover:text-nero text-or border border-or/40 transition-all text-xs uppercase font-mono tracking-wider"
                            >
                              <Plus size={12} />
                              <span>{lang === 'it' ? 'Preordina' : lang === 'en' ? 'Pre-order' : 'Précommander'}</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1.5 bg-nero border border-or/50 px-2 py-1">
                              <button
                                onClick={() => handleUpdateQuantity(item.name, -1)}
                                className="p-1 text-muted hover:text-or transition-colors"
                                title="Diminuer"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-mono text-xs text-ivoire font-bold px-2">{qty}</span>
                              <button
                                onClick={() => handleUpdateQuantity(item.name, 1)}
                                className="p-1 text-muted hover:text-or transition-colors"
                                title="Augmenter"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* =========================================================================
          STICKY PRE-ORDER FLOATING ACTION BAR (When items are in pre-order)
         ========================================================================= */}
      {viewMode === 'carte' && totalPreOrderCount > 0 && (
        <div className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-lg sm:w-auto animate-fadeIn">
          <div className="bg-nero/95 border border-or p-4 shadow-2xl flex items-center justify-between gap-4 backdrop-blur-md">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShoppingBag size={15} className="text-or" />
                <span className="text-xs uppercase font-mono font-bold text-ivoire">
                  {totalPreOrderCount} {lang === 'it' ? 'Piatti Selezionati' : lang === 'en' ? 'Dishes Selected' : 'Plats Sélectionnés'}
                </span>
              </div>
              <p className="text-xs text-or font-serif font-bold">
                {lang === 'it' ? 'Totale stimato: ' : lang === 'en' ? 'Estimated Total: ' : 'Total estimé : '}
                <span className="text-sm font-sans font-semibold text-ivoire">{totalPreOrderPrice} €</span>
              </p>
            </div>

            <button
              onClick={() => setIsPreOrderModalOpen(true)}
              className="px-5 py-2.5 bg-or text-nero font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shrink-0 flex items-center gap-1.5 shadow-lg"
            >
              <span>{lang === 'it' ? 'Valida' : lang === 'en' ? 'Validate' : 'Valider'}</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          PRE-ORDER REVIEW & VALIDATION MODAL
         ========================================================================= */}
      {isPreOrderModalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-nero/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
        >
          <div className="relative w-full max-w-2xl bg-surface border border-or/40 shadow-2xl p-6 sm:p-10 my-8">
            
            {/* Close Button */}
            <button
              onClick={() => setIsPreOrderModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted hover:text-ivoire transition-colors"
            >
              <X size={20} />
            </button>

            {preOrderSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 size={48} className="text-or mx-auto" />
                <h3 className="font-serif text-2xl text-ivoire">
                  {lang === 'it' ? 'Preordine Registrato con Successo' : lang === 'en' ? 'Pre-order Confirmed' : 'Précommande Enregistrée avec Succès'}
                </h3>
                <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                  {lang === 'it'
                    ? 'La cucina e il Maître d’Hôtel prepareranno la vostra sequenza personalizzata per la data richiesta.'
                    : lang === 'en'
                    ? 'Our kitchen and Maître d’ will prepare your bespoke dining sequence for the requested reservation.'
                    : 'Notre brigade et le Maître d’Hôtel dresseront votre partition personnalisée pour la date demandée.'}
                </p>
                <div className="p-3 bg-nero border border-white/5 max-w-xs mx-auto text-xs font-mono text-or">
                  RÉF : LUC-PRE-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setIsPreOrderModalOpen(false);
                    setPreOrderSubmitted(false);
                    setPreOrder({});
                  }}
                  className="px-6 py-2.5 bg-or text-nero font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all mt-4"
                >
                  {lang === 'it' ? 'Chiudi' : lang === 'en' ? 'Close' : 'Fermer'}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-or tracking-widest">
                    {lang === 'it' ? 'Riepilogo Preordine' : lang === 'en' ? 'Pre-order Summary' : 'Récapitulatif de la Précommande'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ivoire">
                    {lang === 'it' ? 'Componi la tua Tavola' : lang === 'en' ? 'Your Tailored Table' : 'Votre Partition Gourmande'}
                  </h3>
                </div>

                {/* Items List */}
                <div className="max-h-56 overflow-y-auto space-y-3 pr-2 divide-y divide-white/5">
                  {preOrderList.map((item, idx) => (
                    <div key={idx} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <p className="font-serif text-sm text-ivoire truncate">{item.name}</p>
                        <span className="text-[10px] text-muted font-mono">{item.category}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-or font-semibold">{item.price * item.quantity} €</span>
                        <div className="flex items-center gap-1 bg-nero border border-white/10 px-1.5 py-0.5">
                          <button onClick={() => handleUpdateQuantity(item.name, -1)} className="p-0.5 text-muted hover:text-or">
                            <Minus size={10} />
                          </button>
                          <span className="font-mono text-[11px] px-1 text-ivoire">{item.quantity}</span>
                          <button onClick={() => handleUpdateQuantity(item.name, 1)} className="p-0.5 text-muted hover:text-or">
                            <Plus size={10} />
                          </button>
                        </div>
                        <button onClick={() => handleRemoveFromPreOrder(item.name)} className="text-muted/60 hover:text-terracotta">
                          <X size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-nero flex items-center justify-between border border-white/10 text-xs">
                  <span className="text-muted font-mono uppercase">{lang === 'it' ? 'Totale' : lang === 'en' ? 'Total' : 'Total Estimé'}</span>
                  <span className="font-serif text-lg text-or font-bold">{totalPreOrderPrice} €</span>
                </div>

                {/* Details Form */}
                <form onSubmit={handleSubmitPreOrder} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted font-mono mb-1">
                        {lang === 'it' ? 'Nome e Cognome *' : lang === 'en' ? 'Full Name *' : 'Nom & Prénom *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={preOrderForm.name}
                        onChange={(e) => setPreOrderForm({ ...preOrderForm, name: e.target.value })}
                        className="w-full px-3 py-2 text-xs input-luxury bg-surface-elevated text-ivoire"
                        placeholder="Ex: Jean Dupont"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted font-mono mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={preOrderForm.email}
                        onChange={(e) => setPreOrderForm({ ...preOrderForm, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs input-luxury bg-surface-elevated text-ivoire"
                        placeholder="jean@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted font-mono mb-1">
                        {lang === 'it' ? 'Telefono *' : lang === 'en' ? 'Phone *' : 'Téléphone *'}
                      </label>
                      <input
                        type="tel"
                        required
                        value={preOrderForm.phone}
                        onChange={(e) => setPreOrderForm({ ...preOrderForm, phone: e.target.value })}
                        className="w-full px-3 py-2 text-xs input-luxury bg-surface-elevated text-ivoire"
                        placeholder="+33 6 00 00 00 00"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted font-mono mb-1">
                        {lang === 'it' ? 'Data' : lang === 'en' ? 'Date' : 'Date de venue'}
                      </label>
                      <input
                        type="date"
                        required
                        value={preOrderForm.date}
                        onChange={(e) => setPreOrderForm({ ...preOrderForm, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs input-luxury bg-surface-elevated text-ivoire"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-muted font-mono mb-1">
                        {lang === 'it' ? 'Coperti' : lang === 'en' ? 'Guests' : 'Couverts'}
                      </label>
                      <input
                        type="text"
                        value={preOrderForm.guests}
                        onChange={(e) => setPreOrderForm({ ...preOrderForm, guests: e.target.value })}
                        className="w-full px-3 py-2 text-xs input-luxury bg-surface-elevated text-ivoire"
                        placeholder="2 convives"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-muted font-mono mb-1">
                      {lang === 'it' ? 'Note o allergie' : lang === 'en' ? 'Notes or allergies' : 'Allergies ou souhaits'}
                    </label>
                    <input
                      type="text"
                      value={preOrderForm.notes}
                      onChange={(e) => setPreOrderForm({ ...preOrderForm, notes: e.target.value })}
                      className="w-full px-3 py-2 text-xs input-luxury bg-surface-elevated text-ivoire"
                      placeholder="Ex: Sans gluten, table près de la baie..."
                    />
                  </div>

                  <div className="p-2.5 bg-nero border border-white/5 flex items-center gap-2 text-[11px] text-muted">
                    <Shield size={13} className="text-or shrink-0" />
                    <span>
                      {lang === 'it'
                        ? 'Nessun pagamento anticipato richiesto. Il saldo avviene al ristorante.'
                        : lang === 'en'
                        ? 'No advance payment required. Settlement is made at the restaurant.'
                        : 'Aucun paiement immédiat requis. Le règlement s’effectue sur place.'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 btn-luxury-primary flex items-center justify-center gap-2 shadow-xl text-xs font-semibold tracking-widest"
                  >
                    <span>
                      {lang === 'it' ? 'CONFERMA IL PREORDINE' : lang === 'en' ? 'CONFIRM PRE-ORDER' : 'CONFIRMER LA PRÉCOMMANDE'}
                    </span>
                    <Send size={13} />
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
