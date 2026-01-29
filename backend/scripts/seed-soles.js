'use strict';

// Datos de seed con precios en soles y descripciones detalladas
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
    description: 'Una aventura mágica sobre un pequeño dragón que aprende a ser valiente. Con ilustraciones coloridas y una historia que enseña sobre el coraje y la amistad. Ideal para niños de 4 a 8 años. Tapa dura con 32 páginas llenas de fantasía.',
    price: 49.90,
    slug: 'el-dragon-valiente',
    featured: true,
    category: 'cuentos-infantiles',
  },
  {
    name: 'La Princesa y el Jardín Secreto',
    description: 'Una encantadora historia sobre una princesa que descubre un jardín mágico lleno de criaturas maravillosas. Perfecto para antes de dormir. Con ilustraciones acuarela que capturan la magia de cada momento.',
    price: 54.90,
    slug: 'la-princesa-y-el-jardin-secreto',
    featured: true,
    category: 'cuentos-infantiles',
  },
  {
    name: 'Aventuras en el Espacio',
    description: 'Únete a los pequeños astronautas en su viaje por el sistema solar. Un libro educativo y divertido para aprender sobre el espacio. Incluye datos reales sobre planetas y estrellas. Recomendado para curiosos de 6 a 10 años.',
    price: 59.90,
    slug: 'aventuras-en-el-espacio',
    featured: false,
    category: 'cuentos-infantiles',
  },
  {
    name: 'El Bosque Encantado',
    description: 'Descubre los secretos del bosque donde los animales hablan y los árboles cuentan historias. Una aventura llena de magia y naturaleza. Enseña sobre el cuidado del medio ambiente de forma divertida.',
    price: 44.90,
    slug: 'el-bosque-encantado',
    featured: false,
    category: 'cuentos-infantiles',
  },

  // Ropa de Niños
  {
    name: 'Conjunto de Verano Tropical',
    description: 'Fresco conjunto de camiseta y pantalón corto con estampado tropical. Confeccionado con algodón orgánico suave al tacto. Perfecto para días calurosos de juego. Disponible en colores verde lima y azul cielo.',
    price: 89.90,
    slug: 'conjunto-verano-tropical',
    featured: true,
    category: 'ropa-ninos',
  },
  {
    name: 'Vestido de Flores Primaverales',
    description: 'Hermoso vestido con estampado de flores y lazos. Perfecto para ocasiones especiales y juego diario. Tejido ligero y transpirable. Cierre trasero con botones seguros. Lavable a máquina.',
    price: 109.90,
    slug: 'vestido-flores-primaverales',
    featured: true,
    category: 'ropa-ninos',
  },
  {
    name: 'Pantalón Cargo Infantil',
    description: 'Pantalón cargo con múltiples bolsillos y tejido resistente. Ideal para aventuras y exploraciones. Cintura elástica ajustable. Refuerzos en rodillas para mayor durabilidad. Perfecto para niños activos.',
    price: 79.90,
    slug: 'pantalon-cargo-infantil',
    featured: false,
    category: 'ropa-ninos',
  },
  {
    name: 'Sudadera con Capucha de Unicornio',
    description: 'Acogedora sudadera con capucha y diseño de unicornio. Perfecta para días frescos y abrazos. Tejido polar suave que no pica. Bolsillo frontal canguro. Diseño con orejitas y cuerno bordados.',
    price: 99.90,
    slug: 'sudadera-capucha-unicornio',
    featured: true,
    category: 'ropa-ninos',
  },

  // Ropa de Bebés
  {
    name: 'Body de Algodón Orgánico',
    description: 'Suave body de algodón orgánico con broches de seguridad. Disponible en varios colores pastel. Hipoalergénico y seguro para la piel delicada. Broches de hombro para facilitar el vestido. Tallas desde 0 a 12 meses.',
    price: 34.90,
    slug: 'body-algodon-organico',
    featured: false,
    category: 'ropa-bebes',
  },
  {
    name: 'Conjunto de Pijama de Animales',
    description: 'Adorable conjunto de pijama con estampado de animales. Tejido suave que cuida la piel delicada del bebé. Incluye pantalón y camiseta. Diseño con ositos, conejitos y tortugitas. Perfecto para un sueño reparador.',
    price: 69.90,
    slug: 'conjunto-pijama-animales',
    featured: true,
    category: 'ropa-bebes',
  },
  {
    name: 'Manta de Pana con Caperuza',
    description: 'Caliente manta de pana con caperuza de animalito. Perfecta para mantener al bebé abrigado y cómodo. Diseño con orejitas de conejo o zorro. Tamaño ideal para cuna o cochecito. Lavable a máquina.',
    price: 89.90,
    slug: 'manta-pana-caperuza',
    featured: true,
    category: 'ropa-bebes',
  },
  {
    name: 'Calcetines Antideslizantes',
    description: 'Pack de 6 pares de calcetines con diseños divertidos y suela antideslizante. Ideales para primeros pasos. Tejido de algodón con elastán. Diseños con animalitos y figuras geométricas. Talla única para 6-18 meses.',
    price: 44.90,
    slug: 'calcetines-antideslizantes',
    featured: false,
    category: 'ropa-bebes',
  },

  // Juguetes
  {
    name: 'Bloques de Construcción de Madera',
    description: 'Set de 50 bloques de madera con colores vivos. Estimula la creatividad y habilidades motoras finas. Pinturas no tóxicas y seguras. Incluye formas geométricas básicas. Ideal para niños de 2 a 6 años. Fomenta el aprendizaje temprano.',
    price: 129.90,
    slug: 'bloques-construccion-madera',
    featured: true,
    category: 'juguetes',
  },
  {
    name: 'Peluche de Unicornio Gigante',
    description: 'Suave peluche de unicornio de 60cm. Perfecto compañero de aventuras y sueños. Relleno hipoalergénico. Arcoíris de colores en crin y cola. Ojos seguros bordados. Lavable a mano. Acompaña al niño en cada etapa.',
    price: 149.90,
    slug: 'peluche-unicornio-gigante',
    featured: true,
    category: 'juguetes',
  },
  {
    name: 'Taller de Herramientas Infantil',
    description: 'Set de herramientas de juguete con taladro, martillo y tornillos. Fomenta la coordinación y resolución de problemas. Incluye caja de almacenamiento. Sonidos realistas y luces LED. Piezas grandes y seguras para manos pequeñas.',
    price: 109.90,
    slug: 'taller-herramientas-infantil',
    featured: false,
    category: 'juguetes',
  },
  {
    name: 'Rompecabezas de Animales',
    description: 'Rompecabezas de 100 piezas con ilustraciones de animales de la selva. Ideal para desarrollar concentración. Piezas grandes y resistentes. Incluye póster guía. Perfecto para noches familiares. Educa sobre especies en peligro de extinción.',
    price: 54.90,
    slug: 'rompecabezas-animales',
    featured: false,
    category: 'juguetes',
  },

  // Accesorios
  {
    name: 'Mochila Escolar de Dinosaurios',
    description: 'Espaciosa mochila con estampado de dinosaurios y compartimentos organizados. Ajustable y cómoda. Material resistente al agua. Bolsillos laterales para botella. Refuerzos ergonómicos en espalda. Ideal para preescolar y primaria.',
    price: 119.90,
    slug: 'mochila-escolar-dinosaurios',
    featured: true,
    category: 'accesorios',
  },
  {
    name: 'Botella de Agua con Sorbete',
    description: 'Botella de acero inoxidable con sorbete integrado y diseño de animales. Libre de BPA. Capacidad 500ml. Mantén líquidos fríos por 12 horas. Fácil limpieza. Diseño con leones, jirafas y elefantes.',
    price: 59.90,
    slug: 'botella-agua-sorbete',
    featured: false,
    category: 'accesorios',
  },
  {
    name: 'Gorro de Invierno con Orejeras',
    description: 'Caliente gorro de lana con orejeras y pompón. Protege del frío con estilo. Forro interior suave. Talla ajustable con correa. Diseño nórdico con renos y copos de nieve. Perfecto para inviernos peruanos.',
    price: 69.90,
    slug: 'gorro-invierno-orejeras',
    featured: false,
    category: 'accesorios',
  },
  {
    name: 'Lunch Box con Compartimentos',
    description: 'Práctica lunch box con múltiples compartimentos y diseños coloridos. Fácil de limpiar. Material libre de BPA. Incluye tenedor y cuchara. Cierre hermético. Ideal para el colegio o picnics familiares.',
    price: 74.90,
    slug: 'lunch-box-compartimentos',
    featured: false,
    category: 'accesorios',
  }
];

