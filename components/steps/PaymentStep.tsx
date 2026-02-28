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

  // Calcular el total
  const FRAME_PRICE = 20000;
  const DELIVERY_COST = 10000;
  const total = data.deliveryMethod === 'delivery' 
    ? FRAME_PRICE + DELIVERY_COST 
    : FRAME_PRICE;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

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
        <div className="w-20 h-20 bg-gradient-to-r from-wayuu-orange to-wayuu-red rounded-full flex items-center justify-center mx-auto shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-wayuu-red to-wayuu-orange bg-clip-text text-transparent">
          ¡Pedido Recibido!
        </h2>
        <p className="text-wayuu-brown">
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
      <h2 className="text-2xl font-bold bg-gradient-to-r from-wayuu-red to-wayuu-orange bg-clip-text text-transparent mb-4">
        Comprobante de Pago
      </h2>

      <div className="bg-[#fff7ed] border-2 border-wayuu-blue rounded-lg p-4">
        <h3 className="font-semibold text-wayuu-brown mb-2">
          Información de Pago
        </h3>
        <p className="text-sm text-wayuu-brown/80 mb-2">
          Realiza tu transferencia a:
        </p>
        <ul className="text-sm text-wayuu-brown space-y-1">
          <li><span className="font-medium">Banco:</span> Bancolombia</li>
          <li><span className="font-medium">Cuenta:</span> 00861713547</li>
          <li><span className="font-medium">Titular:</span> Vanessa Henao Zuluaga</li>
        </ul>
      </div>

      <div className="bg-[#fff7ed] border-2 border-wayuu-orange rounded-lg p-4">
        <h3 className="font-semibold text-wayuu-brown mb-3">Resumen del Pedido</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-wayuu-brown/80">Cuadro personalizado</span>
            <span className="text-wayuu-brown font-medium">{formatPrice(20000)}</span>
          </div>
          {data.deliveryMethod === 'delivery' && (
            <div className="flex justify-between">
              <span className="text-wayuu-brown/80">Envío a domicilio</span>
              <span className="text-wayuu-brown font-medium">{formatPrice(10000)}</span>
            </div>
          )}
          <div className="border-t-2 border-wayuu-orange/30 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-wayuu-brown font-bold">Total a pagar</span>
              <span className="text-wayuu-orange font-bold text-lg">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t-2 border-wayuu-yellow/30">
          <p className="text-sm text-wayuu-brown text-center font-medium">
             ¿Te gustaría bendecir un poco más? 
          </p>
          <p className="text-xs text-wayuu-brown/70 text-center mt-1">
            Cada aporte adicional multiplica el impacto de nuestra misión
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-wayuu-brown mb-2">
          Adjuntar comprobante de pago *
        </label>
        <div className="border-2 border-dashed border-wayuu-orange/50 rounded-lg p-6 text-center hover:border-wayuu-orange hover:bg-wayuu-sand/30 transition-colors">
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
            id="payment-proof"
          />
          <label htmlFor="payment-proof" className="cursor-pointer">
            <svg className="w-12 h-12 text-wayuu-orange mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-wayuu-brown font-medium">
              {file ? file.name : 'Haz clic para seleccionar un archivo'}
            </p>
            <p className="text-xs text-wayuu-brown/60 mt-1">
              PNG, JPG o PDF (máx. 5MB)
            </p>
          </label>
        </div>
      </div>

      {error && <p className="text-wayuu-red text-sm text-center font-medium">{error}</p>}

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
