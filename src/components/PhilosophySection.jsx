import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PhilosophySection() {
  const { lang, t } = useLanguage();

  return (
    <section id="philosophy" className="py-28 sm:py-36 bg-nero relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Editorial Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Monumental Statement */}
          <div className="lg:col-span-7 space-y-8">
            <span className="typo-eyebrow text-or text-[10px]">
              {lang === 'it' ? 'FILOSOFIA' : lang === 'en' ? 'PHILOSOPHY' : 'PHILOSOPHIE'}
            </span>

            <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivoire font-light leading-[1.15]">
              {lang === 'it' ? (
                <>« La tradizione non si conserva. <br /><span className="italic text-or font-normal">Si reinventa.</span> »</>
              ) : lang === 'en' ? (
                <>« Tradition is not preserved. <br /><span className="italic text-or font-normal">It is reimagined.</span> »</>
              ) : (
                <>« La tradition ne se conserve pas. <br /><span className="italic text-or font-normal">Elle se réinvente.</span> »</>
              )}
            </h2>

            <div className="space-y-6 typo-body text-base text-muted max-w-xl">
              <p>
                {lang === 'it'
                  ? "Da LUCENTE, non consideriamo la gastronomia italiana come un reperto intoccabile, ma come una lingua viva. Distilliamo secoli di memoria culinaria transalpina fino alla sua essenza sensoriale."
                  : lang === 'en'
                  ? "At LUCENTE, we do not view Italian gastronomy as an untouchable museum piece, but as a vibrant, living language. We distill centuries of transalpine culinary memory down to its absolute sensory essence."
                  : "Chez LUCENTE, la gastronomie italienne n'est pas un monument intouchable, mais une langue vivante. Nous distillons des siècles de mémoire culinaire transalpine jusqu'à son essence sensorielle la plus pure."}
              </p>
              <p>
                {lang === 'it'
                  ? "Ogni piatto è un dialogo architettonico preciso tra materia grezza e chiarezza della cucina contemporanea."
                  : lang === 'en'
                  ? "Every dish is a precise architectural dialogue between raw, dark mineral textures and the illuminating clarity of modern culinary craft."
                  : "Chaque plat est un dialogue architectural précis entre la matière brute et la clarté lumineuse du geste contemporain."}
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/story"
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-or hover:text-ivoire font-semibold transition-colors group"
              >
                <span>{lang === 'it' ? 'Leggi la Nostra Storia' : lang === 'en' ? 'Read Our Full Story' : 'Découvrir Notre Histoire'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Secondary Editorial Photography with Asymmetric Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded overflow-hidden border border-or-subtle shadow-2xl group">
              <img
                src="/images/chef-craft.webp"
                alt="Chef Vincenzo Moretti à l'atelier"
                className="w-full h-80 sm:h-[460px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="typo-eyebrow text-or text-[9px]">
                  {lang === 'it' ? 'Atelier di Creazione' : lang === 'en' ? 'Creative Atelier' : "L'Atelier de Création"}
                </span>
                <p className="font-serif-luxury text-xl text-ivoire italic">
                  {lang === 'it' ? 'Precisione millimetrica & foglia d’oro' : lang === 'en' ? 'Millimetric precision & gold leaf' : 'Précision millimétrique & feuillage d\'or'}
                </p>
              </div>
            </div>

            {/* Decorative Gold Accent Lines */}
            <div className="hidden sm:block absolute -bottom-4 -left-4 w-28 h-28 border-l border-b border-or/40 pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
}
