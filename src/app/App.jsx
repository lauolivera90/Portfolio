import { MainLayout } from './layouts/index.js'
import { LanguageProvider } from '../shared/i18n/index.js'
import { Hero } from '../widgets/Hero/index.js'
import { About } from '../widgets/About/index.js'
import { Projects } from '../widgets/Projects/index.js'
import { TechStack } from '../widgets/TechStack/index.js'
import { Timeline } from '../widgets/Timeline/index.js'
import { Contact } from '../widgets/Contact/index.js'

export function App() {
  return (
    <LanguageProvider>
      <MainLayout>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Timeline />
        <Contact />
      </MainLayout>
    </LanguageProvider>
  )
}