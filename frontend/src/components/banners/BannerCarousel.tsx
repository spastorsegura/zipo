'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { bannerApi, Banner } from '@/lib/api-banners';
import { ZIPO_COLORS } from '@/lib/colors';
import { Skeleton } from '@/components/ui/skeleton';

// Banners temporales simples - solo imágenes
const temporaryBanners: Banner[] = [
  {
    id: 1,
    documentId: 'temp1',
    position: 1,
    is_active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    image: {
      id: 1,
      documentId: 'img1',
      name: 'banner-1.jpg',
      alternativeText: 'Banner 1',
      caption: null,
      width: 1200,
      height: 500,
      formats: {
        large: {
          url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
          width: 1200,
          height: 500
        }
      },
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop'
    }
  },
  {
    id: 2,
    documentId: 'temp2',
    position: 2,
    is_active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    image: {
      id: 2,
      documentId: 'img2',
      name: 'banner-2.jpg',
      alternativeText: 'Banner 2',
      caption: null,
      width: 1200,
      height: 500,
      formats: {
        large: {
          url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop',
          width: 1200,
          height: 500
        }
      },
      url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop'
    }
  },
  {
    id: 3,
    documentId: 'temp3',
    position: 3,
    is_active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    image: {
      id: 3,
      documentId: 'img3',
      name: 'banner-3.jpg',
      alternativeText: 'Banner 3',
      caption: null,
      width: 1200,
      height: 500,
      formats: {
        large: {
          url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=500&fit=crop',
          width: 1200,
          height: 500
        }
      },
      url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&h=500&fit=crop'
    }
  },
  {
    id: 4,
    documentId: 'temp4',
    position: 4,
    is_active: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    image: {
      id: 4,
      documentId: 'img4',
      name: 'banner-4.jpg',
      alternativeText: 'Banner 4',
      caption: null,
      width: 1200,
      height: 500,
      formats: {
        large: {
          url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=500&fit=crop',
          width: 1200,
          height: 500
        }
      },
      url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=500&fit=crop'
    }
  }
];

export default function BannerCarousel() {
  const [banners, setBanners] = useState<Banner[]>(temporaryBanners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setIsLoading(true);
        const activeBanners = await bannerApi.getActiveBanners();
        if (activeBanners.length > 0) {
          setBanners(activeBanners);
        }
      } catch (error) {
        console.log('Using temporary banners while Strapi is being configured');
        // Keep temporary banners if API fails
        console.log('API Error:', error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    loadBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="relative w-full h-full"
        >
          {/* Background Image - Full Width */}
          <div className="absolute inset-0">
            {currentBanner.image?.url ? (
              <Image
                src={currentBanner.image.url.startsWith('http') 
                  ? currentBanner.image.url 
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${currentBanner.image.url}`
                }
                alt={currentBanner.image.alternativeText || `Banner ${currentIndex + 1}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                unoptimized={true}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center" style={{ background: ZIPO_COLORS.gradientPrimary }}>
                <span className="text-white text-2xl font-bold">Banner {currentIndex + 1}</span>
              </div>
            )}
          </div>

          {/* Navigation Arrows */}
          {banners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous banner"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next banner"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
