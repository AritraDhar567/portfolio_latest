import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CalendarDays, MapPin } from 'lucide-react'

const experiences = [
  {
    role: 'Extension & Plug-in Designing',
    company: 'Meta-Mark AI',
    duration: 'December 2025',
    location: 'IIT-Kharagpur | Smart India National Hackathon 2025',
    type: 'National Champion 🏆',
    typeBg: 'bg-caution-yellow',
    typeText: 'text-brutal-black',
    accentBg: 'bg-caution-yellow',
    cardBg: 'bg-white',
    description:
      "Developed the full standalone and versatile extension plug-in for real-time use in e-commerce web apps (Amazon, Flipkart). India's first AI-based legal metrology compliance checker.",
    tags: ['React', 'Extension API', 'AI', 'Compliance'],
  },
  {
    role: 'App Development',
    company: 'Nirvana Smart-App',
    duration: 'May 2025',
    location: 'RCCIT — Smart Bengal Hackathon 2025',
    type: 'Finalist',
    typeBg: 'bg-primary-container',
    typeText: 'text-white',
    accentBg: 'bg-primary-container',
    cardBg: 'bg-white',
    description:
      'Created the UI/UX for the Consumers App for the Nirvana project and integrated an ordering system for medicines with real-time tracking and authenticity verification.',
    tags: ['React Native', 'UI/UX', 'Healthcare', 'Mobile'],
  },
  {
    role: 'Frontend & Web3 Development',
    company: 'Nirvana Health-Chain',
    duration: 'September 2024',
    location: 'Heritage Institute of Technology, Kolkata',
    type: '#1 Winner 🥇',
    typeBg: 'bg-secondary-container',
    typeText: 'text-white',
    accentBg: 'bg-secondary-container',
    cardBg: 'bg-white',
    description:
      'Created the Anti-Counterfeiting Supply Chain Tracking System for Drug Inventory Management. Implemented immutable records, complex hashing, and tamper-proof verification on blockchain.',
    tags: ['Solidity', 'Ethers.js', 'React', 'Web3', 'Blockchain'],
  },
]

// Cursor surface tilt
function useTilt(ref) {
  const handleMouseMove = (e) => {
    const el = ref.current
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
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rotate-x', '0deg')
    el.style.setProperty('--rotate-y', '0deg')
  }
  return { onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}

function ExperienceCard({ exp, index }) {
  const cardRef = useRef(null)
  const tilt = useTilt(cardRef)

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: 'spring', stiffness: 180, damping: 22 }}
      className="relative flex gap-6 md:gap-10 pl-12 md:pl-16"
    >
      {/* Timeline node */}
      <div
        className={`absolute left-3 md:left-5 top-7 w-5 h-5 border-4 border-brutal-black ${exp.accentBg} z-10`}
      />

      {/* Card */}
      <div
        ref={cardRef}
        {...tilt}
        className={`flex-1 ${exp.cardBg} border-4 border-brutal-black neobrutal-shadow relative overflow-hidden group`}
      >
        {/* Left accent bar */}
        <div className={`absolute left-0 top-0 bottom-0 w-[6px] ${exp.accentBg}`} />

        <div className="p-7 pl-9">
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h3 className="font-display font-black text-xl text-brutal-black uppercase tracking-tight">
                {exp.role}
              </h3>
              <p className="font-mono text-sm font-bold text-on-surface-variant mt-1">
                {exp.company}
              </p>
            </div>
            <div className={`sticker-badge ${exp.typeBg} ${exp.typeText}`}>
              {exp.type}
            </div>
          </div>

          {/* Description */}
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-5">
            {exp.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-xs font-mono text-on-surface-variant mb-5">
            <span className="flex items-center gap-1">
              <CalendarDays size={12} /> {exp.duration}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {exp.location}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {exp.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono font-bold border-2 border-brutal-black bg-surface text-brutal-black uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="py-28 relative">
      <div className="max-w-7xl mx-auto px-16 max-md:px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant">
            03 / Experience
          </span>
          <span className="h-[4px] w-16 bg-brutal-black" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-brutal-black uppercase text-[clamp(40px,6vw,70px)] leading-none tracking-tight mb-16"
        >
          Battle-Tested<br />
          <span className="relative inline-block">
            Work
            <span className="absolute bottom-0 left-0 right-0 h-[8px] bg-caution-yellow" />
          </span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[22px] md:left-[30px] top-0 bottom-0 w-[4px] bg-brutal-black" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
