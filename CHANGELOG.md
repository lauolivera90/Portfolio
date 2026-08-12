# Changelog

Todos los cambios notables del proyecto se documentan en este archivo.

Formato: secciones por fecha/sesión, la más reciente arriba. Una sesión = una unidad de trabajo (setup, un widget, un ajuste de diseño).

## 2026-08-12 — Sesión: repos de Nexo (frontend + backend)

### Changed
- `shared/data/projects.js`: `nexo.repoUrl` pasa de `[]` (TODO) al array real con los repos del proyecto (en `en` y `es`): frontend `https://github.com/DesApp-2026c1-Grupo-3/frontend` y backend `https://github.com/DesApp-2026c1-Grupo-3/backend`. Con 2 items la card/modal muestran el `Dropdown` de repos etiquetado por `type`.

## 2026-08-12 — Sesión: CV por idioma en los botones de descarga (download forzado)

### Changed
- `shared/data/profile.js`: `cv.url` por-locale apunta al PDF real — `en` → `/CV_Lautaro_Olivera_EN.pdf`, `es` → `/CV_Lautaro_Olivera.pdf`. Los botones de `Hero` y `Contact` ya resolvían `profile.cv` vía `useLanguage()`, así que con solo esto descargan el CV del idioma activo.
- `Hero` y `Contact`: el botón "Download CV"/"Descargar CV" ahora lleva el atributo **`download`** (fuerza la descarga en vez de abrir el PDF en el navegador).

### Removed
- `public/cv.pdf` (placeholder de 662 bytes) — quedaba sin referencias al apuntar `cv.url` a los CV reales.

### Docs
- `AGENTS.md`: bullet del CV actualizado y quitado `public/cv.pdf` del Pendiente n.º 2.
- `.doc/architecture.md`: snippet de `public/` con los dos CV reales.
- `CHANGELOG.md`: esta entrada.

## 2026-08-12 — Sesión: sacar las iniciales del Navbar

### Changed
- `Navbar`: eliminado el **box de iniciales** (`w-8 h-8 rounded-md bg-primary` con `profile.initials`) — queda solo el nombre (`profile.name`).
- `shared/data/profile.js`: se elimina `initials: 'LBO'` (quedaba sin consumidores).

### Docs
- `AGENTS.md` y `.doc/design.md`: actualizadas las referencias a `initials` / "box de iniciales" del Navbar.
- `CHANGELOG.md`: esta entrada.

## 2026-08-12 — Sesión: fix real del cover full-bleed (max-w-none) + Thumb.webp a 16:9 exacto

### Fixed
- `ProjectCard`: el fix de la sesión anterior (`w-[calc(100%+2.5rem)]`) **no funcionaba** — el preflight de Tailwind v4 fuerza `img { max-width: 100% }`, que clamp-ea el `calc` de vuelta al ancho del content-box (card menos los dos `px-5`) y los `-mx-5` solo lo desplazaban sin estirarlo: seguía habiendo ~2.5rem de fondo de card al **borde derecho**. Ahora el cover lleva **`max-w-none`** (anula el `max-width` del preflight) y de verdad cubre la card de borde a borde.
- El fallback picsum pasa de `200/300` (ratio portrait) a **`1600/900` (16:9)** para que el placeholder no se recorte raro.

### Images
- Las 3 `Thumb.webp` regeneradas a **1920×1080 (16:9 exacto)** con `sharp resize(1920, 1080, { fit: 'cover' })` desde las originales: `nexo` y `antisocial-net` eran 2880×2160 (4:3 — con `object-cover` en el box 16:9 la foto perdía ~25% del alto, ~270px arriba y abajo) y `uloom` era 1920×1009 (perdía ~6% del ancho). Con 16:9 exacto el cover ya no recorta contenido. Originales respaldadas en temp local de la máquina.

### Docs
- `.doc/design.md` §Cards: patrón full-bleed corregido — se documenta el `max-w-none` obligatorio (por el preflight `img { max-width: 100% }`) y el requisito de `Thumb.webp` en 16:9 exacto.
- `AGENTS.md`: bullets de `ProjectCard` y "Screenshots por proyecto" actualizados (max-w-none + thumbs 16:9).
- `CHANGELOG.md`: esta entrada.

