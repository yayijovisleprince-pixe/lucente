import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Hero({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const scrollToPhilosophy = () => {
    const el = document.getElementById('philosophy');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nero">
      
      {/* Background Image with Cinematic Zoom & Chiaroscuro Mask */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/hero-dish.webp"
          alt="LUCENTE — Haute Cuisine Italienne"
          className={`w-full h-full object-cover filter brightness-[0.45] contrast-[1.15] transition-all duration-[2200ms] ease-out ${
            isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
          }`}
        />
        {/* Layered Vignette and Gradient Masks */}
        <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/60 to-nero/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(16,16,14,0.85)_80%)]" />
        <div className="absolute inset-0 bg-noise opacity-25" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-24 pb-16">
        
        {/* Location Eyebrow */}
        <div
          className={`transition-all duration-1000 delay-300 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <span className="typo-eyebrow text-or text-[10px] sm:text-xs tracking-[0.35em] block mb-4">
            MILAN &nbsp;/&nbsp; PARIS &nbsp;/&nbsp; TOKYO
          </span>
        </div>

        {/* Monumental Brand Title */}
        <h1
          className={`typo-h1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.2em] font-light text-ivoire uppercase mb-6 transition-all duration-1000 delay-500 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          LUCENTE
        </h1>

        {/* Minimal Hero Tagline */}
        <div
          className={`max-w-xl mx-auto space-y-2 mb-10 transition-all duration-1000 delay-700 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-ivoire/90 font-light tracking-wide uppercase">
            {lang === 'it' ? (
              <>CUCINA ITALIANA, <br className="hidden sm:block" /><span className="italic text-or">REINVENTATA.</span></>
            ) : lang === 'en' ? (
              <>ITALIAN CUISINE, <br className="hidden sm:block" /><span className="italic text-or">REIMAGINED.</span></>
            ) : (
              <>CUISINE ITALIENNE, <br className="hidden sm:block" /><span className="italic text-or">RÉINVENTÉE.</span></>
            )}
          </p>
        </div>

        {/* Dual Luxury Action Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto transition-all duration-1000 delay-900 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto px-10 py-4 bg-or hover:bg-ivoire text-nero typo-cta transition-all duration-300 shadow-2xl shadow-or/10 hover:scale-[1.02]"
          >
            {t('nav.reserveTable')}
          </button>
          
          <Link
            to="/cuisine"
            className="w-full sm:w-auto px-10 py-4 border border-or-subtle hover:border-or bg-surface/80 hover:bg-surface-elevated text-ivoire typo-cta transition-all duration-300 text-center"
          >
            {lang === 'it' ? 'SCOPRI LA NOSTRA CUCINA' : lang === 'en' ? 'DISCOVER OUR CUISINE' : 'DÉCOUVRIR NOTRE CUISINE'}
          </Link>
        </div>

        {/* Slow Pulsing Scroll Down Indicator */}
        <div
          onClick={scrollToPhilosophy}
          className={`mt-16 cursor-pointer text-muted hover:text-or transition-all duration-700 delay-1000 flex flex-col items-center space-y-2 ${
            isLoaded ? 'opacity-70 hover:opacity-100' : 'opacity-0'
          }`}
        >
          <span className="typo-caption text-[9px] uppercase tracking-[0.25em]">
            {lang === 'it' ? 'Scorri per scoprire' : lang === 'en' ? 'Scroll to discover' : 'Défiler pour explorer'}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-or" />
        </div>

      </div>
    </section>
  );
}
