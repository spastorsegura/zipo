'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowRight } from 'lucide-react';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import Image from 'next/image';
import MercadoPagoButton from '@/components/payment/MercadoPagoButton';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CartPage() {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const [orderId] = useState(() => `order-${Date.now()}`);

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

  const handleQuantityChange = (productId: string | number, newQuantity: number, productName: string) => {
    const idStr = productId.toString();
    if (newQuantity > 0) {
      updateQuantity(idStr, newQuantity);
      toast.success(`Cantidad actualizada`, {
        description: `${productName}: ${newQuantity} ${newQuantity === 1 ? 'unidad' : 'unidades'}`,
      });
    } else {
      updateQuantity(idStr, 0);
      toast.info(`Producto eliminado`, {
        description: `${productName} eliminado del carrito`,
      });
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.error(`Producto eliminado`, {
      description: `${productName} eliminado del carrito`,
    });
  };

  const handleClearCart = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
      toast.warning('Carrito vaciado', {
        description: 'Todos los productos han sido eliminados',
      });
    }
  };

  const shippingCost = total > 100 ? 0 : 15; // Envío gratis sobre S/100
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Tu carrito está vacío
                </h1>
                <p className="text-gray-600 mb-8">
                  ¡No tienes productos en tu carrito! Añade algunos productos para continuar.
                </p>
                <Link href="/">
                  <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                    Seguir comprando
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: ZIPO_COLORS.background }}>
      <Header />
      <main>
        <div style={{ background: `linear-gradient(135deg, ${ZIPO_COLORS.sky} 0%, ${ZIPO_COLORS.background} 50%, ${ZIPO_COLORS.yellow}20 100%)` }} className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h1 className="text-4xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>
                Tu Carrito
              </h1>
              <p className="text-lg" style={{ color: ZIPO_COLORS.gray[600] }}>
                Revisa tus productos antes de realizar el pago
              </p>
            </motion.div>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ boxShadow: ZIPO_CLASSES.shadowPrimary }}>
                <div className="p-6 border-b" style={{ borderBottomColor: ZIPO_COLORS.gray[200] }}>
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold" style={{ color: ZIPO_COLORS.text }}>
                      Productos ({itemCount})
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearCart}
                      className="text-red-600 hover:text-red-800"
                    >
                      Vaciar carrito
                    </Button>
                  </div>
                </div>

                <div className="divide-y" style={{ borderTopColor: ZIPO_COLORS.gray[200] }}>
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-6"
                      style={{ borderBottomColor: ZIPO_COLORS.gray[200] }}
                    >
                      <div className="flex items-center gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          {item.images?.[0]?.url ? (
                            <Image
                              src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${item.images[0].url}`}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                              unoptimized={true}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span style={{ color: ZIPO_COLORS.gray[400] }} className="text-xs">Sin imagen</span>
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate" style={{ color: ZIPO_COLORS.text }}>
                            {item.name}
                          </h3>
                          <p className="text-sm line-clamp-2 mb-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                            {getTextFromRichText(item.description)}
                          </p>
                          <p className="text-lg font-bold" style={{ color: ZIPO_COLORS.orange }}>
                            S/{item.price.toFixed(2)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.name)}
                              disabled={item.quantity <= 1}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.name)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemoveItem(item.id.toString(), item.name)}
                            className="text-red-600 hover:text-red-800 p-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Subtotal ({item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'})
                          </span>
                          <span className="font-semibold text-gray-900">
                            S/{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">
                    Resumen del Pedido
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span style={{ color: ZIPO_COLORS.gray[600] }}>Subtotal</span>
                      <span className="font-medium" style={{ color: ZIPO_COLORS.text }}>S/{total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span style={{ color: ZIPO_COLORS.gray[600] }}>Envío</span>
                      <span className="font-medium">
                        {shippingCost === 0 ? (
                          <span style={{ color: ZIPO_COLORS.green }}>Gratis</span>
                        ) : (
                          `S/${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {shippingCost > 0 && (
                      <div className="text-sm p-3 rounded" style={{ backgroundColor: ZIPO_COLORS.blue + '20', color: ZIPO_COLORS.blue }}>
                        Agrega S/{(100 - total).toFixed(2)} más para obtener envío gratis
                      </div>
                    )}

                    <div className="border-t pt-4" style={{ borderTopColor: ZIPO_COLORS.gray[200] }}>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold" style={{ color: ZIPO_COLORS.text }}>
                          Total
                        </span>
                        <span className="text-lg font-bold" style={{ color: ZIPO_COLORS.orange }}>
                          S/{finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* MercadoPago Button */}
                    <MercadoPagoButton 
                      items={items.map(item => ({
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                      }))}
                      orderId={orderId}
                      disabled={items.length === 0}
                    />

                    <Link href="/">
                      <Button variant="outline" className="w-full" style={{ borderColor: ZIPO_COLORS.blue, color: ZIPO_COLORS.blue }}>
                        <ArrowRight className="w-4 h-4 mr-2" />
                        Seguir comprando
                      </Button>
                    </Link>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pago seguro con Mercado Pago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