## 2026-08-12 — Sesión: card de proyecto clickeable + fix de cover full-bleed + filas centradas

### Fixed
- `ProjectCard`: el cover quedaba **cortado al borde derecho** — `w-full` mide solo el content-box (card menos los dos `px-5` del body) y los márgenes negativos lo desplazaban sin estirarlo. Ahora `w-[calc(100%+2.5rem)]` (+ los `-mx-5 -mt-5 -mb-5` existentes) hace que la imagen cubra todo el ancho de la card.

### Changed
- `Card` (`shared/ui`): disemina `...rest` al `<div>` root para aceptar `onClick`/props extra sin wrappers.
- `ProjectCard`: **toda la card abre el modal** — `onClick` en el root con guard `event.target.closest('a, button')` (Demo/Repo/View more/dropdown no lo disparan); `cursor-pointer` para feedback. "View more" sigue siendo el control de teclado (a11y intacta).
- `Projects`: el grid de cards agrega `justify-center` → las **filas incompletas quedan centradas** (antes alineadas al `start`, dejando espacio solo a la derecha).

### Docs
- `.doc/design.md` §Cards: corregido el patrón documentado de full-bleed (`w-full` → `w-[calc(100%+2.5rem)]` + explicación).
- `AGENTS.md`: bullets de `ProjectCard`/grid actualizados (card clickeable con guard, filas centradas, cover con cálculo nuevo).
- `CHANGELOG.md`: esta entrada.

## 2026-08-12 — Sesión: Carousel recortado a 3 + teaser "Ver todas" y Lightbox con controles abajo

### Changed
- `shared/ui/Carousel/Carousel.jsx`: **siempre muestra 3 slots** — la activa (`flex-[2]`) + las 2 siguientes (con wrap `% total`) en `flex-col` a la derecha (ya no se apiIan todas las capturas). Con `total === 2` hay 1 thumb derecha, con `total === 1` no hay columna. **Teaser "Ver todas" cuando `total > 3`:** el tercer slot tiene la imagen **desenfocada** (`[&_img]:blur-sm [&_img]:scale-110`) + overlay `bg-background/40` con label **estilo secondary de Button sin icono** (span estilizado dentro del `button` del slot → evita botones anidados); su click hace `onImageClick(0)` → abre el Lightbox en la **primera** captura. Nueva prop `viewAllLabel`. Con exactamente 3 capturas no hay teaser.
- `shared/ui/Lightbox/Lightbox.jsx`: los **controles pasan a abajo y centrados** — fila `mt-4` con `[ChevronLeft]` `[dots]` `[ChevronRight]` (ghost sm, dots activo `bg-primary` clickeables) que reemplaza las flechas al costado de la imagen. Imagen pasa a `max-h-[70vh]` (deja espacio a los controles). Nueva prop `total` + `index` (dots) y `onGoTo`. **El X de cerrar pasa a `variant="secondary"`** (borde visible, `bg-background`, esquina superior derecha).
- `widgets/Projects/ui/ProjectModal.jsx`: wiring — `<Carousel viewAllLabel={t.viewAll}>` y `<Lightbox total={total} index={zoomIndex} onGoTo={setZoomIndex}>`.
- `shared/data/sections.js`: label `projects.viewAll` = `'View all'` (en) / `'Ver todas'` (es).

### Docs
- `.doc/design.md`: bullets Carousel y Lightbox reescritos con la nueva lógica + bullet del modal de proyecto con el wiring de `viewAllLabel`/`total`/`index`/`onGoTo`.
- `AGENTS.md`: bullets de Carousel y ProjectModal/Lightbox actualizados (3 slots + teaser, controles del lightbox abajo, cerrar secondary).
- `CHANGELOG.md`: esta entrada.

## 2026-08-12 — Sesión: screenshots reales enganchados (convención `Thumb.webp` + capturas desktop/mobile)

