import { Download } from 'lucide-react'
import { useLanguage } from '../../../shared/i18n/index.js'
import { ContactForm } from '../../../features/contact-form/index.js'
import { Button, Card, CardBody, Container, SectionLabel } from '../../../shared/ui/index.js'

export function Contact() {
  const { profile, sections, socials } = useLanguage()

  return (
    <section id="contact" className="py-24 border-t border-text/10">
      <Container>
        <SectionLabel>{sections.contact.eyebrow}</SectionLabel>
        <h2 className="text-2xl md:text-3xl font-semibold text-text mb-3">{sections.contact.title}</h2>
        <p className="text-text/60 text-sm mb-12 max-w-md">
          {sections.contact.subtitle}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          <ContactForm />

          <div className="flex flex-col gap-4">
            <Card variant="surface">
              <CardBody>
                <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">{sections.contact.directLabel}</p>
                <div className="flex flex-col gap-3">
                  {socials.map(({ id, icon: Icon, color, url, handle }) => (
                    <a
                      key={id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-text hover:text-text/80 transition-colors group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-background"
                    >
                      <span className="text-text/60 group-hover:text-text/80 transition-colors">
                        <Icon color={color} />
                      </span>
                      <span className="text-sm">{handle}</span>
                    </a>
                  ))}
                </div>
              </CardBody>
            </Card>

            <Button variant="secondary" href={profile.cv.url} icon={<Download />}>
              {profile.cv.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}