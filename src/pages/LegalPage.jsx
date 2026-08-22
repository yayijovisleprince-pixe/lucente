import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, FileText, Lock, Cookie, Scale, ArrowUpRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { restaurantInfo } from '../data/restaurantData';

export default function LegalPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const legalSchema = {
    '@type': 'WebPage',
    '@id': 'https://lucente-milano.com/legal#webpage',
    'name': 'Mentions Légales & Politique de Confidentialité | LUCENTE Milano',
    'description': 'Mentions légales, politique de confidentialité, conformité RGPD, gestion des cookies et conditions d\'accueil du restaurant gastronomique LUCENTE à Milan.',
    'url': 'https://lucente-milano.com/legal',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Mentions Légales & Confidentialité', 'item': 'https://lucente-milano.com/legal' }
      ]
    }
  };

  return (
    <div className="pt-32 pb-36 lg:pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title="Mentions Légales & Confidentialité (RGPD) | LUCENTE — Milano"
        description="Mentions légales, politique de confidentialité, protection des données personnelles (RGPD), gestion des cookies et conditions générales de LUCENTE à Milan."
        path="/legal"
        schema={legalSchema}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <p className="typo-eyebrow text-or flex items-center gap-2">
            <ShieldCheck size={14} />
            <span>Transparence, Déontologie & Sécurité</span>
          </p>
          <h1 className="typo-h1 text-3xl sm:text-5xl text-ivoire">
            Mentions Légales & Politique de Confidentialité
          </h1>
          <p className="typo-body text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
            Dernière mise à jour : 22 août 2026. Conformité stricte aux règlements européens RGPD (UE 2016/679) et à la législation italienne de protection des données (Codice Privacy).
          </p>
          <div className="w-16 h-[1px] bg-or" />
        </div>

        {/* Quick Nav Anchors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <a
            href="#mentions"
            className="p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-xs text-muted hover:text-ivoire flex items-center justify-between group"
          >
            <span>1. Mentions Légales</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100" />
          </a>
          <a
            href="#rgpd"
            className="p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-xs text-muted hover:text-ivoire flex items-center justify-between group"
          >
            <span>2. RGPD & Données</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100" />
          </a>
          <a
            href="#cookies"
            className="p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-xs text-muted hover:text-ivoire flex items-center justify-between group"
          >
            <span>3. Cookies</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100" />
          </a>
          <a
            href="#conditions"
            className="p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-xs text-muted hover:text-ivoire flex items-center justify-between group"
          >
            <span>4. Réservations</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100" />
          </a>
        </div>

        {/* Legal Sections */}
        <div className="space-y-12 typo-body text-xs sm:text-sm text-muted leading-relaxed">
          
          {/* Section 1: Mentions Légales */}
          <section id="mentions" className="scroll-mt-32 space-y-4 p-6 sm:p-8 bg-surface/60 border border-white/5 rounded-none">
            <div className="flex items-center gap-3">
              <FileText className="text-or w-5 h-5 flex-shrink-0" />
              <h2 className="text-ivoire font-serif-luxury text-xl sm:text-2xl">1. Mentions Légales & Édition du Site</h2>
            </div>
            <div className="space-y-3 pt-2 text-muted">
              <p>
                Le site officiel <strong className="text-ivoire">lucente-milano.com</strong> est édité et exploité par la société <strong className="text-ivoire">LUCENTE Alta Cucina S.r.l.</strong>, société commerciale de droit italien au capital social de 100 000 €, immatriculée au Registre des Entreprises de Milan sous le numéro d'identification fiscale et TVA : <span className="text-ivoire font-mono">IT-08945770014</span>.
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
                <li><strong>Siège Social :</strong> Via Monte Napoleone 14, 20121 Milano, Italia</li>
                <li><strong>Directeur de la Publication :</strong> Vincenzo Moretti (Chef Propriétaire)</li>
                <li><strong>Direction de Création & Sommellerie :</strong> Gianluca Ferri</li>
                <li><strong>Téléphone Conciergerie :</strong> {restaurantInfo.phone}</li>
                <li><strong>Courriel Conciergerie :</strong> {restaurantInfo.email}</li>
                <li><strong>Hébergement :</strong> Infrastructure Cloud haute disponibilité certifiée ISO 27001 & RGPD.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Politique de Confidentialité & RGPD */}
          <section id="rgpd" className="scroll-mt-32 space-y-4 p-6 sm:p-8 bg-surface/60 border border-or-subtle rounded-none">
            <div className="flex items-center gap-3">
              <Lock className="text-or w-5 h-5 flex-shrink-0" />
              <h2 className="text-ivoire font-serif-luxury text-xl sm:text-2xl">2. Protection des Données & Politique de Confidentialité (RGPD)</h2>
            </div>
            <div className="space-y-3 pt-2 text-muted">
              <p>
                La Maison LUCENTE s'engage à garantir le niveau de confidentialité et d'intégrité le plus strict pour toutes les données confiées par ses hôtes, conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679).
              </p>
              
              <div className="space-y-2 pt-2">
                <h3 className="text-ivoire font-medium text-sm uppercase tracking-wider text-xs">A. Finalités de la collecte</h3>
                <p>
                  Les données transmises lors d'une réservation, d'une demande de privatisation ou d'une souscription à la Lettre du Cercle Privé sont collectées uniquement pour :
                </p>
                <ul className="list-disc list-inside space-y-1 pl-2 text-xs">
                  <li>Gérer, confirmer et personnaliser votre expérience de dégustation à table.</li>
                  <li>Prendre en compte vos restrictions alimentaires, intolérances et allergies déclarées.</li>
                  <li>Vous adresser des informations personnalisées (si vous y avez expressément consenti).</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-ivoire font-medium text-sm uppercase tracking-wider text-xs">B. Absence de revente ou de transfert tiers</h3>
                <p>
                  Vos coordonnées ne sont <strong className="text-ivoire">jamais vendues, louées, cédées ou échangées</strong> avec aucun organisme commercial tiers. Elles demeurent sous le contrôle exclusif de la Conciergerie LUCENTE.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-ivoire font-medium text-sm uppercase tracking-wider text-xs">C. Vos droits (Accès, Rectification, Suppression)</h3>
                <p>
                  Conformément aux articles 15 à 22 du RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité et d'effacement de l'ensemble de vos données. Pour exercer ce droit à tout instant, adressez un message électronique à : <a href={`mailto:${restaurantInfo.email}`} className="text-or hover:underline">{restaurantInfo.email}</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Cookies */}
          <section id="cookies" className="scroll-mt-32 space-y-4 p-6 sm:p-8 bg-surface/60 border border-white/5 rounded-none">
            <div className="flex items-center gap-3">
              <Cookie className="text-or w-5 h-5 flex-shrink-0" />
              <h2 className="text-ivoire font-serif-luxury text-xl sm:text-2xl">3. Politique Relative aux Cookies</h2>
            </div>
            <div className="space-y-3 pt-2 text-muted">
              <p>
                Le site LUCENTE utilise uniquement des traceurs strictement nécessaires au bon fonctionnement technique de l'expérience interactive (maintien de session de réservation, préférences sonores, sécurité contre les attaques CSRF).
              </p>
              <p>
                Aucun cookie publicitaire intrusif ou traceur de ciblage tiers n'est déposé sur votre terminal à des fins de profilage commercial.
              </p>
            </div>
          </section>

          {/* Section 4: Propriété intellectuelle & Conditions */}
          <section id="conditions" className="scroll-mt-32 space-y-4 p-6 sm:p-8 bg-surface/60 border border-white/5 rounded-none">
            <div className="flex items-center gap-3">
              <Scale className="text-or w-5 h-5 flex-shrink-0" />
              <h2 className="text-ivoire font-serif-luxury text-xl sm:text-2xl">4. Propriété Intellectuelle & Conditions d'Accueil</h2>
            </div>
            <div className="space-y-3 pt-2 text-muted">
              <p>
                L'ensemble des créations culinaires, dénominations de menus, compositions photographiques, récits éditoriaux et identités graphiques composant ce site sont protégés par le droit de la propriété intellectuelle et demeurent la propriété exclusive de LUCENTE Alta Cucina S.r.l.
              </p>
              <p>
                <strong className="text-ivoire">Conditions de service :</strong> Compte tenu de notre salle intimiste de 28 couverts, toute modification ou annulation de table doit être signalée 48 heures au préalable.
              </p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