### Changed
- `shared/lib/projectImages.js`: nueva convención de carpetas. Glob pasa de `projects/*/img*` a `projects/*/*.{webp,png,jpg,jpeg}`; **cover = `Thumb.webp`** (case-insensitive, nunca en el carousel) y el resto son capturas del carousel ordenadas con `localeCompare` numérico + `sensitivity: 'base'` — **agrupa por sección con la desktop (`...1`) primero y la mobile (`...2`) después** (ej. `Nexo_Materials1, Nexo_Materials2, Nexo_Planner1...`). Sin archivos sigue devolviendo `cover: null` / `carousel: []` (fallback intacto).
- `widgets/About/ui/About.jsx`: foto real de perfil importada de `profile/Hero.webp` (antes `profile/hero.png`, que no existía → build roto).

### Images
- Imágenes reales subidas por proyecto en `shared/assets/images/projects/{nexo,antisocial-net,uloom}` (`Thumb.webp` por proyecto + capturas `*1.webp`/`*2.webp`). `profile/Hero.webp` para la sección About.

### Docs
- `.doc/architecture.md` §3: convención nueva documentada + snippet de `projectImages.js` actualizado; `hero.webp` → `Hero.webp`.
- `AGENTS.md`: bullet "Screenshots por proyecto" y punto 2 de "Pendiente" actualizados (los screenshots ya no son pendiente) + nota de About con el archivo correcto.
- `CHANGELOG.md`: esta entrada.

### Added
- `socials[].color` en `shared/data/profile.js`: color oficial de cada marca — LinkedIn `#0A66C2`, Gmail `#EA4335`, GitHub `currentColor` (su marca `#181717` es negra, no se vería en el tema oscuro).
- Email pasa de lucide `Mail` a **`SiGmail`** (Simple Icons, disponible en el paquete).

### Changed
- `globals.css`: fondo del tema claro pasa de `#ffffff` a **off-white `#f5f6f8`** (a juego con el `#07090b` del oscuro, menos brillante; todos los contraste AA siguen: text ~16:1, accent ~6:1, primary+on-primary ~7:1). `useTheme.js`: el `theme-color` claro ahora es `#f5f6f8`.
- `shared/ui/BrandIcon.jsx`: `IconLinkedin` acepta prop `color` (default `currentColor`, `fill` dinámico) — antes estaba fijo.
- Footer (`IconButton`) y la card "Direct contact" de Contact renderizan `<Icon color={social.color} />` (antes forzaban `currentColor`): LinkedIn azul y Gmail rojo se ven con su marca en ambos temas; GitHub sigue monocromo con su hover de color.

### Docs
- `.doc/design.md`: valor del `background` claro (`#f5f6f8`) y nota de iconos sociales con color de marca en la sección Iconos; ajuste de la nota de contraste §5.
- `AGENTS.md`: bala de tema con el off-white + nueva bala "Iconos sociales".
- `CHANGELOG.md`: esta entrada.

## 2026-08-12 — Sesión: menú de Ajustes (idioma + tema claro/oscuro) en la Navbar

### Added
- `shared/hook/useTheme.js` (barrel `shared/hook`): tema `'dark'`/`'light'` con init `localStorage['portfolio-theme']` → `prefers-color-scheme`. Al cambiar setea `data-theme` en `<html>`, persiste y actualiza `meta[name="theme-color"]`.
- Script inline en `index.html` (head): setea `data-theme` antes del primer paint (evita flash al recargar).
- Primitiva `DropdownButton` en `shared/ui/Dropdown` (exportada por barrel): item accionable no-link (`li > button`, mismo estilo que `DropdownItem`, props `role`/`aria-checked`/`icon`/`onClick`, cierra el menú tras el click).
- `widgets/Navbar/ui/SettingsMenu.jsx`: botón de ajustes con `Dropdown`. Trigger: `IconButton` lucide `Settings` (desktop) o fila full-width "Ajustes" (`variant="row"`: Settings + label + ChevronDown, para el menú móvil). Menú: grupo **idioma** (Español/English, `DropdownButton` `menuitemradio` + `aria-checked`, lucide `Languages`, Check `text-primary` en el activo, `onDone` al elegir) + `li role="separator"` + **tema** (`DropdownButton` `menuitemcheckbox`, lucide `Sun`/`Moon` según el estado, label "Modo claro"/"Modo oscuro" con `toggleTheme`).
- Token `--color-on-primary` en `globals.css` (`#eff2f4`): texto/ícono sobre `bg-primary` — garantiza AA de los CTAs en ambos temas.

