/**
 * Valida un email con una regex simple (sin caracteres inválidos y un solo @).
 * @param {string} value - Email a validar.
 * @returns {boolean} `true` si el formato es válido.
 */
export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}