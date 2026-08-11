# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.

Formato: secciones por fecha/sesión, la más reciente arriba. Una sesión = una unidad de trabajo (setup, un widget, un ajuste de diseño).

## 2026-08-11 — Sesión: autoplay del carousel + zoom de capturas (Lightbox)

### Added
- `shared/hook/useCarouselPause.js`: pausa del autoplay por hover, focus dentro, `prefers-reduced-motion` y fuera de vista (`IntersectionObserver`).
- `shared/ui/Lightbox/Lightbox.jsx` (barrel): zoom de imagen en capa `z-[70]` por encima del modal (`z-[60]`). Imagen `max-h-[85vh] max-w-[85vw] object-contain`; cierre por X, click en el fondo o Escape; **prev/next** (IconButton ghost con `ChevronLeft`/`ChevronRight` + teclas `ArrowLeft`/`ArrowRight`, wrap-around resuelto por el consumidor). Reutiliza `useModalBehavior` (foco, trap de Tab, restore de foco al trigger).

### Changed
- `useCarousel`: firma `useCarousel(total, { interval = 0, paused = false })` — autoplay con `setInterval` (en `Carousel` default `interval = 5000`); `index` en deps → la navegación manual reinicia la cuenta. `next`/`prev`/`goTo` con `useCallback`.
- `Carousel`: nuevas props `interval`, `paused` (externa, para pausar con el zoom abierto) y `onImageClick(index)`. Las slides pasan de `<img>` directo a **`<button>`** con el `<img>` adentro (accesible con teclado, click → zoom); selectores de slot `[&>button]:` + `[&_img]:`.
- `useModalBehavior`/`Modal`: nueva prop `suspended` — mientras está suspendido, el listener del modal ignora Escape y el trap de Tab (vía `suspendedRef`, sin teardown del efecto → scroll lock y foco del diálogo se mantienen).
- `ProjectModal`: estado `zoomIndex` (click en captura → `Lightbox` con prev/next circular `(i ± 1 + total) % total`); `<Modal suspended>` y `<Carousel paused>` mientras el zoom está abierto.

## 2026-08-11 — Sesión: fix posicionamiento del dropdown (coords fijos)

### Fixed
- El menú del `Dropdown` en las cards de Proyectos se posicionaba con clases CSS (`mt-2`/`bottom-full` + `left-0`) y quedaba encimado al botón ("en el medio del botón") por la *static position* dentro de la fila flex. Ahora el menú es **`position: fixed` con coordenadas explícitas** calculadas en `shared/hook/useDropdownPlacement.js` (`getBoundingClientRect` del trigger + `offsetWidth/offsetHeight` del menú): `top`/`bottom` y `left`/`right` según el espacio disponible, con guard de encaje (solo elige arriba si entra) y `ResizeObserver` + `resize` para remedir.
- El menú pasa a estar **siempre montado** (se mide oculto antes del paint y se muestra solo cuando `open && coords`) → el ref nunca falta, se elimina el frame previo con la posición obsoleta y el `fixed` escapa al `overflow-hidden` de las cards.

## 2026-08-11 — Sesión: dropdown con posicionamiento automático (autoflip vertical + borde derecho)

### Added
- `shared/hook/useDropdownPlacement.js`: mide trigger y menú al abrir (`useLayoutEffect`, antes del paint) y decide `placement` (`top`/`bottom`) y `align` (`start`/`end`). Abre abajo si hay espacio; si no, arriba (el que tenga más). Si el menú saldría por el borde derecho de la pantalla, se alinea con `right-0`. Remide en `resize`.

### Changed
- `Dropdown` (`shared/ui`): se eliminan las props `up` y `align` — la posición ahora es automática (el caso del modal se resuelve solo: el menú del footer autoflipea hacia arriba).
- `useDropdown`: agrega `menuRef` al return y **cierra el menú ante cualquier scroll** (listener `scroll` con capture en `document`), además de click fuera y Escape.
- `ProjectActions`/`ProjectModal`: se quita el parámetro `up`.

