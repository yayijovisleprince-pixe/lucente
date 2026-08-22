import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Sun, ArrowRight } from 'lucide-react';

export default function ThreeDimensionsSection() {
  const dimensions = [
    {
      id: 'origin',
      tag: 'DIMENSION 01',
      title: 'ORIGIN',
      sub: 'The Terroir & Artisans',
      image: '/images/dining-room.webp',
      description: 'Exclusive relationships with 42 independent Italian micro-growers. From wild Sicilian sea fennel to century-old olive groves in Puglia.'
    },
    {
      id: 'craft',
      tag: 'DIMENSION 02',
      title: 'CRAFT',
      sub: 'Chiaroscuro & Technique',
      image: '/images/chef-craft.webp',
      description: 'Handmade daily pasta rolled with 30 yolks per kilo, cold-extracted broths, and precision charcoal roasting over dried vine shoots.'
    },
    {
      id: 'season',
      tag: 'DIMENSION 03',
      title: 'SEASON',
      sub: 'Ephemeral Rhythm',
      image: '/images/hero-dish.webp',
      description: 'A menu that breathes with nature. Alba white truffles harvested at dawn, winter citrus from Sorrento, and spring artichokes from Liguria.'
    }
  ];

  return (
    <section className="py-28 sm:py-36 bg-surface relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="typo-eyebrow text-or text-[10px]">SECTION 03 — THE CUISINE</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light">
            Three Sacred Dimensions
          </h2>
          <div className="w-16 h-[1px] bg-or mx-auto mt-4" />
        </div>

        {/* 3 Dimensions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dimensions.map((dim) => (
            <div
              key={dim.id}
              className="bg-nero border border-white/5 hover:border-or/50 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-500 group shadow-xl hover:shadow-2xl hover:shadow-black"
            >
              {/* Card Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={dim.image}
                  alt={dim.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/30 to-transparent" />
                <span className="absolute top-4 left-4 typo-eyebrow text-[9px] bg-nero/80 px-2.5 py-1 border border-or-subtle rounded">
                  {dim.tag}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-serif-luxury text-2xl text-ivoire group-hover:text-or transition-colors">
                    {dim.title}
                  </h3>
                  <p className="typo-eyebrow text-or/80 text-[10px]">{dim.sub}</p>
                  <p className="typo-body text-xs text-muted leading-relaxed pt-2">
                    {dim.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs text-or font-mono">
                  <span>Explore Dimension</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Link to Full Cuisine Page */}
        <div className="text-center pt-6">
          <Link
            to="/cuisine"
            className="px-8 py-3.5 border border-or text-or hover:bg-or hover:text-nero typo-cta transition-all inline-block shadow-lg"
          >
            Discover All Culinary Techniques
          </Link>
        </div>

      </div>
    </section>
  );
}
