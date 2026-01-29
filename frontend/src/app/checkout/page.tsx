'use client';

import { motion } from 'framer-motion';
import { CreditCard, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { mercadoPago } from '@/services/mercadopago';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Verificar si Mercado Pago está configurado
    const configured = mercadoPago.isConfigured();
    setIsConfigured(configured);
    
    if (!configured) {
      setError('Mercado Pago no está configurado. Contacta al administrador.');
    }
  }, []);

  const getTextFromRichText = (richText: any): string => {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    if (Array.isArray(richText)) {
      return richText.map(item => {
        if (item.children && Array.isArray(item.children)) {
          return item.children.map((child: any) => child.text || '').join('');
        }
        return item.text || '';
      }).join('');
    }
    return '';
  };

  const shippingCost = total > 100 ? 0 : 15; // Envío gratis sobre S/100
  const finalTotal = total + shippingCost;

  const handlePayment = async () => {
    if (!isConfigured) {
      toast.error('Error de configuración', {
        description: 'Mercado Pago no está configurado',
      });
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Mostrar notificación de procesamiento
      toast.loading('Procesando pago...', {
        description: 'Estamos preparando tu pago con Mercado Pago',
        id: 'payment-processing',
      });

      // Crear preferencia de pago
      const preference = await mercadoPago.createPaymentPreference(items);
      
      // Actualizar notificación
      toast.loading('Redirigiendo a Mercado Pago...', {
        description: 'Serás redirigido a la página de pago segura',
        id: 'payment-processing',
      });

      // Redirigir a Mercado Pago
      setTimeout(() => {
        window.location.href = mercadoPago.getCheckoutUrl(preference, true);
      }, 1500);

    } catch (error) {
      console.error('Error en proceso de pago:', error);
      setError('Error al procesar el pago. Por favor, intenta nuevamente.');
      
      toast.error('Error en el pago', {
        description: 'No se pudo procesar tu pago. Intenta nuevamente.',
        id: 'payment-processing',
      });
      
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Carrito vacío
                </h1>
                <p className="text-gray-600 mb-8">
                  No tienes productos en tu carrito para procesar el pago.
                </p>
                <Link href="/carrito">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al carrito
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="mb-8">
              <Link href="/carrito" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al carrito
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Checkout
              </h1>
              <p className="text-gray-600">
                Revisa tu pedido y procede al pago seguro con Mercado Pago
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Resumen del Pedido ({itemCount} {itemCount === 1 ? 'producto' : 'productos'})
                    </h2>
                  </div>

                  <div className="divide-y">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-6"
                      >
                        <div className="flex items-center gap-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                            {item.images?.[0]?.url ? (
                              <Image
                                src={`http://localhost:1337${item.images[0].url}`}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-400 text-xs">Sin imagen</span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {getTextFromRichText(item.description)}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-600">
                                Cantidad: {item.quantity}
                              </span>
                              <span className="text-lg font-bold text-pink-500">
                                S/{(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Resumen de Pago
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium">S/{total.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Envío</span>
                        <span className="font-medium">
                          {shippingCost === 0 ? (
                            <span className="text-green-600">Gratis</span>
                          ) : (
                            `S/${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      {shippingCost > 0 && (
                        <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded">
                          Agrega S/{(100 - total).toFixed(2)} más para obtener envío gratis
                        </div>
                      )}

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold text-gray-900">
                            Total
                          </span>
                          <span className="text-lg font-bold text-pink-500">
                            S/{finalTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                          <span className="text-red-800 text-sm">{error}</span>
                        </div>
                      </div>
                    )}

                    {/* Payment Button */}
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing || !isConfigured}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pagar con Mercado Pago
                        </>
                      )}
                    </Button>

                    {/* Security Information */}
                    <div className="mt-6 pt-6 border-t">
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Pago seguro con Mercado Pago
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Encriptación SSL de 256 bits
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          Múltiples métodos de pago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
