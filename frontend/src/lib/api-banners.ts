export interface Banner {
  id: number;
  documentId: string;
  position: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      large?: {
        url: string;
        width: number;
        height: number;
      };
      medium?: {
        url: string;
        width: number;
        height: number;
      };
      small?: {
        url: string;
        width: number;
        height: number;
      };
      thumbnail?: {
        url: string;
        width: number;
        height: number;
      };
    };
    url: string;
  };
}

export interface BannersResponse {
  data: Banner[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const bannerApi = {
  async getBanners(): Promise<Banner[]> {
    try {
      const response = await fetch(`${API_URL}/api/banners?populate=image&sort=position:asc`, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (response.status === 404) {
        console.log('🔧 Banner Content Type not found in Strapi. Please create it manually.');
        console.log('📋 Follow the guide: docs/configurar-banner-strapi.md');
        return [];
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BannersResponse = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  },

  async getActiveBanners(): Promise<Banner[]> {
    try {
      const response = await fetch(`${API_URL}/api/banners?populate=image&sort=position:asc`, {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (response.status === 404) {
        console.log('🔧 Banner Content Type not found in Strapi.');
        console.log('📝 Create Content Type "Banner" with these fields:');
        console.log('   - image (media, required, images only)');
        console.log('   - position (integer, required, default 1)');
        console.log('   - is_active (boolean, required, default true)');
        console.log('🌐 Then configure permissions for public role: find, findOne');
        return [];
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: BannersResponse = await response.json();
      // Filter active banners on client side
      return data.data.filter(banner => banner.is_active);
    } catch (error) {
      console.error('Error fetching active banners:', error);
      return [];
    }
  },
};
