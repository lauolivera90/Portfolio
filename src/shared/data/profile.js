import { SiGithub, SiGmail } from '@icons-pack/react-simple-icons'
import { IconLinkedin } from '../ui/index.js'

export const profile = {
  name: 'Lautaro B. Olivera',
  en: {
    role: 'Full Stack Developer',
    heroBio:
      'Full-stack developer based in Buenos Aires, Argentina. I build organized, well-documented software — from database design to the interfaces people actually use.',
    aboutBio: [
      "I'm a full-stack developer based in Buenos Aires, Argentina. I got into technology as a kid — I was always curious about how the things around me actually worked, and that curiosity eventually turned into wanting to know how apps and websites were built. It came naturally to me, and that's how I ended up choosing this path.",

      "I recently graduated as a Programming Technician from Universidad Nacional de Hurlingham, and I'm currently continuing my studies in a  B.Sc. in Computer Science at UNAHUR. I work across the full stack — I lean slightly toward backend, designing APIs and structuring databases, but I enjoy frontend just as much.",

      "I care about staying organized: I document my work thoroughly and try to communicate clearly about what I'm doing and what's next. I'm also focused on writing clean code, something I'm still actively working on improving. Outside of code, I go to the gym regularly and try to keep learning something new — whether that's a language, a technology, or anything else that catches my interest.",
    ],
    cv: { label: 'Download CV', url: '/CV_Lautaro_Olivera_EN.pdf' },
  },
  es: {
    role: 'Desarrollador Full Stack',
    heroBio:
      'Desarrollador full stack con base en Buenos Aires, Argentina. Construyo software ordenado y bien documentado — desde el diseño de la base de datos hasta las interfaces que las personas realmente usan.',
    aboutBio: [
      'Soy desarrollador full stack con base en Buenos Aires, Argentina. Me acerqué a la tecnología de chico — siempre fui curioso por cómo funcionaban realmente las cosas que me rodeaban, y esa curiosidad se terminó convirtiendo en ganas de saber cómo se construían las apps y los sitios web. Me resultó natural, y así fue como elegí este camino.',

      'Recientemente me gradué como Técnico en Programación en la Universidad Nacional de Hurlingham, y actualmente sigo mis estudios en la Licenciatura en Ciencias de la Computación en UNAHUR. Trabajo en todo el stack — me inclino un poco hacia el backend, diseñando APIs y estructurando bases de datos, pero el frontend me gusta igual.',

      'Me importa mantener el orden: documento bien mi trabajo e intento comunicar con claridad qué estoy haciendo y qué sigue. También estoy enfocado en escribir código limpio, algo en lo que sigo trabajando para mejorar. Fuera del código, voy al gimnasio con regularidad e intento seguir aprendiendo algo nuevo — ya sea un idioma, una tecnología o cualquier otra cosa que despierte mi interés.',
    ],
    cv: { label: 'Descargar CV', url: '/CV_Lautaro_Olivera.pdf' },
  },
}

export const socials = [
  // GitHub usa currentColor: su marca oficial (#181717) es negra y no se ve en el tema oscuro.
  { id: 'github', label: 'GitHub', icon: SiGithub, color: 'currentColor', handle: 'github.com/lauolivera90', url: 'https://github.com/lauolivera90' },
  { id: 'linkedin', label: 'LinkedIn', icon: IconLinkedin, color: '#0A66C2', handle: 'linkedin.com/in/lautaro-olivera-121480326', url: 'https://linkedin.com/in/lautaro-olivera-121480326' },
  { id: 'email', label: 'Email', icon: SiGmail, color: '#EA4335', handle: 'lautarobolivera098@gmail.com', url: 'mailto:lautarobolivera098@gmail.com' },
]