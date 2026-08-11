import { profile, sections, socials } from '../../../shared/data/index.js'
import { Container, IconButton } from '../../../shared/ui/index.js'

export function Footer() {
  return (
    <footer className="border-t border-text/10 bg-text/5">
      <Container className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text/60">© 2026 {profile.name} {sections.footer.rights}</p>
        <div className="flex items-center gap-3">
          {socials.map(({ id, label, icon: Icon, url }) => (
            <IconButton key={id} variant="secondary" size="md" href={url} aria-label={label}>
              <Icon color="currentColor" />
            </IconButton>
          ))}
        </div>
      </Container>
    </footer>
  )
}