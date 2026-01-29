'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw } from 'lucide-react';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

export default function PaymentFailurePage() {
  const searchParams = useSearchParams();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    const payment_id = searchParams.get('payment_id');
    const error_code = searchParams.get('error_code');
    
    setPaymentId(payment_id);
    setErrorCode(error_code);
    
    // Mostrar notificación de error con Sonner
    toast.error('Error en el pago', {
      description: 'Tu pago no pudo ser procesado. Inténtalo nuevamente.',
      duration: 5000,
    });
    
    console.log('Payment failed:', { payment_id, error_code });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Error Icon */}
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto"
              >
                <XCircle className="w-10 h-10 text-red-500" />
              </motion.div>
            </div>

            {/* Error Message */}
            <h1 className="text-4xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>
              Pago Fallido
            </h1>
            
            <p className="text-xl mb-8" style={{ color: ZIPO_COLORS.gray[600] }}>
              Hubo un problema al procesar tu pago. Por favor, inténtalo nuevamente.
            </p>

            {/* Error Details */}
            {(paymentId || errorCode) && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8" style={{ boxShadow: ZIPO_CLASSES.shadowPrimary }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                  Detalles del Error
                </h2>
                <div className="space-y-2 text-left">
                  {paymentId && (
                    <div className="flex justify-between">
                      <span style={{ color: ZIPO_COLORS.gray[600] }}>ID de Pago:</span>
                      <span className="font-mono" style={{ color: ZIPO_COLORS.text }}>{paymentId}</span>
                    </div>
                  )}
                  {errorCode && (
                    <div className="flex justify-between">
                      <span style={{ color: ZIPO_COLORS.gray[600] }}>Código de Error:</span>
                      <span className="font-mono" style={{ color: ZIPO_COLORS.text }}>{errorCode}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span style={{ color: ZIPO_COLORS.gray[600] }}>Estado:</span>
                    <span className="text-red-500 font-medium">Rechazado</span>
                  </div>
                </div>
              </div>
            )}

            {/* Common Error Reasons */}
            <div className="bg-yellow-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4" style={{ color: ZIPO_COLORS.orange }}>
                Posibles Causas
              </h3>
              <div className="text-left space-y-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                <p>• Fondos insuficientes en la tarjeta</p>
                <p>• Tarjeta vencida o bloqueada</p>
                <p>• Datos de pago incorrectos</p>
                <p>• Problemas de conexión temporal</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/carrito">
                <Button className={ZIPO_CLASSES.btnPrimary}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reintentar Pago
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="w-full" style={{ borderColor: ZIPO_COLORS.blue, color: ZIPO_COLORS.blue }}>
                  Seguir Explorando
                </Button>
              </Link>
            </div>

            {/* Help Section */}
            <div className="mt-12 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>
                ¿Necesitas Ayuda?
              </h3>
              <div className="text-left space-y-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                <p>• Contacta a soporte@zipo.com</p>
                <p>• Llama al 123-456-7890</p>
                <p>• Usa nuestro chat en vivo</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
