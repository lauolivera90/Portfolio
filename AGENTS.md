# Portafolio — Contexto para agentes de desarrollo

Sitio de una sola página (landing), React + Vite + Tailwind CSS. Portafolio personal de desarrollador Full Stack.

## Antes de escribir código

Leé siempre, en este orden, antes de tocar cualquier archivo:

0. `CHANGELOG.md` — histórico por fecha/sesión: qué se construyó y cuándo. Leer primero para entrar en contexto.
1. `architecture.md` — estructura de carpetas (FSD simplificado), dónde van las imágenes y assets.
2. `rules.md` — reglas obligatorias: separación lógica/hooks, memory leaks, imágenes optimizadas, SEO, accesibilidad, mobile-first.
3. `design.md` — sistema de diseño: tokens de color (`--text`, `--background`, `--primary`, `--secondary`, `--accent`), tipografía, breakpoints. Los componentes usan SOLO tokens (`bg-primary`, `text-text`, etc.), nunca hex hardcodeado.

**Regla de scope:** implementá únicamente lo que está descrito en `architecture.md`/`rules.md` para el estado actual del proyecto (ver abajo). Si te parece que falta algo no documentado, preguntá antes de asumir — no agregues funcionalidad no pedida, aunque parezca buena idea.

## Estado actual

*(Actualizar esta sección a medida que se avanza — reemplazar por lo que esté realmente hecho, no lo planeado.)*

