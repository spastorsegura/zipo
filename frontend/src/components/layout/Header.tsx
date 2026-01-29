'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, Baby } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useCart } from '@/contexts/CartContext';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const categories = [
    { name: 'Cuentos Infantiles', href: '/categoria/cuentos-infantiles' },
    { name: 'Ropa de Niños', href: '/categoria/ropa-ninos' },
    { name: 'Ropa de Bebés', href: '/categoria/ropa-bebes' },
    { name: 'Juguetes', href: '/categoria/juguetes' },
    { name: 'Accesorios', href: '/categoria/accesorios' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/assets/logoZIPO.png"
                alt="Zipo"
                width={150}
                height={60}
                className="h-10 w-auto object-contain"
                loading="eager"
                priority
              />
            </motion.div>
            <span className="sr-only">Zipo</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  style={{ 
                    color: ZIPO_COLORS.text,
                    backgroundColor: 'transparent'
                  }}
                  className="hover:text-orange-500 transition-colors"
                >
                  Categorías
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]" style={{ backgroundColor: 'white' }}>
                    {categories.map((category) => (
                      <NavigationMenuLink key={category.name} asChild>
                        <Link
                          href={category.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 focus:bg-orange-50"
                          style={{ color: ZIPO_COLORS.text }}
                        >
                          <div className="text-sm font-medium leading-none hover:text-orange-500 transition-colors">
                            {category.name}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  href="/ofertas" 
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-orange-50 focus:bg-orange-50 focus:outline-none"
                  style={{ 
                    color: ZIPO_COLORS.text,
                    backgroundColor: 'transparent'
                  }}
                >
                  Ofertas
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  href="/nosotros" 
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-orange-50 focus:bg-orange-50 focus:outline-none"
                  style={{ 
                    color: ZIPO_COLORS.text,
                    backgroundColor: 'transparent'
                  }}
                >
                  Nosotros
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/carrito">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" style={{ color: ZIPO_COLORS.blue }} />
                  {itemCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ backgroundColor: ZIPO_COLORS.orange }}
                    >
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </Button>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: ZIPO_COLORS.blue }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3" style={{ backgroundColor: 'white' }}>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-50 transition-colors"
                  style={{ color: ZIPO_COLORS.text }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/ofertas"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-50 transition-colors"
                style={{ color: ZIPO_COLORS.text }}
                onClick={() => setIsMenuOpen(false)}
              >
                Ofertas
              </Link>
              <Link
                href="/nosotros"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-50 transition-colors"
                style={{ color: ZIPO_COLORS.text }}
                onClick={() => setIsMenuOpen(false)}
              >
                Nosotros
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
