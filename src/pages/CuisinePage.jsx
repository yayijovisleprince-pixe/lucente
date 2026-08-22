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

        {/* Seasonality Navigator */}
        <section className="bg-surface p-8 sm:p-12 border border-white/10 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-or">{t('cuisine.seasonsEyebrow')}</span>
              <h2 className="font-serif text-3xl text-ivoire">
                {lang === 'it' ? 'Quattro micro-stagioni.' : lang === 'en' ? 'Four micro-seasons.' : 'Quatre micro-saisons.'}<br />
                {lang === 'it' ? 'Una sola regola: la carta segue la terra.' : lang === 'en' ? 'One rule: the menu follows the earth.' : 'Une seule règle : la carte suit la terre.'}
              </h2>
            </div>
            <div className="w-full sm:w-auto grid grid-cols-4 sm:flex bg-nero p-1 border border-white/10 rounded-none">
              {[
                { key: 'spring', label: lang === 'it' ? 'Primavera' : lang === 'en' ? 'Spring' : 'Printemps' },
                { key: 'summer', label: lang === 'it' ? 'Estate' : lang === 'en' ? 'Summer' : 'Été' },
                { key: 'autumn', label: lang === 'it' ? 'Autunno' : lang === 'en' ? 'Autumn' : 'Automne' },
                { key: 'winter', label: lang === 'it' ? 'Inverno' : lang === 'en' ? 'Winter' : 'Hiver' },
              ].map((season) => (
                <button
                  key={season.key}
                  onClick={() => setActiveSeason(season.key)}
                  className={`px-2 sm:px-4 py-2.5 text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest font-semibold transition-all text-center flex items-center justify-center ${
                    activeSeason === season.key ? 'bg-or text-nero shadow-lg' : 'text-muted hover:text-ivoire'
                  }`}
                >
                  {season.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <h3 className="font-serif text-2xl text-ivoire">{currentSeason.name}</h3>
              <p className="text-xs text-or font-mono tracking-wider italic">{currentSeason.subtitle}</p>
              <p className="text-sm text-muted leading-relaxed font-sans">{currentSeason.description}</p>
            </div>
            <div className="lg:col-span-6 bg-nero p-6 border border-white/5 space-y-3">
              <span className="text-[10px] uppercase font-mono text-muted tracking-widest">
                {lang === 'it' ? 'Creazioni di Stagione' : lang === 'en' ? 'Seasonal Creations' : 'Créations de Saison'}
              </span>
              <ul className="space-y-2">
                {currentSeason.dishes.map((dish, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-ivoire font-serif">
                    <span className="text-or">✦</span>
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
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
