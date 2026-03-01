'use client';

import { useState } from 'react';
import { OrderFormData } from '@/lib/types';

interface Props {
  data: Partial<OrderFormData>;
  onUpdate: (data: Partial<OrderFormData>) => void;
  onNext: () => void;
}

export default function PersonalInfoStep({ data, onUpdate, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!data.name?.trim()) newErrors.name = 'El nombre es requerido';
    if (!data.phone?.trim()) newErrors.phone = 'El celular es requerido';
    if (data.deliveryMethod === 'delivery' && !data.address?.trim()) {
      newErrors.address = 'La dirección es requerida para envío';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-light mb-4">
        Información Personal
      </h2>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-2">
          Nombre completo *
        </label>
        <input
          type="text"
          className="input-field"
          value={data.name || ''}
          onChange={e => onUpdate({ name: e.target.value })}
          placeholder="Tu nombre"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-2">
          Celular *
        </label>
        <input
          type="tel"
          className="input-field"
          value={data.phone || ''}
          onChange={e => onUpdate({ phone: e.target.value })}
          placeholder="300 123 4567"
        />
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-3">
          ¿Cómo deseas recibir tu cuadro? *
        </label>
        <div className="space-y-3">
          <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
            data.deliveryMethod === 'pickup' 
              ? 'border-primary bg-accent' 
              : 'border-primary/20 hover:border-primary/50 hover:bg-accent/50'
          }`}>
            <div className="flex items-center">
              <input
                type="radio"
                name="delivery"
                checked={data.deliveryMethod === 'pickup'}
                onChange={() => onUpdate({ deliveryMethod: 'pickup', address: undefined })}
                className="w-5 h-5 text-primary accent-primary"
              />
              <span className="ml-3 text-primary-light font-medium">
                Recoger en punto de encuentro
              </span>
            </div>
            <span className="text-primary font-bold">Gratis</span>
          </label>
          
          <label className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
            data.deliveryMethod === 'delivery' 
              ? 'border-primary bg-accent' 
              : 'border-primary/20 hover:border-primary/50 hover:bg-accent/50'
          }`}>
            <div className="flex items-center">
              <input
                type="radio"
                name="delivery"
                checked={data.deliveryMethod === 'delivery'}
                onChange={() => onUpdate({ deliveryMethod: 'delivery' })}
                className="w-5 h-5 text-primary accent-primary"
              />
              <span className="ml-3 text-primary-light font-medium">
                Envío a domicilio
              </span>
            </div>
            <span className="text-primary font-bold">+$10.000</span>
          </label>
        </div>
      </div>

      {data.deliveryMethod === 'delivery' && (
        <div>
          <label className="block text-sm font-medium text-primary-dark mb-2">
            Dirección de envío *
          </label>
          <textarea
            className="input-field"
            rows={3}
            value={data.address || ''}
            onChange={e => onUpdate({ address: e.target.value })}
            placeholder="Calle, número, barrio, ciudad"
          />
          {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
        </div>
      )}

      <button type="submit" className="btn-primary w-full">
        Continuar
      </button>
    </form>
  );
}
