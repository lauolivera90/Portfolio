# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.

Formato: secciones por fecha/sesión, la más reciente arriba. Una sesión = una unidad de trabajo (setup, un widget, un ajuste de diseño).

## 2026-08-11 — Sesión: Hero home

### Added
- Strip de tecnologías en el home (donde estaban las stats): título `Technologies I work with` + iconos placeholder de `lucide-react` (`Code2`, `Database`, `Server`, `Globe`, `Braces`) desde un array local `TECH_ICONS` listo para migrar a `shared/data/`.
- Tip reutilizable en `.doc/rules.md`: heroes full-height con unidades `svh` (`min-h-svh`), con nota de `dvh` y espaciado compacto.

### Changed
- Strip de tecnologías: iconos en una segunda línea debajo del título, `size 28`, gaps `gap-5`.
- Hero full-height consistente en todos los tamaños de pantalla: `min-h-screen` → `min-h-svh`, y reducción del whitespace vertical fijo (`py-24`→`py-16`, `mb-10`→`mb-8`, `mt-16 pt-8`→`mt-10 pt-6`, subtítulo `mb-6`→`mb-5`) para que el strip entre siempre en viewports de 667px+.
- `h1` escalable: `text-5xl md:text-6xl` → `text-[clamp(2.5rem,7vw,3.75rem)]`.

### Removed
- Badge `Available for new projects`.
- Stats del hero (`Years of experience`, `Projects shipped`, `Teams served`).

## 2026-08-11 — Sesión: Navbar target móvil

### Changed
- `NavbarItem` refactorizado: el subrayado (`border-b-2`) pasa a un `<span>` interno (`px-4 py-2`) y el `<a>` queda como el target. En el menú móvil recibe `w-full flex justify-center` para que toda la fila sea zona de click manteniendo la etiqueta (y el subrayado) centrados; en desktop no cambia el aspecto ni el ratio.

## 2026-08-11 — Sesión: Navbar hide-on-scroll

### Added
- `useHideOnScroll` (listener de scroll, threshold 200, cleanup) y `useNavbarVisibility` (composición: oculto al bajar salvo hover/menú abierto; `reveal`/`unreveal` para hover).
- Franja trigger `h-4` en el borde superior cuando el navbar está oculto; transición `duration-300` con `motion-reduce:transition-none`.

## 2026-08-11 — Sesión: NavbarItem + sección activa

### Added
- `NavbarItem` (componente presentacional: `label`, `href`, `active`) usado en nav desktop y menú móvil.
- `useActiveSection` (IntersectionObserver, banda central `-40% 0px -55% 0px`) en `shared/hook/`; activo `border-primary` + `text-primary`, inactivo `border-transparent` (subrayado invisible, sin layout shift).

## 2026-08-11 — Sesión: Fuente Inter + primitivas Button/IconButton

### Added
- Fuente Inter (400/500/600/700) cargada en `index.html` y aplicada en `globals.css`.
- Primitivas `Button` y `IconButton` en `shared/ui` (variantes primary/secondary/ghost, `px-5 py-2`, icono 24px, `href`→`<a>`, disabled, focus ring, `active:scale-[0.98]`).
- Reemplazados los botones/links duplicados en Navbar, Hero, Projects, Contact y Footer por las primitivas.

## 2026-08-11 — Sesión: Container + MainLayout

### Added
- `MainLayout` en `app/layouts/`: compone `Navbar` + `<main>` + `Footer`, recibe las secciones por `children`.
- Primitiva `Container` en `shared/ui` (`max-w-6xl mx-auto px-6`) aplicada en los 8 widgets; las secciones mantienen su fondo full-width.

## 2026-08-11 — Sesión: Setup + migración a FSD

### Added
- Setup base: Vite + React + Tailwind v4 (plugin `@tailwindcss/vite`), tokens de `design.md` cargados con `@theme` en `globals.css`, `lucide-react`.
- Estructura FSD según `architecture.md`: `app/`, `widgets/*/ui` + barrels, `shared/{ui,hook,lib,data,assets/images}`.
- Migración de los 8 widgets desde `src/App.tsx` (contenido convertido a los 5 tokens, accesibilidad: `htmlFor`/`id` en Contact, `aria-hidden`, `aria-expanded`/`aria-controls`).
- `src/App.tsx` conservado como plantilla de referencia (no se toca).

### Fixed
- Imports por carpeta chocaban con archivos glob en Windows (`./app` vs `src/App.tsx`) → imports explícitos con path `.js`/`.jsx` dentro de `src/`.