import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Menu, X, Zap } from 'lucide-react'

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Achievements', to: 'achievements' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/5 py-3'
          : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={800} className="flex items-center gap-2 group" data-cursor>
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan to-cyber-purple rounded-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={18} className="text-white fill-white" />
            </div>
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-white">Aritra</span>
            <span className="gradient-text">.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={800}
              offset={-80}
              spy
              onSetActive={() => setActiveSection(link.to)}
              data-cursor
              className="relative px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 group"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute inset-0 rounded-lg bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              {activeSection === link.to && (
                <motion.span
                  layoutId="active-nav"
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyber-cyan"
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <a
            href="mailto:aritrodhar.ad@gmail.com"
            data-cursor
            className="relative px-5 py-2 text-sm font-semibold text-cyber-dark bg-cyber-cyan rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-shadow duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white/80 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-cursor
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={800}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href="mailto:aritrodhar.ad@gmail.com"
                className="mt-2 py-3 px-4 text-center text-sm font-semibold text-cyber-dark bg-cyber-cyan rounded-lg"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
