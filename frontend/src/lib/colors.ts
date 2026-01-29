// Paleta de colores Zipo
export const ZIPO_COLORS = {
  // Colores base
  orange: '#FF8A1F',    // CTA / destaque
  blue: '#1E88E5',      // Marca / títulos
  yellow: '#FFD43B',    // Accentos
  green: '#4CAF50',     // Secundario / fondo
  sky: '#E3F2FD',       // Background suave
  ink: '#1F2937',      // Texto principal
  
  // Colores semánticos
  primary: '#FF8A1F',  // Zipo Orange
  secondary: '#1E88E5', // Zipo Blue
  accent: '#FFD43B',    // Zipo Yellow
  success: '#4CAF50',  // Zipo Green
  background: '#E3F2FD', // Zipo Sky
  text: '#1F2937',     // Ink
  
  // Gradientes
  gradientPrimary: 'linear-gradient(135deg, #FF8A1F 0%, #FFD43B 100%)',
  gradientSecondary: 'linear-gradient(135deg, #1E88E5 0%, #E3F2FD 100%)',
  gradientSuccess: 'linear-gradient(135deg, #4CAF50 0%, #E3F2FD 100%)',
  
  // Colores extendidos para UI
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Colores de estado
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
  successState: '#10B981',
} as const;

// Clases CSS para Tailwind
export const ZIPO_CLASSES = {
  // Botones CTA (Orange)
  btnPrimary: 'bg-[#FF8A1F] hover:bg-[#FF7A1F] text-white font-medium transition-colors',
  btnPrimaryGradient: 'bg-gradient-to-r from-[#FF8A1F] to-[#FFD43B] hover:from-[#FF7A1F] hover:to-[#FFC42B] text-white font-medium transition-all',
  
  // Botones secundarios (Blue)
  btnSecondary: 'bg-[#1E88E5] hover:bg-[#0E78D5] text-white font-medium transition-colors',
  btnSecondaryGradient: 'bg-gradient-to-r from-[#1E88E5] to-[#E3F2FD] hover:from-[#0E78D5] hover:to-[#D1E9FD] text-white font-medium transition-all',
  
  // Botones de éxito (Green)
  btnSuccess: 'bg-[#4CAF50] hover:bg-[#3A9F40] text-white font-medium transition-colors',
  
  // Textos
  textPrimary: 'text-[#1F2937]',
  textSecondary: 'text-[#1E88E5]',
  textAccent: 'text-[#FFD43B]',
  
  // Fondos
  bgPrimary: 'bg-[#E3F2FD]',
  bgSecondary: 'bg-[#4CAF50]',
  bgAccent: 'bg-[#FFD43B]',
  
  // Bordes
  borderPrimary: 'border-[#FF8A1F]',
  borderSecondary: 'border-[#1E88E5]',
  
  // Sombras con colores Zipo
  shadowPrimary: 'shadow-[0_4px_14px_0_rgba(255,138,31,0.15)]',
  shadowSecondary: 'shadow-[0_4px_14px_0_rgba(30,136,229,0.15)]',
  shadowAccent: 'shadow-[0_4px_14px_0_rgba(255,212,59,0.15)]',
} as const;
