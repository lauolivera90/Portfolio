import { techStack } from '../../../shared/data/techStack.js'
import { Container } from '../../../shared/ui/index.js'

function Tag({ label }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-text/5 text-text border border-text/10">
      {label}
    </span>
  )
}

export function TechStack() {
  return (
    <section className="py-24 border-t border-text/10">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          Tech stack
        </p>
        <h2 className="text-3xl font-bold text-text mb-12">Tools I work with</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(techStack).map(([category, items]) => (
            <div key={category} className="bg-text/5 rounded-xl border border-text/10 p-5">
              <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}