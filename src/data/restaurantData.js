export const restaurantInfo = {
  name: "LUCENTE",
  subtitle: "Alta Cucina Contemporanea",
  city: "Milano",
  district: "Quadrilatero della Moda — Via Monte Napoleone, 14",
  address: "Via Monte Napoleone, 14, 20121 Milano MI, Italia",
  phone: "+39 02 8945 7700",
  email: "conciergerie@lucente-milano.com",
  michelinStars: 2,
  openingHours: "Martedì - Sabato : 12:30–15:00 & 19:30–23:30",
  hoursText: "Mardi au Samedi · Déjeuner 12h30–15h00 · Dîner 19h30–23h30",
  closedDays: "Chiuso Domenica & Lunedì",
  chef: {
    name: "Vincenzo Moretti",
    role: {
      it: "Chef Esecutivo & Fondatore",
      en: "Executive Chef & Founder",
      fr: "Chef Exécutif & Fondateur"
    },
    bio: {
      it: "È cresciuto al rumore della brace, non al suono dei diplomi. Emiliano di nascita, Vincenzo Moretti ha imparato a cucinare nella cucina di sua nonna a Reggio Emilia, prima di attraversare Modena, Tokyo e Londra — non per perdersi, ma per comprendere ciò che desiderava ritrovare. Da LUCENTE spoglia la cucina italiana di ogni artificio.",
      en: "He grew up to the sound of embers, not diplomas. Born in Emilia, Vincenzo Moretti learned to cook in his grandmother's kitchen in Reggio Emilia, before journeying through Modena, Tokyo, and London. At LUCENTE, he strips Italian cuisine of every disguise.",
      fr: "Il a grandi au bruit de la braise, pas au son des diplômes. Émilien de naissance, Vincenzo Moretti a appris à cuisiner dans la cuisine de sa grand-mère à Reggio Emilia, avant de traverser Modène, Tokyo et Londres. Chez LUCENTE, il débarrasse la cuisine italienne de tout ce qui la couvre."
    },
    quote: {
      it: "Non si migliora un'albicocca di luglio. Si impara a non rovinarla.",
      en: "You don't improve a July apricot. You learn how not to ruin it.",
      fr: "On n'améliore pas un abricot de juillet. On apprend à ne pas le gâcher."
    },
    signature: "Vincenzo Moretti"
  },
  sommelier: {
    name: "Gianluca Ferri",
    role: {
      it: "Chef Sommelier & Direttore di Cantina",
      en: "Head Sommelier & Cellar Director",
      fr: "Chef Sommelier & Directeur de Cave"
    },
    philosophy: {
      it: "1.400 referenze selezionate non per regione, ma per pura emozione.",
      en: "1,400 references selected not by region, but by pure emotional resonance.",
      fr: "1 400 références choisies non par région, mais par pure émotion."
    }
  }
};

