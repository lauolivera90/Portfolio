import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { useLines } from '../../../shared/hook/index.js'
import { Button, Card, CardBody, CardFooter, Tag } from '../../../shared/ui/index.js'
import { ProjectActions } from './ProjectActions.jsx'

export function ProjectCard({ project, maxLines = 0, onLines, onVerMas }) {
  const [descRef, lines] = useLines()
  const tags = [
    ...project.stack.frontend.slice(0, 2),
    ...project.stack.backend.slice(0, 1),
    ...project.stack.database.slice(0, 1),
  ]
  const cover = project.images[0] ?? 'https://picsum.photos/200/300'

  useEffect(() => {
    onLines(project.id, lines)
  }, [lines, onLines, project.id])

  return (
    <Card variant="raised" className="h-full flex flex-col hover:border-primary/40 transition-colors">
      <CardBody>
        <img
          src={cover}
          alt={project.title}
          width="200"
          height="300"
          loading="lazy"
          className="block w-full aspect-video object-cover -mx-5 -mt-5 -mb-5"
        />
      </CardBody>

      <CardFooter className="flex-1">
        <div className="flex flex-col gap-4 h-full">
          <h3 className="text-base font-semibold text-text leading-snug">{project.title}</h3>
          <p
            ref={descRef}
            style={
              maxLines > 0
                ? {
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: maxLines,
                    overflow: 'hidden',
                  }
                : undefined
            }
            className="text-sm text-text/60 leading-relaxed"
          >
            {project.shortDescription}
          </p>

          <div className="mt-auto flex flex-col gap-3">
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            )}

            <ProjectActions project={project} />

            <Button variant="ghost" onClick={onVerMas}>
              <span className="inline-flex items-center gap-2">
                Ver mas
                <ArrowRight aria-hidden="true" size={16} />
              </span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}