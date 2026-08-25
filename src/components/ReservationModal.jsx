import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import ReservationFlow from './ReservationFlow';
import { useLanguage } from '../contexts/LanguageContext';

export default function ReservationModal({
  isOpen,
  onClose,
  initialMenu = '',
  initialSpace = ''
}) {
  const { lang } = useLanguage();

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-booking-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-nero/95 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20 pb-28 sm:pb-16 animate-fadeIn"
    >
      <div className="relative w-full max-w-4xl bg-surface border border-or-subtle rounded-lg shadow-2xl overflow-hidden my-auto sm:my-8">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          aria-label={lang === 'it' ? 'Chiudi finestra di prenotazione' : lang === 'en' ? 'Close reservation window' : 'Fermer la fenêtre de réservation'}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-nero/80 border border-white/10 text-muted hover:text-ivoire hover:border-or transition-all group"
        >
          <X className="w-5 h-5 text-muted group-hover:text-ivoire" />
        </button>

        {/* Modal Header Title for Screen Readers */}
        <h2 id="modal-booking-title" className="sr-only">
          {lang === 'it' ? 'Conciergerie & Prenotazione Tavolo — LUCENTE Milano' : lang === 'en' ? 'Concierge & Table Reservation — LUCENTE Milano' : 'Conciergerie & Réservation de Table — LUCENTE Milano'}
        </h2>

        {/* Modal Body: Embedded Step-by-Step Concierge Flow */}
        <div className="p-4 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto">
          <ReservationFlow
            isModal={true}
            initialSpace={initialSpace}
            initialMenu={initialMenu}
            onComplete={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
