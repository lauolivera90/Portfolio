import { useLanguage } from '../../../shared/i18n/index.js'
import { Container, SectionLabel } from '../../../shared/ui/index.js'
import heroPhoto from '../../../shared/assets/images/profile/Hero.webp'

export function About() {
  const { profile, sections } = useLanguage()

  return (
    <section id="about" className="py-24 border-t border-text/10">
      <Container>
        <SectionLabel>{sections.about.eyebrow}</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-semibold text-text mb-12">{sections.about.title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          <div className="flex-shrink-0">
            <img
              src={heroPhoto}
              alt={`${profile.name}, ${profile.role}`}
              width="280"
              height="280"
              className="w-full max-w-[280px] aspect-square object-cover rounded-xl border border-text/10"
            />
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