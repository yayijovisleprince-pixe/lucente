import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Check, ArrowRight, Feather, Sparkles } from 'lucide-react';
import { articles } from '../data/journalData';
import SEOHead from '../components/SEOHead';

export default function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const article = articles.find(a => a.slug === slug) || articles[0];

  const relatedArticles = articles
    .filter(a => a.slug !== article.slug)
    .slice(0, 3);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const articleSchema = {
    '@type': 'Article',
    '@id': `https://lucente-milano.com/journal/${article.slug}#article`,
    'headline': article.title,
    'description': article.excerpt,
    'image': `https://lucente-milano.com${article.image}`,
    'datePublished': '2026-08-18',
    'dateModified': '2026-08-22',
    'author': {
      '@type': 'Person',
      'name': article.author?.name || 'Vincenzo Moretti',
      'jobTitle': article.author?.role || 'Chef Exécutif'
    },
    'publisher': {
      '@type': 'Restaurant',
      'name': 'LUCENTE',
      'url': 'https://lucente-milano.com',
      'logo': 'https://lucente-milano.com/images/hero-dish.webp'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://lucente-milano.com/journal/${article.slug}`
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Le Journal', 'item': 'https://lucente-milano.com/journal' },
        { '@type': 'ListItem', 'position': 3, 'name': article.title, 'item': `https://lucente-milano.com/journal/${article.slug}` }
      ]
    }
  };

  return (
    <div className="bg-nero text-ivoire min-h-screen pt-28 pb-32 selection:bg-or selection:text-nero">
      <SEOHead
        title={`${article.title} | Le Journal LUCENTE — Milano`}
        description={article.excerpt}
        image={article.image}
        path={`/journal/${article.slug}`}
        type="article"
        article={{
          datePublished: '2026-08-18',
          author: article.author?.name || 'Vincenzo Moretti',
          section: article.categoryLabel || 'Gastronomie'
        }}
        schema={articleSchema}
      />

      {/* Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-or z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            to="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-or transition-colors font-mono"
          >
            <ArrowLeft size={14} />
            <span>Retour aux Chroniques</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-or/15 text-or text-[10px] uppercase font-mono tracking-widest border border-or/30">
              {article.categoryLabel || article.category}
            </span>
            <span className="text-xs text-muted flex items-center gap-1 font-mono">
              <Clock size={12} /> {article.readingTime}
            </span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-ivoire font-normal leading-tight">
            {article.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-ivoire/80 italic border-l-2 border-or pl-4">
            {article.excerpt}
          </p>

          {/* Author Card & Share */}
          <div className="flex items-center justify-between border-y border-white/10 py-4">
            <div className="flex items-center gap-3">
              <img
                src={article.author?.avatar || '/images/chef-portrait.webp'}
                alt={article.author?.name}
                loading="lazy"
                className="w-11 h-11 rounded-full object-cover border border-or/40"
              />
              <div>
                <p className="text-xs uppercase font-semibold text-ivoire tracking-wider">{article.author?.name}</p>
                <p className="text-[11px] text-muted">{article.author?.role} · {article.date}</p>
              </div>
            </div>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-3 py-1.5 bg-surface text-muted hover:text-or text-xs border border-white/10 transition-all"
            >
              {copied ? <Check size={14} className="text-or" /> : <Share2 size={14} />}
              <span>{copied ? 'Lien copié' : 'Partager'}</span>
            </button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative rounded-none overflow-hidden border border-white/10 aspect-video shadow-2xl">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Body Content */}
        <div className="space-y-8 text-ivoire/90 font-serif text-lg sm:text-xl leading-relaxed">
          {article.content?.map((block, idx) => {
            if (block.type === 'paragraph') {
              return <p key={idx} className="font-light">{block.text}</p>;
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={idx} className="p-6 bg-surface border-l-2 border-or italic text-xl sm:text-2xl text-or/90 my-8">
                  « {block.quote} »
                  {block.author && <span className="block text-xs font-sans not-italic text-muted pt-2">— {block.author}</span>}
                </blockquote>
              );
            }
            if (block.type === 'heading') {
              return <h2 key={idx} className="font-serif-luxury text-2xl sm:text-3xl text-ivoire pt-6">{block.text}</h2>;
            }
            return null;
          })}
        </div>

        {/* Tags */}
        <div className="pt-8 border-t border-white/10 flex items-center gap-2 flex-wrap">
          {article.tags?.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-surface text-muted text-xs border border-white/5 font-mono">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles */}
        <section className="pt-16 border-t border-white/10 space-y-8">
          <h3 className="font-serif-luxury text-2xl text-ivoire">Autres Chroniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/journal/${rel.slug}`}
                className="group bg-surface p-4 border border-white/5 hover:border-or/40 transition-all space-y-3"
              >
                <div className="h-36 overflow-hidden">
                  <img src={rel.image} alt={rel.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-serif text-base text-ivoire group-hover:text-or transition-colors line-clamp-2">{rel.title}</h4>
                <span className="text-[11px] text-muted font-mono">{rel.readingTime}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
