import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, Sparkles, Send, CheckCircle2, Users, Wine, Clock, 
  Compass, Phone, Mail, ArrowRight, Building2, ChefHat, Lock
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { restaurantInfo } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';

export default function PrivateDiningPage({ onOpenBooking }) {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Salon Privé',
    date: '',
    guests: '8 à 12 convives',
    budget: 'Sur devis personnalisé',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const spacesList = [
    {
      id: 'la-sala-chiaroscuro',
      name: 'La Sala Chiaroscuro',
      icon: Building2,
      subtitle: lang === 'it' ? 'Privatizzazione integrale del santuario' : lang === 'en' ? 'Full buyout of the restaurant' : 'Privatisation intégrale du sanctuaire',
      capacity: lang === 'it' ? 'Fino a 28 coperti seduti' : lang === 'en' ? 'Up to 28 seated covers' : "Jusqu'à 28 couverts assis",
      shortCapacity: '28 couverts',
      description: lang === 'it'
        ? "L'intero ristorante dedicato al vostro evento. Pietra lavica dell'Etna, lino scuro e acustica studiata per preservare l'intimità assoluta."
        : lang === 'en'
        ? "The entire restaurant dedicated to your event. Etna lava stone, dark linen and acoustic design crafted to preserve absolute intimacy."
        : "L'intégralité du restaurant dédié à votre événement. Pierre de lave d'Etna, lin sombre et acoustique feutrée étudiée par nos acousticiens pour préserver l'intimité absolue de chaque échange.",
      features: lang === 'it'
        ? ['28 coperti esclusivi', 'Servizio dedicato della brigata completa', 'Menu su misura in 9 o 11 atti', 'Abbinamenti di grandi cru di Gianluca Ferri']
        : lang === 'en'
        ? ['28 exclusive covers', 'Dedicated service by full brigade', 'Bespoke menu in 9 or 11 acts', 'Grand cru pairings by Gianluca Ferri']
        : ['28 couverts exclusifs', 'Service dédié par la brigade complète', 'Menu sur mesure en 9 ou 11 actes', 'Accords de grands crus par Gianluca Ferri'],
      image: '/images/dining-room.webp'
    },
    {
      id: 'il-tavolo-dello-chef',
      name: 'Il Tavolo dello Chef',
      icon: ChefHat,
      subtitle: lang === 'it' ? 'Immersione di fronte al pass' : lang === 'en' ? 'Immersion facing the kitchen pass' : 'Immersion face au passe',
      capacity: lang === 'it' ? '4 a 6 ospiti' : lang === 'en' ? '4 to 6 guests' : '4 à 6 convives',
      shortCapacity: '4-6 convives',
      description: lang === 'it'
        ? "Un blocco monolitico di marmo di Carrara grezzo a contatto diretto con la brigata di Vincenzo Moretti. I piatti sono presentati e impiattati al vostro tavolo dallo Chef."
        : lang === 'en'
        ? "A monolithic block of raw Carrara marble in direct contact with Vincenzo Moretti's brigade. Dishes are introduced and plated tableside by the Chef."
        : "Un bloc monolithique de marbre de Carrare brut taillé d'un seul tenant, situé en prise directe avec la brigade de Vincenzo Moretti. Les plats sont commentés et dressés à votre table par le Chef en personne.",
      features: lang === 'it'
        ? ['Vista diretta sul pass', 'Degustazione interattiva unica', 'Bottiglie d\'eccezione dalla riserva', 'Scambio privilegiato con Vincenzo Moretti']
        : lang === 'en'
        ? ['Direct view of the pass', 'Unique interactive tasting', 'Exceptional cellar bottles', 'Privileged exchange with Vincenzo Moretti']
        : ['Vue directe sur le passe', 'Dégustation interactive inédite', 'Flacons d\'exception sortis de la réserve', 'Échange privilégié avec Vincenzo Moretti'],
      image: '/images/chef-craft.webp'
    },
    {
      id: 'la-cantina-segreta',
      name: 'La Cantina Segreta',
      icon: Wine,
      subtitle: lang === 'it' ? 'La cripta delle 1.400 bottiglie' : lang === 'en' ? 'The 1,400-bottle vault' : 'La crypte aux 1 400 flacons',
      capacity: lang === 'it' ? 'Fino a 10 ospiti' : lang === 'en' ? 'Up to 10 guests' : "Jusqu'à 10 convives",
      shortCapacity: '10 convives',
      description: lang === 'it'
        ? "Sotto le volte storiche di Via Monte Napoleone, circondati da annate rare e pezzi da collezione. L'atmosfera ideale per cene riservate."
        : lang === 'en'
        ? "Beneath the historic vaults of Via Monte Napoleone, surrounded by rare vintages. The ideal setting for confidential dinners."
        : "Sous les voûtes séculaires de la Via Monte Napoleone, entouré de millésimes rares et de pièces de collection introuvables. L'atmosphère idéale pour les dîners confidentiels.",
      features: lang === 'it'
        ? ['Tavolo centrale in noce massiccio', 'Degustazione guidata dal Sommelier', 'Ingresso privato discreto', 'Salotto di degustazione riservato']
        : lang === 'en'
        ? ['Solid walnut central table', 'Guided tasting by Head Sommelier', 'Discreet private entrance', 'Reserved tasting lounge']
        : ['Table centrale en noyer massif', 'Dégustation commentée par le Chef Sommelier', 'Entrée privée discrète', 'Salon de dégustation réservé'],
      image: '/images/cellar-architecture.webp'
    }
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-36 pb-20 sm:pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title={lang === 'it' ? 'Sale Private & Spazi Esclusivi | LUCENTE — Milano' : lang === 'en' ? 'Private Rooms & Chef Table | LUCENTE — Milano' : 'Privatisations & Salons Confidentiels | LUCENTE — Milano'}
        description={lang === 'it' ? 'La Cantina Segreta, il Tavolo dello Chef e privatizzazione completa di LUCENTE a Milano.' : lang === 'en' ? 'Private rooms, Chef table and full buyout at LUCENTE in Milan.' : 'La Cantina Segreta, la Table du Chef et privatisation intégrale de LUCENTE à Milan.'}
        image="/images/dining-room.webp"
        path="/private-dining"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-16 sm:space-y-24">
        
        {/* =========================================================================
            1. HEADER HERO
           ========================================================================= */}
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Lock size={12} className="text-or" />
            <p className="typo-eyebrow text-xs tracking-[0.25em]">{t('privateDining.eyebrow')}</p>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-ivoire tracking-tight leading-[1.1]">
            {t('privateDining.heroTitle1')}{' '}
            <span className="italic text-or font-light">{t('privateDining.heroTitle2')}</span>
          </h1>

          <div className="w-12 sm:w-16 h-[1px] bg-or mx-auto mt-2" />

          <p className="text-sm sm:text-base md:text-lg italic font-serif text-ivoire/85 pt-1 max-w-2xl mx-auto px-2">
            {t('privateDining.heroSubtitle')}
          </p>

          {/* Quick Space Anchor Navigation (Mobile & Desktop) */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {spacesList.map((space) => {
              const Icon = space.icon;
              return (
                <button
                  key={space.id}
                  onClick={() => scrollToSection(space.id)}
                  className="flex items-center gap-2 px-3.5 py-2 bg-surface border border-white/10 hover:border-or/40 text-muted hover:text-ivoire text-xs uppercase font-mono tracking-wider transition-all duration-300 shadow-sm"
                >
                  <Icon size={13} className="text-or shrink-0" />
                  <span className="truncate">{space.name}</span>
                  <span className="text-[10px] text-or/80 bg-nero px-1.5 py-0.5 border border-white/5 hidden sm:inline">
                    {space.shortCapacity}
                  </span>
                </button>
              );
            })}
          </div>
        </section>


        {/* =========================================================================
            2. SPACES SHOWCASE CARDS
           ========================================================================= */}
        <section className="space-y-10 sm:space-y-16">
          {spacesList.map((space, index) => {
            const Icon = space.icon;
            return (
              <div 
                key={space.id}
                id={space.id}
                className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center bg-surface border border-white/10 p-4 sm:p-8 lg:p-12 shadow-2xl"
              >
                {/* Visual Image */}
                <div className={`lg:col-span-6 relative overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <img
                    src={space.image}
                    alt={space.name}
                    loading="lazy"
                    className="w-full h-[220px] sm:h-[340px] md:h-[420px] object-cover filter brightness-90 hover:scale-[1.02] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nero/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-nero/90 border border-or/40 text-or text-[10px] sm:text-xs uppercase font-mono tracking-widest flex items-center gap-1.5 backdrop-blur-sm">
                      <Icon size={12} />
                      {space.capacity}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-6 space-y-4 sm:space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="space-y-1.5">
                    <span className="text-[11px] sm:text-xs uppercase font-mono text-or tracking-widest block">
                      {space.subtitle}
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivoire font-normal">
                      {space.name}
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
                    {space.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] sm:text-[11px] uppercase font-mono text-or tracking-widest block">
                      {lang === 'it' ? 'Prestationi & Servizi Inclusi' : lang === 'en' ? 'Included Services' : 'Prestations Incluses'}
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {space.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-xs sm:text-[13px] text-ivoire/90 font-serif">
                          <span className="text-or text-xs shrink-0">✦</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsive Action CTAs */}
                  <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => onOpenBooking ? onOpenBooking(space.name) : scrollToSection('contact-privatisation')}
                      className="w-full sm:w-auto px-6 py-3.5 bg-or text-nero font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all text-center shadow-lg"
                    >
                      {lang === 'it' ? 'Prenota questo Spazio' : lang === 'en' ? 'Book this Room' : 'Réserver cet Espace'}
                    </button>
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, eventType: space.name }));
                        scrollToSection('contact-privatisation');
                      }}
                      className="w-full sm:w-auto text-xs text-or hover:text-ivoire border border-or/30 sm:border-0 hover:bg-or/10 sm:hover:bg-transparent py-2.5 sm:py-2 transition-colors uppercase tracking-wider font-mono inline-flex items-center justify-center gap-1.5"
                    >
                      {lang === 'it' ? 'Richiesta di preventivo' : lang === 'en' ? 'Request a quote' : 'Demande de devis'}{' '}
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>


        {/* =========================================================================
            3. DEDICATED CONCIERGE DIRECT CONTACT INFO
           ========================================================================= */}
        <section className="bg-surface-elevated border border-white/10 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center shadow-xl">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-widest text-or block">
              {lang === 'it' ? 'Conciergerie Dedicata' : lang === 'en' ? 'Dedicated Concierge' : 'Conciergerie Privée'}
            </span>
            <h3 className="font-serif text-lg text-ivoire">
              {lang === 'it' ? 'Linea Diretta Eventi' : lang === 'en' ? 'Events Direct Line' : 'Ligne Directe Événements'}
            </h3>
            <p className="text-xs text-muted">
              {lang === 'it' ? 'Risposta personale entro 4 ore.' : lang === 'en' ? 'Personal response within 4 hours.' : 'Réponse personnalisée sous 4 heures.'}
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 text-xs">
            <Phone size={16} className="text-or shrink-0" />
            <div>
              <span className="block text-muted text-[10px] uppercase font-mono">Maître d’Hôtel Événements</span>
              <a href="tel:+390289054421" className="text-ivoire hover:text-or transition-colors font-mono font-semibold">
                +39 02 8905 4421
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3 text-xs">
            <Mail size={16} className="text-or shrink-0" />
            <div>
              <span className="block text-muted text-[10px] uppercase font-mono">Email Officiel</span>
              <a href="mailto:privatisations@lucente-milano.com" className="text-ivoire hover:text-or transition-colors font-mono font-semibold truncate">
                privatisation@lucente.it
              </a>
            </div>
          </div>
        </section>


        {/* =========================================================================
            4. PRIVATISATION INQUIRY FORM
           ========================================================================= */}
        <section id="contact-privatisation" className="scroll-mt-28 max-w-4xl mx-auto bg-surface border border-white/10 p-5 sm:p-8 lg:p-12 shadow-2xl space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 sm:space-y-3">
            <span className="typo-eyebrow text-or text-xs">
              {lang === 'it' ? 'Concierge Privato' : lang === 'en' ? 'Private Concierge' : 'Conciergerie Privée'}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ivoire font-normal">
              {lang === 'it' ? 'Richiesta di Privatizzazione su Misura' : lang === 'en' ? 'Bespoke Private Event Inquiry' : 'Demande de Privatisation Sur Mesure'}
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-xl mx-auto px-2">
              {lang === 'it'
                ? 'La nostra direzione eventi e il Sommelier concepiscono una partitura su misura per voi.'
                : lang === 'en'
                ? 'Our events team and Head Sommelier craft a personalized experience according to your wishes.'
                : 'Notre direction événementielle et le Chef Sommelier élaborent une partition personnalisée selon vos desiderata.'}
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-12 sm:py-16 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 size={44} className="text-or mx-auto" />
              <h3 className="font-serif text-2xl text-ivoire">
                {lang === 'it' ? 'Richiesta inviata con successo' : lang === 'en' ? 'Inquiry submitted successfully' : 'Demande transmise avec succès'}
              </h3>
              <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed px-4">
                {lang === 'it'
                  ? 'Il nostro Maître dedicato vi contatterà personalmente entro 24 ore.'
                  : lang === 'en'
                  ? 'Our dedicated Maître d’ will contact you personally within 24 hours.'
                  : "Notre Maître d'Hôtel dédié vous contactera personnellement sous 24 heures pour concevoir les détails de votre réception."}
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', eventType: 'Salon Privé', date: '', guests: '8 à 12 convives', budget: 'Sur devis', message: '' });
                }}
                className="px-6 py-3 bg-surface-elevated text-or text-xs uppercase tracking-widest border border-white/10 hover:border-or transition-all mt-4"
              >
                {lang === 'it' ? "Invia un'altra richiesta" : lang === 'en' ? 'Send another inquiry' : 'Transmettre une autre demande'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-4 sm:space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1.5">
                    {lang === 'it' ? 'Nome e Cognome *' : lang === 'en' ? 'Full Name *' : 'Nom & Prénom *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'it' ? 'Il vostro nome' : lang === 'en' ? 'Your full name' : 'Votre nom complet'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-3 sm:py-2.5 text-sm input-luxury bg-surface-elevated text-ivoire focus:bg-surface"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder={lang === 'fr' ? 'votre@email.com' : 'you@email.com'}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-3 sm:py-2.5 text-sm input-luxury bg-surface-elevated text-ivoire focus:bg-surface"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1.5">
                    {lang === 'it' ? 'Telefono *' : lang === 'en' ? 'Phone *' : 'Téléphone *'}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+33 6 00 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-3 sm:py-2.5 text-sm input-luxury bg-surface-elevated text-ivoire focus:bg-surface"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1.5">
                    {lang === 'it' ? "Formato dell'Evento" : lang === 'en' ? 'Event Format' : "Format de l'Événement"}
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3.5 py-3 sm:py-2.5 text-sm input-luxury bg-surface-elevated text-ivoire focus:bg-surface"
                  >
                    <option value="La Sala Chiaroscuro">{lang === 'it' ? 'La Sala Chiaroscuro (Privatizzazione Totale)' : lang === 'en' ? 'La Sala Chiaroscuro (Full Buyout)' : 'La Sala Chiaroscuro (Privatisation Intégrale)'}</option>
                    <option value="Il Tavolo dello Chef">{lang === 'it' ? 'Il Tavolo dello Chef (4 a 6 ospiti)' : lang === 'en' ? 'Il Tavolo dello Chef (4 to 6 guests)' : 'Il Tavolo dello Chef (4 à 6 convives)'}</option>
                    <option value="La Cantina Segreta">{lang === 'it' ? 'La Cantina Segreta (Fino a 10 ospiti)' : lang === 'en' ? 'La Cantina Segreta (Up to 10 guests)' : 'La Cantina Segreta (Jusqu’à 10 convives)'}</option>
                    <option value="Dîner d'Affaires">{lang === 'it' ? 'Cena di Lavoro Riservata' : lang === 'en' ? 'Confidential Business Dinner' : "Dîner d'Affaires Confidentiel"}</option>
                    <option value="Célébration">{lang === 'it' ? 'Celebrazione & Anniversario' : lang === 'en' ? 'Celebration & Anniversary' : 'Célébration Privée & Anniversaire'}</option>
                    <option value="Masterclass Vins">{lang === 'it' ? 'Masterclass Vini Rari' : lang === 'en' ? 'Rare Wine Masterclass' : 'Masterclass Vins & Dégustation'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1.5">
                    {lang === 'it' ? 'Data Desiderata' : lang === 'en' ? 'Desired Date' : 'Date Souhaitée'}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-3 sm:py-2.5 text-sm input-luxury bg-surface-elevated text-ivoire focus:bg-surface"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1.5">
                    {lang === 'it' ? 'Numero di Ospiti' : lang === 'en' ? 'Number of Guests' : 'Nombre de Convives'}
                  </label>
                  <input
                    type="text"
                    placeholder={lang === 'it' ? 'es. 8 persone' : lang === 'en' ? 'e.g. 8 guests' : 'Ex: 8 à 12 convives'}
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3.5 py-3 sm:py-2.5 text-sm input-luxury bg-surface-elevated text-ivoire focus:bg-surface"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1.5">
                  {lang === 'it' ? 'Messaggio & Desideri Particolari' : lang === 'en' ? 'Message & Special Requests' : 'Message & Souhaits Particuliers'}
                </label>
                <textarea
                  rows={4}
                  placeholder={lang === 'it' ? 'Dettagli sul vostro evento, allergie o preferenze enologiche...' : lang === 'en' ? 'Details about your event, wine preferences or special notes...' : 'Précisez la nature de votre réception, souhaits oenologiques ou régimes spécifiques...'}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-3 text-sm input-luxury bg-surface-elevated text-ivoire focus:bg-surface resize-none"
                />
              </div>

              {/* NDA Guarantee Box */}
              <div className="p-3.5 sm:p-4 bg-nero rounded-none border border-white/10 flex items-start sm:items-center gap-3 text-xs text-muted leading-relaxed">
                <Shield className="w-5 h-5 text-or shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  {lang === 'it'
                    ? 'Discrezione e massima riservatezza garantite con accordo di non divulgazione (NDA) su richiesta.'
                    : lang === 'en'
                    ? 'Absolute discretion and confidentiality guaranteed under NDA upon request.'
                    : 'Discrétion et secret absolu garantis sous accord de confidentialité (NDA) sur simple demande.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 btn-luxury-primary flex items-center justify-center gap-2 shadow-2xl text-xs sm:text-sm font-semibold tracking-widest"
              >
                <span>
                  {lang === 'it' ? 'INVIA LA RICHIESTA' : lang === 'en' ? 'SUBMIT INQUIRY' : 'TRANSMETTRE LA DEMANDE'}
                </span>
                <Send size={14} />
              </button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
