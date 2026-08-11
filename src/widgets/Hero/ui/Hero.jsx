import { Braces, Code2, Database, Globe, Server } from 'lucide-react'
import { Button, Container } from '../../../shared/ui/index.js'

const TECH_ICONS = [Code2, Database, Server, Globe, Braces]

const IconDownload = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export function Hero() {
  return (
    <section id="home" className="min-h-svh flex items-center pt-20">
      <Container className="py-16 w-full">
        <div className="max-w-2xl">
          <h1 className="text-[clamp(2.5rem,7vw,3.75rem)] font-bold text-text leading-tight tracking-tight mb-4">
            Alex Kim
          </h1>
          <p className="text-xl md:text-2xl font-medium text-text/80 mb-5">
            Full Stack Developer
          </p>
          <p className="text-base text-text/60 leading-relaxed max-w-lg mb-8">
            I design and build reliable software from database schema to user interface.
            Eight years shipping products that handle real traffic, real data, and real edge cases.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button variant="primary" href="#projects">
              View projects
            </Button>
            <Button variant="secondary" href="#" icon={<IconDownload />}>
              Download CV
            </Button>
          </div>

          <div className="mt-10 pt-6 border-t border-text/10 flex flex-col gap-5">
            <span className="text-sm font-medium text-text/80">Technologies I work with</span>
            <div className="flex items-center gap-5 text-text/50">
              {TECH_ICONS.map((Icon, i) => (
                <Icon key={i} size={28} aria-hidden="true" className="hover:text-text transition-colors" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}