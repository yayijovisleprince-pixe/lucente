export const restaurantInfo = {
  name: "LUCENTE",
  subtitle: "Alta Cucina Contemporanea",
  city: "Milano",
  district: "Quadrilatero della Moda — Via Monte Napoleone, 14",
  address: "Via Monte Napoleone, 14, 20121 Milano MI, Italie",
  phone: "+39 02 8945 7700",
  email: "conciergerie@lucente-milano.com",
  michelinStars: 2,
  openingHours: "Mardi au Samedi : 12h30–15h00 & 19h30–23h30",
  hoursText: "Mardi au Samedi · Déjeuner 12h30–15h00 · Dîner 19h30–23h30",
  closedDays: "Fermé Dimanche & Lundi",
  chef: {
    name: "Vincenzo Moretti",
    role: "Chef Exécutif & Fondateur",
    bio: "Il a grandi au bruit de la braise, pas au son des diplômes. Émilien de naissance, Vincenzo Moretti a appris à cuisiner dans la cuisine de sa grand-mère à Reggio Emilia, avant de traverser Modène, Tokyo et Londres — non pour s'y perdre, mais pour comprendre ce qu'il voulait retrouver. Chez LUCENTE, il ne réinvente pas la cuisine italienne. Il la débarrasse de tout ce qui la couvre.",
    quote: "On n'améliore pas un abricot de juillet. On apprend à ne pas le gâcher.",
    signature: "Vincenzo Moretti"
  },
  sommelier: {
    name: "Gianluca Ferri",
    role: "Chef Sommelier & Directeur de Cave",
    philosophy: "1 400 références. Pas triées par région ni par prix, mais par émotion. Des Barolo de légende aux vins en amphore d'Etna que personne n'importe encore — Gianluca Ferri cherche ce qui prolonge le plat plutôt que ce qui lui fait concurrence."
  }
};

