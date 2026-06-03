import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-scroll'
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react'

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
    <span className="font-mono text-brutal-black typing-cursor">{displayed}</span>
  )
}

// ── Card Flick Stack ─────────────────────────────────────────────────────────
const stackCards = [
  {
    id: 'frontend',
    label: '01. FRONTEND',
    title: 'React\nMagic',
    icon: '⚡',
    bg: 'bg-white',
    textColor: 'text-brutal-black',
    badgeBg: 'bg-caution-yellow',
    badgeText: 'text-brutal-black',
    initialTransform: 'rotate(-2deg)',
    zIndex: 30,
  },
  {
    id: 'backend',
    label: '02. BACKEND',
    title: 'Node.js\nPower',
    icon: '🔧',
    bg: 'bg-acid-green',
    textColor: 'text-brutal-black',
    badgeBg: 'bg-brutal-black',
    badgeText: 'text-white',
    initialTransform: 'rotate(5deg) translate(20px,-10px)',
    zIndex: 20,
  },
  {
    id: 'design',
    label: '03. DESIGN',
    title: 'UI/UX\nChaos',
    icon: '🎨',
    bg: 'bg-primary-container',
    textColor: 'text-white',
    badgeBg: 'bg-white',
    badgeText: 'text-brutal-black',
    initialTransform: 'rotate(-10deg) translate(-20px,20px)',
    zIndex: 10,
  },
]

function FlickCardStack() {
  const [cards, setCards] = useState(stackCards)
  const [isAnimating, setIsAnimating] = useState(false)

  const flickTopCard = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCards(prev => {
        const [top, ...rest] = prev
        return [...rest, top]
      })
      setIsAnimating(false)
    }, 500)
  }

  return (
    <div
      className="card-stack relative w-72 h-96 flex items-center justify-center cursor-pointer select-none"
      onClick={flickTopCard}
      data-cursor
    >
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => {
          const isTop = i === 0
          const rotations = ['-2deg', '5deg', '-10deg']
          const translates = [
            [0, 0],
            [20, -10],
            [-20, 20],
          ]
          const zIndexes = [30, 20, 10]

          return (
            <motion.div
              key={card.id}
              className={`absolute w-64 h-80 ${card.bg} border-4 border-brutal-black p-6 flex flex-col justify-between`}
              style={{ zIndex: zIndexes[i] }}
              initial={false}
              animate={{
                rotate: parseFloat(rotations[i]),
                x: translates[i][0],
                y: translates[i][1],
                boxShadow: isTop
                  ? '8px 8px 0px 0px #0A0A0F'
                  : '6px 6px 0px 0px #0A0A0F',
              }}
              exit={{
                x: 350,
                y: -200,
                rotate: 45,
                scale: 0.7,
                opacity: 0,
                transition: { duration: 0.45, ease: [0.36, 0, 0.66, -0.56] },
              }}
              whileHover={isTop ? { scale: 1.03, boxShadow: '12px 12px 0px 0px #0A0A0F' } : {}}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
              }}
            >
              {/* Badge */}
              <div className={`sticker-badge ${card.badgeBg} ${card.badgeText} w-fit`}>
                {card.label}
              </div>

              {/* Title */}
              <div className={`font-display text-3xl font-black ${card.textColor} uppercase leading-tight`}>
                {card.title.split('\n').map((line, j) => (
                  <div key={j}>{line}</div>
                ))}
              </div>

              {/* Icon */}
              <div className="text-5xl">{card.icon}</div>

              {isTop && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`absolute bottom-2 right-2 font-mono text-xs ${card.textColor} opacity-60`}
                >
                  CLICK TO FLICK →
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

// ── Marquee Ticker ───────────────────────────────────────────────────────────
const techStack = [
  'REACT', 'NODE.JS', 'SOLIDITY', 'TAILWIND', 'TYPESCRIPT',
  'NEXT.JS', 'FIGMA', 'PYTHON', 'REACT NATIVE', 'WEB3',
  'REACT', 'NODE.JS', 'SOLIDITY', 'TAILWIND', 'TYPESCRIPT',
  'NEXT.JS', 'FIGMA', 'PYTHON', 'REACT NATIVE', 'WEB3',
]

function MarqueeTicker() {
  return (
    <div className="bg-brutal-black border-b-4 border-brutal-black py-4 overflow-hidden flex">
      <div className="animate-marquee flex gap-8 items-center whitespace-nowrap">
        {techStack.map((tech, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display font-black text-acid-green text-2xl uppercase tracking-widest">
              {tech}
            </span>
            <span className="text-white text-xl">★</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Main Hero ────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })

  // Parallax transforms
  const checkerY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const cardsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 22 },
    },
  }

  return (
    <>
      {/* ── Hero Section ── */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[90vh] flex flex-col md:flex-row items-center justify-center pt-20 overflow-hidden bg-caution-yellow border-b-4 border-brutal-black"
      >
        {/* Checker bg with parallax */}
        <motion.div
          className="checker-bg absolute inset-[-100px] pointer-events-none"
          style={{ y: checkerY }}
        />

        {/* Left — text content */}
        <motion.div
          className="flex-1 z-10 flex flex-col gap-6 items-start px-16 max-md:px-4 py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
        >
          {/* Tag badge */}
          <motion.div variants={itemVariants}>
            <div className="sticker-badge bg-brutal-black text-white transform -rotate-2">
              FULL STACK DEVELOPER
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-display font-black text-brutal-black uppercase leading-none text-[clamp(64px,10vw,100px)] tracking-tight"
          >
            ARITRA<br />DHAR
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={itemVariants} className="font-mono text-xl h-7">
            <TypewriterText words={roles} />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-body-md text-body-lg font-bold bg-white p-5 border-4 border-brutal-black neobrutal-shadow max-w-lg text-on-surface"
          >
            Crafting immersive digital experiences at the intersection of{' '}
            <span className="text-primary-container">Web3</span>,{' '}
            <span className="text-secondary-container">AI</span>, and{' '}
            <span className="text-primary-container">React</span>. National Hackathon Champion.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-2">
            <Link to="projects" smooth duration={800} offset={-80} data-cursor>
              <motion.button
                className="brutal-btn bg-secondary-container text-white font-display font-bold px-8 py-4 border-4 border-brutal-black uppercase tracking-wide flex items-center gap-2 text-lg"
              >
                View Work <ArrowRight size={20} />
              </motion.button>
            </Link>

            <a href="/Aritra_DharCV.pdf" download data-cursor>
              <motion.button
                className="brutal-btn bg-white text-brutal-black font-display font-bold px-8 py-4 border-4 border-brutal-black uppercase tracking-wide flex items-center gap-2 text-lg"
              >
                Resume <Download size={20} />
              </motion.button>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex items-center gap-4 mt-2">
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
                whileHover={{ y: -4, x: 2, backgroundColor: '#0A0A0F', color: '#f9f9f9' }}
                whileTap={{ scale: 0.92 }}
                className="p-3 border-4 border-brutal-black bg-white text-brutal-black neobrutal-shadow-sm transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — flick card stack */}
        <motion.div
          className="flex-1 z-10 flex items-center justify-center px-8 py-16"
          style={{ y: cardsY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 180, damping: 22 }}
        >
          <FlickCardStack />
        </motion.div>
      </section>

      {/* ── Marquee Ticker ── */}
      <MarqueeTicker />
    </>
  )
}