export const rawTastingMenus = [
  {
    id: "terra-memoria",
    tag: { it: "7 Atti", en: "7 Acts", fr: "7 Actes" },
    name: "Terra & Memoria",
    italianName: "Radici, Materia e Suolo",
    price: "210 €",
    winePairingPrice: {
      it: "+ 130 € (5 Calici di Pregio)",
      en: "+ 130 € (5 Prestigious Glasses)",
      fr: "+ 130 € (5 Calici di Pregio)"
    },
    description: {
      it: "Sette atti costruiti attorno a un'idea semplice: ciò che la terra italiana conserva per secoli e libera in un solo morso. Tartufi, braci, lunghe maturazioni.",
      en: "Seven acts built around a singular idea: what Italian soil holds within for centuries, released in a single bite. Truffles, embers, and patient aging.",
      fr: "Sept actes construits autour d'une idée simple : ce que la terre italienne garde en elle pendant des siècles, et ce qu'elle libère en une bouchée. Truffes, braises, maturations longues."
    },
    courses: [
      {
        act: "I",
        name: "L'Ombra del Bosco",
        ingredients: {
          it: "Battuta al coltello di fassona piemontese, emulsione di nocciole Tonda Gentile d'Alba e polvere di porcini secchi.",
          en: "Hand-cut Piedmontese Fassona beef tartare, Tonda Gentile d'Alba hazelnut emulsion, and wild dried porcini mushroom dust.",
          fr: "Tartare de bœuf Fassona piémontaise au couteau, émulsion de noisettes Tonda Gentile d'Alba et poussières de cèpes séchés."
        },
        pairing: "Barbera d'Alba Superiore DOC 2020 — Giacomo Conterno",
        image: "/images/hero-dish.webp"
      },
      {
        act: "II",
        name: "Oro di Langhe",
        ingredients: {
          it: "Risotto Carnaroli Riserva affinato 7 anni, burro nocciola di malga, Parmigiano Vacche Rosse 36 mesi e scaglie di tartufo bianco d'Alba.",
          en: "7-year aged Carnaroli Riserva rice, alpine mountain noisette butter, 36-month Vacche Rosse Parmigiano, and Alba white truffle shavings.",
          fr: "Risotto Carnaroli Riserva affiné 7 ans, beurre noisette de montagne, parmesan Vacche Rosse 36 mois et lamelles de truffe blanche d'Alba."
        },
        pairing: "Barolo Monprivato DOCG 2017 — Giuseppe Mascarello",
        image: "/images/truffle-harvest.webp"
      },
      {
        act: "III",
        name: "Plin all'Antica",
        ingredients: {
          it: "Agnolotti del Plin ripieni ai tre arrosti, fondo bruno lucido al rosmarino selvatico e bacche di ginepro.",
          en: "Handcrafted Agnolotti del Plin filled with three roasted meats, glossy veal reduction infused with wild rosemary and juniper.",
          fr: "Agnolotti del Plin farcis aux trois viandes rôties, réduction brillante de jus de veau infusé au romarin sauvage et genièvre."
        },
        pairing: "Brunello di Montalcino DOCG 2016 — Biondi-Santi",
        image: "/images/pasta-caviar.webp"
      },
      {
        act: "IV",
        name: "Fumo & Brace",
        ingredients: {
          it: "Filetto di Chianina cotto su tralci di vite, crema di sedano rapa bruciato e scalogni al balsamico tradizionale di Modena DOP 25 anni.",
          en: "Chianina beef tenderloin smoked over vine shoots, charred celeriac purée, and shallots with 25-year traditional Modena balsamic DOP.",
          fr: "Filet de bœuf Chianina fumé au bois de sarments de vigne, mousseline de céleri-rave brûlé et échalotes confites au balsamique traditionnel de Modène DOP 25 ans."
        },
        pairing: "Sassicaia Tenuta San Guido 2018 — Bolgheri",
        image: "/images/hero-dish.webp"
      },
      {
        act: "V",
        name: "Transizione Minerale",
        ingredients: {
          it: "Granita di cedro calabrese, gelatina di origano selvatico pugliese e gocce di olio extravergine Coratina.",
          en: "Calabrian citron granita, wild Puglian oregano jelly, and fresh cold-pressed Coratina extra virgin olive oil.",
          fr: "Granité de cédrat de Calabre, gelée d'origan sauvage des Pouilles et filet d'huile d'olive nouvelle Coratina."
        },
        pairing: "Acqua Madre di Sicilia",
        image: "/images/prawn-dish.webp"
      },
      {
        act: "VI",
        name: "Castelmagno d'Alpeggio",
        ingredients: {
          it: "Affinamento in cripta di 24 mesi, mostarda di Cremona alle pere e riduzione di Vin Santo toscano.",
          en: "24-month cellar-aged alpine Castelmagno cheese, Cremona pear mostarda, and Tuscan Vin Santo glaze.",
          fr: "Affinage en crypte de 24 mois, mostarda di Cremona aux poires et réduction de vin Santo toscan."
        },
        pairing: "Vin Santo del Chianti Classico 2011 — Fontodi",
        image: "/images/dining-room.webp"
      },
      {
        act: "VII",
        name: "Oro Bruciato",
        ingredients: {
          it: "Sfoglia croccante al gianduja tostato, gelato al latte di fieno d'alpeggio e cialda al cacao amaro Criollo.",
          en: "Crisp roasted gianduja pastry, alpine hay milk ice cream, and dark Criollo cocoa wafer.",
          fr: "Feuilletage croustillant au gianduja torréfié, glace au lait de foin d'alpage et tuile au cacao amer Criollo."
        },
        pairing: "Moscato d'Asti Canelli DOCG — Bera Vittorio",
        image: "/images/chocolate-dolce.webp"
      }
    ]
  },
  {
    id: "mare-orizzonte",
    tag: { it: "9 Atti", en: "9 Acts", fr: "9 Actes" },
    name: "Mare & Orizzonte",
    italianName: "Acque Profonde e Isole",
    price: "240 €",
    winePairingPrice: {
      it: "+ 160 € (6 Calici Rari)",
      en: "+ 160 € (6 Rare Glasses)",
      fr: "+ 160 € (6 Calici Rari)"
    },
    description: {
      it: "Nove sequenze marine, dalla Sicilia all'Adriatico. Non una cartolina del mare, ma ciò che le acque custodiscono nei loro abissi più puri.",
      en: "Nine marine sequences, from Sicily to the Adriatic. Not a postcard of the sea, but what the deep ocean reveals only to those who know where to seek.",
      fr: "Neuf séquences marines, de la Sicile à l'Adriatique. Pas une carte postale de la mer — plutôt ce que la mer garde dans ses profondeurs et ne livre qu'à ceux qui savent où chercher."
    },
    courses: [
      {
        act: "I",
        name: "Il Rubino di Mazara",
        ingredients: {
          it: "Gambero Rosso di Mazara del Vallo crudo (12°C), stracciatella affumicata al legno d'ulivo, caviale Oscietra Royal e perle di agrumi calabresi.",
          en: "Raw Mazara del Vallo red prawn served at 12°C, olive-wood smoked stracciatella, Royal Oscietra caviar, and Calabrian citrus pearls.",
          fr: "Gambero Rosso de Mazara del Vallo cru (12°C), stracciatella fumée au bois d'olivier, caviar Oscietra Royal et perles d'agrumes de Calabre."
        },
        pairing: "Etna Bianco Superiore 2021 — Pietradolce",
        image: "/images/prawn-dish.webp"
      },
      {
        act: "II",
        name: "Voce del Mare",
        ingredients: {
          it: "Crema fredda di ricci di mare siciliani, gelatina di yuzu selvatico, alghe wakame essiccate e polvere di corallo.",
          en: "Chilled Sicilian sea urchin velouté, wild yuzu gel, sun-dried marine seaweeds, and coral essence.",
          fr: "Crème froide d'oursin de Sicile, gelée de yuzu sauvage, algues wakame séchées à l'air marin et poudre de corail."
        },
        pairing: "Greco di Tufo DOCG 2022 — Feudi di San Gregorio",
        image: "/images/prawn-dish.webp"
      },
      {
        act: "III",
        name: "Bottoni di Mare",
        ingredients: {
          it: "Piccoli bottoni di pasta ripieni di granchio blu, brodo concentrato di astice e scorza di bergamotto candito.",
          en: "Handmade pasta buttons stuffed with blue crab, concentrated lobster reduction, and candied bergamot zest.",
          fr: "Petites pâtes rondes farcies à la chair de tourteau bleu, bouillon de homard réduit à l'os et zeste de bergamote confite."
        },
        pairing: "Falanghina del Sannio 2020 — Mustilli",
        image: "/images/pasta-caviar.webp"
      },
      {
        act: "IV",
        name: "Raviolo Imperiale",
        ingredients: {
          it: "Raviolo unico artigianale, ripieno di scampi mediterranei, 15g di caviale Oscietra Royal e brodo puro allo zafferano abruzzese.",
          en: "Single imperial raviolo filled with Mediterranean langoustine, 15g Royal Oscietra caviar, and golden saffron broth.",
          fr: "Un raviolo unique, farce de langoustine de Méditerranée, 15g de caviar Oscietra Royal et bouillon d'or au safran d'Abruzzo."
        },
        pairing: "Trebbiano d'Abruzzo 2019 — Valentini",
        image: "/images/pasta-caviar.webp"
      },
      {
        act: "V",
        name: "Rombo Selvaggio",
        ingredients: {
          it: "Rombo chiodato dell'Adriatico in crosta d'erbe aromatiche, fondo ristretto di lische al vino bianco e finocchietto marino.",
          en: "Wild Adriatic turbot crusted with coastal herbs, clarified bone broth with white wine and sea fennel.",
          fr: "Turbot sauvage de l'Adriatique en croûte d'herbes aromatiques, jus concentré d'arêtes au vin blanc et fenouil marin."
        },
        pairing: "Vermentino di Gallura DOCG 2021 — Capichera",
        image: "/images/chef-craft.webp"
      },
      {
        act: "VI",
        name: "La Roccia & il Sale",
        ingredients: {
          it: "Cozza di scoglio di Taranto arrostita su brace viva, olio al peperoncino di Soverato e granita al sale dolce di Cervia.",
          en: "Taranto rock mussel blistered over open embers, Soverato chili oil, and Cervia sweet salt granita.",
          fr: "Moule de roche de Tarente grillée au feu vif, huile de piment de Soverato et granité au sel de Cervia."
        },
        pairing: "Rossese di Dolceacqua DOC 2020 — Foresti",
        image: "/images/dining-room.webp"
      },
      {
        act: "VII",
        name: "Brace di Seppia",
        ingredients: {
          it: "Seppia mediterranea alla brace, nero ristretto al mascarpone affumicato e gremolata al limone nero.",
          en: "Embers-grilled Mediterranean cuttlefish, smoked mascarpone black ink reduction, and black lemon gremolata.",
          fr: "Seiche de Méditerranée grillée à la braise, encre réduite au mascarpone fumé et gremolata de citron noir."
        },
        pairing: "Etna Rosso 2019 — Terre Nere",
        image: "/images/kitchen-fire.webp"
      },
      {
        act: "VIII",
        name: "Transizione Salina",
        ingredients: {
          it: "Granita di alghe coralline, olio di lamponi selvatici e acqua di pomodoro chiarificata.",
          en: "Coralline seaweed granita, wild raspberry essence, and fermented clarified tomato water.",
          fr: "Granité aux algues corallines, huile de framboise sauvage et eau de tomate fermentée."
        },
        pairing: "Acqua Madre di Sicilia",
        image: "/images/tomato-saffron.webp"
      },
      {
        act: "IX",
        name: "Isola Dolce",
        ingredients: {
          it: "Sfera di cioccolato bianco Ivoire, gelatina d'acqua marina filtrata, cedro candito e fiore di sale di Trapani.",
          en: "Ivoire white chocolate sphere, filtered seawater jelly, candied citron, and Trapani sea salt crystals.",
          fr: "Sphère de chocolat blanc Ivoire, gelée d'eau de mer filtrée, cédrat confit et fleur de sel de Trapani."
        },
        pairing: "Passito di Pantelleria 'Ben Ryé' 2020 — Donnafugata",
        image: "/images/chocolate-dolce.webp"
      }
    ]
  },
  {
    id: "luce-assoluta",
    tag: { it: "11 Atti", en: "11 Acts", fr: "11 Actes" },
    name: "Luce Assoluta",
    italianName: "Il Percorso Completo del Chef",
    price: "290 €",
    winePairingPrice: {
      it: "+ 200 € (8 Grands Crus Selezionati)",
      en: "+ 200 € (8 Curated Grand Crus)",
      fr: "+ 200 € (8 Grands Crus Sélectionnés)"
    },
    description: {
      it: "Undici atti. L'intera espressione di ciò che Vincenzo Moretti intende per cucina italiana contemporanea nel 2026. Il percorso evolve ogni giorno secondo il ritmo naturale.",
      en: "Eleven acts. The complete expression of Vincenzo Moretti's vision of contemporary Italian cuisine in 2026. The menu evolves daily with the markets and season.",
      fr: "Onze actes. L'intégralité de ce que Vincenzo Moretti pense de la cuisine italienne en 2026. Chaque service ne se répètera pas deux fois sous la même forme — la carte évolue avec les marchés, les saisons, l'humeur du matin."
    },
    courses: [
      {
        act: "I",
        name: "Benvenuto della Casa",
        ingredients: {
          it: "Cinque piccoli assaggi della brigata: cagliata di pecora affumicata, cialda di riso al rosmarino, scampo in tempura di nori e consommé dorato.",
          en: "Five welcoming amuse-bouches from the brigade: smoked sheep's curd, rosemary puffed rice crisp, nori tempura langoustine, and golden broth.",
          fr: "Cinque amuse-bouches de la brigade : caillé de brebis fumé, tuile de riz soufflé au romarin, langoustine en tempura de nori et bonbon de bouillon."
        },
        pairing: "Franciacorta Brut Nature DOCG — Bellavista",
        image: "/images/chef-craft.webp"
      },
      {
        act: "II",
        name: "L'Ombra del Bosco",
        ingredients: {
          it: "Battuta al coltello di fassona piemontese, emulsione di nocciole Tonda Gentile e polvere di porcini.",
          en: "Piedmontese Fassona beef tartare, Tonda Gentile hazelnut emulsion, and porcini powder.",
          fr: "Tartare de bœuf Fassona piémontaise au couteau, émulsion de noisettes Tonda Gentile d'Alba et poussières de cèpes séchés."
        },
        pairing: "Barbera d'Alba Superiore DOC 2020 — Giacomo Conterno",
        image: "/images/hero-dish.webp"
      },
      {
        act: "III",
        name: "Il Rubino di Mazara",
        ingredients: {
          it: "Gambero Rosso di Mazara crudo, stracciatella affumicata, caviale Oscietra Royal 10g e perle di agrumi.",
          en: "Raw Mazara red prawn, smoked stracciatella, 10g Royal Oscietra caviar, and citrus pearls.",
          fr: "Gambero Rosso de Mazara del Vallo cru, stracciatella fumée, caviar Oscietra Royal 10g et perles d'agrumes."
        },
        pairing: "Etna Bianco Superiore 2021 — Pietradolce",
        image: "/images/prawn-dish.webp"
      },
      {
        act: "IV",
        name: "Raviolo Imperiale al Caviale",
        ingredients: {
          it: "Raviolo fatto a mano, scampi mediterranei, 15g di caviale e brodo dorato allo zafferano.",
          en: "Handmade single raviolo, Mediterranean langoustine, 15g caviar, and saffron broth.",
          fr: "Raviolo unique fait main, langoustine de Méditerranée, 15g de caviar et bouillon d'or au safran d'Abruzzo."
        },
        pairing: "Trebbiano d'Abruzzo 2019 — Valentini",
        image: "/images/pasta-caviar.webp"
      },
      {
        act: "V",
        name: "Oro di Langhe",
        ingredients: {
          it: "Risotto Carnaroli affinato 7 anni, burro nocciola, parmigiano 36 mesi e tartufo bianco d'Alba.",
          en: "7-year aged Carnaroli rice, mountain noisette butter, 36-month parmesan, and Alba white truffle.",
          fr: "Risotto Carnaroli affiné 7 ans, beurre noisette de montagne, parmesan Vacche Rosse 36 mois et truffe blanche d'Alba."
        },
        pairing: "Barolo Monprivato DOCG 2017 — Giuseppe Mascarello",
        image: "/images/truffle-harvest.webp"
      },
      {
        act: "VI",
        name: "Plin all'Antica",
        ingredients: {
          it: "Agnolotti del Plin ai tre arrosti, fondo di vitello al rosmarino e ginepro.",
          en: "Agnolotti del Plin filled with three roasted meats, rosemary veal glaze.",
          fr: "Agnolotti del Plin aux trois viandes, réduction de veau au romarin sauvage et genièvre."
        },
        pairing: "Brunello di Montalcino DOCG 2016 — Biondi-Santi",
        image: "/images/pasta-caviar.webp"
      },
      {
        act: "VII",
        name: "Rombo Selvaggio",
        ingredients: {
          it: "Rombo dell'Adriatico in crosta d'erbe, fondo ristretto al vino bianco e finocchio marino.",
          en: "Wild Adriatic turbot, herb crust, white wine reduction, and sea fennel.",
          fr: "Turbot sauvage de l'Adriatique, croûte d'herbes aromatiques, jus concentré au vin blanc et fenouil marin."
        },
        pairing: "Vermentino di Gallura DOCG 2021 — Capichera",
        image: "/images/chef-craft.webp"
      },
      {
        act: "VIII",
        name: "Fumo & Brace",
        ingredients: {
          it: "Filetto di Chianina affumicato ai tralci di vite, crema di sedano bruciato e balsamico tradizionale 25 anni.",
          en: "Chianina beef tenderloin smoked over vine wood, burnt celeriac purée, 25-year balsamic.",
          fr: "Filet de bœuf Chianina fumé au sarment de vigne, mousseline de céleri brûlé et balsamique traditionnel de Modène 25 ans."
        },
        pairing: "Sassicaia Tenuta San Guido 2018 — Bolgheri",
        image: "/images/hero-dish.webp"
      },
      {
        act: "IX",
        name: "Transizione Minerale",
        ingredients: {
          it: "Granita di cedro calabrese, origano selvatico e olio Coratina.",
          en: "Calabrian citron granita, wild oregano, and Coratina olive oil.",
          fr: "Granité de cédrat de Calabre, gelée d'origan sauvage et huile d'olive Coratina."
        },
        pairing: "Acqua Madre di Sicilia",
        image: "/images/prawn-dish.webp"
      },
      {
        act: "X",
        name: "Castelmagno d'Alpeggio",
        ingredients: {
          it: "Affinamento in cripta 24 mesi, mostarda di Cremona e riduzione di Vin Santo.",
          en: "24-month cellar-aged Castelmagno, Cremona mostarda, Vin Santo reduction.",
          fr: "Affinage en crypte 24 mois, mostarda di Cremona et réduction de vin Santo toscan."
        },
        pairing: "Vin Santo del Chianti Classico 2011 — Fontodi",
        image: "/images/dining-room.webp"
      },
      {
        act: "XI",
        name: "Sfera di Cioccolato Criollo & Fieno",
        ingredients: {
          it: "Cioccolato 75%, gianduja tostato e gelato al latte d'alpeggio.",
          en: "75% single-origin chocolate, roasted gianduja, and alpine hay milk ice cream.",
          fr: "Chocolat de plantation 75%, gianduja torréfié et glace au lait d'alpage."
        },
        pairing: "Barolo Chinato — Giulio Cocchi",
        image: "/images/chocolate-dolce.webp"
      }
    ]
  }
];

