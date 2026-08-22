import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { articles as journalArticles } from '../data/journalData';

export default function JournalSection() {
  const displayArticles = journalArticles.slice(0, 3);

  return (
    <section className="py-28 sm:py-36 bg-surface relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div className="space-y-3">
            <span className="typo-eyebrow text-or text-[10px]">CHAPITRE VII — LE JOURNAL</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light">
              Chroniques & Récits de la Maison
            </h2>
          </div>
          <Link
            to="/journal"
            className="typo-cta text-xs text-or hover:text-ivoire flex items-center space-x-2 transition-colors"
          >
            <span>Explorer Tout le Journal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Articles Grid with Exact Working Slugs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayArticles.map((art) => (
            <Link
              key={art.slug}
              to={`/journal/${art.slug}`}
              className="bg-nero border border-white/5 hover:border-or/40 rounded-none overflow-hidden flex flex-col justify-between transition-all duration-300 group shadow-xl"
            >
              <div className="space-y-4">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 typo-eyebrow text-[9px] bg-nero/80 px-2.5 py-1 text-or border border-or-subtle">
                    {art.categoryLabel || art.category}
                  </span>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <h3 className="font-serif-luxury text-xl text-ivoire group-hover:text-or transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="typo-body text-xs text-muted leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between text-[10px] text-muted border-t border-white/5 mt-4 font-mono">
                <span>{art.readingTime || "5 min"} de lecture</span>
                <span className="text-or font-semibold group-hover:translate-x-1 transition-transform font-sans">
                  Lire l'Article →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
