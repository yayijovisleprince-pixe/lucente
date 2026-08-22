import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFoundPage() {
  const { lang, t } = useLanguage();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-32 bg-nero">
      <SEOHead
        title={lang === 'it' ? '404 · Pagina non trovata | LUCENTE — Milano' : lang === 'en' ? '404 · Page Not Found | LUCENTE — Milano' : '404 · Page introuvable | LUCENTE — Milano'}
        description={lang === 'it' ? 'La pagina cercata non esiste o è stata spostata.' : lang === 'en' ? 'The page you are looking for does not exist or has been moved.' : 'La page que vous recherchez n\'existe pas ou a été déplacée.'}
        path="/404"
      />
      <div className="space-y-6 max-w-md">
        <div className="inline-flex p-4 rounded-full bg-surface border border-or/30 text-or mb-2">
          <Compass size={28} />
        </div>
        <p className="typo-eyebrow text-or text-xs">404 · {lang === 'it' ? 'Fuori Carta' : lang === 'en' ? 'Off Menu' : 'Hors Carte'}</p>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl text-ivoire font-light">
          {t('notFound.title')}
        </h1>
        <div className="w-12 h-[1px] bg-or mx-auto" />
        <p className="typo-body text-sm text-muted">
          {t('notFound.subtitle')}
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shadow-xl"
          >
            <ArrowLeft size={14} />
            <span>{t('notFound.backHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