export function getTastingMenus(lang = 'fr') {
  return rawTastingMenus.map(m => ({
    ...m,
    tag: typeof m.tag === 'object' ? (m.tag[lang] || m.tag.fr) : m.tag,
    winePairingPrice: typeof m.winePairingPrice === 'object' ? (m.winePairingPrice[lang] || m.winePairingPrice.fr) : m.winePairingPrice,
    description: typeof m.description === 'object' ? (m.description[lang] || m.description.fr) : m.description,
    courses: m.courses.map(c => ({
      ...c,
      ingredients: typeof c.ingredients === 'object' ? (c.ingredients[lang] || c.ingredients.fr) : c.ingredients
    }))
  }));
}

export const tastingMenus = getTastingMenus('fr');

export const rawALaCarteSections = [
  {
    id: "antipasti",
    category: "ANTIPASTI & CRUDI",
    tagline: {
      it: "Ciò che portiamo a tavola prima ancora che abbiate fame.",
      en: "What we bring to the table before hunger even begins.",
      fr: "Ce qu'on pose sur la table avant même que vous ayez faim."
    },
    items: [
      {
        name: "Crudo di Fassona Piemontese al Fumo di Rosmarino",
        description: {
          it: "Battuta al coltello, emulsione di midollo affumicato, capperi fritti di Pantelleria e polvere di olive taggiasche.",
          en: "Hand-cut tartare, smoked bone marrow emulsion, crispy Pantelleria capers, and taggiasca olive dust.",
          fr: "Tartare au couteau, émulsion de moelle fumée, câpres frites de Pantelleria et poussière d'olives taggiasche."
        },
        price: "48 €",
        allergens: {
          it: "Nessun allergene maggiore",
          en: "No major allergens",
          fr: "Aucun allergène majeur"
        },
        image: "/images/hero-dish.webp"
      },
      {
        name: "Gambero Rosso di Mazara, Stracciatella & Caviale",
        description: {
          it: "Gamberi rossi crudi, stracciatella di bufala affumicata, 10g di caviale Oscietra Royal e scorza di cedro candito.",
          en: "Raw red prawns, smoked buffalo stracciatella, 10g Royal Oscietra caviar, and candied citron zest.",
          fr: "Crevettes rouges crues, stracciatella di bufala fumée, 10g de caviar Oscietra Royal et zeste de cédrat confit."
        },
        price: "56 €",
        allergens: {
          it: "Crostacei, Latticini",
          en: "Shellfish, Dairy",
          fr: "Crustacés, Produits laitiers"
        },
        image: "/images/prawn-dish.webp"
      },
      {
        name: "Carciofo Spinoso di Sardegna alla Brace & Pecorino",
        description: {
          it: "Carciofo spinoso arrostito a legna, emulsione di erbe amare e zabaione caldo al Pecorino Romano DOP.",
          en: "Wood-fired thorny Sardinian artichoke, bitter herb emulsion, and warm Pecorino Romano DOP sabayon.",
          fr: "Artichaut épineux rôti au feu de bois, émulsion d'herbes amères et sabayon tiède au Pecorino Romano DOP."
        },
        price: "42 €",
        allergens: {
          it: "Latticini, Uova",
          en: "Dairy, Eggs",
          fr: "Produits laitiers, Œufs"
        },
        image: "/images/dining-room.webp"
      }
    ]
  },
  {
    id: "primi",
    category: "PRIMI PIATTI",
    tagline: {
      it: "La pasta fresca è tirata a mano questa mattina. Come ogni mattina.",
      en: "Fresh pasta hand-rolled this morning. As every single morning.",
      fr: "Les pâtes fraîches sont étirées à la main, ce matin. Comme tous les matins."
    },
    items: [
      {
        name: "Risotto Carnaroli Riserva 7 Anni allo Zafferano & Midollo",
        description: {
          it: "Riso affinato 7 anni, pistilli di zafferano di San Gimignano, midollo di bue confit e parmigiano 36 mesi.",
          en: "7-year aged rice, San Gimignano saffron pistils, braised beef marrow, and 36-month parmesan.",
          fr: "Riz affiné 7 ans, pistils de safran de San Gimignano, moelle de bœuf confite et parmesan Vacche Rosse 36 mois."
        },
        price: "58 €",
        allergens: {
          it: "Latticini",
          en: "Dairy",
          fr: "Produits laitiers"
        },
        image: "/images/truffle-harvest.webp"
      },
      {
        name: "Raviolo Imperiale di Scampo & Caviale Oscietra",
        description: {
          it: "Raviolo gigante unico, ripieno fondente di scampi mediterranei, brodo dorato allo zafferano e caviale.",
          en: "Giant imperial raviolo, Mediterranean langoustine filling, golden saffron broth, and caviar.",
          fr: "Un raviolo unique géant, farce fondante de langoustine de Méditerranée, bouillon d'or au safran et caviar."
        },
        price: "68 €",
        allergens: {
          it: "Glutine, Crostacei, Uova, Latticini",
          en: "Gluten, Shellfish, Eggs, Dairy",
          fr: "Gluten, Crustacés, Œufs, Produits laitiers"
        },
        image: "/images/pasta-caviar.webp"
      },
      {
        name: "Bottoni di Zucca Mantovana, Amaretto & Tartufo Nero",
        description: {
          it: "Piccoli ravioli sferici alla zucca di Mantova, burro chiarificato alla salvia e tartufo nero umbro.",
          en: "Spherical Mantuan pumpkin ravioli, sage-infused clarified brown butter, and Umbrian black truffle.",
          fr: "Petits raviolis sphériques à la courge de Mantoue, beurre noisette clarifié à la sauge et truffe noire d'Ombrie."
        },
        price: "52 €",
        allergens: {
          it: "Glutine, Frutta a guscio, Latticini, Uova",
          en: "Gluten, Tree nuts, Dairy, Eggs",
          fr: "Gluten, Fruits à coque, Produits laitiers, Œufs"
        },
        image: "/images/pasta-caviar.webp"
      }
    ]
  },
  {
    id: "secondi",
    category: "SECONDI PIATTI",
    tagline: {
      it: "La brace rivela la verità della materia prima.",
      en: "Open embers speak the truth of pure raw ingredients.",
      fr: "La braise dit la vérité sur un produit. Ici, on n'a rien à cacher."
    },
    items: [
      {
        name: "Filetto di Chianina al Fumo di Vite & Tartufo Bianco",
        description: {
          it: "Chianina IGP frollata 45 giorni, crema di sedano bruciato, balsamico tradizionale di Modena 25 anni.",
          en: "45-day dry-aged Chianina PGI, charred celeriac purée, 25-year traditional Modena balsamic.",
          fr: "Chianina IGP maturée 45 jours, mousseline de céleri brûlé, balsamique traditionnel de Modène 25 ans."
        },
        price: "85 €",
        allergens: {
          it: "Sedano",
          en: "Celery",
          fr: "Céleri"
        },
        image: "/images/hero-dish.webp"
      },
      {
        name: "Triglia di Scoglio in Crosta di Pane al Timo & Livèche",
        description: {
          it: "Triglia di scoglio in scaglie croccanti, fondo ristretto di lische allo zafferano e finocchio marino.",
          en: "Crisp-scaled rock red mullet, concentrated saffron fish reduction, and wild sea fennel.",
          fr: "Rouget de roche en écailles croustillantes, jus concentré d'arêtes au safran et fenouil marin."
        },
        price: "72 €",
        allergens: {
          it: "Pesce, Glutine",
          en: "Fish, Gluten",
          fr: "Poisson, Gluten"
        },
        image: "/images/chef-craft.webp"
      }
    ]
  },
  {
    id: "dolci",
    category: "DOLCI & FINALI",
    tagline: {
      it: "Non zucchero per dimenticare, ma zucchero per ricordare.",
      en: "Not sugar to forget, but sugar to remember.",
      fr: "Pas de sucre pour oublier. Du sucre pour se souvenir."
    },
    items: [
      {
        name: "Sfera di Cioccolato Chuao 75% & Nocciola Piemonte IGP",
        description: {
          it: "Cuore fondente al gianduja tostato, affumicatura espressa al legno d'olivo e gelato al latte di fieno.",
          en: "Molten roasted gianduja core, tableside olive-wood smoke, and alpine hay milk ice cream.",
          fr: "Cœur coulant au gianduja torréfié, fumage minute au bois d'olivier et glace au lait de foin d'alpage."
        },
        price: "34 €",
        allergens: {
          it: "Latticini, Frutta a guscio, Uova",
          en: "Dairy, Tree nuts, Eggs",
          fr: "Produits laitiers, Fruits à coque, Œufs"
        },
        image: "/images/chocolate-dolce.webp"
      },
      {
        name: "Sinfonia di Cedro di Diamante & Basilico Porpora",
        description: {
          it: "Mousse leggera al cedro, granita al pompelmo rosa calabrese e gelatina di dragoncello selvatico.",
          en: "Light Diamante citron mousse, Calabrian pink grapefruit granita, and wild tarragon jelly.",
          fr: "Mousse légère au cédrat, granité au pamplemousse rose de Calabre et gelée d'estragon sauvage."
        },
        price: "28 €",
        allergens: {
          it: "Nessun allergene maggiore",
          en: "No major allergens",
          fr: "Aucun allergène majeur"
        },
        image: "/images/tomato-saffron.webp"
      }
    ]
  }
];

