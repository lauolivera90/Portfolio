import { Navbar } from '../../widgets/Navbar/index.js'
import { Footer } from '../../widgets/Footer/index.js'

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}