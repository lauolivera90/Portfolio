import { useLanguage } from '../../../shared/i18n/index.js'
import { iconColor } from '../../../shared/lib/index.js'
import { Card, CardBody, Container, SectionLabel } from '../../../shared/ui/index.js'

export function TechStack() {
  const { sections, techStack } = useLanguage()

  return (
    <section className="py-24 border-t border-text/10">
      <Container>
        <SectionLabel>{sections.techStack.eyebrow}</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-semibold text-text mb-12">{sections.techStack.title}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techStack.map((group) => {
            const categoryLabel = sections.techStack.categories[group.key] ?? group.key
            const listClass =
              group.items.length > 5
                ? 'grid grid-cols-2 gap-x-3 gap-y-2 sm:grid-cols-1 sm:gap-x-0'
                : 'flex flex-col gap-2'
            return (
              <Card key={group.key} variant="surface" className="h-full">
                <CardBody>
                  <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">
                    {categoryLabel}
                  </p>
                  <ul className={listClass}>
                    {group.items.map(({ name, icon: Icon }) => (
                      <li key={name} className="flex items-center gap-3">
                        <span className="text-text/60" aria-hidden="true">
                          <Icon size={20} color={iconColor(Icon)} />
                        </span>
                        <span className="text-sm text-text/60">{name}</span>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </Container>
    </section>
  )
}