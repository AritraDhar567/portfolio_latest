import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CalendarDays, MapPin, ExternalLink } from 'lucide-react'

const experiences = [
  {
    role: 'Extension & Plug-in Designing',
    company: 'Meta-Mark AI',
    duration: 'December 2025',
    location: 'IIT-Kharagpur | Smart India National Hackathon 2025, Kolkata',
    type: 'Hackathon — National Champion 🏆',
    color: '#00d4ff',
    description:
      'Developed the full standalone and versatile extension plug-in for real-time use in e-commerce web apps (Amazon, Flipkart). India\'s first AI-based legal metrology compliance checker.',
    tags: ['React', 'Extension', 'AI', 'Compliance'],
  },
  {
    role: 'App Development',
    company: 'Nirvana Smart-App',
    duration: 'May 2025',
    location: 'RCCIT — Smart Bengal Hackathon 2025',
    type: 'Finalist — Smart Bengal Hackathon',
    color: '#7c3aed',
    description:
      'Created the UI/UX for the Consumers App for the Nirvana project and integrated an ordering system for medicines with real-time tracking and authenticity verification.',
    tags: ['React Native', 'UI/UX', 'Healthcare', 'Mobile'],
  },
  {
    role: 'Frontend & Web3 Development',
    company: 'Nirvana Health-Chain',
    duration: 'September 2024',
    location: 'Heritage Institute of Technology, Kolkata',
    type: 'HackHeritage 2024 — #1 Winner 🥇',
    color: '#f72585',
    description:
      'Created the Anti-Counterfeiting Supply Chain Tracking System for Drug Inventory Management. Implemented immutable records, complex hashing, and tamper-proof verification on blockchain.',
    tags: ['Solidity', 'Ethers.js', 'React', 'Web3', 'Blockchain'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-cyber-purple/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase">03 / Experience</span>
          <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-6xl text-white mb-16"
        >
          Battle-tested <span className="gradient-text">Work</span>
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyber-cyan via-cyber-purple to-cyber-pink opacity-30" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="relative flex gap-8 md:gap-12 pl-16 md:pl-20"
              >
                {/* Timeline node */}
                <div
                  className="absolute left-4 md:left-6 top-6 w-4 h-4 rounded-full border-2 z-10"
                  style={{
                    borderColor: exp.color,
                    backgroundColor: '#0a0a0f',
                    boxShadow: `0 0 12px ${exp.color}60`,
                  }}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex-1 glass rounded-2xl p-6 border border-white/5 glow-border relative overflow-hidden shine-card"
                >
                  {/* Accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                    style={{ backgroundColor: exp.color }}
                  />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-xl text-white">{exp.role}</h3>
                      <p className="text-white/70 font-medium mt-1">{exp.company}</p>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-mono font-medium"
                      style={{ backgroundColor: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                    >
                      {exp.type}
                    </span>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-5">{exp.description}</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-white/30 mb-4">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={12} className="text-cyber-cyan" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-cyber-cyan" />
                      {exp.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded text-xs font-mono text-white/50 border border-white/10 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
