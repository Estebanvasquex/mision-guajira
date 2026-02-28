'use client';

import { useState } from 'react';
import { OrderFormData } from '@/lib/types';
import { FRAME_STYLES } from '@/lib/constants';
import Image from 'next/image';

interface Props {
  data: Partial<OrderFormData>;
  onUpdate: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function FrameSelectionStep({ data, onUpdate, onNext, onBack }: Props) {
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!data.frameStyle) {
      setError('Por favor selecciona un estilo de cuadro');
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-wayuu-red to-wayuu-orange bg-clip-text text-transparent mb-4">
        Selecciona el Estilo del Cuadro
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FRAME_STYLES.map(frame => (
          <div
            key={frame.id}
            onClick={() => {
              onUpdate({ frameStyle: frame.id });
              setError('');
            }}
            className={`cursor-pointer border-4 rounded-lg overflow-hidden transition-all ${
              data.frameStyle === frame.id
                ? 'border-wayuu-orange shadow-lg ring-2 ring-wayuu-yellow'
                : 'border-gray-200 hover:border-wayuu-orange/50'
            }`}
          >
            <div className="relative h-48 bg-gradient-to-br from-wayuu-sand to-orange-50 flex items-center justify-center">
              <span className="text-wayuu-brown/50 text-sm">
                Imagen de ejemplo {frame.id}
              </span>
            </div>
            <div className="p-3 bg-white">
              <p className="font-semibold text-center text-wayuu-brown">{frame.name}</p>
            </div>
          </div>
        ))}
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
