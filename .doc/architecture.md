# Arquitectura — Portafolio (Feature-Sliced Design)

Este documento define la estructura de carpetas siguiendo Feature-Sliced Design (FSD), adaptada a un sitio de una sola página. Complementa a `rules.md` (reglas de código) y `design.md` (sistema visual).

**Nota de escala:** FSD está pensado originalmente para apps con múltiples páginas y features complejas. Un portafolio de scroll único no necesita todas las capas del metodología completa. Este doc explica la estructura genérica y, en cada capa, aclara si aplica o queda vacía/simplificada para este proyecto.

## 1. Principio general de FSD

Las capas se ordenan de más genérica (abajo) a más específica (arriba). **Una capa solo puede importar de capas inferiores, nunca de superiores ni de la misma capa entre sí (salvo dentro de su propio slice).**

```
app          → configuración global, providers, estilos globales
pages        → composición de una vista completa (una página o sección)
widgets      → bloques de UI grandes y compuestos, reusables entre pages
features     → una acción/interacción concreta del usuario
entities     → conceptos de negocio (en un portafolio: casi no aplica)
shared       → código genérico sin conocimiento del dominio
```

Orden de import permitido: `app → pages → widgets → features → entities → shared`. Nunca al revés.

## 2. Estructura de carpetas

```
src/
  app/
    App.jsx
    layouts/
      MainLayout.jsx     (shell global: Navbar + <main> + Footer, recibe children)
      index.js
    providers/          (ThemeProvider si aplica, etc.)
    styles/
      globals.css        (tokens de design.md, reset, fuentes)

  widgets/
    Navbar/
      ui/
        Navbar.jsx
        NavbarItem.jsx   (item del nav: subrayado primary si activo, border-text/10 si no)
      index.js            (barrel)
    Hero/
      ui/
        Hero.jsx
      index.js
    About/
      ui/
        About.jsx
      index.js
    Projects/
      ui/
        Projects.jsx
        ProjectCard.jsx
      index.js
    TechStack/
      ui/
        TechStack.jsx
      index.js
    Timeline/
      ui/
        Timeline.jsx
      index.js
    Contact/
      ui/
        Contact.jsx
      index.js
    Footer/
      ui/
        Footer.jsx
      index.js

  features/
    contact-form/
      ui/
        ContactForm.jsx
      hook/
        useContactForm.js
      lib/
        validateEmail.js
      index.js
    theme-toggle/          (opcional, si hay switch claro/oscuro)
      hook/
        useThemeToggle.js
      index.js

  entities/
    (vacío en este proyecto — no hay conceptos de negocio con estado propio
     como "usuario" o "producto". Los "proyectos" del portafolio son datos
     estáticos, no entidades con lógica: van en shared/data)

  shared/
    ui/                   (Button, Card, Badge, IconButton — primitivas reutilizables)
      Button/
      Card/
      Badge/
      Container/          (gutter horizontal único: `max-w-6xl mx-auto px-6`, acepta className)
      IconButton/
      index.js
    hook/                 (useScrollReveal, useMediaQuery, etc.)
      useActiveSection.js   (sección visible con IntersectionObserver, banda central)
      useHideOnScroll.js    (ocultar al bajar con threshold, mostrar al subir)
      useNavbarVisibility.js (composición: scroll hide + hover reveal + menú abierto)
      useScrollReveal.js
      index.js
    lib/                  (helpers puros sin JSX: formatDate, cn, etc.)
      cn.js
      index.js
    data/                 (contenido estático del portafolio)
      projects.js
      techStack.js
      timeline.js
    assets/
      images/
        profile/
        projects/
      icons/
        (solo si hay SVGs custom fuera de la librería de iconos)
      fonts/               (solo si NO se usan Google Fonts vía CDN/next/font)

  pages/
    (vacío o con un único HomePage/ que compone todos los widgets en orden.
     Si el portafolio queda como una sola página, esta capa puede colapsar
     directo en App.jsx — evaluar si vale la pena el nivel extra)

public/
  favicon.ico
  og-image.png            (imagen para Open Graph, ver design.md/SEO)
  cv.pdf                  (o donde apunte el botón "Descargar CV")
```

