# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.

Formato: secciones por fecha/sesión, la más reciente arriba. Una sesión = una unidad de trabajo (setup, un widget, un ajuste de diseño).

## 2026-08-11 — Sesión: TechStack en lista con iconos

### Changed
- `TechStack` migra sus cards a la primitiva `Card variant="surface"` (`h-full`, mismo alto por fila) y los ítems dejan de ser badges: ahora son una lista vertical con icono + nombre (`flex items-center gap-3`, icono 20px `aria-hidden`).
- Iconos de maqueta: pool local `MOCK_ICONS` de lucide asignado determinísticamente por posición (la data real con iconos se conecta al final). `techStack.js` sigue con strings.
- Categoría va en el mismo body (sin banda de header), con el label actual.

## 2026-08-11 — Sesión: Modal más ancho (variante `xl`)

### Changed
- Se agrega la variante de tamaño `xl` (`max-w-xl`, 576px) al `Modal` y `ProjectModal` pasa a usarla.

## 2026-08-11 — Sesión: Carousel primitiva + contenido del modal de proyecto

### Added
- Primitiva `Carousel` en `shared/ui` (énfasis rotativo): las slides siempre visibles compartiendo el espacio; la activa ocupa el slot ancho (`flex-[2]`) y el resto se apila en columna; prev/next (`IconButton` con `ChevronLeft`/`ChevronRight`) + dots rotan cuál es la ancha. Lógica (wrap-around, reset del índice) en `shared/hook/useCarousel.js`. Flechas ←/→ con el foco dentro del carousel.
- `ProjectModal` en `widgets/Projects/ui/` (reúne modal + contenido, `size="lg"`): header con el título del proyecto, capturas (Carousel con 3 imágenes = la de la card, mock), descripción (`project.description`), secciones mock `Frontend`/`Backend`/`Herramientas` con `Tag`, y footer con botones full-width Live demo + Repo.

### Changed
- `Projects.jsx` pasa de `open: boolean` a `activeProject` (null = cerrado); `ProjectModal project={activeProject}` reemplaza al modal vacío. Estados de capturas/tecnologías quedan de maqueta — la data se conecta al final.

## 2026-08-11 — Sesión: Modal UI + conexión "Ver mas"

### Added
- Primitiva `Modal` en `shared/ui` (compound `ModalHeader`/`ModalBody`/`ModalFooter`, reutiliza la estructura de `Card` `raised`). Variantes de tamaño `sm`/`md`/`lg` (`max-w-sm/md/lg`). Overlay centrado `bg-background/70 backdrop-blur-sm`; cierre por Escape, click en overlay o X en el header (`IconButton ghost` con lucide `X` cuando `ModalHeader` recibe `onClose`). `ModalFooter` con `flex flex-col gap-3` (botones full-width). A11y: `role="dialog" aria-modal="true"` + `aria-label`, render vía `createPortal`.
- Hook `useModalBehavior` en `shared/hook`: Escape, scroll lock del body, foco al diálogo al abrir + trap de Tab + restauración de foco al trigger al cerrar (con cleanup).

### Changed
- `ProjectCard` recibe `onVerMas`; el ghost "Ver mas" ahora abre el `Modal` (sin contenido aún — solo estructura vacía: header con X, body y footer). El contenido del modal se define en una sesión próxima.

## 2026-08-11 — Sesión: Card UI + card de proyectos

### Added
- Primitiva `Card` en `shared/ui` (compound components `CardHeader`/`CardBody`/`CardFooter`; body obligatorio, `px-5`/`py-5` en las tres secciones). Variantes según el root: `raised` (body `bg-background`, header `bg-text/5`) y `surface` (body `bg-text/5`, header `bg-text/10`). Solo el header se diferencia del body: banda un paso más clara + `border-b` de separación; body y footer comparten color — la separación viene de la primitiva, sin líneas divisorias a mano.
- Primitiva `Tag` en `shared/ui` (badge de stack): `bg-primary/20 text-text/80 border-primary/30`.

### Changed
- `ProjectCard` en `widgets/Projects/ui/`: body con imagen cover (placeholder `https://picsum.photos/200/300`, full-bleed vía márgenes negativos, `object-cover`, `aspect-video`, `loading="lazy"`) + footer con título, descripción, 3 tags hardcoded de maqueta (`TAGS_MOCK`, `flex flex-wrap gap-1.5`, no consume `project.stack` — la conexión de data se hace al final), botones Live demo (ocupa `flex-1`) + Repo, y botón ghost "Ver mas" con flecha trailing (lucide `ArrowRight`) — pendiente de abrir un modal. Header eliminado.
- Grid de Projects: pasa de `grid` a flex-wrap con 3 cards por fila (`w-full sm:w-1/2 lg:w-1/3`); las filas incompletas quedan alineadas al `start` (sin centrar). `Projects.jsx` solo mapea los datos.
- Acciones de `ProjectCard` agrupadas en bloque propio con `gap-3` (horizontal entre Live demo/Repo y vertical hacia "Ver mas").

## 2026-08-11 — Sesión: About me

### Removed
- Sección `Areas of expertise` completa del widget About (junto con el array `SKILLS_BIO` y el componente `Tag` local, que quedaban sin uso). El widget queda con la foto + la bio.

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