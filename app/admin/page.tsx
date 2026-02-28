'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verificar si ya hay una sesión activa
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      if (response.ok) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-wayuu-orange border-t-transparent rounded-full animate-spin"></div>
          <p className="text-wayuu-brown mt-4">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-wayuu-red via-wayuu-orange to-wayuu-yellow bg-clip-text text-transparent">
              Panel de Administración
            </h1>
            <p className="text-wayuu-brown mt-2">
              Gestiona los pedidos de cuadros personalizados
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white border-2 border-wayuu-red text-wayuu-red rounded-lg font-medium hover:bg-wayuu-red hover:text-white transition-colors"
          >
            Cerrar sesión
          </button>
        </header>
        
        <AdminDashboard />
      </div>
    </main>
  );
}
