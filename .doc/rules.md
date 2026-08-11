# Reglas de Desarrollo — Portafolio

Adaptado de las reglas de Uloom, filtrado para un proyecto de una sola página sin backend. El criterio acá no es pureza arquitectónica sino simplicidad + performance + accesibilidad, porque lo que se evalúa en un portafolio es la primera impresión y la calidad del código visible en el repo.

> **Tip reutilizable — heroes full-height:** usá unidades `svh` (`min-h-svh`). `100vh` / `min-h-screen` miden el alto máximo del viewport, pero en móvil la barra del navegador ocupa parte y el contenido desborda o queda con scroll fantasma. `svh` usa el alto "pequeño" (estable): el hero SIEMPRE entra en el viewport real, consistente en todos los tamaños. `dvh` sigue el alto dinámico si querés que se expanda al ocultar la barra. Acompañar con espaciado vertical compacto (`py-16`, no `py-24`) para que el contenido no se corte en pantallas bajas.

## 1. Lógica en hooks, solo donde realmente aporta

No todo pedazo de estado necesita su propio hook. Extraé a un hook cuando:

- Hay un `useEffect` con lógica no trivial (ej. `useScrollReveal`, `useContactForm`).
- La lógica se reutiliza en más de un componente.
- El componente se vuelve difícil de leer por mezclar JSX con lógica.

**Excepción (queda igual que en Uloom):** toggle local de UI, manejo de hover, estados triviales de menos de 5 líneas — eso puede vivir inline en el componente.

No fuerces hooks para cada pieza de estado. Un portafolio de una página probablemente necesite 2-3 hooks en total, no una arquitectura de features.

## 2. Evitar renders infinitos y memory leaks

Se mantiene igual que en Uloom, sin excepciones por tamaño de proyecto:

- Todo `useEffect`, `useCallback`, `useMemo` con array de dependencias explícito. No omitir dependencias.
- Todo `useEffect` que registre timers, event listeners, observers o cree recursos (blob URLs) debe retornar cleanup.
- Async dentro de `useEffect` usa flag de cancelación:
  ```js
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const data = await fetchData();
      if (!cancelled) setState(data);
    }
    load();
    return () => { cancelled = true; };
  }, [deps]);
  ```
- `IntersectionObserver` / `ResizeObserver` (usados típicamente para animar secciones al hacer scroll) siempre se limpian con `.disconnect()` en el cleanup.
- `useCallback` en funciones pasadas como prop solo si el hijo está memoizado con `React.memo`. Si no, es opcional.

## 3. Estructura de carpetas (FSD)

La estructura de carpetas la define `architecture.md` (Feature-Sliced Design acotado para una landing): `app/` (configuración, estilos globales), `widgets/` (bloques de UI por sección: Navbar, Hero, About, Projects, TechStack, Timeline, Contact, Footer), `features/` (contact-form, theme-toggle opcional) y `shared/` (primitivas UI, hooks, helpers y datos estáticos).

Los detalles completos — dónde va cada cosa y qué capas quedan vacías o simplificadas en este proyecto — están en `architecture.md` secciones 2 y 4. No inventar una estructura paralela: si una decisión de carpetas no está documentada, preguntar antes de asumir.

## 4. Barrel exports

Los barrels son obligatorios (ver `architecture.md` sección 5): cada carpeta de `widgets/`, `features/`, `shared/ui/` y `shared/hook/` expone un `index.js` con named exports y sin lógica propia. Los imports entre capas entran por el barrel:

```js
// bien
import { Hero } from 'widgets/Hero';
import { Button } from 'shared/ui';

// mal — salta la barrera de la capa
import { Hero } from 'widgets/Hero/ui/Hero';
```

## 5. JSDoc en funciones de `shared/lib/`

Documentá con JSDoc las funciones puras reutilizables (ej. `formatDate`, `validateEmail`):

```js
/**
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) { ... }
```

No hace falta el sistema de `@typedef` centralizado de Uloom — este proyecto no tiene entidades de negocio complejas. Los componentes JSX y hooks internos quedan exentos, igual que en Uloom.

## 6. i18n — solo si el portafolio es bilingüe

Si el portafolio va a tener versión en español e inglés (recomendable si buscás trabajo afuera):

- No concatenar fragmentos de texto con variables en medio. Usar template literals con la oración completa.
- No duplicar el mismo label en múltiples archivos — centralizarlo.
- Recién ahí evaluar una librería liviana de i18n (`react-i18next` o similar). No implementarla si el portafolio es mono-idioma.

## 7. Imágenes optimizadas

- Formato WebP (o `next/image` si el proyecto usa Next.js).
- Lazy loading en todo lo que esté fuera del viewport inicial (foto de perfil puede cargar eager, screenshots de proyectos van lazy).
- Definir `width`/`height` explícitos para evitar layout shift.

## 8. SEO básico

- `<title>` y `<meta name="description">` específicos, no genéricos.
- Open Graph tags (`og:title`, `og:description`, `og:image`) — importa mucho porque el link se comparte en LinkedIn/mensajes.
- Un solo `<h1>` por página (el nombre en el Hero), jerarquía de headings consistente hacia abajo.

## 9. Accesibilidad mínima

- Contraste AA verificado con la paleta oscura elegida (`--text: #eff2f4` sobre `--background: #07090b` da buen contraste; revisar `--secondary` y `--accent` como fondo de texto).
- `alt` descriptivo en todas las imágenes, especialmente en los screenshots de proyectos.
- Navegación completa por teclado (tab order lógico, focus visible en botones y links).
- Botones con `aria-label` cuando son solo ícono (ej. GitHub, LinkedIn en el footer).

## 10. Mobile-first

- Diseñar y maquetar primero para viewport móvil, expandir hacia desktop con `min-width` en Tailwind, no al revés.
- Probar especialmente la sección de Proyectos y el Timeline en mobile — son las que más fácil se rompen con contenido horizontal.

## 11. Checklist antes de dar por terminado

- Lighthouse: 90+ en Performance y Accessibility (Buenas Prácticas y SEO también, pero esos dos son los que más impactan primera impresión).
- Probar todos los links (demo, repo, LinkedIn, GitHub, CV) — un link roto en un portafolio es peor que no tenerlo.
- Validar que el sitio cargue rápido en 3G simulado (Chrome DevTools throttling) — no todos los reclutadores tienen fibra.
