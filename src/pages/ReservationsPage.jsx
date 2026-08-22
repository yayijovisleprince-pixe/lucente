import React from 'react';
import { ShieldCheck, Phone, Clock, Award, Sparkles, MapPin, Wine, Users } from 'lucide-react';
import ReservationFlow from '../components/ReservationFlow';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';

export default function ReservationsPage() {
  const reservationsSchema = {
    '@type': 'FAQPage',
    '@id': 'https://lucente-milano.com/reservations#faq',
    'name': 'Réservations & Conciergerie | LUCENTE Milano',
    'description': 'Réservez votre table au restaurant gastronomique LUCENTE à Milan. 28 couverts. Réservations ouvertes 30 jours à l\'avance.',
    'url': 'https://lucente-milano.com/reservations',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Réservations', 'item': 'https://lucente-milano.com/reservations' }
      ]
    },
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Combien de temps à l\'avance puis-je réserver une table à LUCENTE ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Les réservations ouvrent 30 jours calendaires à l\'avance à 00h00 via notre conciergerie en ligne.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Quel est le code vestimentaire (dress code) ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Une tenue élégante et contemporaine est demandée. Pas de règle stricte — mais la salle est conçue pour que chacun s\'y sente à sa place.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Quelle est la politique d\'annulation ?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Vous pouvez annuler ou modifier sans frais votre réservation jusqu\'à 48 heures avant l\'heure du service.'
        }
      }
    ]
  };

  return (
    <div className="pt-28 md:pt-36 pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title="Réservations en Ligne | LUCENTE — Milano"
        description="Réservez votre table au restaurant LUCENTE à Milan. 28 couverts par service. Déjeuner 12h30–15h00 · Dîner 19h30–23h30. Réservations 30 jours à l'avance."
        image="/images/dining-room.jpg"
        path="/reservations"
        schema={reservationsSchema}
      />
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-14 text-center space-y-4">
        <p className="typo-eyebrow">28 Couverts · Mardi au Samedi</p>
        <h1 className="typo-h1 text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight">
          Votre Table
        </h1>
        <div className="w-16 h-[1px] bg-or mx-auto mt-2" />
        <p className="typo-body text-base sm:text-lg italic font-serif text-ivoire/90 pt-1 max-w-xl mx-auto">
          « La salle est prête à 19h30. Tout ce qui se passe après dépend de vous — et de nous. »
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
              <span className="font-mono uppercase tracking-wider font-semibold">Horaires</span>
            </div>
            <p className="text-ivoire font-serif text-sm">Mardi — Samedi</p>
            <p>Déjeuner : 12h30 — 15h00<br />Dîner : 19h30 — 23h30</p>
            <p className="text-[11px] text-muted/70">Fermé dimanche & lundi.</p>
          </div>

          {/* Column 2: Politiques */}
          <div className="p-6 bg-surface border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-or">
              <ShieldCheck size={14} />
              <span className="font-mono uppercase tracking-wider font-semibold">Accueil & Annulation</span>
            </div>
            <p className="text-ivoire font-serif text-sm">Tenue élégante appréciée</p>
            <p>Annulation sans frais jusqu'à 48h avant le service. 28 couverts — chaque place compte.</p>
            <p className="text-[11px] text-muted/70">Réservations ouvertes 30 jours à l'avance.</p>
          </div>

          {/* Column 3: Contact */}
          <div className="p-6 bg-surface border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-or">
              <Phone size={14} />
              <span className="font-mono uppercase tracking-wider font-semibold">Conciergerie</span>
            </div>
            <p className="text-ivoire font-serif text-sm">Pour toute demande particulière</p>
            <p className="font-mono text-or text-sm">{restaurantInfo.phone}</p>
            <p className="text-[11px] text-muted/70">{restaurantInfo.email}</p>
          </div>

        </div>

      </section>

    </div>
  );
}
