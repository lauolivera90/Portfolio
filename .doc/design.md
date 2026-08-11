# Sistema de Diseño — Portafolio

Adaptado del sistema de Uloom, filtrado para un sitio de una sola página con la arquitectura FSD acotada de `architecture.md` (widgets que componen los bloques de la landing). Se mantiene la filosofía de tokens semánticos (nunca hex hardcodeado en componentes) y las reglas visuales agnósticas al tamaño del proyecto. Se descarta lo referido a `Page`/`PageHeader`, modales y grids de vistas — no aplican a una landing de scroll único.

## 1. Fuente de verdad (tokens)

- **Tokens de color:** definidos como variables CSS en el archivo global de estilos (`src/app/styles/globals.css`, ubicación según `architecture.md`), con el bloque `@theme` de Tailwind v4:
  ```css
  @theme {
    --color-text: #eff2f4;
    --color-background: #07090b;
    --color-primary: #004B87;
    --color-secondary: #4f4261;
    --color-accent: #8d6b9b;
  }
  ```
- **Mapeo a Tailwind v4:** los `--color-*` del `@theme` generan directamente las utilidades (`bg-background`, `text-text`, `border-secondary/40`, etc.). No hay `tailwind.config.js` — la configuración de tema vive en el CSS (`tailwindcss` v4 se carga como plugin de Vite).
- **Regla:** los componentes usan SOLO los tokens (`bg-primary`, `text-text`, `bg-background`, `border-secondary/40`, etc.). Nunca hex hardcodeado ni colores de la paleta por defecto de Tailwind (`bg-blue-600`, `text-gray-100`, etc.).

### Cuándo usar cada token

| Token | Cuándo usarlo | Regla de oro |
|---|---|---|
| `background` | Fondo de la página completa | Nunca en cards o elementos elevados |
| `text` | Texto por defecto sobre `background` | Color base sin significado especial |
| `primary` | Fill de la acción principal: botón CTA del Hero, botón "Ver proyectos", links activos del navbar | Máximo una acción `primary` visible por sección — evita competencia visual |
| `secondary` | Elementos de apoyo: bordes de cards, badges de stack tecnológico, fondo de items del timeline | No usar para texto de body, solo estructura y apoyo |
| `accent` | Detalles puntuales: hover de links, ícono destacado, línea del timeline, badge de la certificación PostgreSQL | Uso deliberado y escaso — si todo es accent, deja de destacar |

**Regla corta:** `primary` es para lo que el visitante debe *hacer* (click en un CTA). `accent` es para lo que el visitante debe *notar* pero no necesariamente clickear. `secondary` es estructura y apoyo silencioso.

## 2. Lenguaje visual

