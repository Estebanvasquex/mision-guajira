'use client';

import { useState } from 'react';
import { FRAME_STYLES } from '@/lib/constants';

interface Order {
  id: string;
  name: string;
  phone: string;
  deliveryMethod: string;
  address?: string;
  frameStyle: number;
  color?: string;
  verse?: string;
  customMessage?: string;
  paymentProof?: string;
  status: string;
  createdAt: string;
}

interface Props {
  order: Order;
  onUpdateStatus: (orderId: string, status: string) => void;
}

export default function OrderCard({ order, onUpdateStatus }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [showProof, setShowProof] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-wayuu-yellow text-wayuu-brown';
      case 'confirmed': return 'bg-wayuu-blue text-white';
      case 'completed': return 'bg-wayuu-green text-white';
      case 'cancelled': return 'bg-gray-400 text-white';
      default: return 'bg-gray-200 text-wayuu-brown';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const frameStyle = FRAME_STYLES.find(f => f.id === order.frameStyle);

  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-wayuu-orange overflow-hidden">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-wayuu-brown text-lg">{order.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <p className="text-sm text-wayuu-brown/70">
              📱 {order.phone} • 📅 {formatDate(order.createdAt)}
            </p>
            <p className="text-sm text-wayuu-brown/70 mt-1">
              {order.deliveryMethod === 'delivery' ? '🚚 Envío a domicilio' : '📍 Recoger en punto'}
            </p>
          </div>
          <button className="text-wayuu-orange">
            <svg 
              className={`w-6 h-6 transition-transform ${expanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
          {/* Delivery Info */}
          {order.address && (
            <div>
              <p className="text-sm font-semibold text-wayuu-brown mb-1">Dirección de envío:</p>
              <p className="text-sm text-wayuu-brown/80">{order.address}</p>
            </div>
          )}

          {/* Frame & Color */}
          <div>
            <p className="text-sm font-semibold text-wayuu-brown mb-2">Diseño del cuadro:</p>
            <div className="flex items-center gap-3">
              <span className="text-sm text-wayuu-brown/80">{frameStyle?.name}</span>
              {order.color && (
                <div className="flex gap-2 items-center">
                  <span className="text-xs text-wayuu-brown/60">Color:</span>
                  <div 
                    className="w-8 h-8 rounded border border-wayuu-brown/20 shadow-sm" 
                    style={{ backgroundColor: order.color }}
                    title="Color seleccionado"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-sm font-semibold text-wayuu-brown mb-1">Mensaje:</p>
            <p className="text-sm text-wayuu-brown/80 italic">
              {order.verse || order.customMessage || 'Sin mensaje'}
            </p>
          </div>

          {/* Payment Proof */}
          {order.paymentProof && (
            <div>
              <p className="text-sm font-semibold text-wayuu-brown mb-2">Comprobante de pago:</p>
              <button
                onClick={() => setShowProof(!showProof)}
                className="px-4 py-2 bg-wayuu-blue text-white rounded-lg text-sm font-medium hover:bg-wayuu-blue/90 transition-colors"
              >
                {showProof ? 'Ocultar' : 'Ver'} comprobante
              </button>
              {showProof && (
                <div className="mt-3">
                  <img 
                    src={order.paymentProof} 
                    alt="Comprobante de pago" 
                    className="max-w-full h-auto rounded-lg border border-wayuu-orange/30"
                  />
                </div>
              )}
            </div>
          )}

          {/* Status Actions */}
          <div>
            <p className="text-sm font-semibold text-wayuu-brown mb-2">Cambiar estado:</p>
            <div className="flex flex-wrap gap-2">
              {['pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => onUpdateStatus(order.id, status)}
                  disabled={order.status === status}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    order.status === status
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white border border-wayuu-orange text-wayuu-brown hover:bg-wayuu-sand'
                  }`}
                >
                  {getStatusLabel(status)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
