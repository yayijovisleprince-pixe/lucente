import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { VolumeX, Calendar, SkipForward, Menu, X, Globe, ShoppingBag } from 'lucide-react';
import { audioTracks } from './AudioPlayer';
import { restaurantInfo } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';
import { getOrderCount } from '../utils/orderHistory';

export default function Navigation({ 
  onOpenBooking, 
  onOpenOrders,
  isAudioPlaying, 
  onToggleAudio,
  currentTrackIndex = 0,
  onNextTrack
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredImage, setHoveredImage] = useState('/images/hero-dish.webp');
  const [milanTime, setMilanTime] = useState('');
  const [orderCount, setOrderCount] = useState(0);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const activeTrack = audioTracks[currentTrackIndex] || audioTracks[0];

  useEffect(() => {
    setOrderCount(getOrderCount());
    const handleUpdate = () => setOrderCount(getOrderCount());
    window.addEventListener('lucente:orders-updated', handleUpdate);
    return () => window.removeEventListener('lucente:orders-updated', handleUpdate);
  }, []);

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
    { labelKey: 'nav.menu',          path: '/menu',          image: '/images/pasta-caviar.webp',  sub: t('menu.eyebrow') },
    { labelKey: 'nav.cuisine',       path: '/cuisine',       image: '/images/hero-dish.webp',     sub: lang === 'it' ? 'Manifesto & Materia' : lang === 'en' ? 'Manifesto & Matter' : 'Manifeste & Matière' },
    { labelKey: 'nav.privateDining', path: '/private-dining',image: '/images/dining-room.webp',   sub: lang === 'it' ? "Sale & Chef's Table" : lang === 'en' ? "Rooms & Chef's Table" : "Salons & Chef's Table" },
    { labelKey: 'nav.story',         path: '/story',         image: '/images/chef-craft.webp',    sub: lang === 'it' ? "L'Origine & Lo Chef" : lang === 'en' ? "The Origin & The Chef" : "L'Origine & Le Chef" },
    { labelKey: 'nav.gallery',       path: '/gallery',       image: '/images/table-ambiance.webp',sub: lang === 'it' ? 'Antologia Visiva' : lang === 'en' ? 'Visual Anthology' : 'Anthologie Visuelle' },
    { labelKey: 'nav.journal',       path: '/journal',       image: '/images/dining-room.webp',   sub: lang === 'it' ? 'Cronache Culinarie' : lang === 'en' ? 'Culinary Chronicles' : 'Chroniques Culinaires' },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo LUCENTE — Épuré, sobre et compact */}
          <Link to="/" data-cursor="LUCENTE" className="flex items-center group text-left shrink-0 py-1">
            <span className="font-serif-luxury text-base sm:text-lg lg:text-xl tracking-[0.22em] text-ivoire uppercase font-light transition-colors group-hover:text-or">
              LUCENTE
            </span>
          </Link>

          {/* Desktop Navigation Links (Visible uniquement sur Desktop >= 1024px) */}
          <nav aria-label="Navigation principale" className="hidden lg:flex items-center space-x-3.5 xl:space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.labelKey}
                  to={link.path}
                  className={`typo-navigation text-[11px] xl:text-xs tracking-[0.14em] xl:tracking-[0.18em] transition-all duration-300 relative py-1 ${
                    isActive ? 'text-or' : 'text-ivoire/80 hover:text-or'
                  }`}
                >
                  {t(link.labelKey)}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-or" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Bar (Visible uniquement sur Desktop >= 1024px) */}
          <div className="hidden lg:flex items-center space-x-2.5 xl:space-x-3.5 shrink-0">
            
            {/* Live Milan Clock */}
            <div className="hidden xl:flex items-center space-x-2 typo-metadata text-[10px] text-muted border-r border-white/10 pr-3">
              <span className="w-1.5 h-1.5 rounded-full bg-or animate-ping" />
              <span>Milano</span>
              <span className="text-ivoire font-medium font-mono">{milanTime || '20:00'}</span>
            </div>

            {/* Language Switcher Desktop (FR / IT / EN) */}
            <div className="flex items-center gap-0.5 bg-surface border border-white/10 rounded-full p-0.5 shrink-0">
              <button
                onClick={() => setLang('fr')}
                data-cursor="FR"
                aria-label="Français"
                className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full transition-all ${
                  lang === 'fr' ? 'bg-or text-nero font-bold' : 'text-muted hover:text-ivoire'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLang('it')}
                data-cursor="IT"
                aria-label="Italiano"
                className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full transition-all ${
                  lang === 'it' ? 'bg-or text-nero font-bold' : 'text-muted hover:text-ivoire'
                }`}
              >
                IT
              </button>
              <button
                onClick={() => setLang('en')}
                data-cursor="EN"
                aria-label="English"
                className={`px-2 py-1 text-[10px] font-mono uppercase tracking-wider rounded-full transition-all ${
                  lang === 'en' ? 'bg-or text-nero font-bold' : 'text-muted hover:text-ivoire'
                }`}
              >
                EN
              </button>
            </div>

            {/* Audio Toggle & 6-Track Selector */}
            <div className="flex items-center bg-surface border border-or-subtle rounded-full p-1 gap-1 shrink-0">
              <button
                onClick={onToggleAudio}
                data-cursor={isAudioPlaying ? (lang === 'it' ? 'MUTE' : lang === 'en' ? 'MUTE' : 'COUPE') : (lang === 'it' ? 'AUDIO' : lang === 'en' ? 'SOUND' : 'SON')}
                aria-label={isAudioPlaying ? (lang === 'it' ? 'Disattiva musica' : lang === 'en' ? 'Mute music' : 'Couper la musique') : (lang === 'it' ? 'Attiva musica' : lang === 'en' ? 'Enable music' : 'Activer la musique')}
                className={`h-7 px-2.5 flex items-center justify-center gap-1.5 rounded-full transition-all text-[10px] font-mono uppercase tracking-wider ${
                  isAudioPlaying
                    ? 'bg-or text-nero font-bold shadow-md'
                    : 'text-muted hover:text-ivoire'
                }`}
                title={isAudioPlaying ? (lang === 'it' ? 'Disattiva musica' : lang === 'en' ? 'Mute music' : 'Couper la musique') : (lang === 'it' ? 'Attiva musica' : lang === 'en' ? 'Enable music' : 'Activer la musique')}
              >
                {isAudioPlaying ? (
                  <>
                    <div className="flex items-center gap-0.5 h-2.5">
                      <span className="w-[2px] bg-nero rounded-full animate-eq-1" />
                      <span className="w-[2px] bg-nero rounded-full animate-eq-2" />
                      <span className="w-[2px] bg-nero rounded-full animate-eq-3" />
                    </div>
                    <span className="max-w-[75px] truncate block text-[10px]">{activeTrack.genre}</span>
                  </>
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-muted" />
                )}
              </button>

              {/* Bouton Suivant pour zapper entre les 6 morceaux */}
              {isAudioPlaying && onNextTrack && (
                <button
                  onClick={onNextTrack}
                  aria-label={lang === 'it' ? 'Brano successivo' : lang === 'en' ? 'Next track' : 'Morceau suivant'}
                  title={`${lang === 'it' ? 'Cambia brano' : lang === 'en' ? 'Change track' : 'Changer de morceau'} (${currentTrackIndex + 1}/6) : ${activeTrack.title}`}
                  className="w-5 h-5 rounded-full flex items-center justify-center text-or hover:text-ivoire hover:bg-white/10 transition-colors shrink-0"
                >
                  <SkipForward size={10} />
                </button>
              )}
            </div>

            {/* Orders History Quick Access Desktop */}
            <button
              onClick={onOpenOrders}
              data-cursor={lang === 'it' ? 'ORDINI' : lang === 'en' ? 'ORDERS' : 'COMMANDES'}
              aria-label={lang === 'it' ? 'I Miei Ordini' : lang === 'en' ? 'My Orders' : 'Mes Commandes'}
              className="relative flex items-center gap-1.5 px-3 py-2 bg-surface hover:bg-surface-elevated border border-white/15 hover:border-or/60 text-ivoire hover:text-or text-[11px] xl:text-xs font-mono uppercase tracking-wider transition-all"
              title={lang === 'it' ? 'I Miei Ordini' : lang === 'en' ? 'My Orders' : 'Mes Commandes'}
            >
              <ShoppingBag size={13} className="text-or" />
              <span className="hidden xl:inline">{lang === 'it' ? 'Ordini' : lang === 'en' ? 'Orders' : 'Commandes'}</span>
              {orderCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-or text-nero font-bold text-[9px] flex items-center justify-center -mr-1">
                  {orderCount}
                </span>
              )}
            </button>

            {/* CTA RESERVE — Premium gold button */}
            <button
              onClick={() => onOpenBooking()}
              data-cursor={lang === 'it' ? 'PRENOTA' : lang === 'en' ? 'RESERVE' : 'RÉSERVER'}
              aria-label={t('nav.reserve')}
              className="shrink-0 px-4 xl:px-5 py-2 bg-or hover:bg-or-light text-nero hover:text-nero font-semibold text-[11px] xl:text-xs uppercase tracking-[0.16em] xl:tracking-[0.18em] transition-all duration-300 shadow-md shadow-or/20 hover:shadow-or/40 border border-or flex items-center gap-1.5 xl:gap-2 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>{t('nav.reserve')}</span>
            </button>
          </div>

          {/* Mobile & Tablet Controls (Visible sur Écrans < 1024px) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2.5">
            
            {/* Quick Orders Button on Mobile Header */}
            <button
              onClick={onOpenOrders}
              aria-label={lang === 'it' ? 'I Miei Ordini' : lang === 'en' ? 'My Orders' : 'Mes Commandes'}
              title={lang === 'it' ? 'I Miei Ordini' : lang === 'en' ? 'My Orders' : 'Mes Commandes'}
              className="relative p-2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-surface border border-white/15 text-ivoire hover:text-or hover:border-or/50 transition-all shrink-0"
            >
              <ShoppingBag size={14} className="text-or" />
              {orderCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-or text-nero font-bold text-[9px] flex items-center justify-center shadow-md">
                  {orderCount}
                </span>
              )}
            </button>

            {/* Bouton RESERVE sur Mobile/Tablette — Magnifiquement mis en valeur */}
            <button
              onClick={() => onOpenBooking()}
              aria-label={t('nav.reserve')}
              className="px-2.5 sm:px-4 py-2 bg-or hover:bg-or-light text-nero font-bold text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] border border-or shadow-lg shadow-or/20 hover:shadow-or/40 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Calendar size={13} className="shrink-0" />
              <span className="hidden xs:inline">{t('nav.reserve')}</span>
              <span className="xs:hidden">{lang === 'it' ? 'Prenota' : lang === 'en' ? 'Book' : 'Réserver'}</span>
            </button>

            {/* Menu Hamburger Accessible sur Mobile & Tablette */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-none bg-surface border border-white/15 text-ivoire hover:text-or hover:border-or/50 transition-all focus:outline-none shrink-0"
              aria-label={mobileMenuOpen ? (lang === 'it' ? 'Chiudi menu di navigazione' : lang === 'en' ? 'Close navigation menu' : 'Fermer le menu de navigation') : (lang === 'it' ? 'Apri menu di navigazione' : lang === 'en' ? 'Open navigation menu' : 'Ouvrir le menu de navigation')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-overlay"
            >
              {mobileMenuOpen ? (
                <X className="w-4 h-4 text-or" />
              ) : (
                <Menu className="w-4 h-4 text-ivoire" />
              )}
            </button>
          </div>

        </div>
      </header>

      {/* IMMERSIVE LUXURY FULL-SCREEN MOBILE & DESKTOP OVERLAY MENU */}
      {mobileMenuOpen && (
        <div id="mobile-menu-overlay" className="fixed inset-0 z-50 bg-nero flex flex-col lg:grid lg:grid-cols-12 overflow-hidden animate-pageEnter">
          
          {/* Top Close Bar with Safe Area */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-50 flex items-center justify-between">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="font-serif-luxury text-xl sm:text-2xl tracking-[0.2em] text-ivoire uppercase">
              LUCENTE
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label={lang === 'it' ? 'Chiudi il menu' : lang === 'en' ? 'Close menu' : 'Fermer le menu'}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-surface border border-white/10 rounded-full text-ivoire hover:text-or hover:border-or text-[11px] sm:text-xs uppercase tracking-widest transition-colors"
            >
              <span>{lang === 'it' ? 'Chiudi' : lang === 'en' ? 'Close' : 'Fermer'}</span>
              <X size={13} className="text-or" />
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
              <p className="font-serif-luxury text-2xl text-ivoire italic">
                {lang === 'it'
                  ? '« Non si tratta di una cena. Si tratta di una serata. »'
                  : lang === 'en'
                  ? '« It is not merely dinner. It is an evening. »'
                  : "« Il ne s'agit pas d'un repas. Il s'agit d'une soirée. »"}
              </p>
              <p className="typo-metadata text-muted">
                {lang === 'it' ? '28 Coperti Esclusivi' : lang === 'en' ? '28 Exclusive Covers' : '28 Couverts Exclusifs'}
              </p>
            </div>
          </div>

          {/* Right Column: Menu Navigation Links & Controls */}
          <div className="flex-1 lg:col-span-7 flex flex-col justify-between p-6 sm:p-14 lg:p-20 pt-20 sm:pt-28 pb-12 overflow-y-auto">
            
            <div className="space-y-6 sm:space-y-8">
              
              {/* Dedicated Luxury Status Bar: Milan Clock + Language Selector */}
              <div className="p-3 bg-surface/90 border border-white/10 flex items-center justify-between gap-3 shadow-lg">
                {/* Live Milan Clock with Glowing Gold Ping */}
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-or opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-or"></span>
                  </span>
                  <span className="text-ivoire font-medium font-mono text-[11px] tracking-wider">
                    Milano · {milanTime || '20:00'}
                  </span>
                </div>

                {/* Prominent Language Switcher */}
                <div className="flex items-center gap-1 bg-nero border border-white/10 rounded-full p-1 shadow-inner">
                  <button
                    onClick={() => setLang('fr')}
                    aria-label="Français"
                    className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all ${
                      lang === 'fr' ? 'bg-or text-nero shadow-sm' : 'text-muted hover:text-ivoire'
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLang('it')}
                    aria-label="Italiano"
                    className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all ${
                      lang === 'it' ? 'bg-or text-nero shadow-sm' : 'text-muted hover:text-ivoire'
                    }`}
                  >
                    IT
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    aria-label="English"
                    className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all ${
                      lang === 'en' ? 'bg-or text-nero shadow-sm' : 'text-muted hover:text-ivoire'
                    }`}
                  >
                    EN
                  </button>
                </div>
              </div>

              {/* Navigation Header Title */}
              <div className="pb-2 border-b border-white/5 flex items-center justify-between">
                <p className="typo-eyebrow text-or text-xs">{t('nav.navigation')}</p>
                <span className="text-[10px] font-mono text-muted tracking-widest uppercase">
                  Anthologie Milano
                </span>
              </div>
              
              {/* Primary Links with Staggered Hover Effect */}
              <nav aria-label="Menu plein écran" className="flex flex-col space-y-3 sm:space-y-5">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.labelKey}
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
                        {t(link.labelKey)}
                      </span>
                    </div>
                    <span className="hidden sm:inline-block typo-caption text-[11px] text-muted group-hover:text-ivoire transition-colors">
                      {link.sub}
                    </span>
                  </Link>
                ))}

                {/* Quick Access to Orders & Reservations */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenOrders) onOpenOrders();
                    }}
                    className="w-full flex items-center justify-between p-3.5 bg-surface-elevated border border-or/40 hover:border-or text-ivoire hover:text-or transition-all text-xs font-mono uppercase tracking-wider"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag size={15} className="text-or" />
                      <span>{lang === 'it' ? 'I Miei Ordini & Prenotazioni' : lang === 'en' ? 'My Orders & Reservations' : 'Mes Commandes & Réservations'}</span>
                    </span>
                    {orderCount > 0 ? (
                      <span className="px-2 py-0.5 bg-or text-nero font-bold text-[10px]">
                        {orderCount} {lang === 'it' ? 'attivo' : lang === 'en' ? 'active' : 'actif'}
                      </span>
                    ) : (
                      <span className="text-muted text-[10px] lowercase font-sans">0 enregistrée</span>
                    )}
                  </button>
                </div>
              </nav>

              {/* Dedicated Mobile & Desktop Audio Player Widget in Unfolded Menu */}
              <div className="p-3.5 sm:p-4 bg-surface border border-or/30 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                    isAudioPlaying ? 'bg-or text-nero border-or' : 'bg-nero border-white/10 text-muted'
                  }`}>
                    {isAudioPlaying ? (
                      <div className="flex items-center gap-0.5 h-2.5">
                        <span className="w-[2px] bg-nero rounded-full animate-eq-1" />
                        <span className="w-[2px] bg-nero rounded-full animate-eq-2" />
                        <span className="w-[2px] bg-nero rounded-full animate-eq-3" />
                      </div>
                    ) : (
                      <VolumeX className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase font-mono text-or tracking-wider truncate">
                      {lang === 'it' ? 'Atmosfera Sonora' : lang === 'en' ? 'Soundtrack' : 'Ambiance Sonore'} ({currentTrackIndex + 1}/{audioTracks.length})
                    </p>
                    <p className="font-serif text-sm text-ivoire truncate">
                      {activeTrack.title} <span className="text-muted text-xs italic font-sans">({activeTrack.genre})</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={onToggleAudio}
                    className={`px-3 py-1.5 text-[10px] sm:text-[11px] uppercase font-bold font-mono tracking-wider transition-all ${
                      isAudioPlaying 
                        ? 'bg-or text-nero shadow' 
                        : 'bg-surface-elevated text-ivoire border border-white/10 hover:border-or/40'
                    }`}
                  >
                    {isAudioPlaying ? t('nav.pause') : t('nav.listenAmbiance')}
                  </button>
                  {onNextTrack && (
                    <button
                      onClick={onNextTrack}
                      aria-label={lang === 'it' ? 'Brano successivo' : lang === 'en' ? 'Next track' : 'Morceau suivant'}
                      className="p-1.5 sm:p-2 bg-surface-elevated hover:bg-white/10 text-or hover:text-ivoire border border-white/10 transition-colors flex items-center justify-center"
                      title={lang === 'it' ? 'Cambia brano' : lang === 'en' ? 'Change track' : 'Changer de morceau'}
                    >
                      <SkipForward size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Centered Secondary Links with Perfect Visual Symmetry */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-3 text-center">
                <Link 
                  to="/contact" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="typo-navigation text-xs text-muted hover:text-or transition-colors tracking-widest py-1 px-1.5"
                >
                  {lang === 'it' ? 'CONTATTI' : lang === 'en' ? 'CONTACT' : 'CONTACT'}
                </Link>
                <span className="text-white/20 hidden sm:inline">✦</span>
                <Link 
                  to="/careers" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="typo-navigation text-xs text-muted hover:text-or transition-colors tracking-widest py-1 px-1.5"
                >
                  {lang === 'it' ? 'CARRIERE' : lang === 'en' ? 'CAREERS' : 'CARRIÈRES'}
                </Link>
                <span className="text-white/20 hidden sm:inline">✦</span>
                <Link 
                  to="/legal#rgpd" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="typo-navigation text-xs text-muted hover:text-or transition-colors tracking-widest py-1 px-1.5"
                >
                  {lang === 'it' ? 'PRIVACY (GDPR)' : lang === 'en' ? 'PRIVACY POLICY' : 'CONFIDENTIALITÉ'}
                </Link>
                <span className="text-white/20 hidden sm:inline">✦</span>
                <Link 
                  to="/legal" 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="typo-navigation text-xs text-muted hover:text-or transition-colors tracking-widest py-1 px-1.5"
                >
                  {lang === 'it' ? 'NOTE LEGALI' : lang === 'en' ? 'LEGAL NOTICE' : 'MENTIONS LÉGALES'}
                </Link>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-8 sm:pt-10 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-1 text-center sm:text-left">
                <p className="typo-metadata text-muted">{t('nav.reservationsLabel')}</p>
                <p className="font-serif-luxury text-lg text-ivoire font-mono">{restaurantInfo?.phone || '+39 02 8905 4321'}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-or text-nero font-bold typo-cta hover:bg-ivoire transition-colors shadow-xl text-center"
              >
                {t('nav.reserveTable')}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
