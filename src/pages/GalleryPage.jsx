import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Maximize2, Eye, Camera, ArrowUpRight, Sparkles, Filter, 
  BookOpen, ChevronRight, SlidersHorizontal, Image as ImageIcon
} from 'lucide-react';
import { galleryCategories, getGalleryItems, getEditorialQuotes } from '../data/galleryData';
import GalleryLightbox from '../components/GalleryLightbox';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function GalleryPage() {
  const { lang, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const localizedItems = useMemo(() => getGalleryItems(lang), [lang]);
  const localizedQuotes = useMemo(() => getEditorialQuotes(lang), [lang]);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'ALL') {
      return localizedItems;
    }
    return localizedItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, localizedItems]);

  // Find active category metadata
  const activeCategoryMeta = useMemo(() => {
    return (
      galleryCategories.find((c) => c.id === selectedCategory) ||
      galleryCategories[0]
    );
  }, [selectedCategory]);

  // Open Lightbox by item ID or index
  const handleOpenById = (itemId) => {
    const idx = filteredItems.findIndex((item) => item.id === itemId);
    if (idx !== -1) {
      setActivePhotoIndex(idx);
      setLightboxOpen(true);
    }
  };

  const handleOpenByIndex = (index) => {
    setActivePhotoIndex(index);
    setLightboxOpen(true);
  };

  // Full-bleed spread item (Architectural space highlight)
  const spreadBreak1 = localizedItems.find((item) => item.id === 'gal-05') || localizedItems[4];

  return (
    <div className="pt-28 pb-32 bg-nero text-ivoire min-h-screen">
      {/* Dynamic SEO & Schema.org Metadata */}
      <SEOHead
        title={lang === 'it' ? 'Galleria Editoriale & Immersione Visiva | LUCENTE — Milano' : lang === 'en' ? 'Editorial Gallery & Visual Immersion | LUCENTE — Milano' : 'Galerie Éditoriale & Immersion Visuelle | LUCENTE — Milano'}
        description={lang === 'it' ? "Esplora la galleria fotografica di LUCENTE Milano." : lang === 'en' ? "Explore LUCENTE Milano's photographic gallery." : "Explorez la galerie photographique de LUCENTE Milano."}
        image="/images/dining-room.webp"
        path="/gallery"
      />

      {/* =========================================================================
          1. EDITORIAL HEADER & MAGAZINE MASTHEAD
         ========================================================================= */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 mb-16 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
          
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="px-3 py-1 bg-or/10 border border-or/30 text-or text-[10px] uppercase tracking-[0.3em] font-mono">
                Volume IV · Milano 2026
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-muted hidden sm:inline">
                {lang === 'it' ? 'Antologia Fotografica' : lang === 'en' ? 'Photographic Anthology' : 'Anthologie Photographique'}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-ivoire tracking-tight leading-[1.05]">
              {lang === 'it' ? (
                <>Galleria <span className="italic text-or font-light">Editoriale</span></>
              ) : lang === 'en' ? (
                <>Editorial <span className="italic text-or font-light">Gallery</span></>
              ) : (
                <>Galerie <span className="italic text-or font-light">Éditoriale</span></>
              )}
            </h1>

            <p className="font-serif text-lg sm:text-xl text-ivoire/80 italic max-w-2xl">
              {lang === 'it'
                ? "« Nell'oscurità della sala, la materia grezza e il gesto sapiente scolpiscono la luce. »"
                : lang === 'en'
                ? "« In the darkness of the dining room, raw material and master craft sculpt the light. »"
                : "« Dans l'obscurité de la salle, la matière brute et le geste d'orfèvre sculptent la lumière. »"}
            </p>
          </div>

          {/* Right Magazine Info */}
          <div className="hidden lg:flex flex-col items-end text-right space-y-1 text-xs text-muted font-mono">
            <span className="text-ivoire font-semibold tracking-wider">
              {lang === 'it' ? '15 OPERE EDITORIALI' : lang === 'en' ? '15 EDITORIAL WORKS' : '15 ŒUVRES ÉDITORIALES'}
            </span>
            <span>
              {lang === 'it' ? '5 CICLI TEMATICI' : lang === 'en' ? '5 THEMATIC CYCLES' : '5 CYCLES THÉMATIQUES'}
            </span>
            <span className="text-or/80">ARCHIVES HASSELBLAD & LEICA</span>
          </div>

        </div>
      </header>


      {/* =========================================================================
          2. EDITORIAL CATEGORY SELECTOR (THE 5 MANDATORY CATEGORIES)
         ========================================================================= */}
      <nav 
        aria-label={lang === 'it' ? 'Categorie Editoriali' : lang === 'en' ? 'Editorial Categories' : 'Catégories Éditoriales'}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-12"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 overflow-x-auto scrollbar-none">
          
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {galleryCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const count = cat.id === 'ALL' 
                ? localizedItems.length 
                : localizedItems.filter((i) => i.category === cat.id).length;

              const label = cat.id === 'ALL'
                ? (lang === 'it' ? 'Tutte le Collezioni' : lang === 'en' ? 'All Collections' : 'Toutes les Collections')
                : cat.id === 'LA TABLE'
                ? (lang === 'it' ? 'LA TAVOLA' : lang === 'en' ? 'THE TABLE' : 'LA TABLE')
                : cat.id === 'LA CUISINE'
                ? (lang === 'it' ? 'LA CUCINA' : lang === 'en' ? 'THE KITCHEN' : 'LA CUISINE')
                : cat.id === "L'ESPACE"
                ? (lang === 'it' ? "L'SPAZIO" : lang === 'en' ? 'THE SPACE' : "L'ESPACE")
                : cat.id === 'LES ARTISANS'
                ? (lang === 'it' ? 'GLI ARTIGIANI' : lang === 'en' ? 'THE ARTISANS' : 'LES ARTISANS')
                : (lang === 'it' ? 'GLI INGREDIENTI' : lang === 'en' ? 'THE INGREDIENTS' : 'LES INGRÉDIENTS');

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2.5 rounded-none text-xs uppercase tracking-[0.18em] transition-all duration-300 font-medium flex items-center gap-2 ${
                    isSelected
                      ? 'bg-or text-nero font-semibold shadow-lg scale-105'
                      : 'bg-surface text-muted hover:text-ivoire hover:bg-surface-elevated border border-white/5'
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-none ${
                    isSelected ? 'bg-nero/20 text-nero' : 'bg-nero text-muted/80'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Minimal View Counter */}
          <div className="hidden xl:flex items-center gap-2 text-xs text-muted/60 font-mono">
            <SlidersHorizontal size={13} className="text-or" />
            <span>
              {lang === 'it' ? 'Filtro Attivo: ' : lang === 'en' ? 'Active Filter: ' : 'Filtre Actif : '}
              {selectedCategory === 'ALL'
                ? (lang === 'it' ? 'Antologia' : lang === 'en' ? 'Anthology' : 'Anthologie')
                : selectedCategory === 'LA TABLE'
                ? (lang === 'it' ? 'La Tavola' : lang === 'en' ? 'The Table' : 'La Table')
                : selectedCategory === 'LA CUISINE'
                ? (lang === 'it' ? 'La Cucina' : lang === 'en' ? 'The Kitchen' : 'La Cuisine')
                : selectedCategory === "L'ESPACE"
                ? (lang === 'it' ? "L'Spazio" : lang === 'en' ? 'The Space' : "L'Espace")
                : selectedCategory === 'LES ARTISANS'
                ? (lang === 'it' ? 'Gli Artigiani' : lang === 'en' ? 'The Artisans' : 'Les Artisans')
                : (lang === 'it' ? 'Gli Ingredienti' : lang === 'en' ? 'The Ingredients' : 'Les Ingrédients')}
            </span>
          </div>

        </div>

        {/* Dynamic Category Editorial Tagline */}
        <div className="pt-4 flex items-center justify-between text-xs text-muted">
          <p className="font-serif italic text-sm text-ivoire/75">
            {selectedCategory === 'ALL'
              ? (lang === 'it' ? "La collezione integrale dei frammenti visivi e dell'architettura sensoriale di LUCENTE." : lang === 'en' ? "The complete collection of visual fragments and sensory architecture of LUCENTE." : "La collection intégrale des fragments visuels et de l'architecture sensorielle de LUCENTE.")
              : selectedCategory === 'LA TABLE'
              ? (lang === 'it' ? "L'arte della tavola, gli impiattamenti d'autore, le ceramiche in gres nero e la geometria dei sapori." : lang === 'en' ? "The art of the table, artisanal plating, black stoneware ceramics, and the geometry of flavours." : "L'art de la table, les dressages d'orfèvre, la vaisselle en grès noir et la géométrie des saveurs.")
              : selectedCategory === 'LA CUISINE'
              ? (lang === 'it' ? "Il santuario del pass, la fiamma viva e la precisione chirurgica della brigata." : lang === 'en' ? "The pass sanctuary, live embers, and the surgical precision of the kitchen brigade." : "Le sanctuaire du pass, la flamme vive et la précision chirurgicale de la brigade.")
              : selectedCategory === "L'ESPACE"
              ? (lang === 'it' ? "L'architettura minerale milanese, la Sala Chiaroscuro e la cripta da 1.400 bottiglie." : lang === 'en' ? "Milanese mineral architecture, the Chiaroscuro Room, and the 1,400-bottle cellar crypt." : "L'architecture minérale milanaise, la Sala Chiaroscuro et la crypte aux 1 400 flacons.")
              : selectedCategory === 'LES ARTISANS'
              ? (lang === 'it' ? "I volti, le mani e gli sguardi che danno un'anima al ristorante." : lang === 'en' ? "The faces, hands, and gazes that breathe soul into the restaurant." : "Les visages, les mains et les regards qui insufflent l'âme au restaurant.")
              : (lang === 'it' ? "La materia prima del territorio italiano nella sua verità tellurica e marina più pura." : lang === 'en' ? "The raw material of Italian terroir in its purest telluric and marine truth." : "La matière brute du terroir italien dans sa vérité tellurique et marine la plus pure.")}
          </p>
          <span className="font-mono text-[11px] text-or hidden md:inline">
            {lang === 'it'
              ? "Clicca su uno scatto per l'immersione a schermo intero (Tastiera / Swipe)"
              : lang === 'en'
              ? 'Click any photograph for full-screen immersion (Keyboard / Swipe)'
              : "Cliquez sur un cliché pour l'immersion plein écran (Clavier / Swipe)"}
          </span>
        </div>
      </nav>

      {/* =========================================================================
          3. MAGAZINE MASONRY EDITORIAL GRID
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {filteredItems.map((item, index) => {
            const cardSpan = selectedCategory === 'ALL' ? (item.span || 'col-span-1') : 'col-span-1';
            return (
              <article
                key={item.id}
                onClick={() => handleOpenByIndex(index)}
                className={`group relative bg-surface border border-white/5 overflow-hidden cursor-pointer transition-all duration-500 hover:border-or/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-col justify-between ${cardSpan}`}
              >
                {/* Visual Frame */}
                <div className="relative w-full overflow-hidden bg-nero/50 aspect-video md:aspect-[16/10] lg:aspect-auto min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex-1">
                  <img
                    loading={index < 4 ? "eager" : "lazy"}
                    src={item.src}
                    alt={item.alt || item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                  />

                  {/* Dark Cinematic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/30 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Top Floating Badge: Category & Act */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest bg-nero/80 text-or border border-or/30 backdrop-blur-sm">
                      {item.category}
                    </span>
                    
                    {item.featured && (
                      <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase font-mono tracking-widest bg-or text-nero font-semibold">
                        <Sparkles size={10} />
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Center Hover Magnifier Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="p-3.5 rounded-full bg-nero/80 text-or border border-or/50 backdrop-blur-md transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-2xl">
                      <Maximize2 size={20} />
                    </div>
                  </div>

                  {/* Bottom Image Sub-Caption */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-ivoire/70 font-mono pointer-events-none">
                    <span className="truncate max-w-[75%]">{item.cameraNotes}</span>
                    <span className="text-or opacity-0 group-hover:opacity-100 transition-opacity">
                      {lang === 'it' ? 'Ingrandisci ↗' : lang === 'en' ? 'Enlarge ↗' : 'Agrandir ↗'}
                    </span>
                  </div>
                </div>

                {/* Editorial Metadata Footer Card */}
                <div className="p-5 sm:p-6 bg-surface-elevated border-t border-white/5 space-y-2">
                  
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-serif text-xl sm:text-2xl text-ivoire group-hover:text-or transition-colors">
                      {item.title}
                    </h2>
                    {item.italianTitle && (
                      <span className="text-xs text-muted font-serif italic hidden sm:inline">
                        {item.italianTitle}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-muted font-sans leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-muted/70 font-mono border-t border-white/5">
                    <span>{item.act || "Anthologie Milano"}</span>
                    <span className="text-or group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-sans text-xs">
                      {lang === 'it' ? 'Scopri' : lang === 'en' ? 'Discover' : 'Découvrir'} <ArrowUpRight size={12} />
                    </span>
                  </div>

                </div>
              </article>
            );
          })}

        </div>
      </section>

      {/* =========================================================================
          4. FULL-BLEED MONUMENTAL ARCHITECTURAL SPREAD (IMAGE PLEINE LARGEUR)
         ========================================================================= */}
      {selectedCategory === 'ALL' && spreadBreak1 && (
        <section className="relative w-full mb-28 overflow-hidden border-y border-or/20 bg-surface">
          
          <div className="relative min-h-[600px] lg:min-h-[720px] flex items-center justify-start">
            
            {/* Background Full-Width Hero Photograph */}
            <div className="absolute inset-0">
              <img
                loading="lazy"
                src={spreadBreak1.src}
                alt={spreadBreak1.alt || spreadBreak1.title}
                className="w-full h-full object-cover object-center filter brightness-75 scale-105 hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-nero via-nero/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-nero/40" />
            </div>

            {/* Editorial Overlay Magazine Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
              <div className="max-w-2xl space-y-6 bg-nero/80 p-8 sm:p-12 border border-white/10 backdrop-blur-md shadow-2xl">
                
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-or text-nero text-[10px] uppercase font-mono font-bold tracking-widest">
                    {lang === 'it' ? 'Doppia Pagina Editoriale' : lang === 'en' ? 'Editorial Double Spread' : 'Double Page Éditoriale'}
                  </span>
                  <span className="text-xs uppercase font-mono tracking-widest text-or">
                    {spreadBreak1.category}
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl text-ivoire font-normal leading-tight">
                  {spreadBreak1.title}
                </h2>

                <p className="font-serif text-base sm:text-lg text-ivoire/90 italic leading-relaxed border-l-2 border-or pl-4">
                  « {spreadBreak1.editorialStory} »
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenById(spreadBreak1.id);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shadow-xl"
                  >
                    <Maximize2 size={14} />
                    <span>
                      {lang === 'it' ? 'Apri lo Spazio a Schermo Intero' : lang === 'en' ? 'Open Space Fullscreen' : "Ouvrir l'Espace en Plein Écran"}
                    </span>
                  </button>

                  <span className="text-xs font-mono text-muted/80 hidden sm:inline">
                    {spreadBreak1.cameraNotes}
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom Right Full-Bleed Tag */}
            <div className="absolute bottom-6 right-6 hidden md:block">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-ivoire/50 bg-nero/60 px-3 py-1 rounded-none border border-white/10 backdrop-blur-sm">
                {lang === 'it' ? 'PROSPETTIVA ARCHITETTONICA IMMERSIVA' : lang === 'en' ? 'IMMERSIVE ARCHITECTURAL PERSPECTIVE' : 'PERSPECTIVE ARCHITECTURALE IMMERSIVE'}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          5. EDITORIAL DIPTYCH SECTION ("Le Geste & La Matière")
         ========================================================================= */}
      {selectedCategory === 'ALL' && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 mb-24">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <p className="typo-eyebrow">
              {lang === 'it' ? 'Dittico Narrativo' : lang === 'en' ? 'Narrative Diptych' : 'Diptyque Narratif'}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-ivoire">
              {lang === 'it' ? 'Il Gesto & La Materia' : lang === 'en' ? 'The Craft & Raw Material' : 'Le Geste & La Matière'}
            </h2>
            <div className="w-12 h-[1px] bg-or mx-auto" />
            <p className="text-xs sm:text-sm text-muted font-serif italic">
              {lang === 'it'
                ? "Il confronto visivo tra l'ingrediente puro della terra e la maestria del dressage stellato."
                : lang === 'en'
                ? 'The visual harmony between pure earth-harvested ingredients and starred plating precision.'
                : "La confrontation visuelle entre l'ingrédient brut tiré de la terre et la haute voltige du dressage étoilé."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Diptych: Raw Ingredient */}
            <div 
              className="relative rounded-none overflow-hidden border border-white/10 group cursor-pointer bg-surface"
              onClick={() => handleOpenById('gal-04')}
            >
              <div className="h-80 sm:h-[440px] overflow-hidden">
                <img
                  loading="lazy"
                  src="/images/olive-oil-stone.webp"
                  alt="Huile d'olive Coratina sur basalte"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/40 to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest bg-nero/80 text-or border border-or/30 font-semibold">
                  I. {lang === 'it' ? 'La Materia Grezza' : lang === 'en' ? 'Raw Material' : 'La Matière Brute'}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <h3 className="font-serif text-xl text-ivoire">L'Oro di Coratina</h3>
                <p className="text-xs text-muted">
                  {lang === 'it' ? 'Spremitura a freddo e raccolta manuale in Puglia.' : lang === 'en' ? 'Cold-pressed and hand-harvested in Puglia.' : 'Pressage à froid et récolte manuelle sous le soleil des Pouilles.'}
                </p>
              </div>
            </div>

            {/* Right Diptych: Precision Plating Gesture */}
            <div 
              className="relative rounded-none overflow-hidden border border-white/10 group cursor-pointer bg-surface"
              onClick={() => handleOpenById('gal-07')}
            >
              <div className="h-80 sm:h-[440px] overflow-hidden">
                <img
                  loading="lazy"
                  src="/images/chef-craft.webp"
                  alt="Dressage de précision à la pince d'argent"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-nero via-nero/40 to-transparent opacity-80" />
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest bg-nero/80 text-or border border-or/30 font-semibold">
                  II. {lang === 'it' ? "Il Gesto d'Autore" : lang === 'en' ? 'Masterful Precision' : "Le Geste d'Orfèvre"}
                </span>
              </div>
              <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <h3 className="font-serif text-xl text-ivoire">
                  {lang === 'it' ? "La Pinzetta d'Argento" : lang === 'en' ? 'Silver Tweezers' : "La Pince d'Argent"}
                </h3>
                <p className="text-xs text-muted">
                  {lang === 'it' ? 'Accostamento millimetrico di ogni componente botanico.' : lang === 'en' ? 'Millimetric adjustment of every floral element.' : 'Ajustement millimétré de chaque composant floral et minéral au pass.'}
                </p>
              </div>
            </div>

          </div>

        </section>
      )}

      {/* =========================================================================
          6. EDITORIAL QUOTES MANIFESTO BREAK
         ========================================================================= */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 mb-20">
        <div className="p-8 sm:p-12 border border-or/20 bg-surface-elevated text-center space-y-4 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 bg-nero text-or font-serif text-xs uppercase tracking-widest border border-or/30">
            {lang === 'it' ? 'Pensiero Visivo' : lang === 'en' ? 'Visual Thought' : 'Pensée Visuelle'}
          </div>
          <p className="font-serif text-xl sm:text-2xl text-ivoire/90 italic leading-relaxed">
            « {localizedQuotes[0].quote} »
          </p>
          <div className="pt-2">
            <p className="text-xs uppercase tracking-widest text-or font-semibold">
              {localizedQuotes[0].author}
            </p>
            <p className="text-[11px] text-muted">
              {localizedQuotes[0].role} — {localizedQuotes[0].context}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. TABLE RESERVATION INVITATION
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="border border-white/10 bg-surface p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl text-ivoire">
              {lang === 'it' ? "Vivere l'Esperienza dal Vivo" : lang === 'en' ? 'Live the Experience' : "Vivre l'Expérience en Direct"}
            </h3>
            <p className="text-xs text-muted max-w-xl">
              {lang === 'it'
                ? 'Ogni sera a Milano, le creazioni prendono vita davanti agli occhi di ventotto ospiti privilegiati.'
                : lang === 'en'
                ? 'Every evening in Milan, our creations come alive before twenty-eight guests.'
                : 'Chaque soir à Milan, les créations prennent vie sous les yeux de vingt-huit convives privilégiés.'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/reservations"
              className="px-6 py-3 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shadow-lg"
            >
              {lang === 'it' ? 'Prenota un Tavolo' : lang === 'en' ? 'Reserve a Table' : 'Réserver une Table'}
            </Link>
            <Link
              to="/menu"
              className="px-6 py-3 bg-surface-elevated text-ivoire border border-white/10 font-semibold text-xs uppercase tracking-widest hover:border-or/40 hover:text-or transition-all"
            >
              {lang === 'it' ? 'I Menu' : lang === 'en' ? 'The Menus' : 'Les Menus'}
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. MONUMENTAL FULLSCREEN LIGHTBOX COMPONENT
         ========================================================================= */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={activePhotoIndex}
        onIndexChange={(newIdx) => setActivePhotoIndex(newIdx)}
      />

    </div>
  );
}

