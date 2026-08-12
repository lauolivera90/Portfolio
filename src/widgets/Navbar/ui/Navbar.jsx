import { useState } from 'react'
import { Mail, Menu, X } from 'lucide-react'
import { useActiveSection, useEscapeClose, useNavbarVisibility } from '../../../shared/hook/index.js'
import { profile } from '../../../shared/data/index.js'
import { Button, Container, IconButton } from '../../../shared/ui/index.js'
import { useLanguage } from '../../../shared/i18n/index.js'
import { NavbarItem } from './NavbarItem.jsx'
import { SettingsMenu } from './SettingsMenu.jsx'

export function Navbar() {
  const { nav, sections } = useLanguage()
  const sectionIds = nav.links.map((link) => link.id)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(sectionIds)
  const { hidden, reveal, unreveal } = useNavbarVisibility({ threshold: 200, menuOpen })
  useEscapeClose(menuOpen, () => setMenuOpen(false))

  return (
    <>
      <header
        onMouseEnter={reveal}
        onMouseLeave={unreveal}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-text/10 bg-background/90 backdrop-blur-md transition-transform duration-300 motion-reduce:transition-none ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
      <Container className="py-3 flex items-center justify-between">
        <a
          href="#home"
          className="flex items-center gap-2.5 group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent focus-visible:ring-offset-background"
        >
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-on-primary text-sm font-bold leading-none">{profile.initials}</span>
          </div>
          <span className="text-text font-semibold text-sm tracking-tight">{profile.name}</span>
        </a>

        <nav aria-label={sections.navbar.navPrimary} className="hidden md:flex items-center gap-1">
          {nav.links.map(({ id, label }) => (
            <NavbarItem
              key={id}
              label={label}
              href={`#${id}`}
              active={activeSection === id}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center">
            <SettingsMenu />
          </div>
          <Button variant="primary" href={nav.cta.href} icon={<Mail />}>
            {nav.cta.label}
          </Button>
          <IconButton
            variant="ghost"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={sections.navbar.toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </IconButton>
        </div>
      </Container>

      {menuOpen && (
        <nav aria-label={sections.navbar.mobileNav} id="mobile-menu" className="md:hidden border-t border-text/10 bg-background px-6 py-4 flex flex-col gap-2">
          {nav.links.map(({ id, label }) => (
            <NavbarItem
              key={id}
              className="w-full flex justify-center"
              label={label}
              href={`#${id}`}
              active={activeSection === id}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <div className="mt-3 pt-3 border-t border-text/10 flex flex-col gap-2">
            <SettingsMenu
              variant="row"
              wrapperClassName="w-full"
              onDone={() => setMenuOpen(false)}
            />
          </div>
        </nav>
      )}
      </header>

      {hidden && (
        <div
          className="fixed inset-x-0 top-0 h-4 z-50"
          onMouseEnter={reveal}
          onMouseLeave={unreveal}
        />
      )}
    </>
  )
}