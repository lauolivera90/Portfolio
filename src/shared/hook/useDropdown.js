import { useCallback, useEffect, useRef, useState } from 'react'

export function useDropdown() {
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)
  const menuRef = useRef(null)

  const toggle = useCallback(() => setOpen((isOpen) => !isOpen), [])
  const close = useCallback(() => setOpen(false), [])
  const openMenu = useCallback(() => setOpen(true), [])

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) close()
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        close()
        wrapperRef.current?.querySelector('[aria-haspopup="menu"]')?.focus()
      }
    }
    const onScroll = () => close()

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('scroll', onScroll, true)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('scroll', onScroll, true)
    }
  }, [open, close])

  return { open, toggle, close, openMenu, wrapperRef, menuRef }
}