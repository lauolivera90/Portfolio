const imageModules = import.meta.glob(
  '/src/shared/assets/images/projects/*/*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' },
)

const THUMB_RE = /\/thumb\.(webp|png|jpg|jpeg)$/i

/**
 * Resuelve las imágenes de un proyecto por convención de carpetas:
 * `shared/assets/images/projects/<projectId>/Thumb.webp` + capturas.
 * - `Thumb.webp` = miniatura de la card (cover, nunca en el carousel).
 * - El resto son capturas del carousel/lightbox del modal, agrupadas por
 *   sección con la versión desktop (`...1`) antes que la mobile (`...2`).
 *
 * Devuelve URLs resueltas por el bundler (con hash en build). Con cero imágenes
 * devuelve `cover: null` y `carousel: []` — la card usa su fallback.
 * @param {string} projectId - id del proyecto (carpeta en shared/assets/images/projects/).
 * @returns {{ cover: string | null, carousel: string[] }}
 */
export function projectImages(projectId) {
  const base = `/src/shared/assets/images/projects/${projectId}/`
  const files = Object.keys(imageModules)
    .filter((key) => key.startsWith(base))
    .map((key) => ({ key, url: imageModules[key] }))

  const thumb = files.find((f) => THUMB_RE.test(f.key)) ?? null
  const carousel = files
    .filter((f) => f !== thumb)
    .sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true, sensitivity: 'base' }))
    .map((f) => f.url)

  return { cover: thumb?.url ?? null, carousel }
}