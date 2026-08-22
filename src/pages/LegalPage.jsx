import React from 'react';
import SEOHead from '../components/SEOHead';

export default function LegalPage() {
  const legalSchema = {
    '@type': 'WebPage',
    '@id': 'https://lucente-milano.com/legal#webpage',
    'name': 'Mentions Légales & Confidentialité | LUCENTE Milano',
    'description': 'Mentions légales, politique de confidentialité, conformité RGPD et conditions d\'accueil du restaurant gastronomique LUCENTE à Milan.',
    'url': 'https://lucente-milano.com/legal',
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Accueil', 'item': 'https://lucente-milano.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Mentions Légales', 'item': 'https://lucente-milano.com/legal' }
      ]
    }
  };

  return (
    <div className="pt-32 pb-24 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title="Mentions Légales & Confidentialité | LUCENTE — Milano"
        description="Mentions légales, protection des données personnelles (RGPD), conditions générales et propriété intellectuelle de LUCENTE Alta Cucina S.r.l. à Milan."
        path="/legal"
        schema={legalSchema}
      />
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <p className="typo-eyebrow">Transparence & Déontologie</p>
          <h1 className="typo-h1 text-4xl sm:text-5xl text-ivoire">
            Mentions Légales
          </h1>
          <div className="w-16 h-[1px] bg-or" />
        </div>

        <div className="space-y-8 typo-body text-sm text-muted leading-relaxed">
          <div className="space-y-2">
            <h2 className="text-ivoire font-medium text-base">1. Édition du Site</h2>
            <p>Le site internet officiel LUCENTE (lucente-milano.com) est édité par la société LUCENTE Alta Cucina S.r.l., société de droit italien au capital social de 100 000 €, immatriculée au Registre des Entreprises de Milan sous le numéro MI-89457700. Siège social : Via Monte Napoleone 14, 20121 Milano, Italia. Téléphone : +39 02 8945 7700. Email de conciergerie : conciergerie@lucente-milano.com.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-ivoire font-medium text-base">2. Direction de la Publication & Création</h2>
            <p>Directeur de la publication : Vincenzo Moretti, Chef Exécutif & Propriétaire de LUCENTE. Direction Artistique & Sommelerie : Gianluca Ferri.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-ivoire font-medium text-base">3. Protection des Données Personnelles (RGPD)</h2>
            <p>Les données nominatives et de contact recueillies lors de vos réservations ou demandes de privatisations en ligne sont exclusivement réservées au service de conciergerie de la Maison LUCENTE. Elles permettent d'assurer le suivi de votre table, la personnalisation de votre service et la prise en charge de vos éventuelles allergies ou régimes spécifiques. Vos informations ne sont en aucun cas commercialisées ou transmises à des tiers sans votre consentement explicite.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-ivoire font-medium text-base">4. Propriété Intellectuelle</h2>
            <p>L'ensemble des photographies, créations culinaires, dénominations de menus, vidéos, identités visuelles et textes éditoriaux présents sur ce site sont la propriété exclusive de LUCENTE S.r.l. Toute reproduction, modification ou diffusion, même partielle, sans autorisation préalable écrite est strictement interdite conformément aux lois sur le droit d'auteur.</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-ivoire font-medium text-base">5. Conditions d'Accueil & Annulation</h2>
            <p>En raison de notre capacité limitée à 28 couverts par service, les annulations ou modifications de réservations doivent être notifiées au minimum 48 heures à l'avance. Une empreinte bancaire garantit votre réservation pour les tables de plus de 4 convives et les salons privatifs.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
