import React, { useState } from 'react';
import { wineCategories, restaurantInfo } from '../data/restaurantData';
import { Wine, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function WineCellar() {
  const { lang, t } = useLanguage();
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeCategory = wineCategories[activeCategoryIndex];

  return (
    <section id="cantina" className="py-24 bg-[#0C0B0A] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-sans">Capitolo III</p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F3EFEA] font-light">
            {lang === 'it' ? "La Cantina d'Autore" : lang === 'en' ? "The Signature Wine Cellar" : "La Cave & Sommellerie d'Auteur"}
          </h2>
          <p className="text-[#A39F97] text-xs sm:text-sm tracking-wider">
            {lang === 'it'
              ? '1.400 referenze che celebrano i tesori storici e le avanguardie dei terroir italiani.'
              : lang === 'en'
              ? '1,400 references celebrating historic treasures and the vanguard of Italian terroirs.'
              : '1 400 références célébrant les trésors historiques et l\'avant-garde des terroirs transalpins.'}
          </p>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Sommelier Spotlight Card */}
        <div className="bg-[#141312] border border-[#C5A880]/20 rounded-lg p-6 sm:p-10 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center space-x-2 text-[11px] uppercase tracking-widest text-[#C5A880]">
              <Wine className="w-4 h-4" />
              <span>
                {lang === 'it' ? 'Direzione di Cantina & Sommellerie' : lang === 'en' ? 'Wine & Cellar Direction' : 'Direction de Cave & Sommellerie'}
              </span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#F3EFEA]">
              Gianluca Ferri — {lang === 'it' ? 'Chef Sommelier' : lang === 'en' ? 'Head Sommelier' : 'Chef Sommelier'}
            </h3>
            <p className="text-xs sm:text-sm text-[#A39F97] leading-relaxed font-light">
              {restaurantInfo.sommelier.philosophy}
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4 text-center border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
            <div className="p-3 bg-[#1A1918] rounded">
              <p className="font-serif-luxury text-2xl text-[#DFCA97]">1 400</p>
              <p className="text-[10px] uppercase tracking-wider text-[#A39F97] mt-1">
                {lang === 'it' ? 'Referenze di Vini' : lang === 'en' ? 'Wine References' : 'Références de Vins'}
              </p>
            </div>
            <div className="p-3 bg-[#1A1918] rounded">
              <p className="font-serif-luxury text-2xl text-[#DFCA97]">48</p>
              <p className="text-[10px] uppercase tracking-wider text-[#A39F97] mt-1">
                {lang === 'it' ? 'Annate Rare' : lang === 'en' ? 'Rare Vintages' : 'Millésimes Rares'}
              </p>
            </div>
          </div>
        </div>

        {/* Terroir Regions Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {wineCategories.map((cat, idx) => (
            <button
              key={cat.region}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 border ${
                idx === activeCategoryIndex
                  ? 'bg-[#C5A880] text-[#0C0B0A] border-[#C5A880]'
                  : 'bg-[#141312] text-[#A39F97] border-white/10 hover:border-[#C5A880]/40 hover:text-[#F3EFEA]'
              }`}
            >
              {cat.region}
            </button>
          ))}
        </div>

        {/* Selected Terroir Bottles Grid */}
        <div className="space-y-4">
          <p className="text-center text-xs text-[#A39F97] italic font-serif-luxury mb-6">
            « {activeCategory.description} »
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeCategory.bottles.map((bottle, idx) => (
              <div
                key={idx}
                className="bg-[#141312] border border-white/5 hover:border-[#C5A880]/40 p-6 rounded-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono">{bottle.producer}</span>
                    <span className="font-serif-luxury text-lg text-[#DFCA97]">{bottle.price}</span>
                  </div>
                  <h4 className="font-serif-luxury text-xl text-[#F3EFEA] group-hover:text-[#C5A880] transition-colors">
                    {bottle.name}
                  </h4>
                  <p className="text-xs text-[#A39F97] leading-relaxed pt-2">
                    {bottle.notes}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-[#A39F97] uppercase tracking-wider font-mono">
                  <span>
                    {lang === 'it' ? 'Conservazione a 13°C' : lang === 'en' ? 'Stored at 13°C' : 'Conservation à 13°C'}
                  </span>
                  <span className="text-[#C5A880]">
                    {lang === 'it' ? 'Bottiglia Numerata' : lang === 'en' ? 'Numbered Bottle' : 'Flacon Numéroté'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
