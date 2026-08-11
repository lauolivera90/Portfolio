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
- Estructura FSD de `architecture.md` creada: `app/` (con `App.jsx` shell + barrel), `widgets/*/ui`, `features/contact-form/*`, `shared/{ui,hook,lib,data,assets/images}` (folders vacíos, se llenan en cada sesión). Starter de Vite limpiado (App demo, `App.css`, logos, `icons.svg`).
- `lucide-react` instalado como librería de iconos (design.md).
- **Plantilla de referencia:** `src/App.tsx` es un prototipo completo del portafolio (Navbar, Hero, About, Projects, TechStack, Timeline, Contact, Footer) con datos ficticios y hex hardcodeado. Se conserva a propósito: es la base que se irá migrando a los widgets FSD. **No borrar.**
- Detalle: `main.jsx` importa `./app/index.js` explícito (path con `.js`) porque en Windows `./app` resolvía a `src/App.tsx` por case-insensitivity.

**Pendiente (en orden sugerido):**
1. Migrar cada widget desde `src/App.tsx` a `widgets/*/ui/*.jsx` (con tokens de `design.md`, no hex) y cablearlos en `app/App.jsx`.
2. Widget `Navbar`.
3. Widget `Hero`.
4. Widget `About`.
5. Widget `Projects` (con datos de `shared/data/projects.js`).
6. Widget `TechStack`.
7. Widget `Timeline`.
8. Widget `Contact` (feature `contact-form` si lleva formulario funcional, no solo mailto).
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

Una sesión por unidad de trabajo (un widget, un ajuste de diseño, el setup inicial), no una sesión única para todo el proyecto. Este archivo se recarga solo al empezar cada sesión nueva — no hace falta pegar `architecture.md`/`rules.md`/`design.md` a mano cada vez.
