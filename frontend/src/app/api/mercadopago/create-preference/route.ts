import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-ACCESS-TOKEN',
});

const preference = new Preference(client);

export async function POST(request: NextRequest) {
  try {
    console.log('Creating MercadoPago preference...');
    console.log('Access Token configured:', !!process.env.MERCADOPAGO_ACCESS_TOKEN);
    
    const { items, orderId } = await request.json();
    console.log('Request data:', { items, orderId });

    // Validar datos de entrada
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided or invalid items format' },
        { status: 400 }
      );
    }

    // Crear items para MercadoPago
    const mp_items = items.map((item: {
      name: string;
      price: number;
      quantity: number;
    }, index: number) => ({
      id: `item_${index + 1}`,
      title: item.name,
      unit_price: Number(item.price),
      quantity: item.quantity,
      currency_id: 'PEN', // Soles peruanos
    }));

    console.log('MP Items:', mp_items);

    // Crear preferencia de pago
    const result = await preference.create({
      body: {
        items: mp_items,
        external_reference: orderId.toString(),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/payment/pending`,
        },
        notification_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/mercadopago/webhook`,
        statement_descriptor: 'Zipo Tienda Infantil',
      },
    });

    console.log('Preference created successfully:', result.id);

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error);
    
    return NextResponse.json(
      { 
        error: 'Error creating payment preference',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
