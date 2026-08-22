import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-28 sm:py-36 bg-nero relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Monumental Statement */}
          <div className="lg:col-span-7 space-y-8">
            <span className="typo-eyebrow text-or text-[10px]">SECTION 02 — PHILOSOPHY</span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivoire font-light leading-[1.15]">
              « Tradition is not preserved. <br />
              <span className="italic text-or font-normal">It is reimagined.</span> »
            </h2>

            <div className="space-y-6 typo-body text-base text-muted max-w-xl">
              <p>
                At LUCENTE, we do not view Italian gastronomy as an untouchable museum piece, but as a vibrant, living language. We distill centuries of transalpine culinary memory down to its absolute sensory essence.
              </p>
              <p>
                Every dish is a precise architectural dialogue between raw, dark mineral textures and the illuminating clarity of modern culinary craft.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/story"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-or hover:text-ivoire font-semibold transition-colors group"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Secondary Editorial Photography with Asymmetric Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded overflow-hidden border border-or-subtle shadow-2xl group">
              <img
                src="/images/.webp"
                alt="Chef Vincenzo Moretti à l'atelier"
                className="w-full h-80 sm:h-[460px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="typo-eyebrow text-or text-[9px]">L'Atelier de Création</span>
                <p className="font-serif-luxury text-xl text-ivoire italic">Précision millimétrique & feuillage d'or</p>
              </div>
            </div>

            {/* Decorative Gold Accent Lines */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-28 h-28 border-l border-b border-or/40 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
