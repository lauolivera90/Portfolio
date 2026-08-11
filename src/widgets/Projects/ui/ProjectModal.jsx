import { ExternalLink } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Button, Carousel, Modal, ModalBody, ModalFooter, ModalHeader, Tag } from '../../../shared/ui/index.js'

const STACK_SECTIONS = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'tools', label: 'Tools' },
]

function TechSection({ label, items }) {
  return (
    <div>
      <h4 className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-3">{label}</h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
    </div>
  )
}

export function ProjectModal({ project, onClose }) {
  if (!project) return null

  const images = project.images.length > 0 ? project.images : ['https://picsum.photos/200/300']
  const sections = STACK_SECTIONS.filter((s) => (project.stack[s.key]?.length ?? 0) > 0)

  return (
    <Modal open onClose={onClose} size="xl" ariaLabel={project.title}>
      <ModalHeader onClose={onClose}>
        <h3 className="text-base font-semibold text-text leading-snug">{project.title}</h3>
      </ModalHeader>

      <ModalBody>
        <Carousel ariaLabel="Project screenshots">
          {images.map((src, i) => (
            <img key={i} src={src} alt={`${project.title} screenshot ${i + 1}`} width="200" height="300" loading="lazy" />
          ))}
        </Carousel>

        <p className="text-sm text-text/60 leading-relaxed">{project.fullDescription}</p>

        {sections.map((s) => (
          <TechSection key={s.key} label={s.label} items={project.stack[s.key]} />
        ))}
      </ModalBody>

      <ModalFooter>
        <div className="flex gap-3">
          <Button
            variant="primary"
            className="flex-1"
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={<ExternalLink />}
          >
            Live demo
          </Button>
          <Button
            variant="secondary"
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            icon={<SiGithub color="currentColor" />}
          >
            Repo
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}