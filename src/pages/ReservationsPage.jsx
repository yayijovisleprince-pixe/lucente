import React from 'react';
import { ShieldCheck, Phone, Clock, Award, Sparkles, MapPin, Wine, Users } from 'lucide-react';
import ReservationFlow from '../components/ReservationFlow';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function ReservationsPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="pt-28 md:pt-36 pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title={lang === 'it' ? 'Prenotazioni Online | LUCENTE — Milano' : lang === 'en' ? 'Online Reservations | LUCENTE — Milano' : 'Réservations en Ligne | LUCENTE — Milano'}
        description={lang === 'it' ? 'Prenota il tuo tavolo al ristorante LUCENTE a Milano. 28 coperti per servizio.' : lang === 'en' ? 'Book your table at LUCENTE restaurant in Milan. 28 covers per service.' : 'Réservez votre table au restaurant LUCENTE à Milan. 28 couverts par service.'}
        image="/images/dining-room.webp"
        path="/reservations"
      />
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-14 text-center space-y-4">
        <p className="typo-eyebrow">{t('reservations.eyebrow')}</p>
        <h1 className="typo-h1 text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight">
          {t('reservations.heroTitle1')} {t('reservations.heroTitle2')}
        </h1>
        <div className="w-16 h-[1px] bg-or mx-auto mt-2" />
        <p className="typo-body text-base sm:text-lg italic font-serif text-ivoire/90 pt-1 max-w-xl mx-auto">
          {t('reservations.heroSubtitle')}
        </p>
      </section>

      {/* Reservation Module */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 mb-20">
        <ReservationFlow />
      </section>

      {/* Policies */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 border-t border-white/10 pt-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-muted">
          
          {/* Column 1: Horaires */}
          <div className="p-6 bg-surface border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-or">
              <Clock size={14} />
              <span className="font-mono uppercase tracking-wider font-semibold">{t('common.openingHours')}</span>
            </div>
            <p className="text-ivoire font-serif text-sm">
              {lang === 'it' ? 'Martedì — Sabato' : lang === 'en' ? 'Tuesday — Saturday' : 'Mardi — Samedi'}
            </p>
            <p>
              {lang === 'it' ? 'Pranzo: 12:30 — 15:00' : lang === 'en' ? 'Lunch: 12:30 — 15:00' : 'Déjeuner : 12h30 — 15h00'}<br />
              {lang === 'it' ? 'Cena: 19:30 — 23:30' : lang === 'en' ? 'Dinner: 19:30 — 23:30' : 'Dîner : 19h30 — 23h30'}
            </p>
            <p className="text-[11px] text-muted/70">
              {lang === 'it' ? 'Chiuso domenica e lunedì.' : lang === 'en' ? 'Closed Sunday & Monday.' : 'Fermé dimanche & lundi.'}
            </p>
          </div>

          {/* Column 2: Politiques */}
          <div className="p-6 bg-surface border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-or">
              <ShieldCheck size={14} />
              <span className="font-mono uppercase tracking-wider font-semibold">
                {lang === 'it' ? 'Accoglienza & Cancellazione' : lang === 'en' ? 'Arrival & Cancellation' : 'Accueil & Annulation'}
              </span>
            </div>
            <p className="text-ivoire font-serif text-sm">
              {lang === 'it' ? 'Abbigliamento elegante gradito' : lang === 'en' ? 'Smart elegant dress code' : 'Tenue élégante appréciée'}
            </p>
            <p>
              {lang === 'it'
                ? 'Cancellazione senza penali fino a 48 ore prima del servizio. 28 coperti — ogni posto è prezioso.'
                : lang === 'en'
                ? 'Free cancellation up to 48 hours before service. 28 covers — every seat counts.'
                : 'Annulation sans frais jusqu\'à 48h avant le service. 28 couverts — chaque place compte.'}
            </p>
            <p className="text-[11px] text-muted/70">
              {lang === 'it' ? 'Prenotazioni aperte 30 giorni prima.' : lang === 'en' ? 'Reservations open 30 days ahead.' : 'Réservations ouvertes 30 jours à l\'avance.'}
            </p>
          </div>

          {/* Column 3: Contact */}
          <div className="p-6 bg-surface border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-or">
              <Phone size={14} />
              <span className="font-mono uppercase tracking-wider font-semibold">
                {lang === 'it' ? 'Concierge' : lang === 'en' ? 'Concierge' : 'Conciergerie'}
              </span>
            </div>
            <p className="text-ivoire font-serif text-sm">
              {lang === 'it' ? 'Per richieste particolari' : lang === 'en' ? 'For bespoke requests' : 'Pour toute demande particulière'}
            </p>
            <p className="font-mono text-or text-sm">{restaurantInfo.phone}</p>
            <p className="text-[11px] text-muted/70">{restaurantInfo.email}</p>
          </div>

        </div>

      </section>

    </div>
  );
}

