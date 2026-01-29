'use client';

import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { api } from '@/lib/api';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ShoppingCart, Tag } from 'lucide-react';
import Image from 'next/image';

export default function OfertasClient() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      
      // Filtrar productos en oferta (destacados o aleatorios para simular ofertas)
      const productsOnSale = data.data?.filter((product: any) => 
        product.featured || Math.random() > 0.5 // Simulación aleatoria
      ) || [];
      
      setProducts(productsOnSale);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('No se pudieron cargar las ofertas');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      description: product.description,
      images: product.images,
      category: product.category
    });
    toast.success(`${product.name} agregado al carrito`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="h-48 w-full bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="flex justify-between items-center">
                  <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>
              Error
            </h1>
            <p style={{ color: ZIPO_COLORS.gray[600] }}>{error}</p>
            <Button 
              onClick={fetchProducts}
              className="mt-4"
              style={{ backgroundColor: ZIPO_COLORS.primary }}
            >
              Reintentar
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full" style={{ backgroundColor: ZIPO_COLORS.primary }}>
              <Tag className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>
            Ofertas Especiales
          </h1>
          <p className="text-xl" style={{ color: ZIPO_COLORS.gray[600] }}>
            Aprovecha nuestros descuentos exclusivos en productos seleccionados
          </p>
        </motion.div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <Tag className="w-16 h-16 mx-auto mb-4" style={{ color: ZIPO_COLORS.gray[400] }} />
            <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>
              No hay ofertas disponibles
            </h3>
            <p style={{ color: ZIPO_COLORS.gray[600] }}>
              Vuelve pronto para encontrar nuevas promociones
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative"
                style={{ boxShadow: ZIPO_CLASSES.shadowPrimary }}
              >
                {/* Badge de descuento */}
                <div className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  OFERTA
                </div>

                {/* Product Image */}
                <div className="relative h-48">
                  {product.images?.[0]?.url ? (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${product.images[0].url}`}
                      alt={product.name}
                      width={300}
                      height={256}
                      className="w-full h-full object-cover"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span style={{ color: ZIPO_COLORS.gray[400] }}>Sin imagen</span>
                    </div>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                    {product.description}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-bold" style={{ color: ZIPO_COLORS.primary }}>
                        S/. {product.price.toFixed(2)}
                      </span>
                      {product.featured && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          S/. {(product.price * 1.3).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                    style={{ backgroundColor: ZIPO_COLORS.primary }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar al Carrito
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center p-8 rounded-lg"
          style={{ backgroundColor: ZIPO_COLORS.primary }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">
            ¿No encontraste lo que buscabas?
          </h2>
          <p className="text-white mb-6 text-lg">
            Explora nuestro catálogo completo de productos infantiles
          </p>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => window.location.href = '/productos'}
          >
            Ver Todos los Productos
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
