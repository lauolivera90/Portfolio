import { sections, techStack } from '../../../shared/data/index.js'
import { Card, CardBody, Container } from '../../../shared/ui/index.js'

export function TechStack() {
  return (
    <section className="py-24 border-t border-text/10">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          {sections.techStack.eyebrow}
        </p>
        <h2 className="text-3xl font-bold text-text mb-12">{sections.techStack.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(techStack).map(([category, items]) => (
            <Card key={category} variant="surface" className="h-full">
              <CardBody>
                <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">
                  {category}
                </p>
                <ul className="flex flex-col gap-2">
                  {items.map(({ name, icon: Icon }) => (
                    <li key={name} className="flex items-center gap-3">
                      <span className="text-text/60" aria-hidden="true">
                        <Icon size={20} color="default" />
                      </span>
                      <span className="text-sm text-text/60">{name}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}