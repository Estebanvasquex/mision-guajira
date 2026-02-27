import OrderForm from '@/components/OrderForm';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
            Misión Cristiana La Guajira
          </h1>
          <p className="text-gray-600">
            Apoya nuestra misión con un cuadro personalizado
          </p>
        </header>
        
        <OrderForm />
      </div>
    </main>
  );
}
