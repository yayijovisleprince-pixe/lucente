import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  MapPin, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  Utensils, 
  Accessibility, 
  Info, 
  Check,
  Loader2,
  Phone,
  Mail
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';

export default function ReservationFlow({ 
  initialSpace = '', 
  initialMenu = '', 
  onComplete, 
  isModal = false 
}) {
  // Step 1: Date | Step 2: Service & Heure | Step 3: Convives | Step 4: Espace | Step 5: Coordonnées | Step 6: Confirmation
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [selectedDate, setSelectedDate] = useState('2026-08-28');
  const [selectedTime, setSelectedTime] = useState('20:00');
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [selectedSeating, setSelectedSeating] = useState(initialSpace || 'La Sala Chiaroscuro');
  
  // Details Form
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialOccasion: 'Aucune',
    dietary: [],
    dietaryNotes: '',
    accessibility: 'Aucun',
    accessibilityNotes: ''
  });

  const [bookingReference, setBookingReference] = useState('');
  const [errors, setErrors] = useState({});

  // 12 upcoming open days (Mardi au Samedi uniquement)
  const availableDates = useMemo(() => [
    { date: '2026-08-25', day: 'Mar', num: '25', status: 'Disponible' },
    { date: '2026-08-26', day: 'Mer', num: '26', status: 'Disponible' },
    { date: '2026-08-27', day: 'Jeu', num: '27', status: 'Dernières tables' },
    { date: '2026-08-28', day: 'Ven', num: '28', status: 'Dernières tables' },
    { date: '2026-08-29', day: 'Sam', num: '29', status: 'Complet' },
    { date: '2026-09-01', day: 'Mar', num: '01', status: 'Disponible' },
    { date: '2026-09-02', day: 'Mer', num: '02', status: 'Disponible' },
    { date: '2026-09-03', day: 'Jeu', num: '03', status: 'Dernières tables' },
    { date: '2026-09-04', day: 'Ven', num: '04', status: 'Disponible' },
    { date: '2026-09-05', day: 'Sam', num: '05', status: 'Dernières tables' },
    { date: '2026-09-08', day: 'Mar', num: '08', status: 'Disponible' },
    { date: '2026-09-09', day: 'Mer', num: '09', status: 'Disponible' }
  ], []);

  // Time Slots by service
  const timeSlots = useMemo(() => ({
    lunch: [
      { time: '12:30', status: 'Disponible' },
      { time: '13:00', status: 'Disponible' },
      { time: '13:30', status: 'Dernières tables' },
      { time: '14:00', status: 'Complet' }
    ],
    dinner: [
      { time: '19:30', status: 'Dernières tables' },
      { time: '20:00', status: 'Dernières tables' },
      { time: '20:30', status: 'Disponible' },
      { time: '21:00', status: 'Disponible' },
      { time: '21:30', status: 'Complet' }
    ]
  }), []);

  // Seating options
  const seatingOptions = [
    {
      id: 'La Sala Chiaroscuro',
      title: 'La Sala Chiaroscuro',
      subtitle: 'Salle Principale · Architecture & Pénombre',
      description: 'Atmosphère feutrée sous éclairage focalisé. Acoustique étudiée et tables drapées de lin sombre (28 couverts).',
      image: '/images/dining-room.webp'
    },
    {
      id: "Il Tavolo dello Chef",
      title: "Il Tavolo dello Chef",
      subtitle: 'Table Haute · Vue Directe sur le Passe',
      description: 'Immersion au plus près de la brigade de Vincenzo Moretti. Dressage d\'orfèvre et échanges privilégiés.',
      image: '/images/chef-craft.webp'
    },
    {
      id: "La Cantina Segreta",
      title: "La Cantina Segreta",
      subtitle: 'Crypte Historique aux 1 400 Flacons',
      description: 'Table exclusive au cœur de la cave voûtée avec le Chef Sommelier Gianluca Ferri.',
      image: '/images/cellar-architecture.webp'
    }
  ];

  // Occasions list
  const occasions = [
    'Aucune',
    'Anniversaire',
    'Dîner Romantique',
    'Dîner d\'Affaires Confidentiel',
    'Célébration / Fiançailles',
    'Découverte Gastronomique'
  ];

  // Dietary requirements options
  const dietaryOptions = [
    'Sans Gluten',
    'Végétarien',
    'Pescétarien',
    'Allergie Crustacés / Fruits de Mer',
    'Allergie Fruits à Coque',
    'Sans Lactose'
  ];

  // Toggle dietary requirement
  const handleToggleDietary = (item) => {
    setDetails(prev => {
      const exists = prev.dietary.includes(item);
      return {
        ...prev,
        dietary: exists ? prev.dietary.filter(d => d !== item) : [...prev.dietary, item]
      };
    });
  };

  // Submit Details and Generate Confirmation
  const handleProceedToConfirmation = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const newErrors = {};
    if (!details.firstName.trim()) newErrors.firstName = 'Veuillez saisir votre prénom';
    if (!details.lastName.trim()) newErrors.lastName = 'Veuillez saisir votre nom';
    if (!details.email.trim() || !details.email.includes('@')) newErrors.email = 'Adresse email valide requise';
    if (!details.phone.trim()) newErrors.phone = 'Numéro de téléphone requis';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const randomCode = `LUC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingReference(randomCode);
      setCurrentStep(6);
      if (onComplete) onComplete({ ...details, date: selectedDate, time: selectedTime, guests: selectedGuests, seating: selectedSeating, reference: randomCode });
    }, 600);
  };

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Dîner Gastronomique chez LUCENTE — Milano");
    const detailsText = encodeURIComponent(`Réservation confirmée pour ${selectedGuests} convive(s) chez LUCENTE.\nEspace : ${selectedSeating}\nRéférence : ${bookingReference}\nTéléphone : +39 02 8945 7700`);
    const location = encodeURIComponent("LUCENTE, Via Monte Napoleone 14, 20121 Milano, Italy");
    
    const [year, month, day] = selectedDate.split('-');
    const [hours, mins] = selectedTime.split(':');
    const startIso = `${year}${month}${day}T${hours}${mins}00`;
    const endHour = String(Number(hours) + 3).padStart(2, '0');
    const endIso = `${year}${month}${day}T${endHour}${mins}00`;
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${detailsText}&location=${location}`;
  };

  // Download .ics file
  const downloadIcsFile = () => {
    const [year, month, day] = selectedDate.split('-');
    const [hours, mins] = selectedTime.split(':');
    const startIso = `${year}${month}${day}T${hours}${mins}00`;
    const endHour = String(Number(hours) + 3).padStart(2, '0');
    const endIso = `${year}${month}${day}T${endHour}${mins}00`;

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//LUCENTE Ristorante//Reservation Calendar//FR',
      'BEGIN:VEVENT',
      `UID:${bookingReference}@lucente-milano.com`,
      `DTSTAMP:${startIso}Z`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      'SUMMARY:Table chez LUCENTE — Alta Cucina Contemporanea',
      `DESCRIPTION:Table confirmée pour ${selectedGuests} convive(s). Espace : ${selectedSeating}. Réf : ${bookingReference}`,
      'LOCATION:Via Monte Napoleone 14, 20121 Milano, Italie',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lucente-reservation-${bookingReference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-surface border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
      
      {/* Progress Bar & Steps Indicator */}
      {currentStep < 6 && (
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-muted">
            <span className="text-or">Étape 0{currentStep} / 05</span>
            <span>{currentStep === 1 ? 'Date' : currentStep === 2 ? 'Service & Heure' : currentStep === 3 ? 'Convives' : currentStep === 4 ? 'Espace' : 'Vos Coordonnées'}</span>
          </div>
          <div className="w-full h-[2px] bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-or transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: DATE */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">Calendrier des Services</span>
            <h3 className="font-serif text-2xl text-ivoire">Sélectionnez votre date</h3>
            <p className="text-xs text-muted">Réservations ouvertes 30 jours à l'avance. Fermé dimanche & lundi.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {availableDates.map((item) => {
              const isSelected = selectedDate === item.date;
              const isUnavailable = item.status === 'Complet';
              return (
                <button
                  key={item.date}
                  type="button"
                  disabled={isUnavailable}
                  onClick={() => setSelectedDate(item.date)}
                  className={`p-3 border text-center transition-all ${
                    isSelected
                      ? 'border-or bg-or text-nero font-semibold shadow-lg'
                      : isUnavailable
                      ? 'border-white/5 opacity-30 cursor-not-allowed bg-nero/50'
                      : 'border-white/10 hover:border-or/60 text-ivoire bg-surface-elevated'
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-wider font-mono">{item.day}</p>
                  <p className="font-serif text-xl my-1">{item.num}</p>
                  <p className="text-[9px] font-mono truncate">{item.status}</p>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2"
            >
              <span>CONTINUER</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TIME */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">Heure du Service</span>
            <h3 className="font-serif text-2xl text-ivoire">Déjeuner ou Dîner</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase font-mono text-muted tracking-wider">Déjeuner · 12h30 à 15h00</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeSlots.lunch.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  const isUnavailable = slot.status === 'Complet';
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={isUnavailable}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 border text-center transition-all ${
                        isSelected
                          ? 'border-or bg-or text-nero font-semibold shadow-lg'
                          : isUnavailable
                          ? 'border-white/5 opacity-30 cursor-not-allowed'
                          : 'border-white/10 hover:border-or/60 text-ivoire bg-surface-elevated'
                      }`}
                    >
                      <span className="font-mono text-base">{slot.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase font-mono text-muted tracking-wider">Dîner · 19h30 à 23h30</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {timeSlots.dinner.map((slot) => {
                  const isSelected = selectedTime === slot.time;
                  const isUnavailable = slot.status === 'Complet';
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={isUnavailable}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-3 border text-center transition-all ${
                        isSelected
                          ? 'border-or bg-or text-nero font-semibold shadow-lg'
                          : isUnavailable
                          ? 'border-white/5 opacity-30 cursor-not-allowed'
                          : 'border-white/10 hover:border-or/60 text-ivoire bg-surface-elevated'
                      }`}
                    >
                      <span className="font-mono text-base">{slot.time}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(1)}
              className="text-xs text-muted hover:text-ivoire uppercase tracking-wider font-mono flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Retour
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2"
            >
              <span>CONTINUER</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: GUESTS */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">Nombre de Convives</span>
            <h3 className="font-serif text-2xl text-ivoire">Votre Tablée</h3>
            <p className="text-xs text-muted">28 couverts par service. Au-delà de 6 convives, une privatisation est proposée.</p>
          </div>

          <div className="flex items-center justify-center gap-6 py-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setSelectedGuests(num)}
                className={`w-14 h-14 border flex items-center justify-center text-xl font-serif transition-all ${
                  selectedGuests === num
                    ? 'border-or bg-or text-nero font-bold shadow-xl scale-105'
                    : 'border-white/10 hover:border-or text-ivoire bg-surface-elevated'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(2)}
              className="text-xs text-muted hover:text-ivoire uppercase tracking-wider font-mono flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Retour
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2"
            >
              <span>CONTINUER</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SEATING */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">Espace Souhaité</span>
            <h3 className="font-serif text-2xl text-ivoire">L'Atmosphère de votre table</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {seatingOptions.map((opt) => {
              const isSelected = selectedSeating === opt.title;
              return (
                <div
                  key={opt.id}
                  onClick={() => setSelectedSeating(opt.title)}
                  className={`p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-or bg-surface-elevated ring-1 ring-or shadow-xl'
                      : 'border-white/10 hover:border-or/40 bg-nero/60 opacity-75'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="h-32 overflow-hidden mb-3">
                      <img src={opt.image} alt={opt.title} loading="lazy" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-serif text-lg text-ivoire">{opt.title}</h4>
                    <p className="text-[11px] text-or font-mono">{opt.subtitle}</p>
                    <p className="text-xs text-muted leading-relaxed">{opt.description}</p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-or mt-3">
                    <span>{isSelected ? '✓ Sélectionné' : 'Sélectionner'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(3)}
              className="text-xs text-muted hover:text-ivoire uppercase tracking-wider font-mono flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Retour
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2"
            >
              <span>CONTINUER</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: DETAILS */}
      {currentStep === 5 && (
        <form onSubmit={handleProceedToConfirmation} className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">Dernière Étape</span>
            <h3 className="font-serif text-2xl text-ivoire">Vos Coordonnées</h3>
            <p className="text-xs text-muted">Pour vous accueillir dans des conditions parfaites.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Prénom *</label>
              <input
                type="text"
                required
                placeholder="Votre prénom"
                value={details.firstName}
                onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
                className="w-full px-3.5 py-2.5 input-luxury"
              />
              {errors.firstName && <p className="text-[10px] text-terracotta mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Nom *</label>
              <input
                type="text"
                required
                placeholder="Votre nom"
                value={details.lastName}
                onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
                className="w-full px-3.5 py-2.5 input-luxury"
              />
              {errors.lastName && <p className="text-[10px] text-terracotta mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Email *</label>
              <input
                type="email"
                required
                placeholder="votre@email.com"
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                className="w-full px-3.5 py-2.5 input-luxury"
              />
              {errors.email && <p className="text-[10px] text-terracotta mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Téléphone *</label>
              <input
                type="tel"
                required
                placeholder="+33 6 00 00 00 00"
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 input-luxury"
              />
              {errors.phone && <p className="text-[10px] text-terracotta mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">Occasion Particulière</label>
            <select
              value={details.specialOccasion}
              onChange={(e) => setDetails({ ...details, specialOccasion: e.target.value })}
              className="w-full px-3.5 py-2.5 input-luxury bg-surface-elevated text-ivoire"
            >
              {occasions.map((occ) => (
                <option key={occ} value={occ}>{occ}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-2">Régimes & Allergies</label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((opt) => {
                const isSelected = details.dietary.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleToggleDietary(opt)}
                    className={`px-3 py-1.5 text-xs font-mono border transition-all ${
                      isSelected
                        ? 'border-or bg-or/15 text-or'
                        : 'border-white/10 text-muted hover:border-white/20'
                    }`}
                  >
                    {isSelected ? `✓ ${opt}` : opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex justify-between items-center border-t border-white/10">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="text-xs text-muted hover:text-ivoire uppercase tracking-wider font-mono flex items-center gap-1"
            >
              <ChevronLeft size={14} /> Retour
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2 shadow-2xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Traitement...</span>
                </>
              ) : (
                <>
                  <span>CONFIRMER LA TABLE</span>
                  <Check size={14} />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* STEP 6: CONFIRMATION */}
      {currentStep === 6 && (
        <div className="text-center py-8 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full border border-or/40 bg-or/10 text-or mx-auto flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-mono text-or tracking-widest">Réservation Confirmée</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-ivoire">Votre table vous attend</h3>
            <p className="text-sm font-mono text-or">RÉFÉRENCE : {bookingReference}</p>
          </div>

          <div className="max-w-md mx-auto bg-surface-elevated border border-white/10 p-6 text-left space-y-2 text-xs text-muted font-mono">
            <p><span className="text-ivoire font-semibold">Date :</span> {selectedDate}</p>
            <p><span className="text-ivoire font-semibold">Heure :</span> {selectedTime}</p>
            <p><span className="text-ivoire font-semibold">Convives :</span> {selectedGuests} personne(s)</p>
            <p><span className="text-ivoire font-semibold">Espace :</span> {selectedSeating}</p>
            <p><span className="text-ivoire font-semibold">Titulaire :</span> {details.firstName} {details.lastName}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={downloadIcsFile}
              className="px-5 py-2.5 bg-surface-elevated border border-white/10 text-ivoire hover:border-or text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Download size={13} className="text-or" />
              <span>Ajouter à l'Agenda (.ics)</span>
            </button>

            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-surface-elevated border border-white/10 text-ivoire hover:border-or text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <ExternalLink size={13} className="text-or" />
              <span>Google Agenda</span>
            </a>
          </div>

          <p className="text-xs text-muted/80 max-w-sm mx-auto pt-4">
            Un email de confirmation récapitulatif a été transmis à votre adresse. Pour toute modification, joignez la conciergerie au {restaurantInfo.phone}.
          </p>
        </div>
      )}

    </div>
  );
}
