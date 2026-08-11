import { profile, sections } from '../../../shared/data/index.js'
import { Container } from '../../../shared/ui/index.js'

export function About() {
  return (
    <section id="about" className="py-24 border-t border-text/10">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          {sections.about.eyebrow}
        </p>
        <h2 className="text-3xl font-bold text-text mb-12">{sections.about.title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          <div className="flex-shrink-0">
            <div className="w-full max-w-[280px] aspect-square rounded-xl bg-text/5 border border-text/10 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-text/80">{profile.initials}</span>
              </div>
              <span className="text-xs text-text/60">Photo placeholder</span>
            </div>
          </div>

          <div>
            {profile.aboutBio.map((paragraph, i) => (
              <p key={i} className="text-text/60 text-base leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}