- **Shape lock:** botones → `rounded`; cards y contenedores grandes (Proyecto, sección del timeline) → `rounded-lg` o `rounded-xl` (elegir uno y mantenerlo consistente en todo el sitio — no mezclar ambas escalas).
- **Padding:** cards → `p-5` como base; botones → `px-5 py-2`. Overrides puntuales van por `className`, no se redefine el default.
- **Botones:** primitiva `Button` en `shared/ui` con variantes `primary` (`bg-primary hover:brightness-110`), `secondary` (outline `border-text/10` hover `border-primary/50`) y `ghost` (sin borde, `text-text/60` hover `bg-text/5`). Icono opcional siempre a 24px. `IconButton` para botones de solo ícono con `size="md"` (w-9 h-9, ícono 24) y `size="sm"` (w-8 h-8, ícono 20), mismas variantes.
- **Cards:** primitiva `Card` en `shared/ui` con compound components `CardHeader` / `CardBody` / `CardFooter`. `CardBody` es obligatorio; header y footer opcionales. La variante define el tono según el root donde se apoya: `raised` (sobre secciones `bg-text/5`, ej. Projects) → body `bg-background` y header `bg-text/5`; `surface` (sobre root `bg-background`, ej. Contact/TechStack) → body `bg-text/5` y header `bg-text/10`. **Solo el header se diferencia** (banda un paso más clara que el body + `border-b border-text/10` de separación); body y footer comparten el mismo color (el del root de la variante). Así la separación entre header y body viene de la primitiva, sin escribir líneas divisorias a mano. `px-5` y `py-5` en las tres secciones. Root: `rounded-xl border border-text/10 overflow-hidden` (el `overflow-hidden` recorta la banda del header a las esquinas redondeadas). Hovers del card van por `className` (ej. `hover:border-primary/40`). Imágenes cover full-bleed (pegadas al top y a los bordes, ej. cover de un proyecto) se logran con márgenes negativos que cancelan el padding del body (`-mx-5 -mt-5 -mb-5` + `w-full aspect-video object-cover`).
- **Tags:** primitiva `Tag` en `shared/ui` (badges de stack, keywords): `inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-primary/20 text-text/80 border border-primary/30`.
- **Timeline:** sección **vertical en todos los tamaños** con línea vertical neutra `bg-text/10`. El marker de cada hito es un punto chico (`w-3 h-3 rounded-full`): neutral `bg-text/30` para años pasados y `bg-primary ring-4 ring-primary/20` para el hito actual (último de la lista). Fechas con mes + año (`text-xs` accent, ejemplo "May 2016").
- **TechStack:** lista por categoría en `Card variant="surface"` (`h-full`, cards del mismo alto por fila). Cada categoría: label (`text-xs uppercase tracking-wider`) + lista vertical (`flex flex-col gap-2`) de ítems `flex items-center gap-3` con icono (20px, `aria-hidden`) + nombre (`text-sm`). Iconos de maqueta (pool `MOCK_ICONS` lucide, por posición) — los reales vienen con la data.
- **Modal:** primitiva `Modal` en `shared/ui` con sub-componentes `ModalHeader`/`ModalBody`/`ModalFooter` que reutilizan la estructura de `Card` (variante `raised`: header con banda `bg-text/5` + `border-b`, body/footer del color del root, `px-5`/`py-5`). Variantes de tamaño: `sm` (`max-w-sm`), `md` (`max-w-md`, default), `lg` (`max-w-lg`), `xl` (`max-w-xl`). Overlay `fixed inset-0 z-[60] flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm`; click en el overlay cierra. Cierre por Escape, click en overlay o X en el header (`ModalHeader` con `onClose` renderiza `IconButton ghost size="sm"` con lucide `X`). Diálogo `w-full max-h-[90vh] overflow-y-auto` con `role="dialog" aria-modal="true"` + `aria-label`. Comportamiento (foco al diálogo al abrir, trap de Tab, scroll lock, restauración de foco al trigger) en `shared/hook/useModalBehavior.js`. `ModalFooter` stackea hijos en `flex flex-col gap-3` — los botones del footer van `w-full` para ocupar todo el ancho del modal.
- **Carousel (énfasis rotativo):** primitiva `Carousel` en `shared/ui`. Las slides están **siempre visibles** compartiendo el espacio: la activa ocupa el slot ancho (`flex-[2]`, mayoría del ancho) y las demás se apilan en una columna (`flex-col` a la derecha). Prev/next (`IconButton ghost size="sm"` con lucide `ChevronLeft`/`ChevronRight`) + dots (activo `bg-primary`) rotan cuál es la ancha. Wrap-around vía `shared/hook/useCarousel.js`. Flechas ←/→ con el foco dentro del carousel. Las imágenes (hijos directos `<img>`) se estilan por slot con `[&>img]:` (ancha: fill + `object-cover`; columna: `flex-1` + `object-cover`). Altura fija `h-64`.
- **Modal de proyecto:** `ProjectModal` en `widgets/Projects/ui/` (patrón de `ProjectCard`: reúne modal + contenido, `size="xl"`). Header = título del proyecto; body: capturas (Carousel con 3 imágenes = la misma de la card, mock), descripción, y secciones `Frontend`/`Backend`/`Herramientas` con labels + `Tag`; footer: botones full-width (Live demo + Repo). Los arrays de capturas/tecnologías son de maqueta (data al final).
- **Bordes:** contornos de card → `border-secondary/40`; divisores internos más sutiles que el borde exterior.
- **Sombras:** mantener discreto — `shadow-sm` en cards como mucho. Nada de `shadow-xl` o glow, no encaja con "sobrio, no sci-fi".
- **Focus ring:** `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background` — importante para accesibilidad de teclado en los links de navbar y botones de contacto.
- **Feedback táctil:** `active:scale-[0.98]` en botones e íconos clickeables.
- **Nav items:** subrayado `border-b-2` reservado siempre (sin layout shift). Activo → `border-primary` + `text-primary` (detectado por `useActiveSection`); inactivo → `border-transparent` + `text-text/60`, hover `text-text` (subrayado invisible). El subrayado vive en un `<span>` interno (`px-4 py-2`), por lo que se ajusta al texto. El `<a>` es el target: en desktop ajusta a contenido; en el menú móvil recibe `w-full flex justify-center` para abarcar toda la fila como zona de click, manteniendo la etiqueta y el subrayado centrados.
- **Motion:** `duration-150` para hovers, `duration-200` para transiciones estándar (aparición de secciones al hacer scroll). El navbar se oculta al bajar el scroll (threshold 200px, vía `useNavbarVisibility`) con slide `duration-300` y se muestra al subir o al hacer hover en el borde superior; `motion-reduce:transition-none` si el usuario tiene `prefers-reduced-motion`. Respetar `prefers-reduced-motion` — desactivar animaciones de scroll-reveal si el usuario lo tiene activado.
- **Iconos:** una sola librería consistente (Lucide, Tabler o Heroicons — elegir una, no mezclar). Tamaño 24px como base; 20px solo para iconos dentro de badges/tags compactos (stack tecnológico). `aria-hidden="true"` en iconos decorativos, `aria-label` en iconos que son el único contenido de un botón (GitHub, LinkedIn del footer).

