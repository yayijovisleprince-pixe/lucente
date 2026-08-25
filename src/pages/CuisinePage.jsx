import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Utensils, Flame, Droplet, Wine, ArrowRight, Sun, Leaf, Snowflake, Compass, Feather } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function CuisinePage({ onOpenBooking, onSelectMenuForBooking }) {
  const [activeSeason, setActiveSeason] = useState('autumn');
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);
  const [activePairingType, setActivePairingType] = useState('harmony');
  const { lang, t } = useLanguage();

  const seasonsData = {
    spring: {
      name: t('cuisine.spring.name'),
      subtitle: t('cuisine.spring.subtitle'),
      description: t('cuisine.spring.description'),
      dishes: t('cuisine.spring.dishes'),
    },
    summer: {
      name: t('cuisine.summer.name'),
      subtitle: t('cuisine.summer.subtitle'),
      description: t('cuisine.summer.description'),
      dishes: t('cuisine.summer.dishes'),
    },
    autumn: {
      name: t('cuisine.autumn.name'),
      subtitle: t('cuisine.autumn.subtitle'),
      description: t('cuisine.autumn.description'),
      dishes: t('cuisine.autumn.dishes'),
    },
    winter: {
      name: t('cuisine.winter.name'),
      subtitle: t('cuisine.winter.subtitle'),
      description: t('cuisine.winter.description'),
      dishes: t('cuisine.winter.dishes'),
    },
  };

  const currentSeason = seasonsData[activeSeason];

  const ingredients = [
    {
      id: 'truffle',
      name: lang === 'it' ? "Tartufo Bianco d'Alba" : lang === 'en' ? "Alba White Truffle" : "Truffe Blanche d'Alba",
      italianName: 'Tuber Magnatum Pico',
      region: lang === 'it' ? "Colline delle Langhe, Piemonte" : lang === 'en' ? "Langhe Hills, Piedmont" : "Collines des Langhe, Piémont",
      season: lang === 'it' ? "Ottobre — Dicembre" : lang === 'en' ? "October — December" : "Octobre — Décembre",
      image: '/images/truffle-harvest.webp',
      philosophy: lang === 'it'
        ? "Un cavatore esclusivo lo raccoglie prima dell'alba nella nebbia delle Langhe. Non viene mai riscaldato. Lo grattugiamo al minuto in sala, su un piatto caldo, affinché il profumo si sprigioni davanti a voi."
        : lang === 'en'
        ? "An exclusive truffle hunter forages before dawn in the Langhe fog. Never cooked or reheated. Shaved tableside over steaming pasta or risotto so the aroma blooms right before your eyes."
        : "Un cavatore exclusif la récolte avant l'aube dans le brouillard des Langhe. Elle n'est jamais chauffée ici. On la râpe minute en salle, sur un féculent chaud, pour que le parfum s'exhale devant vous — pas en cuisine, dans l'obscurité."
    },
    {
      id: 'prawn',
      name: lang === 'it' ? "Gambero Rosso di Mazara del Vallo" : lang === 'en' ? "Mazara del Vallo Red Prawn" : "Gambero Rosso de Mazara del Vallo",
      italianName: 'Gambero Rosso di Mazara',
      region: lang === 'it' ? "Canale di Sicilia · 700m di profondità" : lang === 'en' ? "Strait of Sicily · 700m depth" : "Détroit de Sicile · 700m de profondeur",
      season: lang === 'it' ? "Pesca di Primavera & Estate" : lang === 'en' ? "Spring & Summer Catch" : "Pêche de Printemps & Été",
      image: '/images/prawn-dish.webp',
      philosophy: lang === 'it'
        ? "Pescato a 700 metri, dove non c'è luce. La sua polpa vanta una dolcezza e una mineralità incomparabili. Lo serviamo crudo a 12°C con stracciatella affumicata e gel di bergamotto."
        : lang === 'en'
        ? "Fished at 700 meters, where no light reaches. Its flesh possesses peerless natural sweetness and mineral depth. Served raw at precisely 12°C with smoked stracciatella and wild bergamot gel."
        : "Pêchée à 700 mètres, là où il n'y a pas de lumière. Sa chair est d'une sucrosité et d'une minéralité incomparables. Nous la servons crue, à 12°C exactement — avec une stracciatella fumée et un gel de bergamote. Trois éléments. Pas quatre."
    },
    {
      id: 'tomato-saffron',
      name: lang === 'it' ? "Pomodoro San Marzano & Zafferano Toscano" : lang === 'en' ? "San Marzano Tomato & Tuscan Saffron" : "Tomate San Marzano & Safran de Toscane",
      italianName: 'Essenza di Pomodoro & Zafferano',
      region: lang === 'it' ? "Vesuvio & San Gimignano" : lang === 'en' ? "Vesuvius & San Gimignano" : "Vésuve & San Gimignano",
      season: lang === 'it' ? "Raccolta di Mezza Estate" : lang === 'en' ? "Mid-Summer Harvest" : "Récolte mi-été",
      image: '/images/tomato-saffron.webp',
      philosophy: lang === 'it'
        ? "Centrifugazione a freddo: niente calore, niente amarezza. Ciò che resta è un brodo limpido, dorato, infuso a freddo per 24 ore con pistilli di zafferano toscano."
        : lang === 'en'
        ? "Cold clarification: no heat, no bitterness. What remains is a pure, golden nectar, cold-infused for 24 hours with Tuscan saffron pistils."
        : "Centrifugation à froid : pas de chaleur, pas d'amertume. Ce qui reste est un bouillon translucide, doré, infusé à froid pendant 24 heures aux pistils de safran de Toscane. La clarté comme principe."
    },
    {
      id: 'carnaroli',
      name: lang === 'it' ? "Riso Carnaroli Riserva · 7 Anni" : lang === 'en' ? "Carnaroli Riserva Rice · 7 Years" : "Riz Carnaroli Riserva · 7 Ans",
      italianName: 'Riso Carnaroli Invecchiato 7 Anni',
      region: lang === 'it' ? "Pianure di Vercelli, Piemonte" : lang === 'en' ? "Vercelli Plains, Piedmont" : "Plaines de Vercelli, Piémont",
      season: lang === 'it' ? "84 mesi in silos refrigerati" : lang === 'en' ? "84 months in chilled silos" : "84 mois en silos froids",
      image: '/images/pasta-caviar.webp',
      philosophy: lang === 'it'
        ? "La pazienza trasforma il chicco. Sette anni di lenta essiccazione cristallizzano l'amido — il chicco assorbe di più senza sfaldarsi mai."
        : lang === 'en'
        ? "Patience transforms the grain. Seven years of slow aging crystallize the starch — the grain absorbs richer reductions without ever breaking down."
        : "La patience transforme le grain. Sept ans de séchage lent cristallisent l'amidon — le grain absorbe davantage, sans se briser. Ce risotto ne déborde pas. Il tient. Et il continue de tenir deux minutes après le service."
    },
    {
      id: 'chianina',
      name: lang === 'it' ? "Manzo Chianina IGP · Val di Chiana" : lang === 'en' ? "Chianina Beef PGI · Val di Chiana" : "Bœuf Chianina IGP · Val di Chiana",
      italianName: 'Razza Chianina IGP',
      region: lang === 'it' ? "Val di Chiana, Toscana" : lang === 'en' ? "Val di Chiana, Tuscany" : "Val di Chiana, Toscane",
      season: lang === 'it' ? "Frollatura 45 giorni sotto fieno" : lang === 'en' ? "45-day hay dry-aging" : "Maturation 45 jours sous foin",
      image: '/images/hero-dish.webp',
      philosophy: lang === 'it'
        ? "La razza bovina bianca toscana più antica d'Europa. Scottata su tralci di vite secchi: esterno croccante e cuore rosso vellutato. L'aceto balsamico di Modena 25 anni arriva come tocco finale."
        : lang === 'en'
        ? "The noble white Tuscan cattle, the oldest in Europe. Seared over dry vine shoots: caramelized exterior with a velvety red heart, touched by a single drop of 25-year Modena balsamic."
        : "La race bovine blanche de Toscane, la plus ancienne d'Europe. Saisie sur sarments de vigne secs — l'extérieur se caramélise sous la fumée de bois, le cœur reste rouge et velouté. Le balsamique de Modène, 25 ans d'âge, arrive en dernier. Une seule goutte."
    }
  ];

  const activeIngredient = ingredients[activeIngredientIndex];

  const cuisineSchema = {
    '@type': 'AboutPage',
    '@id': 'https://lucente-milano.com/cuisine#about',
    'name': 'Philosophie Culinaire, Saisons & Terroirs | LUCENTE Milano',
    'description': 'Le Chiaroscuro culinaire de Vincenzo Moretti : 42 producteurs italiens, 4 micro-saisons, ingrédients rares et rigueur technique de haute gastronomie.',
    'url': 'https://lucente-milano.com/cuisine',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Cuisine & Terroirs', 'item': 'https://lucente-milano.com/cuisine' }
      ]
    }
  };

  return (
    <div className="bg-nero text-ivoire min-h-screen pt-32 pb-24">
      <SEOHead
        title={lang === 'it' ? 'La Cucina, Filosofia & Stagioni | LUCENTE — Milano' : lang === 'en' ? 'The Cuisine, Philosophy & Seasons | LUCENTE — Milano' : 'La Cuisine, Philosophie & Saisons | LUCENTE — Milano'}
        description={lang === 'it' ? "42 produttori italiani. 4 micro-stagioni. Il tartufo bianco d'Alba grattugiato al momento. Il gambero rosso a 700m di profondità. La cucina di Vincenzo Moretti a Milano." : lang === 'en' ? "42 Italian producers. 4 micro-seasons. White truffle from Alba grated tableside. Red prawn from 700m depth. The cuisine of Vincenzo Moretti in Milan." : "42 producteurs italiens. 4 micro-saisons. La truffe blanche d'Alba râpée minute. La crevette rouge à 700m de profondeur. La cuisine de Vincenzo Moretti à Milan."}
        image="/images/hero-dish.webp"
        path="/cuisine"
        schema={cuisineSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="typo-eyebrow text-or block">{t('cuisine.eyebrow')}</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-ivoire font-light leading-tight">
            {t('cuisine.heroTitle1')}<br />
            <span className="italic text-or">{t('cuisine.heroTitle2')}</span>
          </h1>
          <div className="w-16 h-[1px] bg-or mx-auto mt-4" />
          <p className="typo-body text-base sm:text-lg text-muted max-w-xl mx-auto pt-2 font-light">
            {t('cuisine.heroSubtitle')}
          </p>
        </div>

        {/* =========================================================================
            SEASONALITY SECTION (Spacious & Breathable 4 Seasons Architecture)
           ========================================================================= */}
        <section className="space-y-10 sm:space-y-12">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs uppercase font-mono tracking-widest text-or font-semibold block">
              {t('cuisine.seasonsEyebrow')} · {lang === 'it' ? '4 Micro-Stagioni' : lang === 'en' ? '4 Micro-Seasons' : '4 Micro-Saisons'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivoire leading-tight">
              {lang === 'it' ? 'La carta segue la terra.' : lang === 'en' ? 'The menu follows the earth.' : 'La carte suit la terre.'}<br />
              <span className="italic text-or">{lang === 'it' ? 'Quattro atti all’anno.' : lang === 'en' ? 'Four acts a year.' : 'Quatre actes par an.'}</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto font-serif italic pt-1">
              {lang === 'it'
                ? "A LUCENTE nessun piatto arriva prima della sua stagione. Nessuno resta dopo."
                : lang === 'en'
                ? "At LUCENTE no dish arrives before its season. None lingers after."
                : "À LUCENTE, aucun plat n'arrive avant sa saison. Aucun ne reste après."}
            </p>
          </div>

          {/* 4 Spacious Seasonal Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { 
                key: 'spring', 
                icon: Leaf, 
                roman: 'I', 
                label: lang === 'it' ? 'Primavera' : lang === 'en' ? 'Spring' : 'Printemps',
                period: lang === 'it' ? 'Marzo — Maggio' : lang === 'en' ? 'March — May' : 'Mars — Mai',
                theme: lang === 'it' ? 'Erbe selvatiche & Adriatico' : lang === 'en' ? 'Wild herbs & Adriatic' : 'Herbes sauvages & Adriatique'
              },
              { 
                key: 'summer', 
                icon: Sun, 
                roman: 'II', 
                label: lang === 'it' ? 'Estate' : lang === 'en' ? 'Summer' : 'Été',
                period: lang === 'it' ? 'Giugno — Agosto' : lang === 'en' ? 'June — August' : 'Juin — Août',
                theme: lang === 'it' ? 'Sole, sale & Gambero Rosso' : lang === 'en' ? 'Sun, salt & Red Prawn' : 'Soleil, sel & Gambero Rosso'
              },
              { 
                key: 'autumn', 
                icon: Sparkles, 
                roman: 'III', 
                label: lang === 'it' ? 'Autunno' : lang === 'en' ? 'Autumn' : 'Automne',
                period: lang === 'it' ? 'Settembre — Novembre' : lang === 'en' ? 'September — November' : 'Septembre — Novembre',
                theme: lang === 'it' ? 'Tartufo Bianco & Nebbie' : lang === 'en' ? 'White Truffle & Fog' : 'Truffe Blanche & Brumes'
              },
              { 
                key: 'winter', 
                icon: Snowflake, 
                roman: 'IV', 
                label: lang === 'it' ? 'Inverno' : lang === 'en' ? 'Winter' : 'Hiver',
                period: lang === 'it' ? 'Dicembre — Febbraio' : lang === 'en' ? 'December — February' : 'Décembre — Février',
                theme: lang === 'it' ? 'Braise, caccia & Barolo' : lang === 'en' ? 'Embers, game & Barolo' : 'Braises, gibier & Barolo'
              },
            ].map((s) => {
              const isSelected = activeSeason === s.key;
              const IconComp = s.icon;

              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSeason(s.key)}
                  className={`p-5 sm:p-6 text-left border transition-all duration-300 relative group flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-surface-elevated border-or ring-1 ring-or/40 shadow-[0_10px_30px_rgba(184,155,94,0.15)] scale-[1.01]'
                      : 'bg-surface border-white/10 hover:border-or/40 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-or px-2 py-0.5 bg-nero border border-or/20">
                        ACTE {s.roman}
                      </span>
                      <IconComp 
                        size={18} 
                        className={`transition-colors ${isSelected ? 'text-or' : 'text-muted group-hover:text-or'}`} 
                      />
                    </div>

                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl text-ivoire group-hover:text-or transition-colors">
                        {s.label}
                      </h3>
                      <span className="text-[11px] font-mono text-or/90 block mt-0.5">
                        {s.period}
                      </span>
                    </div>

                    <p className="text-xs text-muted font-sans leading-relaxed pt-1">
                      {s.theme}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between w-full">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted group-hover:text-ivoire transition-colors">
                      {isSelected 
                        ? (lang === 'it' ? '● Selezionata' : lang === 'en' ? '● Active' : '● Actuelle') 
                        : (lang === 'it' ? 'Esplora →' : lang === 'en' ? 'Explore →' : 'Découvrir →')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Season Grand Showcase Canvas */}
          <div className="bg-surface-elevated border border-or/30 p-6 sm:p-10 md:p-12 space-y-8 sm:space-y-10 shadow-2xl animate-fadeIn">
            
            {/* Header of Active Season */}
            <div className="space-y-3 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs uppercase font-mono text-or tracking-widest font-semibold px-2.5 py-1 bg-nero border border-or/30">
                  {currentSeason.name.split('·')[0].trim()}
                </span>
                <span className="text-xs text-muted font-mono">
                  {activeSeason === 'spring' && (lang === 'it' ? 'Marzo — Maggio' : lang === 'en' ? 'March — May' : 'Mars — Mai')}
                  {activeSeason === 'summer' && (lang === 'it' ? 'Giugno — Agosto' : lang === 'en' ? 'June — August' : 'Juin — Août')}
                  {activeSeason === 'autumn' && (lang === 'it' ? 'Settembre — Novembre' : lang === 'en' ? 'September — November' : 'Septembre — Novembre')}
                  {activeSeason === 'winter' && (lang === 'it' ? 'Dicembre — Febbraio' : lang === 'en' ? 'December — February' : 'Décembre — Février')}
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivoire font-light">
                {currentSeason.name}
              </h3>
              
              <p className="text-sm sm:text-base font-serif italic text-or/90 max-w-2xl leading-relaxed">
                « {currentSeason.subtitle} »
              </p>

              <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans max-w-3xl pt-2">
                {currentSeason.description}
              </p>
            </div>

            {/* 3 Spacious Signature Creation Cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono text-or tracking-widest font-semibold flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>{lang === 'it' ? 'Creazioni Signature di Stagione' : lang === 'en' ? 'Seasonal Signature Creations' : 'Créations Signature de Saison'}</span>
                </span>
                <span className="text-[11px] font-mono text-muted hidden sm:inline">
                  3 {lang === 'it' ? 'piatti d’autore' : lang === 'en' ? 'signature dishes' : 'créations d’orfèvre'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {currentSeason.dishes.map((dish, i) => (
                  <div 
                    key={i} 
                    className="p-5 sm:p-6 bg-nero/70 border border-white/10 hover:border-or/40 transition-all duration-300 space-y-3 group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-or font-semibold">
                          {lang === 'it' ? `Atto 0${i + 1}` : lang === 'en' ? `Act 0${i + 1}` : `Acte 0${i + 1}`}
                        </span>
                        <span className="text-or/60 group-hover:text-or transition-colors">✦</span>
                      </div>

                      <h4 className="font-serif text-lg text-ivoire group-hover:text-or transition-colors leading-snug">
                        {dish}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-muted">
                      <span>{lang === 'it' ? 'Cucina di ricerca' : lang === 'en' ? 'Haute cuisine' : 'Haute gastronomie'}</span>
                      <span className="text-or/80">LUCENTE</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom link to Menu */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-nero/40 p-4 sm:p-6 border border-white/5">
              <div className="text-center sm:text-left space-y-0.5">
                <span className="text-xs uppercase font-mono text-or tracking-widest">
                  {lang === 'it' ? 'Vivi l’Esperienza' : lang === 'en' ? 'Experience the Season' : 'Vivre la Saison'}
                </span>
                <p className="text-sm font-serif text-ivoire">
                  {lang === 'it' ? 'Scopri i percorsi degustazione del momento' : lang === 'en' ? 'Discover the tasting menus of the moment' : 'Découvrez les partitions dégustation du moment'}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-6 py-3 bg-surface border border-or text-or hover:bg-or hover:text-nero text-xs uppercase font-mono tracking-wider transition-all text-center"
                >
                  {lang === 'it' ? 'Consulta i Menu' : lang === 'en' ? 'View Menus' : 'Consulter les Menus'}
                </Link>
                <button
                  type="button"
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto px-6 py-3 bg-or text-nero font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all text-center shadow-lg whitespace-nowrap"
                >
                  {lang === 'it' ? 'Prenota' : lang === 'en' ? 'Book' : 'Réserver'}
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Selected Ingredients */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="typo-eyebrow text-or">
              {lang === 'it' ? 'Materie Prime' : lang === 'en' ? 'Raw Materials' : 'Matières Premières'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire">
              {lang === 'it' ? 'Cinque prodotti. Ognuno insostituibile.' : lang === 'en' ? 'Five products. Each irreplaceable.' : 'Cinq produits. Chacun irremplaçable.'}
            </h2>
            <p className="text-sm text-muted">
              {lang === 'it' ? 'Non sono ingredienti di prestigio, ma prodotti che nulla può sostituire.' : lang === 'en' ? 'Not prestige ingredients, but products nothing else can replace.' : "Ce ne sont pas des ingrédients de prestige. Ce sont des produits que rien d'autre ne peut remplacer."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {ingredients.map((ing, idx) => (
              <button
                key={ing.id}
                onClick={() => setActiveIngredientIndex(idx)}
                className={`p-4 text-left border transition-all ${
                  idx === activeIngredientIndex
                    ? 'bg-surface border-or text-ivoire'
                    : 'bg-surface/50 border-white/5 text-muted hover:text-ivoire hover:border-white/20'
                }`}
              >
                <p className="text-[10px] uppercase font-mono text-or">{ing.region.split(',')[0].split('·')[0].trim()}</p>
                <p className="font-serif text-sm truncate">{ing.name}</p>
              </button>
            ))}
          </div>

          <div className="bg-surface-elevated border border-white/10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
            <div className="lg:col-span-6 h-72 sm:h-96 overflow-hidden">
              <img
                src={activeIngredient.image}
                alt={activeIngredient.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs uppercase font-mono text-or tracking-widest">{activeIngredient.region} · {activeIngredient.season}</span>
              <h3 className="font-serif text-3xl text-ivoire">{activeIngredient.name}</h3>
              <p className="text-xs text-muted italic font-serif">« {activeIngredient.italianName} »</p>
              <p className="text-sm text-muted leading-relaxed font-sans">{activeIngredient.philosophy}</p>
            </div>
          </div>
        </section>

        {/* Accords section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-or">{t('cuisine.pairingsEyebrow')}</span>
              <h2 className="font-serif text-3xl text-ivoire">
                {lang === 'it' ? "L'accordo o il contrasto." : lang === 'en' ? 'Harmony or contrast.' : "L'accord ou le contraste."}
              </h2>
              <p className="text-sm text-muted mt-2">
                {lang === 'it'
                  ? 'Gianluca Ferri propone due filosofie di abbinamento. Scegliete la vostra.'
                  : lang === 'en'
                  ? 'Gianluca Ferri offers two pairing philosophies. Choose yours.'
                  : 'Gianluca Ferri propose deux philosophies d\'accord. Choisissez la vôtre.'}
              </p>
            </div>
          </div>
          <div className="flex justify-center gap-4">
            {['harmony', 'contrast'].map(type => (
              <button
                key={type}
                onClick={() => setActivePairingType(type)}
                className={`px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all border ${
                  activePairingType === type ? 'border-or bg-or/10 text-or' : 'border-white/10 text-muted hover:text-ivoire'
                }`}
              >
                {type === 'harmony'
                  ? (lang === 'it' ? "L'Eco · Armonia" : lang === 'en' ? 'The Echo · Harmony' : "L'Écho · Harmonie")
                  : (lang === 'it' ? 'La Tensione · Contrasto' : lang === 'en' ? 'The Tension · Contrast' : 'La Tension · Contraste')}
              </button>
            ))}
          </div>
          <div className="bg-surface p-8 sm:p-12 border border-or/30 max-w-4xl mx-auto">
            {activePairingType === 'harmony' ? (
              <div className="space-y-4 text-center">
                <Wine className="w-8 h-8 text-or mx-auto" />
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivoire">
                  {lang === 'it' ? "L'Eco dei Terroir" : lang === 'en' ? 'The Echo of Terroirs' : "L'Écho des Terroirs"}
                </h3>
                <p className="typo-body text-sm text-muted leading-relaxed max-w-2xl mx-auto">
                  {lang === 'it'
                    ? "Il risotto al tartufo bianco d'Alba chiama un Barolo Monprivato 2017. Sottobosco, rosa appassita, cuoio nobile. Il vino e il piatto parlano la stessa lingua."
                    : lang === 'en'
                    ? "White truffle risotto from Alba calls for a Barolo Monprivato 2017. Undergrowth, dried rose, noble leather. Wine and dish speak the same language."
                    : "Le risotto à la truffe blanche d'Alba appelle un Barolo Monprivato 2017. Sous-bois, rose fanée, cuir noble. Le vin et le plat parlent la même langue — et leur conversation est longue."}
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <Sparkles className="w-8 h-8 text-or mx-auto" />
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivoire">
                  {lang === 'it' ? 'La Tensione Minerale' : lang === 'en' ? 'Mineral Tension' : 'La Tension Minérale'}
                </h3>
                <p className="typo-body text-sm text-muted leading-relaxed max-w-2xl mx-auto">
                  {lang === 'it'
                    ? "Il Gambero Rosso crudo incontra un Etna Bianco Superiore vinificato in anfora. L'acidità vulcanica taglia la dolcezza del gambero. Non è un accordo — è un dialogo."
                    : lang === 'en'
                    ? "Raw Gambero Rosso meets an amphora-vinified Etna Bianco Superiore. Volcanic acidity cuts through the sweetness of the prawn. It is a genuine dialogue."
                    : "Le Gambero Rosso cru rencontre un Etna Bianco Superiore vinifié en amphore. L'acidité volcanique tranche la sucrosité de la crevette. La résonance saline dure quarante secondes. Ce n'est pas un accord — c'est un dialogue."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-surface border border-white/10 p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire">{t('cuisine.ctaTitle')}</h2>
          <p className="text-xs text-muted max-w-xl mx-auto">{t('cuisine.ctaText')}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-3.5 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all"
            >
              {t('cuisine.ctaReserve')}
            </button>
            <Link
              to="/menu"
              className="px-8 py-3.5 bg-nero text-ivoire border border-white/10 font-semibold text-xs uppercase tracking-widest hover:border-or hover:text-or transition-all"
            >
              {t('cuisine.ctaMenu')}
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
