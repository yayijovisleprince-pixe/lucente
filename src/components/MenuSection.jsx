import React, { useState, useMemo } from 'react';
import { getTastingMenus } from '../data/restaurantData';
import { Wine, Sparkles, Check, ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function MenuSection({ onSelectMenuForBooking }) {
  const { lang, t } = useLanguage();
  const localizedTastingMenus = useMemo(() => getTastingMenus(lang), [lang]);
  const [activeMenuId, setActiveMenuId] = useState(localizedTastingMenus[0].id);
  const [showPairings, setShowPairings] = useState(true);

  const activeMenu = localizedTastingMenus.find((m) => m.id === activeMenuId) || localizedTastingMenus[0];

  return (
    <section id="percorsi" className="py-24 bg-[#0F0E0D] relative border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-sans">Capitolo II</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F3EFEA] font-light">
            {t('menu.eyebrow')}
          </h2>
          <p className="text-[#A39F97] text-xs sm:text-sm tracking-wider">
            {lang === 'it'
              ? 'Tre percorsi di degustazione concepiti come suite poetiche e teatrali.'
              : lang === 'en'
              ? 'Three tasting journeys conceived as poetic and theatrical suites.'
              : 'Trois voyages de dégustation pensés comme des suites poétiques et théâtrales.'}
          </p>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Menu Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12">
          {localizedTastingMenus.map((menu) => {
            const isActive = menu.id === activeMenuId;
            return (
              <button
                key={menu.id}
                onClick={() => setActiveMenuId(menu.id)}
                className={`px-6 py-3.5 rounded-none text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#C5A880] text-[#0C0B0A] border-[#C5A880] shadow-lg shadow-[#C5A880]/15'
                    : 'bg-[#161514] text-[#A39F97] border-white/10 hover:border-[#C5A880]/40 hover:text-[#F3EFEA]'
                }`}
              >
                <span className="block text-[10px] opacity-75 font-mono">{menu.tag}</span>
                <span className="font-serif-luxury text-base font-normal tracking-wide lowercase capitalize">{menu.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Menu Container */}
        <div className="bg-[#141312] border border-[#C5A880]/20 rounded-lg p-6 sm:p-10 lg:p-14 shadow-2xl shadow-black relative overflow-hidden">
          
          {/* Menu Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[10px] uppercase tracking-widest font-mono">
                {activeMenu.tag} • {activeMenu.italianName}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F3EFEA] font-light">
                {activeMenu.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#A39F97] max-w-xl font-light">
                {activeMenu.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 lg:text-right">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#A39F97]">
                  {lang === 'it' ? 'Prezzo per persona' : lang === 'en' ? 'Price per guest' : 'Tarif par convive'}
                </p>
                <p className="font-serif-luxury text-3xl sm:text-4xl text-[#DFCA97] font-light">{activeMenu.price}</p>
                <p className="text-[11px] text-[#A39F97] font-mono mt-0.5">{activeMenu.winePairingPrice}</p>
              </div>

              <button
                onClick={() => onSelectMenuForBooking(activeMenu.name)}
                className="px-6 py-3.5 bg-[#C5A880] hover:bg-[#DFCA97] text-[#0C0B0A] uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 shadow-md hover:shadow-[#C5A880]/20 flex items-center justify-center space-x-2"
              >
                <span>{lang === 'it' ? 'Prenota questo Menu' : lang === 'en' ? 'Reserve this Menu' : 'Réserver ce Menu'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sommelier Toggle */}
          <div className="flex items-center justify-between bg-[#1C1A18] px-5 py-3 rounded border border-white/5 mb-8">
            <div className="flex items-center space-x-3 text-xs text-[#E8E2D5]">
              <Wine className="w-4 h-4 text-[#C5A880]" />
              <span>
                {lang === 'it'
                  ? 'Abbinamento Vini suggerito dal Capo Sommelier Gianluca Ferri'
                  : lang === 'en'
                  ? 'Wine pairings recommended by Head Sommelier Gianluca Ferri'
                  : 'Accords Mets & Vins recommandés par le Chef Sommelier Gianluca Ferri'}
              </span>
            </div>
            <button
              onClick={() => setShowPairings(!showPairings)}
              className="text-[11px] uppercase tracking-wider text-[#C5A880] hover:underline"
            >
              {showPairings
                ? (lang === 'it' ? 'Nascondi abbinamenti' : lang === 'en' ? 'Hide pairings' : 'Masquer les accords')
                : (lang === 'it' ? 'Mostra abbinamenti' : lang === 'en' ? 'Show pairings' : 'Afficher les accords')}
            </button>
          </div>

          {/* Courses List */}
          <div className="divide-y divide-white/5 space-y-6">
            {activeMenu.courses.map((course, idx) => (
              <div key={idx} className="pt-6 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group">
                
                {/* Act Index */}
                <div className="md:col-span-2 flex items-baseline space-x-2">
                  <span className="font-serif-luxury text-[#C5A880] text-lg font-light">
                    {lang === 'it' ? 'Atto' : lang === 'en' ? 'Act' : 'Acte'} {course.act}
                  </span>
                  <span className="text-white/20 text-xs">—</span>
                </div>

                {/* Course Details */}
                <div className="md:col-span-6 space-y-1">
                  <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#F3EFEA] group-hover:text-[#DFCA97] transition-colors">
                    {course.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A39F97] font-light leading-relaxed">
                    {course.ingredients}
                  </p>
                </div>

                {/* Wine Pairing */}
                {showPairings && (
                  <div className="md:col-span-4 bg-[#181715] p-3 rounded border border-white/5 md:border-l md:border-t-0 md:border-r-0 md:border-b-0 md:border-[#C5A880]/30">
                    <p className="text-[10px] uppercase tracking-widest text-[#C5A880] flex items-center space-x-1.5 font-mono">
                      <Wine className="w-3 h-3" />
                      <span>{lang === 'it' ? 'Calice Associato' : lang === 'en' ? 'Paired Glass' : 'Calice Associé'}</span>
                    </p>
                    <p className="text-xs text-[#E8E2D5] font-serif-luxury italic mt-0.5">
                      {course.pairing}
                    </p>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Bottom Dietary & Discretion Notice */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] text-[#A39F97] gap-4">
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
              <span>
                {lang === 'it'
                  ? 'I nostri menu evolvono secondo gli arrivi quotidiani dei produttori italiani. Alternative vegetariane e opzioni per allergie su richiesta.'
                  : lang === 'en'
                  ? 'Our menus evolve according to daily arrivals from Italian artisans. Vegetarian alternatives and allergen accommodations available on request.'
                  : 'Nos menus évoluent au fil des arrivages quotidiens des artisans italiens. Options végétariennes et ajustements pour allergies sur demande préalable.'}
              </span>
            </div>
            <span className="text-[#C5A880] font-mono tracking-wider flex-shrink-0">
              {lang === 'it' ? 'Servizio 100% al Tavolo' : lang === 'en' ? '100% Table Service' : 'Service 100% à Table'}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
