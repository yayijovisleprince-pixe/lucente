import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Send, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer({ onOpenBooking }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const { lang, t } = useLanguage();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setEmailSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0A0A09] text-muted pt-24 pb-32 sm:pb-36 lg:pb-16 border-t border-white/10 relative overflow-hidden">
      
      {/* Subtle Background Watermark */}
      <div className="absolute right-8 -bottom-10 text-[180px] md:text-[240px] font-serif-luxury font-light text-white/[0.015] pointer-events-none select-none tracking-[0.2em]">
        LUCENTE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-12 sm:space-y-16 lg:space-y-20">
        
        {/* Top Newsletter & Private Circle Invitation */}
        <div className="bg-surface border border-or-subtle rounded-none p-5 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center shadow-2xl">
          <div className="lg:col-span-6 space-y-2">
            <p className="typo-eyebrow text-or text-[10px] sm:text-[11px]">{t('footer.newsletterEyebrow')}</p>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-ivoire leading-tight">
              {t('footer.newsletterTitle')}
            </h3>
            <p className="typo-body text-xs sm:text-sm text-muted max-w-lg leading-relaxed">
              {t('footer.newsletterText')}
            </p>
          </div>

          <div className="lg:col-span-6">
            {emailSubscribed ? (
              <div className="p-4 bg-surface-elevated border border-or/40 rounded-none text-center text-xs sm:text-sm text-or font-medium flex items-center justify-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-or flex-shrink-0" />
                <span>{t('footer.newsletterSuccess')}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 w-full">
                  <input
                    type="email"
                    required
                    aria-label={t('footer.newsletterPlaceholder')}
                    placeholder={t('footer.newsletterPlaceholder')}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-[#121210] border border-white/20 focus:border-or text-ivoire placeholder:text-muted/60 px-3.5 sm:px-4 py-3 sm:py-3.5 text-xs sm:text-sm outline-none transition-colors rounded-none w-full"
                  />
                  <button
                    type="submit"
                    aria-label={t('footer.newsletterBtn')}
                    style={{ backgroundColor: '#B89B5E', color: '#10100E' }}
                    className="w-full sm:w-auto px-6 py-3 sm:py-3.5 hover:!bg-[#F2EBDD] font-extrabold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0 shadow-xl cursor-pointer touch-manipulation group"
                  >
                    <span className="font-sans font-black text-[#10100E] tracking-widest text-xs">{t('footer.newsletterBtn')}</span>
                    <Send className="w-3.5 h-3.5 text-[#10100E] stroke-[2.5] group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                </div>
                <p className="text-[10px] text-muted/70">
                  {t('footer.newsletterPrivacy')}
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Monumental Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 text-xs">
          
          {/* Col 1: Identity & Locations (5 cols) */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-4 sm:space-y-6">
            <span className="font-serif-luxury text-2xl sm:text-3xl tracking-[0.22em] text-ivoire uppercase block font-light">
              LUCENTE
            </span>
            <p className="typo-eyebrow text-[9px] text-or">Alta Cucina Contemporanea</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-1">
              <div className="space-y-1">
                <p className="text-ivoire font-serif-luxury text-base sm:text-lg">MILANO</p>
                <p className="typo-body text-xs">Via Monte Napoleone 14, 20121 Milano, Italia</p>
              </div>
              <div className="space-y-1">
                <p className="text-ivoire font-serif-luxury text-base sm:text-lg">PARIS</p>
                <p className="typo-body text-xs">
                  Avenue Montaigne, 75008 Paris ({lang === 'it' ? 'Apertura 2027' : lang === 'en' ? 'Opening 2027' : 'Ouverture 2027'})
                </p>
              </div>
            </div>

            <p className="typo-caption text-[11px] text-muted max-w-sm pt-1">
              {lang === 'it'
                ? 'Via Monte Napoleone, 14 · 20121 Milano. 28 coperti. Aperto da martedì a sabato.'
                : lang === 'en'
                ? 'Via Monte Napoleone, 14 · 20121 Milano. 28 covers. Open Tuesday to Saturday.'
                : 'Via Monte Napoleone, 14 · 20121 Milano. 28 couverts. Ouvert du mardi au samedi.'}
            </p>
          </div>

          {/* Col 2: Navigation & Sections (3 cols) */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <p className="typo-eyebrow text-ivoire border-b border-white/10 pb-2">
              {t('footer.navTitle')}
            </p>
            <div className="flex flex-col space-y-2">
              <Link to="/menu" className="typo-navigation text-muted hover:text-or transition-colors py-0.5">{t('nav.menu')}</Link>
              <Link to="/cuisine" className="typo-navigation text-muted hover:text-or transition-colors py-0.5">{t('nav.cuisine')}</Link>
              <Link to="/private-dining" className="typo-navigation text-muted hover:text-or transition-colors py-0.5">{t('nav.privateDining')}</Link>
              <Link to="/story" className="typo-navigation text-muted hover:text-or transition-colors py-0.5">{t('nav.story')}</Link>
              <Link to="/gallery" className="typo-navigation text-muted hover:text-or transition-colors py-0.5">{t('nav.gallery')}</Link>
              <Link to="/journal" className="typo-navigation text-muted hover:text-or transition-colors py-0.5">{t('nav.journal')}</Link>
            </div>
          </div>

          {/* Col 3: Concierge & Reserve (4 cols) */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <p className="typo-eyebrow text-ivoire border-b border-white/10 pb-2">
              {t('footer.contactTitle')}
            </p>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-or flex-shrink-0" />
                <span className="text-ivoire font-mono">{restaurantInfo.phone}</span>
              </p>
              <p className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-or flex-shrink-0" />
                <span className="font-mono">{restaurantInfo.email}</span>
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow LUCENTE on Instagram"
                className="inline-flex items-center space-x-2 text-or hover:text-ivoire transition-colors pt-1 font-mono"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram @lucente.milano</span>
              </a>
            </div>

            <div className="pt-3">
              <button
                onClick={() => onOpenBooking()}
                aria-label={t('footer.reserveBtn')}
                className="w-full py-3.5 border border-or hover:bg-or hover:text-nero text-or typo-cta text-xs transition-all text-center shadow-lg"
              >
                {t('footer.reserveBtn')}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal, Privacy & Credits - Optimized for mobile tap & clearance */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4 sm:gap-6">
          <p className="text-center md:text-left text-[11px] tracking-wide text-muted/90">
            © 2026 LUCENTE S.r.l. Milano. {t('footer.copyright')}
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[11px] uppercase tracking-wider">
            <Link 
              to="/legal#rgpd" 
              className="text-muted hover:text-or transition-colors py-1 px-1 underline-offset-4 hover:underline"
            >
              {t('legal.tabs.privacy')}
            </Link>
            <span className="text-white/20 hidden sm:inline">·</span>
            <Link 
              to="/legal" 
              className="text-muted hover:text-or transition-colors py-1 px-1 underline-offset-4 hover:underline"
            >
              {t('legal.tabs.legal')}
            </Link>
            <span className="text-white/20 hidden sm:inline">·</span>
            <Link 
              to="/contact" 
              className="text-muted hover:text-or transition-colors py-1 px-1 underline-offset-4 hover:underline"
            >
              {lang === 'it' ? 'Contatti' : lang === 'en' ? 'Contact' : 'Contact'}
            </Link>
            <span className="text-white/20 hidden sm:inline">·</span>
            <Link 
              to="/careers" 
              className="text-muted hover:text-or transition-colors py-1 px-1 underline-offset-4 hover:underline"
            >
              {lang === 'it' ? 'Carriere' : lang === 'en' ? 'Careers' : 'Carrières'}
            </Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
