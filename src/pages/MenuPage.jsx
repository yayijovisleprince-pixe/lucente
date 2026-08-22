import React, { useState } from 'react';
import { tastingMenus, aLaCarteSections } from '../data/restaurantData';
import { Wine, ArrowRight, Download, Eye, Sparkles, Check, Info, ShieldAlert, Utensils } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function MenuPage({ onSelectMenuForBooking }) {
  const [viewMode, setViewMode] = useState('tasting');
  const [activeTastingId, setActiveTastingId] = useState(tastingMenus[0].id);

  const activeTasting = tastingMenus.find((m) => m.id === activeTastingId) || tastingMenus[0];

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
    'hasMenuItem': tastingMenus.map(m => ({
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
    <div className="bg-nero text-ivoire min-h-screen pt-32 pb-24">
      <SEOHead
        title="Menus Dégustation & Carte | LUCENTE — Milano"
        description="Terra & Memoria (7 actes · 210€), Mare & Orizzonte (9 actes · 240€), Luce Assoluta (11 actes · 290€). Accords mets & vins par Gianluca Ferri."
        image="/images/pasta-caviar.jpg"
        path="/menu"
        schema={menuSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="typo-eyebrow text-or block animate-float">
            I Percorsi Gastronomici
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-ivoire font-light leading-tight">
            Trois menus.<br />
            <span className="italic text-or">Trois façons d'entrer.</span>
          </h1>
          <div className="w-16 h-[1px] bg-or mx-auto mt-4" />
          <p className="typo-body text-base text-muted max-w-xl mx-auto pt-2">
            Choisissez votre durée. La cuisine fait le reste. La carte change avec les saisons, les accords avec l'humeur du soir.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex justify-center">
          <div className="flex bg-surface p-1 border border-white/10 rounded-none">
            <button
              onClick={() => setViewMode('tasting')}
              className={`px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all ${
                viewMode === 'tasting' ? 'bg-or text-nero shadow-lg' : 'text-muted hover:text-ivoire'
              }`}
            >
              Menus Dégustation
            </button>
            <button
              onClick={() => setViewMode('carte')}
              className={`px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all ${
                viewMode === 'carte' ? 'bg-or text-nero shadow-lg' : 'text-muted hover:text-ivoire'
              }`}
            >
              À La Carte
            </button>
          </div>
        </div>

        {/* Tasting Menus View */}
        {viewMode === 'tasting' && (
          <div className="space-y-12">
            {/* Menu Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tastingMenus.map((menu) => {
                const isSelected = menu.id === activeTastingId;
                return (
                  <div
                    key={menu.id}
                    onClick={() => setActiveTastingId(menu.id)}
                    className={`p-6 border cursor-pointer transition-all duration-300 bg-surface flex flex-col justify-between ${
                      isSelected ? 'border-or ring-1 ring-or shadow-2xl scale-102' : 'border-white/10 hover:border-or/40 opacity-70'
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-or">{menu.tag}</span>
                      <h2 className="font-serif text-2xl text-ivoire">{menu.name}</h2>
                      <p className="text-xs text-muted font-sans line-clamp-2">{menu.description}</p>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-baseline justify-between">
                      <span className="font-serif text-2xl text-or">{menu.price}</span>
                      <span className="text-[11px] text-muted">{menu.winePairingPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Menu Details */}
            <div className="bg-surface-elevated border border-or/30 p-8 sm:p-12 space-y-10 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
                <div>
                  <span className="text-xs uppercase font-mono text-or tracking-widest">{activeTasting.italianName}</span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-ivoire">{activeTasting.name}</h3>
                  <p className="text-xs text-muted max-w-xl pt-2">{activeTasting.description}</p>
                </div>
                <button
                  onClick={() => onSelectMenuForBooking(activeTasting.name)}
                  className="px-8 py-3 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shrink-0"
                >
                  Réserver ce Menu
                </button>
              </div>

              <div className="divide-y divide-white/5 space-y-6">
                {activeTasting.courses?.map((c, i) => (
                  <div key={i} className="pt-6 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-or">Acte {c.act}</span>
                        <h4 className="font-serif text-xl text-ivoire">{c.name}</h4>
                      </div>
                      <p className="text-xs text-muted leading-relaxed font-sans">{c.ingredients}</p>
                    </div>
                    {c.pairing && (
                      <div className="flex items-center gap-2 text-xs text-or/90 bg-nero/50 px-3 py-1.5 border border-white/5 shrink-0">
                        <Wine size={13} />
                        <span>{c.pairing}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* À la carte View */}
        {viewMode === 'carte' && (
          <div className="space-y-12">
            <p className="text-center text-sm text-muted max-w-xl mx-auto">
              Pour ceux qui souhaitent composer leur propre séquence. Deux entrées, un plat, un dessert — ou autre chose. La salle s'adapte à votre rythme.
            </p>
            {aLaCarteSections.map((sec) => (
              <div key={sec.id} className="bg-surface border border-white/10 p-8 sm:p-10 space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="font-serif text-2xl text-ivoire">{sec.category}</h3>
                  <p className="text-xs text-muted italic font-serif">{sec.tagline}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {sec.items.map((item, idx) => (
                    <div key={idx} className="space-y-2 border-b border-white/5 pb-4 last:border-none">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-serif text-lg text-ivoire">{item.name}</h4>
                        <span className="font-serif text-lg text-or shrink-0">{item.price}</span>
                      </div>
                      <p className="text-xs text-muted leading-relaxed">{item.description}</p>
                      {item.allergens && (
                        <p className="text-[10px] text-muted/60 font-mono">Allergènes : {item.allergens}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
