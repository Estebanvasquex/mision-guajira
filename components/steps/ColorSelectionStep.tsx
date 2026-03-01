'use client';

import { useState } from 'react';
import { OrderFormData } from '@/lib/types';
import { COLOR_PALETTE } from '@/lib/constants';

interface Props {
  data: Partial<OrderFormData>;
  onUpdate: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ColorSelectionStep({ data, onUpdate, onNext, onBack }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>(data.color1 || '');
  const [error, setError] = useState('');

  const selectColor = (hex: string) => {
    setSelectedColor(hex);
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedColor) {
      setError('Selecciona un color');
      return;
    }
    
    onUpdate({
      color1: selectedColor,
      color2: undefined,
      color3: undefined,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-light mb-2">
          Elige el Color
        </h2>
        <p className="text-primary-dark text-sm">
          Selecciona el color de fondo de tu cuadro
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {COLOR_PALETTE.map(color => {
          const isSelected = selectedColor === color.hex;
          
          return (
            <div
              key={color.hex}
              onClick={() => selectColor(color.hex)}
              className={`cursor-pointer border rounded-lg p-4 transition-all ${
                isSelected
                  ? 'border-primary shadow-lg bg-accent'
                  : 'border-primary/20 hover:border-primary/50'
              }`}
            >
              <div
                className="w-full h-20 rounded-md mb-2 border border-primary/20 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm font-medium text-center text-primary-light">{color.name}</p>
              {isSelected && (
                <p className="text-xs text-primary text-center mt-1 font-bold">
                  ✓ Seleccionado
                </p>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Atrás
        </button>
        <button onClick={handleSubmit} className="btn-primary flex-1">
          Continuar
        </button>
      </div>
    </div>
  );
}
