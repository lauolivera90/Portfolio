import { Button, Container } from '../../../shared/ui/index.js'

const IconDownload = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <Container className="py-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 text-text/80 text-xs font-medium px-3 py-1.5 rounded mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-text/80 animate-pulse" />
            Available for new projects
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-text leading-tight tracking-tight mb-4">
            Alex Kim
          </h1>
          <p className="text-xl md:text-2xl font-medium text-text/80 mb-6">
            Full Stack Developer
          </p>
          <p className="text-base text-text/60 leading-relaxed max-w-lg mb-10">
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

          <div className="mt-16 pt-8 border-t border-text/10 flex flex-wrap gap-10">
            {[
              ['8+', 'Years of experience'],
              ['40+', 'Projects shipped'],
              ['12k+', 'Teams served'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-text">{n}</div>
                <div className="text-xs text-text/60 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}