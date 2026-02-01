import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ZIPO_COLORS } from '@/lib/colors';

export const metadata: Metadata = {
  title: 'Contacto - Zipo',
  description: 'Contacta con Zipo. Estamos aquí para ayudarte con cualquier pregunta sobre nuestros productos infantiles.',
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: ZIPO_COLORS.background }}>
      <Header />
      
      <main className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: ZIPO_COLORS.text }}>
              Contacto
            </h1>
            
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                    Envíanos un mensaje
                  </h2>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: ZIPO_COLORS.text }}>
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: ZIPO_COLORS.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: ZIPO_COLORS.text }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: ZIPO_COLORS.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: ZIPO_COLORS.text }}>
                        Mensaje
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                        style={{ borderColor: ZIPO_COLORS.primary }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg font-medium text-white transition-colors"
                      style={{ backgroundColor: ZIPO_COLORS.primary }}
                    >
                      Enviar mensaje
                    </button>
                  </form>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                    Información de contacto
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2" style={{ color: ZIPO_COLORS.text }}>
                        Email
                      </h3>
                      <p style={{ color: ZIPO_COLORS.gray[600] }}>
                        hola@zipo.com
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2" style={{ color: ZIPO_COLORS.text }}>
                        Teléfono
                      </h3>
                      <p style={{ color: ZIPO_COLORS.gray[600] }}>
                        +51 976 317 906
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2" style={{ color: ZIPO_COLORS.text }}>
                        Ubicación
                      </h3>
                      <p style={{ color: ZIPO_COLORS.gray[600] }}>
                        Lima, Perú
                      </p>
                    </div>
                  </div>
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
