import { Suspense, lazy, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, ChevronRight } from 'lucide-react'
import { Link } from 'react-scroll'

const Spline = lazy(() => import('@splinetool/react-spline'))

const roles = [
  'Frontend Developer',
  'React Native Dev',
  'Web3 Engineer',
  'UI/UX Craftsman',
  'Hackathon Champion',
]

function TypewriterText({ words }) {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    let timeout

    if (!isDeleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, index, words])

  return (
    <span className="text-cyber-cyan font-mono typing-cursor">{displayed}</span>
  )
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 10,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyber-cyan/30 particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 3}px rgba(0,212,255,0.5)`,
          }}
        />
      ))}
    </div>
  )
}

export default function Hero() {
  const [splineLoaded, setSplineLoaded] = useState(false)

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden grid-bg radial-glow noise-bg">
      <FloatingParticles />

      {/* Spline 3D — right side */}
      <div className="absolute right-0 top-0 w-full md:w-[55%] h-full opacity-80 md:opacity-100">
        <Suspense fallback={null}>
          <Spline
            scene="https://prod.spline.design/5nrCYR85JoGH9DGC/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            style={{ width: '100%', height: '100%' }}
          />
        </Suspense>
        {/* Fade mask so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-dark via-cyber-dark/60 to-transparent md:from-cyber-dark md:via-cyber-dark/40 md:to-transparent" />
      </div>

      {/* Content — left side */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Tag line */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-cyber-cyan" />
            <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase">
              Available for opportunities
            </span>
            <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-ping" />
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-bold leading-[0.95] tracking-tight mb-6"
          >
            <span className="block text-6xl md:text-8xl text-white">Aritra</span>
            <span className="block text-6xl md:text-8xl gradient-text">Dhar</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="font-mono text-xl md:text-2xl mb-4 h-8">
            <TypewriterText words={roles} />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
          >
            Crafting immersive digital experiences at the intersection of{' '}
            <span className="text-white/80">Web3</span>,{' '}
            <span className="text-white/80">AI</span>, and{' '}
            <span className="text-white/80">React</span>. National Hackathon Champion — CODE NIRVANA.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-14">
            <Link to="projects" smooth duration={800} offset={-80} data-cursor>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3 bg-cyber-cyan text-cyber-dark font-semibold rounded-lg text-sm"
              >
                View Projects <ChevronRight size={16} />
              </motion.button>
            </Link>
            <a href="/Aritra_DharCV.pdf" download data-cursor>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-7 py-3 glass border border-white/10 hover:border-cyber-cyan/40 font-semibold rounded-lg text-sm text-white transition-colors duration-300"
              >
                Download CV
              </motion.button>
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-5">
            <span className="text-xs font-mono text-white/30 tracking-widest uppercase">Find me</span>
            <div className="h-px w-6 bg-white/20" />
            {[
              { icon: Github, href: 'https://github.com/AritraDhar567', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/aritradhar567/', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:aritrodhar.ad@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor
                whileHover={{ y: -3, color: '#00d4ff' }}
                className="text-white/40 hover:text-cyber-cyan transition-colors duration-200"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <Link to="about" smooth duration={800} offset={-80} data-cursor>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-white/30 hover:text-cyber-cyan transition-colors cursor-pointer"
          >
            <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}