**Hecho:**
- Setup base avanzado: Vite + React + Tailwind v4 configurados (plugin `@tailwindcss/vite` en `vite.config.js`) y tokens de `design.md` cargados con `@theme` en `src/app/styles/globals.css`.
- Estructura FSD de `architecture.md` creada: `app/` (con barrel), `widgets/*/ui` + barrels, `shared/{ui,hook,lib,data,assets/images}`. Starter de Vite limpiado.
- `lucide-react` instalado como librería de iconos.
- **Widgets migrados desde la plantilla:** los 8 widgets (`Navbar`, `Hero`, `About`, `Projects`, `TechStack`, `Timeline`, `Contact`, `Footer`) existen en `widgets/*/` con sus barrels, y `app/App.jsx` los compone. Contenido migrado de `src/App.tsx` con colores convertidos a los 5 tokens (aproximando extras con opacidades: `text-text/60`, `bg-text/5`, `border-text/10`, `placeholder:text-text/40`, hover con `brightness-110`). Datos estáticos en `shared/data/{projects,techStack,timeline}.js`.
- A11y aplicada en la migración: labels de Contact con `htmlFor`/`id`, `aria-hidden` en SVGs decorativos, `aria-expanded`/`aria-controls` en el menú móvil.
- **Plantilla de referencia:** `src/App.tsx` se conserva (no se toca) como referencia del contenido migrado. **No borrar.**
- Detalle: imports dentro de `src/` usan path explícito con `.js`/`.jsx` (ej. `'../widgets/Navbar/index.js'`) porque rolldown/Vite no resuelve imports por carpeta en Windows sin chocar con archivos glob (`./app` chocaba con `src/App.tsx`).
- **Layout extraído:** `MainLayout` en `app/layouts/` compone `Navbar` + `<main>` + `Footer` y recibe las secciones por `children`. El root (`min-h-screen bg-background text-text`) ya no vive en `App.jsx`; la page solo pasa contenido.
- **Gutter horizontal único:** primitiva `Container` en `shared/ui/` reemplaza el `max-w-6xl mx-auto px-6` duplicado en los 8 widgets. Las secciones mantienen su fondo/borde full-width (`section` queda full-bleed, `Container` dentro).
- **Navbar restructurado:** 3 columnas con `justify-between` y `py-5` (nombre · nav · botón "Contactar" primary). `NAV_LINKS` = Home, Projects, About, Timeline ("Contact" salió, lo cubre el CTA). El hamburger sigue en mobile junto al botón. Hero ajustó `pt-16`→`pt-20` por la nueva altura del header fijo.
- **Primitivas `Button`/`IconButton`:** creadas en `shared/ui` y reemplazados los botones/links duplicados (Navbar CTA+hamburger, Hero CTAs, Projects acciones, Contact submit+CV, Footer icons). Button: variantes primary/secondary/ghost, `px-5 py-2`, icono 24px, `href`→`<a>`. IconButton: `size md/sm`, mismas variantes. Estructura uniforme: el ícono va envuelto en `<span aria-hidden>` y el texto del Button en otro `<span>` (`etiqueta → span → svg/texto`).
- **Fuente Inter:** cargada desde Google Fonts (400/500/600/700) en `index.html` y aplicada en `globals.css`. Base de `Button` usa `text-sm font-medium`; el `gap-2` separa ícono y texto en todos los botones con ícono.
- **NavbarItem + sección activa:** `widgets/Navbar/ui/NavbarItem.jsx` (presentacional: `label`, `href`, `active`, `className=...`), usado en nav desktop y menú móvil. El subrayado vive en un `<span>` interno (`px-4 py-2 border-b-2`); el `<a>` es el target (en mobile recibe `className="w-full flex justify-center"` para que toda la fila sea zona de click y la etiqueta quede centrada). La sección activa la detecta `useActiveSection` (IntersectionObserver, banda central) en `shared/hook/`. Estado: activo `border-primary` + `text-primary`; inactivo `border-transparent` (subrayado invisible).
- **Navbar hide-on-scroll:** toda la lógica en `shared/hook/` — `useHideOnScroll` (scroll, threshold 200) y `useNavbarVisibility` (composición: oculto al bajar si no está en hover ni el menú abierto; `reveal`/`unreveal` para hover). El componente solo presenta: `-translate-y-full` + `duration-300 motion-reduce:transition-none`, franja trigger `h-4` en el borde superior cuando está oculto.
- **Hero home:** fuera el badge `Available for new projects` y las stats (years/projects/teams). En su lugar hay un strip chico con el título `Technologies I work with` y un array local `TECH_ICONS` (placeholder con iconos de `lucide-react`) en la misma fila — pendiente mover ese array a `shared/data/` cuando se definan las tecnologías reales.
- **About me:** eliminada la sección `Areas of expertise` (y su `Tag`/`SKILLS_BIO` locales). El widget queda con foto + bio.
- **Primitivas `Card`, `Tag`, `Carousel` + `ProjectCard`:** `Card` en `shared/ui` (compound `CardHeader`/`CardBody`/`CardFooter`, body obligatorio, `px-5`/`py-5` en las tres secciones) con variantes `raised`/`surface` según el root donde se apoya — ver `design.md`. Solo el header se diferencia del body (banda un paso más clara + `border-b` de separación); body y footer comparten el color. `Tag` (badge de stack) como primitiva en `shared/ui`. `Carousel` (énfasis rotativo) en `shared/ui` con lógica en `shared/hook/useCarousel.js` — ver `design.md`. `ProjectCard` en `widgets/Projects/ui/`: **consume la data de `projects.js`** — cover = `project.images[0]` (fallback picsum si vacío, full-bleed, `object-cover`, `aspect-video`, lazy), footer con `title`, `shortDescription`, tags = **2 de frontend + 1 de backend + 1 de database** (sin tools), Live demo (`flex-1`) + Repo, y ghost "Ver mas" (lucide `ArrowRight`) que recibe `onVerMas` y abre el modal. **Cards de alto uniforme:** la descripción usa clamp dinámico (`useLines` en `shared/hook` + `maxLines` calculado en `Projects` como máximo del grid) — reserva el alto de la descripción más larga sin forzar una línea extra si ninguna envuelve. Card `h-full flex flex-col`, footer `flex-1`, y el bloque `tags + acciones` anclado al fondo (`mt-auto`) → el aire queda entre descripción y subject. **Live demo y Repo abren en pestaña nueva** (`target="_blank" rel="noopener noreferrer"`). El grid de Projects es flex-wrap con 3 cards por fila (`w-full sm:w-1/2 lg:w-1/3`) y filas incompletas alineadas al `start`. Capturas = relleno picsum hasta subir screenshots reales (WebP en `shared/assets/images/`).
- **Primitiva `Modal` + `ProjectModal`:** `Modal` en `shared/ui` (compound `ModalHeader`/`ModalBody`/`ModalFooter`, reutiliza `Card` `raised`), sizes `sm`/`md`/`lg`/`xl`, overlay `z-[60]`, cierre por Escape/overlay/X (ver `design.md`). Toda la lógica (foco, trap de Tab, scroll lock, restauración de foco) en `shared/hook/useModalBehavior.js`. **Scroll solo en el body:** el Card interno es `flex flex-col` con tope `max-h-[90vh]`; `ModalHeader`/`ModalFooter` son `flex-shrink-0` (fijos) y `ModalBody` `flex-1 overflow-y-auto min-h-0` (única zona con scroll). `ProjectModal` en `widgets/Projects/ui/` (patrón ProjectCard, `size="xl"`): header = título, Carousel con `project.images` (se **oculta si no hay screenshots reales** — nada de placeholders en el modal), descripción = `project.fullDescription`, secciones = **grupos de `project.stack` no vacíos** (Frontend/Backend/Database/Tools), footer = `ProjectActions`. `Projects.jsx` maneja `activeProject` (null = cerrado). Contact/TechStack usan sus propias cards. **Zoom de capturas:** el Carousel tiene **autoplay (5s)** con pausa por hover/focus/reduced-motion/fuera de vista (`useCarouselPause`) y prop `paused`; cada slide es un `<button>` que al hacer click abre un **`Lightbox`** (`shared/ui`, `z-[70]` sobre el modal, cierre por X/fondo/Escape, prev/next con botones y `ArrowLeft`/`ArrowRight`, reutiliza `useModalBehavior`). Mientras el zoom está abierto, el `Modal` recibe `suspended` (ignora Escape y trap de Tab — ver design.md).
- **`ProjectActions` + `Dropdown`:** los botones de demo/repo de un proyecto están centralizados en `widgets/Projects/ui/ProjectActions.jsx` (compartido card+modal). Reglas: `status: 'in-development'` → botón secundario `disabled` "In development" (Clock); `demoType: 'video'` → "Watch" (Play); default → "Live demo" (ExternalLink); siempre target blank. Repo: `repoUrl` vacío → no se muestra; 1 item → botón "Repo"; 2+ → `Dropdown` (primitiva compound en `shared/ui`, lógica en `shared/hook/useDropdown.js`) con items "Backend"/"Frontend" etiquetados por `type`. **El dropdown se posiciona solo** (`shared/hook/useDropdownPlacement.js`): mide trigger y menú y devuelve **coords fijos** (`position: fixed` con `top/bottom` + `left/right`) — abre abajo/arriba según espacio y se alinea al borde si sale de la pantalla; el menú está **siempre montado** (se mide oculto y se muestra tras posicionar, cero flash). Cierra con click fuera, cualquier scroll o Escape.
- **TechStack en lista con iconos de marca:** las cards pasan a `Card variant="surface"` (`h-full`, mismo alto por fila) y los ítems ahora son objetos **`{ name, icon, onHero }`** con iconos de `@icons-pack/react-simple-icons` (color de marca). **`onHero: true` decide si la tech aparece en el Hero** — el Hero derive `techStack.filter(onHero)` (sin lista duplicada; default: React, TypeScript, Node.js, PostgreSQL, Docker). Techs sin marca en Simple Icons (REST, gRPC, PostGIS, AWS, Nodemailer→`Mail`, OpenCode→`Bot`) usan fallback de lucide, pintado con `iconColor(Icon)` (`shared/lib`): lucide → `currentColor`, Simple Icons → `default` (color de marca) — **no pasar `color="default"` a iconos lucide** (stroke inválido, quedan invisibles). Las entradas reales se limpian después (listado actual es mock).
- **Consumición de data (contenido centralizado en `shared/data/`):** barrel `index.js`. `profile.js` (identidad: name/initials/role, heroBio, aboutBio[], `cv`, `socials` con urls+iconos). `sections.js` (**copy por sección** — eyebrow/título/subtítulo + labels sueltos + `nav`/CTA; separado de la info personal). `projects.js` (shape: `id`, `title`, `shortDescription`, `fullDescription`, `stack {frontend,backend,database,tools}`, `status` `'finished'`/`'in-development'`, `demoType` `'deployment'`/`'video'`, `demoUrl`, `repoUrl` **array `[{type, url}]`** — 1 o 2 items, `images[]`). `techStack.js` ({name, icon, onHero}). `timeline.js`. Los 8 widgets consumen desde data (Navbar/Hero/About/Projects/TechStack/Contact/Timeline/Footer) y quedaron 100% presentacionales. SVGs inline reemplazados por lucide + Simple Icons; `IconLinkedin` local en `shared/ui/BrandIcon` (el paquete Simple Icons instalado no trae LinkedIn ni Amazon → AWS usa `Cloud` de lucide).
- **Timeline pulido:** título "My journey" (en inglés, resto del sitio en inglés). El marker de cada hito es un punto chico (`w-3 h-3 rounded-full`): neutral `bg-text/30` para años pasados, `bg-primary ring-4 ring-primary/20` para el hito actual (el último de la lista, `Today`). Fechas: mes + año en accent (ej. "May 2016"), meses de ejemplo en `shared/data/timeline.js` (último = `Aug 2026`) — placeholder hasta la data real. **El timeline es vertical en todos los tamaños** (una sola columna con puntos conectados por una línea vertical) — se eliminó el layout horizontal del desktop.

