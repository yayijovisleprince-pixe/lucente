import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Toast({ toast, onClose }) {
  const { lang, t } = useLanguage();
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-surface border border-or-subtle rounded p-4 shadow-2xl animate-fadeIn flex items-start space-x-3">
      {isSuccess ? (
        <CheckCircle2 className="w-5 h-5 text-or flex-shrink-0 mt-0.5" />
      ) : (
        <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
      )}
      <div className="flex-1 space-y-1">
        <p className="typo-eyebrow text-[10px] text-ivoire">
          {toast.title || (isSuccess ? (lang === 'it' ? 'Completato' : lang === 'en' ? 'Success' : 'Succès') : (lang === 'it' ? 'Informazione' : lang === 'en' ? 'Information' : 'Information'))}
        </p>
        <p className="typo-body text-xs text-muted leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        aria-label={lang === 'it' ? 'Chiudi la notifica' : lang === 'en' ? 'Close notification' : 'Fermer la notification'}
        className="text-muted hover:text-ivoire p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
