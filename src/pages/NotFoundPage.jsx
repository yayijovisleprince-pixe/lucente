import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 py-32 bg-nero">
      <SEOHead
        title="Page Non Trouvée | LUCENTE — Milano"
        description="La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil du restaurant gastronomique LUCENTE à Milan."
        path="/404"
      />
      <div className="space-y-6 max-w-md">
        <div className="inline-flex p-4 rounded-full bg-surface border border-or/30 text-or mb-2">
          <Compass size={28} />
        </div>
        <p className="typo-eyebrow text-or text-xs">Erreur 404 · Hors Carte</p>
        <h1 className="font-serif-luxury text-4xl sm:text-5xl text-ivoire font-light">
          Cette table n'existe pas.
        </h1>
        <div className="w-12 h-[1px] bg-or mx-auto" />
        <p className="typo-body text-sm text-muted">
          La page que vous cherchez a peut-être changé d'adresse ou n'est plus au menu. Retrouvez le chemin de la Maison.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shadow-xl"
          >
            <ArrowLeft size={14} />
            <span>Retour à l'Accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
