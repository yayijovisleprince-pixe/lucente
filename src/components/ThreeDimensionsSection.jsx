import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, Sun, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ThreeDimensionsSection() {
  const { lang, t } = useLanguage();

  const dimensions = [
    {
      id: 'origin',
      tag: lang === 'it' ? 'DIMENSIONE 01' : lang === 'en' ? 'DIMENSION 01' : 'DIMENSION 01',
      title: lang === 'it' ? 'ORIGINE' : lang === 'en' ? 'ORIGIN' : 'ORIGINE',
      sub: lang === 'it' ? 'Terroir & Artigiani' : lang === 'en' ? 'Terroir & Micro-Growers' : 'Terroirs & Artisans',
      image: '/images/dining-room.webp',
      description: lang === 'it'
        ? 'Relazioni esclusive con 42 micro-produttori indipendenti. Dalla salicornia selvatica siciliana agli uliveti secolari pugliesi.'
        : lang === 'en'
        ? 'Exclusive relationships with 42 independent Italian micro-growers. From wild Sicilian sea fennel to century-old olive groves in Puglia.'
        : "Relations exclusives avec 42 micro-producteurs indépendants italiens. De la salicorne sauvage sicilienne aux oliveraies séculaires des Pouilles."
    },
    {
      id: 'craft',
      tag: lang === 'it' ? 'DIMENSIONE 02' : lang === 'en' ? 'DIMENSION 02' : 'DIMENSION 02',
      title: lang === 'it' ? 'TECNICA' : lang === 'en' ? 'CRAFT' : 'TECHNIQUE',
      sub: lang === 'it' ? 'Chiaroscuro & Mestiere' : lang === 'en' ? 'Chiaroscuro & Technique' : 'Chiaroscuro & Savoir-faire',
      image: '/images/chef-craft.webp',
      description: lang === 'it'
        ? 'Pasta fresca tirata ogni giorno con 30 tuorli al chilo, brodi estratti a freddo e cottura precisa su tralci di vite.'
        : lang === 'en'
        ? 'Handmade daily pasta rolled with 30 yolks per kilo, cold-extracted broths, and precision charcoal roasting over dried vine shoots.'
        : 'Pâtes fraîches laminées chaque matin à 30 jaunes au kilo, bouillons centrifugés à froid et cuisson précise sur sarments de vigne.'
    },
    {
      id: 'season',
      tag: lang === 'it' ? 'DIMENSIONE 03' : lang === 'en' ? 'DIMENSION 03' : 'DIMENSION 03',
      title: lang === 'it' ? 'STAGIONE' : lang === 'en' ? 'SEASON' : 'SAISON',
      sub: lang === 'it' ? 'Ritmo Effimero' : lang === 'en' ? 'Ephemeral Rhythm' : 'Rythme Éphémère',
      image: '/images/hero-dish.webp',
      description: lang === 'it'
        ? "Una carta che respira con la natura. Tartufo bianco d'Alba colto all'alba, agrumi invernali di Sorrento e carciofi liguri."
        : lang === 'en'
        ? 'A menu that breathes with nature. Alba white truffles harvested at dawn, winter citrus from Sorrento, and spring artichokes from Liguria.'
        : "Une carte qui respire avec la nature. Truffe blanche d'Alba cueillie à l'aube, agrumes d'hiver de Sorrente et artichauts de Ligurie."
    }
  ];

  return (
    <section className="py-28 sm:py-36 bg-surface relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="typo-eyebrow text-or text-[10px]">
            {lang === 'it' ? 'CAPITOLO II — LA CUCINA' : lang === 'en' ? 'CHAPTER II — THE CUISINE' : 'CHAPITRE II — LA CUISINE'}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light">
            {lang === 'it' ? 'Tre Dimensioni Sacre' : lang === 'en' ? 'Three Sacred Dimensions' : 'Trois Dimensions Sacrées'}
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
                  <span>{lang === 'it' ? 'Esplora la Dimensione' : lang === 'en' ? 'Explore Dimension' : 'Explorer la Dimension'}</span>
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
            {lang === 'it' ? 'Scopri Tutte le Tecniche Culinarie' : lang === 'en' ? 'Discover All Culinary Techniques' : 'Découvrir Toutes les Techniques'}
          </Link>
        </div>

      </div>
    </section>
  );
}
