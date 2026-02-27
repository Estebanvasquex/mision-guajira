'use client';

import { useState } from 'react';
import { OrderFormData } from '@/lib/types';

interface Props {
  data: Partial<OrderFormData>;
  onUpdate: (data: Partial<OrderFormData>) => void;
  onBack: () => void;
}

export default function PaymentStep({ data, onUpdate, onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('El archivo no puede superar los 5MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Por favor adjunta el comprobante de pago');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Convertir archivo a base64 para enviar
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            paymentProof: base64,
          }),
        });

        if (!response.ok) throw new Error('Error al enviar el pedido');

        setSuccess(true);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Error al enviar el pedido. Intenta nuevamente.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          ¡Pedido Recibido!
        </h2>
        <p className="text-gray-600">
          Gracias por apoyar nuestra misión. Te contactaremos pronto para confirmar tu pedido.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Hacer otro pedido
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Comprobante de Pago
      </h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Información de Pago
        </h3>
        <p className="text-sm text-blue-800 mb-2">
          Realiza tu transferencia a:
        </p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>Banco: [Nombre del Banco]</li>
          <li>Cuenta: [Número de Cuenta]</li>
          <li>Titular: [Nombre del Titular]</li>
          <li>Valor: $[Precio]</li>
        </ul>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Adjuntar comprobante de pago *
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
            id="payment-proof"
          />
          <label htmlFor="payment-proof" className="cursor-pointer">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600">
              {file ? file.name : 'Haz clic para seleccionar un archivo'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG o PDF (máx. 5MB)
            </p>
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1" disabled={loading}>
          Atrás
        </button>
        <button
          onClick={handleSubmit}
          className="btn-primary flex-1"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Pedido'}
        </button>
      </div>
    </div>
  );
}
