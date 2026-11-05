import React, { useState } from 'react';
import { X, Plus, Minus, Wine, AlertCircle, Utensils, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TableItemModal({ item, isOpen, onClose, onAddToCart }) {
  const { lang, t } = useLanguage();

  const isMeatOrFish = item?.category === 'SECONDI PIATTI' || 
    (item?.name && (item.name.includes('Chianina') || item.name.includes('Triglia') || item.name.includes('Fassona')));

  const [cooking, setCooking] = useState(isMeatOrFish ? 'al_punto' : '');
  const [includePairing, setIncludePairing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [serviceRound, setServiceRound] = useState('direct'); // 'antipasti' | 'secondi' | 'dolci' | 'direct'
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [customNote, setCustomNote] = useState('');

  if (!isOpen || !item) return null;

  const parsePrice = (priceStr) => {
    return parseInt(String(priceStr).replace(/[^0-9]/g, ''), 10) || 0;
  };

  const basePrice = parsePrice(item.price);
  const pairingPrice = item.pairingPrice ? parsePrice(item.pairingPrice) : (item.pairing ? 35 : 0);
  const unitPrice = basePrice + (includePairing ? pairingPrice : 0);
  const totalPrice = unitPrice * quantity;

  const toggleAllergy = (allergy) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  const handleConfirm = () => {
    onAddToCart({
      id: `${item.name}-${Date.now()}`,
      name: item.name,
      basePrice,
      price: unitPrice,
      quantity,
      cooking: isMeatOrFish ? cooking : null,
      winePairing: includePairing ? (item.pairing || 'Accord Sommelier') : null,
      serviceRound,
      allergies: selectedAllergies,
      notes: customNote,
      image: item.image
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nero/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-surface-card border border-or/40 shadow-2xl shadow-black rounded-sm p-6 sm:p-8 text-ivoire"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-nero/70 border border-white/10 flex items-center justify-center text-muted hover:text-or hover:border-or/60 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Dish Title & Price */}
        <div className="border-b border-or-subtle pb-5 mb-5">
          <div className="typo-metadata text-[10px] text-or uppercase tracking-widest mb-1.5 font-mono">
            Alta Cucina · Personnalisation
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-ivoire">
            {item.name}
          </h3>
          <p className="font-mono text-or text-lg mt-1 font-semibold">
            {item.price}
          </p>
          {item.description && (
            <p className="typo-editorial text-sm text-ivoire/75 mt-3 leading-relaxed italic">
              « {typeof item.description === 'object' ? (item.description[lang] || item.description.fr) : item.description} »
            </p>
          )}
        </div>

        {/* Options Container */}
        <div className="space-y-6">

          {/* Cooking choice if meat/fish */}
          {isMeatOrFish && (
            <div>
              <label className="block typo-metadata text-xs uppercase tracking-wider text-or mb-2.5">
                Cuisson Souhaitée
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'al_sangue', label: 'Saignant (Al Sangue)' },
                  { id: 'al_punto', label: 'À point (Al Punto)' },
                  { id: 'ben_cotto', label: 'Bien cuit (Ben Cotto)' }
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setCooking(option.id)}
                    className={`py-2 px-2.5 text-xs text-center border transition-all ${
                      cooking === option.id
                        ? 'border-or bg-or/15 text-or font-medium'
                        : 'border-white/10 bg-nero/40 text-muted hover:border-white/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sommelier Wine Pairing Recommendation */}
          {item.pairing && (
            <div className="p-3.5 bg-surface border border-or-subtle/40 rounded-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-2.5">
                  <Wine size={18} className="text-or shrink-0 mt-0.5" />
                  <div>
                    <h4 className="typo-metadata text-[11px] uppercase tracking-wider text-or font-medium">
                      Accord Sommelier Gianluca Ferri
                    </h4>
                    <p className="text-xs text-ivoire/80 mt-0.5 font-serif italic">
                      {item.pairing}
                    </p>
                    <span className="typo-metadata text-[10px] text-or/80 mt-1 inline-block">
                      + {pairingPrice} € / verre d'exception
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIncludePairing(!includePairing)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider font-mono border transition-all shrink-0 ${
                    includePairing 
                      ? 'bg-or text-nero border-or font-bold' 
                      : 'border-or-subtle text-or hover:bg-or/10'
                  }`}
                >
                  {includePairing ? 'Sélectionné' : '+ Ajouter'}
                </button>
              </div>
            </div>
          )}

          {/* Service Round (Envoi) */}
          <div>
            <label className="block typo-metadata text-xs uppercase tracking-wider text-or mb-2.5">
              Moment du Service
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'antipasti', label: '1er Envoi (Antipasto)' },
                { id: 'secondi', label: '2e Envoi (Plat)' },
                { id: 'direct', label: 'Dès que prêt' }
              ].map((round) => (
                <button
                  key={round.id}
                  type="button"
                  onClick={() => setServiceRound(round.id)}
                  className={`py-2 px-2 text-[11px] text-center border transition-all ${
                    serviceRound === round.id
                      ? 'border-or bg-or/15 text-or font-medium'
                      : 'border-white/10 bg-nero/40 text-muted hover:border-white/30'
                  }`}
                >
                  {round.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary Restrictions / Allergies */}
          <div>
            <label className="block typo-metadata text-xs uppercase tracking-wider text-or mb-2">
              Avis Allergies & Exclusions
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {['Sans Gluten', 'Sans Lactose', 'Sans Fruits à Coque', 'Végétarien'].map((all) => {
                const isSelected = selectedAllergies.includes(all);
                return (
                  <button
                    key={all}
                    type="button"
                    onClick={() => toggleAllergy(all)}
                    className={`px-2.5 py-1 text-[11px] border rounded-full transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'border-terracotta bg-terracotta/20 text-ivoire font-medium'
                        : 'border-white/10 text-muted hover:border-white/30'
                    }`}
                  >
                    {isSelected && <Check size={10} className="text-terracotta" />}
                    <span>{all}</span>
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="Note personnalisée pour le Chef Vincenzo (ex: sauce à part)..."
              className="w-full bg-nero/70 border border-white/15 focus:border-or px-3 py-2 text-xs text-ivoire placeholder:text-muted/50 focus:outline-none"
            />
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <span className="typo-metadata text-xs uppercase tracking-wider text-muted">
              Quantité
            </span>
            <div className="flex items-center gap-3 bg-nero border border-white/15 px-3 py-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Diminuer quantité"
                className="text-muted hover:text-or transition-colors p-1"
              >
                <Minus size={14} />
              </button>
              <span className="font-mono text-base font-semibold text-ivoire w-5 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Augmenter quantité"
                className="text-muted hover:text-or transition-colors p-1"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 border-t border-or-subtle pt-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono text-muted uppercase">Total Plat</div>
            <div className="font-mono text-xl sm:text-2xl text-or font-bold">
              {totalPrice} €
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 max-w-[300px] py-3.5 px-6 bg-or hover:bg-or-light text-nero font-medium typo-button text-xs uppercase tracking-widest transition-all shadow-lg shadow-or/20 flex items-center justify-center gap-2"
          >
            <Utensils size={15} />
            <span>Ajouter à la Table</span>
          </button>
        </div>
      </div>
    </div>
  );
}
