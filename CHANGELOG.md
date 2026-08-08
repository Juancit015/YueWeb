# Changelog

Todas las modificaciones relevantes del proyecto YueWeb.

## [0.4.0] - 2026-08-08

### Added

- README: sección "Variables de entorno" con `PORT` (única variable del proyecto) y sección "URLs y puertos" (portada y escena del avatar).
- README: instrucción para detener el servidor (`Ctrl+C`).

### Changed

- README: verificación del avatar aclarada (no hay `package.json`; Playwright se instala a demanda con `npm install playwright` + `npx playwright install chromium` y se ejecuta con `node` directo).
- README: nota de que el servidor usa solo la stdlib de Python (`http.server`), sin dependencias adicionales.

## [0.3.0] - 2026-08-08

### Added

- `serve.sh`: servidor estático de un solo comando (carpeta contenedora, puerto 8765, `PORT` configurable) para que las rutas del avatar funcionen sin pasos manuales.
- README: tabla de parámetros URL de `avatar.html` (`vrm`, `turn`, `camDist`, `camY`, `armDown`, `armFwd`, `armIn`, `gest`, `debug`) y detalle de las capturas generadas por la verificación (`/tmp/yue-web-*-ready.png`).
- README: `serve.sh` documentado en la estructura del proyecto y en la sección de ejecución.

## [0.2.0] - 2026-08-08

### Added

- Imágenes de las cards optimizadas a **AVIF** y **WebP** (reducción del 96-98% del peso; ver `assets/card_*.avif|webp`).
- Estructura `<picture>` en `index.html` con selección automática de formato y fallback al JPG original.
- `README.md` con stack, estructura, ejecución y verificación del avatar.
- `CHANGELOG.md`.

## [0.1.0] - 2026-08-07

### Added

- Landing page `index.html` con hero, proyecto, capacidades, equipo, privacidad y footer.
- Render del avatar 3D VRM (`avatar.html` + `assets/yue.vrm`) integrado en el hero mediante iframe.
- Control del avatar desde `app.js`: emociones por sección, mirada con el cursor, gestos y estados de carga/fallback.
- Estilos propios en `styles.css` con tema de YUE (tailwind config en `index.html`).
- Iconos Lucide y Tailwind en `vendor/`.
- Script de verificación Playwright `checks/avatar-check.js` (canvas no en blanco, sin overflow móvil).
