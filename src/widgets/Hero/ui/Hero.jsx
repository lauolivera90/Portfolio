import { Download } from 'lucide-react'
import { useLanguage } from '../../../shared/i18n/index.js'
import { iconColor } from '../../../shared/lib/index.js'
import { Button, Container } from '../../../shared/ui/index.js'

export function Hero() {
  const { profile, sections, techStack } = useLanguage()
  const heroIcons = techStack.flatMap((group) => group.items).filter((t) => t.onHero)

  return (
    <section id="home" className="min-h-svh flex items-center pt-20">
      <Container className="py-16 w-full">
        <div className="max-w-2xl">
          <h1 className="text-[clamp(2.25rem,5vw,3rem)] font-semibold text-text leading-tight tracking-tight mb-4">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-text/80 mb-5">
            {profile.role}
          </p>
          <p className="text-base text-text/60 leading-relaxed max-w-lg mb-8">
            {profile.heroBio}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" href="#projects">
              {sections.hero.ctaProjects}
            </Button>
            <Button variant="secondary" href={profile.cv.url} icon={<Download />}>
              {profile.cv.label}
            </Button>
          </div>

          <div className="mt-10 pt-6 border-t border-text/10 flex flex-col gap-5">
            <span className="text-sm font-medium text-text/80">{sections.hero.techLabel}</span>
            <div className="flex items-center gap-5 text-text/50">
              {heroIcons.map(({ name, icon: Icon }) => (
                <Icon key={name} size={28} color={iconColor(Icon)} aria-hidden="true" className="hover:text-text transition-colors" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}