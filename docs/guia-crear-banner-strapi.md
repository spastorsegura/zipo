# Guía: Crear Content Type Banner en Strapi

## 🚀 Paso 1: Acceder al Content-Type Builder

1. **Abre Strapi Admin**
   - Ve a: http://localhost:1337/admin
   - Inicia sesión con tus credenciales

2. **Navega a Content-Type Builder**
   - En el menú lateral izquierdo, haz clic en **"Content-Type Builder"**
   - Está bajo la sección **"PLUGINS"**

## 📦 Paso 2: Crear nuevo Collection Type

1. **Crear nuevo Content Type**
   - Haz clic en **"+ Create new collection type"**
   - Se abrirá un formulario de configuración

2. **Configuración básica**
   ```
   Display name: Banner
   API ID (Plural): banners
   API ID (Singular): banner
   Kind: Collection Type
   ```

3. **Configuración avanzada**
   - ✅ Enable draft & publish
   - ✅ Draft & publish
   - ✅ Internationalization (si necesitas múltiples idiomas)

## 🎨 Paso 3: Agregar Campos

### Campo 1: Title (Título)
- **Field type**: Text
- **Name**: title
- **Settings**:
  - ✅ Required field
  - Max length: 100
  - Default value: (vacío)

### Campo 2: Description (Descripción)
- **Field type**: Text
- **Name**: description
- **Settings**:
  - ❌ Required field
  - Text type: Long text
  - Default value: (vacío)

### Campo 3: Image (Imagen)
- **Field type**: Media
- **Name**: image
- **Settings**:
  - ✅ Required field
  - Allowed file types: ✅ Images
  - Multiple: ❌ (false)
  - Default value: (vacío)

### Campo 4: Link (Enlace)
- **Field type**: Text
- **Name**: link
- **Settings**:
  - ❌ Required field
  - Max length: 255
  - Default value: (vacío)

### Campo 5: Link Text (Texto del enlace)
- **Field type**: Text
- **Name**: link_text
- **Settings**:
  - ❌ Required field
  - Max length: 50
  - Default value: (vacío)

### Campo 6: Position (Posición)
- **Field type**: Number
- **Name**: position
- **Settings**:
  - ✅ Required field
  - Number type: Integer
  - Min: 1
  - Max: 99
  - Default value: 1

### Campo 7: Is Active (Activo)
- **Field type**: Boolean
- **Name**: is_active
- **Settings**:
  - ✅ Required field
  - Default value: true

## 💾 Paso 4: Guardar

1. **Haz clic en "Save"**
2. **Espera a que Strapi reconstruya**
3. **Reinicia el servidor** si es necesario

## 🔐 Paso 5: Configurar Permisos

1. **Ve a Settings → Roles**
2. **Selecciona "Public"**
3. **Busca "Banner" en la lista de permisos**
4. **Activa estos permisos**:
   - ✅ find (Listar banners)
   - ✅ findOne (Ver un banner)
5. **Guarda los cambios**

## ✅ Paso 6: Probar la API

Abre tu navegador y ve a:
```
http://localhost:1337/api/banners
```

Deberías ver una respuesta JSON como:
```json
{
  "data": [],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 0
    }
  }
}
```

## 🎯 Paso 7: Crear Primer Banner

1. **Ve a Content Manager → Banners**
2. **Haz clic en "+ Create new entry"**
3. **Completa los campos**:
   - Title: "Nueva Colección"
   - Description: "Descubre nuestros productos más recientes"
   - Image: Sube una imagen
   - Link: "/productos"
   - Link Text: "Ver productos"
   - Position: 1
   - Is Active: true
4. **Haz clic en "Save"**
5. **Publica** el contenido

## 🔄 Paso 8: Verificar en Frontend

1. **Abre tu frontend**: http://localhost:3001
2. **Deberías ver el banner** rotando en el homepage
3. **Verifica que cambie cada 5 segundos**

## 🛠️ Solución de Problemas

### Error 404 en API
- Verifica que los permisos estén configurados
- Reinicia el servidor de Strapi

### No aparecen banners
- Verifica que `is_active` esté en true
- Revisa la consola del navegador para errores

### Imágenes no cargan
- Verifica que las imágenes estén publicadas
- Revisa las URLs en la respuesta de la API

## 📱 Campos Explicados

| Campo | Tipo | Uso | Ejemplo |
|-------|------|-----|---------|
| title | Text | Título principal | "Ofertas Especiales" |
| description | Text | Descripción larga | "Hasta 50% de descuento" |
| image | Media | Imagen del banner | URL de la imagen |
| link | Text | URL de destino | "/ofertas" |
| link_text | Text | Texto del botón | "Ver ofertas" |
| position | Number | Orden de aparición | 1, 2, 3... |
| is_active | Boolean | Mostrar/Ocultar | true/false |

¡Listo! Ahora tienes un sistema completo de banners administrables desde Strapi.
