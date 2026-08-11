import { useState } from 'react'
import { useActiveSection, useNavbarVisibility } from '../../../shared/hook/index.js'
import { Button, Container, IconButton } from '../../../shared/ui/index.js'
import { NavbarItem } from './NavbarItem.jsx'

const NAV_LINKS = ['Home', 'About', 'Projects', 'Timeline']
const SECTION_IDS = NAV_LINKS.map((link) => link.toLowerCase())

const IconMenu = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const IconClose = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

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
            <span className="text-text text-sm font-bold leading-none">AK</span>
          </div>
          <span className="text-text font-semibold text-sm tracking-tight">Alex Kim</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavbarItem
              key={link}
              label={link}
              href={`#${link.toLowerCase()}`}
              active={activeSection === link.toLowerCase()}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="primary" href="#contact">
            Contactar
          </Button>
          <IconButton
            variant="ghost"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </IconButton>
        </div>
      </Container>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-text/10 bg-background px-6 py-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
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