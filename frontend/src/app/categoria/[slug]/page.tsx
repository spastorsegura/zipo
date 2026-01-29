import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { api } from '@/lib/api';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const categories = await api.getCategories();
    const category = categories.data?.find((cat: any) => cat.slug === resolvedParams.slug);
    
    if (!category) {
      return {
        title: 'Categoría - Zipo',
        description: 'Explora nuestras categorías de productos infantiles',
      };
    }

    return {
      title: `${category.name} - Zipo`,
      description: category.description,
    };
  } catch (error) {
    return {
      title: 'Categoría - Zipo',
      description: 'Explora nuestras categorías de productos infantiles',
    };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  try {
    const resolvedParams = await params;
    const products = await api.getProductsByCategory(resolvedParams.slug);
    const categories = await api.getCategories();
    const category = categories.data?.find((cat: any) => cat.slug === resolvedParams.slug);

    if (!category) {
      notFound();
    }

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

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              <p className="text-lg text-gray-600">
                {category.description}
              </p>
            </div>
            
            {products.data && products.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.data.map((product: any) => {
                  const description = getTextFromRichText(product.description);
                  return (
                  <div key={product.id} className="group">
                    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                      <div className="relative h-64 bg-gray-100">
                        {product.images?.[0]?.url ? (
                          <img
                            src={`http://localhost:1337${product.images[0].url}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <span className="text-gray-400">Sin imagen</span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-pink-500">
                            S/{product.price.toFixed(2)}
                          </span>
                          <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm">
                            Añadir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📦</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay productos en esta categoría
                </h3>
                <p className="text-gray-600">
                  Pronto tendremos nuevos productos disponibles.
                </p>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading category:', error);
    notFound();
  }
}
