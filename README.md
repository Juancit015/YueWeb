# YueWeb

Sitio web de **YUE Companion**, un proyecto académico de inteligencia artificial que ofrece un espacio de conversación y compañía a personas que atraviesan momentos de dificultad emocional, académica o familiar. Esta web es la landing page promocional: hero con avatar 3D real, presentación del proyecto, capacidades, equipo y privacidad.

## Stack

- Frontend estático: HTML + CSS propio (`styles.css`) + Tailwind CSS (incluido localmente en `vendor/`)
- Iconos: Lucide (`vendor/lucide.min.js`)
- Avatar 3D: modelo VRM (`assets/yue.vrm`) renderizado en `avatar.html` (cámara y gestos configurables por parámetros URL)
- Integración del avatar en `index.html` vía `<iframe>` con control de emociones/gestos desde `app.js`
- Imágenes optimizadas en AVIF/WebP con originales JPG como fallback

## Estructura

```
.
├── index.html          # Landing page principal
├── avatar.html         # Render 3D del avatar VRM (cargado en el iframe)
├── app.js              # Control del avatar: emociones, gestos, mirada y navegación
├── styles.css          # Hoja de estilos de todo el sitio
├── assets/
│   ├── yue.vrm         # Modelo 3D del avatar (VRM)
│   └── card_*.{jpg,webp,avif}  # Imágenes de las cards (AVIF y WebP optimizadas)
├── checks/
│   └── avatar-check.js # Verificación con Playwright del render del avatar
└── vendor/
    ├── tailwindcss.js  # Tailwind cargado en runtime
    └── lucide.min.js   # Iconos lucide
```

## Requisitos

- Python 3 (solo para el servidor estático)
- Node.js npm (solo para la verificación con Playwright)
- Navegador con soporte WebGL para el avatar 3D

## Ejecución

El avatar se sirve desde la carpeta raíz del proyecto (la URL de verificación usa la ruta `/web/...`, por lo que se sirve la carpeta **contenedora**):

```bash
cd ..                    # subir a la carpeta que contiene a `web/`
python3 -m http.server 8765
```

Abrir `http://127.0.0.1:8765/web/index.html`.

Si prefieres servir solo esta carpeta, ajusta el puerto y la ruta en `checks/avatar-check.js` (ahí aparece la URL `http://127.0.0.1:8765/web/index.html`).

## Verificación del avatar

```bash
npm install playwright
npx playwright install chromium
node checks/avatar-check.js
```

El script abre la página en escritorio (1440x900) y móvil (390x844), espera a que el avatar renderice y comprueba que el canvas no esté en blanco (también detecta el estado de fallback `is-fallback`).

## Optimización de imágenes

Las cards usan AVIF/WebP con fallback a JPG:

```html
<picture>
  <source srcset="assets/card_chat.avif" type="image/avif">
  <source srcset="assets/card_chat.webp" type="image/webp">
  <img src="assets/card_chat.jpg" alt="Comunicación" class="card-bg">
</picture>
```

Los formatos AVIF/WebP reducen el peso un ~90-98% frente al JPG original. Regenerar con `avifenc` (AVIF) o ImageMagick (WebP) manteniendo la estructura `<picture>`.

## Créditos

- Agente IA: Anghelo
- Diseño y desarrollo web: Juan David

## Changelog

Ver [CHANGELOG.md](./CHANGELOG.md).