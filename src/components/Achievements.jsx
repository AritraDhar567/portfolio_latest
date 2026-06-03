import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Trophy, Medal, Award, Star } from 'lucide-react'

const achievements = [
  {
    title: 'Smart India National Hackathon 2025',
    position: 'National Champion',
    team: 'CODE NIRVANA (PS25057)',
    project: 'Meta-Mark AI',
    location: 'IIT Kharagpur',
    icon: Trophy,
    bg: 'bg-caution-yellow',
    textColor: 'text-brutal-black',
    chipBg: 'bg-brutal-black',
    chipText: 'text-caution-yellow',
    rankLabel: '#1',
    emoji: '🏆',
  },
  {
    title: 'HackHeritage 2024',
    position: '#1 Winning Team',
    team: 'CODE NIRVANA',
    project: 'Nirvana Health-Chain',
    location: 'Heritage Institute of Technology',
    icon: Trophy,
    bg: 'bg-primary-container',
    textColor: 'text-white',
    chipBg: 'bg-caution-yellow',
    chipText: 'text-brutal-black',
    rankLabel: '#1',
    emoji: '🥇',
  },
  {
    title: 'Smart Bengal Hackathon 2025',
    position: 'Finalist',
    team: 'CODE NIRVANA',
    project: 'Nirvana Smart-App',
    location: 'RCCIT, Kolkata',
    icon: Medal,
    bg: 'bg-white',
    textColor: 'text-brutal-black',
    chipBg: 'bg-brutal-black',
    chipText: 'text-white',
    rankLabel: 'TOP',
    emoji: '🥈',
  },
  {
    title: 'Smart India Hackathon 2024',
    position: 'Top 6 Teams',
    team: 'CODE NIRVANA',
    project: 'PS 1627',
    location: 'National Level',
    icon: Award,
    bg: 'bg-acid-green',
    textColor: 'text-brutal-black',
    chipBg: 'bg-brutal-black',
    chipText: 'text-white',
    rankLabel: 'TOP 6',
    emoji: '🏅',
  },
]

function AchievementCard({ a, index }) {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((e.clientY - rect.top - cy) / cy) * -6
    const rotY = ((e.clientX - rect.left - cx) / cx) * 6
    el.style.setProperty('--rotate-x', `${rotX}deg`)
    el.style.setProperty('--rotate-y', `${rotY}deg`)
    el.classList.add('interactive-surface')
  }
  const handleMouseLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rotate-x', '0deg')
    el.style.setProperty('--rotate-y', '0deg')
  }

  const Icon = a.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 180, damping: 22 }}
      whileHover={{ translateX: -4, translateY: -4, boxShadow: '12px 12px 0px 0px #0A0A0F' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${a.bg} ${a.textColor} border-4 border-brutal-black neobrutal-shadow p-7 relative overflow-hidden`}
    >
      {/* Giant rank watermark */}
      <div className="absolute -right-4 -bottom-4 font-display font-black text-[120px] leading-none opacity-10 select-none">
        {a.rankLabel}
      </div>

      {/* Top row: icon + emoji */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="w-14 h-14 bg-white border-4 border-brutal-black flex items-center justify-center neobrutal-shadow-sm">
          <Icon size={26} className="text-brutal-black" />
        </div>
        <span className="text-5xl">{a.emoji}</span>
      </div>

      {/* Title */}
      <div className="relative z-10 mb-4">
        <h3 className="font-display font-black text-xl uppercase leading-tight mb-2">
          {a.title}
        </h3>
        <div className={`sticker-badge ${a.chipBg} ${a.chipText} inline-block`}>
          {a.position}
        </div>
      </div>

      {/* Details */}
      <div className="relative z-10 space-y-2 text-sm font-mono">
        <div className="flex items-center gap-2">
          <Star size={12} />
          <span className="opacity-80">Project:</span>
          <span className="font-bold">{a.project}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy size={12} />
          <span className="opacity-80">Team:</span>
          <span className="font-bold">{a.team}</span>
        </div>
        <div className="flex items-center gap-2">
          <Medal size={12} />
          <span className="font-bold">{a.location}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Achievements() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="achievements" ref={ref} className="py-28 relative">
      <div className="max-w-7xl mx-auto px-16 max-md:px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant">
            05 / Achievements
          </span>
          <span className="h-[4px] w-16 bg-brutal-black" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <h2 className="font-display font-black text-brutal-black uppercase text-[clamp(48px,7vw,80px)] leading-none tracking-tight">
            Hall of
            <br />
            <span className="relative inline-block">
              Fame
              <span className="absolute bottom-0 left-0 right-0 h-[8px] bg-caution-yellow" />
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="font-mono text-sm text-on-surface-variant mb-16 max-w-xl"
        >
          Competing under pressure, delivering under deadlines. These aren't participation trophies.
        </motion.p>

        {/* Achievement cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <AchievementCard key={a.title} a={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
