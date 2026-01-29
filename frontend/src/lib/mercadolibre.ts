// Configuración de Mercado Libre API
export const MERCADO_LIBRE_CONFIG = {
  // URLs de la API
  API_URL: 'https://api.mercadolibre.com',
  AUTH_URL: 'https://auth.mercadolibre.com',
  
  // Credenciales (deben configurarse en .env.local)
  APP_ID: process.env.NEXT_PUBLIC_ML_APP_ID || '',
  CLIENT_SECRET: process.env.ML_CLIENT_SECRET || '',
  REDIRECT_URI: process.env.NEXT_PUBLIC_ML_REDIRECT_URI || 'http://localhost:3000/ml/callback',
  
  // Scopes necesarios
  SCOPES: [
    'read_items',
    'write_items',
    'read_orders',
    'write_orders',
    'read_messages',
    'write_messages'
  ],
  
  // Categorías mapeadas para productos infantiles
  CATEGORIES: {
    'cuentos-infantiles': 'ML1182', // Libros, Revistas y Comics > Infantil y Juvenil
    'ropa-ninos': 'ML1574', // Ropa y Accesorios > Niños (2 a 8 años)
    'ropa-bebes': 'ML1575', // Ropa y Accesorios > Bebés (0 a 24 meses)
    'juguetes': 'ML1144', // Juegos y Juguetes
    'accesorios': 'ML1576' // Ropa y Accesorios > Accesorios
  },
  
  // Condiciones del producto
  CONDITIONS: {
    new: 'new',
    used: 'used'
  },
  
  // Estados de publicación
  STATUSES: {
    active: 'active',
    paused: 'paused',
    closed: 'closed'
  }
};

// Interfaces para TypeScript
export interface MercadoLibreProduct {
  id?: string;
  title: string;
  category_id: string;
  price: number;
  currency_id: string;
  available_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  condition: string;
  description: string;
  pictures: Array<{
    id?: string;
    url: string;
    secure_url?: string;
    size?: string;
    max_size?: string;
    quality?: string;
  }>;
  video_id?: string;
  attributes?: Array<{
    id: string;
    name: string;
    value_id?: string;
    value_name?: string;
  }>;
  tags?: string[];
  warranty?: string;
  seller_custom_field?: string;
}

export interface MercadoLibreAuth {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
}

export interface MercadoLibreUser {
  id: number;
  nickname: string;
  registration_date: string;
  country_id: string;
  address: {
    state: string;
    city: string;
  };
  user_type: string;
  tags: string[];
  logo: string;
  points: number;
  site_id: string;
  permalink: string;
  seller_reputation: {
    level_id: string;
    power_seller_status: string;
    transactions: {
      period: string;
      total: number;
      completed: number;
      canceled: number;
      ratings: {
        positive: number;
        negative: number;
        neutral: number;
      };
    };
  };
}

export interface MercadoLibrePublication {
  id: string;
  site_id: string;
  title: string;
  seller_id: number;
  category_id: string;
  price: number;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  buying_mode: string;
  listing_type_id: string;
  condition: string;
  description: string;
  pictures: Array<{
    id: string;
    url: string;
    secure_url: string;
    size: string;
    max_size: string;
    quality: string;
  }>;
  video_id?: string;
  accepts_mercadopago: boolean;
  attributes: Array<{
    id: string;
    name: string;
    value_id?: string;
    value_name?: string;
  }>;
  tags: string[];
  warranty?: string;
  seller_custom_field?: string;
  date_created: string;
  last_updated: string;
  status: string;
  permalink: string;
}