### Changed
- `Navbar`: se elimina `LanguageSwitcher` (componente y archivo). Desktop: `SettingsMenu` envuelto en `hidden md:flex` junto al CTA. Mobile: fila "Ajustes" (`SettingsMenu variant="row"` + `wrapperClassName="w-full"`) al final del menú hamburguesa separada con `border-t`, cerrando el menú al elegir idioma (`onDone`).
- `globals.css`: tema claro vía `:root[data-theme="light"]` (solo flipan `text #171a1f` / `background #ffffff` / `secondary #6b5b84` / `accent #6d4d8f` + `color-scheme: light`; `:root` por defecto `color-scheme: dark`). `primary`/`on-primary` se mantienen igual en ambos temas.
- `Button` y `IconButton` (variante primary) pasan de `text-text` a `text-on-primary`; mismo cambio en el box de iniciales del Navbar (el texto era `text-text`, que en tema claro fallaba contraste sobre el navy).
- Labels nuevos en `sections.navbar` (en/es): `settings`, `language`, `darkMode`, `lightMode`; se elimina `switchLanguage`.

### Docs
- `AGENTS.md`: bala de idioma apuntando al `SettingsMenu` + nueva bala "Tema claro/oscuro" (useTheme, token `--on-primary`, script inline, `DropdownButton`).
- `.doc/architecture.md`: `SettingsMenu.jsx` en Navbar, `useTheme.js` en `shared/hook`, `shared/i18n/` documentado por primera vez; actualizada la nota de `features/theme-toggle`.
- `.doc/design.md`: tokens con `--on-primary` + overlays de tema claro, variantes primary con `text-on-primary`, `DropdownButton` en la primitiva Dropdown y uso en SettingsMenu, nota de contraste del tema claro en §5.
- `.doc/rules.md`: §3 actualizado (toggle de tema no es feature propia).
- `CHANGELOG.md`: esta entrada.

## 2026-08-12 — Sesión: switcher de idioma ES/EN (i18n custom)

### Added
- `shared/i18n/` (barrel `index.js`): `context.js` (crea `LanguageContext`), `LanguageProvider.jsx` (provider que envuelve `MainLayout` en `App.jsx`) y `useLanguage.js` (hook consumidor). Inicialización: `localStorage['portfolio-lang']` → si no existe, `navigator.language` empezando con `es` → español, sino inglés. `setLang` persiste en localStorage y el effect sincroniza `document.documentElement.lang`, `document.title` y las metas `description`/`og:title`/`og:description` (SEO dinámico por idioma).
- `shared/data/seo.js` (barrel): title/description por-locale para el SSR de `index.html`/Open Graph.
- `widgets/Navbar/ui/LanguageSwitcher.jsx`: toggle ES/EN (grupo de botones `aria-pressed` + `aria-label` traducido) montado en la Navbar junto al CTA.

### Changed
- `shared/data` pasa a bundles por-locale `{ en, es }`: `sections.js` (copy completo + labels nuevos de proyectos/modal/navbar por idioma), `profile.js` (`profile` con invariantes `name`/`initials`/`socials` + `en`/`es` con `role`/`heroBio`/`aboutBio`/`cv`), `projects.js` (títulos y descripciones en español), `timeline.js` (labels/notes y meses en español). `nav` pasa de links-string a **`{ id, label }`** — los hrefs (`#home`, etc.) se generan desde `id`, desacoplando URL de texto traducible.
- `techStack.js`: de objeto `{Categoría: items[]}` a **array de grupos** `[{ key, items }]` (techs universales, sin traducir); las etiquetas de categoría viven en `sections.techStack.categories[lang]` ("Database"→"Base de datos", "Tools"→"Herramientas"). El Hero derive `techStack.flatMap(g => g.items).filter(onHero)`.
- Widgets (Navbar, Hero, About, Projects, ProjectCard, ProjectActions, ProjectModal, TechStack, Timeline, Contact, Footer) y `ContactForm` consumen la data vía `useLanguage()` (re-render al cambiar idioma). Strings hardcodeados externalizados: "View more", "In development", "Watch", "Live demo", "Repo" + labels del dropdown, categorías del modal, aria-labels del nav ("Principal"/"Navegación móvil"/"Alternar menú") y plantilla de alt de screenshots `{name} screenshot {n}` / `Captura {n} de {name}`.
- Copy completo en español preparado (hero, bio de 3 párrafos, proyectos Nexo/Antisocial Net/Uloom, formulario con voseo, timeline).

