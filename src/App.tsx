import { useState } from 'react'

// ── Icons (inline SVG, 24×24) ────────────────────────────────────────────────

const IconGithub = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const IconLinkedin = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconDownload = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const IconExternalLink = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const IconMail = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M2 7l10 7 10-7" />
  </svg>
)

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const IconClose = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// ── Shared components ────────────────────────────────────────────────────────

const Tag = ({ label, variant = 'default' }: { label: string; variant?: 'default' | 'primary' | 'accent' }) => {
  const styles = {
    default: 'bg-[#1c2530] text-[#eff2f4] border border-[#1c2530]',
    primary: 'bg-[#004B87]/20 text-[#5fa8e0] border border-[#004B87]/30',
    accent: 'bg-[#8d6b9b]/15 text-[#c4a8d4] border border-[#8d6b9b]/25',
  }
  return (
    <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md ${styles[variant]}`}>
      {label}
    </span>
  )
}

// ── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['Home', 'Projects', 'About', 'Contact']

const PROJECTS = [
  {
    id: 1,
    title: 'Meridian — Project Management SaaS',
    description:
      'Multi-tenant platform serving 12k+ teams. Real-time collaboration engine, custom billing with Stripe, and a zero-downtime migration pipeline for schema evolution.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Stripe', 'Kubernetes'],
    demo: '#',
    repo: '#',
  },
  {
    id: 2,
    title: 'Cascade — Analytics Pipeline',
    description:
      'Event-streaming pipeline processing 40M+ events per day. Reduced P95 query latency from 4.2 s to 180 ms via columnar redesign and materialized-view strategy.',
    stack: ['Python', 'Kafka', 'ClickHouse', 'Airflow', 'Docker', 'Terraform'],
    demo: '#',
    repo: '#',
  },
]

const TECH = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'React Native'],
  Backend: ['Node.js', 'Go', 'Python', 'GraphQL', 'REST', 'gRPC'],
  Database: ['PostgreSQL', 'Redis', 'ClickHouse', 'MongoDB', 'PostGIS'],
  Tools: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS', 'Vercel'],
}

const TIMELINE = [
  { year: '2016', label: 'B.Sc. Computer Science', note: 'Software Engineering major' },
  { year: '2019', label: 'PostgreSQL Certification', note: 'EDB Certified Associate' },
  { year: '2021', label: 'Meridian launched', note: '12k+ teams onboarded' },
  { year: '2023', label: 'Cascade shipped', note: '40M+ events / day' },
  { year: '2026', label: 'Today', note: 'Open to new projects' },
]

const SKILLS_BIO = [
  'Full Stack', 'System Design', 'API Architecture',
  'Database Optimization', 'CI/CD', 'Team Leadership',
]

// ── Sections ─────────────────────────────────────────────────────────────────

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1c2530] bg-[#07090b]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-[#004B87] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold leading-none">AK</span>
          </div>
          <span className="text-[#eff2f4] font-semibold text-sm tracking-tight">Alex Kim</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#6b7a8d] hover:text-[#eff2f4] text-sm font-medium px-4 py-2 rounded transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center gap-1.5 bg-[#004B87] hover:bg-[#005fa8] text-white text-sm font-medium px-4 py-1.5 rounded transition-colors"
          >
            Hire me
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#6b7a8d] hover:text-[#eff2f4] transition-colors p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#1c2530] bg-[#07090b] px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[#eff2f4] text-sm font-medium py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-2xl">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-[#004B87]/15 border border-[#004B87]/30 text-[#5fa8e0] text-xs font-medium px-3 py-1.5 rounded mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5fa8e0] animate-pulse" />
            Available for new projects
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-[#eff2f4] leading-tight tracking-tight mb-4">
            Alex Kim
          </h1>
          <p className="text-xl md:text-2xl font-medium text-[#5fa8e0] mb-6">
            Full Stack Developer
          </p>
          <p className="text-base text-[#6b7a8d] leading-relaxed max-w-lg mb-10">
            I design and build reliable software from database schema to user interface.
            Eight years shipping products that handle real traffic, real data, and real edge cases.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-[#004B87] hover:bg-[#005fa8] text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
            >
              View projects
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border border-[#1c2530] hover:border-[#004B87]/50 text-[#eff2f4] text-sm font-medium px-5 py-2.5 rounded transition-colors"
            >
              <IconDownload />
              Download CV
            </a>
          </div>

          {/* Stat row */}
          <div className="mt-16 pt-8 border-t border-[#1c2530] flex flex-wrap gap-10">
            {[['8+', 'Years of experience'], ['40+', 'Projects shipped'], ['12k+', 'Teams served']].map(
              ([n, l]) => (
                <div key={l}>
                  <div className="text-2xl font-bold text-[#eff2f4]">{n}</div>
                  <div className="text-xs text-[#6b7a8d] mt-0.5">{l}</div>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="py-24 border-t border-[#1c2530]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>About me</SectionLabel>
        <h2 className="text-3xl font-bold text-[#eff2f4] mb-12">Who I am</h2>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 items-start">
          {/* Photo placeholder */}
          <div className="flex-shrink-0">
            <div className="w-full max-w-[280px] aspect-square rounded-xl bg-[#0d1117] border border-[#1c2530] flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-full bg-[#004B87]/20 border-2 border-[#004B87]/30 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#5fa8e0]">AK</span>
              </div>
              <span className="text-xs text-[#6b7a8d]">Photo placeholder</span>
            </div>
          </div>

          {/* Bio + skills */}
          <div>
            <p className="text-[#6b7a8d] text-base leading-relaxed mb-4">
              I'm a fullstack engineer based in San Francisco, focused on building products that
              scale reliably. My work spans API design, database architecture, and React frontends —
              I care about the seams between layers as much as the layers themselves.
            </p>
            <p className="text-[#6b7a8d] text-base leading-relaxed mb-4">
              Over eight years I've worked across early-stage startups and growth-stage SaaS companies,
              helping teams move fast without accumulating debt they can't repay. I've led migrations,
              performance tuning efforts, and platform re-architectures while keeping products live.
            </p>
            <p className="text-[#6b7a8d] text-base leading-relaxed mb-8">
              I communicate clearly with product and design, ship with attention to detail, and
              treat monitoring and observability as first-class features, not afterthoughts.
            </p>

            <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-4">Areas of expertise</p>
            <div className="flex flex-wrap gap-2">
              {SKILLS_BIO.map((s) => (
                <Tag key={s} label={s} variant="accent" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-[#1c2530] bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Projects</SectionLabel>
        <h2 className="text-3xl font-bold text-[#eff2f4] mb-3">Selected work</h2>
        <p className="text-[#6b7a8d] text-sm mb-12 max-w-xl">
          A sample of recent projects — built end to end, from schema design to deployment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              className="bg-[#07090b] rounded-xl border border-[#1c2530] p-5 flex flex-col gap-5 hover:border-[#004B87]/40 transition-colors group"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-[#eff2f4] leading-snug">{p.title}</h3>
                </div>
                <p className="text-sm text-[#6b7a8d] leading-relaxed">{p.description}</p>
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Tag key={s} label={s} variant="primary" />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t border-[#1c2530]">
                <a
                  href={p.demo}
                  className="inline-flex items-center gap-1.5 bg-[#004B87] hover:bg-[#005fa8] text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
                >
                  <IconExternalLink />
                  Live demo
                </a>
                <a
                  href={p.repo}
                  className="inline-flex items-center gap-1.5 border border-[#1c2530] hover:border-[#004B87]/50 text-[#eff2f4] text-xs font-medium px-3 py-1.5 rounded transition-colors"
                >
                  <IconGithub />
                  Repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TechStack() {
  return (
    <section className="py-24 border-t border-[#1c2530]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Tech stack</SectionLabel>
        <h2 className="text-3xl font-bold text-[#eff2f4] mb-12">Tools I work with</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(TECH).map(([category, items]) => (
            <div key={category} className="bg-[#0d1117] rounded-xl border border-[#1c2530] p-5">
              <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-4">{category}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Timeline() {
  return (
    <section className="py-24 border-t border-[#1c2530] bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Timeline</SectionLabel>
        <h2 className="text-3xl font-bold text-[#eff2f4] mb-16">Career progression</h2>

        {/* Horizontal on desktop, vertical on mobile */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Track */}
            <div className="absolute top-5 left-0 right-0 h-px bg-[#1c2530]" />

            <div className="grid grid-cols-5 gap-4">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  {/* Dot */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 flex-shrink-0 z-10 mb-4 ${
                      i === TIMELINE.length - 1
                        ? 'bg-[#004B87] border-[#004B87] text-white'
                        : 'bg-[#07090b] border-[#1c2530] text-[#6b7a8d]'
                    }`}
                  >
                    <span className="text-xs font-bold">{i + 1}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#8d6b9b] mb-1">{item.year}</p>
                  <p className="text-sm font-medium text-[#eff2f4] leading-snug mb-1">{item.label}</p>
                  <p className="text-xs text-[#6b7a8d] leading-snug">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vertical (mobile) */}
        <div className="md:hidden flex flex-col gap-0">
          {TIMELINE.map((item, i) => (
            <div key={i} className="flex gap-5">
              {/* Left: dot + line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 flex-shrink-0 z-10 ${
                    i === TIMELINE.length - 1
                      ? 'bg-[#004B87] border-[#004B87] text-white'
                      : 'bg-[#07090b] border-[#1c2530] text-[#6b7a8d]'
                  }`}
                >
                  <span className="text-[10px] font-bold">{i + 1}</span>
                </div>
                {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-[#1c2530] my-1" />}
              </div>
              {/* Right: content */}
              <div className="pb-8">
                <p className="text-xs font-semibold text-[#8d6b9b] mb-0.5">{item.year}</p>
                <p className="text-sm font-medium text-[#eff2f4] mb-0.5">{item.label}</p>
                <p className="text-xs text-[#6b7a8d]">{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1000)
  }

  return (
    <section id="contact" className="py-24 border-t border-[#1c2530]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionLabel>Contact</SectionLabel>
        <h2 className="text-3xl font-bold text-[#eff2f4] mb-3">Get in touch</h2>
        <p className="text-[#6b7a8d] text-sm mb-12 max-w-md">
          Open to contract work, fullstack or backend-heavy roles, and infrastructure consulting.
          Response within one business day.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          {/* Form */}
          {status === 'sent' ? (
            <div className="bg-[#004B87]/10 border border-[#004B87]/30 rounded-xl p-8">
              <p className="text-sm font-medium text-[#5fa8e0] mb-1">Message received</p>
              <p className="text-sm text-[#6b7a8d]">I'll be in touch shortly. Thank you.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#6b7a8d] block mb-1.5">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full bg-[#0d1117] border border-[#1c2530] rounded text-[#eff2f4] text-sm px-3 py-2.5 focus:outline-none focus:border-[#004B87] transition-colors placeholder-[#353d45]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#6b7a8d] block mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full bg-[#0d1117] border border-[#1c2530] rounded text-[#eff2f4] text-sm px-3 py-2.5 focus:outline-none focus:border-[#004B87] transition-colors placeholder-[#353d45]"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-[#6b7a8d] block mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the project or role..."
                  className="w-full bg-[#0d1117] border border-[#1c2530] rounded text-[#eff2f4] text-sm px-3 py-2.5 focus:outline-none focus:border-[#004B87] transition-colors placeholder-[#353d45] resize-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 bg-[#004B87] hover:bg-[#005fa8] disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          )}

          {/* Direct contact panel */}
          <div className="flex flex-col gap-4">
            <div className="bg-[#0d1117] rounded-xl border border-[#1c2530] p-5">
              <p className="text-xs font-semibold text-[#6b7a8d] uppercase tracking-wider mb-4">Direct contact</p>
              <div className="flex flex-col gap-3">
                {/* Email */}
                <a
                  href="mailto:alex@alexkim.dev"
                  className="flex items-center gap-3 text-[#eff2f4] hover:text-[#5fa8e0] transition-colors group"
                >
                  <span className="text-[#6b7a8d] group-hover:text-[#5fa8e0] transition-colors">
                    <IconMail />
                  </span>
                  <span className="text-sm">alex@alexkim.dev</span>
                </a>

                {/* LinkedIn */}
                <a
                  href="#"
                  className="flex items-center gap-3 text-[#eff2f4] hover:text-[#5fa8e0] transition-colors group"
                >
                  <span className="text-[#6b7a8d] group-hover:text-[#5fa8e0] transition-colors">
                    <IconLinkedin />
                  </span>
                  <span className="text-sm">linkedin.com/in/alexkimdev</span>
                </a>

                {/* GitHub */}
                <a
                  href="#"
                  className="flex items-center gap-3 text-[#eff2f4] hover:text-[#5fa8e0] transition-colors group"
                >
                  <span className="text-[#6b7a8d] group-hover:text-[#5fa8e0] transition-colors">
                    <IconGithub />
                  </span>
                  <span className="text-sm">github.com/alexkim</span>
                </a>
              </div>
            </div>

            {/* CV download */}
            <a
              href="#"
              className="flex items-center justify-center gap-2 border border-[#1c2530] hover:border-[#004B87]/50 text-[#eff2f4] text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
            >
              <IconDownload />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#1c2530] bg-[#0d1117]">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#6b7a8d]">© 2026 Alex Kim. All rights reserved.</p>
        <div className="flex items-center gap-3">
          {[
            { href: '#', icon: <IconGithub />, label: 'GitHub' },
            { href: '#', icon: <IconLinkedin />, label: 'LinkedIn' },
            { href: 'mailto:alex@alexkim.dev', icon: <IconMail />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-9 h-9 flex items-center justify-center rounded border border-[#1c2530] text-[#6b7a8d] hover:text-[#eff2f4] hover:border-[#004B87]/50 transition-colors"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ── Utility ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-semibold text-[#8d6b9b] uppercase tracking-wider mb-3">
      <span className="w-4 h-px bg-[#8d6b9b]" />
      {children}
    </p>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#07090b] text-[#eff2f4]">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
