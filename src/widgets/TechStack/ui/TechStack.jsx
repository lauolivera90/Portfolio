import {
  Atom,
  Boxes,
  Braces,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers,
  Server,
  Terminal,
  Zap,
} from 'lucide-react'
import { techStack } from '../../../shared/data/techStack.js'
import { Card, CardBody, Container } from '../../../shared/ui/index.js'

const MOCK_ICONS = [
  Atom,
  Braces,
  Server,
  Database,
  Cloud,
  Code2,
  GitBranch,
  Boxes,
  Terminal,
  Zap,
  Globe,
  Layers,
]

function TechRow({ icon: Icon, name }) {
  return (
    <li className="flex items-center gap-3">
      <span className="text-text/60" aria-hidden="true">
        <Icon size={20} />
      </span>
      <span className="text-sm text-text/60">{name}</span>
    </li>
  )
}

export function TechStack() {
  return (
    <section className="py-24 border-t border-text/10">
      <Container>
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
          <span className="w-4 h-px bg-accent" />
          Tech stack
        </p>
        <h2 className="text-3xl font-bold text-text mb-12">Tools I work with</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(techStack).map(([category, items]) => (
            <Card key={category} variant="surface" className="h-full">
              <CardBody>
                <p className="text-xs font-semibold text-text/60 uppercase tracking-wider mb-4">
                  {category}
                </p>
                <ul className="flex flex-col gap-2">
                  {items.map((item, i) => (
                    <TechRow key={item} icon={MOCK_ICONS[i % MOCK_ICONS.length]} name={item} />
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}