import { Mail } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { IconLinkedin } from '../ui/index.js'

export const profile = {
  name: 'Alex Kim',
  initials: 'AK',
  role: 'Full Stack Developer',
  heroBio:
    'I design and build reliable software from database schema to user interface. Eight years shipping products that handle real traffic, real data, and real edge cases.',
  aboutBio: [
    "I'm a fullstack engineer based in San Francisco, focused on building products that scale reliably. My work spans API design, database architecture, and React frontends — I care about the seams between layers as much as the layers themselves.",
    "Over eight years I've worked across early-stage startups and growth-stage SaaS companies, helping teams move fast without accumulating debt they can't repay. I've led migrations, performance tuning efforts, and platform re-architectures while keeping products live.",
    'I communicate clearly with product and design, ship with attention to detail, and treat monitoring and observability as first-class features, not afterthoughts.',
  ],
}

export const cv = { label: 'Download CV', url: '#' }

export const socials = [
  { id: 'github', label: 'GitHub', icon: SiGithub, handle: 'github.com/alexkim', url: '#' },
  { id: 'linkedin', label: 'LinkedIn', icon: IconLinkedin, handle: 'linkedin.com/in/alexkimdev', url: '#' },
  { id: 'email', label: 'Email', icon: Mail, handle: 'alex@alexkim.dev', url: 'mailto:alex@alexkim.dev' },
]