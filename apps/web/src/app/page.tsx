// Force dynamic rendering — framer-motion requires React context unavailable during static export
export const dynamic = 'force-dynamic'

import ClientShell from '@/components/shared/ClientShell'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Education from '@/components/sections/Education'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <ClientShell />

      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
