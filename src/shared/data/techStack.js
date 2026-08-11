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
import { Mail, Bot } from 'lucide-react';

// Nota: OpenCode y Stitch no tienen ícono en Simple Icons — se usan íconos
// genéricos de lucide-react (Bot, Sparkles) como fallback, igual que hace
// el mock original con Boxes/Network/Database/Cloud para gRPC/REST/etc.

export const techStack = {
  Frontend: [
    { name: 'React', icon: SiReact, onHero: true },
    { name: 'TypeScript', icon: SiTypescript, onHero: false },
    { name: 'JavaScript', icon: SiJavascript, onHero: false },
    { name: 'Vite', icon: SiVite, onHero: false },
    { name: 'Tailwind CSS', icon: SiTailwindcss, onHero: false },
    { name: 'Bootstrap', icon: SiBootstrap, onHero: false },
    { name: 'React Router', icon: SiReactrouter, onHero: false },
  ],
  Backend: [
    { name: 'Node.js', icon: SiNodedotjs, onHero: true },
    { name: 'Express', icon: SiExpress, onHero: false },
    { name: 'Electron', icon: SiElectron, onHero: false },
    { name: 'Sequelize', icon: SiSequelize, onHero: false },
    { name: 'JWT', icon: SiJsonwebtokens, onHero: false },
    { name: 'Nodemailer', icon: Mail, onHero: false },
  ],
  Database: [
    { name: 'PostgreSQL', icon: SiPostgresql, onHero: true },
    { name: 'MongoDB', icon: SiMongodb, onHero: true },
  ],
  Tools: [
    { name: 'Docker', icon: SiDocker, onHero: true },
    { name: 'GitHub', icon: SiGithub, onHero: false },
    { name: 'Figma', icon: SiFigma, onHero: false },
    { name: 'ESLint', icon: SiEslint, onHero: false },
    { name: 'Swagger UI', icon: SiSwagger, onHero: false },
    { name: 'OpenCode', icon: Bot, onHero: false },
  ],
};