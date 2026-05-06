import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Trophy, Medal, Star, Award } from 'lucide-react'

const achievements = [
  {
    title: 'Smart India National Hackathon 2025',
    position: 'National Champion 🏆',
    team: 'CODE NIRVANA (PS25057)',
    project: 'Meta-Mark AI',
    location: 'IIT Kharagpur',
    icon: Trophy,
    color: '#ffd60a',
    rank: 1,
  },
  {
    title: 'HackHeritage 2024',
    position: '#1 Winning Team 🥇',
    team: 'CODE NIRVANA',
    project: 'Nirvana Health-Chain',
    location: 'Heritage Institute of Technology',
    icon: Trophy,
    color: '#00d4ff',
    rank: 1,
  },
  {
    title: 'Smart Bengal Hackathon 2025',
    position: 'Finalist',
    team: 'CODE NIRVANA',
    project: 'Nirvana Smart-App',
    location: 'RCCIT, Kolkata',
    icon: Medal,
    color: '#7c3aed',
    rank: 3,
  },
  {
    title: 'Smart India Hackathon 2024',
    position: 'Top 6 Teams',
    team: 'CODE NIRVANA',
    project: 'PS 1627',
    location: 'National Level',
    icon: Award,
    color: '#f72585',
    rank: 6,
  },
]

export default function Achievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="achievements" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-0 top-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px]" />
        <div className="absolute right-1/3 bottom-0 w-64 h-64 bg-cyber-cyan/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase">05 / Achievements</span>
          <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-6xl text-white mb-4"
        >
          Hall of <span className="gradient-text">Fame</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/40 text-base mb-16 max-w-xl"
        >
          Competing under pressure, delivering under deadlines. These aren't participation trophies.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, type: 'spring', stiffness: 120 }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${a.color}20` }}
              className="relative glass rounded-2xl p-7 border border-white/5 overflow-hidden group"
            >
              {/* Large background icon */}
              <a.icon
                size={120}
                className="absolute -right-6 -bottom-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                style={{ color: a.color }}
              />

              {/* Glow corner */}
              <div
                className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
                style={{ background: `radial-gradient(circle, ${a.color}, transparent 70%)` }}
              />

              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-1"
                  style={{
                    backgroundColor: `${a.color}15`,
                    border: `1px solid ${a.color}30`,
                    boxShadow: `0 0 20px ${a.color}20`,
                  }}
                >
                  <a.icon size={22} style={{ color: a.color }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white leading-tight">{a.title}</h3>
                  <span
                    className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold font-mono"
                    style={{ backgroundColor: `${a.color}20`, color: a.color }}
                  >
                    {a.position}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <Star size={12} style={{ color: a.color }} />
                  <span>Project: <span className="text-white/70 font-medium">{a.project}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy size={12} style={{ color: a.color }} />
                  <span>Team: <span className="text-white/70 font-medium">{a.team}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Medal size={12} style={{ color: a.color }} />
                  <span>{a.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
