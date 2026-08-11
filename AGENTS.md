# Portafolio — Contexto para agentes de desarrollo

Sitio de una sola página (landing), React + Vite + Tailwind CSS. Portafolio personal de desarrollador Full Stack.

## Antes de escribir código

Leé siempre, en este orden, antes de tocar cualquier archivo:

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

**Pendiente (en orden sugerido):**
1. Crear primitivas en `shared/ui` (`Button`, `Card`, `Badge`, `SectionLabel`) y reemplazar duplicados: focus ring (`focus:ring-accent` + `active:scale-[0.98]`) en links/botones, padding base `py-3 px-5`, unificar radio del CTA "Download CV" (`rounded` vs `rounded-xl`), ajustar jerarquía tipográfica al spec (h1 `text-4xl→5xl font-semibold`, h3 `text-lg font-medium`).
2. Reemplazar SVGs inline por iconos de `lucide-react` y eliminar duplicación de iconos/`Tag`/`SectionLabel`.
3. Extraer `features/contact-form` (hook `useContactForm` + validación) del estado inline actual de `Contact`.
4. Revisar links placeholder (`href="#"` en projects/CV/LinkedIn/GitHub) y `mailto:` ficticio con datos reales antes del deploy.
5. Widget `Navbar` a pulir.
6. Widget `Hero`.
7. Widget `About`.
8. Widget `Projects` (extraer `ProjectCard`).
9. Widget `TechStack`.
10. Widget `Timeline`.
11. Widget `Contact`.
12. Widget `Footer`.
13. SEO (meta tags, Open Graph) y checklist de accesibilidad/Lighthouse de `rules.md`.

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

Una sesión por unidad de trabajo (un widget, un ajuste de diseño, el setup inicial), no una sesión única para todo el proyecto. Este archivo se recarga solo al empezar cada sesión nueva — no hace falta pegar `architecture.md`/`rules.md`/`design.md` a mano cada vez.
