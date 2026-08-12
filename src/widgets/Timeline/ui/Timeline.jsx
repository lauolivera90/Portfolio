import { useLanguage } from '../../../shared/i18n/index.js'
import { Container, SectionLabel } from '../../../shared/ui/index.js'

export function Timeline() {
  const { sections, timeline } = useLanguage()

  return (
    <section id="timeline" className="py-24 border-t border-text/10 bg-text/5">
      <Container>
        <SectionLabel>{sections.timeline.eyebrow}</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-semibold text-text mb-16">{sections.timeline.title}</h2>

        <div className="flex flex-col gap-0">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-3 h-3 rounded-full flex-shrink-0 z-10 mt-1 ${
                    i === timeline.length - 1 ? 'bg-primary ring-4 ring-primary/20' : 'bg-text/30'
                  }`}
                />
                {i < timeline.length - 1 && <div className="w-px flex-1 bg-text/10 my-1" />}
              </div>
              <div className="pb-8">
                <p className="text-xs font-semibold text-accent mb-0.5">{item.month} {item.year}</p>
                <p className="text-sm font-medium text-text mb-0.5">{item.label}</p>
                <p className="text-xs text-text/60">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}