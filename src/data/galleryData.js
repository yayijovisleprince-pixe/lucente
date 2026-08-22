export const galleryCategories = [
  {
    id: "ALL",
    label: "Toutes les Collections",
    shortLabel: "Anthologie",
    description: "La collection intégrale des fragments visuels et de l'architecture sensorielle de LUCENTE.",
    count: 15
  },
  {
    id: "LA TABLE",
    label: "LA TABLE",
    shortLabel: "La Table",
    description: "L'art de la table, les dressages d'orfèvre, la vaisselle en grès noir et la géométrie des saveurs.",
    tagline: "Dressages & Orfèvrerie"
  },
  {
    id: "LA CUISINE",
    label: "LA CUISINE",
    shortLabel: "La Cuisine",
    description: "Le sanctuaire du pass, la flamme vive et la précision chirurgicale de la brigade.",
    tagline: "Le Pass & La Flamme"
  },
  {
    id: "L'ESPACE",
    label: "L'ESPACE",
    shortLabel: "L'Espace",
    description: "L'architecture minérale milanaise, la Sala Chiaroscuro et la crypte aux 1 400 flacons.",
    tagline: "Architecture & Matière"
  },
  {
    id: "LES ARTISANS",
    label: "LES ARTISANS",
    shortLabel: "Les Artisans",
    description: "Les visages, les mains et les regards qui insufflent l'âme au restaurant.",
    tagline: "Visages & Âmes"
  },
  {
    id: "LES INGRÉDIENTS",
    label: "LES INGRÉDIENTS",
    shortLabel: "Les Ingrédients",
    description: "La matière brute du terroir italien dans sa vérité tellurique et marine la plus pure.",
    tagline: "Terroirs & Pureté"
  }
];