## 2026-08-11 — Sesión: botones de proyectos unificados (status/demoType/repoUrl) + Dropdown

### Added
- Primitiva `Dropdown` en `shared/ui` (compound `Dropdown`/`DropdownTrigger`/`DropdownMenu`/`DropdownItem`) con lógica en `shared/hook/useDropdown.js` (cierra con click fuera y Escape, devuelve foco al trigger). Props `align` y `up` (abre hacia arriba — requerido dentro del `Modal`, cuyo Card tiene `overflow-hidden`).
- `widgets/Projects/ui/ProjectActions.jsx`: botones demo/repo compartidos entre card y modal (elimina la duplicación de `ProjectCard`/`ProjectModal`).

### Changed
- `shared/data/projects.js`: shape normalizado. `status` (`'finished'` | `'in-development'`) y `demoType` (`'deployment'` | `'video'`) explícitos en los 3 proyectos. `repoUrl` pasa a **array `[{type, url}]`** (se elimina el campo suelto `backendRepoUrl` de Antisocial Net; Nexo queda `[]` hasta que el repo esté público).
- Reglas de botones: `in-development` → botón secundario `disabled` "In development" (Clock). `demoType: video` → "Watch" (Play). Default → "Live demo" (ExternalLink). Repo: vacío → nada; 1 item → botón "Repo"; 2+ → dropdown con "Backend"/"Frontend".
- `ProjectModal`: el `Carousel` se oculta cuando `project.images` está vacío (solo screenshots reales); la card conserva el fallback picsum.

## 2026-08-11 — Sesión: botones sociales del footer ghost + fix color de iconos fallback

### Changed
- `Footer`: los botones de social (LinkedIn, Email, GitHub) pasan de `variant="secondary"` a `variant="ghost"`.

### Fixed
- Iconos de techs sin marca en Simple Icons (Nodemailer→`Mail`, OpenCode→`Bot`, y el resto de fallbacks lucide) se veían invisibles en las cards: se les pasaba `color="default"`, que en lucide genera `stroke="default"` (inválido) → sin trazo. Nuevo helper `iconColor(Icon)` en `shared/lib` (exportado por barrel) que devuelve `currentColor` para iconos lucide (`displayName` definido) y `default` para Simple Icons (color de marca). Aplicado en `TechStack` y `Hero`.

## 2026-08-11 — Sesión: timeline horizontal scrolleable + iconos fallback Nodemailer/OpenCode

### Changed
- `Timeline`: pasa a **vertical en todos los tamaños** (una sola línea con puntos conectados, como estaba en mobile). Se elimina el layout horizontal del desktop — con varios hitos ya no se rompe ni necesita scroll.
- `shared/data/techStack.js`: `Nodemailer` → lucide `Mail` (Backend) y `OpenCode` → lucide `Bot` (Tools) como fallback genérico (no existen en Simple Icons), ambos `onHero: false`.

## 2026-08-11 — Sesión: scroll del Modal solo en el body

### Changed
- `Modal`: el scroll ya no es del modal completo. Card interno pasa a `flex flex-col` con tope `max-h-[90vh]`; `ModalHeader` y `ModalFooter` quedan fijos (`flex-shrink-0`) y **solo `ModalBody` scrollea** (`flex-1 overflow-y-auto min-h-0`). Con contenido alto, X y botones siempre visibles.

## 2026-08-11 — Sesión: cards de proyectos (tags 2/2/1, espacio, links en pestaña nueva)

### Changed
- `ProjectCard`: los tags del subject pasan a **2 de frontend + 1 de backend + 1 de database** (sin tools), en ese orden. El bloque `tags + acciones` se ancla al fondo (`mt-auto`) → el espacio libre de la card queda **entre la descripción y el subject**, no entre tags y botones.
- "Live demo" y "Repo" (card y modal) abren en **pestaña nueva**: `target="_blank" rel="noopener noreferrer"`.