export const tastingMenus = [
  {
    id: "terra-memoria",
    tag: "7 Actes",
    name: "Terra & Memoria",
    italianName: "Radici, Materia e Suolo",
    price: "210 €",
    winePairingPrice: "+ 130 € (5 Calici di Pregio)",
    description: "Sept actes construits autour d'une idée simple : ce que la terre italienne garde en elle pendant des siècles, et ce qu'elle libère en une bouchée. Truffes, braises, maturations longues.",
    courses: [
      {
        act: "I",
        name: "L'Ombra del Bosco",
        ingredients: "Tartare de bœuf Fassona piémontaise au couteau, émulsion de noisettes Tonda Gentile d'Alba et poussières de cèpes séchés.",
        pairing: "Barbera d'Alba Superiore DOC 2020 — Giacomo Conterno",
        image: "/images/hero-dish.jpg"
      },
      {
        act: "II",
        name: "Oro di Langhe",
        ingredients: "Risotto Carnaroli Riserva affiné 7 ans, beurre noisette de montagne, parmesan Vacche Rosse 36 mois et lamelles de truffe blanche d'Alba.",
        pairing: "Barolo Monprivato DOCG 2017 — Giuseppe Mascarello",
        image: "/images/truffle-harvest.jpg"
      },
      {
        act: "III",
        name: "Plin all'Antica",
        ingredients: "Agnolotti del Plin farcis aux trois viandes rôties, réduction brillante de jus de veau infusé au romarin sauvage et genièvre.",
        pairing: "Brunello di Montalcino DOCG 2016 — Biondi-Santi",
        image: "/images/pasta-caviar.jpg"
      },
      {
        act: "IV",
        name: "Fumo & Brace",
        ingredients: "Filet de bœuf Chianina fumé au bois de sarments de vigne, mousseline de céleri-rave brûlé et échalotes confites au balsamique traditionnel de Modène DOP 25 ans.",
        pairing: "Sassicaia Tenuta San Guido 2018 — Bolgheri",
        image: "/images/hero-dish.jpg"
      },
      {
        act: "V",
        name: "Transizione Minerale",
        ingredients: "Granité de cédrat de Calabre, gelée d'origan sauvage des Pouilles et filet d'huile d'olive nouvelle Coratina.",
        pairing: "Acqua Madre di Sicilia",
        image: "/images/prawn-dish.jpg"
      },
      {
        act: "VI",
        name: "Castelmagno d'Alpeggio",
        ingredients: "Affinage en crypte de 24 mois, mostarda di Cremona aux poires et réduction de vin Santo toscan.",
        pairing: "Vin Santo del Chianti Classico 2011 — Fontodi",
        image: "/images/dining-room.jpg"
      },
      {
        act: "VII",
        name: "Oro Bruciato",
        ingredients: "Feuilletage croustillant au gianduja torréfié, glace au lait de foin d'alpage et tuile au cacao amer Criollo.",
        pairing: "Moscato d'Asti Canelli DOCG — Bera Vittorio",
        image: "/images/chocolate-dolce.jpg"
      }
    ]
  },
  {
    id: "mare-orizzonte",
    tag: "9 Actes",
    name: "Mare & Orizzonte",
    italianName: "Acque Profonde e Isole",
    price: "240 €",
    winePairingPrice: "+ 160 € (6 Calici Rari)",
    description: "Neuf séquences marines, de la Sicile à l'Adriatique. Pas une carte postale de la mer — plutôt ce que la mer garde dans ses profondeurs et ne livre qu'à ceux qui savent où chercher.",
    courses: [
      {
        act: "I",
        name: "Il Rubino di Mazara",
        ingredients: "Gambero Rosso de Mazara del Vallo cru (12°C), stracciatella fumée au bois d'olivier, caviar Oscietra Royal et perles d'agrumes de Calabre.",
        pairing: "Etna Bianco Superiore 2021 — Pietradolce",
        image: "/images/prawn-dish.jpg"
      },
      {
        act: "II",
        name: "Voce del Mare",
        ingredients: "Crème froide d'oursin de Sicile, gelée de yuzu sauvage, algues wakame séchées à l'air marin et poudre de corail.",
        pairing: "Greco di Tufo DOCG 2022 — Feudi di San Gregorio",
        image: "/images/prawn-dish.jpg"
      },
      {
        act: "III",
        name: "Bottoni di Mare",
        ingredients: "Petites pâtes rondes farcies à la chair de tourteau bleu, bouillon de homard réduit à l'os et zeste de bergamote confite.",
        pairing: "Falanghina del Sannio 2020 — Mustilli",
        image: "/images/pasta-caviar.jpg"
      },
      {
        act: "IV",
        name: "Raviolo Imperiale",
        ingredients: "Un raviolo unique, farce de langoustine de Méditerranée, 15g de caviar Oscietra Royal et bouillon d'or au safran d'Abruzzo.",
        pairing: "Trebbiano d'Abruzzo 2019 — Valentini",
        image: "/images/pasta-caviar.jpg"
      },
      {
        act: "V",
        name: "Rombo Selvaggio",
        ingredients: "Turbot sauvage de l'Adriatique en croûte d'herbes aromatiques, jus concentré d'arêtes au vin blanc et fenouil marin.",
        pairing: "Vermentino di Gallura DOCG 2021 — Capichera",
        image: "/images/chef-craft.jpg"
      },
      {
        act: "VI",
        name: "La Roccia & il Sale",
        ingredients: "Moule de roche de Tarente grillée au feu vif, huile de piment de Soverato et granité au sel de Cervia.",
        pairing: "Rossese di Dolceacqua DOC 2020 — Foresti",
        image: "/images/dining-room.jpg"
      },
      {
        act: "VII",
        name: "Brace di Seppia",
        ingredients: "Seiche de Méditerranée grillée à la braise, encre réduite au mascarpone fumé et gremolata de citron noir.",
        pairing: "Etna Rosso 2019 — Terre Nere",
        image: "/images/kitchen-fire.jpg"
      },
      {
        act: "VIII",
        name: "Transizione Salina",
        ingredients: "Granité aux algues corallines, huile de framboise sauvage et eau de tomate fermentée.",
        pairing: "Acqua Madre di Sicilia",
        image: "/images/tomato-saffron.jpg"
      },
      {
        act: "IX",
        name: "Isola Dolce",
        ingredients: "Sphère de chocolat blanc Ivoire, gelée d'eau de mer filtrée, cédrat confit et fleur de sel de Trapani.",
        pairing: "Passito di Pantelleria 'Ben Ryé' 2020 — Donnafugata",
        image: "/images/chocolate-dolce.jpg"
      }
    ]
  },
  {
    id: "luce-assoluta",
    tag: "11 Actes",
    name: "Luce Assoluta",
    italianName: "Il Percorso Completo del Chef",
    price: "290 €",
    winePairingPrice: "+ 200 € (8 Grands Crus Sélectionnés)",
    description: "Onze actes. L'intégralité de ce que Vincenzo Moretti pense de la cuisine italienne en 2026. Chaque service ne se répètera pas deux fois sous la même forme — la carte évolue avec les marchés, les saisons, l'humeur du matin.",
    courses: [
      {
        act: "I",
        name: "Benvenuto della Casa",
        ingredients: "Cinq amuse-bouches de la brigade : caillé de brebis fumé, tuile de riz soufflé au romarin, langoustine en tempura de nori, olive Taggiasca confite et bonbon de bouillon de poule.",
        pairing: "Franciacorta Brut Nature DOCG — Bellavista",
        image: "/images/chef-craft.jpg"
      },
      {
        act: "II",
        name: "L'Ombra del Bosco",
        ingredients: "Tartare de bœuf Fassona piémontaise au couteau, émulsion de noisettes Tonda Gentile d'Alba et poussières de cèpes séchés.",
        pairing: "Barbera d'Alba Superiore DOC 2020 — Giacomo Conterno",
        image: "/images/hero-dish.jpg"
      },
      {
        act: "III",
        name: "Il Rubino di Mazara",
        ingredients: "Gambero Rosso de Mazara del Vallo cru, stracciatella fumée, caviar Oscietra Royal 10g et perles d'agrumes.",
        pairing: "Etna Bianco Superiore 2021 — Pietradolce",
        image: "/images/prawn-dish.jpg"
      },
      {
        act: "IV",
        name: "Raviolo Imperiale al Caviale",
        ingredients: "Raviolo unique fait main, langoustine de Méditerranée, 15g de caviar et bouillon d'or au safran d'Abruzzo.",
        pairing: "Trebbiano d'Abruzzo 2019 — Valentini",
        image: "/images/pasta-caviar.jpg"
      },
      {
        act: "V",
        name: "Oro di Langhe",
        ingredients: "Risotto Carnaroli affiné 7 ans, beurre noisette de montagne, parmesan Vacche Rosse 36 mois et truffe blanche d'Alba.",
        pairing: "Barolo Monprivato DOCG 2017 — Giuseppe Mascarello",
        image: "/images/truffle-harvest.jpg"
      },
      {
        act: "VI",
        name: "Plin all'Antica",
        ingredients: "Agnolotti del Plin aux trois viandes, réduction de veau au romarin sauvage et genièvre.",
        pairing: "Brunello di Montalcino DOCG 2016 — Biondi-Santi",
        image: "/images/pasta-caviar.jpg"
      },
      {
        act: "VII",
        name: "Rombo Selvaggio",
        ingredients: "Turbot sauvage de l'Adriatique, croûte d'herbes aromatiques, jus concentré au vin blanc et fenouil marin.",
        pairing: "Vermentino di Gallura DOCG 2021 — Capichera",
        image: "/images/chef-craft.jpg"
      },
      {
        act: "VIII",
        name: "Fumo & Brace",
        ingredients: "Filet de bœuf Chianina fumé au sarment de vigne, mousseline de céleri brûlé et balsamique traditionnel de Modène 25 ans.",
        pairing: "Sassicaia Tenuta San Guido 2018 — Bolgheri",
        image: "/images/hero-dish.jpg"
      },
      {
        act: "IX",
        name: "Transizione Minerale",
        ingredients: "Granité de cédrat de Calabre, gelée d'origan sauvage et huile d'olive Coratina.",
        pairing: "Acqua Madre di Sicilia",
        image: "/images/prawn-dish.jpg"
      },
      {
        act: "X",
        name: "Castelmagno d'Alpeggio",
        ingredients: "Affinage en crypte 24 mois, mostarda di Cremona et réduction de vin Santo toscan.",
        pairing: "Vin Santo del Chianti Classico 2011 — Fontodi",
        image: "/images/dining-room.jpg"
      },
      {
        act: "XI",
        name: "L'Épilogue : Sfera di Cioccolato Criollo & Foin",
        ingredients: "Chocolat de plantation 75%, gianduja torréfié et glace au lait d'alpage.",
        pairing: "Barolo Chinato — Giulio Cocchi",
        image: "/images/chocolate-dolce.jpg"
      }
    ]
  }
];

