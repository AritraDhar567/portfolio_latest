import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    color: '#00d4ff',
    skills: ['JavaScript', 'Solidity', 'Python', 'Java', 'HTML', 'CSS'],
  },
  {
    category: 'Frontend',
    color: '#7c3aed',
    skills: ['React', 'React Native', 'Next.js', 'TailwindCSS', 'Bootstrap', 'Framer Motion'],
  },
  {
    category: 'Web3 / Backend',
    color: '#f72585',
    skills: ['Ethers.js', 'HardHat', 'IPFS', 'Node.js', 'Flask', 'Smart Contracts'],
  },
  {
    category: 'AI / Tools',
    color: '#06d6a0',
    skills: ['Scikit-Learn', 'OpenCV', 'Geolocation API', 'Git', 'Vite', 'Figma'],
  },
  {
    category: 'Soft Skills',
    color: '#ffd60a',
    skills: ['Public Speaking', 'Team Leadership', 'Video Editing', 'Content Creation', 'Financial Analysis'],
  },
]

function SkillChip({ skill, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -3 }}
      data-cursor
      className="relative px-4 py-2 rounded-full border text-sm font-mono font-medium transition-all duration-300 cursor-default"
      style={{
        borderColor: `${color}30`,
        color: color,
        background: `${color}08`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}80`
        e.currentTarget.style.background = `${color}15`
        e.currentTarget.style.boxShadow = `0 0 20px ${color}30`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}30`
        e.currentTarget.style.background = `${color}08`
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {skill}
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-1/2 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase">02 / Skills</span>
          <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-6xl text-white mb-16"
        >
          Tech <span className="gradient-text">Arsenal</span>
        </motion.h2>

        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1, duration: 0.6 }}
              className="glass rounded-2xl p-6 border border-white/5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: group.color, boxShadow: `0 0 8px ${group.color}` }}
                />
                <span
                  className="font-mono text-xs tracking-widest uppercase font-medium"
                  style={{ color: group.color }}
                >
                  {group.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, si) => (
                  <SkillChip
                    key={skill}
                    skill={skill}
                    color={group.color}
                    delay={gi * 0.05 + si * 0.04}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
