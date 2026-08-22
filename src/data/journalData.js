export const journalCategories = [
  { id: 'ALL', label: 'Toutes' },
  { id: 'PHILOSOPHY', label: 'Philosophie' },
  { id: 'WINE', label: 'Cave & Vins' },
  { id: 'FOOD', label: 'Saveurs' },
  { id: 'PEOPLE', label: 'Portraits' }
];

export const articles = [
  {
    slug: "manifeste-du-chiaroscuro-culinaire",
    category: "PHILOSOPHY",
    categoryLabel: "Philosophie & Vision",
    date: "18 Août 2026",
    title: "Le Manifeste du Chiaroscuro Culinaire",
    excerpt: "L'ombre n'est pas l'absence de lumière. C'est ce qui lui donne sa direction. Vincenzo Moretti explique pourquoi chaque assiette de LUCENTE commence dans le noir.",
    readingTime: "5 min",
    image: "/images/hero-dish.webp",
    author: {
      name: "Vincenzo Moretti",
      role: "Chef Exécutif",
      avatar: "/images/chef-portrait.webp"
    },
    featured: true,
    tags: ["Chiaroscuro", "Philosophie", "Esthétique", "Gastronomie"],
    content: [
      {
        type: "paragraph",
        text: "Les peintres de la Renaissance ont découvert quelque chose que les cuisiniers ont mis des siècles à comprendre : on ne voit pas vraiment ce qui est dans la lumière. On voit ce qui est en lisière — là où l'ombre commence à mordre."
      },
      {
        type: "paragraph",
        text: "Le Chiaroscuro culinaire n'est pas une métaphore décorative. C'est une méthode. Quand je pose un filet de Chianina fumé sur notre céramique noire mate, je construis un contraste délibéré — le brun profond de la braise contre le blanc immaculé de la truffe râpée. L'œil arrive avant le palais."
      },
      {
        type: "quote",
        quote: "On n'améliore pas un abricot de juillet. On apprend à ne pas le gâcher.",
        author: "Vincenzo Moretti"
      },
      {
        type: "heading",
        text: "La Géométrie de l'Assiette Noire"
      },
      {
        type: "paragraph",
        text: "Nos céramiques en grès noir mat, façonnées sur mesure par un maître potier d'Ombrie, absorbent 94% de la lumière incidente. Quand le filet de bœuf Chianina fumé au sarment de vigne y est posé, la brillance de la réduction au Barolo et le blanc de la truffe d'Alba capturent l'œil avec une intensité que rien d'autre ne permet."
      }
    ]
  },
  {
    slug: "secret-des-vins-en-amphore-etna",
    category: "WINE",
    categoryLabel: "Cave & Terroirs",
    date: "11 Août 2026",
    title: "Le Secret des Vins en Amphore de l'Etna",
    excerpt: "Dans notre cave, une section entière est consacrée aux vins élevés en jarre de terre cuite sur les pentes nord de l'Etna. Gianluca Ferri explique pourquoi l'argile dit la vérité là où le bois ment.",
    readingTime: "7 min",
    image: "/images/cellar-architecture.webp",
    author: {
      name: "Gianluca Ferri",
      role: "Directeur de la Sommellerie",
      avatar: "/images/sommelier-ritual.webp"
    },
    featured: false,
    tags: ["Œnologie", "Sicile", "Amphores", "Etna"],
    content: [
      {
        type: "paragraph",
        text: "Il y a une chose que le bois ne peut pas faire : disparaître. Chaque fût de chêne laisse une empreinte — vanille, toast, tanins boisés. Certains cépages s'en accommodent. Le Nerello Mascalese de l'Etna, non. Il est trop singulier, trop minéral pour coexister avec quoi que ce soit d'aussi opiniâtre qu'un fût."
      },
      {
        type: "paragraph",
        text: "L'argile cuite est un matériau neutre. Elle permet une micro-oxygénation lente sans transmettre d'arômes. Le vin s'exprime dans sa pureté la plus tranchante — pierre à fusil, grenade sauvage, sel marin."
      },
      {
        type: "quote",
        quote: "L'amphore est le pont parfait entre la roche volcanique et le calice de cristal.",
        author: "Gianluca Ferri"
      },
      {
        type: "heading",
        text: "L'Accord avec le Gambero Rosso"
      },
      {
        type: "paragraph",
        text: "Quand nous associons un Etna Bianco Superiore vinifié en amphore avec le Gambero Rosso di Mazara cru, l'acidité tellurique du vin tranche la sucrosité grasse de la crevette. La résonance saline dure plus de quarante secondes. Ce n'est pas un accord — c'est un dialogue."
      }
    ]
  },
  {
    slug: "alchimie-du-gambero-rosso-mazara",
    category: "FOOD",
    categoryLabel: "Saveurs & Technique",
    date: "04 Août 2026",
    title: "L'Alchimie du Gambero Rosso de Mazara del Vallo",
    excerpt: "Il vit à 700 mètres de profondeur. On ne le cuit jamais. On le sert à 12°C. Vincenzo Moretti explique pourquoi cette crevette est la seule à mériter une assiette seule.",
    readingTime: "4 min",
    image: "/images/prawn-dish.webp",
    author: {
      name: "Vincenzo Moretti",
      role: "Chef Exécutif",
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Haute Gastronomie", "Crustacés", "Technique", "Méditerranée"],
    content: [
      {
        type: "paragraph",
        text: "Le Gambero Rosso (Aristaeomorpha foliacea) pêché entre la Sicile et les côtes tunisiennes vit entre 600 et 800 mètres de profondeur. Cette obscurité absolue et la pression colossale confèrent à sa chair une texture et une concentration en minéraux qu'aucun élevage ne peut reproduire."
      },
      {
        type: "paragraph",
        text: "Chez LUCENTE, nous ne le cuisons jamais. Une cuisson, même brève à 52°C, coagule les protéines nobles et détruit la complexité du corail. Nous le servons à 12°C, accompagné d'une stracciatella fumée au bois d'olivier et d'un gel translucide de bergamote sauvage. Trois éléments. Pas quatre."
      }
    ]
  },
  {
    slug: "visages-du-pass-la-brigade-de-lombre",
    category: "PEOPLE",
    categoryLabel: "Portraits & Brigade",
    date: "28 Juillet 2026",
    title: "Les Visages du Pass : Dans l'Intimité de la Brigade",
    excerpt: "À 18h45, quatorze cuisiniers entrent en silence. Ce qui se passe ensuite pendant six heures n'a rien à voir avec ce que vous imaginez d'une cuisine étoilée.",
    readingTime: "6 min",
    image: "/images/kitchen-fire.webp",
    author: {
      name: "Rédaction LUCENTE",
      role: "Chroniqueurs Gastronomiques",
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Brigade", "Cuisine", "Transmission", "Excellence"],
    content: [
      {
        type: "paragraph",
        text: "À 18h45, le silence règne dans la cuisine de la Via Monte Napoleone. Seul le cliquetis des pinces en argent et le murmure des vérifications de température troublent le calme. Quatorze cuisiniers s'alignent pour le briefing du Chef Moretti — pas une réunion, un accord avant le concert."
      },
      {
        type: "quote",
        quote: "Une brigade 2 étoiles ne fonctionne pas par autorité. Elle fonctionne par synchronisation. Chacun respire au même tempo que le passeur.",
        author: "Marco Bellini, Sous-Chef Exécutif"
      },
      {
        type: "paragraph",
        text: "La découpe d'une Fassona, le pochage d'un raviolo pendant 110 secondes précises, la déposition d'une quenelle de caviar Oscietra Royal : tout concourt à l'illusion d'une facilité absolue. Le convive ne voit que le résultat. C'est exactement ce qu'on cherche."
      }
    ]
  },
  {
    slug: "or-de-san-gimignano-safran-toscane",
    category: "FOOD",
    categoryLabel: "Saveurs & Histoire",
    date: "15 Juillet 2026",
    title: "L'Or Rouge de San Gimignano : Trois Siècles de Safran",
    excerpt: "Au XIIIe siècle, San Gimignano finançait ses tours médiévales avec du safran. Chez LUCENTE, 150 fleurs récoltées à la main donnent un seul gramme. Il en faut trois pour un risotto.",
    readingTime: "5 min",
    image: "/images/tomato-saffron.webp",
    author: {
      name: "Vincenzo Moretti",
      role: "Chef Exécutif",
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Toscane", "Épices", "Safran", "Histoire"],
    content: [
      {
        type: "paragraph",
        text: "Dès le XIIIe siècle, San Gimignano finançait la construction de ses célèbres tours médiévales grâce au commerce du safran — « l'or rouge ». Aujourd'hui, seuls quelques artisans perpétuent la récolte manuelle des fleurs au lever du jour, quand les corolles s'ouvrent à peine."
      },
      {
        type: "paragraph",
        text: "Pour obtenir un seul gramme, il faut cueillir à la main environ 150 fleurs de Crocus sativus. Chez LUCENTE, nous réalisons une infusion à froid de 24 heures dans une eau de tomate clarifiée. Pas de chaleur — la chaleur tue les arômes volatils les plus délicats. Ce qui reste dans le bouillon, c'est la quintessence."
      }
    ]
  },
  {
    slug: "art-du-service-en-salle-elegance-feutree",
    category: "PEOPLE",
    categoryLabel: "Service & Hospitalité",
    date: "02 Juillet 2026",
    title: "L'Art du Service en Salle : La Chorégraphie Invisible",
    excerpt: "Matteo Castiglione, Maître d'Hôtel de LUCENTE, sur la différence entre servir et accueillir — et pourquoi la sprezzatura italienne est la forme la plus difficile de la perfection.",
    readingTime: "5 min",
    image: "/images/table-ambiance.webp",
    author: {
      name: "Rédaction LUCENTE",
      role: "Chroniqueurs",
      avatar: "/images/chef-portrait.webp"
    },
    featured: false,
    tags: ["Service", "Hospitalité", "Milan", "Art de Vivre"],
    content: [
      {
        type: "paragraph",
        text: "Le service d'une grande maison a longtemps souffert d'une réputation de rigidité solennelle. Chez LUCENTE, nous croyons à la sprezzatura — cette élégance italienne qui consiste à rendre l'effort invisible. Perfection technique irréprochable, chaleur humaine sincère."
      },
      {
        type: "paragraph",
        text: "Le maître d'hôtel ne pose pas un plat : il lit le rythme de la table. Il devine si vous souhaitez parler du cépage ou préférez un silence pour une conversation confidentielle. Il n'interrompt jamais. Il arrive toujours au bon moment."
      }
    ]
  }
];

export const journalArticles = articles;
