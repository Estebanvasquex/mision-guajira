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
      // Validar tamaño
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('El archivo no puede superar los 5MB');
        return;
      }
      
      // Validar tipo
      if (!selectedFile.type.startsWith('image/') && selectedFile.type !== 'application/pdf') {
        setError('Solo se permiten imágenes o PDF');
        return;
      }
      
      setFile(selectedFile);
      setError('');
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Redimensionar si es muy grande
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Comprimir a JPEG con calidad 0.7
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Por favor adjunta el comprobante de pago');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let fileData: string;
      
      // Si es PDF, convertir directamente
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        fileData = await new Promise((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else {
        // Si es imagen, comprimir primero
        fileData = await compressImage(file);
      }
      
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          paymentProof: fileData,
        }),
      });

      if (!response.ok) throw new Error('Error al enviar el pedido');

      setSuccess(true);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al enviar el pedido. Intenta nuevamente.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-light">
          ¡Pedido Recibido!
        </h2>
        <p className="text-primary-light">
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
      <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-light mb-4">
        Comprobante de Pago
      </h2>

      <div className="bg-accent border border-primary rounded-lg p-4">
        <h3 className="font-semibold text-primary-light mb-2">
          Información de Pago
        </h3>
        <p className="text-sm text-primary-dark mb-2">
          Realiza tu transferencia a:
        </p>
        <ul className="text-sm text-primary-light space-y-1">
          <li><span className="font-medium">Banco:</span> Bancolombia</li>
          <li><span className="font-medium">Cuenta:</span> 00861713547</li>
          <li><span className="font-medium">Titular:</span> Vanessa Henao Zuluaga</li>
        </ul>
      </div>

      <div className="bg-accent border border-primary rounded-lg p-4">
        <h3 className="font-semibold text-primary-light mb-3">Resumen del Pedido</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-primary-dark">Cuadro personalizado</span>
            <span className="text-primary-light font-medium">{formatPrice(20000)}</span>
          </div>
          {data.deliveryMethod === 'delivery' && (
            <div className="flex justify-between">
              <span className="text-primary-dark">Envío a domicilio</span>
              <span className="text-primary-light font-medium">{formatPrice(10000)}</span>
            </div>
          )}
          <div className="border-t border-primary/30 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-primary-light font-bold">Total a pagar</span>
              <span className="text-primary font-bold text-lg">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-primary/20">
          <p className="text-sm text-primary-light text-center font-medium">
             ¿Te gustaría bendecir un poco más? 
          </p>
          <p className="text-xs text-primary-dark text-center mt-1">
            Cada aporte adicional multiplica el impacto de nuestra misión
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-primary-dark mb-2">
          Adjuntar comprobante de pago *
        </label>
        <div className="border border-dashed border-primary/50 rounded-lg p-6 text-center hover:border-primary hover:bg-accent/50 transition-colors">
          <input
            type="file"
            accept="image/*,.pdf"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            id="payment-proof"
          />
          <label htmlFor="payment-proof" className="cursor-pointer">
            <svg className="w-12 h-12 text-primary mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-primary-light font-medium">
              {file ? file.name : 'Toca para tomar foto o seleccionar archivo'}
            </p>
            <p className="text-xs text-primary-dark mt-1">
              Foto o PDF (máx. 5MB)
            </p>
            {file && (
              <p className="text-xs text-primary mt-2 font-medium">
                ✓ Archivo seleccionado
              </p>
            )}
          </label>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}

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
