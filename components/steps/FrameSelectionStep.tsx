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
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleSubmit = () => {
    if (!data.frameStyle) {
      setError('Por favor selecciona un estilo de cuadro');
      return;
    }
    onNext();
  };

  const handleImageError = (frameId: number) => {
    setImageErrors(prev => ({ ...prev, [frameId]: true }));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-light mb-4">
        Selecciona el estilo del cuadro
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FRAME_STYLES.map(frame => (
          <div
            key={frame.id}
            onClick={() => {
              onUpdate({ frameStyle: frame.id });
              setError('');
            }}
            className={`cursor-pointer border rounded-lg overflow-hidden transition-all ${
              data.frameStyle === frame.id
                ? 'border-primary shadow-lg bg-accent'
                : 'border-primary/20 hover:border-primary/50'
            }`}
          >
            <div className="relative h-48 bg-accent">
              {!imageErrors[frame.id] ? (
                <Image
                  src={frame.image}
                  alt={frame.name}
                  fill
                  className="object-contain p-2"
                  onError={() => handleImageError(frame.id)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-primary-light/50 text-sm text-center px-4">
                    Imagen de ejemplo {frame.id}
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 bg-white">
              <p className="font-semibold text-center text-primary-light">{frame.name}</p>
            </div>
          </div>
        ))}
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
