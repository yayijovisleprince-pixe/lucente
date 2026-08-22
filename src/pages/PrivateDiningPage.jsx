import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Send, CheckCircle2, Users, Wine, Clock, Compass, Phone, Mail, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { restaurantInfo } from '../data/restaurantData';

export default function PrivateDiningPage({ onOpenBooking }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Salon Privé',
    date: '',
    guests: '8 à 12 convives (La Cantina Segreta)',
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
      subtitle: 'Privatisation intégrale du sanctuaire',
      capacity: 'Jusqu\'à 28 couverts assis',
      description: 'L\'intégralité du restaurant dédié à votre événement. Pierre de lave d\'Etna, lin sombre et acoustique feutrée étudiée par nos acousticiens pour préserver l\'intimité absolue de chaque échange.',
      features: ['28 couverts exclusifs', 'Service dédié par la brigade complète', 'Menu sur mesure en 9 ou 11 actes', 'Accords de grands crus par Gianluca Ferri'],
      image: '/images/dining-room.webp'
    },
    {
      id: 'il-tavolo-dello-chef',
      name: 'Il Tavolo dello Chef',
      subtitle: 'Immersion face au passe',
      capacity: '4 à 6 convives',
      description: 'Un bloc monolithique de marbre de Carrare brut taillé d\'un seul tenant, situé en prise directe avec la brigade de Vincenzo Moretti. Les plats sont commentés et dressés à votre table par le Chef en personne.',
      features: ['Vue directe sur le passe', 'Dégustation interactive inédite', 'Flacons d\'exception sortis de la réserve', 'Échange privilégié avec Vincenzo Moretti'],
      image: '/images/chef-craft.webp'
    },
    {
      id: 'la-cantina-segreta',
      name: 'La Cantina Segreta',
      subtitle: 'La crypte aux 1 400 flacons',
      capacity: 'Jusqu\'à 10 convives',
      description: 'Sous les voûtes séculaires de la Via Monte Napoleone, entouré de millésimes rares et de pièces de collection introuvables. L\'atmosphère idéale pour les dîners confidentiels et célébrations privées.',
      features: ['Table centrale en noyer massif', 'Dégustation commentée par le Chef Sommelier', 'Entrée privée discrète', 'Salon de dégustation réservé'],
      image: '/images/cellar-architecture.webp'
    }
  ];

  const privateDiningSchema = {
    '@type': 'Service',
    '@id': 'https://lucente-milano.com/private-dining#service',
    'name': 'Privatisations & Salons Privés | LUCENTE Milano',
    'description': 'Salons privés, Table du Chef et privatisation totale pour dîners confidentiels, masterclasses œnologiques et réceptions d\'exception à Milan.',
    'url': 'https://lucente-milano.com/private-dining',
    'provider': {
      '@type': 'Restaurant',
      'name': 'LUCENTE',
      'telephone': '+39 02 8945 7700',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Via Monte Napoleone, 14',
        'addressLocality': 'Milano',
        'postalCode': '20121',
        'addressCountry': 'IT'
      }
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title="Privatisations & Salons Confidentiels | LUCENTE — Milano"
        description="La Cantina Segreta, la Table du Chef et privatisation intégrale de LUCENTE à Milan. Événements privés, dîners confidentiels et sommellerie rare."
        image="/images/dining-room.webp"
        path="/private-dining"
        schema={privateDiningSchema}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* Header */}
        <section className="max-w-4xl mx-auto text-center space-y-4">
          <p className="typo-eyebrow">Via Monte Napoleone 14 · Salons & Privatisations</p>
          <h1 className="typo-h1 text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight">
            Espaces Confidentiels
          </h1>
          <div className="w-16 h-[1px] bg-or mx-auto mt-2" />
          <p className="typo-body text-base sm:text-lg italic font-serif text-ivoire/90 pt-2 max-w-2xl mx-auto">
            « Pour les moments qui exigent le secret, la concentration ou la célébration la plus pure. »
          </p>
        </section>

        {/* Spaces Showcase */}
        <section className="space-y-16">
          {spacesList.map((space, index) => (
            <div 
              key={space.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-surface border border-white/10 p-8 sm:p-12 shadow-2xl ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 relative overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={space.image}
                  alt={space.name}
                  loading="lazy"
                  className="w-full h-[360px] sm:h-[440px] object-cover filter brightness-90 hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nero/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-nero/90 border border-or/40 text-or text-[10px] uppercase font-mono tracking-widest">
                  {space.capacity}
                </span>
              </div>

              <div className={`lg:col-span-6 space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="space-y-2">
                  <span className="text-xs uppercase font-mono text-or tracking-widest">{space.subtitle}</span>
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire">{space.name}</h2>
                </div>

                <p className="text-sm text-muted leading-relaxed font-sans">
                  {space.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] uppercase font-mono text-or tracking-widest">Prestations Incluses</span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {space.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-ivoire/90 font-serif">
                        <span className="text-or">✦</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => onOpenBooking(space.name)}
                    className="px-6 py-3 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all"
                  >
                    Réserver cet Espace
                  </button>
                  <a
                    href="#contact-privatisation"
                    className="text-xs text-or hover:text-ivoire transition-colors uppercase tracking-wider font-mono inline-flex items-center gap-1"
                  >
                    Demande de devis <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Privatisation Inquiry Form */}
        <section id="contact-privatisation" className="max-w-4xl mx-auto bg-surface border border-white/10 p-8 sm:p-14 shadow-2xl space-y-8">
          <div className="text-center space-y-3">
            <span className="typo-eyebrow text-or">Conciergerie Privée</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire">Demande de Privatisation Sur Mesure</h2>
            <p className="text-xs text-muted max-w-xl mx-auto">
              Notre direction événementielle et le Chef Sommelier élaborent une partition personnalisée selon vos desiderata.
            </p>
          </div>

          {isSubmitted ? (
            <div className="py-16 text-center space-y-4 animate-fadeIn">
              <CheckCircle2 size={48} className="text-or mx-auto" />
              <h3 className="font-serif text-2xl text-ivoire">Demande transmise avec succès</h3>
              <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
                Notre Maître d'Hôtel dédié vous contactera personnellement sous 24 heures pour concevoir les détails de votre réception.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', eventType: 'Salon Privé', date: '', guests: '8 à 12 convives', budget: 'Sur devis', message: '' });
                }}
                className="px-6 py-2.5 bg-surface-elevated text-or text-xs uppercase tracking-widest border border-white/10 hover:border-or transition-all mt-4"
              >
                Transmettre une autre demande
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="space-y-6">
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
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Format de l'Événement</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full px-3.5 py-2.5 input-luxury bg-surface-elevated text-ivoire"
                  >
                    <option value="Salon Privé">Salon Privé (La Cantina Segreta)</option>
                    <option value="Table du Chef">Table du Chef (Expérience Brigade)</option>
                    <option value="Dîner d'Affaires">Dîner d'Affaires Confidentiel</option>
                    <option value="Célébration">Célébration Privée & Anniversaire</option>
                    <option value="Masterclass Vins">Masterclass Vins & Dégustation Réf.</option>
                    <option value="Privatisation Totale">Privatisation Intégrale de la Maison</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Date Souhaitée</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 input-luxury bg-surface-elevated text-ivoire"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Nombre de Convives</label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-3.5 py-2.5 input-luxury bg-surface-elevated text-ivoire"
                  >
                    <option value="4 à 6 convives (Table du Chef)">4 à 6 convives (Table du Chef)</option>
                    <option value="8 à 10 convives (La Cantina Segreta)">8 à 10 convives (La Cantina Segreta)</option>
                    <option value="12 à 20 convives">12 à 20 convives</option>
                    <option value="20 à 28 convives (La Sala Chiaroscuro)">20 à 28 convives (La Sala Chiaroscuro)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Précisions & Attentes Particulières</label>
                <textarea
                  rows={4}
                  placeholder="Scénographie souhaitée, sélection œnologique préférée, exigences diététiques, timing spécifique..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 input-luxury"
                />
              </div>

              <div className="p-4 bg-nero rounded border border-white/5 flex items-center gap-3 text-xs text-muted">
                <Shield className="w-5 h-5 text-or shrink-0" />
                <span>Discrétion et secret absolu garantis sous accord de confidentialité (NDA) sur simple demande.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 btn-luxury-primary flex items-center justify-center gap-2 shadow-2xl"
              >
                <span>TRANSMETTRE LA DEMANDE</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </section>

      </div>
    </div>
  );
}
