import { useState } from 'react'
import { projectImages } from '../../../shared/lib/index.js'
import { Carousel, Lightbox, Modal, ModalBody, ModalFooter, ModalHeader, Tag } from '../../../shared/ui/index.js'
import { ProjectActions } from './ProjectActions.jsx'

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
  const [zoomIndex, setZoomIndex] = useState(null)

  if (!project) return null

  const { carousel } = projectImages(project.id)
  const hasImages = carousel.length > 0
  const sections = STACK_SECTIONS.filter((s) => (project.stack[s.key]?.length ?? 0) > 0)
  const total = carousel.length

  return (
    <>
      <Modal open onClose={onClose} size="xl" ariaLabel={project.title} suspended={zoomIndex !== null}>
        <ModalHeader onClose={onClose}>
          <h3 className="text-base font-semibold text-text leading-snug">{project.title}</h3>
        </ModalHeader>

        <ModalBody>
          {hasImages && (
            <Carousel
              ariaLabel="Project screenshots"
              paused={zoomIndex !== null}
              onImageClick={setZoomIndex}
            >
              {carousel.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  width="200"
                  height="300"
                  loading="lazy"
                />
              ))}
            </Carousel>
          )}

          <p className="text-sm text-text/60 leading-relaxed">{project.fullDescription}</p>

          {sections.map((s) => (
            <TechSection key={s.key} label={s.label} items={project.stack[s.key]} />
          ))}
        </ModalBody>

        <ModalFooter>
          <ProjectActions project={project} />
        </ModalFooter>
      </Modal>

      {zoomIndex !== null && (
        <Lightbox
          open
          src={carousel[zoomIndex]}
          alt={`${project.title} screenshot ${zoomIndex + 1}`}
          onPrev={() => setZoomIndex((i) => (i - 1 + total) % total)}
          onNext={() => setZoomIndex((i) => (i + 1) % total)}
          onClose={() => setZoomIndex(null)}
        />
      )}
    </>
  )
}