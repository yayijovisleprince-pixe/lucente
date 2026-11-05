import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Utensils, Users, Award, Calendar, ChevronRight } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function MaisonPage({ onOpenBooking }) {
  const { lang, t } = useLanguage();

  const maisonSchema = {
    '@type': 'AboutPage',
    '@id': 'https://lucente-milano.com/maison#about',
    'name': 'La Maison LUCENTE | Milano',
    'description': "Trois expressions d'un même idéal gastronomique : Notre Histoire, La Cuisine Chiaroscuro et Nos Espaces Privés.",
    'url': 'https://lucente-milano.com/maison',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'La Maison', 'item': 'https://lucente-milano.com/maison' }
      ]
    }
  };

  const pillars = [
    {
      num: '01',
      title: lang === 'it' ? 'La Storia & Lo Chef' : lang === 'en' ? 'The Story & The Chef' : 'Notre Histoire & Le Chef',
      subtitle: lang === 'it' ? "L'Origine, Vincenzo Moretti & La Visione" : lang === 'en' ? 'Origin, Vincenzo Moretti & Vision' : "L'Origine, Vincenzo Moretti & La Vision",
      path: '/story',
      image: '/images/chef-craft.webp',
      excerpt: lang === 'it'
        ? "Cresciuto al suono della brace, non ai diplomi. Due stelle Michelin nate da una promessa milanese di rigore e chiaroscuro."
        : lang === 'en'
        ? "Raised by the sound of embers, not diplomas. Two Michelin stars forged from a Milanese promise of precision and chiaroscuro."
        : "Nourri par le souffle de la braise, pas par les diplômes. Deux étoiles Michelin façonnées au cœur de Milan dans la vérité du chiaroscuro.",
      actionLabel: lang === 'it' ? 'Esplora la Storia' : lang === 'en' ? 'Explore the Story' : 'Découvrir Notre Histoire',
      icon: Compass
    },
    {
      num: '02',
      title: lang === 'it' ? 'La Cucina Chiaroscuro' : lang === 'en' ? 'Chiaroscuro Cuisine' : 'La Cuisine Chiaroscuro',
      subtitle: lang === 'it' ? 'Manifesto, 4 Micro-Stagioni & Produttori' : lang === 'en' ? 'Manifesto, 4 Micro-Seasons & Producers' : 'Manifeste, 4 Micro-Saisons & Producteurs',
      path: '/cuisine',
      image: '/images/hero-dish.webp',
      excerpt: lang === 'it'
        ? "L'ombra e la luce nell'atto culinario. 42 produttori d'eccezione, nessun intermediario, la purezza della materia nuda."
        : lang === 'en'
        ? "Shadow and light in the culinary act. 42 exceptional purveyors, zero middlemen, the uncompromising truth of the ingredient."
        : "L'ombre et la lumière dans l'assiette. 42 artisans italiens sans intermédiaire, la minéralité brute et la tension du goût.",
      actionLabel: lang === 'it' ? 'Esplora la Cucina' : lang === 'en' ? 'Explore the Cuisine' : 'Découvrir La Cuisine',
      icon: Utensils
    },
    {
      num: '03',
      title: lang === 'it' ? 'Gli Spazi Privati' : lang === 'en' ? 'Private Dining' : 'Les Espaces Privés',
      subtitle: lang === 'it' ? "Sale Riservate & Chef's Table" : lang === 'en' ? "Exclusive Rooms & Chef's Table" : "Salons Confidentiels & Chef's Table",
      path: '/private-dining',
      image: '/images/dining-room.webp',
      excerpt: lang === 'it'
        ? "Ventotto coperti in totale, Cantina sotterranea e la Chef's Table sospesa sui passaggi di brigata per cene memorabili."
        : lang === 'en'
        ? "Twenty-eight covers total, ancient cellar vault and the Chef's Table floating over the kitchen brigade."
        : "Vingt-huit couverts exclusifs, cave voûtée séculaire et la Chef's Table immergée au rythme de la brigade.",
      actionLabel: lang === 'it' ? 'Esplora gli Spazi' : lang === 'en' ? 'Explore the Spaces' : 'Découvrir Les Espaces',
      icon: Users
    }
  ];

  return (
    <div className="bg-nero text-ivoire min-h-screen pt-28 pb-20">
      <SEOHead
        title={lang === 'it' ? 'La Maison | LUCENTE — Milano' : lang === 'en' ? 'The Maison | LUCENTE — Milano' : 'La Maison | LUCENTE — Milano'}
        description={lang === 'it' ? "Benvenuti a La Maison LUCENTE Milano. Scopri la nostra storia, la cucina d'autore e gli spazi privati." : lang === 'en' ? "Welcome to La Maison LUCENTE Milano. Discover our story, signature cuisine and private dining spaces." : "Bienvenue à La Maison LUCENTE Milano. Découvrez notre histoire, la cuisine d'auteur et les salons privés."}
        schema={maisonSchema}
      />

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mb-16 sm:mb-24">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-or/30 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-or" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-or uppercase">
              {lang === 'it' ? 'LUCENTE MILANO · LA MAISON' : lang === 'en' ? 'LUCENTE MILANO · THE MAISON' : 'LUCENTE MILANO · LA MAISON'}
            </span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-light text-ivoire tracking-tight leading-tight">
            {lang === 'it' ? (
              <>Un ideale gastronomico. <br /><span className="text-or italic font-normal">Tre espressioni.</span></>
            ) : lang === 'en' ? (
              <>A gastronomic ideal. <br /><span className="text-or italic font-normal">Three expressions.</span></>
            ) : (
              <>Un idéal gastronomique. <br /><span className="text-or italic font-normal">Trois expressions.</span></>
            )}
          </h1>

          <p className="font-serif text-base sm:text-lg text-muted italic max-w-2xl mx-auto leading-relaxed pt-2">
            {lang === 'it'
              ? '« Il ristorante non è solo una tavola : è una genealogia del gusto, una tensione creativa nella materia e un rifugio per il silenzio. »'
              : lang === 'en'
              ? '« A restaurant is not merely a table: it is a lineage of taste, a creative tension in the matter, and a sanctuary for silence. »'
              : "« Le restaurant n'est pas seulement une table : c'est une généalogie du goût, une tension créative dans la matière et un sanctuaire pour le silence. »"}
          </p>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mb-20 sm:mb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="group bg-surface border border-white/10 hover:border-or/60 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl"
              >
                {/* Visual Header */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-black/40" />
                  
                  {/* Floating Number Badge */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-nero/80 backdrop-blur-sm border border-or/40 rounded-sm">
                    <span className="font-mono text-xs text-or font-bold tracking-widest">{pillar.num}</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-or block mb-1">
                      {pillar.subtitle}
                    </span>
                    <h2 className="font-serif-luxury text-2xl text-ivoire font-light group-hover:text-or transition-colors">
                      {pillar.title}
                    </h2>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <p className="font-serif text-sm text-ivoire/80 leading-relaxed italic">
                    {pillar.excerpt}
                  </p>

                  <Link
                    to={pillar.path}
                    className="w-full py-3 px-4 bg-nero border border-white/15 group-hover:border-or group-hover:bg-or group-hover:text-nero text-ivoire text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-between font-semibold"
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Maison Quote & Reservation CTA */}
      <section className="px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
        <div className="p-8 sm:p-12 bg-surface border border-or/40 rounded-sm text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-or/10 border border-or/40 flex items-center justify-center mx-auto text-or">
            <Award size={22} />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-or block font-semibold">
              {lang === 'it' ? '28 Coperti Esclusivi · 2 Stelle Michelin' : lang === 'en' ? '28 Exclusive Covers · 2 Michelin Stars' : '28 Couverts Exclusifs · 2 Étoiles Michelin'}
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivoire font-light">
              {lang === 'it' ? 'Vivi l’esperienza Lucente a Milano' : lang === 'en' ? 'Experience Lucente in Milan' : "Vivez l'expérience Lucente à Milan"}
            </h3>
            <p className="font-serif text-sm text-muted italic max-w-lg mx-auto">
              {lang === 'it'
                ? 'Prenotazioni aperte per la stagione in corso. I tavoli sono assegnati su conferma nominale.'
                : lang === 'en'
                ? 'Reservations open for the current season. Tables are allocated upon nominal confirmation.'
                : 'Réservations ouvertes pour la saison en cours. Les tables sont attribuées sur confirmation nominative.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenBooking && onOpenBooking()}
              className="w-full sm:w-auto px-8 py-3.5 bg-or hover:bg-or-light text-nero font-bold text-xs uppercase tracking-[0.18em] transition-all duration-300 shadow-lg shadow-or/20 flex items-center justify-center gap-2"
            >
              <Calendar size={14} />
              <span>{t('nav.reserveTable')}</span>
            </button>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-6 py-3.5 bg-nero hover:bg-surface-elevated text-ivoire hover:text-or border border-white/15 hover:border-or text-xs font-mono uppercase tracking-wider transition-all"
            >
              {lang === 'it' ? 'Consulta i Menu' : lang === 'en' ? 'View the Menus' : 'Consulter la Carte'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

