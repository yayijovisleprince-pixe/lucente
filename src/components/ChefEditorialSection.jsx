import React from 'react';
import { Link } from 'react-router-dom';
import { Feather, Award, ArrowRight } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';

export default function ChefEditorialSection() {
  const { lang, t } = useLanguage();
  const { chef } = restaurantInfo;

  return (
    <section className="py-28 sm:py-36 bg-surface relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="rounded overflow-hidden border border-or-subtle shadow-2xl group">
              <img
                src="/images/chef-craft.webp"
                alt={chef.name}
                className="w-full h-96 sm:h-[520px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-85" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <p className="typo-eyebrow text-or text-[9px]">
                  {lang === 'it' ? 'Chef Esecutivo' : lang === 'en' ? 'Executive Chef' : 'Chef Exécutif'}
                </p>
                <h3 className="font-serif-luxury text-2xl text-ivoire">{chef.name}</h3>
                <p className="typo-caption text-muted">
                  {lang === 'it' ? 'Direttore Culinario & Fondatore' : lang === 'en' ? 'Culinary Director & Founder' : 'Directeur Culinaire & Co-Fondateur'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Statement & Biography */}
          <div className="lg:col-span-7 space-y-8">
            <span className="typo-eyebrow text-or text-[10px]">
              {lang === 'it' ? 'CAPITOLO V — LO CHEF' : lang === 'en' ? 'CHAPTER V — THE CHEF' : 'CHAPITRE V — LE CHEF'}
            </span>

            {/* Required Headline */}
            <blockquote className="border-l-2 border-or pl-6 py-2">
              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light leading-[1.2]">
                {lang === 'it' ? (
                  <>« Cucinare è memoria. <br /><span className="italic text-or">La tecnica è come la trasformiamo.</span> »</>
                ) : lang === 'en' ? (
                  <>« Cooking is memory. <br /><span className="italic text-or">Technique is how we transform it.</span> »</>
                ) : (
                  <>« Cuisiner, c'est la mémoire. <br /><span className="italic text-or">La technique est notre façon de la sublimer.</span> »</>
                )}
              </h2>
            </blockquote>

            <p className="typo-body text-base text-muted leading-relaxed">
              {lang === 'it'
                ? "Cresciuto al calore della brace emiliana, Vincenzo Moretti ha affinato la sua arte tra Modena, Tokyo e Londra per comprendere cosa voleva ritrovare."
                : lang === 'en'
                ? "Raised by the warmth of Emilian embers, Vincenzo Moretti refined his craft across Modena, Tokyo, and London to rediscover pure Italian origins."
                : (typeof chef.bio === 'object' ? chef.bio.fr : chef.bio)}
            </p>

            <p className="typo-body text-base text-muted leading-relaxed">
              {lang === 'it'
                ? "Ogni piatto è un tributo ai 42 produttori italiani che colgono i tartufi ad Alba, frangono gli oli in Puglia e custodiscono pascoli millenari."
                : lang === 'en'
                ? "Every plate is a tribute to 42 Italian artisans who wake before dawn to harvest white truffles in Alba, press olive oils in Puglia, and craft raw cheeses in alpine valleys."
                : "Chaque assiette rend hommage aux 42 producteurs italiens qui cueillent la truffe blanche à l'aube, pressent l'huile d'olive nouvelle et affinent les trésors d'alpage."}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10">
              <Link
                to="/story"
                className="px-8 py-4 bg-or hover:bg-or-light text-nero hover:text-nero typo-cta transition-all text-center shadow-lg"
              >
                {lang === 'it' ? 'Scopri lo Chef' : lang === 'en' ? 'Discover the Chef' : 'Découvrir le Chef'}
              </Link>
              
              <span className="font-serif-luxury text-2xl text-or italic">
                {chef.signature}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
