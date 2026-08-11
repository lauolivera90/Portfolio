import { useLayoutEffect, useState } from 'react'

const GAP = 8

export function useDropdownPlacement({ triggerRef, menuRef, open }) {
  const [coords, setCoords] = useState(null)

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !menuRef.current) return

    const compute = () => {
      const trigger = triggerRef.current.getBoundingClientRect()
      const width = menuRef.current.offsetWidth
      const height = menuRef.current.offsetHeight

      const spaceBelow = window.innerHeight - trigger.bottom
      const spaceAbove = trigger.top
      const spaceRight = window.innerWidth - trigger.left
      const spaceLeft = trigger.right

      const fitsBelow = spaceBelow >= height
      const fitsAbove = spaceAbove >= height
      const below = fitsBelow || (!fitsAbove && spaceBelow >= spaceAbove)

      const fitsStart = spaceRight >= width
      const fitsEnd = spaceLeft >= width
      const start = fitsStart || (!fitsEnd && spaceRight >= spaceLeft)

      setCoords({
        [below ? 'top' : 'bottom']: (below ? trigger.bottom : window.innerHeight - trigger.top) + GAP,
        [start ? 'left' : 'right']: start ? trigger.left : window.innerWidth - trigger.right,
      })
    }

    compute()
    window.addEventListener('resize', compute)

    const observer = new ResizeObserver(compute)
    observer.observe(menuRef.current)

    return () => {
      window.removeEventListener('resize', compute)
      observer.disconnect()
    }
  }, [open, triggerRef, menuRef])

  return coords
}