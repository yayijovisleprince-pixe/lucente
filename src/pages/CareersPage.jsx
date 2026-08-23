import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2, Award, Sparkles, Send, ArrowLeft, Briefcase } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { restaurantInfo } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';

export default function CareersPage() {
  const { lang, t } = useLanguage();
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
      title: lang === 'it' ? "Chef de Partie — Salse & Cotture" : lang === 'en' ? "Chef de Partie — Sauces & Braising" : "Chef de Partie — Sauces & Braises",
      department: lang === 'it' ? "Cucina · Brigata Moretti" : lang === 'en' ? "Kitchen · Moretti Brigade" : "Cuisine · Brigade Moretti",
      experience: lang === 'it' ? "3 anni minimo in ristoranti stellati Michelin" : lang === 'en' ? "3 years minimum in Michelin-starred houses" : "3 ans minimum en maison étoilée Michelin",
      description: lang === 'it'
        ? "Padronanza delle riduzioni lente, cottura con tralci di vite e tagli precisi di selvaggina e carne Chianina."
        : lang === 'en'
        ? "Mastery of slow reductions, vine shoot ember cooking and precise butchery of game and Chianina beef."
        : "Maîtrise des réductions lentes, du travail au feu de sarments de vigne et des découpes précises de gibiers et viandes de race Chianina."
    },
    {
      title: lang === 'it' ? "Sommelier — Cantina & Vini Vulcanici" : lang === 'en' ? "Sommelier — Cellar & Volcanic Terroirs" : "Sommelier — Cave & Vins Volcaniques",
      department: lang === 'it' ? "Sala & Sommellerie · Direzione Gianluca Ferri" : lang === 'en' ? "Floor & Wine Service · Lead Gianluca Ferri" : "Salle & Sommellerie · Direction Gianluca Ferri",
      experience: lang === 'it' ? "Certificazione professionale, bilingue italiano/inglese" : lang === 'en' ? "Certified sommelier, bilingual Italian/English" : "Formation certifiée, bilingue italien/anglais (français apprécié)",
      description: lang === 'it'
        ? "Conoscenza approfondita dei terroir italiani, vinificazioni in anfora e passione per il servizio."
        : lang === 'en'
        ? "In-depth knowledge of Italian terroirs, amphora winemaking and passion for tableside wine service."
        : "Connaissance approfondie des terroirs transalpins, des vinifications en amphores et passion du partage émotionnel au guéridon."
    },
    {
      title: lang === 'it' ? "Chef de Rang — Accoglienza & Eleganza" : lang === 'en' ? "Chef de Rang — Contemporary Service" : "Chef de Rang — Sprezzatura & Accueil",
      department: lang === 'it' ? "Sala · Direzione di Sala" : lang === 'en' ? "Floor · Dining Room Lead" : "Salle · Direction Matteo Castiglione",
      experience: lang === 'it' ? "Eccellenza nel servizio contemporaneo discreto" : lang === 'en' ? "Excellence in discreet luxury service" : "Excellence du service contemporain feutré",
      description: lang === 'it'
        ? "Rigore nel gesto, ascolto attivo ed eleganza naturale senza teatralità."
        : lang === 'en'
        ? "Precision in gesture, active listening and natural elegance without artificial theatricality."
        : "Rigueur chirurgicale dans le geste, sens aigu de l'écoute et élégance naturelle sans théâtralité artificielle."
    }
  ];

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-32 sm:pb-36 lg:pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero overflow-x-hidden">
      <SEOHead
        title={lang === 'it' ? 'Carriere & Trasmissione | LUCENTE — Milano' : lang === 'en' ? 'Careers & Craft | LUCENTE — Milano' : 'Carrières & Transmission | LUCENTE — Milano'}
        description={lang === 'it' ? 'Unisciti alla brigata di Vincenzo Moretti a Milano.' : lang === 'en' ? 'Join Vincenzo Moretti brigade in Milan.' : 'Rejoindre la brigade 2 étoiles de Vincenzo Moretti et l\'équipe de LUCENTE à Milan.'}
        path="/careers"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 sm:space-y-20">
        
        {/* Header */}
        <section className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <p className="typo-eyebrow text-or flex items-center justify-center gap-2 text-xs sm:text-sm">
            <Briefcase size={14} className="shrink-0" />
            <span>{t('careers.eyebrow')}</span>
          </p>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivoire font-light leading-tight break-words">
            {t('careers.heroTitle1')} {t('careers.heroTitle2')}
          </h1>
          <div className="w-16 h-[1px] bg-or mx-auto mt-2" />
          <p className="typo-body text-sm sm:text-base md:text-lg italic font-serif text-ivoire/90 pt-1 max-w-2xl mx-auto leading-relaxed">
            {t('careers.heroSubtitle')}
          </p>
        </section>

        {/* Positions List */}
        <section className="space-y-6 sm:space-y-8">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h2 className="font-serif text-xl sm:text-3xl text-ivoire">{t('careers.positionsTitle')}</h2>
            <span className="text-[11px] sm:text-xs font-mono text-muted uppercase tracking-wider">
              {openPositions.length} {lang === 'it' ? 'Posizioni' : lang === 'en' ? 'Openings' : 'Postes'}
            </span>
          </div>
          
          <div className="divide-y divide-white/10 border-y border-white/10">
            {openPositions.map((pos, idx) => (
              <div key={idx} className="py-6 sm:py-8 space-y-2.5 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
                  <h3 className="font-serif text-lg sm:text-2xl text-ivoire leading-snug break-words">{pos.title}</h3>
                  <span className="text-[11px] sm:text-xs font-mono text-or tracking-wider shrink-0">{pos.department}</span>
                </div>
                <p className="text-xs sm:text-sm text-ivoire/80 font-mono break-words">
                  <span className="text-or/80">{lang === 'it' ? 'Requisito : ' : lang === 'en' ? 'Requirement : ' : 'Exigence : '}</span>
                  {pos.experience}
                </p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans break-words">{pos.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="bg-surface/80 border border-white/10 p-4 sm:p-8 md:p-12 shadow-2xl space-y-6 sm:space-y-8 rounded-none">
          <div className="space-y-2">
            <span className="typo-eyebrow text-or text-xs sm:text-sm">{t('careers.spontaneousTitle')}</span>
            <h3 className="font-serif text-xl sm:text-3xl text-ivoire leading-snug break-words">
              {lang === 'it' ? 'Invia la Tua Candidatura' : lang === 'en' ? 'Submit Your Application' : 'Transmettre votre Dossier'}
            </h3>
            <p className="text-xs sm:text-sm text-muted leading-relaxed">
              {t('careers.spontaneousText')}
            </p>
          </div>

          {isSent ? (
            <div className="py-8 sm:py-12 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 size={40} className="text-or mx-auto" />
              <h4 className="font-serif text-xl sm:text-2xl text-ivoire">
                {lang === 'it' ? 'Candidatura ricevuta' : lang === 'en' ? 'Application received' : 'Candidature bien reçue'}
              </h4>
              <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed">
                {lang === 'it'
                  ? 'La nostra segreteria vi ricontatterà personalmente se il vostro profilo corrisponde alle nostre ricerche.'
                  : lang === 'en'
                  ? 'Our management will contact you directly if your profile aligns with our openings.'
                  : 'Notre secrétariat de direction vous recontactera personnellement si votre profil correspond à nos recherches.'}
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="px-6 py-2.5 bg-surface-elevated text-or text-xs uppercase tracking-widest border border-white/10 hover:border-or transition-all mt-4 rounded-none"
              >
                {lang === 'it' ? 'Invia un altro messaggio' : lang === 'en' ? 'Send another message' : 'Envoyer un autre message'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
                    {lang === 'it' ? 'Nome e Cognome *' : lang === 'en' ? 'Full Name *' : 'Nom & Prénom *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'it' ? 'Il tuo nome' : lang === 'en' ? 'Your full name' : 'Votre nom complet'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm input-luxury rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder={lang === 'fr' ? 'votre@email.com' : 'you@email.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm input-luxury rounded-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
                    {lang === 'it' ? 'Telefono *' : lang === 'en' ? 'Phone *' : 'Téléphone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+39 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm input-luxury rounded-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
                    {lang === 'it' ? 'Ruolo Desiderato' : lang === 'en' ? 'Target Role' : 'Département Visé'}
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm input-luxury bg-surface-elevated text-ivoire rounded-none"
                  >
                    <option value="Cuisine — Chef de Partie">{lang === 'it' ? 'Cucina — Chef de Partie' : lang === 'en' ? 'Kitchen — Chef de Partie' : 'Cuisine — Chef de Partie'}</option>
                    <option value="Cuisine — Commis / Pâtisserie">{lang === 'it' ? 'Cucina — Commis / Pasticceria' : lang === 'en' ? 'Kitchen — Commis / Pastry' : 'Cuisine — Commis / Pâtisserie'}</option>
                    <option value="Salle — Sommellerie">{lang === 'it' ? 'Sala — Sommellerie' : lang === 'en' ? 'Floor — Sommellerie' : 'Salle — Sommellerie'}</option>
                    <option value="Salle — Chef de Rang">{lang === 'it' ? 'Sala — Chef de Rang' : lang === 'en' ? 'Floor — Chef de Rang' : 'Salle — Chef de Rang'}</option>
                    <option value="Conciergerie & Accueil">{lang === 'it' ? 'Concierge & Accoglienza' : lang === 'en' ? 'Concierge & Reception' : 'Conciergerie & Accueil'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
                  {lang === 'it' ? 'Percorso & Lettera di Presentazione *' : lang === 'en' ? 'Experience & Motivation *' : "Parcours & Lettre d'Intention *"}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={lang === 'it' ? 'Descrivi il tuo percorso, le tue esperienze e la tua motivazione per LUCENTE...' : lang === 'en' ? 'Describe your key background, mentors, and motivation for joining LUCENTE...' : "Présentez vos expériences significatives, vos maîtres d'apprentissage et ce qui vous attire chez LUCENTE..."}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm input-luxury rounded-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 px-4 btn-luxury-primary flex items-center justify-center gap-2 shadow-xl text-xs sm:text-sm uppercase tracking-wider"
              >
                <span>{lang === 'it' ? 'INVIA LA MIA CANDIDATURA' : lang === 'en' ? 'SUBMIT MY APPLICATION' : 'TRANSMETTRE MA CANDIDATURE'}</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </section>

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

