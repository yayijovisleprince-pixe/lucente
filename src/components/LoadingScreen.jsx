import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-nero flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 animate-fadeIn">
      <div className="text-center space-y-4">
        <span className="font-serif-luxury text-4xl sm:text-5xl tracking-[0.3em] text-ivoire uppercase font-light animate-pulse">
          LUCENTE
        </span>
        <div className="w-16 h-[1px] bg-or mx-auto" />
        <p className="typo-eyebrow text-[9px] text-or/80">Alta Cucina Contemporanea</p>
      </div>
    </div>
  );
}