export function getALaCarteSections(lang = 'fr') {
  return rawALaCarteSections.map(sec => ({
    ...sec,
    tagline: typeof sec.tagline === 'object' ? (sec.tagline[lang] || sec.tagline.fr) : sec.tagline,
    items: sec.items.map(item => ({
      ...item,
      description: typeof item.description === 'object' ? (item.description[lang] || item.description.fr) : item.description,
      allergens: typeof item.allergens === 'object' ? (item.allergens[lang] || item.allergens.fr) : item.allergens
    }))
  }));
}

export const aLaCarteSections = getALaCarteSections('fr');
export const alaCarteCategories = aLaCarteSections;

export const spaces = [
  {
    id: "sala-principale",
    name: "La Sala Chiaroscuro",
    capacity: "28 coperti",
    description: "Pietra lavica, lino scuro, illuminazione sartoriale per ogni tavolo.",
    image: "/images/dining-room.webp"
  },
  {
    id: "tavolo-dello-chef",
    name: "Il Tavolo dello Chef",
    capacity: "4 a 6 ospiti",
    description: "Un monolite di marmo di Carrara grezzo davanti alla brigata di cucina.",
    image: "/images/chef-craft.webp"
  },
  {
    id: "la-cantina-privata",
    name: "La Cantina Segreta",
    capacity: "Fino a 10 ospiti",
    description: "1.400 bottiglie storiche e riserve uniche per cene confidenziali.",
    image: "/images/cellar-architecture.webp"
  }
];

