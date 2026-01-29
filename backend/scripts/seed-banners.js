'use strict';

const banners = [
  {
    title: 'Nueva Colección',
    description: 'Descubre nuestros productos más recientes',
    image: 'https://images.unsplash.com/photo-1517248138763-0f2f9d6d5c3c?w=800&h=400&fit=crop',
    link: '/productos',
    link_text: 'Ver productos',
    position: 1,
    is_active: true,
  },
  {
    title: 'Envío Gratis',
    description: 'En pedidos mayores a S/100',
    image: 'https://images.unsplash.com/photo-1606107557092-8f12fd4b9e4c?w=800&h=400&fit=crop',
    link: '/carrito',
    link_text: 'Comprar ahora',
    position: 2,
    is_active: true,
  },
  {
    title: 'Ofertas Especiales',
    description: 'Hasta 50% de descuento en productos seleccionados',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    link: '/ofertas',
    link_text: 'Ver ofertas',
    position: 3,
    is_active: true,
  },
];

module.exports = {
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap: async ({ strapi }) => {
    try {
      // Check if banners already exist
      const existingBanners = await strapi.entityService.find('api::banner.banner', {
        limit: 1,
      });

      if (existingBanners.results.length > 0) {
        console.log('📢 Banners already exist, skipping seed');
        return;
      }

      // Create banners
      for (const bannerData of banners) {
        await strapi.entityService.create('api::banner.banner', {
          data: bannerData,
        });
      }

      console.log('✅ Sample banners created successfully');
      console.log('📢 Created banners:');
      console.log('   - Nueva Colección');
      console.log('   - Envío Gratis');
      console.log('   - Ofertas Especiales');
    } catch (error) {
      console.error('❌ Error creating banners:', error);
    }
  },
};
