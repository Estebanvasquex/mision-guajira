'use client';

import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

export default function AdminLogin({ onLogin }: Props) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin();
      } else {
        setError(data.error || 'Contraseña incorrecta');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="h-1 w-32 bg-gradient-to-r from-wayuu-red via-wayuu-orange to-wayuu-yellow rounded-full mx-auto mb-4"></div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-wayuu-red via-wayuu-orange to-wayuu-yellow bg-clip-text text-transparent mb-2">
              Panel de Administración
            </h1>
            <p className="text-wayuu-brown/70">
              Ingresa la contraseña para acceder
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-wayuu-brown mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Ingresa tu contraseña"
                required
                autoFocus
              />
              {error && (
                <p className="text-wayuu-red text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-wayuu-brown/60 text-center">
              🔒 Acceso restringido solo para administradores
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
