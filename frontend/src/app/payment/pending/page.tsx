'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Home, RefreshCw } from 'lucide-react';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function PaymentPendingPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const payment_id = searchParams.get('payment_id');
    const external_reference = searchParams.get('external_reference');
    
    // Mostrar notificación de pendiente con Sonner
    toast.info('Pago en proceso', {
      description: 'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
      duration: 5000,
    });
    
    console.log('Payment pending:', { payment_id, external_reference });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Icono de pendiente */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Clock className="w-12 h-12 text-yellow-600" />
          </motion.div>

          {/* Mensaje principal */}
          <h1 className="text-4xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>
            Pago en Proceso
          </h1>
          
          <p className="text-xl mb-8" style={{ color: ZIPO_COLORS.gray[600] }}>
            Tu pago está siendo procesado. Esto puede tardar unos minutos. Te enviaremos una notificación cuando se complete.
          </p>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: ZIPO_COLORS.primary,
                color: 'white'
              }}
            >
              <Home className="w-5 h-5 mr-2" />
              Ir al Inicio
            </Link>
            
            <Link
              href="/carrito"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border-2 transition-all duration-200 hover:scale-105"
              style={{ 
                borderColor: ZIPO_COLORS.primary,
                color: ZIPO_COLORS.primary
              }}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Ver Carrito
            </Link>
          </div>

          {/* Información adicional */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm" style={{ color: ZIPO_COLORS.gray[600] }}>
              <strong>Importante:</strong> No cierres esta ventana. El estado de tu pago se actualizará automáticamente.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
