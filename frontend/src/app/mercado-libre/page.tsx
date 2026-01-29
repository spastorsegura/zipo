'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ExternalLink, Pause, Play, Trash2, RefreshCw, DollarSign, Box, TrendingUp } from 'lucide-react';
import { mercadoLibreAuth } from '@/services/mercadolibre-auth';
import { mercadoLibreProducts } from '@/services/mercadolibre-products';
import { MercadoLibrePublication } from '@/lib/mercadolibre';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function MercadoLibreDashboard() {
  const [publications, setPublications] = useState<MercadoLibrePublication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    checkAuthAndLoadPublications();
  }, []);

  const checkAuthAndLoadPublications = async () => {
    try {
      if (!mercadoLibreAuth.isAuthenticated()) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      await loadPublications();
    } catch (error) {
      console.error('Error checking auth:', error);
      setError('Error al verificar autenticación');
      setLoading(false);
    }
  };

  const loadPublications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mercadoLibreProducts.getPublications();
      setPublications(data);
    } catch (error) {
      console.error('Error loading publications:', error);
      setError('Error al cargar publicaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    const authUrl = mercadoLibreAuth.getAuthUrl();
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    mercadoLibreAuth.logout();
    setIsAuthenticated(false);
    setPublications([]);
  };

  const handlePausePublication = async (itemId: string) => {
    try {
      setActionLoading(itemId);
      await mercadoLibreProducts.pausePublication(itemId);
      await loadPublications();
    } catch (error) {
      console.error('Error pausing publication:', error);
      setError('Error al pausar publicación');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReactivatePublication = async (itemId: string) => {
    try {
      setActionLoading(itemId);
      await mercadoLibreProducts.reactivatePublication(itemId);
      await loadPublications();
    } catch (error) {
      console.error('Error reactivating publication:', error);
      setError('Error al reactivar publicación');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeletePublication = async (itemId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) {
      return;
    }

    try {
      setActionLoading(itemId);
      await mercadoLibreProducts.deletePublication(itemId);
      await loadPublications();
    } catch (error) {
      console.error('Error deleting publication:', error);
      setError('Error al eliminar publicación');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'paused':
        return 'Pausada';
      case 'closed':
        return 'Cerrada';
      default:
        return status;
    }
  };

  const calculateStats = () => {
    const active = publications.filter(p => p.status === 'active').length;
    const paused = publications.filter(p => p.status === 'paused').length;
    const totalValue = publications.reduce((sum, p) => sum + (p.price * p.available_quantity), 0);

    return { active, paused, totalValue };
  };

  if (!isAuthenticated) {
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
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Conectar con Mercado Libre
                </h1>
                <p className="text-gray-600 mb-8">
                  Conecta tu cuenta de Mercado Libre para gestionar tus publicaciones directamente desde Zipo.
                </p>
                <Button
                  onClick={handleLogin}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Conectar con Mercado Libre
                </Button>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard de Mercado Libre
                </h1>
                <p className="text-gray-600">
                  Gestiona tus publicaciones de Mercado Libre
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={loadPublications}
                  disabled={loading}
                  variant="outline"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Actualizar
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                >
                  Cerrar sesión
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Publicaciones Activas</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Publicaciones Pausadas</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.paused}</p>
                  </div>
                  <Pause className="w-8 h-8 text-yellow-600" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Valor Total</p>
                    <p className="text-2xl font-bold text-blue-600">S/{stats.totalValue.toFixed(2)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </motion.div>
            </div>

            {/* Publications List */}
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Cargando publicaciones...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <p className="text-red-800">{error}</p>
                  <Button onClick={loadPublications} className="mt-4">
                    Reintentar
                  </Button>
                </div>
              </div>
            ) : publications.length === 0 ? (
              <div className="text-center py-12">
                <Box className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hay publicaciones
                </h3>
                <p className="text-gray-600">
                  Aún no tienes publicaciones en Mercado Libre.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Producto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {publications.map((publication) => (
                        <motion.tr
                          key={publication.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={publication.pictures[0]?.secure_url || '/placeholder.jpg'}
                                  alt={publication.title}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                                  {publication.title}
                                </div>
                                <a
                                  href={publication.permalink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Ver en ML
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">S/{publication.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{publication.available_quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(publication.status)}`}>
                              {getStatusText(publication.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              {publication.status === 'active' ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePausePublication(publication.id)}
                                  disabled={actionLoading === publication.id}
                                >
                                  <Pause className="w-3 h-3 mr-1" />
                                  {actionLoading === publication.id ? '...' : 'Pausar'}
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleReactivatePublication(publication.id)}
                                  disabled={actionLoading === publication.id}
                                >
                                  <Play className="w-3 h-3 mr-1" />
                                  {actionLoading === publication.id ? '...' : 'Activar'}
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeletePublication(publication.id)}
                                disabled={actionLoading === publication.id}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
