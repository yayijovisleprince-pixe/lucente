import React from 'react';

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-or focus:text-nero focus:font-semibold focus:text-xs focus:uppercase focus:tracking-widest focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-ivoire transition-all duration-200"
    >
      Passer directement au contenu principal (Skip to content)
    </a>
  );
}
