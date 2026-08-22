import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function DiningRoomImmersive({ onOpenBooking }) {
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden border-t border-white/5">
      
      {/* Background Wide Horizontal Image with Parallax Impression */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/dining-room.webp"
          alt="La Sala Chiaroscuro de LUCENTE à Milan"
          className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/50 to-nero/70" />
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      {/* Center Atmospheric Statement */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6 py-20">
        <span className="typo-eyebrow text-or text-[10px]">
          {lang === 'it' ? 'CAPITOLO VI — IL SANTUARIO' : lang === 'en' ? 'CHAPTER VI — THE SANCTUARY' : 'CHAPITRE VI — LE SANCTUAIRE'}
        </span>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivoire font-light leading-tight">
          {lang === 'it' ? (
            <>Un santuario intimo scolpito da ombre <br />e calore direzionale.</>
          ) : lang === 'en' ? (
            <>An intimate sanctuary sculpted by shadow <br />and directional warmth.</>
          ) : (
            <>Un sanctuaire intime sculpté par l'ombre <br />et une chaleur directionnelle.</>
          )}
        </h2>

        <p className="typo-body text-base text-muted max-w-xl mx-auto">
          {lang === 'it'
            ? 'In Via Monte Napoleone a Milano, la nostra sala preserva una completa intimità acustica e visiva per soli 28 ospiti per servizio.'
            : lang === 'en'
            ? 'Located on Via Monte Napoleone in Milan, our dining room preserves complete acoustic and visual intimacy for only 28 guests per service.'
            : 'En plein cœur de la Via Monte Napoleone à Milan, notre salle préserve une intimité acoustique et visuelle absolue pour 28 convives seulement.'}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/private-dining"
            className="px-8 py-3.5 bg-or hover:bg-ivoire text-nero typo-cta transition-all shadow-xl"
          >
            {lang === 'it' ? 'Esplora i Saloni' : lang === 'en' ? 'Explore the Salons' : 'Explorer les Salons'}
          </Link>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-3.5 border border-or-subtle hover:border-or bg-nero/80 text-ivoire typo-cta transition-all"
          >
            {lang === 'it' ? 'Prenota un Tavolo' : lang === 'en' ? 'Reserve a Table' : 'Réserver une Table'}
          </button>
        </div>
      </div>
    </section>
  );
}
