/**
 * LUCENTE Milano — Table & Salons Architecture
 * Definizione sartoriale dei tavoli per l'esperienza Scan & Order.
 */

export const restaurantAreas = [
  {
    id: "sala-chiaroscuro",
    name: {
      it: "La Sala Chiaroscuro",
      en: "The Chiaroscuro Hall",
      fr: "La Salle Chiaroscuro"
    },
    subtitle: {
      it: "Pietra lavica, lino scuro e penombra dorata",
      en: "Lava stone, dark linen and golden twilight",
      fr: "Pierre de lave, lin sombre et pénombre dorée"
    },
    tables: [
      { id: "01", number: "01", name: "Tavolo Veronese", capacity: "2 convives", shape: "Ronde intimiste" },
      { id: "02", number: "02", name: "Tavolo Bellini", capacity: "2 convives", shape: "Ronde intimiste" },
      { id: "03", number: "03", name: "Tavolo Caravaggio", capacity: "4 convives", shape: "Carrée d'angle" },
      { id: "04", number: "04", name: "Tavolo Tiziano", capacity: "4 convives", shape: "Vue verrière" },
      { id: "05", number: "05", name: "Tavolo Tintoretto", capacity: "2 convives", shape: "Alcôve feutrée" },
      { id: "06", number: "06", name: "Tavolo Mantegna", capacity: "4 convives", shape: "Centre salle" },
      { id: "07", number: "07", name: "Tavolo Botticelli", capacity: "2 convives", shape: "Vue baie vitrée" },
      { id: "08", number: "08", name: "Tavolo Da Vinci", capacity: "6 convives", shape: "Grande table ronde" }
    ]
  },
  {
    id: "tavolo-dello-chef",
    name: {
      it: "Il Tavolo dello Chef",
      en: "The Chef's Table",
      fr: "La Table du Chef"
    },
    subtitle: {
      it: "Monolite in marmo di Carrara davanti alla brigata",
      en: "Carrara marble monolith in front of the kitchen brigade",
      fr: "Monolithe de marbre de Carrare face à la brigade"
    },
    tables: [
      { id: "chef", number: "CHEF", name: "Tavolo Vincenzo Moretti", capacity: "4 à 6 convives", shape: "Monolithe Carrara Privatif" }
    ]
  },
  {
    id: "cantina-segreta",
    name: {
      it: "La Cantina Segreta",
      en: "The Private Cellar",
      fr: "La Cave Privée"
    },
    subtitle: {
      it: "1.400 referenze storiche e riserve rare",
      en: "1,400 historic references and rare reserves",
      fr: "1 400 références historiques et réserves rares"
    },
    tables: [
      { id: "cantina", number: "CAVE", name: "Salon Barolo & Riserve", capacity: "Jusqu'à 10 convives", shape: "Table d'apparat en chêne centenaire" }
    ]
  },
  {
    id: "terrazza-giardino",
    name: {
      it: "La Terrazza Giardino",
      en: "The Garden Terrace",
      fr: "La Terrasse Jardin"
    },
    subtitle: {
      it: "Gelsomini in fiore e brezza milanese",
      en: "Blooming jasmine and gentle Milanese breeze",
      fr: "Jasmins en fleur et brise milanaise"
    },
    tables: [
      { id: "T1", number: "T1", name: "Terrazza Pergola", capacity: "2 convives", shape: "Sous la pergola" },
      { id: "T2", number: "T2", name: "Terrazza Fontana", capacity: "2 convives", shape: "Auprès de la fontaine" },
      { id: "T3", number: "T3", name: "Terrazza Ulivo", capacity: "4 convives", shape: "Sous l'olivier centenaire" },
      { id: "T4", number: "T4", name: "Terrazza Belvedere", capacity: "4 convives", shape: "Vue jardin intérieur" }
    ]
  }
];

// Flattened list of all tables
export const allTables = restaurantAreas.flatMap(area => 
  area.tables.map(table => ({
    ...table,
    areaId: area.id,
    areaName: area.name,
    areaSubtitle: area.subtitle,
    slug: table.id.toLowerCase()
  }))
);

/**
 * Retrieve a table by ID or slug (e.g. "04", "chef", "t1")
 */
export function getTableById(tableId) {
  if (!tableId) return null;
  const cleanId = String(tableId).trim().toLowerCase();
  return allTables.find(t => 
    t.id.toLowerCase() === cleanId || 
    t.slug === cleanId || 
    t.number.toLowerCase() === cleanId
  ) || null;
}

