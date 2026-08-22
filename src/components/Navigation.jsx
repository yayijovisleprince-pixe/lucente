import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VolumeX, Calendar, SkipForward, Menu, X } from 'lucide-react';
import { audioTracks } from './AudioPlayer';
import { restaurantInfo } from '../data/restaurantData';

export default function Navigation({ 
  onOpenBooking, 
  isAudioPlaying, 
  onToggleAudio,
  currentTrackIndex = 0,
  onNextTrack
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('/images/hero-dish.webp');
  const [milanTime, setMilanTime] = useState('');
  const location = useLocation();

  const activeTrack = audioTracks[currentTrackIndex] || audioTracks[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'HISTOIRE', path: '/story', image: '/images/chef-craft.webp', sub: "L'Héritage & Le Chef" },
    { label: 'CUISINE', path: '/cuisine', image: '/images/hero-dish.webp', sub: 'Manifeste & Matière' },
    { label: 'MENU', path: '/menu', image: '/images/pasta-caviar.webp', sub: 'Les 3 Percorsi Gastronomiques' },
    { label: 'ESPACES PRIVÉS', path: '/private-dining', image: '/images/dining-room.webp', sub: 'Salons & Table du Chef' },
    { label: 'GALERIE', path: '/gallery', image: '/images/table-ambiance.webp', sub: 'Anthologie Visuelle' },
    { label: 'JOURNAL', path: '/journal', image: '/images/dining-room.webp', sub: 'Chroniques Culinaires' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-nero/95 backdrop-blur-md py-3.5 border-b border-or-subtle shadow-2xl shadow-black/80'
            : 'bg-gradient-to-b from-nero/90 via-nero/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo LUCENTE — Épuré, sobre et compact */}
          <Link to="/" data-cursor="LUCENTE" className="flex items-center group text-left shrink-0 py-1">
            <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.24em] text-ivoire uppercase font-light transition-colors group-hover:text-or">
              LUCENTE
            </span>
          </Link>

          {/* Desktop Navigation Links (Visible uniquement sur Desktop >= 1024px) */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center space-x-5 xl:space-x-7 mr-2 xl:mr-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`typo-navigation text-[11px] xl:text-xs tracking-[0.16em] xl:tracking-[0.18em] transition-all duration-300 relative py-1 ${
                    isActive ? 'text-or' : 'text-ivoire/80 hover:text-or'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-or" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Bar (Visible uniquement sur Desktop >= 1024px) */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4 shrink-0">
            
            {/* Live Milan Clock */}
            <div className="flex items-center space-x-2 typo-metadata text-[10px] text-muted border-r border-white/10 pr-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-or animate-ping" />
              <span>Milano</span>
              <span className="text-ivoire font-medium font-mono">{milanTime || '20:00'}</span>
            </div>

            {/* Audio Toggle & 6-Track Selector */}
            <div className="flex items-center bg-surface border border-or-subtle rounded-full p-1 gap-1">
              <button
                onClick={onToggleAudio}
                data-cursor="SOUND"
                aria-label={isAudioPlaying ? "Couper la musique" : "Activer la musique"}
                className={`h-7 px-2.5 flex items-center justify-center gap-1.5 rounded-full transition-all text-[10px] font-mono uppercase tracking-wider ${
                  isAudioPlaying
                    ? 'bg-or text-nero font-bold shadow-md'
                    : 'text-muted hover:text-ivoire'
                }`}
                title={isAudioPlaying ? "Couper la musique" : "Activer la musique"}
              >
                {isAudioPlaying ? (
                  <>
                    <div className="flex items-center gap-0.5 h-2.5">
                      <span className="w-[2px] bg-nero rounded-full animate-eq-1" />
                      <span className="w-[2px] bg-nero rounded-full animate-eq-2" />
                      <span className="w-[2px] bg-nero rounded-full animate-eq-3" />
                    </div>
                    <span className="max-w-[85px] xl:max-w-[110px] truncate">{activeTrack.genre} ({currentTrackIndex + 1}/6)</span>
                  </>
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-muted" />
                )}
              </button>

              {/* Bouton Suivant pour zapper entre les 6 morceaux */}
              {isAudioPlaying && onNextTrack && (
                <button
                  onClick={onNextTrack}
                  aria-label="Morceau suivant"
                  title={`Changer de morceau (${currentTrackIndex + 1}/6) : ${activeTrack.title}`}
                  className="w-6 h-6 rounded-full flex items-center justify-center text-or hover:text-ivoire hover:bg-white/10 transition-colors"
                >
                  <SkipForward size={11} />
                </button>
              )}
            </div>

            {/* CTA RÉSERVER — Bouton d'or plein et prestigieux */}
            <button
              onClick={() => onOpenBooking()}
              data-cursor="RESERVE"
              aria-label="Réserver une table à LUCENTE"
              className="px-5 py-2 bg-or hover:bg-ivoire text-nero font-semibold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-md shadow-or/20 hover:shadow-or/40 border border-or shrink-0 flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>RÉSERVER</span>
            </button>
          </div>

          {/* Mobile & Tablet Controls (Visible uniquement sur Écrans < 1024px) */}
          <div className="flex lg:hidden items-center space-x-2 sm:space-x-3">
            
            {/* Audio Toggle Compact sur Mobile/Tablette */}
            <button
              onClick={onToggleAudio}
              aria-label={isAudioPlaying ? "Couper la musique" : "Activer la musique"}
              className={`p-2 h-9 w-9 rounded-full border flex items-center justify-center transition-all ${
                isAudioPlaying 
                  ? 'bg-or text-nero border-or shadow-md' 
                  : 'bg-surface border-white/15 text-muted hover:text-ivoire'
              }`}
              title={isAudioPlaying ? `Musique active : ${activeTrack.title}` : "Activer la musique"}
            >
              {isAudioPlaying ? (
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-[2px] bg-nero rounded-full animate-eq-1" />
                  <span className="w-[2px] bg-nero rounded-full animate-eq-2" />
                  <span className="w-[2px] bg-nero rounded-full animate-eq-3" />
                </div>
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* UNIQUE Bouton RÉSERVER sur Mobile/Tablette */}
            <button
              onClick={() => onOpenBooking()}
              aria-label="Réserver une table à LUCENTE"
              className="px-3.5 sm:px-4 py-2 bg-or text-nero font-bold text-[11px] sm:text-xs uppercase tracking-wider border border-or shadow-md shrink-0 flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>RÉSERVER</span>
            </button>

            {/* Menu Hamburger Visible, Net & Accessible sur Mobile & Tablette */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 w-10 h-10 flex items-center justify-center rounded bg-surface border border-white/15 text-ivoire hover:text-or hover:border-or/50 transition-all focus:outline-none shrink-0"
              aria-label={mobileMenuOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-overlay"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-or" />
              ) : (
                <Menu className="w-5 h-5 text-ivoire" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* IMMERSIVE LUXURY FULL-SCREEN MOBILE & DESKTOP OVERLAY MENU */}
      {mobileMenuOpen && (
        <div id="mobile-menu-overlay" className="fixed inset-0 z-50 bg-nero flex flex-col lg:grid lg:grid-cols-12 overflow-hidden animate-pageEnter">
          
          {/* Top Close Bar */}
          <div className="absolute top-6 left-6 right-6 z-50 flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="font-serif-luxury text-2xl tracking-[0.25em] text-ivoire uppercase">
              LUCENTE
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Fermer le menu"
              className="flex items-center space-x-2 px-4 py-2 bg-surface border border-white/10 rounded-full text-ivoire hover:text-or hover:border-or text-xs uppercase tracking-widest transition-colors"
            >
              <span>Fermer</span>
              <X size={14} className="text-or" />
            </button>
          </div>

          {/* Left Column: Atmospheric Preview */}
          <div className="hidden lg:block lg:col-span-5 relative h-full bg-surface border-r border-white/5 overflow-hidden">
            <img
              src={hoveredImage}
              alt="Aperçu LUCENTE"
              className="w-full h-full object-cover filter brightness-75 transition-all duration-700 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-12 left-12 right-12 space-y-2">
              <p className="typo-eyebrow text-or text-[9px]">Milano · Via Monte Napoleone, 14</p>
              <p className="font-serif-luxury text-2xl text-ivoire italic">« Il ne s'agit pas d'un repas. Il s'agit d'une soirée. »</p>
              <p className="typo-metadata text-muted">28 Couverts Exclusifs</p>
            </div>
          </div>

          {/* Right Column: Menu Navigation Links */}
          <div className="flex-1 lg:col-span-7 flex flex-col justify-between p-6 sm:p-14 lg:p-20 pt-24 sm:pt-32 overflow-y-auto">
            
            <div className="space-y-6 sm:space-y-8">
              <p className="typo-eyebrow text-or">Navigation</p>
              
              {/* Primary Links with Staggered Hover Effect */}
              <nav aria-label="Menu plein écran" className="flex flex-col space-y-3 sm:space-y-5">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    onMouseEnter={() => setHoveredImage(link.image)}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-baseline justify-between border-b border-white/5 pb-3 transition-all"
                  >
                    <div className="flex items-baseline space-x-4">
                      <span className="font-mono text-xs text-or/60 group-hover:text-or transition-colors">
                        0{idx + 1}.
                      </span>
                      <span className="font-serif-luxury text-2xl sm:text-4xl text-ivoire group-hover:text-or group-hover:translate-x-2 transition-all duration-300">
                        {link.label}
                      </span>
                    </div>
                    <span className="hidden sm:inline-block typo-caption text-[11px] text-muted group-hover:text-ivoire transition-colors">
                      {link.sub}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Secondary Links Grid */}
              <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 border-t border-white/10">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="typo-navigation text-muted hover:text-or transition-colors">
                  CONTACT
                </Link>
                <Link to="/careers" onClick={() => setMobileMenuOpen(false)} className="typo-navigation text-muted hover:text-or transition-colors">
                  CARRIÈRES
                </Link>
                <Link to="/legal" onClick={() => setMobileMenuOpen(false)} className="typo-navigation text-muted hover:text-or transition-colors">
                  CONFIDENTIALITÉ
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 sm:pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-1">
                <p className="typo-metadata text-muted">Réservations & Conciergerie</p>
                <p className="font-serif-luxury text-lg text-ivoire font-mono">{restaurantInfo?.phone || '+39 02 8905 4321'}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-or text-nero font-semibold typo-cta hover:bg-ivoire transition-colors shadow-xl"
              >
                RÉSERVER UNE TABLE
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