export const aLaCarteSections = [
  {
    id: "antipasti",
    category: "ANTIPASTI & CRUDI",
    tagline: "Ce qu'on pose sur la table avant même que vous ayez faim.",
    items: [
      {
        name: "Crudo di Fassona Piemontese al Fumo di Rosmarino",
        description: "Tartare au couteau, émulsion de moelle fumée, câpres frites de Pantelleria et poussière d'olives taggiasche.",
        price: "48 €",
        allergens: "Aucun allergène majeur",
        image: "/images/hero-dish.jpg"
      },
      {
        name: "Gambero Rosso di Mazara, Stracciatella & Caviale",
        description: "Crevettes rouges crues, stracciatella di bufala fumée, 10g de caviar Oscietra Royal et zeste de cédrat confit.",
        price: "56 €",
        allergens: "Crustacés, Produits laitiers",
        image: "/images/prawn-dish.jpg"
      },
      {
        name: "Carciofo Spinoso di Sardegna alla Brace & Tuile de Pecorino",
        description: "Artichaut épineux rôti au feu de bois, émulsion d'herbes amères et sabayon tiède au Pecorino Romano DOP.",
        price: "42 €",
        allergens: "Produits laitiers, Œufs",
        image: "/images/dining-room.jpg"
      }
    ]
  },
  {
    id: "primi",
    category: "PRIMI PIATTI",
    tagline: "Les pâtes fraîches sont étirées à la main, ce matin. Comme tous les matins.",
    items: [
      {
        name: "Risotto Carnaroli Riserva 7 Anni allo Zafferano & Midollo",
        description: "Riz affiné 7 ans, pistils de safran de San Gimignano, moelle de bœuf confite et parmesan Vacche Rosse 36 mois.",
        price: "58 €",
        allergens: "Produits laitiers",
        image: "/images/truffle-harvest.jpg"
      },
      {
        name: "Raviolo Imperiale di Scampo & Caviale Oscietra",
        description: "Un raviolo unique géant, farce fondante de langoustine de Méditerranée, bouillon d'or au safran et caviar.",
        price: "68 €",
        allergens: "Gluten, Crustacés, Œufs, Produits laitiers",
        image: "/images/pasta-caviar.jpg"
      },
      {
        name: "Bottoni di Zucca Mantovana, Amaretto & Tartufo Nero",
        description: "Petits raviolis sphériques à la courge de Mantoue, beurre noisette clarifié à la sauge et truffe noire d'Ombrie.",
        price: "52 €",
        allergens: "Gluten, Fruits à coque, Produits laitiers, Œufs",
        image: "/images/pasta-caviar.jpg"
      }
    ]
  },
  {
    id: "secondi",
    category: "SECONDI PIATTI",
    tagline: "La braise dit la vérité sur un produit. Ici, on n'a rien à cacher.",
    items: [
      {
        name: "Filetto di Chianina al Fumo di Vite & Tartufo Bianco",
        description: "Chianina IGP maturée 45 jours, mousseline de céleri brûlé, balsamique traditionnel de Modène 25 ans.",
        price: "85 €",
        allergens: "Céleri",
        image: "/images/hero-dish.jpg"
      },
      {
        name: "Triglia di Scoglio in Crosta di Pane al Timo & Livèche",
        description: "Rouget de roche en écailles croustillantes, jus concentré d'arêtes au safran et fenouil marin.",
        price: "72 €",
        allergens: "Poisson, Gluten",
        image: "/images/chef-craft.jpg"
      }
    ]
  },
  {
    id: "dolci",
    category: "DOLCI & FINALI",
    tagline: "Pas de sucre pour oublier. Du sucre pour se souvenir.",
    items: [
      {
        name: "Sfera di Cioccolato Chuao 75% & Nocciola Piemonte IGP",
        description: "Cœur coulant au gianduja torréfié, fumage minute au bois d'olivier et glace au lait de foin d'alpage.",
        price: "34 €",
        allergens: "Produits laitiers, Fruits à coque, Œufs",
        image: "/images/chocolate-dolce.jpg"
      },
      {
        name: "Sinfonia di Cédrat di Diamante & Basilico Porpora",
        description: "Mousse légère au cédrat, granité au pamplemousse rose de Calabre et gelée d'estragon sauvage.",
        price: "28 €",
        allergens: "Aucun allergène majeur",
        image: "/images/tomato-saffron.jpg"
      }
    ]
  }
];

