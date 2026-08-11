import { useLayoutEffect, useRef, useState } from 'react'

export function useLines() {
  const ref = useRef(null)
  const [lines, setLines] = useState(1)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    let lastWidth = null
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 23

    const measure = () => {
      const width = el.getBoundingClientRect().width
      if (width === lastWidth) return
      lastWidth = width

      const saved = el.style.WebkitLineClamp
      el.style.WebkitLineClamp = 'unset'
      const count = Math.max(1, Math.round(el.offsetHeight / lineHeight))
      el.style.WebkitLineClamp = saved

      setLines(count)
    }

    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      ro.disconnect()
      el.style.WebkitLineClamp = ''
    }
  }, [])

  return [ref, lines]
}