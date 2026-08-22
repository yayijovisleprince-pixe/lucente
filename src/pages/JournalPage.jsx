import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, ArrowRight, Clock, Calendar, Sparkles, Search, Feather, Layers, ArrowUpRight
} from 'lucide-react';
import { journalCategories, articles } from '../data/journalData';
import SEOHead from '../components/SEOHead';

export default function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesCategory = selectedCategory === 'ALL' || art.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = articles.find(a => a.featured) || articles[0];

  const journalSchema = {
    '@type': 'CollectionPage',
    '@id': 'https://lucente-milano.com/journal#collection',
    'name': 'Le Journal LUCENTE Milano — Chroniques & Essais Gastronomiques',
    'description': 'Philosophie du Chiaroscuro, vins en amphore, portraits de brigade, secrets de saisonnalité. Les chroniques de LUCENTE par Vincenzo Moretti et Gianluca Ferri.',
    'url': 'https://lucente-milano.com/journal',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Le Journal', 'item': 'https://lucente-milano.com/journal' }
      ]
    }
  };

  return (
    <div className="bg-nero text-ivoire min-h-screen pt-32 pb-28">
      <SEOHead
        title="Le Journal — Chroniques & Essais | LUCENTE — Milano"
        description="Philosophie du Chiaroscuro, vins en amphore de l'Etna, portraits de brigade. Les chroniques de LUCENTE par Vincenzo Moretti et Gianluca Ferri."
        image="/images/hero-dish.jpg"
        path="/journal"
        schema={journalSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="border-b border-white/10 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <span className="typo-eyebrow text-or block">Publications & Réflexions</span>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-ivoire font-light leading-tight">
              Le Journal
            </h1>
            <p className="typo-body text-base text-muted">
              Ce que la cuisine ne peut pas dire dans l'assiette, on l'écrit ici. Philosophie, technique, portraits — par Vincenzo Moretti et la brigade.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Chercher dans le journal..."
              className="w-full bg-surface border border-white/10 px-4 py-2.5 pl-10 text-xs text-ivoire placeholder:text-muted/60 focus:outline-none focus:border-or/50 transition-colors"
            />
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {journalCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-or text-nero font-semibold shadow-lg'
                  : 'bg-surface text-muted hover:text-ivoire border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {selectedCategory === 'ALL' && searchQuery === '' && featuredArticle && (
          <Link
            to={`/journal/${featuredArticle.slug}`}
            className="block group relative bg-surface border border-white/10 overflow-hidden hover:border-or/40 transition-all duration-500 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 h-72 sm:h-96 lg:h-[460px] overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-or text-nero text-[10px] uppercase font-mono font-bold tracking-widest">
                      Chronique Signature
                    </span>
                    <span className="text-xs uppercase font-mono text-muted tracking-widest">
                      {featuredArticle.categoryLabel}
                    </span>
                  </div>

                  <h2 className="font-serif-luxury text-2xl sm:text-4xl text-ivoire group-hover:text-or transition-colors leading-tight">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-muted font-mono">
                  <span>{featuredArticle.date} · {featuredArticle.readingTime}</span>
                  <span className="text-or inline-flex items-center gap-1">Lire <ArrowUpRight size={13} /></span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <Link
              key={art.slug}
              to={`/journal/${art.slug}`}
              className="group bg-surface border border-white/5 hover:border-or/40 overflow-hidden flex flex-col justify-between transition-all duration-500 shadow-xl"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nero via-transparent to-transparent opacity-60" />
                  <span className="absolute top-4 left-4 px-2.5 py-0.5 bg-nero/90 border border-or/30 text-or text-[9px] uppercase font-mono tracking-widest">
                    {art.categoryLabel || art.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-muted font-mono">
                    <span>{art.date}</span>
                    <span>·</span>
                    <span>{art.readingTime}</span>
                  </div>

                  <h3 className="font-serif text-xl text-ivoire group-hover:text-or transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-1.5 text-xs text-or font-semibold font-sans group-hover:translate-x-1 transition-transform">
                <span>Lire</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
