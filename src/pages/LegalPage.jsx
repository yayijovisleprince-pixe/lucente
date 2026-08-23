import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Lock, Cookie, Scale, ArrowUpRight, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { restaurantInfo } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';

export default function LegalPage() {
  const location = useLocation();
  const { lang, t } = useLanguage();

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

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-32 sm:pb-36 lg:pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero overflow-x-hidden">
      <SEOHead
        title={lang === 'it' ? 'Note Legali & Privacy (GDPR) | LUCENTE — Milano' : lang === 'en' ? 'Legal Notice & Privacy (GDPR) | LUCENTE — Milano' : 'Mentions Légales & Confidentialité (RGPD) | LUCENTE — Milano'}
        description={lang === 'it' ? 'Note legali, privacy policy e gestione cookie di LUCENTE a Milano.' : lang === 'en' ? 'Legal notice, privacy policy and cookie management of LUCENTE in Milan.' : 'Mentions légales, politique de confidentialité et gestion des cookies de LUCENTE à Milan.'}
        path="/legal"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-10 sm:space-y-16">
        
        {/* Header */}
        <div className="space-y-3 sm:space-y-4">
          <p className="typo-eyebrow text-or flex items-center gap-2 text-xs sm:text-sm">
            <ShieldCheck size={14} className="shrink-0" />
            <span className="truncate">
              {lang === 'it' ? 'Trasparenza, Deontologia & Sicurezza' : lang === 'en' ? 'Transparency, Ethics & Compliance' : 'Transparence, Déontologie & Sécurité'}
            </span>
          </p>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl text-ivoire font-light leading-tight break-words">
            {lang === 'it' ? 'Note Legali & Privacy Policy' : lang === 'en' ? 'Legal Notice & Privacy Policy' : 'Mentions Légales & Politique de Confidentialité'}
          </h1>
          <p className="typo-body text-xs sm:text-sm text-muted max-w-2xl leading-relaxed">
            {lang === 'it'
              ? 'Conformità rigorosa ai regolamenti europei GDPR (UE 2016/679) e alla legislazione italiana sulla privacy (Codice Privacy).'
              : lang === 'en'
              ? 'Strict compliance with European GDPR regulations (EU 2016/679) and Italian privacy legislation (Codice Privacy).'
              : 'Dernière mise à jour : 2026. Conformité stricte aux règlements européens RGPD (UE 2016/679) et à la législation italienne de protection des données (Codice Privacy).'}
          </p>
          <div className="w-16 h-[1px] bg-or" />
        </div>

        {/* Quick Nav Anchors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <a
            href="#mentions"
            className="p-2.5 sm:p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-[11px] sm:text-xs text-muted hover:text-ivoire flex items-center justify-between group rounded-none touch-manipulation"
          >
            <span className="truncate">1. {lang === 'it' ? 'Note Legali' : lang === 'en' ? 'Legal Notice' : 'Mentions'}</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
          </a>
          <a
            href="#rgpd"
            className="p-2.5 sm:p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-[11px] sm:text-xs text-muted hover:text-ivoire flex items-center justify-between group rounded-none touch-manipulation"
          >
            <span className="truncate">2. {lang === 'it' ? 'GDPR / Privacy' : lang === 'en' ? 'GDPR / Privacy' : 'RGPD'}</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
          </a>
          <a
            href="#cookies"
            className="p-2.5 sm:p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-[11px] sm:text-xs text-muted hover:text-ivoire flex items-center justify-between group rounded-none touch-manipulation"
          >
            <span className="truncate">3. Cookies</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
          </a>
          <a
            href="#conditions"
            className="p-2.5 sm:p-3 bg-surface border border-white/10 hover:border-or/50 transition-all text-[11px] sm:text-xs text-muted hover:text-ivoire flex items-center justify-between group rounded-none touch-manipulation"
          >
            <span className="truncate">4. {lang === 'it' ? 'Condizioni' : lang === 'en' ? 'Terms' : 'Conditions'}</span>
            <ArrowUpRight size={12} className="text-or opacity-60 group-hover:opacity-100 shrink-0 ml-1" />
          </a>
        </div>

        {/* Legal Sections */}
        <div className="space-y-8 sm:space-y-12 typo-body text-xs sm:text-sm text-muted leading-relaxed">
          
          {/* Section 1: Mentions Légales */}
          <section id="mentions" className="scroll-mt-24 sm:scroll-mt-32 space-y-4 p-4 sm:p-6 md:p-8 bg-surface/60 border border-white/5 rounded-none overflow-hidden">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <FileText className="text-or w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-1" />
              <h2 className="text-ivoire font-serif text-lg sm:text-xl md:text-2xl leading-snug break-words">
                1. {lang === 'it' ? 'Note Legali & Editore del Sito' : lang === 'en' ? 'Legal Notice & Site Ownership' : 'Mentions Légales & Édition du Site'}
              </h2>
            </div>
            <div className="space-y-3 pt-2 text-muted">
              <p className="break-words">
                {lang === 'it'
                  ? 'Il sito ufficiale lucente-milano.com è gestito ed edito dalla società LUCENTE Alta Cucina S.r.l., società di diritto italiano con capitale sociale di 100 000 €, iscritta al Registro delle Imprese di Milano con Partita IVA:'
                  : lang === 'en'
                  ? 'The official website lucente-milano.com is published and operated by LUCENTE Alta Cucina S.r.l., an Italian company with share capital of €100,000, registered at the Milan Business Register under VAT ID:'
                  : 'Le site officiel lucente-milano.com est édité et exploité par la société LUCENTE Alta Cucina S.r.l., société commerciale de droit italien au capital social de 100 000 €, immatriculée au Registre des Entreprises de Milan sous le numéro d\'identification fiscale et TVA :'} <span className="text-ivoire font-mono break-all inline-block">IT-08945770014</span>.
              </p>
              <ul className="space-y-2 pt-2 text-xs sm:text-sm border-t border-white/5">
                <li className="break-words">
                  <strong className="text-ivoire">{lang === 'it' ? 'Sede Legale :' : lang === 'en' ? 'Headquarters :' : 'Siège Social :'}</strong> Via Monte Napoleone 14, 20121 Milano, Italia
                </li>
                <li className="break-words">
                  <strong className="text-ivoire">{lang === 'it' ? 'Direttore Responsabile :' : lang === 'en' ? 'Managing Director :' : 'Directeur de la Publication :'}</strong> Vincenzo Moretti (Chef Propriétaire)
                </li>
                <li className="break-words">
                  <strong className="text-ivoire">{lang === 'it' ? 'Direzione Creativa & Sommelier :' : lang === 'en' ? 'Creative Direction & Sommelier :' : 'Direction de Création & Sommellerie :'}</strong> Gianluca Ferri
                </li>
                <li className="break-words">
                  <strong className="text-ivoire">{lang === 'it' ? 'Telefono Concierge :' : lang === 'en' ? 'Concierge Phone :' : 'Téléphone Conciergerie :'}</strong> <a href={`tel:${restaurantInfo.phone.replace(/\s+/g, '')}`} className="text-or hover:underline">{restaurantInfo.phone}</a>
                </li>
                <li className="break-words">
                  <strong className="text-ivoire">{lang === 'it' ? 'Email Concierge :' : lang === 'en' ? 'Concierge Email :' : 'Courriel Conciergerie :'}</strong> <a href={`mailto:${restaurantInfo.email}`} className="text-or hover:underline break-all">{restaurantInfo.email}</a>
                </li>
                <li className="break-words">
                  <strong className="text-ivoire">{lang === 'it' ? 'Hosting Cloud :' : lang === 'en' ? 'Cloud Hosting :' : 'Hébergement :'}</strong> Infrastructure Cloud ISO 27001 & GDPR.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 2: Politique de Confidentialité & RGPD */}
          <section id="rgpd" className="scroll-mt-24 sm:scroll-mt-32 space-y-4 p-4 sm:p-6 md:p-8 bg-surface/60 border border-or/30 rounded-none overflow-hidden">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Lock className="text-or w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-1" />
              <h2 className="text-ivoire font-serif text-lg sm:text-xl md:text-2xl leading-snug break-words">
                2. {lang === 'it' ? 'Protezione dei Dati & Privacy (GDPR)' : lang === 'en' ? 'Data Protection & Privacy Policy (GDPR)' : 'Protection des Données & Politique de Confidentialité (RGPD)'}
              </h2>
            </div>
            <div className="space-y-4 pt-2 text-muted">
              <p className="break-words">
                {lang === 'it'
                  ? 'La Maison LUCENTE garantisce i massimi standard di sicurezza e riservatezza per tutti i dati affidati dai propri ospiti, conformemente al GDPR (Regolamento UE 2016/679).'
                  : lang === 'en'
                  ? 'Maison LUCENTE ensures the highest confidentiality and integrity standards for all guest data, in compliance with GDPR (EU Regulation 2016/679).'
                  : 'La Maison LUCENTE s\'engage à garantir le niveau de confidentialité et d\'intégrité le plus strict pour toutes les données confiées par ses hôtes, conformément au Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679).'}
              </p>
              
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h3 className="text-ivoire font-medium text-xs sm:text-sm uppercase tracking-wider">
                  A. {lang === 'it' ? 'Finalità del trattamento' : lang === 'en' ? 'Collection Purposes' : 'Finalités de la collecte'}
                </h3>
                <p className="break-words">
                  {lang === 'it'
                    ? "I dati trasmessi durante una prenotazione, richiesta di privatizzazione o iscrizione al Circolo Privato sono trattati unicamente per:"
                    : lang === 'en'
                    ? 'Data submitted during booking, private buyout inquiries or newsletter subscription is collected solely to:'
                    : "Les données transmises lors d'une réservation, d'une demande de privatisation ou d'une souscription à la Lettre du Cercle Privé sont collectées uniquement pour :"}
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs sm:text-sm break-words">
                  <li>{lang === 'it' ? 'Gestire, confermare e personalizzare la vostra degustazione al tavolo.' : lang === 'en' ? 'Manage, confirm and personalize your dining experience.' : 'Gérer, confirmer et personnaliser votre expérience de dégustation à table.'}</li>
                  <li>{lang === 'it' ? 'Tenere conto di restrizioni dietetiche, intolleranze e allergie.' : lang === 'en' ? 'Accommodate dietary restrictions and declared allergens.' : 'Prendre en compte vos restrictions alimentaires, intolérances et allergies déclarées.'}</li>
                  <li>{lang === 'it' ? 'Inviare comunicazioni esclusive della Maison con il vostro consenso.' : lang === 'en' ? 'Send exclusive House communications with your consent.' : 'Vous adresser des informations personnalisées (si vous y avez expressément consenti).'}</li>
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <h3 className="text-ivoire font-medium text-xs sm:text-sm uppercase tracking-wider">
                  B. {lang === 'it' ? 'Nessuna cessione a terzi' : lang === 'en' ? 'No Third-Party Sale' : 'Absence de revente ou de transfert tiers'}
                </h3>
                <p className="break-words">
                  {lang === 'it'
                    ? 'I vostri recapiti non vengono mai venduti, ceduti o scambiati con alcun soggetto commerciale terzo.'
                    : lang === 'en'
                    ? 'Your personal details are never sold, rented or shared with any commercial third party.'
                    : 'Vos coordonnées ne sont jamais vendues, louées, cédées ou échangées avec aucun organisme commercial tiers. Elles demeurent sous le contrôle exclusif de la Conciergerie LUCENTE.'}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/5">
                <h3 className="text-ivoire font-medium text-xs sm:text-sm uppercase tracking-wider">
                  C. {lang === 'it' ? 'I vostri diritti (Accesso, Rettifica, Cancellazione)' : lang === 'en' ? 'Your Rights (Access, Correction, Deletion)' : 'Vos droits (Accès, Rectification, Suppression)'}
                </h3>
                <p className="break-words">
                  {lang === 'it'
                    ? 'Ai sensi degli articoli 15-22 del GDPR, avete il diritto di accedere, rettificare o cancellare i vostri dati. Contattateci all\'indirizzo:'
                    : lang === 'en'
                    ? 'Under articles 15 to 22 of GDPR, you have the right to access, rectify and delete your data at any time. Contact us at:'
                    : 'Conformément aux articles 15 à 22 du RGPD, vous disposez d\'un droit d\'accès, de rectification, de portabilité et d\'effacement de l\'ensemble de vos données. Pour exercer ce droit à tout instant, adressez un message électronique à :'} <a href={`mailto:${restaurantInfo.email}`} className="text-or hover:underline break-all font-mono font-medium">{restaurantInfo.email}</a>.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Cookies */}
          <section id="cookies" className="scroll-mt-24 sm:scroll-mt-32 space-y-4 p-4 sm:p-6 md:p-8 bg-surface/60 border border-white/5 rounded-none overflow-hidden">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Cookie className="text-or w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-1" />
              <h2 className="text-ivoire font-serif text-lg sm:text-xl md:text-2xl leading-snug break-words">
                3. {lang === 'it' ? 'Informativa sui Cookie' : lang === 'en' ? 'Cookie Policy' : 'Politique Relative aux Cookies'}
              </h2>
            </div>
            <div className="space-y-3 pt-2 text-muted">
              <p className="break-words">
                {lang === 'it'
                  ? "Il sito LUCENTE impiega esclusivamente cookie tecnici indispensabili all'esperienza interattiva (mantenimento della sessione di prenotazione, preferenze audio, sicurezza CSRF)."
                  : lang === 'en'
                  ? 'The LUCENTE website only uses essential cookies strictly necessary for interactive features (booking session, audio preferences, CSRF protection).'
                  : 'Le site LUCENTE utilise uniquement des traceurs strictement nécessaires au bon fonctionnement technique de l\'expérience interactive (maintien de session de réservation, préférences sonores, sécurité contre les attaques CSRF).'}
              </p>
            </div>
          </section>

          {/* Section 4: Propriété intellectuelle & Conditions */}
          <section id="conditions" className="scroll-mt-24 sm:scroll-mt-32 space-y-4 p-4 sm:p-6 md:p-8 bg-surface/60 border border-white/5 rounded-none overflow-hidden">
            <div className="flex items-start gap-2.5 sm:gap-3">
              <Scale className="text-or w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-1" />
              <h2 className="text-ivoire font-serif text-lg sm:text-xl md:text-2xl leading-snug break-words">
                4. {lang === 'it' ? 'Proprietà Intellettuale & Condizioni di Servizio' : lang === 'en' ? 'Intellectual Property & Service Terms' : 'Propriété Intellectuelle & Conditions d\'Accueil'}
              </h2>
            </div>
            <div className="space-y-3 pt-2 text-muted">
              <p className="break-words">
                {lang === 'it'
                  ? 'Tutte le creazioni culinarie, i testi, le fotografie e l\'identità visiva di questo sito sono protetti dal diritto d\'autore e restano proprietà esclusiva di LUCENTE Alta Cucina S.r.l.'
                  : lang === 'en'
                  ? 'All culinary creations, menu naming, photography, editorial prose and brand identity are protected by intellectual property rights and remain the exclusive property of LUCENTE Alta Cucina S.r.l.'
                  : 'L\'ensemble des créations culinaires, dénominations de menus, compositions photographiques, récits éditoriaux et identités graphiques composant ce site sont protégés par le droit de la propriété intellectuelle et demeurent la propriété exclusive de LUCENTE Alta Cucina S.r.l.'}
              </p>
              <p className="break-words pt-2 border-t border-white/5">
                <strong className="text-ivoire">
                  {lang === 'it' ? 'Condizioni di servizio :' : lang === 'en' ? 'Service terms :' : 'Conditions de service :'}
                </strong> {lang === 'it'
                  ? 'Data la capienza esclusiva di 28 coperti, ogni modifica o cancellazione deve essere comunicata con almeno 48 ore di anticipo.'
                  : lang === 'en'
                  ? 'Given our intimate 28-cover dining room, any modification or cancellation must be communicated at least 48 hours in advance.'
                  : 'Compte tenu de notre salle intimiste de 28 couverts, toute modification ou annulation de table doit être signalée 48 heures au préalable.'}
              </p>
            </div>
          </section>

        </div>

        {/* Back Link Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-widest text-muted hover:text-or transition-colors py-2"
          >
            <ArrowLeft size={14} />
            <span>{lang === 'it' ? "Torna all'inizio" : lang === 'en' ? 'Back to Home' : "Retour à l'accueil"}</span>
          </Link>
          <a
            href="#main-content"
            className="inline-flex items-center gap-1 text-xs uppercase font-mono tracking-widest text-or hover:text-ivoire transition-colors py-2"
          >
            <span>{lang === 'it' ? 'Inizio Pagina ↑' : lang === 'en' ? 'Top of Page ↑' : 'Haut de page ↑'}</span>
          </a>
        </div>

      </div>
    </div>
  );
}

