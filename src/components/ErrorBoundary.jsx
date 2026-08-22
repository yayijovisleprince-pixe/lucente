import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LUCENTE Runtime Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const savedLang = typeof window !== 'undefined' ? (localStorage.getItem('lucente_lang') || 'en') : 'en';

      const title = savedLang === 'it'
        ? "Si è verificata un'interruzione inattesa."
        : savedLang === 'fr'
        ? "Une interruption inattendue est survenue."
        : "An unexpected interruption has occurred.";

      const description = savedLang === 'it'
        ? "La nostra brigata tecnica è stata informata. Ricarica la pagina per proseguire."
        : savedLang === 'fr'
        ? "La brigade technique a été alertée. Veuillez recharger la page pour reprendre votre navigation."
        : "Our technical team has been notified. Please reload the page to continue.";

      const buttonText = savedLang === 'it'
        ? "Ricarica la pagina"
        : savedLang === 'fr'
        ? "Recharger la page"
        : "Reload page";

      return (
        <div className="min-h-screen bg-nero text-ivoire flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-6 border border-or/30 p-8 sm:p-12 bg-surface shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-or">
              LUCENTE · Milano
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl text-ivoire font-light">
              {title}
            </h1>
            <p className="text-xs text-muted leading-relaxed font-sans">
              {description}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-or text-nero font-semibold text-xs uppercase tracking-widest hover:bg-ivoire transition-all"
            >
              {buttonText}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
