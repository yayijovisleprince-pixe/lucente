import React, { useState, useEffect } from 'react';
import { Calendar, Phone } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';

export default function MobileBottomBar({ onOpenBooking }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating bar after scrolling 120px
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside 
      aria-label="Barre d'action rapide"
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden p-3 bg-nero/95 backdrop-blur-xl border-t border-or/30 transition-all duration-500 pb-safe ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
      style={{
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))'
      }}
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Quick Call Button */}
        <a
          href={`tel:${restaurantInfo.phone.replace(/\s+/g, '')}`}
          aria-label="Appeler la conciergerie LUCENTE"
          className="flex items-center justify-center gap-1.5 px-4 min-h-[48px] rounded-none bg-surface-elevated border border-white/15 text-ivoire hover:border-or hover:text-or text-xs uppercase tracking-wider font-semibold transition-colors shrink-0 touch-manipulation"
          title="Appeler la conciergerie"
        >
          <Phone size={14} className="text-or" />
          <span className="hidden sm:inline">Concierge</span>
        </a>

        {/* Primary Reserve Button */}
        <button
          onClick={() => onOpenBooking()}
          aria-label="Réserver une table à LUCENTE"
          className="flex-1 flex items-center justify-center gap-2 px-4 min-h-[48px] rounded-none bg-or hover:bg-ivoire text-nero font-semibold text-xs uppercase tracking-widest transition-all shadow-xl touch-manipulation"
        >
          <Calendar size={15} />
          <span>Réserver une Table</span>
        </button>
      </div>
    </aside>
  );
}
