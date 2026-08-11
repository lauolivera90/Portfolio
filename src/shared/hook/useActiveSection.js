import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? null)

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}