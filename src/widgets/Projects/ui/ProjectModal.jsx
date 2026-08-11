import { ExternalLink } from 'lucide-react'
import { Button, Carousel, Modal, ModalBody, ModalFooter, ModalHeader, Tag } from '../../../shared/ui/index.js'
import { IconGithub } from './ProjectCard.jsx'

const SCREENSHOT_IMG = 'https://picsum.photos/200/300'
const SCREENSHOTS_MOCK = [SCREENSHOT_IMG, SCREENSHOT_IMG, SCREENSHOT_IMG]

const FRONTEND_MOCK = ['React', 'TypeScript', 'Redux']
const BACKEND_MOCK = ['Node.js', 'PostgreSQL', 'Redis']
const TOOLS_MOCK = ['Docker', 'GitHub Actions', 'Vercel']

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

  return (
    <Modal open onClose={onClose} size="xl" ariaLabel={project.title}>
      <ModalHeader onClose={onClose}>
        <h3 className="text-base font-semibold text-text leading-snug">{project.title}</h3>
      </ModalHeader>

      <ModalBody>
        <Carousel ariaLabel="Capturas del proyecto">
          {SCREENSHOTS_MOCK.map((src, i) => (
            <img key={i} src={src} alt={project.title} width="200" height="300" loading="lazy" />
          ))}
        </Carousel>

        <p className="text-sm text-text/60 leading-relaxed">{project.description}</p>

        <TechSection label="Frontend" items={FRONTEND_MOCK} />
        <TechSection label="Backend" items={BACKEND_MOCK} />
        <TechSection label="Herramientas" items={TOOLS_MOCK} />
      </ModalBody>

      <ModalFooter>
        <div className="flex gap-3">
          <Button variant="primary" className="flex-1" href={project.demo} icon={<ExternalLink />}>
            Live demo
          </Button>
          <Button variant="secondary" href={project.repo} icon={<IconGithub />}>
            Repo
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}