### Docs
- `AGENTS.md`: reemplazada la bala "Idioma: todo el sitio en inglés" por la descripción del sistema ES/EN (arquitectura de `shared/i18n`, shape por-locale de la data, inicialización y la excepción del hook `useLanguage` fuera de `shared/hook`).

## 2026-08-11 — Sesión: sistema de carpetas de screenshots (img0 miniatura / img1+ carousel)

### Added
- Helper `shared/lib/projectImages.js` (exportado por barrel `shared/lib`): resuelve las imágenes de un proyecto por convención de carpetas con `import.meta.glob` eager sobre `/src/shared/assets/images/projects/*/img*.{webp,png,jpg,jpeg}`. Devuelve `{ cover, carousel }` ordenado numéricamente (`img10` después de `img9`). `cover` = `img0` (miniatura, nunca en el carousel); `carousel` = `img1+`. Con cero archivos devuelve `cover: null` / `carousel: []` sin romper el build.
- Carpetas `shared/assets/images/projects/{nexo,antisocial-net,uloom}/` con `.gitkeep` — estructura lista para soltar los WebP.

### Changed
- `ProjectCard`: la cover pasa de `project.images[0]` a `cover` de `projectImages(project.id)` (mantiene fallback picsum si no hay archivos).
- `ProjectModal`: el carousel y el lightbox usan `carousel` de `projectImages(project.id)` (img0 excluida); `hasImages`/`total` derivan de `carousel.length`.
- `shared/data/projects.js`: se elimina el campo `images: []` de los 3 proyectos — las imágenes ya no viven en la data, las resuelve la convención de carpetas.

### Docs
- `architecture.md` §3: convención documentada (carpeta = `project.id`, `img0` miniatura / `img1+` carousel, helper `projectImages`).
- `design.md`: Carousel y ProjectModal referencian `projectImages`/`carousel` en vez de `project.images`.

## 2026-08-11 — Sesión: revisión general de la página (a11y, primitivas, contenido, SEO)

### Added
- Primitiva `SectionLabel` en `shared/ui` (eyebrow de sección: `text-accent` uppercase + raya `w-4 h-px bg-accent` decorativa `aria-hidden`) — reemplaza el `<p>` duplicado en About, Projects, TechStack, Timeline y Contact.
- Meta tags de SEO en `index.html`: `<title>` específico ("Lautaro B. Olivera — Full Stack Developer"), `meta description`, Open Graph (`og:type`, `og:title`, `og:description`, `og:image`), Twitter Card, `theme-color`. `html lang="es"` → `lang="en"`.
- `public/og-image.png` (1200×630, generado con System.Drawing) para el Open Graph — placeholder visual hasta tener una imagen de marca.
- `public/cv.pdf` (placeholder PDF válido, 662 bytes) — se reemplaza por el CV real antes del deploy.

### Changed
- **Contraste a11y:** `--color-accent: #8d6b9b` → `#a58fc2` (texto chico con accent ahora pasa AA sobre `background` y `bg-text/5`). El item activo del nav pasa de `text-primary` (~2.2:1, casi invisible) a `text-text` + subrayado `border-primary`, manteniendo `primary` solo como indicador visual.
- `About`: foto real (`shared/assets/images/profile/hero.png`, importada con `width`/`height` + `alt` descriptivo y `object-cover`) — se elimina el bloque "Photo placeholder". *Pendiente: convertir a WebP cuando haya una herramienta de conversión disponible.*
- `Contact`: card "Direct contact" migra del `<div>` crudo a `Card variant="surface"` + `CardBody` (se elimina la duplicación de la primitiva).
- `cv.url` pasa de `'#'` a `/cv.pdf` (ambos "Download CV" ahora tienen destino).
- `socials` muestran el handle real (`github.com/...`, email) en vez de "Github"/"Linkedin".
- Idioma unificado a inglés: CTA del nav "Contactar" → "Contact", botón "Ver mas" → "View more", mes "Abr–Jul" → "Apr–Jul" en el timeline.

