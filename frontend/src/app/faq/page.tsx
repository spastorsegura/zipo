import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ZIPO_COLORS } from '@/lib/colors';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes - Zipo',
  description: 'Resuelve tus dudas sobre productos, envíos y compras en Zipo.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: ZIPO_COLORS.background }}>
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: ZIPO_COLORS.text }}>
              Preguntas Frecuentes
            </h1>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: ZIPO_COLORS.text }}>
                  ¿Cuáles son los métodos de pago?
                </h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Aceptamos tarjetas de crédito/débito, transferencias bancarias, Yape y Plin.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: ZIPO_COLORS.text }}>
                  ¿Hacen envíos a todo el Perú?
                </h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Sí, realizamos envíos a todo el Perú. Los tiempos varían según la ubicación.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: ZIPO_COLORS.text }}>
                  ¿Cuál es el tiempo de entrega en Lima?
                </h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  En Lima Metropolitana la entrega es de 24-48 horas hábiles.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: ZIPO_COLORS.text }}>
                  ¿Puedo devolver un producto?
                </h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Sí, aceptamos devoluciones dentro de 30 días si el producto está en su estado original.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: ZIPO_COLORS.text }}>
                  ¿Los productos son seguros para niños?
                </h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Todos nuestros productos cumplen con los estándares de seguridad internacionales y están certificados.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-3" style={{ color: ZIPO_COLORS.text }}>
                  ¿Cómo puedo contactarlos?
                </h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Puedes escribirnos a hola@zipo.com, llamarnos al +51 976 317 906 o usar nuestro chat de WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
