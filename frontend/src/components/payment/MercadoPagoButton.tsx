'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { ZIPO_CLASSES } from '@/lib/colors';
import { toast } from 'sonner';

interface MercadoPagoButtonProps {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  orderId: string;
  disabled?: boolean;
}

export default function MercadoPagoButton({ 
  items, 
  orderId, 
  disabled = false 
}: MercadoPagoButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Crear preferencia de pago
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          orderId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pago');
      }

      // Redirigir a MercadoPago (sandbox para pruebas)
      const paymentUrl = data.sandbox_init_point || data.init_point;
      window.location.href = paymentUrl;

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Error al procesar el pago. Inténtalo nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={disabled || isLoading}
      className={`w-full ${ZIPO_CLASSES.btnPrimary}`}
      size="lg"
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Procesando...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4 mr-2" />
          Pagar con MercadoPago
        </>
      )}
    </Button>
  );
}
