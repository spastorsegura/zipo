# 🚨 Error 404: Content Type Banner No Existe

## 🔍 Problema:
```
HTTP error! status: 404
```

## ✅ Solución Inmediata:
Los **banners temporales ya están funcionando**. El sistema muestra banners de ejemplo mientras configuras Strapi.

## 🔧 Pasos para Crear Content Type Banner:

### 1. Acceder a Strapi Admin
```
http://localhost:1337/admin
```

### 2. Crear Content Type
1. **Content-Type Builder** (menú lateral)
2. **"+ Create new collection type"**
3. **Display name**: `Banner`
4. **API ID (Plural)**: `banners`
5. **API ID (Singular)**: `banner`
6. ✅ **Enable draft & publish**
7. **Save**

### 3. Agregar Campos (en orden):

#### Campo 1: title
- **Field type**: `Text`
- **Name**: `title`
- ✅ **Required field**
- **Max length**: `100`

#### Campo 2: description
- **Field type**: `Text`
- **Name**: `description`
- **Text type**: `Long text`
- ❌ **Required field**

#### Campo 3: image
- **Field type**: `Media`
- **Name**: `image`
- ✅ **Required field**
- ✅ **Images only**
- ❌ **Multiple**

#### Campo 4: link
- **Field type**: `Text`
- **Name**: `link`
- **Max length**: `255`
- ❌ **Required field**

#### Campo 5: link_text
- **Field type**: `Text`
- **Name**: `link_text`
- **Max length**: `50`
- ❌ **Required field**

#### Campo 6: position
- **Field type**: `Number`
- **Name**: `position`
- ✅ **Required field**
- **Number type**: `Integer`
- **Default value**: `1`

#### Campo 7: is_active
- **Field type**: `Boolean`
- **Name**: `is_active`
- ✅ **Required field**
- **Default value**: `true`

### 4. Configurar Permisos:
1. **Settings** → **Roles** → **Public**
2. Busca **"Banner"** en la lista
3. ✅ **find** (Listar banners)
4. ✅ **findOne** (Ver un banner)
5. **Save**

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
- **Banners temporales**: Rotación cada 5s
- **Efecto flotante**: Animación suave
- **Colores Zipo**: Aplicados
- **Logo**: Visible

### ⏳ Pendiente:
- **Content Type Banner**: Crear en Strapi
- **Permisos**: Configurar acceso público

### 🔄 Resultado:
- **Mientras tanto**: Banners temporales funcionando
- **Después de configurar**: Banners dinámicos desde Strapi

## 🚀 Importante:
**No necesitas detener el desarrollo**. Los banners temporales mantienen la funcionalidad mientras configuras Strapi.

Una vez creado el Content Type, el sistema cambiará automáticamente a los banners de Strapi sin necesidad de modificar código.
