# Portafolio 2025 — Windows Desktop + Android Mobile

Este proyecto es un portafolio que simula:

- Una experiencia tipo Windows en escritorio (ventanas, barra de tareas, etc.).
- Una experiencia tipo Android en móviles (home, recientes, barra inferior).

La selección se hace en cliente según `matchMedia` y el `userAgent`. También puedes forzar el modo para pruebas.

## Ejecutar

En PowerShell (Windows):

```powershell
pnpm install
pnpm dev
```

Abre `http://localhost:4321`.

## Forzar modo (debug)

- Query string: `/?mode=mobile` o `/?mode=desktop`.
- LocalStorage: `localStorage.setItem('forceMode','mobile')` o `'desktop'`.

El wrapper React `AppWrapper` decide qué UI montar:

- `src/components/desktop/DesktopContent.jsx` (Windows)
- `src/components/mobile/MobileShell.jsx` (Android)

## Estructura relevante

- `src/pages/index.astro`: monta una sola vez `AppWrapper`.
- `src/components/AppWrapper.jsx`: Redux + i18n + conmutación móvil/escritorio.
- `src/styles/global.css`: utilidades, safe-areas y helpers móviles.

## Build / Preview

```powershell
pnpm build
pnpm preview
```

Requiere Node 20.x y pnpm 9.x.
