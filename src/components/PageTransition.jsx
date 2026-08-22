import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div 
      key={pathname} 
      className="w-full flex-grow opacity-100"
    >
      {children}
    </div>
  );
}
