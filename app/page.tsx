import OrderForm from '@/components/OrderForm';

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4 bg-accent">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-light mb-3">
            Misión Cristiana La Guajira
          </h1>
          <p className="text-primary-dark text-lg font-medium">
            Apoya nuestra misión con un cuadro personalizado
          </p>
        </header>
        
        <OrderForm />
      </div>
    </main>
  );
}
