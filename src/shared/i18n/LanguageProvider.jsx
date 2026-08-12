import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  profile as profileData,
  projects as projectsData,
  sections as sectionsData,
  nav as navData,
  socials as socialsData,
  techStack,
  timeline as timelineData,
  seo as seoData,
} from '../data/index.js'
import { LanguageContext } from './context.js'

const STORAGE_KEY = 'portfolio-lang'

function detectInitialLang() {
  const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  if (stored === 'es' || stored === 'en') return stored
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  const setLang = useCallback((next) => {
    setLangState(next === 'es' ? 'es' : 'en')
  }, [])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      // Invariantes (iguales en ambos idiomas) + textos del idioma activo.
      profile: { ...profileData, ...profileData[lang] },
      socials: socialsData,
      sections: sectionsData[lang],
      nav: navData[lang],
      techStack,
      projects: projectsData[lang],
      timeline: timelineData[lang],
      meta: seoData[lang],
    }),
    [lang, setLang],
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // almacenamiento bloqueado — el idioma simplemente no persiste
    }
    document.documentElement.lang = lang
    document.title = value.meta.title
    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', value.meta.description)
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', value.meta.title)
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', value.meta.description)
  }, [value.meta, lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}