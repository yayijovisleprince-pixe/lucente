import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Camera, QrCode, Search, AlertCircle, 
  ArrowRight, Shield, Utensils, RefreshCw 
} from 'lucide-react';
import { restaurantAreas, allTables } from '../data/tablesData';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';

export default function QrScannerPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const [activeMode, setActiveMode] = useState('manual'); // 'camera' | 'manual'
  const [cameraError, setCameraError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Filtered tables by search
  const filteredTables = allTables.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.capacity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Camera start logic
  const startCamera = async () => {
    setCameraError('');
    setIsScanning(true);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("L'accès à la caméra n'est pas pris en charge par ce navigateur.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // If BarcodeDetector is supported in this browser
      if ('BarcodeDetector' in window) {
        const barcodeDetector = new window.BarcodeDetector({ formats: ['qr_code'] });
        const interval = setInterval(async () => {
          if (!videoRef.current || videoRef.current.readyState < 2) return;
          try {
            const barcodes = await barcodeDetector.detect(videoRef.current);
            if (barcodes.length > 0) {
              const rawValue = barcodes[0].rawValue;
              clearInterval(interval);
              stopCamera();

              // Check if URL contains /table/ or raw table number
              const match = rawValue.match(/table\/([a-zA-Z0-9_-]+)/);
              if (match && match[1]) {
                navigate(`/table/${match[1]}`);
              } else {
                navigate(`/table/${encodeURIComponent(rawValue)}`);
              }
            }
          } catch (e) {
            // Ignore frame decode errors
          }
        }, 300);
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError(err.message || 'Impossible d\'activer la caméra. Veuillez sélectionner votre table ci-dessous.');
      setActiveMode('manual');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  useEffect(() => {
    if (activeMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeMode]);

  return (
    <>
      <SEOHead 
        title="Scanner & Commander à Table | LUCENTE Milano"
        description="Scannez le QR code de votre table ou sélectionnez votre emplacement pour commander directement auprès de la brigade."
      />

      <div className="min-h-screen bg-nero text-ivoire pt-28 pb-20 px-4 sm:px-6 md:px-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-or/10 border border-or/30 rounded-full typo-metadata text-[10px] text-or uppercase tracking-widest">
            <QrCode size={12} />
            <span>Expérience en Salle · Alta Cucina</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-ivoire tracking-wide">
            Scanner Votre Table
          </h1>

          <p className="typo-editorial text-sm sm:text-base text-muted italic">
            « Installez-vous confortablement. Scannez le chevalet de votre table ou sélectionnez votre place pour commander vos mets en direct. »
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-surface border border-white/10 rounded-full">
            <button
              onClick={() => setActiveMode('manual')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeMode === 'manual'
                  ? 'bg-or text-nero font-bold shadow-md'
                  : 'text-muted hover:text-ivoire'
              }`}
            >
              <Utensils size={13} />
              <span>Choisir ma Table</span>
            </button>

            <button
              onClick={() => setActiveMode('camera')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                activeMode === 'camera'
                  ? 'bg-or text-nero font-bold shadow-md'
                  : 'text-muted hover:text-ivoire'
              }`}
            >
              <Camera size={13} />
              <span>Caméra Scanner</span>
            </button>
          </div>
        </div>

        {/* Camera Mode */}
        {activeMode === 'camera' && (
          <div className="max-w-md mx-auto bg-surface-card border border-or/40 p-6 rounded-sm shadow-2xl mb-10 text-center animate-fade-in">
            {cameraError ? (
              <div className="space-y-4 py-4">
                <div className="w-12 h-12 rounded-full bg-terracotta/20 border border-terracotta flex items-center justify-center mx-auto text-terracotta">
                  <AlertCircle size={24} />
                </div>
                <p className="text-xs text-ivoire/90">{cameraError}</p>
                <button
                  onClick={() => setActiveMode('manual')}
                  className="py-2.5 px-5 bg-or text-nero font-medium text-xs uppercase font-mono tracking-wider"
                >
                  Basculer sur le Choix Manuel
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-square max-w-[280px] mx-auto rounded-sm overflow-hidden border-2 border-or/80 bg-black flex items-center justify-center">
                  <video 
                    ref={videoRef} 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover" 
                  />
                  {/* Luxury Viewfinder Overlay */}
                  <div className="absolute inset-4 border border-or/40 pointer-events-none flex flex-col justify-between p-2">
                    <div className="flex justify-between">
                      <span className="w-3 h-3 border-t-2 border-l-2 border-or" />
                      <span className="w-3 h-3 border-t-2 border-r-2 border-or" />
                    </div>
                    <div className="flex justify-between">
                      <span className="w-3 h-3 border-b-2 border-l-2 border-or" />
                      <span className="w-3 h-3 border-b-2 border-r-2 border-or" />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted font-mono animate-pulse">
                  Pointez votre appareil vers le QR code posé sur votre table...
                </p>
              </div>
            )}
          </div>
        )}

        {/* Manual Mode : Table Selector */}
        {activeMode === 'manual' && (
          <div className="space-y-8 animate-fade-in">
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une table (ex: Table 04, Chef, Cantina...)"
                className="w-full bg-surface border border-white/15 focus:border-or rounded-sm pl-10 pr-4 py-2.5 text-xs text-ivoire placeholder:text-muted/60 focus:outline-none"
              />
            </div>

            {/* Areas & Tables Grid */}
            {restaurantAreas.map((area) => {
              const areaTables = filteredTables.filter(t => t.areaId === area.id);
              if (areaTables.length === 0) return null;

              return (
                <div key={area.id} className="space-y-3">
                  <div className="border-b border-or-subtle pb-2">
                    <h2 className="font-serif-luxury text-xl text-ivoire font-light">
                      {area.name[lang] || area.name.fr}
                    </h2>
                    <p className="text-[11px] text-muted font-serif italic">
                      {area.subtitle[lang] || area.subtitle.fr}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {areaTables.map((tbl) => (
                      <Link
                        key={tbl.id}
                        to={`/table/${tbl.id}`}
                        className="p-4 bg-surface hover:bg-surface-elevated border border-white/10 hover:border-or/70 rounded-sm transition-all group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-mono text-xs text-or font-semibold">
                              Table {tbl.number}
                            </span>
                            <span className="text-[10px] text-muted font-mono">
                              {tbl.capacity}
                            </span>
                          </div>
                          <div className="font-serif-luxury text-base text-ivoire group-hover:text-or transition-colors">
                            {tbl.name}
                          </div>
                          <div className="text-[10px] text-muted/70 mt-1">
                            {tbl.shape}
                          </div>
                        </div>

                        <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-or/80 font-mono">
                          <span>Commander</span>
                          <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </>
  );
}

