import { Download } from 'lucide-react'
import { cv, sections, socials } from '../../../shared/data/index.js'
import { ContactForm } from '../../../features/contact-form/index.js'
import { Button, Container } from '../../../shared/ui/index.js'

export function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-text/10">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          {sections.contact.eyebrow}
        </p>
        <h2 className="text-3xl font-bold text-text mb-3">{sections.contact.title}</h2>
        <p className="text-text/60 text-sm mb-12 max-w-md">
          {sections.contact.subtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          <ContactForm />

          <div className="flex flex-col gap-4">
            <div className="bg-text/5 rounded-xl border border-text/10 p-5">
              <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">{sections.contact.directLabel}</p>
              <div className="flex flex-col gap-3">
                {socials.map(({ id, icon: Icon, url, handle }) => (
                  <a
                    key={id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text hover:text-text/80 transition-colors group"
                  >
                    <span className="text-text/60 group-hover:text-text/80 transition-colors">
                      <Icon color="currentColor" />
                    </span>
                    <span className="text-sm">{handle}</span>
                  </a>
                ))}
              </div>
            </div>

            <Button variant="secondary" href={cv.url} icon={<Download />}>
              {cv.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}