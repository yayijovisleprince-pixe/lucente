export const galleryCategories = [
  {
    id: "ALL",
    label: "Toutes les Collections",
    shortLabel: "Anthologie",
    description: "La collection intégrale des fragments visuels et de l'architecture sensorielle de LUCENTE.",
    count: 15
  },
  {
    id: "THE TABLE",
    label: "THE TABLE",
    shortLabel: "La Table",
    description: "L'art de la table, les dressages d'orfèvre, la vaisselle en grès noir et la géométrie des saveurs.",
    tagline: "Dressages & Orfèvrerie"
  },
  {
    id: "THE KITCHEN",
    label: "THE KITCHEN",
    shortLabel: "La Cuisine",
    description: "Le sanctuaire du pass, la flamme vive et la précision chirurgicale de la brigade.",
    tagline: "Le Pass & La Flamme"
  },
  {
    id: "THE SPACE",
    label: "THE SPACE",
    shortLabel: "L'Espace",
    description: "L'architecture minérale milanaise, la Sala Chiaroscuro et la crypte aux 1 400 flacons.",
    tagline: "Architecture & Matière"
  },
  {
    id: "THE PEOPLE",
    label: "THE PEOPLE",
    shortLabel: "Les Artisans",
    description: "Les visages, les mains et les regards qui insufflent l'âme au restaurant.",
    tagline: "Visages & Âmes"
  },
  {
    id: "THE INGREDIENTS",
    label: "THE INGREDIENTS",
    shortLabel: "Les Ingrédients",
    description: "La matière brute du terroir italien dans sa vérité tellurique et marine la plus pure.",
    tagline: "Terroirs & Pureté"
  }
];

