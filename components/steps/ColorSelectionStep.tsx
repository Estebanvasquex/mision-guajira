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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-wayuu-red to-wayuu-orange bg-clip-text text-transparent mb-2">
          Elige el Color
        </h2>
        <p className="text-wayuu-brown text-sm">
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
              className={`cursor-pointer border-4 rounded-lg p-4 transition-all ${
                isSelected
                  ? 'border-wayuu-orange shadow-lg ring-2 ring-wayuu-yellow'
                  : 'border-gray-200 hover:border-wayuu-orange/50'
              }`}
            >
              <div
                className="w-full h-20 rounded-md mb-2 border-2 border-wayuu-brown/20 shadow-sm"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm font-medium text-center text-wayuu-brown">{color.name}</p>
              {isSelected && (
                <p className="text-xs text-wayuu-orange text-center mt-1 font-bold">
                  ✓ Seleccionado
                </p>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-wayuu-red text-sm text-center font-medium">{error}</p>}

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
