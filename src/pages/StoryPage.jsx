import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Feather, ArrowRight, Sparkles, Compass, Eye, Heart, Shield, Wine, Users } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';

export default function StoryPage({ onOpenBooking }) {
  const { chef, sommelier } = restaurantInfo;

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
      'image': 'https://lucente-milano.com/images/chef-portrait.jpg',
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
        title="L'Histoire & Le Chef Vincenzo Moretti | LUCENTE — Milano"
        description="Il a grandi au bruit de la braise, pas au son des diplômes. L'histoire de Vincenzo Moretti et de LUCENTE, restaurant doublement étoilé à Milan."
        image="/images/chef-portrait.jpg"
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
            Capitolo I · L'Origine
          </span>

          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivoire font-light leading-tight tracking-[0.08em]">
            Il a grandi au bruit<br />
            <span className="italic text-or">de la braise.</span>
          </h1>

          <div className="w-16 h-[1px] bg-or mx-auto my-6" />

          <p className="typo-body text-base sm:text-xl text-ivoire/90 max-w-2xl mx-auto italic font-serif-luxury leading-relaxed font-light">
            Pas au son des diplômes. Ce que Vincenzo Moretti sait faire, il l'a appris dans une cuisine de Reggio Emilia — avant de traverser Modène, Tokyo et Londres pour comprendre ce qu'il voulait retrouver.
          </p>
        </div>
      </section>

      {/* =========================================================================
          INTERLUDE IMAGE — RAW EARTH
          ========================================================================= */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 my-6">
        <div className="relative rounded-lg overflow-hidden border border-or-subtle shadow-2xl group">
          <img
            src="/images/truffle-harvest.jpg"
            alt="Récolte de truffe blanche — Langhe, Piémont"
            className="w-full h-80 sm:h-[480px] lg:h-[540px] object-cover filter brightness-90 group-hover:scale-102 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-85" />
          <div className="absolute bottom-6 left-8 right-8 flex justify-between items-end">
            <span className="typo-eyebrow text-or text-[10px]">Langhe, Piemonte · Récolte à l'aube</span>
            <span className="typo-caption text-muted hidden sm:inline">La matière brute, avant l'assiette</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          02. ORIGINS (NARRATIVE)
          ========================================================================= */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 space-y-8">
        <span className="typo-eyebrow text-or block">01. Les Origines</span>
        
        <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light leading-tight">
          L'Émilie-Romagne, d'abord.
        </h2>

        <div className="space-y-6 typo-body text-base sm:text-lg leading-relaxed text-muted font-light">
          <p className="first-letter:font-serif-luxury first-letter:text-6xl first-letter:text-or first-letter:mr-3 first-letter:float-left text-ivoire/95">
            Il y a quelque chose qu'aucune école de cuisine ne peut vous apprendre : le rythme. Le parfum de la braise de chêne en hiver. Le pétrissage des pâtes au lever du soleil. La lente maturation des balsamiques traditionnels pendant qu'une vie entière passe autour.
          </p>
          <p>
            Vincenzo Moretti a grandi dans cette cuisine-là, à Reggio Emilia. Il y a tout appris — les gestes, les silences, la différence entre un produit médiocre et un produit juste.
          </p>
          <p>
            Modène, Tokyo, Londres sont venus ensuite. Pas pour remplacer Reggio Emilia. Pour comprendre ce que Reggio Emilia avait d'irremplaçable.
          </p>
          <p>
            LUCENTE est la réponse à cette question. Une cuisine italienne qui n'a pas peur d'être italienne — et qui n'a aucune nostalgie d'être autre chose.
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
                  src="/images/chef-portrait.jpg"
                  alt="Chef Vincenzo Moretti"
                  className="w-full h-full object-cover object-top filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px]">
                  Chef Exécutif & Propriétaire
                </span>
              </div>
              <h3 className="font-serif-luxury text-3xl text-ivoire">Vincenzo Moretti</h3>
              <p className="typo-body text-sm text-muted leading-relaxed">
                {chef.bio}
              </p>
              <blockquote className="border-l-2 border-or pl-4 italic text-ivoire/80 font-serif text-sm">
                « {chef.quote} »
              </blockquote>
            </div>

            {/* Sommelier Gianluca Ferri */}
            <div className="bg-nero border border-white/5 p-8 sm:p-12 space-y-6 shadow-2xl">
              <div className="relative h-80 overflow-hidden rounded mb-6">
                <img
                  src="/images/sommelier-ritual.jpg"
                  alt="Chef Sommelier Gianluca Ferri"
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px]">
                  Directeur de la Cave · 1 400 références
                </span>
              </div>
              <h3 className="font-serif-luxury text-3xl text-ivoire">Gianluca Ferri</h3>
              <p className="typo-body text-sm text-muted leading-relaxed">
                {sommelier.philosophy}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          04. PRESS
          ========================================================================= */}
      <section className="py-24 max-w-4xl mx-auto px-6 md:px-12 space-y-10">
        <span className="typo-eyebrow text-or block">Ce qu'on dit de nous</span>

        <div className="space-y-8">
          {[
            {
              quote: "LUCENTE fait quelque chose de rare : une cuisine italienne qui n'a pas peur d'être italienne. Ni nostalgique, ni fusionnelle — juste précise, profonde, et étrangement émouvante.",
              source: "Guide Michelin 2026"
            },
            {
              quote: "La salle plonge dans un demi-obscur doré. Les assiettes arrivent comme des révélations. Vincenzo Moretti a fait de Milan une destination au sens strict du terme.",
              source: "Le Figaro Gastronomie 2025"
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
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire">Venir à LUCENTE</h2>
          <p className="text-muted text-sm">28 couverts. Réservations 30 jours à l'avance.</p>
          <button
            onClick={() => onOpenBooking()}
            className="px-10 py-4 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all"
          >
            Réserver une Table
          </button>
        </div>
      </section>

    </div>
  );
}
