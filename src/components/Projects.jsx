import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Github, ExternalLink, Lock, Brain, Eye, ShoppingBag, Smartphone } from 'lucide-react'

const projects = [
  {
    title: 'Nirvana Health-Chain',
    subtitle: 'Blockchain Anti-Counterfeiting System',
    description:
      'Immutable drug supply chain tracking with complex hashing and tamper-proof verification. HackHeritage 2024 winning project.',
    icon: Lock,
    bg: 'bg-secondary-fixed',
    chipBg: 'bg-brutal-black',
    chipText: 'text-caution-yellow',
    tags: ['Solidity', 'React', 'Ethers.js', 'HardHat', 'IPFS'],
    github: 'https://github.com/AritraDhar567/Nirvana',
    featured: true,
    span: 'md:col-span-2',
  },
  {
    title: "God's Eye AI",
    subtitle: 'Advanced Real-Time Surveillance AI',
    description:
      'AI-powered camera surveillance with deepfake detection, content blurring, and copyright enforcement.',
    icon: Eye,
    bg: 'bg-acid-green',
    chipBg: 'bg-brutal-black',
    chipText: 'text-white',
    tags: ['Python', 'OpenCV', 'Scikit-Learn', 'Flask'],
    github: 'https://godseyeai567.netlify.app/',
    featured: true,
    span: 'md:row-span-2',
  },
  {
    title: 'Meta-Mark AI',
    subtitle: "India's First Legal Metrology Checker",
    description:
      'AI-based compliance checker with real-time analysis and browser extension for e-commerce. National Hackathon Champion.',
    icon: ShoppingBag,
    bg: 'bg-tertiary-fixed',
    chipBg: 'bg-brutal-black',
    chipText: 'text-white',
    tags: ['React', 'Extension API', 'AI', 'Node.js'],
    badge: '🏆 National Champion',
    span: '',
  },
  {
    title: 'Nirvana Smart-App',
    subtitle: 'Consumer Medicine Ordering App',
    description:
      'Mobile app for medicine ordering with authenticity verification. Built for Smart Bengal Hackathon 2025.',
    icon: Smartphone,
    bg: 'bg-primary-container',
    chipBg: 'bg-caution-yellow',
    chipText: 'text-brutal-black',
    tags: ['React Native', 'Node.js', 'UI/UX'],
    github: 'https://github.com/AritraDhar567/app',
    span: '',
  },
  {
    title: 'Saas Landing Page UI',
    subtitle: 'High-Retention Landing Page',
    description:
      'Modern marketing UI for Saas/digital products — designed for maximum engagement.',
    icon: Brain,
    bg: 'bg-caution-yellow',
    chipBg: 'bg-brutal-black',
    chipText: 'text-white',
    tags: ['React', 'TailwindCSS', 'Skeudomorphism'],
    github: 'https://skeudomorphicland.netlify.app/',
    span: '',
  },
]

// Cursor surface tilt
function useTilt(ref) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 22 })
  const springY = useSpring(y, { stiffness: 200, damping: 22 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { x.set(0); y.set(0) }

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt(cardRef)
  const Icon = project.icon

  const isTextWhite = project.bg === 'bg-primary-container' || project.bg === 'bg-acid-green'

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 180, damping: 22 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        boxShadow: '12px 12px 0px 0px #0A0A0F',
        translateX: -4,
        translateY: -4,
      }}
      className={`${project.bg} ${project.span} border-4 border-brutal-black neobrutal-shadow p-6 flex flex-col justify-between relative group cursor-pointer overflow-hidden`}
      data-cursor
    >
      {/* Badge */}
      {project.badge && (
        <div className="absolute top-4 right-4 sticker-badge bg-caution-yellow text-brutal-black z-10">
          {project.badge}
        </div>
      )}

      {/* Icon + links row */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 bg-white border-4 border-brutal-black flex items-center justify-center neobrutal-shadow-sm">
          <Icon size={22} className="text-brutal-black" />
        </div>
        <div className="flex gap-2">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              data-cursor
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-9 h-9 bg-white border-3 border-brutal-black flex items-center justify-center neobrutal-shadow-sm hover:bg-caution-yellow transition-colors"
              onClick={e => e.stopPropagation()}
            >
              <Github size={15} className="text-brutal-black" />
            </motion.a>
          )}
        </div>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h3 className="font-display font-black text-xl text-brutal-black uppercase tracking-tight mb-1 group-hover:underline decoration-4 underline-offset-2">
          {project.title}
        </h3>
        <p className="font-mono text-xs font-bold text-on-surface-variant mb-3 uppercase">
          {project.subtitle}
        </p>
        <p className="font-body-md text-sm text-on-surface leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-5">
        {project.tags.map(tag => (
          <span
            key={tag}
            className={`${project.chipBg} ${project.chipText} font-mono text-xs font-bold px-3 py-1 border-2 border-brutal-black uppercase`}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="py-28 relative bg-surface-container-low border-y-4 border-brutal-black">
      <div className="max-w-7xl mx-auto px-16 max-md:px-4">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant">
            04 / Projects
          </span>
          <span className="h-[4px] w-16 bg-brutal-black" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display font-black text-brutal-black uppercase text-[clamp(48px,7vw,80px)] leading-none tracking-tight mb-16"
        >
          Selected<br />
          <span className="relative inline-block">
            Works
            <span className="absolute bottom-0 left-0 right-0 h-[8px] bg-secondary-container" />
          </span>
        </motion.h2>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
