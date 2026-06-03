import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { MapPin, GraduationCap, Trophy, Code2 } from 'lucide-react'

function CountUp({ to, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * to))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 4, suffix: '+', label: 'Hackathons Won', icon: Trophy, bg: 'bg-caution-yellow', text: 'text-brutal-black' },
  { value: 5, suffix: '+', label: 'Projects Built', icon: Code2, bg: 'bg-acid-green', text: 'text-brutal-black' },
  { value: 89, suffix: '%', label: 'Academic Score', icon: GraduationCap, bg: 'bg-primary-container', text: 'text-white' },
  { value: 10, suffix: '+', label: 'Tech Skills', icon: Code2, bg: 'bg-secondary-container', text: 'text-white' },
]

// Cursor surface tilt hook
function useTilt(ref) {
  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -8
    const rotY = ((x - cx) / cx) * 8
    el.style.setProperty('--rotate-x', `${rotX}deg`)
    el.style.setProperty('--rotate-y', `${rotY}deg`)
    el.classList.add('interactive-surface')
  }
  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rotate-x', '0deg')
    el.style.setProperty('--rotate-y', '0deg')
  }
  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}

function StatCard({ stat, index }) {
  const ref = useRef(null)
  const tilt = useTilt(ref)
  const Icon = stat.icon

  return (
    <motion.div
      ref={ref}
      {...tilt}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200, damping: 22 }}
      className={`${stat.bg} ${stat.text} border-4 border-brutal-black neobrutal-shadow p-6 relative`}
    >
      <Icon size={20} className="mb-3 opacity-80" />
      <div className="font-display font-black text-5xl leading-none mb-2">
        <CountUp to={stat.value} suffix={stat.suffix} />
      </div>
      <div className="font-mono text-xs font-bold uppercase tracking-wider opacity-80">
        {stat.label}
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageRotate = useTransform(scrollYProgress, [0, 1], [-2, 2])

  const imageRef = useRef(null)
  const imageTilt = useTilt(imageRef)

  return (
    <section id="about" ref={ref} className="py-28 relative">
      <div className="max-w-7xl mx-auto px-16 max-md:px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant">
            01 / About
          </span>
          <span className="h-[4px] w-16 bg-brutal-black" />
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          {/* Image panel — 5 cols, rotated */}
          <motion.div
            ref={imageRef}
            {...imageTilt}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ rotate: imageRotate }}
            className="md:col-span-5 bg-tertiary-container border-4 border-brutal-black neobrutal-shadow relative overflow-hidden min-h-[380px] flex items-center justify-center interactive-surface"
          >
            {/* Placeholder illustration */}
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary-container to-primary-container opacity-80" />
            <div className="relative z-10 text-center p-8">
              <div className="text-9xl mb-4">👨‍💻</div>
              <div className="font-display font-black text-2xl text-white uppercase">
                Aritra Dhar
              </div>
            </div>

            {/* ARITRA.IMG label */}
            <div className="absolute bottom-4 right-4 sticker-badge bg-acid-green text-brutal-black">
              ARITRA.IMG
            </div>
          </motion.div>

          {/* Text content — 7 cols */}
          <div className="md:col-span-7 flex flex-col justify-center gap-6">

            {/* About badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <div className="sticker-badge bg-primary-container text-white transform rotate-[2deg] inline-block text-xl px-6 py-3">
                About The Chaos
              </div>
            </motion.div>

            {/* Text card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 180 }}
              className="bg-white border-4 border-brutal-black neobrutal-shadow p-8 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-4 right-4 text-5xl text-on-surface-variant opacity-20 font-serif leading-none">"</div>

              <p className="font-body-md text-body-lg text-on-surface mb-5 leading-relaxed">
                I'm <span className="font-bold text-brutal-black">Aritra Dhar</span> — a Frontend & Web3 developer
                from <span className="text-primary-container font-bold">Kolkata, India</span> pursuing B.Tech in
                Information Technology at Heritage Institute of Technology.
              </p>
              <p className="font-body-md text-body-md text-on-surface mb-5 leading-relaxed">
                I build production-grade applications bridging beautiful interfaces with
                powerful blockchain infrastructure. My work spans React/React Native UIs to
                Solidity smart contracts deployed on mainnet.
              </p>
              <p className="font-mono text-sm text-on-surface-variant border-l-4 border-secondary-container pl-4">
                "Functionality is mandatory. Personality is necessary."
              </p>
            </motion.div>

            {/* Info chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: MapPin, text: 'Kolkata, West Bengal' },
                { icon: GraduationCap, text: 'B.Tech IT — CGPA 8.1' },
                { icon: Trophy, text: 'SIH 2025 National Champion' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 bg-surface border-2 border-brutal-black text-sm font-mono font-bold text-on-surface neobrutal-shadow-sm"
                >
                  <Icon size={13} className="text-primary-container" />
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-16">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