console.log('🌱 Zipo Ecommerce Seed Data - Precios en Soles');
console.log('=============================================');
console.log('');
console.log('📚 Categories to create:');
categories.forEach((cat, index) => {
  console.log(`${index + 1}. ${cat.name}`);
  console.log(`   slug: ${cat.slug}`);
  console.log(`   description: ${cat.description}`);
  console.log('');
});

console.log('🧸 Products to create:');
products.forEach((prod, index) => {
  console.log(`${index + 1}. ${prod.name}`);
  console.log(`   slug: ${prod.slug}`);
  console.log(`   price: S/. ${prod.price.toFixed(2)}`);
  console.log(`   featured: ${prod.featured}`);
  console.log(`   category: ${prod.category}`);
  console.log(`   description: ${prod.description}`);
  console.log('');
});

console.log('💰 Precios en Soles Peruanos (S/.)');
console.log('📦 Total de productos: 20');
console.log('📂 Total de categorías: 5');
console.log('');
console.log('🔗 Instructions:');
console.log('1. Go to http://localhost:1337/admin');
console.log('2. Navigate to Content Manager > Category');
console.log('3. Create all 5 categories using the data above');
console.log('4. Navigate to Content Manager > Product');
console.log('5. Create all 20 products using the data above');
console.log('6. Make sure to select the correct category for each product');
console.log('');
console.log('💡 Tip: Copy-paste the data to save time!');
