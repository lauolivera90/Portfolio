import {
  SiClickhouse,
  SiDocker,
  SiGithubactions,
  SiGo,
  SiGraphql,
  SiKubernetes,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiVercel,
} from '@icons-pack/react-simple-icons'
import { Boxes, Cloud, Database, Network } from 'lucide-react'

export const techStack = {
  Frontend: [
    { name: 'React', icon: SiReact, onHero: true },
    { name: 'Next.js', icon: SiNextdotjs, onHero: false },
    { name: 'TypeScript', icon: SiTypescript, onHero: true },
    { name: 'Tailwind CSS', icon: SiTailwindcss, onHero: false },
    { name: 'React Native', icon: SiReact, onHero: false },
  ],
  Backend: [
    { name: 'Node.js', icon: SiNodedotjs, onHero: true },
    { name: 'Go', icon: SiGo, onHero: false },
    { name: 'Python', icon: SiPython, onHero: false },
    { name: 'GraphQL', icon: SiGraphql, onHero: false },
    { name: 'REST', icon: Boxes, onHero: false },
    { name: 'gRPC', icon: Network, onHero: false },
  ],
  Database: [
    { name: 'PostgreSQL', icon: SiPostgresql, onHero: true },
    { name: 'Redis', icon: SiRedis, onHero: false },
    { name: 'ClickHouse', icon: SiClickhouse, onHero: false },
    { name: 'MongoDB', icon: SiMongodb, onHero: false },
    { name: 'PostGIS', icon: Database, onHero: false },
  ],
  Tools: [
    { name: 'Docker', icon: SiDocker, onHero: true },
    { name: 'Kubernetes', icon: SiKubernetes, onHero: false },
    { name: 'Terraform', icon: SiTerraform, onHero: false },
    { name: 'GitHub Actions', icon: SiGithubactions, onHero: false },
    { name: 'AWS', icon: Cloud, onHero: false },
    { name: 'Vercel', icon: SiVercel, onHero: false },
  ],
}