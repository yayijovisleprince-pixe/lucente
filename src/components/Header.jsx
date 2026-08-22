import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Calendar, Menu as MenuIcon, X } from 'lucide-react';

export default function Header({ onOpenBooking, isAudioPlaying, onToggleAudio }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [milanTime, setMilanTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      const timeStr = new Intl.DateTimeFormat('fr-FR', options).format(now);
      setMilanTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'La Filosofia', href: '#filosofia' },
    { label: 'I Percorsi', href: '#percorsi' },
    { label: 'La Cantina', href: '#cantina' },
    { label: 'L\'Atelier', href: '#spazi' },
    { label: 'Riconoscimenti', href: '#riconoscimenti' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-nero/95 backdrop-blur-md py-4 border-b border-or-subtle shadow-2xl'
            : 'bg-gradient-to-b from-nero/80 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex flex-col group text-left">
            <span className="font-serif-luxury text-2xl md:text-3xl tracking-[0.25em] text-ivoire uppercase font-light transition-colors group-hover:text-or">
              LUCENTE
            </span>
            <span className="typo-eyebrow text-[8px] text-or/80 -mt-0.5">
              Alta Cucina Contemporanea
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="typo-navigation relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-or hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="hidden sm:flex items-center space-x-5">
            {/* Live Milan Time */}
            <div className="hidden xl:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-surface border border-white/5 typo-metadata text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-or animate-ping" />
              <span>Milano</span>
              <span className="text-ivoire font-medium">{milanTime || '20:00'}</span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={onToggleAudio}
              className="p-2.5 rounded-full bg-surface border border-or-subtle text-or hover:bg-surface-elevated transition-all group"
              title={isAudioPlaying ? "Désactiver l'ambiance sonore feutrée" : "Activer l'expérience sonore gastronomique"}
            >
              {isAudioPlaying ? (
                <Volume2 className="w-4 h-4 text-or" />
              ) : (
                <VolumeX className="w-4 h-4 text-muted group-hover:text-ivoire" />
              )}
            </button>

            {/* Reservation CTA Button */}
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-2.5 rounded-none border border-or/60 bg-or-subtle hover:bg-or text-ivoire hover:text-nero transition-all duration-300 typo-cta shadow-md hover:shadow-or/15"
            >
              <span className="flex items-center space-x-2">
                <Calendar className="w-3.5 h-3.5" />
                <span>Prenota un Tavolo</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center space-x-3">
            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 border border-or/40 text-or text-[10px] uppercase tracking-widest"
            >
              Prenota
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ivoire"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-nero/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 sm:hidden">
          <div className="space-y-6">
            <p className="typo-eyebrow">Navigazione</p>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-serif-luxury text-2xl text-ivoire hover:text-or transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between typo-metadata">
              <span>Heure locale Milano</span>
              <span className="text-ivoire">{milanTime}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-or text-nero typo-cta"
            >
              Prenota un Tavolo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
