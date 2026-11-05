import React, { useState } from 'react';
import { X, Wine, Coffee, Bell, CreditCard, CheckCircle2, Send } from 'lucide-react';
import { submitServiceCall } from '../utils/tableOrderManager';
import confetti from 'canvas-confetti';

export default function TableServiceModal({ table, isOpen, onClose, onCallSubmitted }) {
  const [activeTab, setActiveTab] = useState('sommelier'); // 'sommelier' | 'water_bread' | 'waiter' | 'bill'
  const [selectedWater, setSelectedWater] = useState('san_pellegrino');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  if (!isOpen || !table) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let callDetails = notes;
    if (activeTab === 'water_bread') {
      callDetails = `Eau: ${selectedWater === 'san_pellegrino' ? 'San Pellegrino (Gazeuse)' : 'Acqua Panna (Plate)'} + Pain au levain. ${notes}`;
    }

    try {
      await submitServiceCall({
        tableId: table.id,
        tableName: table.name,
        type: activeTab,
        notes: callDetails,
        paymentMethod: activeTab === 'bill' ? paymentMethod : null
      });

      if (activeTab === 'bill') {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#B89B5E', '#D4BD88', '#F2EBDD']
        });
      }

      setSubmittedMessage(
        activeTab === 'sommelier' ? 'Gianluca Ferri, Chef Sommelier, arrive à votre table.' :
        activeTab === 'water_bread' ? 'Votre eau fraîche et pain croustillant sont en route.' :
        activeTab === 'bill' ? `L'addition (${paymentMethod.toUpperCase()}) arrive auprès de votre serveur.` :
        'Un maître de rang se rend immédiatement à votre table.'
      );

      if (onCallSubmitted) onCallSubmitted(activeTab);

      setTimeout(() => {
        setSubmittedMessage('');
        setIsSubmitting(false);
        onClose();
      }, 2500);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nero/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-lg bg-surface-card border border-or/40 shadow-2xl shadow-black rounded-sm p-6 sm:p-8 text-ivoire"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-nero/70 border border-white/10 flex items-center justify-center text-muted hover:text-or transition-colors"
        >
          <X size={18} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 bg-or/10 border border-or/30 rounded-full typo-metadata text-[10px] text-or uppercase tracking-widest font-mono mb-2">
            Conciergerie de Table
          </div>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-ivoire">
            Service à Table
          </h3>
          <p className="typo-editorial text-xs text-muted mt-1">
            {table.name} · {table.areaSubtitle ? (table.areaSubtitle.fr || table.areaSubtitle) : ''}
          </p>
        </div>

        {submittedMessage ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-14 h-14 rounded-full bg-or/20 border border-or flex items-center justify-center mx-auto text-or">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-serif-luxury text-xl text-ivoire">Demande transmise avec succès</h4>
            <p className="text-sm text-or/90 font-serif italic max-w-sm mx-auto">
              {submittedMessage}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-6">
            {/* Tabs */}
            <div className="grid grid-cols-4 gap-1.5 bg-nero/60 p-1 border border-white/10 rounded-sm">
              {[
                { id: 'sommelier', label: 'Sommelier', icon: Wine },
                { id: 'water_bread', label: 'Eau & Pain', icon: Coffee },
                { id: 'waiter', label: 'Serveur', icon: Bell },
                { id: 'bill', label: 'Addition', icon: CreditCard }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 flex flex-col items-center gap-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                      isActive
                        ? 'bg-or text-nero font-bold shadow-md'
                        : 'text-muted hover:text-ivoire'
                    }`}
                  >
                    <Icon size={15} />
                    <span className="truncate">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab: Sommelier */}
            {activeTab === 'sommelier' && (
              <div className="space-y-3 bg-surface p-4 border border-or-subtle/30 rounded-sm">
                <p className="text-xs text-ivoire/85 leading-relaxed font-serif italic">
                  « Gianluca Ferri, Chef Sommelier, se fera un plaisir de vous orienter parmi les 1 400 références de la cave ou de vous proposer une dégustation au calice. »
                </p>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Une envie particulière ? (ex: Barolo, blanc minéral, accord précis...)"
                  className="w-full bg-nero/70 border border-white/15 focus:border-or px-3 py-2 text-xs text-ivoire placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            )}

            {/* Tab: Water & Bread */}
            {activeTab === 'water_bread' && (
              <div className="space-y-3 bg-surface p-4 border border-or-subtle/30 rounded-sm">
                <label className="block typo-metadata text-[11px] text-or uppercase tracking-wider">
                  Sélection d'Eau Minérale & Pain Artisanal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedWater('san_pellegrino')}
                    className={`py-2.5 px-3 text-xs border transition-all text-left ${
                      selectedWater === 'san_pellegrino'
                        ? 'border-or bg-or/15 text-or font-medium'
                        : 'border-white/10 text-muted'
                    }`}
                  >
                    <div className="font-semibold">San Pellegrino</div>
                    <div className="text-[10px] text-muted">Eau gazeuse naturelle</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedWater('acqua_panna')}
                    className={`py-2.5 px-3 text-xs border transition-all text-left ${
                      selectedWater === 'acqua_panna'
                        ? 'border-or bg-or/15 text-or font-medium'
                        : 'border-white/10 text-muted'
                    }`}
                  >
                    <div className="font-semibold">Acqua Panna</div>
                    <div className="text-[10px] text-muted">Eau plate de Toscane</div>
                  </button>
                </div>
                <p className="text-[10px] text-muted font-mono">
                  + Assortiment de focaccia pugliese et pain au levain de seigle inclus.
                </p>
              </div>
            )}

            {/* Tab: Waiter Call */}
            {activeTab === 'waiter' && (
              <div className="space-y-3 bg-surface p-4 border border-or-subtle/30 rounded-sm">
                <p className="text-xs text-ivoire/85 leading-relaxed font-serif italic">
                  « Le maître d'hôtel ou votre chef de rang dédié va se présenter à votre table dans les plus brefs délais. »
                </p>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Objet de la demande (ex: couverts supplémentaires, serviette...)"
                  className="w-full bg-nero/70 border border-white/15 focus:border-or px-3 py-2 text-xs text-ivoire placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            )}

            {/* Tab: Bill & Payment */}
            {activeTab === 'bill' && (
              <div className="space-y-4 bg-surface p-4 border border-or-subtle/30 rounded-sm">
                <label className="block typo-metadata text-[11px] text-or uppercase tracking-wider">
                  Moyen de Paiement Souhaité au Serveur
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'card', label: 'Carte Bancaire (TPE)' },
                    { id: 'amex', label: 'American Express' },
                    { id: 'cash', label: 'Espèces (€)' },
                    { id: 'company', label: 'Note de Frais Société' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setPaymentMethod(mode.id)}
                      className={`py-2 px-2.5 text-xs text-left border transition-all ${
                        paymentMethod === mode.id
                          ? 'border-or bg-or/15 text-or font-medium'
                          : 'border-white/10 text-muted'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Note particulière (ex: division de l'addition en deux...)"
                  className="w-full bg-nero/70 border border-white/15 focus:border-or px-3 py-2 text-xs text-ivoire placeholder:text-muted/50 focus:outline-none"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-or hover:bg-or-light text-nero font-medium typo-button text-xs uppercase tracking-widest transition-all shadow-lg shadow-or/20 flex items-center justify-center gap-2"
            >
              <Send size={14} />
              <span>Transmettre au Personnel de Salle</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