export const rawGalleryItems = [
  {
    id: "gal-01",
    title: {
      it: "Filetto al Tartufo Bianco",
      en: "Chianina Tenderloin & White Truffle",
      fr: "Filet de Chianina & Truffe Blanche"
    },
    italianTitle: "Materia, Fumo & Radice",
    category: "LA TABLE",
    src: "/images/hero-dish.webp",
    alt: {
      it: "Piatto d'autore Filetto al Tartufo Bianco in chiaroscuro",
      en: "Signature dish Filetto al Tartufo plated in chiaroscuro light",
      fr: "Plat signature Filetto al Tartufo dressé au clair-obscur"
    },
    aspectRatio: "4/3",
    span: "col-span-1 md:col-span-2 row-span-2",
    caption: {
      it: "Impiattamento in Chiaroscuro — Manzo Chianina affumicato e lamelle di tartufo bianco.",
      en: "Chiaroscuro plating — Smoked Chianina beef and white truffle shavings.",
      fr: "Dressage au Chiaroscuro — Bœuf Chianina fumé et lamelles de truffe blanche."
    },
    editorialStory: {
      it: "Il piatto è concepito come una pala d'altare rinascimentale: la carne scottata su tralci di vite cattura la luce obliqua, mentre la mousseline di sedano rapa crea una base d'avorio sotto una pioggia di tartufo d'Alba.",
      en: "The dish is conceived like a Renaissance altarpiece: wood-seared beef catches oblique rays, while celeriac mousseline forms an ivory foundation under a cascade of Alba white truffle.",
      fr: "L'assiette est pensée comme un retable de la Renaissance : la viande saisie aux sarments de vigne capte la lumière oblique, tandis que la mousseline de céleri-rave crée un socle d'ivoire sous la pluie de truffe d'Alba."
    },
    cameraNotes: "Hasselblad X2D · 55mm f/2.5 · 3200K · Milano",
    act: {
      it: "Atto IV — Menu Terra & Memoria",
      en: "Act IV — Terra & Memoria Menu",
      fr: "Acte IV — Menu Terra & Memoria"
    },
    featured: true
  },
  {
    id: "gal-02",
    title: {
      it: "Gambero Rosso & Caviale",
      en: "Red Prawn & Royal Caviar",
      fr: "Gambero Rosso & Caviar"
    },
    italianTitle: "Il Rubino delle Profondità",
    category: "LA TABLE",
    src: "/images/prawn-dish.webp",
    alt: {
      it: "Gambero rosso di Mazara con caviale e stracciatella",
      en: "Mazara red prawn with caviar and smoked stracciatella",
      fr: "Crevettes rouges de Mazara del Vallo avec caviar et stracciatella"
    },
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: {
      it: "Gambero Rosso crudo, stracciatella affumicata con legno d'olivo e perle di caviale.",
      en: "Raw Mazara red prawn, olive-wood smoked stracciatella, and caviar pearls.",
      fr: "Gambero Rosso cru, stracciatella fumée au bois d'olivier et perles de caviar."
    },
    editorialStory: {
      it: "Una tensione salino-dolce assoluta servita a 12°C. L'acidità di un gel di bergamotto calabrese risveglia la ricchezza lipidica della stracciatella.",
      en: "Absolute sweet-saline tension served at precisely 12°C. Crisp Calabrian bergamot gel awakens the rich velvety stracciatella.",
      fr: "Une tension salée-douce absolue servie à 12°C. L'acidité d'un gel translucide de bergamote de Calabre vient réveiller la richesse lipidique de la stracciatella."
    },
    cameraNotes: "Leica SL2-S · 90mm APO Macro f/2",
    act: {
      it: "Atto II — Menu Mare & Orizzonte",
      en: "Act II — Mare & Orizzonte Menu",
      fr: "Acte II — Menu Mare & Orizzonte"
    },
    featured: false
  },
  {
    id: "gal-03",
    title: {
      it: "Raviolo Imperiale",
      en: "Imperial Raviolo",
      fr: "Raviolo Impérial"
    },
    italianTitle: "La Seta e l'Oro",
    category: "LA TABLE",
    src: "/images/pasta-caviar.webp",
    alt: {
      it: "Raviolo imperiale ripieno di scampo e caviale Oscietra",
      en: "Imperial raviolo filled with langoustine and Oscietra caviar",
      fr: "Raviolo d'exception garni de langoustine et caviar Oscietra Royal"
    },
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-2",
    caption: {
      it: "Raviolo gigante unico, ripieno di scampo crudo e brodo d'oro allo zafferano.",
      en: "Single imperial raviolo, raw langoustine filling, and golden saffron broth.",
      fr: "Raviolo unique géant, farce de langoustine et bouillon doré infusé au safran."
    },
    editorialStory: {
      it: "Una sfoglia fresca tirata a mano fino alla trasparenza della seta veneziana, a racchiudere il cuore dolce di uno scampo mediterraneo.",
      en: "Hand-rolled pasta sheet stretched thin as Venetian silk, sealing the succulent heart of a Mediterranean langoustine.",
      fr: "Un feuillet de pâte fraîche étirée jusqu'à la transparence d'une gaze de soie vénitienne, scellant le cœur fondant d'une langoustine de Méditerranée."
    },
    cameraNotes: "Sony A7R V · 50mm f/1.2 GM",
    act: {
      it: "Atto IV — Menu Luce Assoluta",
      en: "Act IV — Luce Assoluta Menu",
      fr: "Acte IV — Menu Luce Assoluta"
    },
    featured: true
  },
  {
    id: "gal-04",
    title: {
      it: "La Fiamma del Pass",
      en: "The Kitchen Fire",
      fr: "La Flamme du Passe"
    },
    italianTitle: "Il Fuoco della Brace",
    category: "LA CUISINE",
    src: "/images/kitchen-fire.webp",
    alt: {
      it: "Cottura a fuoco vivo nelle cucine di LUCENTE",
      en: "Live-fire cooking inside LUCENTE kitchens",
      fr: "Cuisson vivante au feu de bois dans les cuisines de LUCENTE"
    },
    aspectRatio: "4/3",
    span: "col-span-1 md:col-span-2",
    caption: {
      it: "La brace di quercia e tralci toscani nel cuore del servizio serale.",
      en: "Oak and Tuscan vine embers at the peak of evening service.",
      fr: "La braise de chêne et de sarments toscans au cœur du service du soir."
    },
    editorialStory: {
      it: "La cucina aperta è un teatro di metalli scuri e braci incandescenti dove 14 cuochi operano in un silenzio quasi monastico.",
      en: "The open kitchen is a theater of dark metals and incandescent embers where 14 chefs operate in monastic silence.",
      fr: "La cuisine ouverte est un théâtre de métaux sombres et de braises incandescentes où 14 cuisiniers opèrent dans un silence quasi monacal."
    },
    cameraNotes: "Hasselblad 907X · 45mm f/4",
    act: {
      it: "Santuario della Brigata",
      en: "Sanctuary of the Brigade",
      fr: "Sanctuaire de la Brigade"
    },
    featured: false
  },
  {
    id: "gal-05",
    title: {
      it: "La Sala Chiaroscuro",
      en: "The Chiaroscuro Dining Room",
      fr: "La Sala Chiaroscuro"
    },
    italianTitle: "Architettura dell'Ombra",
    category: "L'ESPACE",
    src: "/images/dining-room.webp",
    alt: {
      it: "Architettura d'interni della sala principale del ristorante LUCENTE",
      en: "Interior architecture of LUCENTE's main dining hall",
      fr: "Architecture intérieure épurée de la salle principale du restaurant LUCENTE"
    },
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-3",
    caption: {
      it: "La sala principale: pietra lavica dell'Etna, lino scuro e illuminazione sartoriale.",
      en: "The main dining room: Mount Etna lava stone, dark linen, and bespoke lighting.",
      fr: "La salle principale : pierre de lave d'Etna, lin sombre et éclairage sur mesure."
    },
    editorialStory: {
      it: "Concepita per soli 28 coperti, ogni tavolo è un'isola di luce preservata da sguardi indiscreti grazie a un'acustica felpata.",
      en: "Designed for only 28 guests, each table is an island of light sheltered by precision acoustic architecture.",
      fr: "Conçue pour 28 couverts seulement, chaque table forme un îlot de clarté préservé du regard des autres convives par une acoustique feutrée millimétrée."
    },
    cameraNotes: "Phase One IQ4 150MP · 35mm f/3.5",
    act: {
      it: "Il Santuario",
      en: "The Sanctuary",
      fr: "Le Sanctuaire"
    },
    featured: true
  },
  {
    id: "gal-06",
    title: {
      it: "La Raccolta d'Alba",
      en: "The Alba Truffle Forage",
      fr: "La Récolte d'Alba"
    },
    italianTitle: "L'Oro di Langa",
    category: "LES INGRÉDIENTS",
    src: "/images/truffle-harvest.webp",
    alt: {
      it: "Tartufi bianchi pregiati Tuber Magnatum Pico raccolti in Piemonte",
      en: "Wild white truffles Tuber Magnatum Pico harvested in Piedmont",
      fr: "Truffes blanches sauvages Tuber Magnatum Pico récoltées dans le Piémont"
    },
    aspectRatio: "4/3",
    span: "col-span-1",
    caption: {
      it: "Tuber Magnatum Pico d'Alba, selezionati a mano alle prime luci dell'alba.",
      en: "Alba Tuber Magnatum Pico, hand-selected at dawn.",
      fr: "Tuber Magnatum Pico d'Alba, sélectionnées à la main à l'aube."
    },
    editorialStory: {
      it: "Raccolti dal nostro trifolao di fiducia nei boschi nebbiosi di Santo Stefano Belbo. Ogni pepita è numerata e servita entro 48 ore.",
      en: "Foraged by our private trifolao in misty woods of Santo Stefano Belbo. Each treasure is numbered and served within 48 hours.",
      fr: "Récoltées par notre trifolao attitré dans les forêts brumeuses de Santo Stefano Belbo. Chaque pépite est numérotée et servie sous 48 heures."
    },
    cameraNotes: "Fujifilm GFX 100 II · 80mm f/1.7",
    act: {
      it: "Terroir Tellurici",
      en: "Telluric Terroirs",
      fr: "Terroirs Telluriques"
    },
    featured: false
  },
  {
    id: "gal-07",
    title: {
      it: "Il Gesto dello Chef",
      en: "The Chef's Craft",
      fr: "Le Geste du Chef"
    },
    italianTitle: "La Precisione della Mano",
    category: "LES ARTISANS",
    src: "/images/chef-craft.webp",
    alt: {
      it: "Mani dello Chef Vincenzo Moretti che perfezionano l'impiattamento",
      en: "Hands of Chef Vincenzo Moretti perfecting the plating",
      fr: "Mains du Chef Vincenzo Moretti finalisant le dressage à la pince"
    },
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: {
      it: "Rifinitura millimetrica di un antipasto da parte dello Chef Vincenzo Moretti.",
      en: "Millimeter-precise finishing of an antipasto by Chef Vincenzo Moretti.",
      fr: "Finition millimétrée d'un antipasto par le Chef Vincenzo Moretti."
    },
    editorialStory: {
      it: "Il gesto di un artigiano che ricerca instancabilmente l'equilibrio ideale tra tensione acida e rotondità aromatica.",
      en: "The hand of an artisan ceaselessly seeking harmony between crisp acidity and textured roundness.",
      fr: "Le geste d'un artisan qui répète inlassablement la recherche du point d'équilibre parfait entre tension acide et rondeur texturée."
    },
    cameraNotes: "Leica M11-P · Noctilux 50mm f/0.95",
    act: {
      it: "Trasmissione & Rigore",
      en: "Transmission & Discipline",
      fr: "Transmission & Rigueur"
    },
    featured: false
  },
  {
    id: "gal-08",
    title: {
      it: "Vincenzo Moretti",
      en: "Vincenzo Moretti",
      fr: "Vincenzo Moretti"
    },
    italianTitle: "Ritratto del Fondatore",
    category: "LES ARTISANS",
    src: "/images/chef-portrait.webp",
    alt: {
      it: "Ritratto dello Chef Esecutivo Vincenzo Moretti",
      en: "Portrait of Executive Chef Vincenzo Moretti",
      fr: "Portrait du Chef Exécutif Vincenzo Moretti en veste noire"
    },
    aspectRatio: "3/4",
    span: "col-span-1 md:col-span-1 row-span-2",
    caption: {
      it: "Lo Chef Esecutivo e Fondatore di LUCENTE.",
      en: "Executive Chef and Founder of LUCENTE.",
      fr: "Le Chef Exécutif et Fondateur de LUCENTE."
    },
    editorialStory: {
      it: "Uno sguardo guidato dalla memoria delle grandi tavole italiane e dalla ricerca ossessiva di una gastronomia senza artifici.",
      en: "A vision nurtured by grand Italian dining heritage and obsessive pursuit of purity without unnecessary ornament.",
      fr: "Un regard habité par la mémoire des grandes tables italiennes et la quête obsessionnelle d'une gastronomie débarrassée de tout artifice superflu."
    },
    cameraNotes: "Hasselblad X2D · 90mm f/2.5",
    act: {
      it: "Direzione Culinaria",
      en: "Culinary Direction",
      fr: "Direction Culinaire"
    },
    featured: true
  },
  {
    id: "gal-09",
    title: {
      it: "La Cantina Segreta",
      en: "The Secret Cellar",
      fr: "La Cantina Segreta"
    },
    italianTitle: "Millequattrocento Voci",
    category: "L'ESPACE",
    src: "/images/cellar-architecture.webp",
    alt: {
      it: "Cantina a volta con 1.400 referenze di vini rari",
      en: "Vaulted wine cellar with 1,400 rare wine references",
      fr: "Cave voûtée abritant les 1 400 références du restaurant LUCENTE"
    },
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-2",
    caption: {
      it: "La cantina a volta: 1.400 referenze di grandi cru e bottiglie in anfora.",
      en: "Vaulted wine cellar: 1,400 references of grand crus and amphora wines.",
      fr: "La cave voûtée : 1 400 références de grands crus et flacons en amphores."
    },
    editorialStory: {
      it: "Sotto il Quadrilatero, la riserva di Gianluca Ferri custodisce vecchie annate di Barolo Monfortino e cuvée dell'Etna a 13,5°C costanti.",
      en: "Beneath the fashion district, Gianluca Ferri's reserve preserves historic Barolo Monfortino and volcanic Etna crus at constant 13.5°C.",
      fr: "Sous les fondations du Quadrilatero, la réserve de Gianluca Ferri garde les vieux millésimes de Barolo Monfortino et les cuvées volcaniques de l'Etna à température constante de 13,5°C."
    },
    cameraNotes: "Canon EOS R5 C · RF 15-35mm f/2.8L",
    act: {
      it: "Memoria del Vino",
      en: "Wine Heritage",
      fr: "Mémoire du Vin"
    },
    featured: false
  },
  {
    id: "gal-10",
    title: {
      it: "L'Oro Rosso di San Gimignano",
      en: "Red Gold of San Gimignano",
      fr: "L'Or Rouge de San Gimignano"
    },
    italianTitle: "Zafferano Purissimo",
    category: "LES INGRÉDIENTS",
    src: "/images/tomato-saffron.webp",
    alt: {
      it: "Pistilli di zafferano toscano ed essenza di pomodoro",
      en: "Tuscan saffron pistils and clarified tomato nectar",
      fr: "Pistils de safran toscan et eau de tomate clarifiée"
    },
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: {
      it: "Infusione a freddo di zafferano di San Gimignano DOP ed essenza di pomodoro.",
      en: "Cold infusion of San Gimignano PDO saffron and tomato essence.",
      fr: "Infusion à froid de safran de San Gimignano DOP et essence de tomate."
    },
    editorialStory: {
      it: "Per estrarre l'aroma senza alterare i sentori floreali, operiamo una lenta crio-estrazione di 24 ore in acqua di pomodoro San Marzano.",
      en: "To capture fragrant aromatic nuances without heat damage, we slow cryo-infuse for 24 hours in San Marzano tomato water.",
      fr: "Pour extraire la quintessence aromatique sans détruire les notes florales fragiles, nous opérons une cryo-extraction lente de 24 heures dans une eau de tomate San Marzano."
    },
    cameraNotes: "Sony A7R V · 90mm Macro f/2.8",
    act: {
      it: "Essenza & Alchimia",
      en: "Essence & Alchemy",
      fr: "Essence & Alchimie"
    },
    featured: false
  },
  {
    id: "gal-11",
    title: {
      it: "Il Rituale di Sommellerie",
      en: "The Sommelier Ritual",
      fr: "Le Rituel de Sommellerie"
    },
    italianTitle: "Il Calice & il Silenzio",
    category: "LES ARTISANS",
    src: "/images/sommelier-ritual.webp",
    alt: {
      it: "Gianluca Ferri che decanta un vino raro a lume di candela",
      en: "Gianluca Ferri decanting a rare vintage by candlelight",
      fr: "Gianluca Ferri carafant un vieux millésime à la bougie"
    },
    aspectRatio: "4/3",
    span: "col-span-1 md:col-span-2",
    caption: {
      it: "Decantazione alla candela da parte del Sommelier Gianluca Ferri.",
      en: "Candlelight decanting by Head Sommelier Gianluca Ferri.",
      fr: "Carafage à la flamme par le Chef Sommelier Gianluca Ferri."
    },
    editorialStory: {
      it: "Ogni grande vino viene ossigenato con rispetto religioso per rivelare la sua trama profonda.",
      en: "Every grand cru is aerated with reverence to awaken its complex aromas.",
      fr: "Chaque grand vin est oxygéné avec un soin religieux afin de révéler ses strates aromatiques sans brusquer sa matière noble."
    },
    cameraNotes: "Nikon Z9 · 58mm f/0.95 Noct",
    act: {
      it: "Il Gesto del Sommelier",
      en: "The Sommelier's Art",
      fr: "Le Geste du Sommelier"
    },
    featured: false
  },
  {
    id: "gal-12",
    title: {
      it: "Sfera di Cioccolato Criollo",
      en: "Criollo Chocolate Sphere",
      fr: "Sphère de Chocolat Criollo"
    },
    italianTitle: "L'Epilogo Dolce",
    category: "LA TABLE",
    src: "/images/chocolate-dolce.webp",
    alt: {
      it: "Dessert al cioccolato Criollo, gianduja e gelato al fieno",
      en: "Signature dessert with Criollo chocolate, gianduja, and alpine hay gelato",
      fr: "Dessert signature au chocolat Criollo, gianduja et lait de foin"
    },
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: {
      it: "Cioccolato 75%, gianduja tostato e gelato al fieno d'alpeggio.",
      en: "75% plantation dark chocolate, roasted gianduja, and alpine hay gelato.",
      fr: "Chocolat de plantation 75%, gianduja torréfié et glace au foin d'alpage."
    },
    editorialStory: {
      it: "L'epilogo gioca su un'amarezza profonda e la dolcezza aromatica di un'infusione di fieno raccolto a 1.800 metri di quota.",
      en: "The meal concludes on deep cocoa bitterness and herbaceous alpine sweetness from wild hay harvested at 1,800m.",
      fr: "L'épilogue du repas joue sur une amertume profonde et la douceur herbacée d'une infusion de foin récolté à plus de 1 800 mètres d'altitude."
    },
    cameraNotes: "Leica SL2 · 50mm Summilux f/1.4",
    act: {
      it: "Atto VII — Finale",
      en: "Act VII — Finale",
      fr: "Acte VII — Final"
    },
    featured: false
  },
  {
    id: "gal-13",
    title: {
      it: "L'Atmosfera della Sera",
      en: "Evening Atmosphere",
      fr: "L'Atmosphère du Soir"
    },
    italianTitle: "La Notte a Milano",
    category: "L'ESPACE",
    src: "/images/table-ambiance.webp",
    alt: {
      it: "Tavolo apparecchiato con calici in cristallo e luce soffusa",
      en: "Dinner table set with crystal goblets in gentle candlelight",
      fr: "Table dressée avec calices de cristal et lueur tamisée"
    },
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-2",
    caption: {
      it: "La tavola pronta per il primo servizio delle 19:30.",
      en: "The table prepared for the opening 19:30 service.",
      fr: "La table prête pour le premier service de 19h30."
    },
    editorialStory: {
      it: "I calici in cristallo soffiato di Murano e l'argenteria cesellata a mano catturano gli ultimi riflessi prima della notte milanese.",
      en: "Hand-blown Murano crystal and patinated silverware capture golden reflections as Milanese night unfolds.",
      fr: "Le cristal soufflé bouche de Murano et l'argenterie patinée à la main captent les derniers reflets dorés avant que la nuit milanaise n'enveloppe la salle."
    },
    cameraNotes: "Sony A1 · 35mm f/1.4 GM · 2700K",
    act: {
      it: "Preludio al Servizio",
      en: "Prelude to Service",
      fr: "Prélude au Service"
    },
    featured: false
  }
];

