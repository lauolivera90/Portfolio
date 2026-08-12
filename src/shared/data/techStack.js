import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiVite,
  SiTailwindcss,
  SiBootstrap,
  SiReactrouter,
  SiNodedotjs,
  SiExpress,
  SiElectron,
  SiSequelize,
  SiJsonwebtokens,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiFigma,
  SiEslint,
  SiSwagger,
} from '@icons-pack/react-simple-icons';
import { Mail, Bot, Sparkles, Wrench } from 'lucide-react';

// Nota: OpenCode, Stitch y Electron Forge no tienen ícono en Simple Icons —
// se usan íconos genéricos de lucide-react (Bot, Sparkles, Wrench) como fallback.

// Los nombres de tecnología son universales (no se traducen). Las etiquetas de
// categoría (Frontend/Backend/Database/Tools) viven en `sections` por idioma.
export const techStack = [
  {
    key: 'Frontend',
    items: [
      { name: 'React', icon: SiReact, onHero: true },
      { name: 'TypeScript', icon: SiTypescript, onHero: false },
      { name: 'JavaScript', icon: SiJavascript, onHero: false },
      { name: 'Vite', icon: SiVite, onHero: false },
      { name: 'Tailwind CSS', icon: SiTailwindcss, onHero: false },
      { name: 'Bootstrap', icon: SiBootstrap, onHero: false },
      { name: 'React Router', icon: SiReactrouter, onHero: false },
    ],
  },
  {
    key: 'Backend',
    items: [
      { name: 'Node.js', icon: SiNodedotjs, onHero: true },
      { name: 'Express', icon: SiExpress, onHero: false },
      { name: 'Electron', icon: SiElectron, onHero: false },
      { name: 'Sequelize', icon: SiSequelize, onHero: false },
      { name: 'JWT', icon: SiJsonwebtokens, onHero: false },
      { name: 'Nodemailer', icon: Mail, onHero: false },
    ],
  },
  {
    key: 'Database',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql, onHero: true },
      { name: 'MongoDB', icon: SiMongodb, onHero: true },
    ],
  },
  {
    key: 'Tools',
    items: [
      { name: 'Docker', icon: SiDocker, onHero: true },
      { name: 'GitHub', icon: SiGithub, onHero: false },
      { name: 'Figma', icon: SiFigma, onHero: false },
      { name: 'ESLint', icon: SiEslint, onHero: false },
      { name: 'Swagger UI', icon: SiSwagger, onHero: false },
      { name: 'Electron Forge', icon: Wrench, onHero: false },
      { name: 'OpenCode', icon: Bot, onHero: false },
      { name: 'Stitch', icon: Sparkles, onHero: false },
    ],
  },
];