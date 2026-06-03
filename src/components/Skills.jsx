import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillGroups = [
  {
    category: 'Languages',
    chipBg: 'bg-brutal-black',
    chipText: 'text-white',
    headerBg: 'bg-caution-yellow',
    skills: ['JavaScript', 'Solidity', 'Python', 'Java', 'HTML', 'CSS'],
  },
  {
    category: 'Frontend',
    chipBg: 'bg-primary-container',
    chipText: 'text-white',
    headerBg: 'bg-acid-green',
    skills: ['React', 'React Native', 'Next.js', 'TailwindCSS', 'Bootstrap', 'Framer Motion'],
  },
  {
    category: 'Web3 / Backend',
    chipBg: 'bg-secondary-container',
    chipText: 'text-white',
    headerBg: 'bg-tertiary-fixed',
    skills: ['Ethers.js', 'HardHat', 'IPFS', 'Node.js', 'Flask', 'Smart Contracts'],
  },
  {
    category: 'AI / Tools',
    chipBg: 'bg-white',
    chipText: 'text-brutal-black',
    headerBg: 'bg-secondary-fixed',
    skills: ['Scikit-Learn', 'OpenCV', 'Geolocation API', 'Git', 'Vite', 'Figma'],
  },
  {
    category: 'Soft Skills',
    chipBg: 'bg-brutal-black',
    chipText: 'text-caution-yellow',
    headerBg: 'bg-primary-container',
    skills: ['Public Speaking', 'Team Leadership', 'Video Editing', 'Content Creation', 'Financial Analysis'],
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

function SkillCard({ group, groupIndex }) {
  const cardRef = useRef(null)
  const tilt = useTilt(cardRef)

  return (
    <motion.div
      ref={cardRef}
      {...tilt}
      initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: groupIndex * 0.1, type: 'spring', stiffness: 180, damping: 20 }}
      className="bg-white border-4 border-brutal-black neobrutal-shadow relative overflow-hidden"
    >
      {/* Category header strip */}
      <div className={`${group.headerBg} border-b-4 border-brutal-black px-6 py-3 flex items-center justify-between`}>
        <span className="font-mono font-black text-sm uppercase tracking-widest text-brutal-black">
          {group.category}
        </span>
        <span className="font-mono text-xs text-brutal-black opacity-60">
          {group.skills.length} skills
        </span>
      </div>

      {/* Chips */}
      <div className="p-6 flex flex-wrap gap-3">
        {group.skills.map((skill, si) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              delay: groupIndex * 0.05 + si * 0.04,
              type: 'spring',
              stiffness: 300,
              damping: 22,
            }}
            whileHover={{
              y: -4,
              x: 2,
              boxShadow: '4px 4px 0px 0px #0A0A0F',
            }}
            data-cursor
            className={`${group.chipBg} ${group.chipText} font-mono text-xs font-bold px-4 py-2 border-2 border-brutal-black cursor-default uppercase tracking-wide transition-all`}
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="py-28 relative bg-surface-container-low border-y-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-16 max-md:px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant">
            02 / Skills
          </span>
          <span className="h-[4px] w-16 bg-brutal-black" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-display font-black text-brutal-black uppercase text-[clamp(48px,7vw,80px)] leading-none tracking-tight">
            Tech<br />
            <span className="relative inline-block">
              Arsenal
              <span className="absolute bottom-0 left-0 right-0 h-[8px] bg-secondary-container" />
            </span>
          </h2>
        </motion.div>

        {/* Skill cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => (
            <SkillCard key={group.category} group={group} groupIndex={gi} />
          ))}
        </div>
      </div>
    </section>
  )
}
