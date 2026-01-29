'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/api';
import { api } from '@/lib/api';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ShoppingCart, Grid, List, Search } from 'lucide-react';
import Image from 'next/image';

export default function ProductosClient() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc'>('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, sortBy, priceRange]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts();
      setProducts(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      return matchesSearch && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product: Product) => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="h-64 w-full bg-gray-200 rounded-lg animate-pulse" />
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
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>
            Todos los Productos
          </h1>
          <p style={{ color: ZIPO_COLORS.gray[600] }}>
            Descubre nuestra completa colección de productos infantiles
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: ZIPO_COLORS.gray[300],
                focusRingColor: ZIPO_COLORS.primary
              }}
            />
          </div>

          {/* Controls Row */}
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                size="sm"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                size="sm"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: ZIPO_COLORS.gray[300] }}
            >
              <option value="name">Ordenar por nombre</option>
              <option value="price-asc">Precio: Menor a mayor</option>
              <option value="price-desc">Precio: Mayor a menor</option>
            </select>
          </div>

          {/* Price Range */}
          <div className="flex gap-4 items-center">
            <span style={{ color: ZIPO_COLORS.gray[600] }}>Rango de precio:</span>
            <input
              type="number"
              placeholder="Mín"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              className="w-24 px-3 py-2 border rounded-lg"
              style={{ borderColor: ZIPO_COLORS.gray[300] }}
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Máx"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
              className="w-24 px-3 py-2 border rounded-lg"
              style={{ borderColor: ZIPO_COLORS.gray[300] }}
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: ZIPO_COLORS.gray[600] }}>
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: ZIPO_COLORS.gray[600] }}>
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={
                  viewMode === 'grid'
                    ? 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
                    : 'bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition-shadow'
                }
                style={{ boxShadow: ZIPO_CLASSES.shadowPrimary }}
              >
                {viewMode === 'grid' ? (
                  <>
                    {/* Grid View */}
                    <div className="relative h-48">
                      {product.images?.[0]?.url ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${product.images[0].url}`}
                          alt={product.name}
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span style={{ color: ZIPO_COLORS.gray[400] }}>Sin imagen</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>
                        {product.name}
                      </h3>
                      <p className="text-sm mb-3 line-clamp-2" style={{ color: ZIPO_COLORS.gray[600] }}>
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold" style={{ color: ZIPO_COLORS.primary }}>
                          S/. {product.price.toFixed(2)}
                        </span>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          size="sm"
                          style={{ backgroundColor: ZIPO_COLORS.primary }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* List View */}
                    <div className="w-32 h-32 flex-shrink-0 relative">
                      {product.images?.[0]?.url ? (
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${product.images[0].url}`}
                          alt={product.name}
                          fill
                          className="object-cover rounded-lg"
                          unoptimized={true}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                          <span style={{ color: ZIPO_COLORS.gray[400] }}>Sin imagen</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2" style={{ color: ZIPO_COLORS.text }}>
                        {product.name}
                      </h3>
                      <p className="mb-3" style={{ color: ZIPO_COLORS.gray[600] }}>
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold" style={{ color: ZIPO_COLORS.primary }}>
                          S/. {product.price.toFixed(2)}
                        </span>
                        <Button
                          onClick={() => handleAddToCart(product)}
                          style={{ backgroundColor: ZIPO_COLORS.primary }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Agregar
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
