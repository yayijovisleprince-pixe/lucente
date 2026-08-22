import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Feather, ArrowRight, Sparkles, Compass, Eye, Heart, Shield, Wine, Users } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function StoryPage({ onOpenBooking }) {
  const { chef, sommelier } = restaurantInfo;
  const { lang, t } = useLanguage();

  const storySchema = {
    '@type': 'AboutPage',
    '@id': 'https://lucente-milano.com/story#about',
    'name': 'Histoire, Philosophie & Équipe | LUCENTE Milano',
    'description': 'L\'histoire du restaurant LUCENTE, du Chef Vincenzo Moretti et du Chiaroscuro culinaire au cœur de Milan.',
    'url': 'https://lucente-milano.com/story',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Histoire & Chef', 'item': 'https://lucente-milano.com/story' }
      ]
    },
    'mainEntity': {
      '@type': 'Person',
      'name': 'Vincenzo Moretti',
      'jobTitle': 'Chef Exécutif & Propriétaire',
      'image': 'https://lucente-milano.com/images/chef-portrait.webp',
      'description': 'Chef doublement étoilé au Guide Michelin, fondateur de LUCENTE à Milan.',
      'worksFor': {
        '@type': 'Restaurant',
        'name': 'LUCENTE',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Via Monte Napoleone, 14',
          'addressLocality': 'Milano',
          'addressRegion': 'MI',
          'postalCode': '20121',
          'addressCountry': 'IT'
        }
      }
    }
  };

  return (
    <div className="bg-nero text-ivoire min-h-screen">
      <SEOHead
        title={lang === 'it' ? "La Storia & il Chef Vincenzo Moretti | LUCENTE — Milano" : lang === 'en' ? "The Story & Chef Vincenzo Moretti | LUCENTE — Milano" : "L'Histoire & Le Chef Vincenzo Moretti | LUCENTE — Milano"}
        description={lang === 'it' ? "È cresciuto al rumore della brace, non al suono dei diplomi. La storia di Vincenzo Moretti e di LUCENTE, ristorante doppie stelle Michelin a Milano." : lang === 'en' ? "He grew up to the sound of embers, not diplomas. The story of Vincenzo Moretti and LUCENTE, the double Michelin-starred restaurant in Milan." : "Il a grandi au bruit de la braise, pas au son des diplômes. L'histoire de Vincenzo Moretti et de LUCENTE, restaurant doublement étoilé à Milan."}
        image="/images/chef-portrait.webp"
        path="/story"
        schema={storySchema}
      />
      
      {/* =========================================================================
          01. HERO
          ========================================================================= */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-24 bg-nero">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,94,0.1)_0%,rgba(16,16,14,0.98)_75%)]" />
          <div className="absolute inset-0 bg-noise opacity-30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="typo-eyebrow text-or block animate-float">
            {t('story.eyebrow')}
          </span>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivoire font-light leading-tight tracking-[0.08em]">
            {t('story.heroTitle1')}<br />
            <span className="italic text-or">{t('story.heroTitle2')}</span>
          </h1>

          <div className="w-16 h-[1px] bg-or mx-auto my-6" />

          <p className="typo-body text-base sm:text-xl text-ivoire/90 max-w-2xl mx-auto italic font-serif-luxury leading-relaxed font-light">
            {t('story.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* =========================================================================
          INTERLUDE IMAGE — RAW EARTH
          ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 my-6">
        <div className="relative rounded-lg overflow-hidden border border-or-subtle shadow-2xl group">
          <img
            src="/images/truffle-harvest.webp"
            alt="Récolte de truffe blanche — Langhe, Piémont"
            className="w-full h-80 sm:h-[480px] lg:h-[540px] object-cover filter brightness-90 group-hover:scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-85" />
          <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
            <span className="typo-eyebrow text-or text-[10px]">
              Langhe, Piemonte · {lang === 'it' ? "Raccolta all'alba" : lang === 'en' ? "Dawn harvest" : "Récolte à l'aube"}
            </span>
            <span className="typo-caption text-muted hidden sm:inline">
              {lang === 'it' ? 'La materia prima, prima del piatto' : lang === 'en' ? 'Raw materials, before the plate' : "La matière brute, avant l'assiette"}
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. ORIGINS (NARRATIVE)
          ========================================================================= */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 space-y-8">
        <span className="typo-eyebrow text-or block">{t('story.originsEyebrow')}</span>
        
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light leading-tight">
          {t('story.originsTitle')}
        </h2>

        <div className="space-y-6 typo-body text-base sm:text-lg leading-relaxed text-muted font-light">
          <p className="first-letter:font-serif-luxury first-letter:text-6xl first-letter:text-or first-letter:mr-3 first-letter:float-left text-ivoire/95">
            {t('story.originsText1')}
          </p>
          <p>
            {t('story.originsText2')}
          </p>
        </div>
      </section>

      {/* =========================================================================
          03. CHEF & SOMMELIER
          ========================================================================= */}
      <section className="py-24 bg-surface border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Chef Vincenzo Moretti */}
            <div className="bg-nero border border-white/5 p-8 sm:p-12 space-y-6 shadow-2xl">
              <div className="relative h-80 overflow-hidden rounded mb-6">
                <img
                  src="/images/chef-portrait.webp"
                  alt="Chef Vincenzo Moretti"
                  className="w-full h-full object-cover object-top filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px]">
                  {lang === 'it' ? 'Chef Esecutivo & Proprietario' : lang === 'en' ? 'Executive Chef & Owner' : 'Chef Exécutif & Propriétaire'}
                </span>
              </div>
              <h3 className="font-serif-luxury text-3xl text-ivoire">Vincenzo Moretti</h3>
              <p className="typo-body text-sm text-muted leading-relaxed">
                {lang === 'it'
                  ? "Cresciuto al calore della brace emiliana, Vincenzo Moretti ha affinato la sua arte tra Modena, Tokyo e Londra. Da LUCENTE non reinventa la cucina italiana: la spoglia di ogni artificio."
                  : lang === 'en'
                  ? "Raised by the warmth of Emilian embers, Vincenzo Moretti refined his craft across Modena, Tokyo, and London. At LUCENTE, he does not reinvent Italian cuisine: he strips it of all excess."
                  : (typeof chef.bio === 'object' ? chef.bio.fr : chef.bio)}
              </p>
              <blockquote className="border-l-2 border-or pl-4 italic text-ivoire/80 font-serif text-sm">
                « {lang === 'it' ? "Non si migliora un'albicocca di luglio. Si impara a non rovinarla." : lang === 'en' ? "You don't improve a July apricot. You learn how not to ruin it." : (typeof chef.quote === 'object' ? chef.quote.fr : chef.quote)} »
              </blockquote>
            </div>

            {/* Sommelier Gianluca Ferri */}
            <div className="bg-nero border border-white/5 p-8 sm:p-12 space-y-6 shadow-2xl">
              <div className="relative h-80 overflow-hidden rounded mb-6">
                <img
                  src="/images/sommelier-ritual.webp"
                  alt="Chef Sommelier Gianluca Ferri"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px]">
                  {lang === 'it' ? 'Direttore di Cantina · 1.400 referenze' : lang === 'en' ? 'Cellar Director · 1,400 references' : 'Directeur de Cave · 1 400 références'}
                </span>
              </div>
              <h3 className="font-serif-luxury text-3xl text-ivoire">Gianluca Ferri</h3>
              <p className="typo-body text-sm text-muted leading-relaxed">
                {lang === 'it'
                  ? "1.400 referenze selezionate per emozione. Dai leggendari Barolo ai vini in anfora dell'Etna, Gianluca Ferri cerca ciò che prolunga il piatto anziché fargli concorrenza."
                  : lang === 'en'
                  ? "1,400 references curated by emotion. From legendary Barolos to amphora wines from Etna, Gianluca Ferri seeks what elevates the dish rather than competes with it."
                  : (typeof sommelier.philosophy === 'object' ? sommelier.philosophy.fr : sommelier.philosophy)}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          04. PRESS
          ========================================================================= */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 space-y-10">
        <span className="typo-eyebrow text-or block">
          {lang === 'it' ? 'Cosa si dice di noi' : lang === 'en' ? 'What they say about us' : 'Ce que la presse en dit'}
        </span>

        <div className="space-y-8">
          {[
            {
              quote: lang === 'it'
                ? "LUCENTE fa qualcosa di raro: una cucina italiana che non ha paura di essere italiana. Né nostalgica, né fusion — solo precisa, profonda, e stranamente commovente."
                : lang === 'en'
                ? "LUCENTE does something rare: an Italian cuisine that is not afraid to be Italian. Neither nostalgic nor fusion — just precise, deep, and strangely moving."
                : "LUCENTE accomplit quelque chose de rare : une cuisine italienne qui n'a pas peur d'être italienne. Ni nostalgique, ni fusion — simplement précise, profonde et étrangement émouvante.",
              source: lang === 'it' ? "Guida Michelin 2026" : lang === 'en' ? "Michelin Guide 2026" : "Guide Michelin 2026"
            },
            {
              quote: lang === 'it'
                ? "La sala è immersa in una penombra dorata. I piatti arrivano come rivelazioni. Vincenzo Moretti ha reso Milano una destinazione nel senso letterale del termine."
                : lang === 'en'
                ? "The room is immersed in golden half-light. The plates arrive like revelations. Vincenzo Moretti has made Milan a destination in the strictest sense of the word."
                : "La salle est plongée dans une pénombre dorée. Les assiettes arrivent comme des révélations. Vincenzo Moretti a fait de Milan une destination au sens le plus noble.",
              source: lang === 'it' ? 'Il Corriere del Gusto 2025' : lang === 'en' ? 'The Financial Times 2025' : 'Le Figaro Gastronomie 2025'
            }
          ].map((item, i) => (
            <blockquote key={i} className="border-l-2 border-or pl-6 space-y-2">
              <p className="font-serif italic text-ivoire/90 text-lg leading-relaxed">« {item.quote} »</p>
              <cite className="text-xs text-or font-mono not-italic">{item.source}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-nero border-t border-white/5">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire">
            {lang === 'it' ? 'Venire da LUCENTE' : lang === 'en' ? 'Experience LUCENTE' : 'Venir chez LUCENTE'}
          </h2>
          <p className="text-muted text-sm">
            {lang === 'it' ? '28 coperti. Prenotazioni 30 giorni prima.' : lang === 'en' ? '28 covers. Reservations 30 days in advance.' : '28 couverts. Réservations 30 jours à l\'avance.'}
          </p>
          <button
            onClick={() => onOpenBooking()}
            className="px-10 py-4 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all"
          >
            {lang === 'it' ? 'Prenota un Tavolo' : lang === 'en' ? 'Reserve a Table' : 'Réserver une Table'}
          </button>
        </div>
      </section>

    </div>
  );
}
