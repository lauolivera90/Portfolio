import { useState } from 'react'
import { Mail, Menu, X } from 'lucide-react'
import { useActiveSection, useNavbarVisibility } from '../../../shared/hook/index.js'
import { profile, nav } from '../../../shared/data/index.js'
import { Button, Container, IconButton } from '../../../shared/ui/index.js'
import { NavbarItem } from './NavbarItem.jsx'

const SECTION_IDS = nav.links.map((link) => link.toLowerCase())

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useActiveSection(SECTION_IDS)
  const { hidden, reveal, unreveal } = useNavbarVisibility({ threshold: 200, menuOpen })

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
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-text text-sm font-bold leading-none">{profile.initials}</span>
          </div>
          <span className="text-text font-semibold text-sm tracking-tight">{profile.name}</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {nav.links.map((link) => (
            <NavbarItem
              key={link}
              label={link}
              href={`#${link.toLowerCase()}`}
              active={activeSection === link.toLowerCase()}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="primary" href={nav.cta.href} icon={<Mail />}>
            {nav.cta.label}
          </Button>
          <IconButton
            variant="ghost"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </IconButton>
        </div>
      </Container>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-text/10 bg-background px-6 py-4 flex flex-col gap-2">
          {nav.links.map((link) => (
            <NavbarItem
              key={link}
              className="w-full flex justify-center"
              label={link}
              href={`#${link.toLowerCase()}`}
              active={activeSection === link.toLowerCase()}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>
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