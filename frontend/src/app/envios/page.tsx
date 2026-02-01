import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ZIPO_COLORS } from '@/lib/colors';

export const metadata: Metadata = {
  title: 'Envíos - Zipo',
  description: 'Información sobre envíos y entregas de productos Zipo a todo el Perú.',
};

export default function EnviosPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: ZIPO_COLORS.background }}>
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: ZIPO_COLORS.text }}>
              Envíos y Entregas
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                    ¿Dónde enviamos?
                  </h2>
                  <p className="mb-4" style={{ color: ZIPO_COLORS.gray[600] }}>
                    Realizamos envíos a todo el Perú con nuestras opciones de entrega:
                  </p>
                  <ul className="list-disc list-inside space-y-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                    <li>Lima Metropolitana</li>
                    <li>Callao</li>
                    <li>Todas las provincias del Perú</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                    Tiempos de entrega
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: ZIPO_COLORS.gray[50] }}>
                      <span style={{ color: ZIPO_COLORS.text }}>Lima Metropolitana</span>
                      <span className="font-medium" style={{ color: ZIPO_COLORS.primary }}>24-48 horas</span>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg" style={{ backgroundColor: ZIPO_COLORS.gray[50] }}>
                      <span style={{ color: ZIPO_COLORS.text }}>Provincias</span>
                      <span className="font-medium" style={{ color: ZIPO_COLORS.primary }}>3-5 días hábiles</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                    Costos de envío
                  </h2>
                  <p className="mb-4" style={{ color: ZIPO_COLORS.gray[600] }}>
                    Los costos de envío varían según la ubicación y el peso del pedido:
                  </p>
                  <ul className="list-disc list-inside space-y-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                    <li>Gratis en pedidos mayores a S/. 150</li>
                    <li>S/. 15 - S/. 25 en Lima Metropolitana</li>
                    <li>S/. 25 - S/. 45 a provincias</li>
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                    Métodos de pago
                  </h2>
                  <ul className="list-disc list-inside space-y-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                    <li>Tarjeta de crédito/débito</li>
                    <li>Transferencia bancaria</li>
                    <li>Yape</li>
                    <li>Plin</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
