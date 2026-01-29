const fs = require('fs');
const path = require('path');

// Script para crear manualmente el Content Type Banner
// Ejecutar con: node create-banner-manual.js

const bannerContentType = {
  "kind": "collectionType",
  "collectionName": "banners",
  "info": {
    "singularName": "banner",
    "pluralName": "banners",
    "displayName": "Banner",
    "description": "Banner rotativo para el homepage",
    "name": "Banner",
    "description": "Banner rotativo para el homepage"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {},
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 100
    },
    "description": {
      "type": "text"
    },
    "image": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    },
    "link": {
      "type": "string",
      "maxLength": 255
    },
    "link_text": {
      "type": "string",
      "maxLength": 50
    },
    "position": {
      "type": "integer",
      "required": true,
      "default": 1
    },
    "is_active": {
      "type": "boolean",
      "required": true,
      "default": true
    }
  }
};

console.log('📋 Content Type Banner JSON:');
console.log(JSON.stringify(bannerContentType, null, 2));
console.log('\n🔧 Pasos para crear manualmente:');
console.log('1. Abre http://localhost:1337/admin');
console.log('2. Ve a Content-Type Builder');
console.log('3. Click en "+ Create new collection type"');
console.log('4. Usa la configuración de arriba');
