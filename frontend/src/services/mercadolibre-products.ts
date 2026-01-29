import { MERCADO_LIBRE_CONFIG, MercadoLibreProduct, MercadoLibrePublication } from '@/lib/mercadolibre';
import { mercadoLibreAuth } from './mercadolibre-auth';
import { Product } from '@/lib/api';

export class MercadoLibreProductsService {
  private static instance: MercadoLibreProductsService;

  static getInstance(): MercadoLibreProductsService {
    if (!MercadoLibreProductsService.instance) {
      MercadoLibreProductsService.instance = new MercadoLibreProductsService();
    }
    return MercadoLibreProductsService.instance;
  }

  // Convertir producto de Zipo a formato Mercado Libre
  convertProductToML(product: Product, categorySlug: string): MercadoLibreProduct {
    const categoryId = MERCADO_LIBRE_CONFIG.CATEGORIES[categorySlug as keyof typeof MERCADO_LIBRE_CONFIG.CATEGORIES] || 'ML1144';
    
    // Extraer texto del rich text
    const getDescription = (description: any): string => {
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
    };

    return {
      title: product.name,
      category_id: categoryId,
      price: product.price,
      currency_id: 'PEN', // Soles peruanos
      available_quantity: 10, // Stock por defecto
      buying_mode: 'buy_it_now',
      listing_type_id: 'gold_special',
      condition: MERCADO_LIBRE_CONFIG.CONDITIONS.new,
      description: getDescription(product.description),
      pictures: product.images?.map(img => ({
        url: `http://localhost:1337${img.url}`,
        secure_url: `http://localhost:1337${img.url}`,
        size: '500x500',
        max_size: '1200x1200',
        quality: 'high'
      })) || [],
      tags: ['immediate_payment', 'cart_enabled'],
      warranty: 'Garantía del vendedor: 30 días',
      seller_custom_field: `zipo-${product.id}`
    };
  }

  // Publicar producto en Mercado Libre
  async publishProduct(product: Product, categorySlug: string): Promise<MercadoLibrePublication> {
    try {
      const accessToken = await mercadoLibreAuth.getValidAccessToken();
      const mlProduct = this.convertProductToML(product, categorySlug);

      // Primero crear la publicación
      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(mlProduct),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error al publicar producto: ${JSON.stringify(errorData)}`);
      }

      const publication: MercadoLibrePublication = await response.json();

      // Luego agregar la descripción detallada
      await this.updateDescription(publication.id, mlProduct.description, accessToken);

      return publication;
    } catch (error) {
      console.error('Error en publishProduct:', error);
      throw error;
    }
  }

  // Actualizar descripción del producto
  private async updateDescription(itemId: string, description: string, accessToken: string): Promise<void> {
    try {
      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items/${itemId}/description`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          plain_text: description
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar descripción: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en updateDescription:', error);
      throw error;
    }
  }

  // Obtener publicaciones del vendedor
  async getPublications(): Promise<MercadoLibrePublication[]> {
    try {
      const accessToken = await mercadoLibreAuth.getValidAccessToken();
      const userInfo = await mercadoLibreAuth.getUserInfo(accessToken);

      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/users/${userInfo.id}/items/search`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener publicaciones: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Obtener detalles de cada publicación
      const publications: MercadoLibrePublication[] = [];
      for (const itemId of data.results) {
        const publication = await this.getPublicationDetails(itemId, accessToken);
        publications.push(publication);
      }

      return publications;
    } catch (error) {
      console.error('Error en getPublications:', error);
      throw error;
    }
  }

  // Obtener detalles de una publicación
  private async getPublicationDetails(itemId: string, accessToken: string): Promise<MercadoLibrePublication> {
    try {
      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener detalles de publicación: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getPublicationDetails:', error);
      throw error;
    }
  }

  // Pausar publicación
  async pausePublication(itemId: string): Promise<void> {
    try {
      const accessToken = await mercadoLibreAuth.getValidAccessToken();

      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          status: MERCADO_LIBRE_CONFIG.STATUSES.paused
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al pausar publicación: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en pausePublication:', error);
      throw error;
    }
  }

  // Reactivar publicación
  async reactivatePublication(itemId: string): Promise<void> {
    try {
      const accessToken = await mercadoLibreAuth.getValidAccessToken();

      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          status: MERCADO_LIBRE_CONFIG.STATUSES.active
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al reactivar publicación: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en reactivatePublication:', error);
      throw error;
    }
  }

  // Eliminar publicación
  async deletePublication(itemId: string): Promise<void> {
    try {
      const accessToken = await mercadoLibreAuth.getValidAccessToken();

      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar publicación: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en deletePublication:', error);
      throw error;
    }
  }

  // Actualizar precio
  async updatePrice(itemId: string, price: number): Promise<void> {
    try {
      const accessToken = await mercadoLibreAuth.getValidAccessToken();

      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          price: price
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar precio: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en updatePrice:', error);
      throw error;
    }
  }

  // Actualizar stock
  async updateStock(itemId: string, quantity: number): Promise<void> {
    try {
      const accessToken = await mercadoLibreAuth.getValidAccessToken();

      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          available_quantity: quantity
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al actualizar stock: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error en updateStock:', error);
      throw error;
    }
  }
}

// Exportar instancia singleton
export const mercadoLibreProducts = MercadoLibreProductsService.getInstance();