export const galleryItems = [
  {
    id: "gal-01",
    title: "Filetto al Tartufo Bianco",
    italianTitle: "Materia, Fumo & Radice",
    category: "THE TABLE",
    categoryLabel: "THE TABLE",
    src: "/images/.webp",
    alt: "Plat signature Filetto al Tartufo dressé au clair-obscur",
    aspectRatio: "4/3",
    span: "col-span-1 md:col-span-2 row-span-2",
    caption: "Dressage au Chiaroscuro — Bœuf Chianina fumé et lamelles de truffe blanche.",
    editorialStory: "L'assiette est pensée comme un retable de la Renaissance : la viande saisie aux sarments de vigne capte la lumière oblique, tandis que la mousseline de céleri-rave crée un socle d'ivoire sous la pluie de truffe d'Alba.",
    cameraNotes: "Hasselblad X2D · 55mm f/2.5 · Éclairage latéral 3200K · Milano",
    act: "Acte IV — Menu Terra & Memoria",
    featured: true
  },
  {
    id: "gal-02",
    title: "Gambero Rosso & Caviale",
    italianTitle: "Il Rubino delle Profondità",
    category: "THE TABLE",
    categoryLabel: "THE TABLE",
    src: "/images/.webp",
    alt: "Crevettes rouges de Mazara del Vallo avec caviar et stracciatella",
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: "Gambero Rosso cru, stracciatella fumée au bois d'olivier et perles de caviar.",
    editorialStory: "Une tension salée-douce absolue servie à 12°C. L'acidité d'un gel translucide de bergamote de Calabre vient réveiller la richesse lipidique de la stracciatella.",
    cameraNotes: "Leica SL2-S · 90mm APO Macro f/2 · Lumière naturelle nord",
    act: "Acte II — Menu Mare & Orizzonte",
    featured: false
  },
  {
    id: "gal-03",
    title: "Raviolo Imperiale",
    italianTitle: "La Seta e l'Oro",
    category: "THE TABLE",
    categoryLabel: "THE TABLE",
    src: "/images/.webp",
    alt: "Raviolo d'exception garni de langoustine et caviar Oscietra Royal",
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-2",
    caption: "Raviolo unique géant, farce de langoustine et bouillon doré infusé au safran.",
    editorialStory: "Un feuillet de pâte fraîche étirée jusqu'à la transparence d'une gaze de soie vénitienne, scellant le cœur fondant d'une langoustine de Méditerranée.",
    cameraNotes: "Sony A7R V · 50mm f/1.2 GM · Faisceau zénithal 15°",
    act: "Acte IV — Menu Luce Assoluta",
    featured: true
  },
  {
    id: "gal-04",
    title: "La Flamme du Passe",
    italianTitle: "Il Fuoco della Brace",
    category: "THE KITCHEN",
    categoryLabel: "THE KITCHEN",
    src: "/images/.webp",
    alt: "Cuisson vivante au feu de bois dans les cuisines de LUCENTE",
    aspectRatio: "4/3",
    span: "col-span-1 md:col-span-2",
    caption: "La braise de chêne et de sarments toscans au cœur du service du soir.",
    editorialStory: "La cuisine ouverte est un théâtre de métaux sombres et de braises incandescentes où 14 cuisiniers opèrent dans un silence quasi monacal.",
    cameraNotes: "Hasselblad 907X · 45mm f/4 · Vitesse 1/250s · ISO 1600",
    act: "Sanctuaire de la Brigade",
    featured: false
  },
  {
    id: "gal-05",
    title: "La Sala Chiaroscuro",
    italianTitle: "Architettura dell'Ombra",
    category: "THE SPACE",
    categoryLabel: "THE SPACE",
    src: "/images/.webp",
    alt: "Architecture intérieure épurée de la salle principale du restaurant LUCENTE",
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-3",
    caption: "La salle principale : pierre de lave d'Etna, lin sombre et éclairage sur mesure.",
    editorialStory: "Conçue pour 28 couverts seulement, chaque table forme un îlot de clarté préservé du regard des autres convives par une acoustique feutrée millimétrée.",
    cameraNotes: "Phase One IQ4 150MP · 35mm f/3.5 · Pose longue 2s",
    act: "Le Sanctuaire",
    featured: true
  },
  {
    id: "gal-06",
    title: "La Récolte d'Alba",
    italianTitle: "L'Oro di Langa",
    category: "THE INGREDIENTS",
    categoryLabel: "THE INGREDIENTS",
    src: "/images/.webp",
    alt: "Truffes blanches sauvages Tuber Magnatum Pico récoltées dans le Piémont",
    aspectRatio: "4/3",
    span: "col-span-1",
    caption: "Tuber Magnatum Pico d'Alba, sélectionnées à la main à l'aube.",
    editorialStory: "Récoltées par notre trifolao attitré dans les forêts brumeuses de Santo Stefano Belbo. Chaque pépite est numérotée et servie sous 48 heures.",
    cameraNotes: "Fujifilm GFX 100 II · 80mm f/1.7 · Lumière de sous-bois 6h30",
    act: "Terroirs Telluriques",
    featured: false
  },
  {
    id: "gal-07",
    title: "Le Geste du Chef",
    italianTitle: "La Precisione della Mano",
    category: "THE PEOPLE",
    categoryLabel: "THE PEOPLE",
    src: "/images/.webp",
    alt: "Mains du Chef Vincenzo Moretti finalisant le dressage à la pince",
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: "Finition millimétrée d'un antipasto par le Chef Vincenzo Moretti.",
    editorialStory: "Le geste d'un artisan qui répète inlassablement la recherche du point d'équilibre parfait entre tension acide et rondeur texturée.",
    cameraNotes: "Leica M11-P · Noctilux 50mm f/0.95 · Mise au point manuelle",
    act: "Transmission & Rigueur",
    featured: false
  },
  {
    id: "gal-08",
    title: "Vincenzo Moretti",
    italianTitle: "Ritratto del Fondatore",
    category: "THE PEOPLE",
    categoryLabel: "THE PEOPLE",
    src: "/images/.webp",
    alt: "Portrait du Chef Exécutif Vincenzo Moretti en veste noire",
    aspectRatio: "3/4",
    span: "col-span-1 md:col-span-1 row-span-2",
    caption: "Le Chef Exécutif et Fondateur de LUCENTE.",
    editorialStory: "Un regard habité par la mémoire des grandes tables italiennes et la quête obsessionnelle d'une gastronomie débarrassée de tout artifice superflu.",
    cameraNotes: "Hasselblad X2D · 90mm f/2.5 · Réflecteur or brossé 45°",
    act: "Direction Culinaire",
    featured: true
  },
  {
    id: "gal-09",
    title: "La Cantina Segreta",
    italianTitle: "Millequattrocento Voci",
    category: "THE SPACE",
    categoryLabel: "THE SPACE",
    src: "/images/.webp",
    alt: "Cave voûtée abritant les 1 400 références du restaurant LUCENTE",
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-2",
    caption: "La cave voûtée : 1 400 références de grands crus et flacons en amphores.",
    editorialStory: "Sous les fondations du Quadrilatero, la réserve de Gianluca Ferri garde les vieux millésimes de Barolo Monfortino et les cuvées volcaniques de l'Etna à température constante de 13,5°C.",
    cameraNotes: "Canon EOS R5 C · RF 15-35mm f/2.8L · Éclairage indirect ambre",
    act: "Mémoire du Vin",
    featured: false
  },
  {
    id: "gal-10",
    title: "L'Or Rouge de San Gimignano",
    italianTitle: "Zafferano Purissimo",
    category: "THE INGREDIENTS",
    categoryLabel: "THE INGREDIENTS",
    src: "/images/.webp",
    alt: "Pistils de safran toscan et eau de tomate clarifiée",
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: "Infusion à froid de safran de San Gimignano DOP et essence de tomate.",
    editorialStory: "Pour extraire la quintessence aromatique sans détruire les notes florales fragiles, nous opérons une cryo-extraction lente de 24 heures dans une eau de tomate San Marzano.",
    cameraNotes: "Sony A7R V · 90mm Macro f/2.8 · Lumière traversante 5600K",
    act: "Essence & Alchimie",
    featured: false
  },
  {
    id: "gal-11",
    title: "Le Rituel de Sommellerie",
    italianTitle: "Il Calice & il Silenzio",
    category: "THE PEOPLE",
    categoryLabel: "THE PEOPLE",
    src: "/images/.webp",
    alt: "Gianluca Ferri carafant un vieux millésime à la bougie",
    aspectRatio: "4/3",
    span: "col-span-1 md:col-span-2",
    caption: "Carafage à la flamme par le Chef Sommelier Gianluca Ferri.",
    editorialStory: "Chaque grand vin est oxygéné avec un soin religieux afin de révéler ses strates aromatiques sans brusquer sa matière noble.",
    cameraNotes: "Nikon Z9 · 58mm f/0.95 Noct · Flamme de bougie naturelle",
    act: "Le Geste du Sommelier",
    featured: false
  },
  {
    id: "gal-12",
    title: "Sfera di Cioccolato Criollo",
    italianTitle: "L'Epilogo Dolce",
    category: "THE TABLE",
    categoryLabel: "THE TABLE",
    src: "/images/.webp",
    alt: "Dessert signature au chocolat Criollo, gianduja et lait de foin",
    aspectRatio: "1/1",
    span: "col-span-1",
    caption: "Chocolat de plantation 75%, gianduja torréfié et glace au foin d'alpage.",
    editorialStory: "L'épilogue du repas joue sur une amertume profonde et la douceur herbacée d'une infusion de foin récolté à plus de 1 800 mètres d'altitude.",
    cameraNotes: "Leica SL2 · 50mm Summilux f/1.4 · Éclairage rasoir",
    act: "Acte VII — Final",
    featured: false
  },
  {
    id: "gal-13",
    title: "L'Atmosphère du Soir",
    italianTitle: "La Notte a Milano",
    category: "THE SPACE",
    categoryLabel: "THE SPACE",
    src: "/images/.webp",
    alt: "Table dressée avec calices de cristal et lueur tamisée",
    aspectRatio: "16/9",
    span: "col-span-1 md:col-span-2",
    caption: "La table prête pour le premier service de 19h30.",
    editorialStory: "Le cristal soufflé bouche de Murano et l'argenterie patinée à la main captent les derniers reflets dorés avant que la nuit milanaise n'enveloppe la salle.",
    cameraNotes: "Sony A1 · 35mm f/1.4 GM · Lumière d'ambiance 2700K",
    act: "Prélude au Service",
    featured: false
  }
];

export const editorialQuotes = [
  {
    quote: "La lumière ne vit que par l'ombre qui l'entoure. En cuisine comme en peinture, le contraste est la seule source d'émotion pure.",
    author: "Vincenzo Moretti",
    role: "Chef Exécutif & Fondateur"
  },
  {
    quote: "Un vin ne doit pas simplement accompagner un plat. Il doit ouvrir une porte secrète dans la mémoire du dégustateur.",
    author: "Gianluca Ferri",
    role: "Directeur de la Cave"
  }
];
