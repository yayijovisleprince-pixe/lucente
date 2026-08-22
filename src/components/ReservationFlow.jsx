import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  ExternalLink, 
  Check,
  Loader2
} from 'lucide-react';
import { restaurantInfo } from '../data/restaurantData';
import { useLanguage } from '../contexts/LanguageContext';

export default function ReservationFlow({ 
  initialSpace = '', 
  initialMenu = '', 
  onComplete, 
  isModal = false 
}) {
  const { lang, t } = useLanguage();
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
  const availableDates = useMemo(() => {
    const daysMap = {
      it: { '25': 'Mar', '26': 'Mer', '27': 'Gio', '28': 'Ven', '29': 'Sab', '01': 'Mar', '02': 'Mer', '03': 'Gio', '04': 'Ven', '05': 'Sab', '08': 'Mar', '09': 'Mer' },
      en: { '25': 'Tue', '26': 'Wed', '27': 'Thu', '28': 'Fri', '29': 'Sat', '01': 'Tue', '02': 'Wed', '03': 'Thu', '04': 'Fri', '05': 'Sat', '08': 'Tue', '09': 'Wed' },
      fr: { '25': 'Mar', '26': 'Mer', '27': 'Jeu', '28': 'Ven', '29': 'Sam', '01': 'Mar', '02': 'Mer', '03': 'Jeu', '04': 'Ven', '05': 'Sam', '08': 'Mar', '09': 'Mer' }
    };
    const statusMap = {
      it: { avail: 'Disponibile', last: 'Ultimi tavoli', full: 'Completo' },
      en: { avail: 'Available', last: 'Last tables', full: 'Fully booked' },
      fr: { avail: 'Disponible', last: 'Dernières tables', full: 'Complet' }
    };
    const curDays = daysMap[lang] || daysMap.fr;
    const curStat = statusMap[lang] || statusMap.fr;

    return [
      { date: '2026-08-25', day: curDays['25'], num: '25', status: curStat.avail },
      { date: '2026-08-26', day: curDays['26'], num: '26', status: curStat.avail },
      { date: '2026-08-27', day: curDays['27'], num: '27', status: curStat.last },
      { date: '2026-08-28', day: curDays['28'], num: '28', status: curStat.last },
      { date: '2026-08-29', day: curDays['29'], num: '29', status: curStat.full },
      { date: '2026-09-01', day: curDays['01'], num: '01', status: curStat.avail },
      { date: '2026-09-02', day: curDays['02'], num: '02', status: curStat.avail },
      { date: '2026-09-03', day: curDays['03'], num: '03', status: curStat.last },
      { date: '2026-09-04', day: curDays['04'], num: '04', status: curStat.avail },
      { date: '2026-09-05', day: curDays['05'], num: '05', status: curStat.last },
      { date: '2026-09-08', day: curDays['08'], num: '08', status: curStat.avail },
      { date: '2026-09-09', day: curDays['09'], num: '09', status: curStat.avail }
    ];
  }, [lang]);

  // Available Time slots for Lunch & Dinner
  const timeSlots = {
    lunch: [
      { time: '12:30', status: 'avail' },
      { time: '13:00', status: 'avail' },
      { time: '13:30', status: 'last' },
      { time: '14:00', status: 'avail' }
    ],
    dinner: [
      { time: '19:30', status: 'avail' },
      { time: '20:00', status: 'last' },
      { time: '20:30', status: 'avail' },
      { time: '21:00', status: 'avail' },
      { time: '21:30', status: 'avail' }
    ]
  };

  // Seating options
  const seatingOptions = [
    {
      id: 'La Sala Chiaroscuro',
      title: 'La Sala Chiaroscuro',
      subtitle: lang === 'it' ? 'Sala Principale · Architettura & Penombra' : lang === 'en' ? 'Main Dining Room · Architecture & Intimacy' : 'Salle Principale · Architecture & Pénombre',
      description: lang === 'it' ? 'Atmosfera soffusa con illuminazione focalizzata (28 coperti).' : lang === 'en' ? 'Subdued atmosphere with focused lighting (28 covers).' : 'Atmosphère feutrée sous éclairage focalisé (28 couverts).',
      image: '/images/dining-room.webp'
    },
    {
      id: "Il Tavolo dello Chef",
      title: "Il Tavolo dello Chef",
      subtitle: lang === 'it' ? 'Tavolo Alto · Vista Diretta sul Pass' : lang === 'en' ? 'Chef Table · Direct View on Kitchen Pass' : 'Table Haute · Vue Directe sur le Passe',
      description: lang === 'it' ? 'Immersione a contatto con la brigata di Vincenzo Moretti.' : lang === 'en' ? "Immersion close to Vincenzo Moretti's brigade." : 'Immersion au plus près de la brigade de Vincenzo Moretti.',
      image: '/images/chef-craft.webp'
    },
    {
      id: "La Cantina Segreta",
      title: "La Cantina Segreta",
      subtitle: lang === 'it' ? 'Cripta Storica da 1.400 Bottiglie' : lang === 'en' ? 'Historic Vault with 1,400 Bottles' : 'Crypte Historique aux 1 400 Flacons',
      description: lang === 'it' ? 'Tavolo esclusivo nella cantina con Gianluca Ferri.' : lang === 'en' ? 'Exclusive table in the cellar with Gianluca Ferri.' : 'Table exclusive au cœur de la cave voûtée avec le Chef Sommelier Gianluca Ferri.',
      image: '/images/cellar-architecture.webp'
    }
  ];

  // Occasions list
  const occasions = lang === 'it'
    ? ['Nessuna', 'Compleanno', 'Cena Romantica', 'Cena di Lavoro Riservata', 'Celebrazione / Fidanzamento', 'Esperienza Gastronomica']
    : lang === 'en'
    ? ['None', 'Birthday', 'Romantic Dinner', 'Business Dinner', 'Celebration / Engagement', 'Culinary Discovery']
    : ['Aucune', 'Anniversaire', 'Dîner Romantique', 'Dîner d\'Affaires Confidentiel', 'Célébration / Fiançailles', 'Découverte Gastronomique'];

  // Dietary requirements options
  const dietaryOptions = lang === 'it'
    ? ['Senza Glutine', 'Vegetariano', 'Pescetariano', 'Allergia Crostacei', 'Allergia Frutta a Guscio', 'Senza Lattosio']
    : lang === 'en'
    ? ['Gluten Free', 'Vegetarian', 'Pescatarian', 'Shellfish Allergy', 'Nut Allergy', 'Lactose Free']
    : ['Sans Gluten', 'Végétarien', 'Pescétarien', 'Allergie Crustacés / Fruits de Mer', 'Allergie Fruits à Coque', 'Sans Lactose'];

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
    if (!details.firstName.trim()) newErrors.firstName = t('common.requiredField');
    if (!details.lastName.trim()) newErrors.lastName = t('common.requiredField');
    if (!details.email.trim() || !details.email.includes('@')) newErrors.email = t('common.validEmail');
    if (!details.phone.trim()) newErrors.phone = t('common.requiredField');

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
    const title = encodeURIComponent(
      lang === 'it' ? "Cena Gastronomica da LUCENTE — Milano" :
      lang === 'en' ? "Gastronomic Dinner at LUCENTE — Milano" :
      "Dîner Gastronomique chez LUCENTE — Milano"
    );
    const detailsText = encodeURIComponent(
      lang === 'it' ? `Prenotazione confermata per ${selectedGuests} ospite(i) da LUCENTE.\nSpazio: ${selectedSeating}\nCodice: ${bookingReference}\nTelefono: +39 02 8945 7700` :
      lang === 'en' ? `Confirmed reservation for ${selectedGuests} guest(s) at LUCENTE.\nSpace: ${selectedSeating}\nReference: ${bookingReference}\nPhone: +39 02 8945 7700` :
      `Réservation confirmée pour ${selectedGuests} convive(s) chez LUCENTE.\nEspace : ${selectedSeating}\nRéférence : ${bookingReference}\nTéléphone : +39 02 8945 7700`
    );
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
      `PRODID:-//LUCENTE Ristorante//Reservation Calendar//${lang.toUpperCase()}`,
      'BEGIN:VEVENT',
      `UID:${bookingReference}@lucente-milano.com`,
      `DTSTAMP:${startIso}Z`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `SUMMARY:${lang === 'it' ? 'Tavolo da LUCENTE — Alta Cucina Contemporanea' : lang === 'en' ? 'Table at LUCENTE — Alta Cucina Contemporanea' : 'Table chez LUCENTE — Alta Cucina Contemporanea'}`,
      `DESCRIPTION:${lang === 'it' ? `Tavolo confermato per ${selectedGuests} ospite(i). Spazio: ${selectedSeating}. Rif: ${bookingReference}` : lang === 'en' ? `Table confirmed for ${selectedGuests} guest(s). Space: ${selectedSeating}. Ref: ${bookingReference}` : `Table confirmée pour ${selectedGuests} convive(s). Espace : ${selectedSeating}. Réf : ${bookingReference}`}`,
      'LOCATION:Via Monte Napoleone 14, 20121 Milano, Italia',
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

  const stepLabels = {
    it: ['Data', 'Servizio & Ora', 'Ospiti', 'Spazio', 'I Vostri Dati'],
    en: ['Date', 'Service & Time', 'Guests', 'Space', 'Your Details'],
    fr: ['Date', 'Service & Heure', 'Convives', 'Espace', 'Vos Coordonnées']
  };
  const currentStepLabels = stepLabels[lang] || stepLabels.fr;

  return (
    <div className="bg-surface border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
      
      {/* Progress Bar & Steps Indicator */}
      {currentStep < 6 && (
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-muted">
            <span className="text-or">
              {lang === 'it' ? `Passo 0${currentStep} / 05` : lang === 'en' ? `Step 0${currentStep} / 05` : `Étape 0${currentStep} / 05`}
            </span>
            <span>{currentStepLabels[currentStep - 1]}</span>
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
            <span className="text-xs uppercase font-mono text-or tracking-widest">
              {lang === 'it' ? 'Calendario dei Servizi' : lang === 'en' ? 'Service Calendar' : 'Calendrier des Services'}
            </span>
            <h3 className="font-serif text-2xl text-ivoire">
              {lang === 'it' ? 'Selezionate la data' : lang === 'en' ? 'Select your date' : 'Sélectionnez votre date'}
            </h3>
            <p className="text-xs text-muted">
              {lang === 'it' ? 'Prenotazioni aperte con 30 giorni di anticipo. Chiuso domenica & lunedì.' : lang === 'en' ? 'Reservations open 30 days in advance. Closed Sunday & Monday.' : "Réservations ouvertes 30 jours à l'avance. Fermé dimanche & lundi."}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {availableDates.map((item) => {
              const isSelected = selectedDate === item.date;
              const isUnavailable = item.status === 'Complet' || item.status === 'Completo' || item.status === 'Fully booked';
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
              <span>{lang === 'it' ? 'CONTINUA' : lang === 'en' ? 'CONTINUE' : 'CONTINUER'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: TIME */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">
              {lang === 'it' ? 'Orario del Servizio' : lang === 'en' ? 'Service Time' : 'Heure du Service'}
            </span>
            <h3 className="font-serif text-2xl text-ivoire">
              {lang === 'it' ? 'Pranzo o Cena' : lang === 'en' ? 'Lunch or Dinner' : 'Déjeuner ou Dîner'}
            </h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase font-mono text-muted tracking-wider">
                {lang === 'it' ? 'Pranzo · 12:30 a 15:00' : lang === 'en' ? 'Lunch · 12:30 to 15:00' : 'Déjeuner · 12h30 à 15h00'}
              </p>
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
              <p className="text-xs uppercase font-mono text-muted tracking-wider">
                {lang === 'it' ? 'Cena · 19:30 a 23:30' : lang === 'en' ? 'Dinner · 19:30 to 23:30' : 'Dîner · 19h30 à 23h30'}
              </p>
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
              <ChevronLeft size={14} /> {lang === 'it' ? 'Indietro' : lang === 'en' ? 'Back' : 'Retour'}
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2"
            >
              <span>{lang === 'it' ? 'CONTINUA' : lang === 'en' ? 'CONTINUE' : 'CONTINUER'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: GUESTS */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">
              {lang === 'it' ? 'Numero di Ospiti' : lang === 'en' ? 'Number of Guests' : 'Nombre de Convives'}
            </span>
            <h3 className="font-serif text-2xl text-ivoire">
              {lang === 'it' ? 'Il Vostro Tavolo' : lang === 'en' ? 'Your Table' : 'Votre Tablée'}
            </h3>
            <p className="text-xs text-muted">
              {lang === 'it'
                ? '28 coperti per servizio. Oltre 6 ospiti, è suggerita una privatizzazione.'
                : lang === 'en'
                ? '28 covers per service. For more than 6 guests, a private room is recommended.'
                : '28 couverts par service. Au-delà de 6 convives, une privatisation est proposée.'}
            </p>
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
              <ChevronLeft size={14} /> {lang === 'it' ? 'Indietro' : lang === 'en' ? 'Back' : 'Retour'}
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2"
            >
              <span>{lang === 'it' ? 'CONTINUA' : lang === 'en' ? 'CONTINUE' : 'CONTINUER'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: SEATING */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">
              {lang === 'it' ? 'Spazio Desiderato' : lang === 'en' ? 'Preferred Space' : 'Espace Souhaité'}
            </span>
            <h3 className="font-serif text-2xl text-ivoire">
              {lang === 'it' ? "L'Atmosfera del vostro tavolo" : lang === 'en' ? 'Atmosphere of your table' : "L'Atmosphère de votre table"}
            </h3>
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
                    <span>{isSelected ? (lang === 'it' ? '✓ Selezionato' : lang === 'en' ? '✓ Selected' : '✓ Sélectionné') : (lang === 'it' ? 'Seleziona' : lang === 'en' ? 'Select' : 'Sélectionner')}</span>
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
              <ChevronLeft size={14} /> {lang === 'it' ? 'Indietro' : lang === 'en' ? 'Back' : 'Retour'}
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2"
            >
              <span>{lang === 'it' ? 'CONTINUA' : lang === 'en' ? 'CONTINUE' : 'CONTINUER'}</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: DETAILS */}
      {currentStep === 5 && (
        <form onSubmit={handleProceedToConfirmation} className="space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <span className="text-xs uppercase font-mono text-or tracking-widest">
              {lang === 'it' ? 'Ultimo Passo' : lang === 'en' ? 'Final Step' : 'Dernière Étape'}
            </span>
            <h3 className="font-serif text-2xl text-ivoire">
              {lang === 'it' ? 'I Vostri Dati' : lang === 'en' ? 'Your Details' : 'Vos Coordonnées'}
            </h3>
            <p className="text-xs text-muted">
              {lang === 'it' ? 'Per accogliervi in condizioni perfette.' : lang === 'en' ? 'To welcome you under perfect conditions.' : 'Pour vous accueillir dans des conditions parfaites.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
                {lang === 'it' ? 'Nome *' : lang === 'en' ? 'First Name *' : 'Prénom *'}
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'it' ? 'Il tuo nome' : lang === 'en' ? 'First name' : 'Votre prénom'}
                value={details.firstName}
                onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
                className="w-full px-3.5 py-2.5 input-luxury"
              />
              {errors.firstName && <p className="text-[10px] text-terracotta mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
                {lang === 'it' ? 'Cognome *' : lang === 'en' ? 'Last Name *' : 'Nom *'}
              </label>
              <input
                type="text"
                required
                placeholder={lang === 'it' ? 'Il tuo cognome' : lang === 'en' ? 'Last name' : 'Votre nom'}
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
                placeholder={lang === 'fr' ? 'votre@email.com' : 'you@email.com'}
                value={details.email}
                onChange={(e) => setDetails({ ...details, email: e.target.value })}
                className="w-full px-3.5 py-2.5 input-luxury"
              />
              {errors.email && <p className="text-[10px] text-terracotta mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
                {lang === 'it' ? 'Telefono *' : lang === 'en' ? 'Phone *' : 'Téléphone *'}
              </label>
              <input
                type="tel"
                required
                placeholder="+39 ..."
                value={details.phone}
                onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 input-luxury"
              />
              {errors.phone && <p className="text-[10px] text-terracotta mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-1">
              {lang === 'it' ? 'Occasione Particolare' : lang === 'en' ? 'Special Occasion' : 'Occasion Particulière'}
            </label>
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
            <label className="block text-[11px] uppercase tracking-wider text-muted font-mono mb-2">
              {lang === 'it' ? 'Diete & Allergie' : lang === 'en' ? 'Dietary Requirements' : 'Régimes & Allergies'}
            </label>
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
              <ChevronLeft size={14} /> {lang === 'it' ? 'Indietro' : lang === 'en' ? 'Back' : 'Retour'}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3.5 btn-luxury-primary flex items-center gap-2 shadow-2xl"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>{lang === 'it' ? 'Elaborazione...' : lang === 'en' ? 'Processing...' : 'Traitement...'}</span>
                </>
              ) : (
                <>
                  <span>{lang === 'it' ? 'CONFERMA IL TAVOLO' : lang === 'en' ? 'CONFIRM TABLE' : 'CONFIRMER LA TABLE'}</span>
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
            <span className="text-xs uppercase font-mono text-or tracking-widest">
              {lang === 'it' ? 'Prenotazione Confermata' : lang === 'en' ? 'Reservation Confirmed' : 'Réservation Confirmée'}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-ivoire">
              {lang === 'it' ? 'La vostra tavola vi attende' : lang === 'en' ? 'Your table is waiting' : 'Votre table vous attend'}
            </h3>
            <p className="text-sm font-mono text-or">
              {lang === 'it' ? 'RIFERIMENTO' : lang === 'en' ? 'REFERENCE' : 'RÉFÉRENCE'} : {bookingReference}
            </p>
          </div>

          <div className="max-w-md mx-auto bg-surface-elevated border border-white/10 p-6 text-left space-y-2 text-xs text-muted font-mono">
            <p><span className="text-ivoire font-semibold">{lang === 'it' ? 'Data:' : lang === 'en' ? 'Date:' : 'Date :'}</span> {selectedDate}</p>
            <p><span className="text-ivoire font-semibold">{lang === 'it' ? 'Ora:' : lang === 'en' ? 'Time:' : 'Heure :'}</span> {selectedTime}</p>
            <p><span className="text-ivoire font-semibold">{lang === 'it' ? 'Ospiti:' : lang === 'en' ? 'Guests:' : 'Convives :'}</span> {selectedGuests} {lang === 'it' ? 'persona/e' : lang === 'en' ? 'guest(s)' : 'personne(s)'}</p>
            <p><span className="text-ivoire font-semibold">{lang === 'it' ? 'Spazio:' : lang === 'en' ? 'Space:' : 'Espace :'}</span> {selectedSeating}</p>
            <p><span className="text-ivoire font-semibold">{lang === 'it' ? 'Intestatario:' : lang === 'en' ? 'Name:' : 'Titulaire :'}</span> {details.firstName} {details.lastName}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={downloadIcsFile}
              className="px-5 py-2.5 bg-surface-elevated border border-white/10 text-ivoire hover:border-or text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Download size={13} className="text-or" />
              <span>{lang === 'it' ? 'Aggiungi al Calendario (.ics)' : lang === 'en' ? 'Add to Calendar (.ics)' : "Ajouter à l'Agenda (.ics)"}</span>
            </button>

            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-surface-elevated border border-white/10 text-ivoire hover:border-or text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <ExternalLink size={13} className="text-or" />
              <span>Google Calendar</span>
            </a>
          </div>

          <p className="text-xs text-muted/80 max-w-sm mx-auto pt-4">
            {lang === 'it'
              ? `Un'email di conferma è stata inviata al vostro indirizzo. Per qualsiasi modifica, contattate il concierge al ${restaurantInfo.phone}.`
              : lang === 'en'
              ? `A confirmation email has been sent to your address. For any modification, call the concierge at ${restaurantInfo.phone}.`
              : `Un email de confirmation récapitulatif a été transmis à votre adresse. Pour toute modification, joignez la conciergerie au ${restaurantInfo.phone}.`}
          </p>
        </div>
      )}

    </div>
  );
}
