import { useState } from 'react'
import { useHideOnScroll } from './useHideOnScroll.js'

export function useNavbarVisibility({ threshold = 200, menuOpen = false } = {}) {
  const scrollHidden = useHideOnScroll({ threshold })
  const [hoverVisible, setHoverVisible] = useState(false)

  return {
    hidden: scrollHidden && !hoverVisible && !menuOpen,
    reveal: () => setHoverVisible(true),
    unreveal: () => setHoverVisible(false),
  }
}