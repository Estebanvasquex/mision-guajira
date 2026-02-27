'use client';

import { useState } from 'react';
import { OrderFormData } from '@/lib/types';
import { BIBLE_VERSES } from '@/lib/constants';

interface Props {
  data: Partial<OrderFormData>;
  onUpdate: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function MessageStep({ data, onUpdate, onNext, onBack }: Props) {
  const [useCustomMessage, setUseCustomMessage] = useState(!!data.customMessage);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!useCustomMessage && !data.verse) {
      setError('Selecciona un versículo o escribe un mensaje personalizado');
      return;
    }
    
    if (useCustomMessage && !data.customMessage?.trim()) {
      setError('Escribe un mensaje personalizado');
      return;
    }

    if (useCustomMessage && data.customMessage && data.customMessage.length > 100) {
      setError('El mensaje no puede superar los 100 caracteres');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Mensaje del Cuadro
      </h2>

      <div className="space-y-3">
        <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            checked={!useCustomMessage}
            onChange={() => {
              setUseCustomMessage(false);
              onUpdate({ customMessage: undefined });
              setError('');
            }}
            className="w-5 h-5 text-blue-600"
          />
          <span className="ml-3 text-gray-900 font-medium">
            Elegir un versículo bíblico
          </span>
        </label>

        <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            checked={useCustomMessage}
            onChange={() => {
              setUseCustomMessage(true);
              onUpdate({ verse: undefined });
              setError('');
            }}
            className="w-5 h-5 text-blue-600"
          />
          <span className="ml-3 text-gray-900 font-medium">
            Escribir mensaje personalizado
          </span>
        </label>
      </div>

      {!useCustomMessage ? (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona un versículo
          </label>
          {BIBLE_VERSES.map((verse, index) => (
            <label
              key={index}
              className={`block p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                data.verse === verse ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <input
                type="radio"
                name="verse"
                checked={data.verse === verse}
                onChange={() => {
                  onUpdate({ verse });
                  setError('');
                }}
                className="sr-only"
              />
              <p className="text-sm text-gray-800">{verse}</p>
            </label>
          ))}
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tu mensaje personalizado (máx. 100 caracteres)
          </label>
          <textarea
            className="input-field"
            rows={4}
            maxLength={100}
            value={data.customMessage || ''}
            onChange={e => {
              onUpdate({ customMessage: e.target.value });
              setError('');
            }}
            placeholder="Escribe tu mensaje aquí..."
          />
          <p className="text-sm text-gray-500 mt-1 text-right">
            {data.customMessage?.length || 0}/100
          </p>
        </div>
      )}

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
