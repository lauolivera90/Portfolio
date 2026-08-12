import { Check, ChevronDown, Languages, Moon, Settings, Sun } from 'lucide-react'
import { useTheme } from '../../../shared/hook/index.js'
import { useLanguage } from '../../../shared/i18n/index.js'
import { Dropdown, DropdownButton, DropdownMenu, DropdownTrigger, IconButton } from '../../../shared/ui/index.js'

const LANGS = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
]

export function SettingsMenu({ variant = 'icon', triggerClassName = '', wrapperClassName = '', onDone }) {
  const { lang, setLang, sections } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const t = sections.navbar

  const selectLang = (code) => {
    setLang(code)
    onDone?.()
  }

  const trigger =
    variant === 'row' ? (
      <button
        type="button"
        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded border border-text/10 text-text/80 hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${triggerClassName}`}
        aria-label={t.settings}
      >
        <Settings aria-hidden="true" size={18} />
        <span className="flex-1 text-left">{t.settings}</span>
        <ChevronDown aria-hidden="true" size={16} className="text-text/60" />
      </button>
    ) : (
      <IconButton variant="ghost" className={triggerClassName} aria-label={t.settings}>
        <Settings />
      </IconButton>
    )

  return (
    <Dropdown className={wrapperClassName}>
      <DropdownTrigger>{trigger}</DropdownTrigger>
      <DropdownMenu>
        <li role="none">
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-text/50">
            {t.language}
          </p>
        </li>
        {LANGS.map(({ code, label }) => (
          <DropdownButton
            key={code}
            role="menuitemradio"
            aria-checked={lang === code}
            icon={<Languages />}
            onClick={() => selectLang(code)}
          >
            <span className="flex-1 flex items-center justify-between gap-2">
              {label}
              {lang === code && <Check aria-hidden="true" size={14} className="text-primary" />}
            </span>
          </DropdownButton>
        ))}
        <li role="separator" className="my-1 h-px bg-text/10" />
        <DropdownButton
          role="menuitemcheckbox"
          aria-checked={theme === 'light'}
          icon={theme === 'dark' ? <Sun /> : <Moon />}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? t.lightMode : t.darkMode}
        </DropdownButton>
      </DropdownMenu>
    </Dropdown>
  )
}