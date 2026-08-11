import { Navbar } from '../widgets/Navbar/index.js'
import { Hero } from '../widgets/Hero/index.js'
import { About } from '../widgets/About/index.js'
import { Projects } from '../widgets/Projects/index.js'
import { TechStack } from '../widgets/TechStack/index.js'
import { Timeline } from '../widgets/Timeline/index.js'
import { Contact } from '../widgets/Contact/index.js'
import { Footer } from '../widgets/Footer/index.js'

export function App() {
  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}