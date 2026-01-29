import { MERCADO_PAGO_CONFIG, MercadoPagoItem, MercadoPagoPreference } from '@/lib/mercadopago';
import { CartItem } from '@/contexts/CartContext';

export class MercadoPagoService {
  private static instance: MercadoPagoService;

  static getInstance(): MercadoPagoService {
    if (!MercadoPagoService.instance) {
      MercadoPagoService.instance = new MercadoPagoService();
    }
    return MercadoPagoService.instance;
  }

  // Convertir items del carrito a formato Mercado Pago
  convertCartItemsToMP(items: CartItem[]): MercadoPagoItem[] {
    return items.map(item => ({
      id: item.id.toString(),
      title: item.name,
      description: this.extractDescription(item.description),
      quantity: item.quantity,
      currency_id: 'PEN',
      unit_price: item.price,
      picture_url: item.images?.[0]?.url ? `http://localhost:1337${item.images[0].url}` : '',
      category_id: this.getCategoryFromSlug(item.category?.slug || ''),
    }));
  }

  // Extraer descripción del rich text
  private extractDescription(description: any): string {
    if (!description) return '';
    if (typeof description === 'string') return description;
    if (Array.isArray(description)) {
      return description.map(item => {
        if (item.children && Array.isArray(item.children)) {
          return item.children.map((child: any) => child.text || '').join('');
        }
        return item.text || '';
      }).join('');
    }
    return '';
  }

  // Obtener categoría de Mercado Pago basada en slug
  private getCategoryFromSlug(slug: string): string {
    const categoryMap: Record<string, string> = {
      'cuentos-infantiles': 'books',
      'ropa-ninos': 'clothing',
      'ropa-bebes': 'clothing',
      'juguetes': 'toys',
      'accesorios': 'accessories',
    };
    return categoryMap[slug] || 'others';
  }

  // Crear preferencia de pago
  async createPaymentPreference(items: CartItem[]): Promise<MercadoPagoPreference> {
    try {
      const mpItems = this.convertCartItemsToMP(items);
      const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const preferenceData = {
        ...MERCADO_PAGO_CONFIG.PREFERENCE_CONFIG,
        items: mpItems,
        external_reference: `zipo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        additional_info: JSON.stringify({
          cart_items: items.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          total_amount: totalAmount,
          currency: MERCADO_PAGO_CONFIG.CURRENCY_ID,
        }),
      };

      const response = await fetch(`${MERCADO_PAGO_CONFIG.API_URL}/checkout/preferences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MERCADO_PAGO_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(preferenceData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al crear preferencia: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createPaymentPreference:', error);
      throw error;
    }
  }

  // Obtener estado de un pago
  async getPaymentStatus(paymentId: string): Promise<any> {
    try {
      const response = await fetch(`${MERCADO_PAGO_CONFIG.API_URL}/v1/payments/${paymentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MERCADO_PAGO_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener estado del pago: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getPaymentStatus:', error);
      throw error;
    }
  }

  // Crear pago con tarjeta (para implementación futura)
  async createCardPayment(paymentData: any): Promise<any> {
    try {
      const response = await fetch(`${MERCADO_PAGO_CONFIG.API_URL}/v1/payments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MERCADO_PAGO_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al crear pago con tarjeta: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en createCardPayment:', error);
      throw error;
    }
  }

  // Obtener métodos de pago disponibles
  async getPaymentMethods(): Promise<any> {
    try {
      const response = await fetch(`${MERCADO_PAGO_CONFIG.API_URL}/v1/payment_methods`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${MERCADO_PAGO_CONFIG.ACCESS_TOKEN}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener métodos de pago: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getPaymentMethods:', error);
      throw error;
    }
  }

  // Obtener cuotas disponibles para un método de pago
  async getInstallments(paymentMethodId: string, amount: number): Promise<any> {
    try {
      const response = await fetch(
        `${MERCADO_PAGO_CONFIG.API_URL}/v1/payment_methods/installments?payment_method_id=${paymentMethodId}&amount=${amount}&currency_id=${MERCADO_PAGO_CONFIG.CURRENCY_ID}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${MERCADO_PAGO_CONFIG.ACCESS_TOKEN}`,
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al obtener cuotas: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getInstallments:', error);
      throw error;
    }
  }

  // Validar si el entorno está configurado
  isConfigured(): boolean {
    return !!(MERCADO_PAGO_CONFIG.PUBLIC_KEY && MERCADO_PAGO_CONFIG.ACCESS_TOKEN);
  }

  // Obtener URL de sandbox o producción
  getCheckoutUrl(preference: MercadoPagoPreference, sandbox: boolean = true): string {
    return sandbox ? preference.sandbox_init_point : preference.init_point;
  }
}

// Exportar instancia singleton
export const mercadoPago = MercadoPagoService.getInstance();
