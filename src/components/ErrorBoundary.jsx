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
        ? "Desideriamo garantirvi un'esperienza impeccabile. Tornate alla pagina principale per riprendere la vostra visita a LUCENTE."
        : savedLang === 'fr'
        ? "Nous tenons à vous garantir une expérience d'exception. Retournez à l'accueil pour reprendre votre visite de LUCENTE."
        : "We strive to offer you a seamless experience. Return to the home page to resume your visit to LUCENTE.";

      const homeBtnText = savedLang === 'it'
        ? "Torna alla Pagina Principale"
        : savedLang === 'fr'
        ? "Retourner à la page d'accueil"
        : "Return to Home Page";

      const reloadBtnText = savedLang === 'it'
        ? "Riprova"
        : savedLang === 'fr'
        ? "Réessayer"
        : "Try again";

      return (
        <div className="min-h-screen bg-nero text-ivoire flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-6 border border-or/40 p-8 sm:p-12 bg-surface shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-or block">
              LUCENTE · Milano
            </span>
            <div className="w-12 h-[1px] bg-or/60 mx-auto" />
            <h1 className="font-serif text-2xl sm:text-3xl text-ivoire font-light">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 bg-or text-[#10100E] font-bold text-xs uppercase tracking-widest hover:bg-ivoire transition-all shadow-lg text-center"
              >
                {homeBtnText}
              </a>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                className="w-full sm:w-auto px-5 py-3.5 bg-surface-elevated border border-white/20 hover:border-or text-ivoire hover:text-or font-mono text-xs uppercase tracking-wider transition-all text-center"
              >
                {reloadBtnText}
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
