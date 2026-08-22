import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function SignatureDishesEditorial({ onSelectDishForBooking }) {
  const { lang, t } = useLanguage();

  const dishes = [
    {
      id: 'chianina-tartufo',
      act: lang === 'it' ? 'ATTO IV' : lang === 'en' ? 'ACT IV' : 'ACTE IV',
      name: 'Filetto di Chianina, Tartufo Bianco & Jus al Barolo',
      italianTitle: 'La Terra in Chiaroscuro',
      price: '75 €',
      image: '/images/hero-dish.webp',
      description: lang === 'it'
        ? "Filetto di Chianina cotto su tralci di vite, scaglie di tartufo bianco d'Alba, scalogni caramellati e riduzione di Barolo 48 ore."
        : lang === 'en'
        ? "Wood-fired Chianina beef tenderloin, smoked over vine shoots, Alba white truffle shavings, caramelized baby shallots, and a 48-hour glossy Barolo reduction."
        : "Filet de bœuf Chianina fumé aux sarments de vigne, lamelles de truffe blanche d'Alba, échalotes confites et réduction de Barolo 48 heures.",
      winePairing: 'Barolo Monprivato DOCG 2017 — Giuseppe Mascarello'
    },
    {
      id: 'raviolo-imperiale',
      act: lang === 'it' ? 'ATTO III' : lang === 'en' ? 'ACT III' : 'ACTE III',
      name: 'Raviolo Imperiale, Scampi Reali & Caviale Oscietra',
      italianTitle: "L'Oro del Mare",
      price: '68 €',
      image: '/images/pasta-caviar.webp',
      description: lang === 'it'
        ? "Raviolo artigianale farcito con scampi mediterranei, 20g di caviale Oscietra Royal e brodo puro allo zafferano di San Gimignano."
        : lang === 'en'
        ? "Single golden handcrafted raviolo filled with Mediterranean langoustines, 20g Royal Oscietra caviar, and pure saffron broth from San Gimignano."
        : "Raviolo artisanal doré farci aux langoustines de Méditerranée, 20g de caviar Oscietra Royal et bouillon pur au safran de San Gimignano.",
      winePairing: "Trebbiano d'Abruzzo DOC 2019 — Valentini"
    },
    {
      id: 'risotto-oro',
      act: lang === 'it' ? 'ATTO V' : lang === 'en' ? 'ACT V' : 'ACTE V',
      name: "Risotto Carnaroli Riserva 7 Anni, Zafferano & Foglia d'Oro",
      italianTitle: "L'Omaggio a Milano",
      price: '55 €',
      image: '/images/hero-dish.webp',
      description: lang === 'it'
        ? "Riso Carnaroli invecchiato 7 anni, burro di malga, Parmigiano Vacche Rosse 36 mesi e foglia d'oro 24 carati commestibile."
        : lang === 'en'
        ? "7-year aged Carnaroli rice, mountain butter noisette, 36-month Vacche Rosse Parmigiano-Reggiano, topped with 24k edible pure gold leaf."
        : "Riz Carnaroli affiné 7 ans, beurre noisette d'alpage, parmesan Vacche Rosse 36 mois et feuille d'or pur 24 carats.",
      winePairing: 'Tignanello Toscana IGT 2017 — Marchesi Antinori'
    },
    {
      id: 'crudo-spigola',
      act: lang === 'it' ? 'ATTO I' : lang === 'en' ? 'ACT I' : 'ACTE I',
      name: 'Crudo di Spigola di Linea, Agrumi di Sorrento & Salicornia',
      italianTitle: 'La Brezza Marina',
      price: '48 €',
      image: '/images/pasta-caviar.webp',
      description: lang === 'it'
        ? "Crudo di spigola all'amo, perle di agrumi di Sorrento, salicornia croccante e olio extravergine Coratina prima spremitura."
        : lang === 'en'
        ? "Line-caught sea bass sashimi, Sorrento citrus pearls, crispy rock samphire, and first-press cold Coratina extra virgin olive oil."
        : "Sashimi de bar de ligne, perles d'agrumes de Sorrente, salicorne croustillante et huile d'olive Coratina première pression à froid.",
      winePairing: "Franciacorta Riserva Annamaria Clementi — Ca' del Bosco"
    }
  ];

  const [activeDish, setActiveDish] = useState(dishes[0]);

  return (
    <section className="py-28 sm:py-36 bg-nero relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
          <div className="space-y-3">
            <span className="typo-eyebrow text-or text-[10px]">
              {lang === 'it' ? 'CAPITOLO IV — CREAZIONI' : lang === 'en' ? 'CHAPTER IV — CREATIONS' : 'CHAPITRE IV — CRÉATIONS'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light">
              {lang === 'it' ? 'Piatti d\'Autore' : lang === 'en' ? 'Signature Dishes' : 'Plats Signatures'}
            </h2>
          </div>
          <p className="typo-caption text-muted text-xs max-w-sm">
            {lang === 'it'
              ? 'Esplora le creazioni per scoprire ingredienti sensoriali e abbinamenti rari.'
              : lang === 'en'
              ? 'Explore our creations to reveal sensory ingredients and rare pairings.'
              : 'Survolez chaque création pour découvrir les matières premières et les accords rares.'}
          </p>
        </div>

        {/* Editorial Split Layout: Interactive List (Left) + Dynamic Large Image (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Dish List */}
          <div className="lg:col-span-7 divide-y divide-white/5 space-y-4">
            {dishes.map((dish) => {
              const isSelected = activeDish.id === dish.id;
              return (
                <div
                  key={dish.id}
                  onMouseEnter={() => setActiveDish(dish)}
                  onClick={() => setActiveDish(dish)}
                  className={`pt-6 pb-4 cursor-pointer transition-all duration-300 group ${
                    isSelected ? 'pl-4 border-l-2 border-or' : 'hover:pl-2'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="space-y-1">
                      <span className="typo-metadata text-[10px] text-or font-mono">{dish.act} • {dish.italianTitle}</span>
                      <h3 className={`font-serif-luxury text-xl sm:text-2xl transition-colors ${
                        isSelected ? 'text-or' : 'text-ivoire group-hover:text-ivoire'
                      }`}>
                        {dish.name}
                      </h3>
                    </div>
                    <span className="font-serif-luxury text-xl text-ivoire/90 flex-shrink-0">{dish.price}</span>
                  </div>

                  {/* Expanded details when active */}
                  {isSelected && (
                    <div className="mt-3 space-y-2 animate-fadeIn">
                      <p className="typo-body text-xs text-muted leading-relaxed">
                        {dish.description}
                      </p>
                      <p className="typo-caption text-or text-[11px]">
                        {lang === 'it' ? 'Abbinamento consigliato: ' : lang === 'en' ? 'Recommended pairing: ' : 'Accord conseillé : '}
                        <span className="text-ivoire font-serif-luxury italic">{dish.winePairing}</span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Definition Dynamic Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded overflow-hidden border border-or-subtle shadow-2xl bg-surface h-80 sm:h-[480px]">
              <img
                key={activeDish.id}
                src={activeDish.image}
                alt={activeDish.name}
                className="w-full h-full object-cover transition-all duration-700 filter brightness-95 contrast-105 animate-fadeIn"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-85" />
              
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <span className="typo-eyebrow text-or text-[9px]">{activeDish.act}</span>
                <h4 className="font-serif-luxury text-xl text-ivoire">{activeDish.name}</h4>
                <p className="typo-caption text-muted">{activeDish.italianTitle}</p>
              </div>
            </div>

            {/* Subtle Gold Backdrop Frame */}
            <div className="hidden sm:block absolute -top-3 -right-3 w-32 h-32 border-t border-r border-or/30 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
