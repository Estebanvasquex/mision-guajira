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
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
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
                ? 'border-blue-600 shadow-lg'
                : 'border-gray-200 hover:border-gray-400'
            }`}
          >
            <div className="relative h-48 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">
                Imagen de ejemplo {frame.id}
              </span>
            </div>
            <div className="p-3 bg-white">
              <p className="font-semibold text-center">{frame.name}</p>
            </div>
          </div>
        ))}
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
