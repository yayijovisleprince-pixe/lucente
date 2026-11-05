import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Printer, Download, QrCode, Filter, ExternalLink } from 'lucide-react';
import { restaurantAreas, allTables } from '../data/tablesData';
import SEOHead from '../components/SEOHead';

export default function QrStandsGeneratorPage() {
  const [selectedArea, setSelectedArea] = useState('all');
  const [baseUrl, setBaseUrl] = useState('');
  const [qrCodes, setQrCodes] = useState({});

  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://lucente-milano.com';
    setBaseUrl(origin);
  }, []);

  // Generate QR codes for all tables
  useEffect(() => {
    if (!baseUrl) return;

    allTables.forEach(async (table) => {
      const targetUrl = `${baseUrl}/table/${table.id}`;
      try {
        const dataUrl = await QRCode.toDataURL(targetUrl, {
          width: 320,
          margin: 1,
          color: {
            dark: '#10100E',
            light: '#F2EBDD'
          }
        });
        setQrCodes((prev) => ({ ...prev, [table.id]: dataUrl }));
      } catch (err) {
        console.error('QR generation error for table', table.id, err);
      }
    });
  }, [baseUrl]);

  const filteredTables = allTables.filter(t => selectedArea === 'all' || t.areaId === selectedArea);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQr = (table) => {
    const dataUrl = qrCodes[table.id];
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `LUCENTE_QR_Table_${table.number}.png`;
    a.click();
  };

  return (
    <>
      <SEOHead 
        title="Générateur de Chevalets QR de Table | LUCENTE Milano"
        description="Générez et imprimez les chevalets de table dorés pour le système Scan & Order du restaurant gastronomique LUCENTE."
      />

      <div className="min-h-screen bg-nero text-ivoire pt-24 pb-20 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        
        {/* Screen Header (Hidden on print) */}
        <div className="print:hidden border-b border-or-subtle pb-6 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-block px-3 py-1 bg-or/10 border border-or/30 rounded-full typo-metadata text-[10px] text-or uppercase tracking-widest font-mono mb-2">
                Outil Maître d'Hôtel & Direction
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl text-ivoire font-light">
                Générateur de Chevalets QR de Table
              </h1>
              <p className="typo-editorial text-xs sm:text-sm text-muted italic mt-1">
                « Chevalets haute couture prêts à poser sur les tables pour permettre aux convives de scanner et commander. »
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="py-3 px-6 bg-or hover:bg-or-light text-nero font-medium text-xs font-mono uppercase tracking-widest rounded-sm transition-all shadow-lg shadow-or/20 flex items-center gap-2"
              >
                <Printer size={16} />
                <span>Imprimer les Chevalets</span>
              </button>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
            {/* Filter by Area */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter size={14} className="text-or" />
              <button
                onClick={() => setSelectedArea('all')}
                className={`py-1.5 px-3 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedArea === 'all' ? 'bg-or text-nero font-bold' : 'text-muted hover:text-ivoire'
                }`}
              >
                Toutes ({allTables.length})
              </button>
              {restaurantAreas.map(a => (
                <button
                  key={a.id}
                  onClick={() => setSelectedArea(a.id)}
                  className={`py-1.5 px-3 rounded text-xs font-mono uppercase tracking-wider transition-all ${
                    selectedArea === a.id ? 'bg-or text-nero font-bold' : 'text-muted hover:text-ivoire'
                  }`}
                >
                  {a.name.fr}
                </button>
              ))}
            </div>

            {/* Base URL modifier & Presets */}
            <div className="flex flex-wrap items-center gap-2 text-muted">
              <span>URL Domaine :</span>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="bg-surface border border-white/15 px-2.5 py-1 text-xs text-ivoire font-mono rounded w-64 focus:border-or focus:outline-none"
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setBaseUrl('http://192.168.100.229:5173')}
                  className="px-2 py-0.5 bg-or/15 hover:bg-or hover:text-nero text-or border border-or/40 rounded text-[10px] font-mono transition-all"
                  title="Pour scanner avec un téléphone sur le même Wi-Fi"
                >
                  Wi-Fi Mobile (192.168.100.229)
                </button>
                <button
                  type="button"
                  onClick={() => setBaseUrl('https://lucente-milano.com')}
                  className="px-2 py-0.5 bg-surface hover:bg-white/10 text-muted hover:text-ivoire border border-white/10 rounded text-[10px] font-mono transition-all"
                >
                  Production
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stands Grid (Printable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 print:grid-cols-2 print:gap-6">
          {filteredTables.map((table) => {
            const qrData = qrCodes[table.id];

            return (
              <div 
                key={table.id}
                className="relative bg-[#10100E] border-2 border-[#B89B5E] p-8 text-center rounded-sm shadow-2xl flex flex-col justify-between items-center break-inside-avoid print:border-black print:text-black print:bg-white"
              >
                {/* Gold Inner Frame */}
                <div className="absolute inset-2 border border-[#B89B5E]/30 pointer-events-none print:border-black/30" />

                {/* Card Top Branding */}
                <div className="space-y-1 mb-5">
                  <span className="font-serif-luxury tracking-[0.25em] text-[#B89B5E] text-xs uppercase block font-semibold print:text-black">
                    LUCENTE
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#F2EBDD]/70 uppercase block print:text-black/80">
                    ALTA CUCINA CONTEMPORANEA · MILANO
                  </span>
                  <div className="w-8 h-[1px] bg-[#B89B5E] mx-auto mt-2 print:bg-black" />
                </div>

                {/* Table ID & Name */}
                <div className="mb-4 space-y-0.5">
                  <div className="font-mono text-xs uppercase tracking-widest text-[#B89B5E] font-bold print:text-black">
                    TABLE {table.number}
                  </div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#F2EBDD] font-light print:text-black">
                    {table.name}
                  </h3>
                  <p className="text-[10px] text-muted font-serif italic print:text-black/60">
                    {table.areaSubtitle?.fr || table.shape}
                  </p>
                </div>

                {/* QR Code Container with Ivory Plate */}
                <div className="my-3 p-3 bg-[#F2EBDD] rounded-sm shadow-inner border border-[#B89B5E]/60 inline-block">
                  {qrData ? (
                    <img 
                      src={qrData} 
                      alt={`QR Code Table ${table.number}`} 
                      className="w-44 h-44 mx-auto object-contain"
                    />
                  ) : (
                    <div className="w-44 h-44 flex items-center justify-center text-nero font-mono text-xs">
                      Génération du QR...
                    </div>
                  )}
                </div>

                {/* Instruction Bottom */}
                <div className="mt-4 space-y-1">
                  <div className="font-serif text-xs text-[#F2EBDD] font-medium print:text-black">
                    Scannez avec votre smartphone
                  </div>
                  <p className="text-[10px] text-muted italic max-w-[200px] mx-auto print:text-black/70">
                    Pour consulter la carte, personnaliser vos mets & commander à votre rythme.
                  </p>
                  <div className="pt-2 text-[9px] font-mono text-[#B89B5E] print:text-black/60">
                    {baseUrl.replace(/^https?:\/\//, '')}/table/{table.id}
                  </div>
                </div>

                {/* Action buttons (Hidden on print) */}
                <div className="mt-5 pt-3 border-t border-white/10 w-full flex items-center justify-between text-xs print:hidden">
                  <a
                    href={`/table/${table.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted hover:text-or transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <span>Tester</span>
                    <ExternalLink size={11} />
                  </a>

                  <button
                    onClick={() => handleDownloadQr(table)}
                    className="text-or hover:text-or-light transition-colors flex items-center gap-1 text-[11px] font-mono"
                  >
                    <Download size={11} />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </>
  );
}

