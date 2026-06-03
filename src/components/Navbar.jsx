import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Menu, X } from 'lucide-react'

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
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 bg-surface border-b-4 border-brutal-black transition-all duration-300 ${
        scrolled ? 'shadow-brutal' : ''
      }`}
    >
      <div className="flex justify-between items-center w-full px-16 max-md:px-4 h-20">
        {/* Logo */}
        <Link to="hero" smooth duration={800} data-cursor>
          <motion.span
            whileHover={{ x: 2, y: 2 }}
            className="font-display text-2xl font-black text-brutal-black uppercase tracking-tighter cursor-pointer select-none"
          >
            Aritra<span className="text-primary-container">.</span>
          </motion.span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-1 items-center">
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
              className={`relative font-display font-bold text-sm uppercase tracking-wide px-4 py-2 border-2 transition-all duration-150 cursor-pointer select-none ${
                activeSection === link.to
                  ? 'bg-brutal-black text-surface border-brutal-black'
                  : 'text-on-surface border-transparent hover:bg-caution-yellow hover:text-brutal-black hover:border-brutal-black hover:translate-x-[2px] hover:translate-y-[2px]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:aritrodhar.ad@gmail.com"
          data-cursor
          className="hidden md:block"
        >
          <motion.button
            whileHover={{ x: 4, y: 4, boxShadow: '4px 4px 0px 0px #0A0A0F' }}
            whileTap={{ x: 8, y: 8, boxShadow: '0px 0px 0px 0px #0A0A0F' }}
            initial={{ boxShadow: '8px 8px 0px 0px #0A0A0F' }}
            className="bg-primary-container text-white font-display font-bold px-6 py-2 border-4 border-brutal-black uppercase tracking-wide text-sm"
          >
            Hire Me
          </motion.button>
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-brutal-black hover:bg-caution-yellow p-2 border-2 border-brutal-black transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-cursor
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-t-4 border-brutal-black overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    smooth
                    duration={800}
                    offset={-80}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 font-display font-bold uppercase tracking-wide text-on-surface hover:bg-caution-yellow hover:text-brutal-black border-2 border-transparent hover:border-brutal-black transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <a
                href="mailto:aritrodhar.ad@gmail.com"
                className="mt-2 py-3 px-4 text-center font-display font-bold uppercase text-white bg-primary-container border-4 border-brutal-black neobrutal-shadow-sm"
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
