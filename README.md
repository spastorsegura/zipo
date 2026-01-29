# 🧸 Zipo - Tienda Infantil Ecommerce

Un ecommerce completo para productos infantiles con Next.js frontend y Strapi backend.

## 🛍️ Características

- **Frontend**: Next.js 15 con TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Strapi CMS con PostgreSQL/Neon
- **Animaciones**: Framer Motion y React Bits
- **Productos**: Cuentos infantiles, ropa, juguetes, accesorios
- **Diseño**: Moderno, responsive y amigable para niños

## 🚀 Inicio Rápido

### Requisitos
- Node.js 20+
- npm o yarn

### Instalación

1. **Clonar el proyecto**
```bash
git clone <repository-url>
cd zipo-ecommerce
```

2. **Configurar Backend (Strapi)**
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales de Neon PostgreSQL
npm run develop
```

3. **Configurar Frontend (Next.js)**
```bash
cd frontend
npm install
npm run dev
```

### Acceso a las Aplicaciones

- **Frontend**: http://localhost:3000
- **Backend Admin**: http://localhost:1337/admin

## 📋 Configuración de Strapi

### 1. Crear Content Types

En http://localhost:1337/admin:

#### Category
- `name` (Text)
- `slug` (Text, Unique)
- `description` (Text, Long text)

#### Product  
- `name` (Text)
- `description` (Rich text)
- `price` (Number, decimal)
- `slug` (Text, Unique)
- `featured` (Boolean)
- `category` (Relation with Category)
- `images` (Media, Multiple)

### 2. Configurar Permisos

Settings > Roles > Public:
- ✅ Category: find, findOne
- ✅ Product: find, findOne

### 3. Seed Data

```bash
cd backend
node scripts/seed-simple.js
```

Esto mostrará los datos de ejemplo que puedes crear manualmente en el Content Manager.

## 🛠️ Tecnologías

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Component library
- **Framer Motion** - Animaciones
- **Lucide React** - Iconos

### Backend
- **Strapi 5** - Headless CMS
- **PostgreSQL** - Base de datos (Neon)
- **SQLite** - Desarrollo local

## 📁 Estructura del Proyecto

```
zipo-ecommerce/
├── frontend/                 # Next.js app
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   │   ├── layout/      # Header, Footer
│   │   │   ├── home/        # Hero sections
│   │   │   ├── products/    # Product cards, grid
│   │   │   └── ui/          # shadcn/ui components
│   │   ├── lib/             # API client, utils
│   │   └── app/             # App router pages
│   └── package.json
├── backend/                  # Strapi CMS
│   ├── config/              # Database, plugins config
│   ├── data/                # Seed data
│   ├── scripts/             # Seed scripts
│   └── package.json
└── README.md
```

## 🎨 Componentes Principales

### Layout
- **Header**: Navegación con menú categorías y carrito
- **Footer**: Enlaces, contacto y redes sociales

### Home
- **Hero**: Sección principal con animaciones
- **ProductGrid**: Grid de productos con animaciones

### Products
- **ProductCard**: Tarjeta de producto individual
- **API**: Cliente para conectar con Strapi

## 🌟 Features Implementadas

- ✅ Diseño responsive
- ✅ Animaciones fluidas (Framer Motion)
- ✅ Componentes UI modernos (shadcn/ui)
- ✅ API REST con Strapi
- ✅ Gestión de categorías
- ✅ Productos destacados
- ✅ Imágenes optimizadas
- ✅ SEO friendly

## 🚀 Próximos Pasos

- [ ] Carrito de compras funcional
- [ ] Sistema de autenticación
- [ ] Proceso de checkout
- [ ] Integración de pagos
- [ ] Panel de usuario
- [ ] Sistema de reseñas
- [ ] Búsqueda avanzada
- [ ] Filtros de productos

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Hecho con ❤️ para los más pequeños**