## 3. Tipografía

- **Fuente:** Inter, cargada vía Google Fonts (400/500/600/700, `display=swap`) en `index.html`. `font-family: 'Inter', system-ui, -apple-system, sans-serif` en `globals.css`. Una sola familia tipográfica en todo el sitio, sin mezclar con una serif decorativa.
- **Jerarquía:**
  - `h1` (nombre en el Hero): `text-4xl` a `text-5xl`, `font-semibold`.
  - `h2` (título de cada sección — Proyectos, Stack, Contacto): `text-2xl` a `text-3xl`, `font-semibold`.
  - `h3` (título de proyecto individual dentro de una card): `text-lg`, `font-medium`.
  - Body: `text-base`, `font-normal`, `leading-relaxed` para bloques de texto (bio del About).
  - Botones (`Button`): `text-sm font-medium` (en la base de la primitiva).
  - Metadata / labels pequeños (stack tags, fechas del timeline): `text-sm`, `text-secondary` o `text-text/70`.
- **Pesos:** limitar a 2-3 pesos (`normal`, `medium`, `semibold`) — no cargar la fuente completa con 6+ variantes si no se usan, por performance.

## 4. Layout y breakpoints

- **Mobile-first:** todo se diseña primero para viewport angosto (`< 640px`), se expande con `sm:` / `md:` / `lg:` de Tailwind.
- **Breakpoints usados:**
  - `sm` (640px): ajustes menores de espaciado, navbar sigue colapsado o pasa a inline según el diseño final.
  - `md` (768px): sección de Proyectos pasa de 1 columna a 2 columnas (`grid-cols-1 md:grid-cols-2`).
  - `lg` (1024px): navbar completo visible sin menú hamburguesa. El Timeline ya era vertical en todos los tamaños.
- **Contenedor general:** `max-w-5xl mx-auto px-4` (o similar) para que el contenido no se estire demasiado en pantallas grandes — mantiene la lectura cómoda.

## 5. Accesibilidad

- Contraste WCAG AA verificado entre `text` (#eff2f4) y `background` (#07090b) — es alto contraste, cumple sin problema. Revisar especialmente texto sobre `secondary` (#4f4261) y `accent` (#8d6b9b) como fondo, ahí el contraste es más ajustado y puede necesitar aclarar el texto o usar esos tokens solo como fondo de elementos grandes, no como fondo de texto pequeño.
- Ningún color puro (`#000000`/`#ffffff`) — la paleta ya lo respeta.
- Iconos solos (sin texto visible) siempre con `aria-label`.
- Navegación completa por teclado: tab order lógico, focus visible con el ring definido arriba.
