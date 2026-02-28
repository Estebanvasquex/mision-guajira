import { redirect } from 'next/navigation';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  // En producción, aquí deberías verificar autenticación
  // Por ahora, es acceso directo
  
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-wayuu-red via-wayuu-orange to-wayuu-yellow bg-clip-text text-transparent">
            Panel de Administración
          </h1>
          <p className="text-wayuu-brown mt-2">
            Gestiona los pedidos de cuadros personalizados
          </p>
        </header>
        
        <AdminDashboard />
      </div>
    </main>
  );
}
