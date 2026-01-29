'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { XCircle, RefreshCw } from 'lucide-react';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

function PaymentFailureContent() {
  const searchParams = useSearchParams();
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    const payment_id = searchParams.get('payment_id');
    const error_code = searchParams.get('error_code');
    
    setPaymentId(payment_id);
    setErrorCode(error_code);
    
    console.log('Payment failed:', { payment_id, error_code });
    
    // Mostrar notificación de error con Sonner
    toast.error('Error en el pago', {
      description: 'Tu pago no pudo ser procesado. Inténtalo nuevamente.',
      duration: 5000,
    });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Error Icon */}
            <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center">
              <div 
                className="w-full h-full rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#FEE2E2' }}
              >
                <XCircle 
                  className="w-12 h-12" 
                  style={{ color: '#DC2626' }}
                />
              </div>
            </div>

            {/* Error Title */}
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: ZIPO_COLORS.text }}
            >
              Pago Fallido
            </h1>

            {/* Error Description */}
            <p 
              className="text-xl mb-8"
              style={{ color: ZIPO_COLORS.gray[600] }}
            >
              Lamentamos las molestias. Tu pago no pudo ser procesado correctamente.
            </p>

            {/* Error Details */}
            {(paymentId || errorCode) && (
              <div 
                className="p-4 rounded-lg mb-8 text-left"
                style={{ backgroundColor: ZIPO_COLORS.gray[100] }}
              >
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: ZIPO_COLORS.text }}
                >
                  Detalles del error:
                </h3>
                {paymentId && (
                  <p style={{ color: ZIPO_COLORS.gray[600] }}>
                    <span className="font-medium">ID del pago:</span> {paymentId}
                  </p>
                )}
                {errorCode && (
                  <p style={{ color: ZIPO_COLORS.gray[600] }}>
                    <span className="font-medium">Código de error:</span> {errorCode}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.history.back()}
                className="flex items-center gap-2"
                style={{ backgroundColor: ZIPO_COLORS.primary }}
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar Pago
              </Button>
              
              <Link href="/carrito">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  style={{ 
                    borderColor: ZIPO_COLORS.primary,
                    color: ZIPO_COLORS.primary 
                  }}
                >
                  <XCircle className="w-4 h-4" />
                  Revisar Carrito
                </Button>
              </Link>
            </div>

            {/* Additional Help */}
            <div className="mt-12 p-6 rounded-lg" style={{ backgroundColor: ZIPO_COLORS.gray[50] }}>
              <h3 
                className="font-semibold mb-3"
                style={{ color: ZIPO_COLORS.text }}
              >
                ¿Necesitas ayuda?
              </h3>
              <p style={{ color: ZIPO_COLORS.gray[600] }}>
                Si el problema persiste, contacta a nuestro equipo de soporte.
              </p>
              <div className="mt-4 space-y-2">
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  <span className="font-medium">Email:</span> soporte@zipo.com
                </p>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  <span className="font-medium">Teléfono:</span> +51 123 456 789
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}