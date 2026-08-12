import { useLanguage } from '../../../shared/i18n/index.js'
import { Container, IconButton } from '../../../shared/ui/index.js'

export function Footer() {
  const { profile, sections, socials } = useLanguage()

  return (
    <footer className="border-t border-text/10 bg-text/5">
      <Container className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text/60">© {new Date().getFullYear()} {profile.name} {sections.footer.rights}</p>
        <div className="flex items-center gap-3">
          {socials.map(({ id, label, icon: Icon, color, url }) => (
            <IconButton
              key={id}
              variant="ghost"
              size="md"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
            >
              <Icon color={color} />
            </IconButton>
          ))}
        </div>
      </Container>
    </footer>
  )
}