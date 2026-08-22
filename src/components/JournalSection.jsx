import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function JournalSection() {
  const articles = [
    {
      slug: 'art-du-chiaroscuro-culinaire',
      category: 'Seasonal ingredients',
      title: 'The Alchemy of Alba White Truffles at Dawn',
      excerpt: 'Following our historical cavatore through the foggy autumn hills of Piedmont to source the rare Alba tuber.',
      readTime: '4 min read',
      image: '/images/hero-dish.webp'
    },
    {
      slug: 'behind-the-kitchen-technique',
      category: 'Behind the kitchen',
      title: 'Inside the Atelier: 48 Hours of Saffron Clarification',
      excerpt: 'How our brigade transforms raw saffron stigmas from San Gimignano into crystal-clear golden infusions.',
      readTime: '6 min read',
      image: '/images/chef-craft.webp'
    },
    {
      slug: 'vins-amphores-terroirs-etna',
      category: 'Italian traditions',
      title: 'Why Amphora Aging Brings Modernity to Italian Vintages',
      excerpt: 'Exploring the mineral tension of terracotta amphorae and volcanic soil wines with Chef Sommelier Gianluca Ferri.',
      readTime: '5 min read',
      image: '/images/dining-room.webp'
    }
  ];

  return (
    <section className="py-28 sm:py-36 bg-surface relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div className="space-y-3">
            <span className="typo-eyebrow text-or text-[10px]">SECTION 07 — THE JOURNAL</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light">
              Chronicles & Research
            </h2>
          </div>
          <Link
            to="/journal"
            className="typo-cta text-xs text-or hover:text-ivoire flex items-center space-x-2 transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.slug}
              to="/journal/art-du-chiaroscuro-culinaire"
              className="bg-nero border border-white/5 hover:border-or/40 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 typo-eyebrow text-[9px] bg-nero/80 px-2.5 py-1 rounded text-or border border-or-subtle">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 pt-0 space-y-2">
                  <h3 className="font-serif-luxury text-xl text-ivoire group-hover:text-or transition-colors">
                    {art.title}
                  </h3>
                  <p className="typo-body text-xs text-muted leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center justify-between typo-metadata text-[10px] text-muted border-t border-white/5 mt-4">
                <span>{art.readTime}</span>
                <span className="text-or font-semibold group-hover:translate-x-1 transition-transform">Read Story →</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