export const alaCarteCategories = aLaCarteSections;

export const wineCategories = [
  {
    region: "Piemonte & Langhe",
    description: "Les Nebbiolo du Piémont sont des vins qui exigent du temps — à la vigne, en cave, et dans le verre. Gianluca Ferri les sélectionne quand ils sont prêts, pas quand ils sont jeunes.",
    bottles: [
      { name: "Barolo Monfortino Riserva DOCG 2013", producer: "Giacomo Conterno", notes: "Cuir noble, rose fanée, truffe noire, tanins d'une longueur qui ne finit pas.", price: "1 250 €" },
      { name: "Barbaresco Rabajà DOCG 2016", producer: "Bruno Giacosa", notes: "Cerise griotte, réglisse sauvage, épices douces et une tension minérale sourde.", price: "480 €" },
      { name: "Gavi dei Gavi 'Black Label' 2021", producer: "La Scolca", notes: "Amande fraîche, silex, agrumes mûrs — une vivacité qui tranche net.", price: "140 €" }
    ]
  },
  {
    region: "Toscana & Bolgheri",
    description: "Les Sangiovese toscans sont la colonne vertébrale de l'Italie du vin. Fermi par nature, lumineux avec l'âge — ils accompagnent la viande comme peu d'autres peuvent le faire.",
    bottles: [
      { name: "Brunello di Montalcino Riserva DOCG 2012", producer: "Biondi-Santi Tenuta Greppo", notes: "Tabac blond, sous-bois, fraîcheur éternelle. Le vin dont on reparle le lendemain.", price: "720 €" },
      { name: "Masseto IGT Toscana 2017", producer: "Tenuta dell'Ornellaia", notes: "100% Merlot. Cacao pur, mûre sauvage, velours. L'exception confirme la règle.", price: "1 100 €" },
      { name: "Sassicaia DOC Bolgheri 2018", producer: "Tenuta San Guido", notes: "Cèdre, cassis, herbes de garrigue. Équilibre magistral.", price: "550 €" }
    ]
  },
  {
    region: "Isole & Vini Vulcanici",
    description: "Sur les pentes de l'Etna et les îles éoliennes, la vigne pousse dans la cendre refroidie. Ce qu'elle produit n'a pas d'équivalent sur le continent.",
    bottles: [
      { name: "Etna Rosso 'Contrada Calderara Sottana' 2019", producer: "Tenuta delle Terre Nere", notes: "Cendre volcanique, cerise sauvage, poivre blanc. Une énergie brute et pure.", price: "185 €" },
      { name: "Passito di Pantelleria 'Ben Ryé' 2020", producer: "Donnafugata", notes: "Abricot confit, zeste d'orange amère, miel de thym. Douceur sans lourdeur.", price: "160 €" }
    ]
  }
];

