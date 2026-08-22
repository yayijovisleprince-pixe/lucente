import React from 'react';
import { restaurantInfo } from '../data/restaurantData';
import { Compass, Sparkles, Feather } from 'lucide-react';

export default function Story() {
  const { chef } = restaurantInfo;

  return (
    <section id="filosofia" className="py-24 relative bg-[#0C0B0A] overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-sans">Capitolo I</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F3EFEA] font-light">
            La Filosofia del Gesto
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Main Split Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Chef Portrait & Craftsmanship */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-[#C5A880]/20 shadow-2xl shadow-black group">
              <img
                src="/images/chef-craft.jpg"
                alt="Chef Vincenzo Moretti en pleine précision culinaire chez LUCENTE"
                className="w-full h-[450px] sm:h-[520px] object-cover object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0B0A] via-transparent to-transparent opacity-90" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-mono">Maestro di Cucina</p>
                <p className="font-serif-luxury text-2xl text-[#F3EFEA]">{chef.name}</p>
                <p className="text-xs text-[#A39F97] tracking-wider mt-1">{chef.role}</p>
              </div>
            </div>

            {/* Decorative Gold Frame Accent */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-32 h-32 border-r border-b border-[#C5A880]/40 pointer-events-none" />
          </div>

          {/* Right Column: Editorial Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Chef Quote */}
            <blockquote className="border-l-2 border-[#C5A880] pl-6 py-2">
              <p className="font-serif-luxury text-2xl sm:text-3xl text-[#E8E2D5] font-light italic leading-relaxed">
                « {chef.quote} »
              </p>
            </blockquote>

            <p className="text-[#A39F97] text-sm sm:text-base leading-relaxed font-light">
              {chef.bio}
            </p>

            {/* 3 Pillars of Lucente */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              <div className="p-5 bg-[#141312] border border-white/5 rounded space-y-2">
                <span className="text-[#C5A880] font-serif-luxury text-xl">01.</span>
                <h3 className="text-xs uppercase tracking-widest text-[#F3EFEA] font-medium">Radici Pure</h3>
                <p className="text-[11px] text-[#A39F97] leading-relaxed">
                  Farines anciennes de meule, truffes d'Alba récoltées à l'aube, agrumes sauvages de Sorrente.
                </p>
              </div>

              <div className="p-5 bg-[#141312] border border-white/5 rounded space-y-2">
                <span className="text-[#C5A880] font-serif-luxury text-xl">02.</span>
                <h3 className="text-xs uppercase tracking-widest text-[#F3EFEA] font-medium">Chiaroscuro</h3>
                <p className="text-[11px] text-[#A39F97] leading-relaxed">
                  Tension esthétique et gustative entre la minéralité sombre du contenant et l'éclat des textures.
                </p>
              </div>

              <div className="p-5 bg-[#141312] border border-white/5 rounded space-y-2">
                <span className="text-[#C5A880] font-serif-luxury text-xl">03.</span>
                <h3 className="text-xs uppercase tracking-widest text-[#F3EFEA] font-medium">Il Tempo Nobile</h3>
                <p className="text-[11px] text-[#A39F97] leading-relaxed">
                  Parmigiano Vacche Rosse 36 mois, balsamique de Modène 25 ans, réductions patientes.
                </p>
              </div>
            </div>

            {/* Handwritten Signature */}
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <div className="flex items-center space-x-2 text-xs tracking-widest text-[#C5A880]">
                <Feather className="w-4 h-4" />
                <span>Firmato dal Chef Vincenzo Moretti</span>
              </div>
              <span className="font-serif-luxury text-2xl tracking-wider text-[#DFCA97] italic font-light">
                Vincenzo Moretti
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
