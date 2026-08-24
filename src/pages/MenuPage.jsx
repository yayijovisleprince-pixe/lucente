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
            TASTING MENUS VIEW
           ========================================================================= */}
        {viewMode === 'tasting' && (
          <div className="space-y-8 sm:space-y-12">
            
            {/* Menu Cards Selector with Direct 1-Click Action */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {localizedTastingMenus.map((menu) => {
                const isSelected = menu.id === activeTastingId;
                const coursesCount = menu.courses?.length || 0;

                return (
                  <div
                    key={menu.id}
                    onClick={() => {
                      setActiveTastingId(menu.id);
                      scrollToTastingDetails();
                    }}
                    className={`p-5 sm:p-6 border cursor-pointer transition-all duration-300 bg-surface flex flex-col justify-between group relative ${
                      isSelected 
                        ? 'border-or ring-1 ring-or shadow-[0_12px_35px_rgba(184,155,94,0.2)] bg-surface-elevated scale-[1.01]' 
                        : 'border-white/10 hover:border-or/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-or font-semibold">{menu.tag}</span>
                        <span className="text-[10px] font-mono text-muted/80 bg-nero px-2 py-0.5 border border-white/5">
                          {coursesCount} {lang === 'it' ? 'Atti' : lang === 'en' ? 'Acts' : 'Actes'}
                        </span>
                      </div>

                      <div>
                        <h2 className="font-serif text-2xl text-ivoire group-hover:text-or transition-colors">{menu.name}</h2>
                        <span className="text-xs font-serif italic text-or/80 block mt-0.5">{menu.italianName}</span>
                      </div>

                      <p className="text-xs text-muted font-sans line-clamp-2 leading-relaxed">{menu.description}</p>
                    </div>

                    <div className="pt-4 border-t border-white/5 space-y-3 mt-5">
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif text-2xl text-or font-medium">{menu.price}</span>
                        <span className="text-[11px] text-muted font-mono">{menu.winePairingPrice}</span>
                      </div>

                      {/* Direct 1-Click Action Button */}
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTastingId(menu.id);
                            scrollToTastingDetails();
                          }}
                          className={`flex-1 py-2.5 px-3 text-[11px] uppercase font-mono tracking-wider text-center transition-all flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-or text-nero font-bold shadow-md'
                              : 'bg-nero/80 text-or border border-or/30 hover:bg-or hover:text-nero'
                          }`}
                        >
                          <span>{lang === 'it' ? 'Vedi Piatti' : lang === 'en' ? 'View Dishes' : 'Voir les Plats'}</span>
                          <ChevronDown size={13} />
                        </button>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectMenuForBooking(menu.name);
                          }}
                          title={lang === 'it' ? 'Prenota questo menu' : lang === 'en' ? 'Book this menu' : 'Réserver ce menu'}
                          className="py-2.5 px-3 bg-surface border border-white/10 hover:border-or text-ivoire hover:text-or text-[11px] uppercase font-mono transition-all shrink-0"
                        >
                          {lang === 'it' ? 'Prenota' : lang === 'en' ? 'Book' : 'Réserver'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Menu Details Section (Directly displayed & scrolled into view on click) */}
            <div 
              ref={tastingDetailsRef}
              id="tasting-details"
              className="scroll-mt-28 bg-surface-elevated border border-or/40 p-5 sm:p-10 lg:p-12 space-y-8 sm:space-y-10 shadow-2xl animate-fadeIn"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs uppercase font-mono text-or tracking-widest">{activeTasting.italianName}</span>
                    <span className="text-xs text-muted/60 font-mono">·</span>
                    <span className="text-xs font-mono text-ivoire/80 bg-nero px-2 py-0.5 border border-white/10">
                      {activeTasting.courses?.length || 0} {lang === 'it' ? 'atti gastronomici' : lang === 'en' ? 'gastronomic acts' : 'actes gastronomiques'}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-ivoire font-normal">{activeTasting.name}</h3>
                  <p className="text-xs sm:text-sm text-muted max-w-xl pt-1 leading-relaxed">{activeTasting.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                  <button
                    onClick={() => onSelectMenuForBooking(activeTasting.name)}
                    className="px-8 py-3.5 bg-or text-nero font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all text-center shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>{t('menu.bookThisMenu')} ({activeTasting.price})</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Courses List */}
              <div className="divide-y divide-white/5 space-y-6">
                {activeTasting.courses?.map((c, i) => (
                  <div key={i} className="pt-6 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-or font-semibold">
                          {lang === 'it' ? `Atto ${c.act}` : lang === 'en' ? `Act ${c.act}` : `Acte ${c.act}`}
                        </span>
                        <h4 className="font-serif text-lg sm:text-xl text-ivoire group-hover:text-or transition-colors">{c.name}</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">{c.ingredients}</p>
                    </div>
                    {c.pairing && (
                      <div className="flex items-center gap-2 text-xs text-or/90 bg-nero/70 px-3 py-1.5 border border-white/5 shrink-0 self-start md:self-center">
                        <Wine size={13} className="text-or" />
                        <span className="font-mono text-[11px]">{c.pairing}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom CTA for active menu */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-nero/50 p-4 sm:p-6 border">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-xs uppercase font-mono text-or tracking-widest">
                    {lang === 'it' ? 'Esperienza Consigliata' : lang === 'en' ? 'Signature Experience' : 'Expérience d’Exception'}
                  </span>
                  <p className="font-serif text-lg text-ivoire">
                    {activeTasting.name} — <span className="text-or">{activeTasting.price}</span>
                  </p>
                </div>
              </div>
            </div>
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
