import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const label = lang === 'it' ? 'Torna in cima' : lang === 'en' ? 'Back to top' : 'Retour en haut';

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      title={label}
      className={`fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-30 p-2.5 sm:p-3 rounded-full bg-nero/90 border border-or/40 hover:border-or text-or hover:text-nero hover:bg-or backdrop-blur-md shadow-2xl transition-all duration-400 group cursor-pointer ${
        isVisible 
          ? 'opacity-100 translate-y-0 pointer-events-auto scale-100' 
          : 'opacity-0 translate-y-6 pointer-events-none scale-90'
      }`}
    >
      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="sr-only">{label}</span>
    </button>
  );
}

