'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { mercadoLibreAuth } from '@/services/mercadolibre-auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Procesando autenticación...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        if (error) {
          setStatus('error');
          setMessage(`Error de autenticación: ${errorDescription || error}`);
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No se recibió código de autorización');
          return;
        }

        // Intercambiar código por token
        await mercadoLibreAuth.exchangeCodeForToken(code);
        
        setStatus('success');
        setMessage('¡Conexión exitosa! Redirigiendo al dashboard...');
        
        // Redirigir al dashboard después de 2 segundos
        setTimeout(() => {
          router.push('/mercado-libre');
        }, 2000);
        
      } catch (error) {
        console.error('Error en callback:', error);
        setStatus('error');
        setMessage('Error al procesar la autenticación. Por favor, intenta nuevamente.');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                {status === 'loading' && (
                  <div className="w-full h-full bg-yellow-500 rounded-full flex items-center justify-center">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                  </div>
                )}
                {status === 'success' && (
                  <div className="w-full h-full bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                )}
                {status === 'error' && (
                  <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {status === 'loading' && 'Conectando con Mercado Libre...'}
                {status === 'success' && '¡Conexión Exitosa!'}
                {status === 'error' && 'Error de Conexión'}
              </h1>
              
              <p className="text-gray-600 mb-8">
                {message}
              </p>
              
              {status === 'error' && (
                <div className="space-y-4">
                  <button
                    onClick={() => router.push('/')}
                    className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Volver al inicio
                  </button>
                  <button
                    onClick={() => router.push('/mercado-libre')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Reintentar conexión
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function MercadoLibreCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
