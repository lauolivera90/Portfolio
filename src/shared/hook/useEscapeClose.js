import { useEffect } from 'react'

/**
 * Ejecuta `onClose` cuando se presiona Escape mientras `enabled` está en true.
 * @param {boolean} enabled
 * @param {() => void} onClose
 */
export function useEscapeClose(enabled, onClose) {
  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled, onClose])
}