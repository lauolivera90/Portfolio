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
        SettingsMenu.jsx (botón de ajustes con Dropdown: idioma ES/EN + tema claro/oscuro)
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
        ProjectActions.jsx    (botones demo/repo compartidos card+modal)
        ProjectModal.jsx
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
    theme-toggle/          (implementado vía shared/hook/useTheme.js + widgets/Navbar/SettingsMenu
                             — no requiere una feature propia; el toggle solo cambia data-theme en <html>)

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
      Dropdown/           (menú desplegable compound — ver design.md)
      Lightbox/           (zoom de imagen por encima del modal — ver design.md)
      Toast/              (notificación auto-dismissible con barra de duración — ver design.md)
      index.js
    hook/
      useActiveSection.js   (sección visible con IntersectionObserver, banda central)
      useCarousel.js        (índice del Carousel, wrap-around, autoplay con setInterval)
      useCarouselPause.js   (pausa del autoplay: hover, focus, reduced-motion, fuera de vista)
      useDropdown.js        (estado y cierre del Dropdown: click fuera + Escape + scroll)
      useDropdownPlacement.js (posición automática del menú: coords fijos por getBoundingClientRect, autoflip vertical + alineación al borde)
      useEscapeClose.js      (cierra on Escape mientras enabled — menú móvil del Navbar)
      useHideOnScroll.js    (ocultar al bajar con threshold, mostrar al subir)
      useLines.js           (medición de líneas por ResizeObserver para clamp dinámico)
      useModalBehavior.js   (foco al diálogo, trap de Tab, scroll lock, restore de foco; prop suspended)
      useNavbarVisibility.js (composición: scroll hide + hover reveal + menú abierto)
      useTheme.js           (tema claro/oscuro: data-theme en <html>, localStorage + prefers-color-scheme)
      index.js
    lib/                  (helpers puros sin JSX)
      iconColor.js        (color para iconos lucide vs Simple Icons)
      projectImages.js    (resolución de screenshots por convención de carpetas — ver §3)
      index.js
    i18n/                 (idioma ES/EN — estado cross-cutting a nivel app)
      context.js          (LanguageContext)
      LanguageProvider.jsx (inicialización, persistencia, SEO dinámico presentados en App para todo el árbol)
      useLanguage.js      (hook que devuelve bundles por-locale resueltos)
      index.js
    data/                 (contenido estático del portafolio — la fuente única de contenido)
      index.js            (barrel)
      profile.js          (identidad: nombre, rol, bio, hero, CV y socials con urls/iconos)
      sections.js         (copy de secciones: eyebrow/título/subtítulo por widget + nav/CTA)
      contact.js          (endpoint Formspree del formulario de contacto — consumido por features/contact-form)
      projects.js         (proyectos: id, title, short/fullDescription, stack {frontend, backend, database, tools}, demoUrl (array {type,url}) — sin campo de imágenes: las resuelve la convención de carpetas + `shared/lib/projectImages.js`)
      techStack.js        (techs por categoría: { name, icon, onHero } — onHero decide presencia en el Hero)
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
      hero.webp
    projects/
      <project-id>/        (carpeta = project.id, ej. "nexo", "antisocial-net", "uloom")
        img0.webp          (miniatura de la card — NUNCA en el carousel)
        img1.webp          (capturas del carousel/lightbox del modal)
        img2.webp
        ...
  ```
  **Convención de screenshots:** carpeta = `project.id`. `img0` es siempre la miniatura de la card; `img1+` son las capturas del carousel del modal (img0 queda excluida). Se resuelven con `shared/lib/projectImages.js` — usa `import.meta.glob` (eager) sobre `projects/*/img*`, devuelve `{ cover, carousel }` ordenado numéricamente (`img10` después que `img9`). Con cero archivos no rompe el build: `cover` es `null` (la card usa fallback picsum) y `carousel` queda `[]` (el modal oculta el carousel). Formato recomendado: `.webp` (el glob también tolera png/jpg/jpeg). `String` de ejemplo:
  ```js
  // shared/lib/projectImages.js
  const imageModules = import.meta.glob('/src/shared/assets/images/projects/*/img*.{webp,png,jpg,jpeg}', { eager: true, import: 'default' })
  export function projectImages(projectId) {
    const base = `/src/shared/assets/images/projects/${projectId}/`
    const urls = Object.keys(imageModules)
      .filter((key) => key.startsWith(base))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((key) => imageModules[key])
    return { cover: urls[0] ?? null, carousel: urls.slice(1) }
  }
  ```
  Los widgets lo consumen así: `ProjectCard` usa `cover`, `ProjectModal` usa `carousel`.

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