export function getGalleryItems(lang = 'fr') {
  return rawGalleryItems.map(item => ({
    ...item,
    title: typeof item.title === 'object' ? (item.title[lang] || item.title.fr) : item.title,
    alt: typeof item.alt === 'object' ? (item.alt[lang] || item.alt.fr) : item.alt,
    caption: typeof item.caption === 'object' ? (item.caption[lang] || item.caption.fr) : item.caption,
    editorialStory: typeof item.editorialStory === 'object' ? (item.editorialStory[lang] || item.editorialStory.fr) : item.editorialStory,
    act: typeof item.act === 'object' ? (item.act[lang] || item.act.fr) : item.act
  }));
}

export const galleryItems = getGalleryItems('fr');


export const rawEditorialQuotes = [
  {
    quote: {
      it: "La luce vive solo grazie all'ombra che la circonda. In cucina come in pittura, il contrasto è l'unica sorgente di pura emozione.",
      en: "Light lives only through the shadow that surrounds it. In cooking as in painting, contrast is the sole source of pure emotion.",
      fr: "La lumière ne vit que par l'ombre qui l'entoure. En cuisine comme en peinture, le contraste est la seule source d'émotion pure."
    },
    author: "Vincenzo Moretti",
    role: {
      it: "Chef Esecutivo & Fondatore",
      en: "Executive Chef & Founder",
      fr: "Chef Exécutif & Fondateur"
    },
    context: {
      it: "Manifesto del Chiaroscuro Culinario",
      en: "Culinary Chiaroscuro Manifesto",
      fr: "Manifeste du Chiaroscuro Culinaire"
    }
  },
  {
    quote: {
      it: "Un vino non deve semplicemente accompagnare un piatto. Deve aprire una porta segreta nella memoria di chi assaggia.",
      en: "A wine should not merely accompany a dish. It must open a secret gateway into the taster's memory.",
      fr: "Un vin ne doit pas simplement accompagner un plat. Il doit ouvrir une porte secrète dans la mémoire du dégustateur."
    },
    author: "Gianluca Ferri",
    role: {
      it: "Direttore della Cantina",
      en: "Head Sommelier & Cellar Master",
      fr: "Directeur de la Cave"
    },
    context: {
      it: "La Selezione delle 1.400 Bottiglie",
      en: "The 1,400 Bottles Selection",
      fr: "La Sélection des 1 400 Flacons"
    }
  }
];

export function getEditorialQuotes(lang = 'fr') {
  return rawEditorialQuotes.map(q => ({
    author: q.author,
    quote: typeof q.quote === 'object' ? (q.quote[lang] || q.quote.fr) : q.quote,
    role: typeof q.role === 'object' ? (q.role[lang] || q.role.fr) : q.role,
    context: typeof q.context === 'object' ? (q.context[lang] || q.context.fr) : q.context
  }));
}

export const editorialQuotes = getEditorialQuotes('fr');

