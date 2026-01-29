const strapi = require('@strapi/strapi');

async function seed() {
  const app = strapi({ 
    dir: process.cwd(),
    autoReload: false,
    serveAdminPanel: false 
  });
  
  try {
    await app.start();
    
    console.log('🌱 Starting database seeding...');
    
    // Importar y ejecutar el seed
    const seedModule = require('../data/seed');
    await seedModule.afterCreate();
    
    console.log('✅ Seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await app.stop();
    process.exit(0);
  }
}

seed();