## 2026-08-11 — Sesión: cards de proyectos con alto uniforme (descripción ajustable)

### Added
- Hook `src/shared/hook/useLines.js` (medición de líneas con `ResizeObserver` + guard de ancho, con cleanup) — exportado por el barrel de hooks.

### Changed
- `ProjectCard`: descripción con `-webkit-line-box` clamp **dinámico** — reserva el alto de la descripción más larga del grid (si ninguna envuelve a 2 líneas, no fuerza la segunda). Card `h-full flex flex-col`, footer `flex-1` y acciones ancladas al fondo (`mt-auto`): cards, tags y botones alineados por fila.
- `Projects.jsx`: recolecta las líneas de cada card (`reportLines` por `project.id`) y pasa `maxLines` calculado como máximo del grid.

## 2026-08-11 — Sesión: consumición de data (contenido centralizado)

### Added
- `src/shared/data/profile.js` (identidad: name/initials/role, heroBio, aboutBio[], `cv` y `socials` con urls) y `src/shared/data/sections.js` (copy por sección: eyebrow/título/subtítulo + labels sueltos + `nav`/CTA). Barrel `src/shared/data/index.js`.
- Iconos de marca con `@icons-pack/react-simple-icons` (paquete `Si*`). Reemplacé SVG inline de Github/Linkedin en Contact/Footer; SVGs sueltos de downloads/menu → lucide. `IconLinkedin` local en `shared/ui/BrandIcon` porque el paquete instalado no trae LinkedIn (ni Amazon → `Cloud` de lucide como fallback).

### Changed
- `projects.js` pasa al shape definitivo: `id` (string), `title`, `shortDescription` (card), `fullDescription` (modal), `stack: { frontend, backend, database, tools }`, `demoUrl`, `repoUrl`, `images[]` (picsum de relleno hasta subir screenshots). Card: cover = `images[0]` + tags = stack aplanado top 4 (recién salen los `TAGS_MOCK`). Modal: secciones = grupos de stack no vacíos (Frontend/Backend/Database/Tools) + carousel con `images`.
- `techStack.js` → items `{ name, icon, onHero }` con iconos de Simple Icons (adiós `MOCK_ICONS` por posición). El Hero derive `techStack.filter(onHero)` (default: React, TypeScript, Node.js, PostgreSQL, Docker) — sin lista duplicada.
- Widgets consumen todo desde data (Navbar brand/nav/CTA, Hero, About, Projects, TechStack, Contact direct/voluntario, Footer socials y copyright, Timeline). Los `.jsx` quedan presentacionales.

## 2026-08-11 — Sesión: contenido de Projects y Contact

### Changed
- `Projects`: título a "What I've built" + subtítulo "Two full-stack projects, from database design to deployment."
- `Contact`: subtítulo a "Have a role in mind, or want to talk about a project? I'd love to hear from you."

## 2026-08-11 — Sesión: iconos en botones de contacto

### Changed
- Botón "Send message" del form de `Contact` ahora lleva icono lucide `Send` (props `icon` del `Button`).
- CTA "Contactar" del `Navbar` ahora lleva icono lucide `Mail`.

## 2026-08-11 — Sesión: Timeline con puntos, título "My journey" y fechas con mes

### Changed
- `Timeline` pasa de título "Career progression" a **"My journey"**.
- Las burbujas con número dejan de existir: el marker ahora es un punto chico (`w-3 h-3`), neutral (`bg-text/30`) para años pasados y `bg-primary` con ring suave para el hito actual (Today, último de la lista).
- Las fechas muestran **mes + año** (`{month} {year}` → ej. "May 2016"), con meses de ejemplo en `shared/data/timeline.js` (el último = `Aug 2026`) — placeholder, se ajustan junto con la data real.
- Sin separador/bullet entre el mes y el año.

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