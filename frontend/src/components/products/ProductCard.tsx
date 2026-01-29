'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Check, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import { toast } from 'sonner';

import { Product } from '@/lib/api';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  // Validar que el producto exista
  if (!product) {
    return null;
  }

  const imageUrl = product.images?.[0]?.url || (product as any).image;
  const fullImageUrl = imageUrl ? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageUrl}` : null;
  const categoryName = (product as any).category?.name || '';

  // Función para extraer texto del rich text de Strapi
  const getTextFromRichText = (richText: any): string => {
    if (!richText) return '';
    if (typeof richText === 'string') return richText;
    if (Array.isArray(richText)) {
      return richText.map(item => {
        if (item.children && Array.isArray(item.children)) {
          return item.children.map((child: any) => child.text || '').join('');
        }
        return item.text || '';
      }).join('');
    }
    return '';
  };

  const description = getTextFromRichText(product.description);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    
    // Mostrar notificación de éxito
    toast.success(`${product.name} agregado al carrito`, {
      description: 'Producto añadido exitosamente',
      icon: <Check className="h-4 w-4 text-green-600" />,
    });
    
    // Resetear estado después de un tiempo
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative h-64 w-full bg-gray-100 cursor-pointer"
              onClick={() => window.location.href = `/producto/${product.slug}`}
            >
                {fullImageUrl ? (
                  <Image
                    src={fullImageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={true}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400">Sin imagen</span>
                  </div>
                )}
                
                {/* Category Badge */}
                {categoryName && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {categoryName}
                    </span>
                  </div>
                )}

                {/* Featured Badge */}
                {(product as any).featured && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                      ⭐ Destacado
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to wishlist logic
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        className="bg-pink-500 hover:bg-pink-600 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add to cart logic
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 
              className="font-semibold mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors cursor-pointer"
              onClick={() => window.location.href = `/producto/${product.slug}`}
              style={{ color: ZIPO_COLORS.text }}
            >
              {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold" style={{ color: ZIPO_COLORS.orange }}>
                  S/{product.price.toFixed(2)}
                </span>
              </div>
              
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    className={ZIPO_CLASSES.btnPrimary}
                    onClick={handleAddToCart}
                    disabled={isAdding}
                  >
                    {isAdding ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <ShoppingCart className="h-4 w-4 mr-1" />
                    )}
                    {isAdding ? 'Agregado' : 'Añadir'}
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
