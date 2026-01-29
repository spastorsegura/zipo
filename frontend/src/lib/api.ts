const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export interface Product {
  id: number;
  documentId: string;
  name: string;
  description: any; // Rich text object from Strapi
  price: number;
  slug: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  images: Array<{
    id: number;
    documentId: string;
    name: string;
    url: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      large?: { url: string; width: number; height: number };
      medium?: { url: string; width: number; height: number };
      small?: { url: string; width: number; height: number };
      thumbnail?: { url: string; width: number; height: number };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  category: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
  };
}

export const api = {
  async getProducts() {
    try {
      const response = await fetch(`${API_URL}/api/products?populate=*`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductBySlug(slug: string) {
    const response = await fetch(`${API_URL}/api/products?populate=*&filters[slug][$eq]=${slug}`);
    const data = await response.json();
    return data;
  },

  async getProductsByCategory(categorySlug: string) {
    const response = await fetch(`${API_URL}/api/products?populate=*&filters[category][slug][$eq]=${categorySlug}`);
    const data = await response.json();
    return data;
  },

  async getCategories() {
    const response = await fetch(`${API_URL}/api/categories`);
    const data = await response.json();
    return data;
  },

  async getFeaturedProducts() {
    const response = await fetch(`${API_URL}/api/products?populate=*&filters[featured][$eq]=true`);
    const data = await response.json();
    return data;
  }
};
