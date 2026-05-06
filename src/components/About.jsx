import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
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
  { value: 4, suffix: '+', label: 'Hackathons Won', icon: Trophy },
  { value: 5, suffix: '+', label: 'Projects Built', icon: Code2 },
  { value: 89, suffix: '%', label: 'CGPA / Score', icon: GraduationCap },
  { value: 10, suffix: '+', label: 'Tech Skills', icon: Code2 },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 top-1/3 w-80 h-80 bg-cyber-purple/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase">01 / About</span>
          <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-5xl md:text-6xl text-white leading-tight mb-8">
              Building the{' '}
              <span className="gradient-text">Future</span>
              <br />one commit at a time.
            </h2>

            <div className="space-y-4 text-white/60 text-base leading-relaxed">
              <p>
                I'm <span className="text-white font-medium">Aritra Dhar</span> — a Frontend & Web3 developer
                from <span className="text-white/80">Kolkata, India</span> pursuing B.Tech in Information
                Technology at Heritage Institute of Technology.
              </p>
              <p>
                I build production-grade applications that bridge the gap between beautiful interfaces and
                powerful blockchain infrastructure. My work spans React/React Native UIs to Solidity smart
                contracts deployed on mainnet.
              </p>
              <p>
                I've competed in and won national-level hackathons including{' '}
                <span className="text-cyber-cyan">Smart India Hackathon 2025</span> as a national champion —
                because I don't just code, I solve real-world problems under pressure.
              </p>
            </div>

            {/* Info chips */}
            <div className="flex flex-wrap gap-3 mt-8">
              {[
                { icon: MapPin, text: 'Kolkata, West Bengal' },
                { icon: GraduationCap, text: 'B.Tech IT — CGPA 8.1' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/10 text-sm text-white/70">
                  <Icon size={13} className="text-cyber-cyan" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(0,212,255,0.4)' }}
                className="glass rounded-2xl p-6 border border-white/5 glow-border relative overflow-hidden shine-card"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyber-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <stat.icon size={20} className="text-cyber-cyan mb-3 opacity-70" />
                <div className="font-display font-bold text-4xl text-white">
                  <CountUp to={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/40 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
