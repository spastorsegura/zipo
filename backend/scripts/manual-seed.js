console.log('🌱 Zipo Ecommerce Manual Seed Guide');
console.log('===================================');
console.log('');
console.log('📋 Para crear los datos manualmente en Strapi:');
console.log('');
console.log('1️⃣ Ve a http://localhost:1337/admin');
console.log('');
console.log('2️⃣ Crea las siguientes CATEGORÍAS:');
console.log('');

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

categories.forEach((cat, index) => {
  console.log(`${index + 1}. Name: ${cat.name}`);
  console.log(`   Slug: ${cat.slug}`);
  console.log(`   Description: ${cat.description}`);
  console.log('');
});

console.log('3️⃣ Crea los siguientes PRODUCTOS:');
console.log('');

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

products.forEach((product, index) => {
  console.log(`${index + 1}. Name: ${product.name}`);
  console.log(`   Description: ${product.description.substring(0, 100)}...`);
  console.log(`   Price: S/${product.price}`);
  console.log(`   Slug: ${product.slug}`);
  console.log(`   Featured: ${product.featured}`);
  console.log(`   Category: ${product.category}`);
  console.log('');
});

console.log('4️⃣ CONFIGURA PERMISOS:');
console.log('   - Ve a Settings > Roles > Public');
console.log('   - Para Category: marca ✅ find, ✅ findOne');
console.log('   - Para Product: marca ✅ find, ✅ findOne');
console.log('   - Guarda los cambios');
console.log('');
console.log('5️⃣ PUBLICA LOS PRODUCTOS:');
console.log('   - Asegúrate de que cada producto tenga "Published" marcado');
console.log('');
console.log('🎉 Una vez hecho esto, tu frontend mostrará los productos!');
console.log('');
console.log('🌐 Visita:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend:  http://localhost:1337/admin');
