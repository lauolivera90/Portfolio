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
- **Padding:** cards → `p-5` como base; botones → `py-3 px-5`. Overrides puntuales van por `className`, no se redefine el default.
- **Bordes:** contornos de card → `border-secondary/40`; divisores internos más sutiles que el borde exterior.
- **Sombras:** mantener discreto — `shadow-sm` en cards como mucho. Nada de `shadow-xl` o glow, no encaja con "sobrio, no sci-fi".
- **Focus ring:** `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent focus:ring-offset-background` — importante para accesibilidad de teclado en los links de navbar y botones de contacto.
- **Feedback táctil:** `active:scale-[0.98]` en botones e íconos clickeables.
- **Motion:** `duration-150` para hovers, `duration-200` para transiciones estándar (aparición de secciones al hacer scroll). Respetar `prefers-reduced-motion` — desactivar animaciones de scroll-reveal si el usuario lo tiene activado.
- **Iconos:** una sola librería consistente (Lucide, Tabler o Heroicons — elegir una, no mezclar). Tamaño 24px como base; 20px solo para iconos dentro de badges/tags compactos (stack tecnológico). `aria-hidden="true"` en iconos decorativos, `aria-label` en iconos que son el único contenido de un botón (GitHub, LinkedIn del footer).

## 3. Tipografía

- **Fuente:** sans-serif sobria y profesional — Inter, IBM Plex Sans o similar. Una sola familia tipográfica en todo el sitio, sin mezclar con una serif decorativa.
- **Jerarquía:**
  - `h1` (nombre en el Hero): `text-4xl` a `text-5xl`, `font-semibold`.
  - `h2` (título de cada sección — Proyectos, Stack, Contacto): `text-2xl` a `text-3xl`, `font-semibold`.
  - `h3` (título de proyecto individual dentro de una card): `text-lg`, `font-medium`.
  - Body: `text-base`, `font-normal`, `leading-relaxed` para bloques de texto (bio del About).
  - Metadata / labels pequeños (stack tags, fechas del timeline): `text-sm`, `text-secondary` o `text-text/70`.
- **Pesos:** limitar a 2-3 pesos (`normal`, `medium`, `semibold`) — no cargar la fuente completa con 6+ variantes si no se usan, por performance.

## 4. Layout y breakpoints

- **Mobile-first:** todo se diseña primero para viewport angosto (`< 640px`), se expande con `sm:` / `md:` / `lg:` de Tailwind.
- **Breakpoints usados:**
  - `sm` (640px): ajustes menores de espaciado, navbar sigue colapsado o pasa a inline según el diseño final.
  - `md` (768px): sección de Proyectos pasa de 1 columna a 2 columnas (`grid-cols-1 md:grid-cols-2`).
  - `lg` (1024px): Timeline pasa de vertical (mobile) a horizontal (desktop); navbar completo visible sin menú hamburguesa.
- **Contenedor general:** `max-w-5xl mx-auto px-4` (o similar) para que el contenido no se estire demasiado en pantallas grandes — mantiene la lectura cómoda.

## 5. Accesibilidad

- Contraste WCAG AA verificado entre `text` (#eff2f4) y `background` (#07090b) — es alto contraste, cumple sin problema. Revisar especialmente texto sobre `secondary` (#4f4261) y `accent` (#8d6b9b) como fondo, ahí el contraste es más ajustado y puede necesitar aclarar el texto o usar esos tokens solo como fondo de elementos grandes, no como fondo de texto pequeño.
- Ningún color puro (`#000000`/`#ffffff`) — la paleta ya lo respeta.
- Iconos solos (sin texto visible) siempre con `aria-label`.
- Navegación completa por teclado: tab order lógico, focus visible con el ring definido arriba.
