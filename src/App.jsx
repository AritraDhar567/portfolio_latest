import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'

export default function App() {
  return (
    <div className="relative min-h-screen bg-cyber-dark text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </div>
  )
}