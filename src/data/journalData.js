export const journalCategories = [
  { id: 'ALL', label: { it: 'Tutte', en: 'All', fr: 'Toutes' } },
  { id: 'PHILOSOPHY', label: { it: 'Filosofia', en: 'Philosophy', fr: 'Philosophie' } },
  { id: 'WINE', label: { it: 'Cantina & Vini', en: 'Cellar & Wines', fr: 'Cave & Vins' } },
  { id: 'FOOD', label: { it: 'Sapori & Tecnica', en: 'Flavours & Craft', fr: 'Saveurs & Technique' } },
  { id: 'PEOPLE', label: { it: 'Ritratti & Brigata', en: 'Portraits & Brigade', fr: 'Portraits & Brigade' } }
];

export const rawArticles = [
  {
    slug: "manifeste-du-chiaroscuro-culinaire",
    category: "PHILOSOPHY",
    categoryLabel: {
      it: "Filosofia & Visione",
      en: "Philosophy & Vision",
      fr: "Philosophie & Vision"
    },
    date: {
      it: "18 Agosto 2026",
      en: "August 18, 2026",
      fr: "18 Août 2026"
    },
    title: {
      it: "Il Manifesto del Chiaroscuro Culinario",
      en: "The Culinary Chiaroscuro Manifesto",
      fr: "Le Manifeste du Chiaroscuro Culinaire"
    },
    excerpt: {
      it: "L'ombra non è l'assenza di luce. È ciò che le dà direzione. Vincenzo Moretti spiega perché ogni piatto di LUCENTE nasce dall'oscurità.",
      en: "Shadow is not the absence of light. It is what gives it direction. Vincenzo Moretti explains why every dish at LUCENTE begins in darkness.",
      fr: "L'ombre n'est pas l'absence de lumière. C'est ce qui lui donne sa direction. Vincenzo Moretti explique pourquoi chaque assiette de LUCENTE commence dans le noir."
    },
    readingTime: {
      it: "5 min di lettura",
      en: "5 min read",
      fr: "5 min"
    },
    image: "/images/hero-dish.webp",
    author: {
      name: "Vincenzo Moretti",
      role: {
        it: "Chef Esecutivo",
        en: "Executive Chef",
        fr: "Chef Exécutif"
      },
      avatar: "/images/chef-portrait.webp"
    },
    featured: true,
    tags: ["Chiaroscuro", "Filosofia", "Estetica", "Gastronomia"],
    content: [
      {
        type: "paragraph",
        text: {
          it: "I pittori del Rinascimento hanno scoperto qualcosa che i cuochi hanno impiegato secoli a comprendere: non si vede davvero ciò che è in piena luce. Si vede ciò che sta al confine — dove l'ombra inizia a mordere.",
          en: "Renaissance painters discovered something chefs took centuries to grasp: one does not truly see what stands in uniform light. One perceives what lies at the threshold — where shadow begins to bite.",
          fr: "Les peintres de la Renaissance ont découvert quelque chose que les cuisiniers ont mis des siècles à comprendre : on ne voit pas vraiment ce qui est dans la lumière. On voit ce qui est en lisière — là où l'ombre commence à mordre."
        }
      },
      {
        type: "paragraph",
        text: {
          it: "Il Chiaroscuro culinario non è una metafora decorativa. È un metodo. Quando adagio un filetto di Chianina sulla ceramica nera opaca, costruisco un contrasto deliberato: il bruno della brace contro il bianco del tartufo.",
          en: "Culinary Chiaroscuro is no decorative metaphor. It is a rigorous method. When I lay smoked Chianina upon matte black stoneware, I orchestrate deliberate contrast: deep ember char against pristine white truffle.",
          fr: "Le Chiaroscuro culinaire n'est pas une métaphore décorative. C'est une méthode. Quand je pose un filet de Chianina fumé sur notre céramique noire mate, je construis un contraste délibéré — le brun profond de la braise contre le blanc immaculé de la truffe râpée."
        }
      },
      {
        type: "quote",
        quote: {
          it: "Non si migliora un'albicocca di luglio. Si impara a non rovinarla.",
          en: "You don't improve a July apricot. You learn how not to ruin it.",
          fr: "On n'améliore pas un abricot de juillet. On apprend à ne pas le gâcher."
        },
        author: "Vincenzo Moretti"
      },
      {
        type: "heading",
        text: {
          it: "La Geometria del Piatto Nero",
          en: "The Geometry of the Black Plate",
          fr: "La Géométrie de l'Assiette Noire"
        }
      },
      {
        type: "paragraph",
        text: {
          it: "Le nostre ceramiche in gres nero opaco, realizzate su misura da un maestro vasaio umbro, assorbono il 94% della luce incidente. La lucentezza della riduzione al Barolo e il bianco del tartufo d'Alba catturano lo sguardo con intensità assoluta.",
          en: "Our custom matte black stoneware, shaped by an Umbrian master potter, absorbs 94% of ambient light. The gloss of the Barolo reduction and ivory Alba truffle catch the eye with uncompromised focus.",
          fr: "Nos céramiques en grès noir mat, façonnées sur mesure par un maître potier d'Ombrie, absorbent 94% de la lumière incidente. Quand le filet de bœuf Chianina fumé au sarment de vigne y est posé, la brillance de la réduction au Barolo et le blanc de la truffe d'Alba capturent l'œil avec une intensité que rien d'autre ne permet."
        }
      }
    ]
  },
  {
    slug: "secret-des-vins-en-amphore-etna",
    category: "WINE",
    categoryLabel: {
      it: "Cantina & Terroir",
      en: "Cellar & Terroirs",
      fr: "Cave & Terroirs"
    },
    date: {
      it: "11 Agosto 2026",
      en: "August 11, 2026",
      fr: "11 Août 2026"
    },
    title: {
      it: "Il Segreto dei Vini in Anfora dell'Etna",
      en: "The Secret of Etna Amphora Wines",
      fr: "Le Secret des Vins en Amphore de l'Etna"
    },
    excerpt: {
      it: "Nella nostra cantina, una sezione è dedicata ai vini affinati in giare di terracotta sulle pendici dell'Etna. Gianluca Ferri spiega perché la terracotta rivela la verità.",
      en: "In our cellar, a dedicated sanctuary houses terracotta amphora wines from Mount Etna's volcanic slopes. Gianluca Ferri explains why clay speaks pure truth where oak intrudes.",
      fr: "Dans notre cave, une section entière est consacrée aux vins élevés en jarre de terre cuite sur les pentes nord de l'Etna. Gianluca Ferri explique pourquoi l'argile dit la vérité là où le bois ment."
    },
    readingTime: {
      it: "7 min di lettura",
      en: "7 min read",
      fr: "7 min"
    },
    image: "/images/cellar-architecture.webp",
    author: {
      name: "Gianluca Ferri",
      role: {
        it: "Direttore di Cantina",
        en: "Head Sommelier",
        fr: "Directeur de la Sommellerie"
      },
      avatar: "/images/sommelier-ritual.webp"
    },
    featured: false,
    tags: ["Enologia", "Sicilia", "Anfore", "Etna"],
    content: [
      {
        type: "paragraph",
        text: {
          it: "C'è una cosa che il legno non può fare: scomparire. Ogni botte di rovere lascia un'impronta. Il Nerello Mascalese dell'Etna è troppo singolare per condividere lo spazio con la vaniglia o il tostato del legno.",
          en: "There is one thing oak barrels cannot do: vanish. Every cask leaves traces — vanilla, toast, wood tannins. Mount Etna's Nerello Mascalese is far too singular and volcanic to brook intrusion.",
          fr: "Il y a une chose que le bois ne peut pas faire : disparaître. Chaque fût de chêne laisse une empreinte — vanille, toast, tanins boisés. Certains cépages s'en accommodent. Le Nerello Mascalese de l'Etna, non."
        }
      },
      {
        type: "paragraph",
        text: {
          it: "La terracotta è neutra. Consente una micro-ossigenazione lenta senza cedere aromi. Il vino si esprime nella sua purezza più tagliente: pietra focaia, melograno selvatico, sale marino.",
          en: "Fired clay is completely neutral. It allows gentle micro-oxygenation without imparting foreign flavors. The wine expresses pure mineral cut: flint, wild pomegranate, sea salt.",
          fr: "L'argile cuite est un matériau neutre. Elle permet une micro-oxygénation lente sans transmettre d'arômes. Le vin s'exprime dans sa pureté la plus tranchante — pierre à fusil, grenade sauvage, sel marin."
        }
      },
      {
        type: "quote",
        quote: {
          it: "L'anfora è il ponte perfetto tra la roccia vulcanica e il calice di cristallo.",
          en: "The amphora is the unbroken bridge between volcanic bedrock and crystal glass.",
          fr: "L'amphore est le pont parfait entre la roche volcanique et le calice de cristal."
        },
        author: "Gianluca Ferri"
      },
      {
        type: "heading",
        text: {
          it: "L'Abbinamento con il Gambero Rosso",
          en: "The Pairing with Red Prawn",
          fr: "L'Accord avec le Gambero Rosso"
        }
      },
      {
        type: "paragraph",
        text: {
          it: "Quando abbiniamo un Etna Bianco Superiore in anfora con il Gambero Rosso di Mazara crudo, l'acidità tellurica taglia la dolcezza grassa del crostaceo. La risonanza salina dura oltre quaranta secondi. È un dialogo.",
          en: "When we pair amphora-aged Etna Bianco Superiore with raw Mazara Red Prawn, telluric acidity cuts through rich sweetness. The saline echo lingers for over forty seconds. It is a genuine dialogue.",
          fr: "Quand nous associons un Etna Bianco Superiore vinifié en amphore avec le Gambero Rosso di Mazara cru, l'acidité tellurique du vin tranche la sucrosité grasse de la crevette. La résonance saline dure plus de quarante secondes."
        }
      }
    ]
  },
  {
    slug: "alchimie-du-gambero-rosso-mazara",
    category: "FOOD",
    categoryLabel: {
      it: "Sapori & Tecnica",
      en: "Flavours & Technique",
      fr: "Saveurs & Technique"
    },
    date: {
      it: "04 Agosto 2026",
      en: "August 4, 2026",
      fr: "04 Août 2026"
    },
    title: {
      it: "L'Alchimia del Gambero Rosso di Mazara del Vallo",
      en: "The Alchemy of the Mazara Red Prawn",
      fr: "L'Alchimie du Gambero Rosso de Mazara del Vallo"
    },
    excerpt: {
      it: "Vive a 700 metri di profondità. Non viene mai cotto. Lo serviamo a 12°C. Vincenzo Moretti spiega perché questo gambero merita un piatto a sé.",
      en: "It lives 700 meters below sea level. It is never cooked. We serve it at precisely 12°C. Vincenzo Moretti explains why this ruby crustacean stands alone.",
      fr: "Il vit à 700 mètres de profondeur. On ne le cuit jamais. On le sert à 12°C. Vincenzo Moretti explique pourquoi cette crevette est la seule à mériter une assiette seule."
    },
    readingTime: {
      it: "4 min di lettura",
      en: "4 min read",
      fr: "4 min"
    },
    image: "/images/prawn-dish.webp",
    author: {
      name: "Vincenzo Moretti",
      role: {
        it: "Chef Esecutivo",
        en: "Executive Chef",
        fr: "Chef Exécutif"
      },
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Alta Cucina", "Crostacei", "Tecnica", "Mediterraneo"],
    content: [
      {
        type: "paragraph",
        text: {
          it: "Il Gambero Rosso pescato tra la Sicilia e le coste tunisine vive tra 600 e 800 metri di profondità. L'oscurità totale e la pressione conferiscono alla sua carne una consistenza e una concentrazione minerale irripetibili.",
          en: "The Red Prawn foraged between Sicily and Tunisian shores lives 600 to 800 meters deep. Absolute darkness and immense pressure bestow upon its meat extraordinary mineral intensity.",
          fr: "Le Gambero Rosso pêché entre la Sicile et les côtes tunisiennes vit entre 600 et 800 mètres de profondeur. Cette obscurité absolue et la pression colossale confèrent à sa chair une texture et une concentration en minéraux qu'aucun élevage ne peut reproduire."
        }
      },
      {
        type: "paragraph",
        text: {
          it: "Da LUCENTE non lo cuociamo mai. Anche una breve cottura coagula le proteine e distrugge la complessità del corallo. Lo serviamo a 12°C con stracciatella affumicata e gel di bergamotto. Tre elementi essenziali.",
          en: "At LUCENTE, we never cook it. Even brief warmth coagulates delicate proteins and destroys the coral's subtleties. We serve it at 12°C with smoked stracciatella and wild bergamot gel. Three elements.",
          fr: "Chez LUCENTE, nous ne le cuisons jamais. Une cuisson, même brève à 52°C, coagule les protéines nobles et détruit la complexité du corail. Nous le servons à 12°C, accompagné d'une stracciatella fumée au bois d'olivier et d'un gel translucide de bergamote sauvage. Trois éléments. Pas quatre."
        }
      }
    ]
  },
  {
    slug: "visages-du-pass-la-brigade-de-lombre",
    category: "PEOPLE",
    categoryLabel: {
      it: "Ritratti & Brigata",
      en: "Portraits & Brigade",
      fr: "Portraits & Brigade"
    },
    date: {
      it: "28 Luglio 2026",
      en: "July 28, 2026",
      fr: "28 Juillet 2026"
    },
    title: {
      it: "I Volti del Pass: Nell'Intimità della Brigata",
      en: "Faces of the Pass: Inside the Brigade",
      fr: "Les Visages du Pass : Dans l'Intimité de la Brigade"
    },
    excerpt: {
      it: "Alle 18:45, quattordici cuochi entrano in silenzio. Ciò che accade per sei ore è pura coreografia di precisione.",
      en: "At 18:45, fourteen chefs enter in silence. What follows for six hours is a masterclass in silent synchronization.",
      fr: "À 18h45, quatorze cuisiniers entrent en silence. Ce qui se passe ensuite pendant six heures n'a rien à voir avec ce que vous imaginez d'une cuisine étoilée."
    },
    readingTime: {
      it: "6 min di lettura",
      en: "6 min read",
      fr: "6 min"
    },
    image: "/images/kitchen-fire.webp",
    author: {
      name: "Redazione LUCENTE",
      role: {
        it: "Cronisti Gastronomici",
        en: "Culinary Writers",
        fr: "Chroniqueurs Gastronomiques"
      },
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Brigata", "Cucina", "Trasmissione", "Eccellenza"],
    content: [
      {
        type: "paragraph",
        text: {
          it: "Alle 18:45 regna il silenzio nella cucina di Via Monte Napoleone. Solo il ticchettio delle pinze d'argento e le verifiche di temperatura rompono la quiete prima del servizio.",
          en: "At 18:45, silence settles over the Via Monte Napoleone kitchen. Only the chime of silver tweezers and temperature checks break the stillness before service begins.",
          fr: "À 18h45, le silence règne dans la cuisine de la Via Monte Napoleone. Seul le cliquetis des pinces en argent et le murmure des vérifications de température troublent le calme."
        }
      },
      {
        type: "quote",
        quote: {
          it: "Una brigata 2 stelle non funziona per autorità. Funziona per sincronizzazione. Ognuno respira allo stesso tempo del pass.",
          en: "A 2-star brigade operates not by authority, but by synchronization. Everyone breathes at the tempo of the pass.",
          fr: "Une brigade 2 étoiles ne fonctionne pas par autorité. Elle fonctionne par synchronisation. Chacun respire au même tempo que le passeur."
        },
        author: "Marco Bellini, Sous-Chef Esecutivo"
      },
      {
        type: "paragraph",
        text: {
          it: "Tutto concorre all'illusione di una facilità assoluta. L'ospite vede solo il risultato finale sul tavolo. È esattamente questo il nostro obiettivo.",
          en: "Everything conspires toward effortless elegance. The guest perceives only seamless harmony on the table. That is our highest ambition.",
          fr: "La découpe d'une Fassona, le pochage d'un raviolo pendant 110 secondes précises, la déposition d'une quenelle de caviar Oscietra Royal : tout concourt à l'illusion d'une facilité absolue."
        }
      }
    ]
  },
  {
    slug: "or-de-san-gimignano-safran-toscane",
    category: "FOOD",
    categoryLabel: {
      it: "Sapori & Storia",
      en: "Flavours & History",
      fr: "Saveurs & Histoire"
    },
    date: {
      it: "15 Luglio 2026",
      en: "July 15, 2026",
      fr: "15 Juillet 2026"
    },
    title: {
      it: "L'Oro Rosso di San Gimignano: Tre Secoli di Zafferano",
      en: "The Red Gold of San Gimignano: Three Centuries of Saffron",
      fr: "L'Or Rouge de San Gimignano : Trois Siècles de Safran"
    },
    excerpt: {
      it: "Nel XIII secolo, San Gimignano finanziava le sue torri con lo zafferano. Da LUCENTE, 150 fiori raccolti a mano danno un solo grammo.",
      en: "In the 13th century, San Gimignano funded its medieval towers with saffron. At LUCENTE, 150 hand-harvested flowers yield a single precious gram.",
      fr: "Au XIIIe siècle, San Gimignano finançait ses tours médiévales avec du safran. Chez LUCENTE, 150 fleurs récoltées à la main donnent un seul gramme. Il en faut trois pour un risotto."
    },
    readingTime: {
      it: "5 min di lettura",
      en: "5 min read",
      fr: "5 min"
    },
    image: "/images/tomato-saffron.webp",
    author: {
      name: "Vincenzo Moretti",
      role: {
        it: "Chef Esecutivo",
        en: "Executive Chef",
        fr: "Chef Exécutif"
      },
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Toscana", "Spezie", "Zafferano", "Storia"],
    content: [
      {
        type: "paragraph",
        text: {
          it: "Per ottenere un solo grammo occorrono circa 150 fiori di Crocus sativus colti al sorgere del sole. Da LUCENTE eseguiamo un'infusione a freddo di 24 ore in acqua di pomodoro chiarificata. Il calore distruggerebbe le note più delicate.",
          en: "Gathering a single gram requires picking 150 Crocus sativus blooms at first sunrise. At LUCENTE, we perform a 24-hour cold infusion in clarified tomato water. Heat would destroy the most delicate volatile notes.",
          fr: "Dès le XIIIe siècle, San Gimignano finançait la construction de ses célèbres tours médiévales grâce au commerce du safran — « l'or rouge ». Aujourd'hui, seuls quelques artisans perpétuent la récolte manuelle des fleurs au lever du jour."
        }
      }
    ]
  },
  {
    slug: "art-du-service-en-salle-elegance-feutree",
    category: "PEOPLE",
    categoryLabel: {
      it: "Servizio & Ospitalità",
      en: "Service & Hospitality",
      fr: "Service & Hospitalité"
    },
    date: {
      it: "02 Luglio 2026",
      en: "July 2, 2026",
      fr: "02 Juillet 2026"
    },
    title: {
      it: "L'Arte del Servizio in Sala: La Coreografia Invisibile",
      en: "The Art of Floor Service: The Invisible Choreography",
      fr: "L'Art du Service en Salle : La Chorégraphie Invisible"
    },
    excerpt: {
      it: "Matteo Castiglione, Maître di LUCENTE, sulla sprezzatura italiana: l'arte di rendere invisibile ogni sforzo.",
      en: "Matteo Castiglione, Maître d' at LUCENTE, explores Italian sprezzatura — the consummate art of making supreme effort appear invisible.",
      fr: "Matteo Castiglione, Maître d'Hôtel de LUCENTE, sur la différence entre servir et accueillir — et pourquoi la sprezzatura italienne est la forme la plus difficile de la perfection."
    },
    readingTime: {
      it: "5 min di lettura",
      en: "5 min read",
      fr: "5 min"
    },
    image: "/images/table-ambiance.webp",
    author: {
      name: "Redazione LUCENTE",
      role: {
        it: "Cronisti",
        en: "Writers",
        fr: "Chroniqueurs"
      },
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Servizio", "Ospitalità", "Milano", "Arte di Vivere"],
    content: [
      {
        type: "paragraph",
        text: {
          it: "Il servizio di una grande maison ha spesso sofferto di una rigidità solenne. Da LUCENTE crediamo nella sprezzatura: impeccabile precisione tecnica unita a calore umano autentico.",
          en: "Fine dining service too often suffered from solemn rigidity. At LUCENTE, we cultivate Italian sprezzatura: impeccable technical rigor married to sincere human warmth.",
          fr: "Le service d'une grande maison a longtemps souffert d'une réputation de rigidité solennelle. Chez LUCENTE, nous croyons à la sprezzatura — cette élégance italienne qui consiste à rendre l'effort invisible."
        }
      }
    ]
  }
];

export function getArticles(lang = 'fr') {
  return rawArticles.map(art => ({
    ...art,
    categoryLabel: typeof art.categoryLabel === 'object' ? (art.categoryLabel[lang] || art.categoryLabel.fr) : art.categoryLabel,
    date: typeof art.date === 'object' ? (art.date[lang] || art.date.fr) : art.date,
    title: typeof art.title === 'object' ? (art.title[lang] || art.title.fr) : art.title,
    excerpt: typeof art.excerpt === 'object' ? (art.excerpt[lang] || art.excerpt.fr) : art.excerpt,
    readingTime: typeof art.readingTime === 'object' ? (art.readingTime[lang] || art.readingTime.fr) : art.readingTime,
    author: {
      ...art.author,
      role: typeof art.author.role === 'object' ? (art.author.role[lang] || art.author.role.fr) : art.author.role
    },
    content: art.content.map(block => ({
      ...block,
      text: typeof block.text === 'object' ? (block.text[lang] || block.text.fr) : block.text,
      quote: typeof block.quote === 'object' ? (block.quote[lang] || block.quote.fr) : block.quote
    }))
  }));
}

export function getArticleBySlug(slug, lang = 'fr') {
  const all = getArticles(lang);
  return all.find(a => a.slug === slug) || null;
}

export const articles = getArticles('fr');
export const journalArticles = articles;