**Pendiente (en orden sugerido):**
1. Crear primitivas en `shared/ui` (`Badge`, `SectionLabel`) y reemplazar duplicados: focus ring (`focus:ring-accent` + `active:scale-[0.98]`) en links/botones, padding base `py-3 px-5`, unificar radio del CTA "Download CV" (`rounded` vs `rounded-xl`), ajustar jerarquía tipográfica al spec (h1 `text-4xl→5xl font-semibold`, h3 `text-lg font-medium`).
2. Extraer `features/contact-form` (hook `useContactForm` + validación) del estado inline actual de `Contact` (formulario sigue con `setTimeout` mock).
3. Revisar links placeholder (`href="#"` en projects/CV/LinkedIn/GitHub) y `mailto:` ficticio con datos reales antes del deploy.
4. Subir screenshots reales de proyectos (WebP en `shared/assets/images/`) y limpiar el listado mock de `techStack` (quitar tools que no usa, revisar `onHero`).
5. Widget `Navbar` a pulir.
6. Widget `Hero`.
7. Widget `About`.
8. Widget `Contact` (migrar su card "Direct contact" a `Card variant="surface"`).
9. Widget `Footer`.
10. SEO (meta tags, Open Graph) y checklist de accesibilidad/Lighthouse de `rules.md`.

