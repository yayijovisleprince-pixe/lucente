import React, { useMemo } from 'react';
import { getPressReviews } from '../data/restaurantData';
import { Award, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Reviews() {
  const { lang, t } = useLanguage();
  const localizedReviews = useMemo(() => getPressReviews(lang), [lang]);

  return (
    <section id="riconoscimenti" className="py-24 bg-[#0C0B0A] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-sans">
            {lang === 'it' ? 'Critica & Riconoscimenti' : lang === 'en' ? 'Press & Accolades' : 'Critique & Distinctions'}
          </p>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#F3EFEA] font-light">
            {lang === 'it' ? 'Riconoscimenti' : lang === 'en' ? 'Press Accolades' : 'Distinctions & Presse'}
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A880] mx-auto mt-4" />
        </div>

        {/* Press Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {localizedReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-[#141312] border border-white/5 hover:border-[#C5A880]/40 p-8 rounded-lg flex flex-col justify-between space-y-6 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* 5 Stars Gold Accent */}
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  ))}
                </div>

                <blockquote className="font-serif-luxury text-lg text-[#E8E2D5] font-light italic leading-relaxed">
                  « {review.quote} »
                </blockquote>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#F3EFEA] font-medium">{review.author}</p>
                  <p className="text-[10px] text-[#A39F97] font-mono">{review.year}</p>
                </div>
                <Award className="w-5 h-5 text-[#C5A880]/60 group-hover:text-[#C5A880] transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
