import { Mail } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { IconLinkedin } from '../ui/index.js'

export const profile = {
  name: 'Lautaro B. Olivera',
  initials: 'LBO',
  role: 'Full Stack Developer',
  heroBio:
    'Full-stack developer based in Buenos Aires, Argentina. I build organized, well-documented software — from database design to the interfaces people actually use.',
  aboutBio: [
    "I'm a full-stack developer based in Buenos Aires, Argentina. I got into technology as a kid — I was always curious about how the things around me actually worked, and that curiosity eventually turned into wanting to know how apps and websites were built. It came naturally to me, and that's how I ended up choosing this path.",

    "I recently graduated as a Programming Technician from Universidad Nacional de Hurlingham, and I'm currently continuing my studies in a  B.Sc. in Computer Science at UNAHUR. I work across the full stack — I lean slightly toward backend, designing APIs and structuring databases, but I enjoy frontend just as much.",

    "I care about staying organized: I document my work thoroughly and try to communicate clearly about what I'm doing and what's next. I'm also focused on writing clean code, something I'm still actively working on improving. Outside of code, I go to the gym regularly and try to keep learning something new — whether that's a language, a technology, or anything else that catches my interest.",
  ],
}

export const cv = { label: 'Download CV', url: '/cv.pdf' }

export const socials = [
  { id: 'github', label: 'GitHub', icon: SiGithub, handle: 'github.com/lauolivera90', url: 'https://github.com/lauolivera90' },
  { id: 'linkedin', label: 'LinkedIn', icon: IconLinkedin, handle: 'linkedin.com/in/lautaro-olivera-121480326', url: 'https://linkedin.com/in/lautaro-olivera-121480326' },
  { id: 'email', label: 'Email', icon: Mail, handle: 'lautarobolivera098@gmail.com', url: 'mailto:lautarobolivera098@gmail.com' },
]