### Removed
- Eyebrows duplicados (5 ocurrencias del mismo `<p>`).

## 2026-08-11 — Sesión: links de socials (LinkedIn/GitHub/Email) en pestaña nueva

### Changed
- Los links de `socials` (LinkedIn, GitHub, Email) abren en **pestaña nueva** (`target="_blank" rel="noopener noreferrer"`) en el `Footer` (IconButtons) y en la card "Direct contact" de `Contact` — ya no reemplazan la pestaña actual.

## 2026-08-11 — Sesión: shared Toast + feedback de éxito del formulario

### Added
- `shared/ui/Toast/Toast.jsx` (barrel): notificación auto-dismissible. Portal a `document.body`, `fixed bottom-4 right-4 z-[80]`, `role="status"` + `aria-live="polite"`, icono opcional y X de cierre. **Auto-cierre** por `setTimeout(duration)` (default 5000, `onClose` vía ref para no reiniciar el timer en re-renders). **Barra de duración en vivo:** fill `bg-primary` que drena con la animación `toast-drain` (`@theme --animate-toast-drain` en `globals.css`, `width` 100%→0, `linear forwards`) con `animationDuration` inline; `motion-reduce:[animation:none]` en reduced-motion.
- Copy del feedback en `sections.contact`: `sendAnother`, `toastTitle`, `toastBody`.

### Changed
- `useContactForm`: `submit` ahora devuelve `boolean` (éxito) y agrega `reset()` (fields/errors/serverError limpios, `status → idle`).
- `ContactForm`: al enviar OK muestra el `Toast` (por el retorno de `submit`, sin effects) y la card "Message received" pasa a una fila con texto a la izquierda + botón **"Send another"** (`variant="ghost"`, icono lucide `Plus`) al end, que resetea el form.

## 2026-08-11 — Sesión: formulario de contacto conectado a Formspree (features/contact-form)

### Added
- `features/contact-form/` (barrel `index.js`): `ContactForm` (UI del form: campos con validación inline + `aria-invalid`/`aria-describedby`, estados `idle`/`sending`/`sent`/`error`, banner de éxito), `useContactForm` (hook: estado, validación y submit real a Formspree), `validateEmail` (lib con JSDoc).
- Copia del form en `sections.contact`: labels/placeholders de los campos, mensajes de validación (`nameRequired`/`emailRequired`/`emailInvalid`/`messageRequired`) y de error (`errorTitle`/`errorBody`).

### Changed
- `Contact` widget queda presentacional: renderiza `ContactForm` (desde la feature) + card "Direct contact" + botón CV. Se elimina el estado inline (fields/status) y el submit mock con `setTimeout`.
- Submit real: `fetch(CONTACT_FORM_ENDPOINT)` de `shared/data/contact.js` con `FormData` del form (campos con `name`) y header `Accept: application/json`; manejo de fallos de Formspree (`data.errors[0].message`) y de red, dejando el form intacto para reintentar.

### Removed
- El `setTimeout` mock del formulario (pendiente del AGENTS: extraer `features/contact-form` — ahora cumplido).

## 2026-08-11 — Sesión: endpoint Formspree del formulario de contacto

### Added
- `shared/data/contact.js` (barrel): `CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/xrpzqvzv'` — endpoint público de Formspree para el formulario de contacto, guardado listo para cuando se extraiga `features/contact-form` (pendiente).

## 2026-08-11 — Sesión: lista de tecnologías en 2 columnas en mobile

### Changed
- `TechStack`: en mobile, las listas con **más de 5 tecnologías** se dividen en 2 columnas (`grid grid-cols-2 gap-x-3 gap-y-2`) para reducir el alto; desde `sm:` vuelven a 1 columna. Las cards con ≤5 ítems (Database) quedan igual.

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