'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async afterCreate() {
    // Importar los servicios necesarios
    const { getService } = require('@strapi/plugin-users-permissions/server/utils');
    const knex = strapi.db.connection;
    
    try {
      console.log('🌱 Starting seed data for Zipo Ecommerce...');
      
      // 1. Crear categorías
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

      console.log('📚 Creating categories...');
      const createdCategories = [];
      for (const category of categories) {
        const existingCategory = await strapi.entityService.findMany('api::category.category', {
          filters: { slug: category.slug }
        });
        
        if (existingCategory.length === 0) {
          const created = await strapi.entityService.create('api::category.category', {
            data: category
          });
          createdCategories.push(created);
          console.log(`✅ Created category: ${category.name}`);
        } else {
          createdCategories.push(existingCategory[0]);
          console.log(`ℹ️ Category already exists: ${category.name}`);
        }
      }

      // 2. Crear productos
      const products = [
        // Cuentos Infantiles
        {
          name: 'El Dragón Valiente',
          description: 'Una aventura mágica sobre un pequeño dragón que aprende a ser valiente. Con ilustraciones coloridas y una historia que enseña sobre el coraje y la amistad.',
          price: 12.99,
          slug: 'el-dragon-valiente',
          featured: true,
          category: 'cuentos-infantiles',
          images: ['book1.jpg']
        },
        {
          name: 'La Princesa y el Jardín Secreto',
          description: 'Una encantadora historia sobre una princesa que descubre un jardín mágico lleno de criaturas maravillosas. Perfecto para antes de dormir.',
          price: 14.99,
          slug: 'la-princesa-y-el-jardin-secreto',
          featured: true,
          category: 'cuentos-infantiles',
          images: ['book2.jpg']
        },
        {
          name: 'Aventuras en el Espacio',
          description: 'Únete a los pequeños astronautas en su viaje por el sistema solar. Un libro educativo y divertido para aprender sobre el espacio.',
          price: 16.99,
          slug: 'aventuras-en-el-espacio',
          featured: false,
          category: 'cuentos-infantiles',
          images: ['book3.jpg']
        },
        {
          name: 'El Bosque Encantado',
          description: 'Descubre los secretos del bosque donde los animales hablan y los árboles cuentan historias. Una aventura llena de magia y naturaleza.',
          price: 13.99,
          slug: 'el-bosque-encantado',
          featured: false,
          category: 'cuentos-infantiles',
          images: ['book4.jpg']
        },

        // Ropa de Niños
        {
          name: 'Conjunto de Verano Tropical',
          description: 'Fresco conjunto de camiseta y pantalón corto con estampado tropical. Confeccionado con algodón orgánico suave al tacto.',
          price: 24.99,
          slug: 'conjunto-verano-tropical',
          featured: true,
          category: 'ropa-ninos',
          images: ['outfit1.jpg']
        },
        {
          name: 'Vestido de Flores Primaverales',
          description: 'Hermoso vestido con estampado de flores y lazos. Perfecto para ocasiones especiales y juego diario.',
          price: 29.99,
          slug: 'vestido-flores-primaverales',
          featured: true,
          category: 'ropa-ninos',
          images: ['outfit2.jpg']
        },
        {
          name: 'Pantalón Cargo Infantil',
          description: 'Pantalón cargo con múltiples bolsillos y tejido resistente. Ideal para aventuras y exploraciones.',
          price: 22.99,
          slug: 'pantalon-cargo-infantil',
          featured: false,
          category: 'ropa-ninos',
          images: ['outfit3.jpg']
        },
        {
          name: 'Sudadera con Capucha de Unicornio',
          description: 'Acogedora sudadera con capucha y diseño de unicornio. Perfecta para días frescos y abrazos.',
          price: 26.99,
          slug: 'sudadera-capucha-unicornio',
          featured: true,
          category: 'ropa-ninos',
          images: ['outfit4.jpg']
        },

        // Ropa de Bebés
        {
          name: 'Body de Algodón Orgánico',
          description: 'Suave body de algodón orgánico con broches de seguridad. Disponible en varios colores pastel.',
          price: 9.99,
          slug: 'body-algodon-organico',
          featured: false,
          category: 'ropa-bebes',
          images: ['baby1.jpg']
        },
        {
          name: 'Conjunto de Pijama de Animales',
          description: 'Adorable conjunto de pijama con estampado de animales. Tejido suave que cuida la piel delicada del bebé.',
          price: 19.99,
          slug: 'conjunto-pijama-animales',
          featured: true,
          category: 'ropa-bebes',
          images: ['baby2.jpg']
        },
        {
          name: 'Manta de Pana con Caperuza',
          description: 'Caliente manta de pana con caperuza de animalito. Perfecta para mantener al bebé abrigado y cómodo.',
          price: 24.99,
          slug: 'manta-pana-caperuza',
          featured: true,
          category: 'ropa-bebes',
          images: ['baby3.jpg']
        },
        {
          name: 'Calcetines Antideslizantes',
          description: 'Pack de 6 pares de calcetines con diseños divertidos y suela antideslizante. Ideales para primeros pasos.',
          price: 12.99,
          slug: 'calcetines-antideslizantes',
          featured: false,
          category: 'ropa-bebes',
          images: ['baby4.jpg']
        },

        // Juguetes
        {
          name: 'Bloques de Construcción de Madera',
          description: 'Set de 50 bloques de madera con colores vivos. Estimula la creatividad y habilidades motoras finas.',
          price: 34.99,
          slug: 'bloques-construccion-madera',
          featured: true,
          category: 'juguetes',
          images: ['toy1.jpg']
        },
        {
          name: 'Peluche de Unicornio Gigante',
          description: 'Suave peluche de unicornio de 60cm. Perfecto compañero de aventuras y sueños.',
          price: 39.99,
          slug: 'peluche-unicornio-gigante',
          featured: true,
          category: 'juguetes',
          images: ['toy2.jpg']
        },
        {
          name: 'Taller de Herramientas Infantil',
          description: 'Set de herramientas de juguete con taladro, martillo y tornillos. Fomenta la coordinación y resolución de problemas.',
          price: 29.99,
          slug: 'taller-herramientas-infantil',
          featured: false,
          category: 'juguetes',
          images: ['toy3.jpg']
        },
        {
          name: 'Rompecabezas de Animales',
          description: 'Rompecabezas de 100 piezas con ilustraciones de animales de la selva. Ideal para desarrollar concentración.',
          price: 14.99,
          slug: 'rompecabezas-animales',
          featured: false,
          category: 'juguetes',
          images: ['toy4.jpg']
        },

        // Accesorios
        {
          name: 'Mochila Escolar de Dinosaurios',
          description: 'Espaciosa mochila con estampado de dinosaurios y compartimentos organizados. Ajustable y cómoda.',
          price: 32.99,
          slug: 'mochila-escolar-dinosaurios',
          featured: true,
          category: 'accesorios',
          images: ['acc1.jpg']
        },
        {
          name: 'Botella de Agua con Sorbete',
          description: 'Botella de acero inoxidable con sorbete integrado y diseño de animales. Libre de BPA.',
          price: 16.99,
          slug: 'botella-agua-sorbete',
          featured: false,
          category: 'accesorios',
          images: ['acc2.jpg']
        },
        {
          name: 'Gorro de Invierno con Orejeras',
          description: 'Caliente gorro de lana con orejeras y pompón. Protege del frío con estilo.',
          price: 18.99,
          slug: 'gorro-invierno-orejeras',
          featured: false,
          category: 'accesorios',
          images: ['acc3.jpg']
        },
        {
          name: 'Lunch Box con Compartimentos',
          description: 'Práctica lunch box con múltiples compartimentos y diseños coloridos. Fácil de limpiar.',
          price: 19.99,
          slug: 'lunch-box-compartimentos',
          featured: false,
          category: 'accesorios',
          images: ['acc4.jpg']
        }
      ];

      console.log('🧸 Creating products...');
      for (const productData of products) {
        const existingProduct = await strapi.entityService.findMany('api::product.product', {
          filters: { slug: productData.slug }
        });
        
        if (existingProduct.length === 0) {
          // Encontrar la categoría correspondiente
          const category = createdCategories.find(cat => cat.attributes.slug === productData.category);
          
          if (category) {
            const created = await strapi.entityService.create('api::product.product', {
              data: {
                name: productData.name,
                description: productData.description,
                price: productData.price,
                slug: productData.slug,
                featured: productData.featured,
                category: category.id,
                publishedAt: new Date().toISOString(),
              }
            });
            console.log(`✅ Created product: ${productData.name}`);
          }
        } else {
          console.log(`ℹ️ Product already exists: ${productData.name}`);
        }
      }

      console.log('🎉 Seed data completed successfully!');
      console.log(`📊 Created ${createdCategories.length} categories and ${products.length} products`);
      
    } catch (error) {
      console.error('❌ Error seeding data:', error);
    }
  }
};
