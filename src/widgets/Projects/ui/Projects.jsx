import { useState } from 'react'
import { projects } from '../../../shared/data/projects.js'
import { Container } from '../../../shared/ui/index.js'
import { ProjectCard } from './ProjectCard.jsx'
import { ProjectModal } from './ProjectModal.jsx'

export function Projects() {
  const [activeProject, setActiveProject] = useState(null)

  return (
    <section id="projects" className="py-24 border-t border-text/10 bg-text/5">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          Projects
        </p>
        <h2 className="text-3xl font-bold text-text mb-3">Selected work</h2>
        <p className="text-text/60 text-sm mb-12 max-w-xl">
          A sample of recent projects — built end to end, from schema design to deployment.
        </p>

        <div className="flex flex-wrap gap-y-5 -mx-2.5">
          {projects.map((p) => (
            <div key={p.id} className="w-full sm:w-1/2 lg:w-1/3 px-2.5">
              <ProjectCard project={p} onVerMas={() => setActiveProject(p)} />
            </div>
          ))}
        </div>
      </Container>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}