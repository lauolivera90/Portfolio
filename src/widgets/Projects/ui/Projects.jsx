import { projects } from '../../../shared/data/projects.js'

const IconExternalLink = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const IconGithub = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

function Tag({ label }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-primary/20 text-text/80 border border-primary/30">
      {label}
    </span>
  )
}

export function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-text/10 bg-text/5">
      <div className="max-w-6xl mx-auto px-6">
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          Projects
        </p>
        <h2 className="text-3xl font-bold text-text mb-3">Selected work</h2>
        <p className="text-text/60 text-sm mb-12 max-w-xl">
          A sample of recent projects — built end to end, from schema design to deployment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-background rounded-xl border border-text/10 p-5 flex flex-col gap-5 hover:border-primary/40 transition-colors group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-base font-semibold text-text leading-snug">{p.title}</h3>
                </div>
                <p className="text-sm text-text/60 leading-relaxed">{p.description}</p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Tag key={s} label={s} />
                ))}
              </div>

              <div className="flex gap-2 pt-1 border-t border-text/10">
                <a
                  href={p.demo}
                  className="inline-flex items-center gap-1.5 bg-primary hover:brightness-110 text-text text-xs font-medium px-3 py-1.5 rounded transition-all"
                >
                  <IconExternalLink />
                  Live demo
                </a>
                <a
                  href={p.repo}
                  className="inline-flex items-center gap-1.5 border border-text/10 hover:border-primary/50 text-text text-xs font-medium px-3 py-1.5 rounded transition-colors"
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