No asumas que este orden es rígido — actualizalo si cambia la prioridad real de trabajo.

## Reglas rápidas (resumen — la fuente completa está en `rules.md`/`design.md`)

- Componentes `.jsx` solo presentan; lógica no trivial va a un hook en `shared/hook/` (o `features/*/hook/` para lógica propia de una feature).
- Todo `useEffect` con listener/timer/observer/async lleva cleanup y, si es async, flag de cancelación.
- Barrels (`index.js`) con exports nombrados únicamente, sin lógica propia. Los imports entre capas entran por el barrel.
- Imágenes de contenido en WebP, en `shared/assets/images/` si se importan en JSX; `public/` solo para favicon, CV y og-image.
- Nunca hex hardcodeado en componentes — siempre los tokens de `design.md`.
- Mobile-first: se maqueta primero para viewport angosto, se expande con `sm:`/`md:`/`lg:`.

## Sincronización de documentación

Si cambiás la estructura de carpetas, agregás una capa nueva (ej. `pages/` cuando se sume una vista de detalle de proyecto), o cambiás un token de color, actualizá `architecture.md`/`design.md` en el mismo cambio — no dejes código sin su doc correspondiente.

## Checklist antes de dar por terminado el sitio

1. Verificar cada punto de la sección 11 de `rules.md` (Lighthouse 90+, links funcionando, carga en 3G simulado).
2. Actualizar "Estado actual" en este archivo a "Hecho: todo — sitio v1 completo".

## Convención de sesiones

Una sesión por unidad de trabajo (un widget, un ajuste de diseño, el setup inicial), no una sesión única para todo el proyecto. Este archivo se recarga solo al empezar cada sesión nueva — no hace falta pegar `architecture.md`/`rules.md`/`design.md` a mano cada vez. Cada sesión agrega su entrada al `CHANGELOG.md` (sección por fecha, más reciente arriba) en el mismo cambio que el código.
