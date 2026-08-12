const imageModules = import.meta.glob(
  '/src/shared/assets/images/projects/*/img*.{webp,png,jpg,jpeg}',
  { eager: true, import: 'default' },
)

/**
 * Resuelve las imágenes de un proyecto por convención de carpetas:
 * `shared/assets/images/projects/<projectId>/img0.webp`, `img1.webp`, ...
 * - `img0` = miniatura de la card (cover, nunca en el carousel).
 * - `img1+` = capturas del carousel/lightbox del modal.
 *
 * Devuelve URLs resueltas por el bundler (con hash en build). Con cero imágenes
 * devuelve `cover: null` y `carousel: []` — la card usa su fallback.
 * @param {string} projectId - id del proyecto (carpeta en shared/assets/images/projects/).
 * @returns {{ cover: string | null, carousel: string[] }}
 */
export function projectImages(projectId) {
  const base = `/src/shared/assets/images/projects/${projectId}/`
  const urls = Object.keys(imageModules)
    .filter((key) => key.startsWith(base))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((key) => imageModules[key])

  return { cover: urls[0] ?? null, carousel: urls.slice(1) }
}
