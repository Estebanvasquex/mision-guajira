'use client';

import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';

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

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/admin/orders' 
        : `/api/admin/orders?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    completed: orders.filter(o => o.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border-t-4 border-wayuu-orange shadow-sm">
          <p className="text-sm text-wayuu-brown/70">Total</p>
          <p className="text-2xl font-bold text-wayuu-brown">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-t-4 border-wayuu-yellow shadow-sm">
          <p className="text-sm text-wayuu-brown/70">Pendientes</p>
          <p className="text-2xl font-bold text-wayuu-brown">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-t-4 border-wayuu-blue shadow-sm">
          <p className="text-sm text-wayuu-brown/70">Confirmados</p>
          <p className="text-2xl font-bold text-wayuu-brown">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-lg p-4 border-t-4 border-wayuu-green shadow-sm">
          <p className="text-sm text-wayuu-brown/70">Completados</p>
          <p className="text-2xl font-bold text-wayuu-brown">{stats.completed}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {[
            { value: 'all', label: 'Todos' },
            { value: 'pending', label: 'Pendientes' },
            { value: 'confirmed', label: 'Confirmados' },
            { value: 'completed', label: 'Completados' },
            { value: 'cancelled', label: 'Cancelados' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === value
                  ? 'bg-gradient-to-r from-wayuu-orange to-wayuu-red text-white shadow-md'
                  : 'bg-gray-100 text-wayuu-brown hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-wayuu-orange border-t-transparent rounded-full animate-spin"></div>
          <p className="text-wayuu-brown mt-4">Cargando pedidos...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-wayuu-brown/70">No hay pedidos para mostrar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdateStatus={updateOrderStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}
