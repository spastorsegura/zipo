'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import BannerCarousel from '@/components/banners/BannerCarousel';

const Hero = () => {
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${ZIPO_COLORS.sky} 0%, ${ZIPO_COLORS.background} 50%, ${ZIPO_COLORS.yellow}20 100%)` }}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{ backgroundColor: ZIPO_COLORS.orange + '40' }}
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{ backgroundColor: ZIPO_COLORS.blue + '40' }}
        />
        <motion.div
          animate={{
            x: [100, 0, 100],
            y: [100, 0, 100],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{ backgroundColor: ZIPO_COLORS.green + '40' }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: ZIPO_COLORS.orange + '20' }}
            >
              <Star className="h-4 w-4 mr-2" style={{ color: ZIPO_COLORS.orange }} />
              <span className="text-sm font-medium" style={{ color: ZIPO_COLORS.orange }}>
                Bienvenidos al mundo mágico de Zipo
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ color: ZIPO_COLORS.text }}
            >
              Descubre la
              <span style={{ background: ZIPO_COLORS.gradientPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {' '}magia
              </span>
              <br />
              para los más
              <span style={{ background: ZIPO_COLORS.gradientSecondary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {' '}pequeños
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg mb-8 max-w-2xl mx-auto lg:mx-0"
              style={{ color: ZIPO_COLORS.gray[600] }}
            >
              Cuentos infantiles que inspiran, ropa cómoda y adorable, y juguetes 
              que despiertan la imaginación. En Zipo encontramos todo lo que tu 
              pequeño necesita para crecer feliz.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start relative z-10"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/productos">
                  <Button
                    size="lg"
                    className={ZIPO_CLASSES.btnPrimaryGradient}
                    style={{ padding: '0.75rem 2rem' }}
                  >
                    Explorar productos
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/ofertas">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3"
                    style={{ 
                      borderColor: ZIPO_COLORS.orange,
                      color: ZIPO_COLORS.orange,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = ZIPO_COLORS.orange + '10';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Ofertas especiales
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-8 mt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: ZIPO_COLORS.orange }}>1000+</div>
                <div className="text-sm" style={{ color: ZIPO_COLORS.gray[600] }}>Productos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: ZIPO_COLORS.blue }}>500+</div>
                <div className="text-sm" style={{ color: ZIPO_COLORS.gray[600] }}>Familias felices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: ZIPO_COLORS.green }}>4.9★</div>
                <div className="text-sm" style={{ color: ZIPO_COLORS.gray[600] }}>Valoración</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Banner Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <BannerCarousel />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
