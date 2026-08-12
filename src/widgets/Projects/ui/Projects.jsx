import { useCallback, useRef, useState } from 'react'
import { useLanguage } from '../../../shared/i18n/index.js'
import { Container, SectionLabel } from '../../../shared/ui/index.js'
import { ProjectCard } from './ProjectCard.jsx'
import { ProjectModal } from './ProjectModal.jsx'

export function Projects() {
  const { projects, sections } = useLanguage()
  const [activeProject, setActiveProject] = useState(null)
  const [maxLines, setMaxLines] = useState(0)
  const linesRef = useRef({})

  const reportLines = useCallback((id, lines) => {
    linesRef.current[id] = lines
    setMaxLines(Math.max(0, ...Object.values(linesRef.current)))
  }, [])

  return (
    <section id="projects" className="py-24 border-t border-text/10 bg-text/5">
      <Container>
        <SectionLabel>{sections.projects.eyebrow}</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-semibold text-text mb-3">{sections.projects.title}</h2>
        <p className="text-text/60 text-sm mb-12 max-w-xl">
          {sections.projects.subtitle}
        </p>

        <div className="flex flex-wrap gap-y-5 -mx-2.5 justify-center">
          {projects.map((p) => (
            <div key={p.id} className="w-full sm:w-1/2 lg:w-1/3 px-2.5">
              <ProjectCard
                project={p}
                maxLines={maxLines}
                onLines={reportLines}
                onVerMas={() => setActiveProject(p)}
              />
            </div>
          ))}
        </div>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}