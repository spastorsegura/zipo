'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { toast } from 'sonner';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const payment_id = searchParams.get('payment_id');
    const external_reference = searchParams.get('external_reference');
    
    setPaymentId(payment_id);
    
    // Mostrar notificación de éxito con Sonner
    toast.success('¡Pago realizado con éxito!', {
      description: 'Tu pedido ha sido procesado correctamente.',
      duration: 5000,
    });
    
    // Aquí podrías verificar el estado del pago con tu backend
    console.log('Payment successful:', { payment_id, external_reference });
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
            {/* Success Icon */}
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>
              ¡Pago Exitoso!
            </h1>
            
            <p className="text-xl mb-8" style={{ color: ZIPO_COLORS.gray[600] }}>
              Tu pedido ha sido procesado correctamente. Recibirás un email de confirmación shortly.
            </p>

            {/* Payment Details */}
            {paymentId && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8" style={{ boxShadow: ZIPO_CLASSES.shadowPrimary }}>
                <h2 className="text-lg font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>
                  Detalles del Pago
                </h2>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span style={{ color: ZIPO_COLORS.gray[600] }}>ID de Pago:</span>
                    <span className="font-mono" style={{ color: ZIPO_COLORS.text }}>{paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: ZIPO_COLORS.gray[600] }}>Estado:</span>
                    <span className="text-green-500 font-medium">Aprobado</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: ZIPO_COLORS.gray[600] }}>Método:</span>
                    <span style={{ color: ZIPO_COLORS.text }}>MercadoPago</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/mis-pedidos">
                <Button className={ZIPO_CLASSES.btnPrimary}>
                  Ver Mis Pedidos
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="w-full" style={{ borderColor: ZIPO_COLORS.blue, color: ZIPO_COLORS.blue }}>
                  Seguir Comprando
                </Button>
              </Link>
            </div>

            {/* Order Tracking Info */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2" style={{ color: ZIPO_COLORS.blue }}>
                ¿Qué sigue?
              </h3>
              <div className="text-left space-y-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                <p>• Recibirás un email con los detalles de tu pedido</p>
                <p>• Podrás hacer seguimiento de tu pedido en "Mis Pedidos"</p>
                <p>• Tiempo estimado de entrega: 3-5 días hábiles</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <CheckCircle className="w-8 h-8 animate-spin" />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