## 3. Dónde van las imágenes (y por qué)

Hay dos ubicaciones válidas según el tipo de imagen — no es indistinto:

- **`src/shared/assets/images/`** → imágenes que el bundler debe procesar: fotos de perfil, screenshots de proyectos, cualquier imagen que se importe con `import foto from '...'` dentro de un componente. Ventaja: Vite/Next las optimiza, les da hash de caché, y falla el build si falta el archivo (en vez de un 404 silencioso en producción).
  ```
  shared/assets/images/
    profile/
      avatar.webp
    projects/
      proyecto-1-cover.webp
      proyecto-1-detail.webp
      proyecto-2-cover.webp
  ```

- **`public/`** → archivos que se referencian por URL directa y no necesitan procesamiento: `favicon.ico`, `og-image.png` (Open Graph, se referencia por URL absoluta en meta tags), el PDF del CV. Todo lo que esté acá se sirve tal cual, sin hash ni optimización — por eso solo van archivos que no se benefician de eso.

**Regla práctica:** si la imagen se importa dentro de un `.jsx`, va en `shared/assets`. Si se referencia por string en un `<meta>`, en el `manifest.json`, o es el favicon/CV, va en `public/`.

**Formato:** todas las imágenes de contenido (perfil, proyectos) en WebP, según ya quedó definido en `rules.md` (sección de imágenes optimizadas). Los SVG de iconos, si son custom y no vienen de la librería de iconos elegida, van en `shared/assets/icons/`.

## 4. Capas que quedan vacías o simplificadas en este proyecto

- **`app/layouts/`**: el shell que envuelve cada vista. `MainLayout` compone `Navbar` + `<main>` + `Footer` y recibe el contenido por `children`. Vive en `app/` (no en `widgets/`) porque importa el widget `Navbar` — dos widgets no se importan entre sí (sección 6), pero `app/` sí puede importar hacia abajo. Las pages (hoy un único `App.jsx`) no renderizan `Navbar`/`Footer` ni repiten el margin/padding del root: solo pasan sus secciones como `children`. Si mañana hay una segunda vista, se crea otra composición que envuelve su contenido con el mismo `MainLayout`.
- **`pages/`**: si el portafolio es una sola vista, esta capa puede no existir — `App.jsx` compone los widgets directo en `app/`. Si en el futuro agregás una página de detalle por proyecto (`/proyectos/[slug]`), ahí sí se justifica crear `pages/ProjectDetail/`.
- **`entities/`**: no hay entidades de negocio con lógica propia. Los datos de proyectos, stack y timeline son estáticos y viven en `shared/data/` como arrays/objetos planos, no como una "entidad" con hooks de fetching, mutaciones, etc. Si en algún momento el contenido pasa a venir de un backend/CMS, ahí se justifica crear `entities/project/` con su propio hook de fetch.
- **`features/`**: en un portafolio típico, la única "feature" real es el formulario de contacto (si lo tenés) — es la única interacción con lógica propia (validación, estado de envío). Un toggle de tema también podría calificar. Todo lo demás (Hero, About, Projects, Timeline) es contenido presentacional → va en `widgets/`, no en `features/`.

## 5. Barrel exports

Igual que en `rules.md`: cada carpeta de `widgets/`, `features/`, `shared/ui/`, `shared/hook/` expone un `index.js` con named exports. Los imports desde `app/` o entre sí entran por el barrel:

```js
// bien
import { Hero } from 'widgets/Hero';
import { Button } from 'shared/ui';

// mal — salta la barrera de la capa
import { Hero } from 'widgets/Hero/ui/Hero';
```

## 6. Regla de import entre slices del mismo nivel

Dos widgets no se importan entre sí (ej. `Projects` no importa nada de `Timeline`). Si dos widgets necesitan compartir algo, ese algo baja a `shared/`. Esto evita acoplar secciones que deberían poder reordenarse o eliminarse sin romper otras.
