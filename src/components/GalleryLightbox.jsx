import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Maximize2, Minimize2, 
  Play, Pause, Info, Camera, Compass, Tag, Layers
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function GalleryLightbox({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onIndexChange
}) {
  const { lang, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Touch Swipe State for Mobile
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);

  const containerRef = useRef(null);
  const filmstripRef = useRef(null);

  const totalItems = items.length;
  const currentItem = items[currentIndex] || items[0] || null;

  // Handlers for Navigation
  const handlePrev = useCallback(() => {
    if (totalItems <= 1) return;
    const prevIdx = (currentIndex - 1 + totalItems) % totalItems;
    onIndexChange(prevIdx);
    setIsZoomed(false);
  }, [currentIndex, totalItems, onIndexChange]);

  const handleNext = useCallback(() => {
    if (totalItems <= 1) return;
    const nextIdx = (currentIndex + 1) % totalItems;
    onIndexChange(nextIdx);
    setIsZoomed(false);
  }, [currentIndex, totalItems, onIndexChange]);

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation & Shortcuts listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Prevent scrolling default for navigation keys
      if (['ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          onClose();
          break;
        case ' ':
          setIsPlaying((prev) => !prev);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'h':
        case 'H':
        case 'i':
        case 'I':
          setShowInfo((prev) => !prev);
          break;
        case 'z':
        case 'Z':
          setIsZoomed((prev) => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  // Slideshow Auto-Play Effect
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isOpen, isPlaying, handleNext]);

  // Synchronize Active Thumbnail in Filmstrip
  useEffect(() => {
    if (!filmstripRef.current || !isOpen) return;
    const activeThumb = filmstripRef.current.children[currentIndex];
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [currentIndex, isOpen]);

  // Mobile Touch Gestures (Swipe)
  const handleTouchStart = (e) => {
    if (isZoomed) return;
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setTouchDeltaX(0);
    setIsSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!isSwiping || isZoomed) return;
    const deltaX = e.touches[0].clientX - touchStartX;
    const deltaY = e.touches[0].clientY - touchStartY;
    
    // Horizontal swipe dominance check
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setTouchDeltaX(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!isSwiping) return;
    const SWIPE_THRESHOLD = 50;
    if (touchDeltaX > SWIPE_THRESHOLD) {
      handlePrev();
    } else if (touchDeltaX < -SWIPE_THRESHOLD) {
      handleNext();
    }
    setIsSwiping(false);
    setTouchDeltaX(0);
  };

  // Prevent background body scroll when Lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setIsPlaying(false);
      setIsZoomed(false);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      ref={containerRef}
      id="gallery-lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-label={currentItem.title}
      className="fixed inset-0 z-[9999] flex flex-col bg-[#0A0A08]/98 backdrop-blur-2xl select-none animate-fadeIn transition-opacity duration-300"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* TOP MINIMALIST BAR: Brand, Index Counter, Minimalist Actions */}
      <header className="relative z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/5 bg-nero/70 backdrop-blur-md">
        
        {/* Left: Monogram & Act */}
        <div className="flex items-center gap-3">
          <span className="font-serif text-xs uppercase tracking-[0.25em] text-or font-medium hidden sm:inline">
            LUCENTE · MILANO
          </span>
          <span className="text-white/20 hidden sm:inline">/</span>
          <span className="text-xs uppercase font-mono tracking-widest text-muted">
            {currentItem.category}
          </span>
          {currentItem.act && (
            <span className="text-[11px] font-serif text-ivoire/60 italic hidden md:inline">
              — {currentItem.act}
            </span>
          )}
        </div>

        {/* Center: Exact Index Position */}
        <div className="text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-ivoire/90 bg-surface px-3 py-1 rounded-none border border-white/5">
            {String(currentIndex + 1).padStart(2, '0')} <span className="text-or/60">/</span> {String(totalItems).padStart(2, '0')}
          </span>
        </div>

        {/* Right: Controls (Play, Info, Fullscreen, Close) */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Diaporama Auto Play */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying 
              ? (lang === 'it' ? 'Pausa (Spazio)' : lang === 'en' ? 'Pause (Space)' : 'Pause Diaporama (Espace)')
              : (lang === 'it' ? 'Avvia Presentazione (Spazio)' : lang === 'en' ? 'Start Slideshow (Space)' : 'Lancer le Diaporama (Espace)')}
            className={`p-2 rounded-none border transition-all ${
              isPlaying 
                ? 'bg-or text-nero border-or' 
                : 'bg-surface text-muted border-white/10 hover:text-or hover:border-or/40'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>

          {/* Toggle Info Details */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            title={lang === 'it' ? "Dettagli dell'Opera (H)" : lang === 'en' ? 'Artwork Details (H)' : "Détails de l'Œuvre (H)"}
            className={`p-2 rounded-none border transition-all ${
              showInfo 
                ? 'bg-or/15 text-or border-or/40' 
                : 'bg-surface text-muted border-white/10 hover:text-or'
            }`}
          >
            <Info size={14} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title={lang === 'it' ? 'Schermo intero (F)' : lang === 'en' ? 'Fullscreen (F)' : 'Plein écran (F)'}
            className="p-2 rounded-none border border-white/10 bg-surface text-muted hover:text-or hover:border-or/30 transition-all hidden sm:flex"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>

          {/* Close Button */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            title={lang === 'it' ? 'Chiudi (Esc)' : lang === 'en' ? 'Close (Esc)' : 'Fermer (Échap)'}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-none border border-or/50 bg-surface hover:bg-or hover:text-nero text-or transition-all ml-2"
          >
            <X size={15} />
            <span className="text-xs uppercase font-semibold tracking-widest hidden sm:inline">
              {lang === 'it' ? 'Chiudi' : lang === 'en' ? 'Close' : 'Fermer'}
            </span>
          </button>
        </div>
      </header>

      {/* MAIN VIEWPORT: THE PHOTOGRAPH OCCUPIES ALMOST 100% OF THE SCREEN */}
      <main className="relative flex-1 flex items-center justify-center overflow-hidden p-1 sm:p-3 md:p-5">
        
        {/* Previous Button Chevron */}
        {totalItems > 1 && (
          <button
            id="lightbox-prev-btn"
            onClick={handlePrev}
            aria-label={lang === 'it' ? 'Fotografia precedente' : lang === 'en' ? 'Previous photograph' : 'Photographie précédente'}
            className="absolute left-2 sm:left-6 z-30 p-3 sm:p-4 rounded-full bg-nero/70 hover:bg-or hover:text-nero text-ivoire/90 border border-white/10 hover:border-or backdrop-blur-md transition-all duration-300 group shadow-2xl"
          >
            <ChevronLeft size={26} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}

        {/* Central Dominant Photo Area (occupies 96vw x 86vh viewport) */}
        <div 
          className={`relative max-w-[98vw] max-h-[88vh] flex items-center justify-center transition-all duration-500 ${
            isZoomed ? 'scale-125 cursor-zoom-out z-20' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
          style={{
            transform: isSwiping ? `translateX(${touchDeltaX}px)` : undefined,
            transition: isSwiping ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <img
            id="lightbox-main-img"
            key={currentItem.id}
            src={currentItem.src}
            alt={currentItem.alt || currentItem.title}
            className="max-w-[97vw] max-h-[86vh] w-auto h-auto object-contain rounded-none shadow-[0_25px_80px_rgba(0,0,0,0.9)] border border-white/5 animate-fadeIn"
            loading="eager"
          />

          {/* Minimalist Watermark / Monogram */}
          <div className="absolute top-4 left-4 pointer-events-none opacity-40 hover:opacity-100 transition-opacity">
            <span className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.3em] text-ivoire/70 bg-nero/60 px-2.5 py-0.5 rounded-none backdrop-blur-sm border border-white/10">
              LUCENTE · MILANO
            </span>
          </div>
        </div>

        {/* Next Button Chevron */}
        {totalItems > 1 && (
          <button
            id="lightbox-next-btn"
            onClick={handleNext}
            aria-label={lang === 'it' ? 'Fotografia successiva' : lang === 'en' ? 'Next photograph' : 'Photographie suivante'}
            className="absolute right-2 sm:right-6 z-30 p-3 sm:p-4 rounded-full bg-nero/70 hover:bg-or hover:text-nero text-ivoire/90 border border-white/10 hover:border-or backdrop-blur-md transition-all duration-300 group shadow-2xl"
          >
            <ChevronRight size={26} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </main>

      {/* BOTTOM SECTION: EDITORIAL DETAILS & FILMSTRIP */}
      <footer className="relative z-30 flex flex-col border-t border-white/5 bg-nero/90 backdrop-blur-xl transition-all duration-300">
        
        {/* Retractable Editorial Details Card */}
        {showInfo && (
          <div className="px-4 sm:px-8 py-3 border-b border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              
              {/* Left Details: Titles & Story */}
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-serif text-lg sm:text-xl text-ivoire font-normal tracking-wide">
                    {currentItem.title}
                  </h3>
                  {currentItem.italianTitle && (
                    <span className="text-xs text-or italic font-serif">
                      / {currentItem.italianTitle}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted leading-relaxed font-sans line-clamp-2 md:line-clamp-none">
                  {currentItem.editorialStory || currentItem.caption}
                </p>
              </div>

              {/* Right Details: Camera Notes & Location */}
              <div className="flex items-center gap-3 text-[11px] text-muted/80 shrink-0 self-end md:self-center">
                {currentItem.cameraNotes && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-surface border border-white/5">
                    <Camera size={12} className="text-or" />
                    <span className="tracking-wider">{currentItem.cameraNotes}</span>
                  </div>
                )}
                <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-none bg-surface border border-white/5">
                  <Compass size={12} className="text-or" />
                  <span className="tracking-wider">Milano, Via Monte Napoleone</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filmstrip Thumbnail Strip for Instant Navigation */}
        <div className="px-4 sm:px-8 py-2 bg-nero/95">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            
            <span className="text-[10px] uppercase tracking-widest text-muted/60 hidden sm:inline-block shrink-0 font-mono">
              {lang === 'it' ? 'Provini a Contatto' : lang === 'en' ? 'Contact Sheet' : 'Planche Contact'}
            </span>

            {/* Scrollable Thumbnails */}
            <div 
              ref={filmstripRef}
              className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-or/30 scrollbar-track-transparent flex-1"
            >
              {items.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id || idx}
                    onClick={() => {
                      onIndexChange(idx);
                      setIsZoomed(false);
                    }}
                    className={`relative shrink-0 w-12 sm:w-16 h-8 sm:h-10 rounded-none overflow-hidden border transition-all duration-300 group ${
                      isActive 
                        ? 'border-or ring-1 ring-or scale-105 opacity-100' 
                        : 'border-white/10 opacity-50 hover:opacity-90 hover:border-white/30'
                    }`}
                  >
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                    />
                    {isActive && (
                      <div className="absolute inset-0 bg-or/15 pointer-events-none" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Keyboard Shortcuts Helper Tag */}
            <div className="hidden lg:flex items-center gap-2 text-[10px] text-muted/50 uppercase tracking-widest shrink-0 font-mono">
              <span>{lang === 'it' ? '← → Naviga' : lang === 'en' ? '← → Navigate' : '← → Naviguer'}</span>
              <span>·</span>
              <span>{lang === 'it' ? 'Spazio Presentazione' : lang === 'en' ? 'Space Slideshow' : 'Espace Diaporama'}</span>
              <span>·</span>
              <span>H Infos</span>
              <span>·</span>
              <span>{lang === 'it' ? 'Esc Esci' : lang === 'en' ? 'Esc Exit' : 'Échap Quitter'}</span>
            </div>

          </div>
        </div>

      </footer>
    </div>
  );
}