export const rawPressReviews = [
  {
    quote: {
      it: "LUCENTE compie un gesto raro: una cucina italiana che non ha paura di essere italiana. Né nostalgica, né fusion: precisa, profonda e straordinariamente emozionante.",
      en: "LUCENTE accomplishes something rare: Italian cuisine unafraid to be Italian. Neither nostalgic nor fusion: precise, profound, and stirringly emotional.",
      fr: "LUCENTE fait quelque chose de rare : une cuisine italienne qui n'a pas peur d'être italienne. Ni nostalgique, ni fusionnelle — juste précise, profonde, et étrangement émouvante."
    },
    author: {
      it: "Guida Michelin — Stelle & Distinzioni",
      en: "Michelin Guide — Stars & Distinctions",
      fr: "Guide Michelin — Étoiles & Distinctions"
    },
    year: "2026"
  },
  {
    quote: {
      it: "La sala è immersa in una dorata penombra. I piatti giungono come autentiche rivelazioni. Vincenzo Moretti ha reso Milano una meta gastronomica imperdibile.",
      en: "The dining room is bathed in golden twilight. The dishes arrive like pure revelations. Vincenzo Moretti has made Milan an indispensable culinary capital.",
      fr: "La salle plonge dans un demi-obscur doré. Les assiettes arrivent comme des révélations. Vincenzo Moretti a fait de Milan une destination gastronomique au sens strict du terme."
    },
    author: "Le Figaro Gastronomie",
    year: "2025"
  },
  {
    quote: {
      it: "Il risotto allo zafferano viene servito in un silenzio di cattedrale. Quando il Barolo entra nel calice, si comprende appieno perché si è venuti a Milano.",
      en: "The saffron risotto is served in a cathedral-like silence. As Barolo fills your crystal glass, you understand why you traveled to Milan.",
      fr: "Le risotto au safran est servi dans un silence de cathédrale. Quand le Barolo Monfortino arrive dans le verre, vous comprenez pourquoi vous êtes venu à Milan."
    },
    author: "Gambero Rosso International",
    year: "2025"
  }
];

export function getPressReviews(lang = 'fr') {
  return rawPressReviews.map(r => ({
    quote: typeof r.quote === 'object' ? (r.quote[lang] || r.quote.fr) : r.quote,
    author: typeof r.author === 'object' ? (r.author[lang] || r.author.fr) : r.author,
    year: r.year
  }));
}

export const pressReviews = getPressReviews('fr');

