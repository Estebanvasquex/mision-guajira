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
  const [selectedColors, setSelectedColors] = useState<string[]>([
    data.color1 || '',
    data.color2 || '',
    data.color3 || '',
  ].filter(Boolean));
  const [error, setError] = useState('');

  const toggleColor = (hex: string) => {
    if (selectedColors.includes(hex)) {
      setSelectedColors(selectedColors.filter(c => c !== hex));
    } else if (selectedColors.length < 3) {
      setSelectedColors([...selectedColors, hex]);
    }
    setError('');
  };

  const handleSubmit = () => {
    if (selectedColors.length < 2) {
      setError('Selecciona al menos 2 colores');
      return;
    }
    
    onUpdate({
      color1: selectedColors[0],
      color2: selectedColors[1],
      color3: selectedColors[2] || undefined,
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Elige los Colores
        </h2>
        <p className="text-gray-600 text-sm">
          Selecciona 2 o 3 colores para tu cuadro ({selectedColors.length}/3)
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {COLOR_PALETTE.map(color => {
          const isSelected = selectedColors.includes(color.hex);
          const position = selectedColors.indexOf(color.hex) + 1;
          
          return (
            <div
              key={color.hex}
              onClick={() => toggleColor(color.hex)}
              className={`cursor-pointer border-4 rounded-lg p-4 transition-all ${
                isSelected
                  ? 'border-blue-600 shadow-lg'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <div
                className="w-full h-20 rounded-md mb-2 border border-gray-300"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm font-medium text-center">{color.name}</p>
              {isSelected && (
                <p className="text-xs text-blue-600 text-center mt-1">
                  Color {position}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
