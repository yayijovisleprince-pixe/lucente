import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, ChevronDown, ArrowRight, Feather } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage({ onOpenBooking }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeDishIndex, setActiveDishIndex] = useState(0);
  const { lang } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const signatureDishes = [
    {
      id: 'chianina-truffe',
      name: 'Filetto di Chianina, Tartufo Bianco & Oro',
      subtitle: lang === 'it'
        ? "Manzo Chianina toscano · Tartufo bianco d'Alba · Riduzione al Barolo"
        : lang === 'en'
        ? "Tuscan Chianina beef · Alba white truffle · Glossy Barolo reduction"
        : "Bœuf Chianina de Toscane · Truffe blanche d'Alba · Réduction de Barolo",
      description: lang === 'it'
        ? "Frollato 45 giorni, affumicato con tralci di vite, adagiato su mousseline di sedano bruciato e balsamico tradizionale di Modena DOP 25 anni."
        : lang === 'en'
        ? "45-day dry-aged tenderloin, smoked over vine shoots, set upon charred celeriac purée and 25-year traditional Modena balsamic DOP."
        : "Maturé 45 jours, fumé au sarment de vigne, posé sur une mousseline de céleri brûlé. Le balsamique de Modène, 25 ans d'âge, arrive en dernier — une goutte, pas une sauce.",
      price: '85 €',
      pairing: 'Barolo Monprivato 2017 — Mascarello',
      image: '/images/hero-dish.webp',
      tag: lang === 'it' ? 'Atto IV · Terra' : lang === 'en' ? 'Act IV · Terra' : 'Acte IV · Terra'
    },
    {
      id: 'raviolo-caviar',
      name: 'Raviolo Imperiale al Caviale Oscietra',
      subtitle: lang === 'it'
        ? "Un solo raviolo · Scampo mediterraneo · 15g Oscietra Royal"
        : lang === 'en'
        ? "Single imperial raviolo · Mediterranean langoustine · 15g Royal Oscietra"
        : "Un seul raviolo · Langoustine de Méditerranée · 15g Oscietra Royal",
      description: lang === 'it'
        ? "Un solo raviolo. La sfoglia è tirata a mano ogni mattina fino alla trasparenza. All'interno: scampo crudo marinato e caviale Oscietra."
        : lang === 'en'
        ? "A single handcrafted raviolo. The pasta sheet is rolled every morning until translucent. Inside: raw langoustine and Royal Oscietra caviar."
        : "Un raviolo. Pas deux. La pâte est étirée chaque matin à la main jusqu'à ce qu'elle soit translucide. À l'intérieur : langoustine crue, jamais chauffée. Le caviar arrive après.",
      price: '75 €',
      pairing: 'Trebbiano d\'Abruzzo 2019 — Valentini',
      image: '/images/pasta-caviar.webp',
      tag: lang === 'it' ? 'Atto III · Mare' : lang === 'en' ? 'Act III · Mare' : 'Acte III · Mare'
    },
    {
      id: 'gambero-rosso',
      name: 'Gambero Rosso di Mazara & Stracciatella',
      subtitle: lang === 'it'
        ? "Gambero rosso crudo · Stracciatella affumicata · Gel di bergamotto"
        : lang === 'en'
        ? "Raw red prawn · Smoked stracciatella · Wild bergamot gel"
        : "Crevette rouge crue · Stracciatella fumée · Gel de bergamote",
      description: lang === 'it'
        ? "Pescato a 700 metri di profondità tra la Sicilia e la Tunisia. Servito a 12°C esatti. Mai cotto. Tre elementi essenziali."
        : lang === 'en'
        ? "Fished 700 meters deep between Sicily and Tunisia. Served at precisely 12°C. Never cooked. Three pure elements."
        : "Pêchée à 700 mètres de profondeur entre la Sicile et la Tunisie. Servie à 12°C exactement — ni plus froide, ni plus chaude. Jamais cuite. Trois éléments. Pas quatre.",
      price: '60 €',
      pairing: 'Etna Bianco Superiore 2021 — Pietradolce',
      image: '/images/prawn-dish.webp',
      tag: lang === 'it' ? 'Atto II · Sicilia' : lang === 'en' ? 'Act II · Sicily' : 'Acte II · Sicile'
    },
    {
      id: 'tartufo-harvest',
      name: 'Risotto Carnaroli Riserva 7 Anni',
      subtitle: lang === 'it'
        ? "Riso affinato 7 anni · Burro di malga · Tartufo d'Alba grattugiato al tavolo"
        : lang === 'en'
        ? "7-year aged rice · Mountain butter · Freshly shaved Alba truffle"
        : "Riz affiné 7 ans · Beurre de montagne · Truffe d'Alba râpée minute",
      description: lang === 'it'
        ? "Il riso ha riposato 7 anni in silos refrigerati per cristallizzare l'amido. Il tartufo viene grattugiato al momento direttamente sul risotto caldo."
        : lang === 'en'
        ? "The rice aged seven years in temperature-controlled silos to crystallize the starch. The truffle is shaved tableside over the steaming risotto."
        : "Le riz a attendu sept ans dans des silos froids. L'amidon s'est cristallisé. La truffe, elle, est râpée en salle, sur le riz chaud — pour que le parfum s'exhale devant vous.",
      price: '65 €',
      pairing: 'Barbaresco Asili 2016 — Bruno Giacosa',
      image: '/images/truffle-harvest.webp',
      tag: lang === 'it' ? 'Atto V · Firma' : lang === 'en' ? 'Act V · Signature' : 'Acte V · Signature'
    }
  ];

  const activeDish = signatureDishes[activeDishIndex];

  const journalArticles = [
    {
      slug: 'manifeste-du-chiaroscuro-culinaire',
      category: lang === 'it' ? 'Filosofia & Visione' : lang === 'en' ? 'Philosophy & Vision' : 'Philosophie & Vision',
      title: lang === 'it' ? 'Il Manifesto del Chiaroscuro Culinario' : lang === 'en' ? 'The Culinary Chiaroscuro Manifesto' : 'Le Manifeste du Chiaroscuro Culinaire',
      date: lang === 'it' ? '18 Agosto 2026' : lang === 'en' ? 'August 18, 2026' : '18 Août 2026',
      readTime: lang === 'it' ? '5 min lettura' : lang === 'en' ? '5 min read' : '5 min',
      image: '/images/hero-dish.webp',
      excerpt: lang === 'it' 
        ? "L'ombra non è l'assenza di luce. È ciò che le dà direzione. Vincenzo Moretti spiega perché ogni piatto di LUCENTE inizia nel buio."
        : lang === 'en'
        ? "Shadow is not the absence of light. It is what gives it direction. Vincenzo Moretti explains why each plate at LUCENTE starts in darkness."
        : "L'ombre n'est pas l'absence de lumière. C'est ce qui lui donne sa direction. Vincenzo Moretti explique pourquoi chaque assiette commence dans le noir."
    },
    {
      slug: 'secret-des-vins-en-amphore-etna',
      category: lang === 'it' ? 'Cantina & Terroir' : lang === 'en' ? 'Cellar & Terroir' : 'Cave & Terroirs',
      title: lang === 'it' ? "Il Segreto dei Vini in Anfora dell'Etna" : lang === 'en' ? 'The Secret of Etna Amphora Wines' : 'Le Secret des Vins en Amphore de l\'Etna',
      date: lang === 'it' ? '11 Agosto 2026' : lang === 'en' ? 'August 11, 2026' : '11 Août 2026',
      readTime: lang === 'it' ? '7 min lettura' : lang === 'en' ? '7 min read' : '7 min',
      image: '/images/cellar-architecture.webp',
      excerpt: lang === 'it'
        ? "Nella nostra cantina, una sezione intera è dedicata ai vini affinati in giare di terracotta dell'Etna. Gianluca Ferri racconta la purezza dell'argilla."
        : lang === 'en'
        ? "In our cellar, an entire vault is dedicated to wines aged in terracotta jars from Mount Etna. Gianluca Ferri explains why clay tells the truth."
        : "Dans notre cave, une section entière consacrée aux vins en jarre de terre cuite. Gianluca Ferri explique pourquoi l'argile dit la vérité là où le bois ment."
    },
    {
      slug: 'alchimie-du-gambero-rosso-mazara',
      category: lang === 'it' ? 'Sapori & Tecnica' : lang === 'en' ? 'Flavours & Technique' : 'Saveurs & Technique',
      title: lang === 'it' ? "L'Alchimia del Gambero Rosso di Mazara del Vallo" : lang === 'en' ? 'The Alchemy of Mazara del Vallo Red Prawn' : 'L\'Alchimie du Gambero Rosso de Mazara del Vallo',
      date: lang === 'it' ? '04 Agosto 2026' : lang === 'en' ? 'August 04, 2026' : '04 Août 2026',
      readTime: lang === 'it' ? '4 min lettura' : lang === 'en' ? '4 min read' : '4 min',
      image: '/images/prawn-dish.webp',
      excerpt: lang === 'it'
        ? "Vive a 700 metri di profondità. Non viene mai cotto. Servito a 12°C. E non ha bisogno di nient'altro."
        : lang === 'en'
        ? "It lives 700 meters below sea level. Never cooked. Served at 12°C. And needs nothing else."
        : "Il vit à 700 mètres de profondeur. On ne le cuit jamais. On le sert à 12°C. Et il n'a besoin de rien d'autre."
    }
  ];

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Restaurant', 'LocalBusiness'],
        '@id': 'https://lucente-milano.com/#restaurant',
        'name': 'LUCENTE',
        'url': 'https://lucente-milano.com',
        'image': 'https://lucente-milano.com/images/hero-dish.webp',
        'description': 'Restaurant de haute cuisine italienne contemporaine à Milan doublement étoilé au Guide Michelin par le Chef Vincenzo Moretti.',
        'servesCuisine': ['Haute Cuisine Italienne', 'Contemporary Italian', 'Alta Cucina'],
        'priceRange': '€€€€€',
        'award': '2 Étoiles Michelin 2026',
        'telephone': '+39 02 8945 7700',
        'email': 'conciergerie@lucente-milano.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Via Monte Napoleone, 14',
          'addressLocality': 'Milano',
          'addressRegion': 'MI',
          'postalCode': '20121',
          'addressCountry': 'IT'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 45.468722,
          'longitude': 9.194711
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '12:30',
            'closes': '15:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            'opens': '19:30',
            'closes': '23:30'
          }
        ],
        'hasOfferCatalog': {
          '@type': 'OfferCatalog',
          'name': 'Menus Dégustation LUCENTE',
          'itemListElement': [
            { '@type': 'Offer', 'itemOffered': { '@type': 'Menu', 'name': 'Menu Terra & Memoria (7 Actes)' }, 'price': '210', 'priceCurrency': 'EUR' },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Menu', 'name': 'Menu Mare & Orizzonte (9 Actes)' }, 'price': '240', 'priceCurrency': 'EUR' },
            { '@type': 'Offer', 'itemOffered': { '@type': 'Menu', 'name': 'Menu Luce Assoluta (11 Actes)' }, 'price': '290', 'priceCurrency': 'EUR' }
          ]
        }
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://lucente-milano.com/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'Où se situe le restaurant LUCENTE à Milan ?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'LUCENTE est situé au 14 Via Monte Napoleone, au cœur du Quadrilatero della Moda à Milan (20121 Milano MI, Italie).' }
          },
          {
            '@type': 'Question',
            'name': 'Qui est le Chef du restaurant LUCENTE ?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Le Chef Exécutif et Fondateur est Vincenzo Moretti, récompensé de 2 Étoiles au Guide Michelin pour sa haute cuisine italienne contemporaine guidée par le Chiaroscuro.' }
          },
          {
            '@type': 'Question',
            'name': 'Quels sont les horaires d\'ouverture de LUCENTE ?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'LUCENTE est ouvert du mardi au samedi pour le déjeuner (12h30–15h00) et le dîner (19h30–23h30). Fermé le dimanche et le lundi.' }
          },
          {
            '@type': 'Question',
            'name': 'Comment réserver une table à LUCENTE ?',
            'acceptedAnswer': { '@type': 'Answer', 'text': 'Les réservations s\'effectuent en ligne via le système de conciergerie officiel du site ou par téléphone au +39 02 8945 7700 (ouvertes 30 jours à l\'avance).' }
          }
        ]
      }
    ]
  };

  const scrollToPhilosophy = () => {
    const el = document.getElementById('philosophy-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-nero text-ivoire">
      <SEOHead
        title="LUCENTE | Alta Cucina Contemporanea — Milano"
        description={lang === 'it' ? 'Ristorante stellato Michelin a Milano. Via Monte Napoleone, 14. Chef Vincenzo Moretti. 28 coperti. Prenotazioni aperte 30 giorni in anticipo.' : lang === 'en' ? 'Michelin-starred restaurant in Milan. Via Monte Napoleone, 14. Chef Vincenzo Moretti. 28 covers. Reservations open 30 days in advance.' : "Restaurant doublement étoilé Michelin à Milan. Via Monte Napoleone, 14. Chef Vincenzo Moretti. 28 couverts. Réservations ouvertes 30 jours à l'avance."}
        image="/images/hero-dish.webp"
        path="/"
        schema={homeSchema}
      />
      
      {/* =========================================================================
          SECTION 01: CINEMATIC HERO
          ========================================================================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20 bg-nero">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hero-dish.webp"
            alt="LUCENTE — Alta Cucina Contemporanea Milano"
            className={`w-full h-full object-cover object-center filter brightness-[0.45] contrast-110 transition-all duration-[2200ms] ease-out ${
              heroLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/60 to-nero/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,94,0.12)_0%,rgba(16,16,14,0.95)_80%)]" />
          <div className="absolute inset-0 bg-noise opacity-35" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          
          {/* Michelin Badge */}
          <div className={`inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-surface/90 border border-or-subtle shadow-2xl mb-8 transition-all duration-1000 delay-300 ${
            heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}>
            <Award className="w-3.5 h-3.5 text-or" />
            <span className="typo-eyebrow text-[10px] text-ivoire">
              GUIDA MICHELIN 2026 · DUE STELLE
            </span>
          </div>

          <h1 className={`typo-h1 text-5xl sm:text-7xl md:text-8xl lg:text-9xl mb-4 tracking-[0.18em] transition-all duration-1000 delay-500 ${
            heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            LUCENTE
          </h1>

          <p className={`typo-h2 text-xl sm:text-2xl md:text-3xl font-light text-ivoire/90 uppercase tracking-[0.25em] mb-4 transition-all duration-1000 delay-700 ${
            heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            ALTA CUCINA CONTEMPORANEA
          </p>

          <p className={`typo-eyebrow text-[11px] text-or/90 tracking-[0.35em] mb-12 transition-all duration-1000 delay-900 ${
            heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            MILANO · VIA MONTE NAPOLEONE 14
          </p>

          <div className={`flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 transition-all duration-1000 delay-1000 ${
            heroLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}>
            <button
              onClick={() => onOpenBooking()}
              className="w-full sm:w-auto px-10 py-4 bg-or hover:bg-or-light text-nero hover:text-nero typo-cta text-xs shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {lang === 'it' ? 'PRENOTA UN TAVOLO' : lang === 'en' ? 'RESERVE A TABLE' : 'RÉSERVER UNE TABLE'}
            </button>
            <Link
              to="/cuisine"
              className="w-full sm:w-auto px-10 py-4 border border-or-subtle hover:border-or bg-surface/80 hover:bg-surface-elevated text-ivoire typo-cta text-xs transition-all duration-300 text-center"
            >
              {lang === 'it' ? 'SCOPRI LA CUCINA' : lang === 'en' ? 'DISCOVER OUR CUISINE' : 'DÉCOUVRIR LA CUISINE'}
            </Link>
          </div>

          <div
            onClick={scrollToPhilosophy}
            className="mt-16 animate-bounce cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          >
            <ChevronDown className="w-5 h-5 text-or" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 02: PHILOSOPHY (EDITORIAL SPLIT)
          ========================================================================= */}
      <section id="philosophy-section" className="py-32 bg-nero border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Photography */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded overflow-hidden border border-or-subtle shadow-2xl">
                <img
                  src="/images/truffle-harvest.webp"
                  alt="Récolte de truffe blanche — Langhe, Piémont"
                  className="w-full h-[420px] sm:h-[500px] object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="typo-eyebrow text-or text-[9px]">Langhe, Piemonte · {lang === 'it' ? "Raccolta all'alba" : lang === 'en' ? "Dawn harvest" : "Récolte à l'aube"}</p>
                  <p className="font-serif-luxury text-xl text-ivoire italic">Tuber Magnatum Pico</p>
                </div>
              </div>
              <div className="hidden sm:block absolute -bottom-4 -left-4 w-28 h-28 border-l border-b border-or/40 pointer-events-none" />
            </div>

            {/* Right: Manifesto */}
            <div className="lg:col-span-7 space-y-8 lg:pl-6">
              <span className="typo-eyebrow text-or block">
                {lang === 'it' ? 'Capitolo I · Filosofia' : lang === 'en' ? 'Chapter I · Philosophy' : 'Capitolo I · Philosophie'}
              </span>
              
              <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-ivoire font-light leading-tight">
                {lang === 'it' ? (
                  <>« Una cucina italiana<br /><span className="italic text-or">senza nostalgia. »</span></>
                ) : lang === 'en' ? (
                  <>« An Italian cuisine<br /><span className="italic text-or">without nostalgia. »</span></>
                ) : (
                  <>« Une cuisine italienne<br /><span className="italic text-or">sans nostalgie. »</span></>
                )}
              </h2>

              <p className="typo-body text-base sm:text-lg leading-relaxed text-muted">
                {lang === 'it'
                  ? "Vincenzo Moretti non ha aperto LUCENTE per ricordarvi una trattoria dell'infanzia. L'ha aperto per mostrare cosa diventa la cucina italiana quando la si spoglia di ogni artificio."
                  : lang === 'en'
                  ? "Vincenzo Moretti did not open LUCENTE to remind you of a childhood trattoria. He opened it to show what Italian cuisine becomes when stripped of all disguise."
                  : "Vincenzo Moretti n'a pas ouvert LUCENTE pour vous rappeler une trattoria de votre enfance. Il l'a ouvert pour vous montrer ce que la cuisine italienne devient quand on la débarrasse de tout ce qui la couvre."}
              </p>

              <p className="typo-body text-sm sm:text-base leading-relaxed text-muted">
                {lang === 'it'
                  ? "42 produttori. Nessun supermercato. Ogni prodotto ha un nome, un indirizzo, una stagione. La carta cambia quando cambia la terra."
                  : lang === 'en'
                  ? "42 producers. No supermarket. Every product has a name, an address, a season. The menu changes when the earth changes."
                  : "42 producteurs. Pas un supermarché. Chaque produit a un nom, une adresse, une saison. La carte change quand la terre change — pas quand l'imprimeur passe."}
              </p>

              <div className="pt-4 flex items-center space-x-6">
                <Link
                  to="/story"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-or hover:text-ivoire font-semibold transition-colors"
                >
                  <span>{lang === 'it' ? 'Leggi la Storia della Casa' : lang === 'en' ? 'Read the House Story' : "Lire l'Histoire de la Maison"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 03: THE CUISINE (3 PILLARS)
          ========================================================================= */}
      <section className="py-32 bg-surface border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <p className="typo-eyebrow text-or">
              {lang === 'it' ? 'Capitolo II · Tre Impegni' : lang === 'en' ? 'Chapter II · Three Commitments' : 'Capitolo II · Trois Engagements'}
            </p>
            <h2 className="typo-h2 text-3xl sm:text-5xl">
              {lang === 'it' ? 'Ciò che non cambia mai.' : lang === 'en' ? 'What never changes.' : 'Ce qui ne change pas.'}
            </h2>
            <div className="w-16 h-[1px] bg-or mx-auto mt-4" />
            <p className="typo-body text-sm max-w-xl mx-auto text-muted">
              {lang === 'it'
                ? 'La carta evolve ogni settimana. Questi tre principi, mai.'
                : lang === 'en'
                ? 'The menu evolves every week. These three principles, never.'
                : 'La carte évolue chaque semaine. Ces trois principes, jamais.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 1. ORIGIN */}
            <div className="group bg-nero border border-white/5 hover:border-or/40 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/truffle-harvest.webp"
                  alt="Producteurs artisans — Piémont"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px] rounded">
                  01. {lang === 'it' ? 'ORIGINE' : lang === 'en' ? 'ORIGIN' : 'ORIGINE'}
                </span>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="typo-h3 text-2xl text-ivoire group-hover:text-or transition-colors">
                  Radici & Terroirs
                </h3>
                <p className="typo-body text-xs leading-relaxed text-muted">
                  {lang === 'it'
                    ? "42 produttori italiani. Ognuno con un nome. Vincenzo Moretti fa loro visita personalmente."
                    : lang === 'en'
                    ? "42 Italian producers. Each with a name, not a barcode. Vincenzo Moretti visits them in person."
                    : "42 producteurs italiens. Chacun a un nom, pas un code EAN. Vincenzo Moretti leur rend visite — il ne leur passe pas de commande par mail."}
                </p>
              </div>
            </div>

            {/* 2. CRAFT */}
            <div className="group bg-nero border border-white/5 hover:border-or/40 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/chef-craft.webp"
                  alt="Technique culinaire — Brigade LUCENTE"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px] rounded">
                  02. {lang === 'it' ? 'TECNICA' : lang === 'en' ? 'TECHNIQUE' : 'TECHNIQUE'}
                </span>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="typo-h3 text-2xl text-ivoire group-hover:text-or transition-colors">
                  Mestiere & Precisione
                </h3>
                <p className="typo-body text-xs leading-relaxed text-muted">
                  {lang === 'it'
                    ? "14 cuochi. Ogni gesto ripetuto fino a diventare invisibile. L'ospite percepisce solo il risultato."
                    : lang === 'en'
                    ? "14 chefs. Every gesture repeated until invisible. The guest only experiences the result."
                    : "14 cuisiniers. Chaque geste répété jusqu'à ce qu'il devienne invisible. Le client ne devrait jamais voir l'effort — seulement sentir le résultat."}
                </p>
              </div>
            </div>

            {/* 3. SEASON */}
            <div className="group bg-nero border border-white/5 hover:border-or/40 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  src="/images/tomato-saffron.webp"
                  alt="Saisonnalité — Tomate & Safran"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px] rounded">
                  03. {lang === 'it' ? 'STAGIONE' : lang === 'en' ? 'SEASON' : 'SAISON'}
                </span>
              </div>
              <div className="p-8 space-y-3">
                <h3 className="typo-h3 text-2xl text-ivoire group-hover:text-or transition-colors">
                  Il Tempo Naturale
                </h3>
                <p className="typo-body text-xs leading-relaxed text-muted">
                  {lang === 'it'
                    ? "La carta cambia con i mercati. Quando il tartufo bianco è perfetto, è presente. Altrimenti, no."
                    : lang === 'en'
                    ? "The menu changes with the markets. When white truffle is exceptional, it is served. When not, it is not."
                    : "La carte change avec les marchés, pas avec les saisons au sens calendaire. Quand la truffe blanche est belle, elle est là. Quand elle ne l'est pas, elle n'y est pas."}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 04: SIGNATURE DISHES
          ========================================================================= */}
      <section className="py-32 bg-nero border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
            <div className="space-y-2">
              <span className="typo-eyebrow text-or">
                {lang === 'it' ? 'Capitolo III · Carta & Creazioni' : lang === 'en' ? 'Chapter III · Menu & Creations' : 'Capitolo III · Carte & Créations'}
              </span>
              <h2 className="typo-h2 text-3xl sm:text-5xl">
                {lang === 'it' ? (
                  <>Alcuni piatti.<br />Per iniziare.</>
                ) : lang === 'en' ? (
                  <>Signature dishes.<br />To begin.</>
                ) : (
                  <>Quelques plats.<br />Pour commencer.</>
                )}
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-or hover:text-ivoire font-semibold transition-colors"
            >
              <span>{lang === 'it' ? 'Vedi i Menu Degustazione' : lang === 'en' ? 'View Tasting Menus' : 'Voir les Menus Dégustation'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Interactive Dish List */}
            <div className="lg:col-span-6 divide-y divide-white/10 space-y-4">
              {signatureDishes.map((dish, idx) => {
                const isActive = idx === activeDishIndex;
                return (
                  <div
                    key={dish.id}
                    onMouseEnter={() => setActiveDishIndex(idx)}
                    onClick={() => setActiveDishIndex(idx)}
                    className={`pt-4 first:pt-0 cursor-pointer transition-all duration-300 group ${
                      isActive ? 'opacity-100 pl-4 border-l-2 border-or' : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="space-y-1">
                        <span className="typo-metadata text-[10px] text-or font-mono">{dish.tag}</span>
                        <h3 className={`font-serif-luxury text-xl sm:text-2xl transition-colors ${
                          isActive ? 'text-ivoire font-medium' : 'text-muted group-hover:text-ivoire'
                        }`}>
                          {dish.name}
                        </h3>
                        <p className="typo-caption text-xs text-muted/90">{dish.subtitle}</p>
                      </div>
                      <span className="typo-prix text-xl text-or ml-4 flex-shrink-0">{dish.price}</span>
                    </div>

                    {isActive && (
                      <div className="mt-3 space-y-2 text-xs text-muted animate-fadeIn">
                        <p>{dish.description}</p>
                        <p className="text-[11px] text-or/90 italic">
                          {lang === 'it' ? 'Abbinamento consigliato: ' : lang === 'en' ? 'Recommended pairing: ' : 'Accord conseillé : '}
                          {dish.pairing}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Active Dish Photo */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-lg overflow-hidden border border-or-subtle shadow-2xl aspect-[4/3]">
                <img
                  src={activeDish.image}
                  alt={activeDish.name}
                  className="w-full h-full object-cover object-center filter brightness-95 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="typo-eyebrow text-or text-[9px]">{activeDish.tag}</span>
                    <p className="font-serif-luxury text-2xl text-ivoire">{activeDish.name}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 05: CHEF PORTRAIT
          ========================================================================= */}
      <section className="py-32 bg-surface border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Chef Portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden border border-or-subtle shadow-2xl">
                <img
                  src="/images/chef-portrait.webp"
                  alt="Chef Vincenzo Moretti — LUCENTE Milano"
                  className="w-full h-[480px] object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6">
                  <span className="typo-eyebrow text-or text-[9px]">
                    {lang === 'it' ? 'Chef Esecutivo & Proprietario' : lang === 'en' ? 'Executive Chef & Owner' : 'Chef Exécutif & Propriétaire'}
                  </span>
                  <p className="font-serif-luxury text-2xl text-ivoire">Vincenzo Moretti</p>
                </div>
              </div>
            </div>

            {/* Right: Bio & Quote */}
            <div className="lg:col-span-7 space-y-6 lg:pl-6">
              <span className="typo-eyebrow text-or">
                {lang === 'it' ? 'Capitolo IV · La Direzione Culinaria' : lang === 'en' ? 'Chapter IV · Culinary Leadership' : 'Capitolo IV · La Direction Culinaire'}
              </span>
              
              <h2 className="font-serif-luxury text-3xl sm:text-5xl text-ivoire font-light leading-tight">
                « {typeof restaurantInfo.chef.quote === 'object' ? (restaurantInfo.chef.quote[lang] || restaurantInfo.chef.quote.fr) : restaurantInfo.chef.quote} »
              </h2>

              <p className="typo-body text-base leading-relaxed text-muted">
                {typeof restaurantInfo.chef.bio === 'object' ? (restaurantInfo.chef.bio[lang] || restaurantInfo.chef.bio.fr) : restaurantInfo.chef.bio}
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/10">
                <Link
                  to="/story"
                  className="px-8 py-3.5 bg-or hover:bg-or-light text-nero hover:text-nero typo-cta text-xs transition-all shadow-lg"
                >
                  {lang === 'it' ? 'LA SUA STORIA' : lang === 'en' ? 'HIS STORY' : 'SON HISTOIRE'}
                </Link>

                <div className="flex items-center space-x-3">
                  <Feather className="w-4 h-4 text-or" />
                  <span className="font-serif-luxury text-2xl text-or italic">Vincenzo Moretti</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 06: DINING ROOM
          ========================================================================= */}
      <section className="py-32 bg-nero border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="typo-eyebrow text-or">
              {lang === 'it' ? "Capitolo V · L'Ambiente" : lang === 'en' ? 'Chapter V · The Space' : "Capitolo V · L'Ambiente"}
            </span>
            <h2 className="typo-h2 text-3xl sm:text-5xl">
              {lang === 'it' ? '28 coperti. Non uno di più.' : lang === 'en' ? '28 covers. Not one more.' : '28 couverts. Pas un de plus.'}
            </h2>
            <p className="typo-body text-sm max-w-xl mx-auto text-muted">
              {lang === 'it'
                ? "Pietra lavica, noce canaletto, luce all'altezza perfetta. Due tavoli non si disturbano mai."
                : lang === 'en'
                ? "Lava stone, Canaletto walnut, precise lighting. Two tables never overhear nor see each other."
                : "Pierre de lave, noyer canaletto, lumière à la bonne hauteur. L'architecte a conçu la salle pour que deux tablées ne s'entendent jamais — ni ne se voient."}
            </p>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-or-subtle shadow-2xl group">
            <img
              src="/images/dining-room.webp"
              alt="La Sala Chiaroscuro — LUCENTE Milano"
              className="w-full h-80 sm:h-[480px] lg:h-[550px] object-cover object-center filter brightness-90 group-hover:scale-102 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-nero/20" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="typo-eyebrow text-or text-[9px]">Via Monte Napoleone 14, Milano</span>
                <p className="font-serif-luxury text-2xl text-ivoire">La Sala Chiaroscuro · La Cantina Segreta</p>
                <p className="typo-caption text-muted">
                  {lang === 'it' ? 'Acustica soffusa · 28 coperti esclusivi' : lang === 'en' ? 'Subdued acoustics · 28 exclusive covers' : 'Acoustique feutrée · 28 couverts exclusifs'}
                </p>
              </div>
              <Link
                to="/private-dining"
                className="px-6 py-3 border border-or-subtle hover:border-or bg-nero/80 text-ivoire typo-cta text-xs transition-all"
              >
                {lang === 'it' ? 'SALE PRIVATE' : lang === 'en' ? 'PRIVATE ROOMS' : 'SALONS PRIVÉS'}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 07: JOURNAL
          ========================================================================= */}
      <section className="py-32 bg-surface border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-6">
            <div className="space-y-2">
              <span className="typo-eyebrow text-or">
                {lang === 'it' ? 'Capitolo VI · Pubblicazioni' : lang === 'en' ? 'Chapter VI · Publications' : 'Capitolo VI · Publications'}
              </span>
              <h2 className="typo-h2 text-3xl sm:text-5xl">
                {lang === 'it' ? 'Il Giornale della Casa' : lang === 'en' ? 'The House Journal' : 'Le Journal de la Maison'}
              </h2>
            </div>
            <Link
              to="/journal"
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-or hover:text-ivoire font-semibold transition-colors"
            >
              <span>{lang === 'it' ? 'Tutte le Cronache' : lang === 'en' ? 'All Chronicles' : 'Toutes les Chroniques'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {journalArticles.map((art) => (
              <Link
                key={art.slug}
                to={`/journal/${art.slug}`}
                className="group bg-nero border border-white/5 hover:border-or/40 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl"
              >
                <div>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-nero/90 border border-or-subtle text-or typo-eyebrow text-[9px] rounded">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center space-x-2 typo-metadata text-[10px] text-muted">
                      <span>{art.date}</span>
                      <span>·</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="font-serif-luxury text-xl text-ivoire group-hover:text-or transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="typo-body text-xs text-muted leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center space-x-1.5 text-xs uppercase tracking-wider text-or font-semibold group-hover:translate-x-1 transition-transform">
                  <span>{lang === 'it' ? 'Leggi' : lang === 'en' ? 'Read' : 'Lire'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 08: RESERVATION CTA
          ========================================================================= */}
      <section className="py-36 bg-nero border-t border-white/5 relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-or/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-8">
          <span className="typo-eyebrow text-or text-[10px]">
            {lang === 'it' ? 'Martedì al Sabato · 28 Coperti' : lang === 'en' ? 'Tuesday to Saturday · 28 Covers' : 'Mardi au Samedi · 28 Couverts'}
          </span>

          <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-ivoire font-light leading-tight">
            {lang === 'it' ? 'La vostra tavola vi attende.' : lang === 'en' ? 'Your table is waiting.' : 'Votre table vous attend.'}
          </h2>

          <p className="typo-body text-base sm:text-lg text-muted max-w-xl mx-auto font-light leading-relaxed">
            {lang === 'it'
              ? 'Le prenotazioni aprono con 30 giorni di anticipo, a mezzanotte. Via Monte Napoleone, 14 — Milano.'
              : lang === 'en'
              ? 'Reservations open 30 days in advance, at midnight. Via Monte Napoleone, 14 — Milan.'
              : "Les réservations ouvrent 30 jours à l'avance, à minuit. Via Monte Napoleone, 14 — Milan."}
          </p>

          <div className="pt-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-12 py-5 bg-or hover:bg-or-light text-nero hover:text-nero typo-cta text-sm shadow-2xl transition-all duration-300 hover:scale-105"
            >
              {lang === 'it' ? 'PRENOTA UN TAVOLO' : lang === 'en' ? 'RESERVE A TABLE' : 'RÉSERVER UNE TABLE'}
            </button>
          </div>

          <p className="typo-caption text-xs text-muted pt-4">
            {lang === 'it'
              ? 'Concierge: +39 02 8945 7700 · Servizio valet parking disponibile'
              : lang === 'en'
              ? 'Concierge: +39 02 8945 7700 · Valet parking available'
              : 'Conciergerie : +39 02 8945 7700 · Service voiturier disponible'}
          </p>
        </div>
      </section>

    </div>
  );
}