export const pressReviews = [
  {
    quote: "LUCENTE fait quelque chose de rare : une cuisine italienne qui n'a pas peur d'être italienne. Ni nostalgique, ni fusionnelle — juste précise, profonde, et étrangement émouvante.",
    author: "Guide Michelin — Étoiles & Distinctions",
    year: "2026"
  },
  {
    quote: "La salle plonge dans un demi-obscur doré. Les assiettes arrivent comme des révélations. Vincenzo Moretti a fait de Milan une destination gastronomique au sens strict du terme.",
    author: "Le Figaro Gastronomie",
    year: "2025"
  },
  {
    quote: "Le risotto au safran est servi dans un silence de cathédrale. Quand le Barolo Monfortino arrive dans le verre, vous comprenez pourquoi vous êtes venu à Milan.",
    author: "Gambero Rosso International",
    year: "2025"
  }
];

export const spaces = [
  {
    id: "sala-principale",
    name: "La Sala Chiaroscuro",
    capacity: "28 couverts",
    description: "Pierre de lave, lin obscur, lumière sur mesure pour chaque table. 28 places. Pas une de plus. L'architecte a conçu la salle pour que deux tablées ne s'entendent pas — ni ne se voient.",
    image: "/images/dining-room.jpg"
  },
  {
    id: "tavolo-dello-chef",
    name: "Il Tavolo dello Chef",
    capacity: "4 à 6 convives",
    description: "Un bloc de marbre de Carrare brut, taillé dans une seule pièce, face à la brigade. Le service n'est pas le même ici — il se passe des explications. Vous regardez. Vous comprenez.",
    image: "/images/chef-craft.jpg"
  },
  {
    id: "la-cantina-privata",
    name: "La Cantina Segreta",
    capacity: "Jusqu'à 10 convives",
    description: "Descendez. 1 400 bouteilles encadrent la table. La cave est la cave — pas une mise en scène. Si vous souhaitez un dîner confidentiel, c'est ici qu'il se tient.",
    image: "/images/cellar-architecture.jpg"
  }
];
