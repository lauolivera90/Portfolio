import { ChevronDown, Clock, ExternalLink, Play } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { useLanguage } from '../../../shared/i18n/index.js'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '../../../shared/ui/index.js'

function DemoButton({ status, demoType, demoUrl }) {
  const { sections } = useLanguage()
  const t = sections.projects

  if (status === 'in-development') {
    return (
      <Button variant="secondary" className="flex-1" disabled icon={<Clock />}>
        {t.inDevelopment}
      </Button>
    )
  }

  if (demoType === 'video') {
    return (
      <Button
        variant="primary"
        className="flex-1"
        href={demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        icon={<Play />}
      >
        {t.watch}
      </Button>
    )
  }

  return (
    <Button
      variant="primary"
      className="flex-1"
      href={demoUrl}
      target="_blank"
      rel="noopener noreferrer"
      icon={<ExternalLink />}
    >
      {t.liveDemo}
    </Button>
  )
}

function RepoButton({ repoUrl }) {
  const { sections } = useLanguage()
  const t = sections.projects
  const repoLabels = { frontend: t.repoFrontend, backend: t.repoBackend }

  if (!repoUrl?.length) return null

  if (repoUrl.length === 1) {
    return (
      <Button
        variant="secondary"
        href={repoUrl[0].url}
        target="_blank"
        rel="noopener noreferrer"
        icon={<SiGithub color="currentColor" />}
      >
        {t.repo}
      </Button>
    )
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="secondary" icon={<SiGithub color="currentColor" />}>
          <span className="inline-flex items-center gap-1">
            {t.repo}
            <ChevronDown aria-hidden="true" size={16} />
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {repoUrl.map(({ type, url }) => (
          <DropdownItem key={url} href={url} icon={<SiGithub color="currentColor" />}>
            {repoLabels[type] ?? type}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export function ProjectActions({ project }) {
  return (
    <div className="flex gap-3">
      <DemoButton status={project.status} demoType={project.demoType} demoUrl={project.demoUrl} />
      <RepoButton repoUrl={project.repoUrl} />
    </div>
  )
}