import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Utensils, Flame, Droplet, Wine, ArrowRight, Sun, Leaf, Snowflake, Compass, Feather } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';

export default function CuisinePage({ onOpenBooking, onSelectMenuForBooking }) {
  const [activeSeason, setActiveSeason] = useState('autumn');
  const [activeIngredientIndex, setActiveIngredientIndex] = useState(0);
  const [activePairingType, setActivePairingType] = useState('harmony');

  const seasonsData = {
    spring: {
      name: 'Primavera · Printemps',
      subtitle: 'L\'éveil des herbes sauvages. La mer Adriatique avant les chaleurs.',
      description: 'Fèves jeunes du Latium, asperges sauvages des collines toscanes, petits encornets de l\'Adriatique. La carte s\'allège. Le goût, non.',
      dishes: ['Crudo di Seppia & Piselli Selvatici', 'Raviolini di Borragine & Ricotta d\'Alpeggio', 'Agnello da Latte ai Fiori di Zagara']
    },
    summer: {
      name: 'Estate · Été',
      subtitle: 'Sel. Soleil. Minéralité brute. Rien d\'autre.',
      description: 'Eau clarifiée de tomates San Marzano des flancs du Vésuve. Crevettes rouges de Mazara del Vallo crues, servies à 12°C. Cédrats d\'Amalfi. Oursins de roche volcanique.',
      dishes: ['Acqua di Pomodoro & Gambero Rosso', 'Spaghettone ai Ricci di Mare & Bottarga', 'Rombo Selvaggio nel Coccio d\'Amphora']
    },
    autumn: {
      name: 'Autunno · Automne',
      subtitle: 'Le brouillard du Piémont. La truffe blanche. La braise qui ne s\'éteint pas.',
      description: 'Les truffes blanches d\'Alba arrivent en octobre — râpées minute en salle, jamais chauffées. Le riz Carnaroli a attendu sept ans. Le bœuf Chianina, 45 jours sous foin.',
      dishes: ['Risotto al Tartufo Bianco & Oro', 'Filetto di Chianina al Fumo di Vite', 'Animelle Caramellate & Topinambur']
    },
    winter: {
      name: 'Inverno · Hiver',
      subtitle: 'Le feu. Le concentré. L\'amertume juste du radicchio tardivo.',
      description: 'Radicchio tardivo de Trévise — une amertume noble et précise. Bouillons de 48 heures. Gibier des montagnes, fumé à la braise. Oranges sanguines de l\'Etna pour finir, vives et froides.',
      dishes: ['Tortello di Fagiano in Brodo Dorato', 'Radicchio Tardivo Glassato al Barolo', 'Sfera di Cioccolato Chuao & Fumo d\'Olivo']
    }
  };

  const currentSeason = seasonsData[activeSeason];

  const ingredients = [
    {
      id: 'truffle',
      name: 'Truffe Blanche d\'Alba',
      italianName: 'Tuber Magnatum Pico',
      region: 'Collines des Langhe, Piémont',
      season: 'Octobre — Décembre',
      image: '/images/truffle-harvest.jpg',
      philosophy: 'Un cavatore exclusif la récolte avant l\'aube dans le brouillard des Langhe. Elle n\'est jamais chauffée ici. On la râpe minute en salle, sur un féculent chaud, pour que le parfum s\'exhale devant vous — pas en cuisine, dans l\'obscurité.'
    },
    {
      id: 'prawn',
      name: 'Gambero Rosso de Mazara del Vallo',
      italianName: 'Gambero Rosso di Mazara',
      region: 'Détroit de Sicile · 700m de profondeur',
      season: 'Pêche de Printemps & Été',
      image: '/images/prawn-dish.jpg',
      philosophy: 'Pêchée à 700 mètres, là où il n\'y a pas de lumière. Sa chair est d\'une sucrosité et d\'une minéralité incomparables. Nous la servons crue, à 12°C exactement — avec une stracciatella fumée et un gel de bergamote. Trois éléments. Pas quatre.'
    },
    {
      id: 'tomato-saffron',
      name: 'Tomate San Marzano & Safran de Toscane',
      italianName: 'Essenza di Pomodoro & Zafferano',
      region: 'Vésuve & San Gimignano',
      season: 'Récolte mi-été',
      image: '/images/tomato-saffron.jpg',
      philosophy: 'Centrifugation à froid : pas de chaleur, pas d\'amertume. Ce qui reste est un bouillon translucide, doré, infusé à froid pendant 24 heures aux pistils de safran de Toscane. La clarté comme principe.'
    },
    {
      id: 'carnaroli',
      name: 'Riz Carnaroli Riserva · 7 Ans',
      italianName: 'Riso Carnaroli Invecchiato 7 Anni',
      region: 'Plaines de Vercelli, Piémont',
      season: '84 mois en silos froids',
      image: '/images/pasta-caviar.jpg',
      philosophy: 'La patience transforme le grain. Sept ans de séchage lent cristallisent l\'amidon — le grain absorbe davantage, sans se briser. Ce risotto ne déborde pas. Il tient. Et il continue de tenir deux minutes après le service.'
    },
    {
      id: 'chianina',
      name: 'Bœuf Chianina IGP · Val di Chiana',
      italianName: 'Razza Chianina IGP',
      region: 'Val di Chiana, Toscane',
      season: 'Maturation 45 jours sous foin',
      image: '/images/hero-dish.jpg',
      philosophy: 'La race bovine blanche de Toscane, la plus ancienne d\'Europe. Saisie sur sarments de vigne secs — l\'extérieur se caramélise sous la fumée de bois, le cœur reste rouge et velouté. Le balsamique de Modène, 25 ans d\'âge, arrive en dernier. Une seule goutte.'
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
        title="La Cuisine, Philosophie & Saisons | LUCENTE — Milano"
        description="42 producteurs italiens. 4 micro-saisons. La truffe blanche d'Alba râpée minute. La crevette rouge à 700m de profondeur. La cuisine de Vincenzo Moretti à Milan."
        image="/images/hero-dish.jpg"
        path="/cuisine"
        schema={cuisineSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="typo-eyebrow text-or block">Philosophie & Création</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-ivoire font-light leading-tight">
            Le Chiaroscuro<br />
            <span className="italic text-or">dans l'assiette.</span>
          </h1>
          <div className="w-16 h-[1px] bg-or mx-auto mt-4" />
          <p className="typo-body text-base sm:text-lg text-muted max-w-xl mx-auto pt-2 font-light">
            L'ombre et la lumière. Ce que la braise révèle, ce que la clarté accentue. Une tension esthétique et sensorielle construite plat après plat.
          </p>
        </div>

        {/* Seasonality Navigator */}
        <section className="bg-surface p-8 sm:p-12 border border-white/10 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-or">Le Cycle du Temps</span>
              <h2 className="font-serif text-3xl text-ivoire">Quatre micro-saisons.<br />Une seule règle : la carte suit la terre.</h2>
            </div>
            <div className="flex bg-nero p-1 border border-white/5">
              {['spring', 'summer', 'autumn', 'winter'].map((seasonKey) => (
                <button
                  key={seasonKey}
                  onClick={() => setActiveSeason(seasonKey)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                    activeSeason === seasonKey ? 'bg-or text-nero shadow' : 'text-muted hover:text-ivoire'
                  }`}
                >
                  {seasonKey === 'spring' ? 'Printemps' : seasonKey === 'summer' ? 'Été' : seasonKey === 'autumn' ? 'Automne' : 'Hiver'}
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
              <span className="text-[10px] uppercase font-mono text-muted tracking-widest">Créations de Saison</span>
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
            <span className="typo-eyebrow text-or">Matières Premières</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire">Cinq produits. Chacun irremplaçable.</h2>
            <p className="text-sm text-muted">Ce ne sont pas des ingrédients de prestige. Ce sont des produits que rien d'autre ne peut remplacer.</p>
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
          <div className="text-center max-w-xl mx-auto">
            <span className="typo-eyebrow text-or">Cave & Accords</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire mt-2">L'accord ou le contraste.</h2>
            <p className="text-sm text-muted mt-2">Gianluca Ferri propose deux philosophies d'accord. Choisissez la vôtre.</p>
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
                {type === 'harmony' ? 'L\'Écho · Harmonie' : 'La Tension · Contraste'}
              </button>
            ))}
          </div>
          <div className="bg-surface p-8 sm:p-12 border border-or/30 max-w-4xl mx-auto">
            {activePairingType === 'harmony' ? (
              <div className="space-y-4 text-center">
                <Wine className="w-8 h-8 text-or mx-auto" />
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivoire">L'Écho des Terroirs</h3>
                <p className="typo-body text-sm text-muted leading-relaxed max-w-2xl mx-auto">
                  Le risotto à la truffe blanche d'Alba appelle un Barolo Monprivato 2017. Sous-bois, rose fanée, cuir noble. Le vin et le plat parlent la même langue — et leur conversation est longue.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <Sparkles className="w-8 h-8 text-or mx-auto" />
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivoire">La Tension Minérale</h3>
                <p className="typo-body text-sm text-muted leading-relaxed max-w-2xl mx-auto">
                  Le Gambero Rosso cru rencontre un Etna Bianco Superiore vinifié en amphore. L'acidité volcanique tranche la sucrosité de la crevette. La résonance saline dure quarante secondes. Ce n'est pas un accord — c'est un dialogue.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-surface border border-white/10 p-8 sm:p-12 text-center space-y-6">
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire">La table plutôt que le texte.</h2>
          <p className="text-xs text-muted max-w-xl mx-auto">Les menus dégustation en 7, 9 et 11 actes sont servis chaque soir. La truffe est là quand la truffe est belle.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-3.5 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all"
            >
              Réserver une Table
            </button>
            <Link
              to="/menu"
              className="px-8 py-3.5 bg-nero text-ivoire border border-white/10 font-semibold text-xs uppercase tracking-widest hover:border-or hover:text-or transition-all"
            >
              Consulter les Menus
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
