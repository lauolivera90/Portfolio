import { useCallback, useRef, useState } from 'react'
import { projects, sections } from '../../../shared/data/index.js'
import { Container } from '../../../shared/ui/index.js'
import { ProjectCard } from './ProjectCard.jsx'
import { ProjectModal } from './ProjectModal.jsx'

export function Projects() {
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
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          {sections.projects.eyebrow}
        </p>
        <h2 className="text-3xl font-bold text-text mb-3">{sections.projects.title}</h2>
        <p className="text-text/60 text-sm mb-12 max-w-xl">
          {sections.projects.subtitle}
        </p>

        <div className="flex flex-wrap gap-y-5 -mx-2.5">
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