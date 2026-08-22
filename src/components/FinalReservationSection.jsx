import React from 'react';
import { Calendar, Award, Sparkles } from 'lucide-react';

export default function FinalReservationSection({ onOpenBooking }) {
  return (
    <section className="py-32 sm:py-44 bg-nero relative border-t border-white/5 overflow-hidden text-center">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,94,0.12)_0%,rgba(16,16,14,1)_75%)]" />
      <div className="absolute inset-0 bg-noise opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
        <span className="typo-eyebrow text-or text-[10px] tracking-[0.35em]">
          SECTION 08 — RESERVATION
        </span>

        {/* Required Headline */}
        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivoire font-light uppercase tracking-wide">
          « Your table is waiting. »
        </h2>

        <p className="font-serif-luxury text-lg sm:text-2xl text-ivoire/90 font-light italic max-w-xl mx-auto">
          An unforgettable culinary journey through the light and shadows of contemporary Italy.
        </p>

        <div className="pt-6">
          <button
            onClick={() => onOpenBooking()}
            className="px-12 py-5 bg-or hover:bg-ivoire text-nero typo-cta text-sm transition-all duration-300 shadow-2xl shadow-or/20 hover:scale-105"
          >
            RESERVE A TABLE
          </button>
        </div>

        <div className="pt-10 flex items-center justify-center space-x-6 typo-metadata text-xs text-muted">
          <span>MILAN • VIA MONTE NAPOLEONE 14</span>
          <span>•</span>
          <span>PARIS • PLACE VENDÔME</span>
        </div>
      </div>
    </section>
  );
}
