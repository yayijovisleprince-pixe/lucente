import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, Award, Sparkles, Send } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { restaurantInfo } from '../data/restaurantData';

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Cuisine — Chef de Partie',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  const openPositions = [
    {
      title: "Chef de Partie — Sauces & Braises",
      department: "Cuisine · Brigade Moretti",
      experience: "3 ans minimum en maison étoilée Michelin",
      description: "Maîtrise des réductions lentes, du travail au feu de sarments de vigne et des découpes précises de gibiers et viandes de race Chianina."
    },
    {
      title: "Sommelier — Cave & Vins Volcaniques",
      department: "Salle & Sommellerie · Direction Gianluca Ferri",
      experience: "Formation certifiée, bilingue italien/anglais (français apprécié)",
      description: "Connaissance approfondie des terroirs transalpins, des vinifications en amphores et passion du partage émotionnel au guéridon."
    },
    {
      title: "Chef de Rang — Sprezzatura & Accueil",
      department: "Salle · Direction Matteo Castiglione",
      experience: "Excellence du service contemporain feutré",
      description: "Rigueur chirurgicale dans le geste, sens aigu de l'écoute et élégance naturelle sans théâtralité artificielle."
    }
  ];

  const careersSchema = {
    '@type': 'AboutPage',
    '@id': 'https://lucente-milano.com/careers#careers',
    'name': 'Carrières & Transmission | LUCENTE Milano',
    'description': 'Rejoindre la brigade du Chef Vincenzo Moretti et l\'équipe de sommellerie de LUCENTE à Milan. Postes ouverts en cuisine et en salle.',
    'url': 'https://lucente-milano.com/careers'
  };

  return (
    <div className="pt-32 pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title="Carrières & Transmission | LUCENTE — Milano"
        description="Rejoindre la brigade 2 étoiles de Vincenzo Moretti et l'équipe de LUCENTE à Milan. Postes en cuisine, sommellerie et service en salle."
        path="/careers"
        schema={careersSchema}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-20">
        
        {/* Header */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <p className="typo-eyebrow">Transmission & Rigueur</p>
          <h1 className="typo-h1 text-4xl sm:text-6xl text-ivoire">
            Rejoindre la Maison
          </h1>
          <div className="w-16 h-[1px] bg-or mx-auto mt-2" />
          <p className="typo-body text-base sm:text-lg italic font-serif text-ivoire/90 pt-1">
            « Nous ne cherchons pas des exécutants, mais des artisans passionnés par le geste juste et la mémoire vivante de la gastronomie. »
          </p>
        </section>

        {/* Positions List */}
        <section className="space-y-6">
          <h2 className="font-serif-luxury text-2xl sm:text-3xl text-ivoire">Postes Ouverts</h2>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {openPositions.map((pos, idx) => (
              <div key={idx} className="py-8 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <h3 className="font-serif text-2xl text-ivoire">{pos.title}</h3>
                  <span className="text-xs font-mono text-or tracking-wider">{pos.department}</span>
                </div>
                <p className="text-xs text-ivoire/80 font-mono">Exigence : {pos.experience}</p>
                <p className="text-sm text-muted leading-relaxed font-sans">{pos.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="bg-surface border border-white/10 p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="space-y-2">
            <span className="typo-eyebrow text-or">Candidature Spontanée & Réponses</span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-ivoire">Transmettre votre Dossier</h3>
            <p className="text-xs text-muted">
              Adressez-nous votre parcours. Chaque candidature est examinée directement par le Chef Vincenzo Moretti et la direction de salle.
            </p>
          </div>

          {isSent ? (
            <div className="py-12 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 size={40} className="text-or mx-auto" />
              <h4 className="font-serif text-2xl text-ivoire">Candidature bien reçue</h4>
              <p className="text-xs text-muted max-w-sm mx-auto">
                Notre secrétariat de direction vous recontactera personnellement si votre profil correspond à nos recherches.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="px-6 py-2.5 bg-surface-elevated text-or text-xs uppercase tracking-widest border border-white/10 hover:border-or transition-all mt-4"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Nom & Prénom *</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 input-luxury"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 input-luxury"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Téléphone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 00 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 input-luxury"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Département Visé</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 input-luxury bg-surface-elevated text-ivoire"
                  >
                    <option value="Cuisine — Chef de Partie">Cuisine — Chef de Partie</option>
                    <option value="Cuisine — Commis / Pâtisserie">Cuisine — Commis / Pâtisserie</option>
                    <option value="Salle — Sommellerie">Salle — Sommellerie</option>
                    <option value="Salle — Chef de Rang">Salle — Chef de Rang</option>
                    <option value="Conciergerie & Accueil">Conciergerie & Accueil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Parcours & Lettre d'Intention *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Présentez vos expériences significatives, vos maîtres d'apprentissage et ce qui vous attire chez LUCENTE..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 input-luxury"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 btn-luxury-primary flex items-center justify-center gap-2 shadow-xl"
              >
                <span>TRANSMETTRE MA CANDIDATURE</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
