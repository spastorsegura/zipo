const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

// Datos de seed
const categories = [
  {
    name: 'Cuentos Infantiles',
    slug: 'cuentos-infantiles',
    description: 'Cuentos mágicos y aventuras increíbles para estimular la imaginación de los más pequeños',
  },
  {
    name: 'Ropa de Niños',
    slug: 'ropa-ninos',
    description: 'Ropa cómoda, divertida y de calidad para niños de 3 a 12 años',
  },
  {
    name: 'Ropa de Bebés',
    slug: 'ropa-bebes',
    description: 'Prendas suaves y seguras para el cuidado y comodidad de tu bebé',
  },
  {
    name: 'Juguetes',
    slug: 'juguetes',
    description: 'Juguetes educativos y divertidos que estimulan el desarrollo infantil',
  },
  {
    name: 'Accesorios',
    slug: 'accesorios',
    description: 'Complementos prácticos y adorables para completar el outfit de tu pequeño',
  }
];

const products = [
  // Cuentos Infantiles
  {
    name: 'El Dragón Valiente',
    description: 'Una aventura mágica sobre un pequeño dragón que aprende a ser valiente. Con ilustraciones coloridas y una historia que enseña sobre el coraje y la amistad.',
    price: 12.99,
    slug: 'el-dragon-valiente',
    featured: true,
    category: 'cuentos-infantiles',
  },
  {
    name: 'La Princesa y el Jardín Secreto',
    description: 'Una encantadora historia sobre una princesa que descubre un jardín mágico lleno de criaturas maravillosas. Perfecto para antes de dormir.',
    price: 14.99,
    slug: 'la-princesa-y-el-jardin-secreto',
    featured: true,
    category: 'cuentos-infantiles',
  },
  {
    name: 'Aventuras en el Espacio',
    description: 'Únete a los pequeños astronautas en su viaje por el sistema solar. Un libro educativo y divertido para aprender sobre el espacio.',
    price: 16.99,
    slug: 'aventuras-en-el-espacio',
    featured: false,
    category: 'cuentos-infantiles',
  },
  {
    name: 'El Bosque Encantado',
    description: 'Descubre los secretos del bosque donde los animales hablan y los árboles cuentan historias. Una aventura llena de magia y naturaleza.',
    price: 13.99,
    slug: 'el-bosque-encantado',
    featured: false,
    category: 'cuentos-infantiles',
  },

  // Ropa de Niños
  {
    name: 'Conjunto de Verano Tropical',
    description: 'Fresco conjunto de camiseta y pantalón corto con estampado tropical. Confeccionado con algodón orgánico suave al tacto.',
    price: 24.99,
    slug: 'conjunto-verano-tropical',
    featured: true,
    category: 'ropa-ninos',
  },
  {
    name: 'Vestido de Flores Primaverales',
    description: 'Hermoso vestido con estampado de flores y lazos. Perfecto para ocasiones especiales y juego diario.',
    price: 29.99,
    slug: 'vestido-flores-primaverales',
    featured: true,
    category: 'ropa-ninos',
  },
  {
    name: 'Pantalón Cargo Infantil',
    description: 'Pantalón cargo con múltiples bolsillos y tejido resistente. Ideal para aventuras y exploraciones.',
    price: 22.99,
    slug: 'pantalon-cargo-infantil',
    featured: false,
    category: 'ropa-ninos',
  },
  {
    name: 'Sudadera con Capucha de Unicornio',
    description: 'Acogedora sudadera con capucha y diseño de unicornio. Perfecta para días frescos y abrazos.',
    price: 26.99,
    slug: 'sudadera-capucha-unicornio',
    featured: true,
    category: 'ropa-ninos',
  },

  // Ropa de Bebés
  {
    name: 'Body de Algodón Orgánico',
    description: 'Suave body de algodón orgánico con broches de seguridad. Disponible en varios colores pastel.',
    price: 9.99,
    slug: 'body-algodon-organico',
    featured: false,
    category: 'ropa-bebes',
  },
  {
    name: 'Conjunto de Pijama de Animales',
    description: 'Adorable conjunto de pijama con estampado de animales. Tejido suave que cuida la piel delicada del bebé.',
    price: 19.99,
    slug: 'conjunto-pijama-animales',
    featured: true,
    category: 'ropa-bebes',
  },
  {
    name: 'Manta de Pana con Caperuza',
    description: 'Caliente manta de pana con caperuza de animalito. Perfecta para mantener al bebé abrigado y cómodo.',
    price: 24.99,
    slug: 'manta-pana-caperuza',
    featured: true,
    category: 'ropa-bebes',
  },
  {
    name: 'Calcetines Antideslizantes',
    description: 'Pack de 6 pares de calcetines con diseños divertidos y suela antideslizante. Ideales para primeros pasos.',
    price: 12.99,
    slug: 'calcetines-antideslizantes',
    featured: false,
    category: 'ropa-bebes',
  },

  // Juguetes
  {
    name: 'Bloques de Construcción de Madera',
    description: 'Set de 50 bloques de madera con colores vivos. Estimula la creatividad y habilidades motoras finas.',
    price: 34.99,
    slug: 'bloques-construccion-madera',
    featured: true,
    category: 'juguetes',
  },
  {
    name: 'Peluche de Unicornio Gigante',
    description: 'Suave peluche de unicornio de 60cm. Perfecto compañero de aventuras y sueños.',
    price: 39.99,
    slug: 'peluche-unicornio-gigante',
    featured: true,
    category: 'juguetes',
  },
  {
    name: 'Taller de Herramientas Infantil',
    description: 'Set de herramientas de juguete con taladro, martillo y tornillos. Fomenta la coordinación y resolución de problemas.',
    price: 29.99,
    slug: 'taller-herramientas-infantil',
    featured: false,
    category: 'juguetes',
  },
  {
    name: 'Rompecabezas de Animales',
    description: 'Rompecabezas de 100 piezas con ilustraciones de animales de la selva. Ideal para desarrollar concentración.',
    price: 14.99,
    slug: 'rompecabezas-animales',
    featured: false,
    category: 'juguetes',
  },

  // Accesorios
  {
    name: 'Mochila Escolar de Dinosaurios',
    description: 'Espaciosa mochila con estampado de dinosaurios y compartimentos organizados. Ajustable y cómoda.',
    price: 32.99,
    slug: 'mochila-escolar-dinosaurios',
    featured: true,
    category: 'accesorios',
  },
  {
    name: 'Botella de Agua con Sorbete',
    description: 'Botella de acero inoxidable con sorbete integrado y diseño de animales. Libre de BPA.',
    price: 16.99,
    slug: 'botella-agua-sorbete',
    featured: false,
    category: 'accesorios',
  },
  {
    name: 'Gorro de Invierno con Orejeras',
    description: 'Caliente gorro de lana con orejeras y pompón. Protege del frío con estilo.',
    price: 18.99,
    slug: 'gorro-invierno-orejeras',
    featured: false,
    category: 'accesorios',
  },
  {
    name: 'Lunch Box con Compartimentos',
    description: 'Práctica lunch box con múltiples compartimentos y diseños coloridos. Fácil de limpiar.',
    price: 19.99,
    slug: 'lunch-box-compartimentos',
    featured: false,
    category: 'accesorios',
  }
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function createCategories() {
  console.log('📚 Creating categories...');
  const createdCategories = [];

  for (const category of categories) {
    try {
      const response = await axios.post(`${STRAPI_URL}/api/categories`, {
        data: category
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      createdCategories.push({
        ...response.data.data,
        slug: category.slug
      });
      console.log(`✅ Created category: ${category.name}`);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.details?.errors?.[0]?.path?.[0] === 'slug') {
        console.log(`ℹ️ Category already exists: ${category.name}`);
        // Try to get existing category
        try {
          const getResponse = await axios.get(`${STRAPI_URL}/api/categories?filters[slug][$eq]=${category.slug}`);
          if (getResponse.data.data.length > 0) {
            createdCategories.push({
              ...getResponse.data.data[0],
              slug: category.slug
            });
          }
        } catch (getError) {
          console.error(`❌ Error getting existing category ${category.name}:`, getError.message);
        }
      } else {
        console.error(`❌ Error creating category ${category.name}:`, error.response?.data || error.message);
      }
    }
    
    await sleep(500); // Small delay between requests
  }

  return createdCategories;
}

async function createProducts(categories) {
  console.log('🧸 Creating products...');
  
  for (const product of products) {
    try {
      // Find category ID
      const category = categories.find(cat => cat.slug === product.category);
      if (!category) {
        console.error(`❌ Category not found for product: ${product.name}`);
        continue;
      }

      const productData = {
        name: product.name,
        description: product.description,
        price: product.price,
        slug: product.slug,
        featured: product.featured,
        category: category.id,
        publishedAt: new Date().toISOString()
      };

      const response = await axios.post(`${STRAPI_URL}/api/products`, {
        data: productData
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ Created product: ${product.name}`);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.details?.errors?.[0]?.path?.[0] === 'slug') {
        console.log(`ℹ️ Product already exists: ${product.name}`);
      } else {
        console.error(`❌ Error creating product ${product.name}:`, error.response?.data || error.message);
      }
    }
    
    await sleep(500); // Small delay between requests
  }
}

async function main() {
  console.log('🌱 Starting Zipo Ecommerce Auto-Seed...');
  console.log('=====================================');
  
  try {
    // Check if Strapi is running
    console.log('🔍 Checking Strapi connection...');
    await axios.get(`${STRAPI_URL}/api/categories`);
    console.log('✅ Strapi is running');
    
    // Create categories
    const createdCategories = await createCategories();
    
    if (createdCategories.length > 0) {
      // Create products
      await createProducts(createdCategories);
    }
    
    console.log('🎉 Auto-seed completed successfully!');
    console.log(`📊 Created ${createdCategories.length} categories and ${products.length} products`);
    console.log('');
    console.log('🌐 You can now visit:');
    console.log(`   Frontend: http://localhost:3000`);
    console.log(`   Backend:  ${STRAPI_URL}/admin`);
    
  } catch (error) {
    console.error('❌ Error during auto-seed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('');
      console.log('💡 Make sure Strapi is running:');
      console.log('   cd backend && npm run develop');
    }
  }
}

main();
