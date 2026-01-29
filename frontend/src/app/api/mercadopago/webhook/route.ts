import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-ACCESS-TOKEN',
});

const payment = new Payment(client);

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-signature');
    const requestId = request.headers.get('x-request-id');

    // Verificar firma (opcional pero recomendado)
    if (signature && requestId) {
      // Aquí deberías verificar la firma con tu secreto
      // Por ahora procesamos directamente
    }

    const data = JSON.parse(body);

    // Procesar diferentes tipos de notificaciones
    if (data.type === 'payment') {
      const paymentId = data.data.id;
      
      // Obtener información del pago
      const paymentData = await payment.get({
        id: paymentId,
      });
      
      console.log('Payment received:', {
        id: paymentData.id,
        status: paymentData.status,
        external_reference: paymentData.external_reference,
        amount: paymentData.transaction_amount,
      });

      // Aquí puedes:
      // 1. Actualizar el estado del pedido en tu base de datos
      // 2. Enviar email de confirmación
      // 3. Actualizar inventario
      // 4. Crear registro de transacción

      if (paymentData.status === 'approved') {
        // Pago aprobado - procesar pedido
        console.log(`Payment ${paymentData.id} approved for order ${paymentData.external_reference}`);
        
        // TODO: Actualizar estado del pedido a "pagado"
        // TODO: Enviar email de confirmación
        // TODO: Reducir inventario
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'webhook endpoint active' });
}
