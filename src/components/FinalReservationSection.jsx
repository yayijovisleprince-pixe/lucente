import React from 'react';
import { Calendar, Award, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function FinalReservationSection({ onOpenBooking }) {
  const { lang, t } = useLanguage();

  return (
    <section className="py-32 sm:py-44 bg-nero relative border-t border-white/5 overflow-hidden text-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,94,0.12)_0%,rgba(16,16,14,1)_75%)]" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
        <span className="typo-eyebrow text-or text-[10px] tracking-[0.35em]">
          {lang === 'it' ? 'PRENOTAZIONE' : lang === 'en' ? 'RESERVATION' : 'RÉSERVATION'}
        </span>

        {/* Required Headline */}
        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivoire font-light uppercase tracking-wide">
          {lang === 'it' ? '« La vostra tavola vi attende. »' : lang === 'en' ? '« Your table is waiting. »' : '« Votre table vous attend. »'}
        </h2>

        <p className="font-serif-luxury text-lg sm:text-2xl text-ivoire/90 font-light italic max-w-xl mx-auto">
          {lang === 'it'
            ? "Un viaggio gastronomico indimenticabile attraverso luci e ombre dell'Italia contemporanea."
            : lang === 'en'
            ? "An unforgettable culinary journey through the light and shadows of contemporary Italy."
            : "Un voyage gastronomique inoubliable à travers les lumières et les ombres de l'Italie contemporaine."}
        </p>

        <div className="pt-6">
          <button
            onClick={() => onOpenBooking()}
            className="px-12 py-5 bg-or hover:bg-ivoire text-nero typo-cta text-sm transition-all duration-300 shadow-2xl shadow-or/20 hover:scale-105"
          >
            {t('nav.reserveTable')}
          </button>
        </div>

        <div className="pt-10 flex items-center justify-center space-x-6 typo-metadata text-xs text-muted">
          <span>MILANO • VIA MONTE NAPOLEONE 14</span>
          <span>•</span>
          <span>{lang === 'it' ? '28 COPERTI' : lang === 'en' ? '28 COVERS' : '28 COUVERTS'}</span>
        </div>
      </div>
    </section>
  );
}

