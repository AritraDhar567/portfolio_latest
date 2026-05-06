import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Lock, Brain, Eye, ShoppingBag, Smartphone } from 'lucide-react'

const projects = [
  {
    title: 'Nirvana Health-Chain',
    subtitle: 'Blockchain Anti-Counterfeiting System',
    description:
      'Immutable drug supply chain tracking with complex hashing and tamper-proof verification. HackHeritage 2024 winning project for Drug Inventory Management.',
    icon: Lock,
    color: '#00d4ff',
    tags: ['Solidity', 'React', 'Ethers.js', 'HardHat', 'IPFS'],
    github: 'https://github.com/AritraDhar567/Nirvana',
    live: null,
    featured: true,
  },
  {
    title: 'God\'s Eye AI System',
    subtitle: 'Advanced Real-Time Surveillance AI',
    description:
      'AI-powered camera surveillance with privacy enhancement, content blurring, deepfake detection, image purity measurement and zero-shot detection for copyright enforcement.',
    icon: Eye,
    color: '#f72585',
    tags: ['Python', 'OpenCV', 'Scikit-Learn', 'Flask', 'CV'],
    github: 'https://godseyeai567.netlify.app/',
    live: null,
    featured: true,
  },
  {
    title: 'Meta-Mark AI',
    subtitle: "India's First Legal Metrology Checker",
    description:
      'AI-based compliance checker with real-time analysis and browser extension support for e-commerce platforms like Flipkart and Amazon. National Hackathon Champion project.',
    icon: ShoppingBag,
    color: '#7c3aed',
    tags: ['React', 'Extension API', 'AI', 'Node.js'],
    github: null,
    live: null,
    featured: true,
    badge: '🏆 National Champion',
  },
  {
    title: 'Nirvana Smart-App',
    subtitle: 'Consumer Medicine Ordering App',
    description:
      'Mobile app for medicine ordering with authenticity verification and efficient payment system. Built for Smart Bengal Hackathon 2025.',
    icon: Smartphone,
    color: '#06d6a0',
    tags: ['React Native', 'Node.js', 'UI/UX'],
    github: 'https://github.com/AritraDhar567/app',
    live: null,
    featured: false,
  },
  {
    title: 'Marketing Website UI',
    subtitle: 'High-Retention Landing Page',
    description:
      'Modern marketing UI for influencers and professionals — designed for maximum engagement and conversion with smooth animations.',
    icon: Brain,
    color: '#ffd60a',
    tags: ['React', 'TailwindCSS', 'Framer Motion'],
    github: 'https://smm-solution-website-by-aritra.netlify.app/',
    live: null,
    featured: false,
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  const Icon = project.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className="relative glass rounded-2xl p-6 border border-white/5 overflow-hidden shine-card group"
      data-cursor
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}10, transparent 70%)` }}
      />
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${project.color}15`, border: `1px solid ${project.color}30` }}
        >
          <Icon size={18} style={{ color: project.color }} />
        </div>
        <div className="flex items-center gap-2">
          {project.badge && (
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/20">
              {project.badge}
            </span>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" data-cursor
              className="text-white/30 hover:text-white transition-colors p-1">
              <Github size={16} />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" data-cursor
              className="text-white/30 hover:text-cyber-cyan transition-colors p-1">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-cyber-cyan transition-colors duration-300">
        {project.title}
      </h3>
      <p className="text-xs font-mono mb-3" style={{ color: project.color }}>{project.subtitle}</p>
      <p className="text-white/50 text-sm leading-relaxed mb-5">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono text-white/40 bg-white/5 border border-white/10">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-cyber-pink/8 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase">04 / Projects</span>
          <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-6xl text-white mb-16"
        >
          What I've <span className="gradient-text">Built</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
