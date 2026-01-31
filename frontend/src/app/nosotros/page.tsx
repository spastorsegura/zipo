'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Heart, Star, Users, Truck } from 'lucide-react';
import Link from 'next/link';
import { ZIPO_COLORS } from '@/lib/colors';

export default function NosotrosPage() {
  useEffect(() => {
    document.title = 'Nosotros - Zipo';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Conoce la historia de Zipo, tu tienda infantil de confianza. Descubre nuestra misión de llevar alegría y calidad a los más pequeños.');
    }
  }, []);
  return (
    <div className="min-h-screen" style={{ backgroundColor: ZIPO_COLORS.background }}>
      <Header />
      <main>
        {/* Hero Section */}
        <section style={{ background: `linear-gradient(135deg, ${ZIPO_COLORS.sky} 0%, ${ZIPO_COLORS.background} 50%, ${ZIPO_COLORS.yellow}20 100%)` }} className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: ZIPO_COLORS.text }}>
                Sobre <span style={{ background: ZIPO_COLORS.gradientPrimary, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Zipo</span>
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: ZIPO_COLORS.gray[600] }}>
                Somos una apasionada familia dedicada a llevar los mejores productos 
                infantiles a tu hogar, con amor, calidad y responsabilidad.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6" style={{ color: ZIPO_COLORS.text }}>Nuestra Historia</h2>
                <div className="space-y-4" style={{ color: ZIPO_COLORS.gray[600] }}>
                  <p>
                    Zipo nació en 2020 de un sueño simple: crear un lugar donde los padres 
                    pudieran encontrar todo lo que sus hijos necesitan, sin sacrificar calidad, 
                    seguridad o diseño.
                  </p>
                  <p>
                    Como padres, entendemos la importancia de cada elección que hacemos para 
                    nuestros pequeños. Por eso, cada producto en Zipo es cuidadosamente seleccionado 
                    para cumplir con los más altos estándares de seguridad y calidad.
                  </p>
                  <p>
                    Hoy, somos más que una tienda: somos una comunidad de familias que confían 
                    en nosotros para acompañarlos en la maravillosa aventura de criar hijos felices.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="rounded-3xl h-96 overflow-hidden relative">
                  <Image
                    src="/assets/zipohistoria.webp"
                    alt="Familia Zipo"
                    fill
                    className="object-cover rounded-3xl"
                    style={{ objectPosition: 'center' }}
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="py-20" style={{ backgroundColor: ZIPO_COLORS.gray[50] }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>Nuestros Valores</h2>
              <p className="text-lg" style={{ color: ZIPO_COLORS.gray[600] }}>
                Los principios que guian cada decisión que tomamos
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ZIPO_COLORS.orange + '20' }}>
                  <Heart className="h-8 w-8" style={{ color: ZIPO_COLORS.orange }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>Amor y Cuidado</h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Tratamos cada producto como si fuera para nuestros propios hijos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ZIPO_COLORS.blue + '20' }}>
                  <Star className="h-8 w-8" style={{ color: ZIPO_COLORS.blue }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>Calidad Superior</h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Seleccionamos solo los mejores materiales y fabricantes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ZIPO_COLORS.green + '20' }}>
                  <Users className="h-8 w-8" style={{ color: ZIPO_COLORS.green }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>Comunidad</h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Construimos relaciones duraderas con nuestras familias.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: ZIPO_COLORS.yellow + '20' }}>
                  <Truck className="h-8 w-8" style={{ color: ZIPO_COLORS.yellow }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>Responsabilidad</h3>
                <p style={{ color: ZIPO_COLORS.gray[600] }}>
                  Comprometidos con prácticas sostenibles y éticas.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4" style={{ color: ZIPO_COLORS.text }}>Nuestro Equipo</h2>
              <p className="text-lg" style={{ color: ZIPO_COLORS.gray[600] }}>
                Las personas detrás de la magia de Zipo
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden relative">
                  <Image
                    src="/assets/Fondo.webp"
                    alt="Ana Martínez"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>Marigen</h3>
                <p className="mb-2" style={{ color: ZIPO_COLORS.gray[600] }}>Diseñadora de moda</p>
                <p className="text-sm" style={{ color: ZIPO_COLORS.gray[500] }}>
                  Mamá de dos y apasionada por crear experiencias mágicas para niños.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden relative">
                  <Image
                    src="/assets/sergio.webp"
                    alt="Sergio Pastor"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>Sergio Pastor</h3>
                <p className="mb-2" style={{ color: ZIPO_COLORS.gray[600] }}>Creativo</p>
                <p className="text-sm" style={{ color: ZIPO_COLORS.gray[500] }}>
                  Diseñador especializado en productos infantiles seguros y divertidos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden relative">
                  <Image
                    src="/assets/marisa.webp"
                    alt="Marisa Calber"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: ZIPO_COLORS.text }}>Marisa Calber</h3>
                <p className="mb-2" style={{ color: ZIPO_COLORS.gray[600] }}>Recursos humanos</p>
                <p className="text-sm" style={{ color: ZIPO_COLORS.gray[500] }}>
                  Experta en seguridad infantil y control de calidad de productos.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20" style={{ background: ZIPO_COLORS.gradientPrimary }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h2 className="text-3xl font-bold mb-4">
                ¿Listo para unirte a la familia Zipo?
              </h2>
              <p className="text-xl mb-8" style={{ opacity: 0.9 }}>
                Descubre por qué miles de familias confían en nosotros
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/productos">
                  <button 
                    className="px-8 py-3 rounded-full font-medium transition-colors cursor-pointer"
                    style={{ 
                      backgroundColor: 'white', 
                      color: ZIPO_COLORS.orange,
                      border: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = ZIPO_COLORS.gray[100];
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    Ver Productos
                  </button>
                </Link>
                <Link href="/contacto">
                  <button
                    className="px-8 py-3 rounded-full font-medium text-white flex items-center gap-2 cursor-pointer transition-colors"
                    style={{ 
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: `2px solid white`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.color = ZIPO_COLORS.orange;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'white';
                    }}
                  >
                    Contactar
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
