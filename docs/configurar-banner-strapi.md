# 🚀 Guía Rápida: Configurar Banner en Strapi

## 📋 Problemas Actuales:
- ❌ Error 403 (Forbidden) en API de banners
- ✅ Logo arreglado (usa `/assets/logoZIPO.png`)
- ✅ Banners temporales funcionando

## 🔧 Pasos para configurar Strapi:

### 1. Acceder al Admin Panel
```
http://localhost:1337/admin
```

### 2. Crear Content Type Banner
1. **Content-Type Builder** → **"+ Create new collection type"**
2. **Display name**: `Banner`
3. **API ID (Plural)**: `banners`
4. **API ID (Singular)**: `banner`
5. **Kind**: `Collection Type`
6. ✅ **Enable draft & publish**

### 3. Agregar Campos:

#### Campo: title
- **Field type**: `Text`
- **Name**: `title`
- ✅ **Required field**
- **Max length**: `100`

#### Campo: description  
- **Field type**: `Text`
- **Name**: `description`
- **Text type**: `Long text`
- ❌ **Required field**

#### Campo: image
- **Field type**: `Media`
- **Name**: `image`
- ✅ **Required field**
- ✅ **Images only**
- ❌ **Multiple**

#### Campo: link
- **Field type**: `Text`
- **Name**: `link`
- **Max length**: `255`
- ❌ **Required field**

#### Campo: link_text
- **Field type**: `Text`
- **Name**: `link_text`
- **Max length**: `50`
- ❌ **Required field**

#### Campo: position
- **Field type**: `Number`
- **Name**: `position`
- ✅ **Required field**
- **Number type**: `Integer`
- **Default value**: `1`

#### Campo: is_active
- **Field type**: `Boolean`
- **Name**: `is_active`
- ✅ **Required field**
- **Default value**: `true`

### 4. Configurar Permisos:

#### Para rol "Public":
1. **Settings** → **Roles** → **Public**
2. Busca **"Banner"** en la lista
3. ✅ **find** (Listar banners)
4. ✅ **findOne** (Ver un banner)
5. **Save**

#### Para rol "Admin":
1. **Settings** → **Roles** → **Admin**
2. Busca **"Banner"** en la lista
3. ✅ **find**
4. ✅ **findOne**
5. ✅ **create**
6. ✅ **update**
7. ✅ **delete**
8. **Save**

### 5. Reiniciar Strapi
```bash
pkill -f "strapi"
cd backend && npm run develop
```

### 6. Probar API
```bash
curl http://localhost:1337/api/banners
```

### 7. Crear Primer Banner
1. **Content Manager** → **Banners**
2. **"+ Create new entry"**
3. **Completar campos**:
   ```
   title: "Nueva Colección"
   description: "Descubre nuestros productos más recientes"
   image: [subir imagen]
   link: "/productos"
   link_text: "Ver productos"
   position: 1
   is_active: true
   ```
4. **Save** → **Publish**

## 🎯 Estado Actual:

### ✅ Funcionando:
- **Frontend**: Banners temporales con rotación cada 5s
- **Logo**: `/assets/logoZIPO.png` encontrado
- **Animaciones**: Efecto flotante y transiciones suaves
- **Diseño**: Colores Zipo aplicados

### ⏳ Pendiente:
- **Content Type Banner**: Crear en Strapi
- **Permisos API**: Configurar acceso público
- **Banners reales**: Reemplazar temporales

### 🔄 Resultado esperado:
- **API responde**: `http://localhost:1337/api/banners`
- **Banners dinámicos**: Desde Strapi
- **Admin panel**: Gestión completa de banners
- **Rotación automática**: Cada 5 segundos

## 🚨 Si tienes problemas:
1. **Error 403**: Revisa permisos en Settings → Roles
2. **API no responde**: Reinicia Strapi
3. **Banners no aparecen**: Verifica `is_active: true`
4. **Imágenes no cargan**: Publica las imágenes en Media Library

¡Listo! Sigue estos pasos y tendrás el sistema de banners funcionando con Strapi.
