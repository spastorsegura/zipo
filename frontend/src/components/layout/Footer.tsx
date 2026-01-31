'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Baby, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { ZIPO_COLORS, ZIPO_CLASSES } from '@/lib/colors';
import Image from 'next/image';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ background: `linear-gradient(135deg, ${ZIPO_COLORS.sky} 0%, ${ZIPO_COLORS.background} 100%)` }}
      className="border-t"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/assets/logoZipo.png"
                alt="Zipo"
                width={150}
                height={60}
                className="h-10 w-auto object-contain"
              />
              <span className="sr-only">
                Zipo
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Tu tienda infantil de confianza para productos de calidad que inspiran y divierten.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: ZIPO_COLORS.blue, color: 'white' }}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: ZIPO_COLORS.orange, color: 'white' }}
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                style={{ backgroundColor: ZIPO_COLORS.blue, color: 'white' }}
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>Categorías</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categoria/cuentos-infantiles" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.orange }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Cuentos Infantiles
                </Link>
              </li>
              <li>
                <Link href="/categoria/ropa-ninos" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.orange }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Ropa de Niños
                </Link>
              </li>
              <li>
                <Link href="/categoria/ropa-bebes" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.orange }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Ropa de Bebés
                </Link>
              </li>
              <li>
                <Link href="/categoria/juguetes" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.orange }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Juguetes
                </Link>
              </li>
              <li>
                <Link href="/categoria/accesorios" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.orange }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>

          {/* Enlaces Útiles */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>Enlaces Útiles</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/nosotros" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.blue }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.blue }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/envios" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.blue }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Envíos y Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.blue }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/ofertas" className="transition-colors" style={{ color: ZIPO_COLORS.gray[600] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.orange }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[600] }}>
                  Ofertas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: ZIPO_COLORS.text }}>Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" style={{ color: ZIPO_COLORS.blue }} />
                <span className="text-sm" style={{ color: ZIPO_COLORS.gray[600] }}>hola@zipo.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" style={{ color: ZIPO_COLORS.blue }} />
                <span className="text-sm" style={{ color: ZIPO_COLORS.gray[600] }}>+51 976 317 906</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" style={{ color: ZIPO_COLORS.blue }} />
                <span className="text-sm" style={{ color: ZIPO_COLORS.gray[600] }}>Lima, Perú</span>
              </div>
            </div>

            {/* Redes Sociales */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3" style={{ color: ZIPO_COLORS.text }}>Síguenos</h4>
              <div className="flex space-x-3">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: ZIPO_COLORS.blue + '20', color: ZIPO_COLORS.blue }}
                >
                  <span className="text-sm font-semibold">f</span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: ZIPO_COLORS.orange + '20', color: ZIPO_COLORS.orange }}
                >
                  <span className="text-sm font-semibold">ig</span>
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: ZIPO_COLORS.green + '20', color: ZIPO_COLORS.green }}
                >
                  <span className="text-sm font-semibold">in</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8" style={{ borderTopColor: ZIPO_COLORS.gray[200] }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: ZIPO_COLORS.gray[500] }}>
              © {new Date().getFullYear()} Zipo. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacidad" className="text-sm transition-colors" style={{ color: ZIPO_COLORS.gray[500] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.blue }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[500] }}>
                Política de Privacidad
              </Link>
              <Link href="/cookies" className="text-sm transition-colors" style={{ color: ZIPO_COLORS.gray[500] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.blue }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[500] }}>
                Política de Cookies
              </Link>
              <Link href="/terminos" className="text-sm transition-colors" style={{ color: ZIPO_COLORS.gray[500] }} onMouseEnter={(e) => { e.currentTarget.style.color = ZIPO_COLORS.blue }} onMouseLeave={(e) => { e.currentTarget.style.color = ZIPO_COLORS.gray[500] }}>
                Términos y Condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
