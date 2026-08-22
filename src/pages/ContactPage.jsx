import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import SEOHead from '../components/SEOHead';

export default function ContactPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Général',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Veuillez renseigner votre nom';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Adresse email valide requise';
    if (!formData.message.trim()) newErrors.message = 'Veuillez saisir votre message';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      if (onShowToast) {
        onShowToast({
          title: "Message reçu",
          message: "La conciergerie LUCENTE vous répondra sous 24 heures ouvrées.",
          type: "success"
        });
      }
    }, 700);
  };

  const contactSchema = {
    '@type': 'ContactPage',
    '@id': 'https://lucente-milano.com/contact#contact',
    'name': 'Contact & Accès | LUCENTE Milano',
    'description': 'Coordonnées, accès et formulaire de contact de LUCENTE à Milan. Via Monte Napoleone, 14.',
    'url': 'https://lucente-milano.com/contact',
    'mainEntity': {
      '@type': 'LocalBusiness',
      'name': 'LUCENTE',
      'telephone': '+39 02 8945 7700',
      'email': 'conciergerie@lucente-milano.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Via Monte Napoleone, 14',
        'addressLocality': 'Milano',
        'addressRegion': 'MI',
        'postalCode': '20121',
        'addressCountry': 'IT'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 45.468722,
        'longitude': 9.194711
      }
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-28 bg-nero min-h-screen selection:bg-or selection:text-nero">
      <SEOHead
        title="Contact & Accès | LUCENTE — Via Monte Napoleone, Milano"
        description="LUCENTE Milano · Via Monte Napoleone, 14 · +39 02 8945 7700 · Mardi–Samedi · Voiturier disponible. Contactez la conciergerie pour toute demande."
        image="/images/dining-room.jpg"
        path="/contact"
        schema={contactSchema}
      />
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mb-14 text-center space-y-4">
        <p className="typo-eyebrow">Quadrilatero della Moda · Milano</p>
        <h1 className="typo-h1 text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight">
          Nous écrire
        </h1>
        <div className="w-16 h-[1px] bg-or mx-auto mt-2" />
        <p className="typo-body text-base sm:text-lg italic font-serif text-ivoire/90 pt-1 max-w-xl mx-auto">
          « Pour une question, une demande de privatisation ou simplement pour savoir si la truffe est là — nous répondons sous 24 heures. »
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-surface border border-white/10 space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-or mt-1 shrink-0" size={18} />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-ivoire">Adresse</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Via Monte Napoleone, 14<br />
                    20121 Milano (MI), Italie<br />
                    <span className="text-or/80 text-[11px] font-mono">Service voiturier sur place</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-or mt-1 shrink-0" size={18} />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-ivoire">Téléphone</h3>
                  <p className="text-xs font-mono text-or tracking-wider">{restaurantInfo.phone}</p>
                  <p className="text-[11px] text-muted">Mardi au Samedi · 10h00–23h00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-or mt-1 shrink-0" size={18} />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-ivoire">Email</h3>
                  <p className="text-xs font-mono text-muted">{restaurantInfo.email}</p>
                  <p className="text-[11px] text-muted/70">Réponse sous 24 heures ouvrées</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="text-or mt-1 shrink-0" size={18} />
                <div className="space-y-1">
                  <h3 className="font-serif text-lg text-ivoire">Horaires</h3>
                  <p className="text-xs text-muted leading-relaxed">
                    Déjeuner : 12h30 — 15h00<br />
                    Dîner : 19h30 — 23h30<br />
                    <span className="text-muted/60 text-[11px]">Fermé dimanche et lundi</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-surface border border-white/10 shadow-2xl">
              {isSent ? (
                <div className="py-16 text-center space-y-4 animate-fadeIn">
                  <CheckCircle2 size={48} className="text-or mx-auto" />
                  <h3 className="font-serif text-2xl text-ivoire">Message transmis</h3>
                  <p className="text-xs text-muted max-w-sm mx-auto">
                    La conciergerie LUCENTE vous répondra personnellement sous 24 heures ouvrées.
                  </p>
                  <button
                    onClick={() => { setIsSent(false); setFormData({ name: '', email: '', phone: '', subject: 'Général', message: '' }); }}
                    className="px-6 py-2.5 bg-surface-elevated text-or text-xs uppercase tracking-widest border border-white/10 hover:border-or transition-all mt-4"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Nom & Prénom *</label>
                    <input
                      type="text"
                      required
                      placeholder="Votre nom complet"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3.5 py-2.5 input-luxury ${errors.name ? 'input-luxury-error animate-shake' : ''}`}
                    />
                    {errors.name && <p className="text-[10px] text-terracotta mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 input-luxury ${errors.email ? 'input-luxury-error animate-shake' : ''}`}
                      />
                      {errors.email && <p className="text-[10px] text-terracotta mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Téléphone</label>
                      <input
                        type="tel"
                        placeholder="+39 ..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 input-luxury"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Objet</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 input-luxury text-ivoire bg-surface-elevated"
                    >
                      <option value="Général">Demande Générale</option>
                      <option value="Privatisation">Privatisation & Événement</option>
                      <option value="Presse">Presse & Médias</option>
                      <option value="Partenariat">Partenariat & Vins</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Comment pouvons-nous vous aider ?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-3.5 py-2.5 input-luxury ${errors.message ? 'input-luxury-error animate-shake' : ''}`}
                    />
                    {errors.message && <p className="text-[10px] text-terracotta mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 btn-luxury-primary flex items-center justify-center gap-2 shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Envoi en cours...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Envoyer</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
