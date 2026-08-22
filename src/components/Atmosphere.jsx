import React, { useState } from 'react';
import { spaces } from '../data/restaurantData';
import { Users, Sparkles, Eye, ArrowRight } from 'lucide-react';

export default function Atmosphere({ onOpenBooking }) {
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState(0);
  const activeSpace = spaces[selectedSpaceIndex];

  return (
    <section id="spazi" className="py-24 bg-[#0F0E0D] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-sans">Capitolo IV</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F3EFEA] font-light">
            L'Ambiente & L'Atelier
          </h2>
          <p className="text-[#A39F97] text-xs sm:text-sm tracking-wider">
            Une architecture minérale milanaise conçue pour préserver l'intimité et magnifier chaque plat.
          </p>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Space Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {spaces.map((space, idx) => {
            const isSelected = idx === selectedSpaceIndex;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpaceIndex(idx)}
                className={`p-5 text-left border rounded transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#1A1918] border-[#C5A880] shadow-xl'
                    : 'bg-[#141312] border-white/5 hover:border-white/20'
                }`}
              >
                <p className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">{space.capacity}</p>
                <h3 className="font-serif-luxury text-xl text-[#F3EFEA] mt-1">{space.name}</h3>
              </button>
            );
          })}
        </div>

        {/* Active Space Feature Showcase */}
        <div className="bg-[#141312] border border-[#C5A880]/20 rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
          {/* Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px]">
            <img
              src={activeSpace.image}
              alt={activeSpace.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#141312]" />
          </div>

          {/* Space Details */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">
                <Users className="w-3.5 h-3.5" />
                <span>{activeSpace.capacity}</span>
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F3EFEA]">
                {activeSpace.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#A39F97] font-light leading-relaxed">
                {activeSpace.description}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                onClick={() => onOpenBooking(activeSpace.name)}
                className="w-full py-3.5 bg-[#C5A880] hover:bg-[#DFCA97] text-[#0C0B0A] uppercase tracking-[0.2em] text-xs font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Privatiser ou Réserver cet Espace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <p className="text-[10px] text-center text-[#A39F97] tracking-wider">
                Réservation recommandée 3 semaines à l'avance
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
