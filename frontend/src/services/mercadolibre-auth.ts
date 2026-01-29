import { MERCADO_LIBRE_CONFIG, MercadoLibreAuth, MercadoLibreUser } from '@/lib/mercadolibre';

export class MercadoLibreAuthService {
  private static instance: MercadoLibreAuthService;
  private authData: MercadoLibreAuth | null = null;

  static getInstance(): MercadoLibreAuthService {
    if (!MercadoLibreAuthService.instance) {
      MercadoLibreAuthService.instance = new MercadoLibreAuthService();
    }
    return MercadoLibreAuthService.instance;
  }

  // Obtener URL de autorización
  getAuthUrl(): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: MERCADO_LIBRE_CONFIG.APP_ID,
      redirect_uri: MERCADO_LIBRE_CONFIG.REDIRECT_URI,
      scope: MERCADO_LIBRE_CONFIG.SCOPES.join(' ')
    });

    return `${MERCADO_LIBRE_CONFIG.AUTH_URL}/authorization?${params.toString()}`;
  }

  // Intercambiar código por access token
  async exchangeCodeForToken(code: string): Promise<MercadoLibreAuth> {
    try {
      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: MERCADO_LIBRE_CONFIG.APP_ID,
          client_secret: MERCADO_LIBRE_CONFIG.CLIENT_SECRET,
          code: code,
          redirect_uri: MERCADO_LIBRE_CONFIG.REDIRECT_URI,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al obtener token: ${response.statusText}`);
      }

      const authData: MercadoLibreAuth = await response.json();
      
      // Guardar en localStorage
      this.saveAuthData(authData);
      
      return authData;
    } catch (error) {
      console.error('Error en exchangeCodeForToken:', error);
      throw error;
    }
  }

  // Refrescar el token
  async refreshToken(): Promise<MercadoLibreAuth> {
    try {
      const currentAuth = this.getAuthData();
      if (!currentAuth?.refresh_token) {
        throw new Error('No hay refresh token disponible');
      }

      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: MERCADO_LIBRE_CONFIG.APP_ID,
          client_secret: MERCADO_LIBRE_CONFIG.CLIENT_SECRET,
          refresh_token: currentAuth.refresh_token,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al refrescar token: ${response.statusText}`);
      }

      const authData: MercadoLibreAuth = await response.json();
      this.saveAuthData(authData);
      
      return authData;
    } catch (error) {
      console.error('Error en refreshToken:', error);
      throw error;
    }
  }

  // Obtener información del usuario
  async getUserInfo(accessToken: string): Promise<MercadoLibreUser> {
    try {
      const response = await fetch(`${MERCADO_LIBRE_CONFIG.API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error al obtener información del usuario: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error en getUserInfo:', error);
      throw error;
    }
  }

  // Verificar si el token es válido
  isTokenValid(): boolean {
    const authData = this.getAuthData();
    if (!authData) return false;

    // El token expira en expires_in segundos desde que se obtuvo
    const expiresAt = localStorage.getItem('ml_token_expires_at');
    if (!expiresAt) return false;

    return Date.now() < parseInt(expiresAt);
  }

  // Obtener access token válido
  async getValidAccessToken(): Promise<string> {
    if (this.isTokenValid()) {
      const authData = this.getAuthData();
      return authData!.access_token;
    }

    // Intentar refrescar el token
    try {
      const newAuthData = await this.refreshToken();
      return newAuthData.access_token;
    } catch (error) {
      // Si no se puede refrescar, limpiar y redirigir a auth
      this.logout();
      throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
    }
  }

  // Guardar datos de autenticación
  private saveAuthData(authData: MercadoLibreAuth): void {
    this.authData = authData;
    const expiresAt = Date.now() + (authData.expires_in * 1000);
    
    localStorage.setItem('ml_auth_data', JSON.stringify(authData));
    localStorage.setItem('ml_token_expires_at', expiresAt.toString());
  }

  // Obtener datos de autenticación
  getAuthData(): MercadoLibreAuth | null {
    if (this.authData) {
      return this.authData;
    }

    try {
      const stored = localStorage.getItem('ml_auth_data');
      if (stored) {
        this.authData = JSON.parse(stored);
        return this.authData;
      }
    } catch (error) {
      console.error('Error al obtener auth data:', error);
    }

    return null;
  }

  // Cerrar sesión
  logout(): void {
    this.authData = null;
    localStorage.removeItem('ml_auth_data');
    localStorage.removeItem('ml_token_expires_at');
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return this.isTokenValid();
  }
}

// Exportar instancia singleton
export const mercadoLibreAuth = MercadoLibreAuthService.getInstance();
