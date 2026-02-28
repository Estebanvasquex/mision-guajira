import OrderForm from '@/components/OrderForm';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="h-1 w-32 bg-gradient-to-r from-wayuu-red via-wayuu-orange to-wayuu-yellow rounded-full mx-auto mb-4"></div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-wayuu-red via-wayuu-orange to-wayuu-yellow bg-clip-text text-transparent mb-3">
            Misión Cristiana La Guajira
          </h1>
          <p className="text-wayuu-brown text-lg font-medium">
            Apoya nuestra misión con un cuadro personalizado
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-wayuu-yellow via-wayuu-green to-wayuu-blue rounded-full mx-auto mt-4"></div>
        </header>
        
        <OrderForm />
      </div>
    </main>
  );
}
