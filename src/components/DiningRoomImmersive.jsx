import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';

export default function DiningRoomImmersive({ onOpenBooking }) {
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
        <span className="typo-eyebrow text-or text-[10px]">SECTION 06 — THE SANCTUARY</span>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivoire font-light leading-tight">
          An intimate sanctuary sculpted by shadow <br />
          and directional warmth.
        </h2>

        <p className="typo-body text-base text-muted max-w-xl mx-auto">
          Located on Via Monte Napoleone in Milan, our dining room preserves complete acoustic and visual intimacy for only 28 guests per service.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/private-dining"
            className="px-8 py-3.5 bg-or hover:bg-ivoire text-nero typo-cta transition-all shadow-xl"
          >
            Explore the Salons
          </Link>
          <button
            onClick={() => onOpenBooking()}
            className="px-8 py-3.5 border border-or-subtle hover:border-or bg-nero/80 text-ivoire typo-cta transition-all"
          >
            Reserve a Table
          </button>
        </div>
      </div>
    </section>
  );
}
