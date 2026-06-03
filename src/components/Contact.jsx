import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aritrodhar.ad@gmail.com',
    href: 'mailto:aritrodhar.ad@gmail.com',
    bg: 'bg-caution-yellow',
    text: 'text-brutal-black',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8420873513',
    href: 'tel:+918420873513',
    bg: 'bg-primary-container',
    text: 'text-white',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/AritraDhar567',
    href: 'https://github.com/AritraDhar567',
    bg: 'bg-brutal-black',
    text: 'text-white',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/aritradhar567',
    href: 'https://www.linkedin.com/in/aritradhar567/',
    bg: 'bg-acid-green',
    text: 'text-brutal-black',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kolkata, West Bengal, India',
    href: null,
    bg: 'bg-secondary-container',
    text: 'text-white',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } },
  }

  return (
    <section id="contact" ref={ref} className="relative border-t-4 border-brutal-black">

      {/* ── Pink Banner Block ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, type: 'spring', stiffness: 160 }}
        className="bg-secondary-container border-b-4 border-brutal-black p-16 max-md:p-8 text-center relative overflow-hidden"
      >
        {/* Decorative icons */}
        <motion.span
          animate={{ rotate: [-12, -8, -12] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-8 -left-8 text-[140px] opacity-15 select-none pointer-events-none"
        >
          ✉
        </motion.span>
        <motion.span
          animate={{ rotate: [12, 8, 12] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-8 -right-8 text-[140px] opacity-15 select-none pointer-events-none"
        >
          🚀
        </motion.span>

        <div className="relative z-10">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
            className="font-display font-black text-white uppercase text-[clamp(40px,7vw,90px)] leading-tight tracking-tight mb-10"
          >
            Ready to Break<br />Some Rules?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <a href="mailto:aritrodhar.ad@gmail.com" data-cursor>
              <motion.button
                whileHover={{ x: 4, y: 4, boxShadow: '4px 4px 0px 0px #0A0A0F' }}
                whileTap={{ x: 8, y: 8, boxShadow: '0px 0px 0px 0px #0A0A0F' }}
                initial={{ boxShadow: '8px 8px 0px 0px #0A0A0F' }}
                className="bg-caution-yellow text-brutal-black font-display font-black text-2xl px-10 py-5 border-4 border-brutal-black uppercase tracking-wide flex items-center gap-3 mx-auto"
              >
                <Send size={24} />
                Email Me Directly
              </motion.button>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Contact cards grid ── */}
      <div className="bg-surface py-16 px-16 max-md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="max-w-7xl mx-auto mb-10"
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-on-surface-variant">
            06 / Contact
          </span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 max-w-7xl mx-auto"
        >
          {links.map((link) => {
            const Icon = link.icon
            const inner = (
              <motion.div
                variants={itemVariants}
                whileHover={{ translateX: -3, translateY: -3, boxShadow: '7px 7px 0px 0px #0A0A0F' }}
                className={`${link.bg} ${link.text} border-4 border-brutal-black neobrutal-shadow p-5 flex flex-col gap-3 group`}
                data-cursor
              >
                <div className="flex items-center justify-between">
                  <Icon size={22} />
                  {link.href && <ArrowUpRight size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />}
                </div>
                <div>
                  <div className="font-mono text-xs font-bold uppercase opacity-70 mb-1">{link.label}</div>
                  <div className="font-display font-bold text-sm break-all">{link.value}</div>
                </div>
              </motion.div>
            )

            return link.href ? (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                data-cursor
              >
                {inner}
              </a>
            ) : (
              <div key={link.label}>{inner}</div>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto mt-20 pt-8 border-t-4 border-brutal-black flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="font-display font-black text-3xl text-brutal-black uppercase tracking-tighter">
            Aritra Dhar
          </div>
          <div className="flex gap-6">
            {[
              { label: 'Github', href: 'https://github.com/AritraDhar567' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aritradhar567/' },
              { label: 'Resume', href: '/Aritra_DharCV.pdf' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="font-display font-bold uppercase text-sm text-on-surface hover:bg-caution-yellow hover:text-brutal-black px-3 py-1 border-2 border-transparent hover:border-brutal-black transition-all"
                data-cursor
              >
                {label}
              </a>
            ))}
          </div>
          <div className="font-mono text-xs text-on-surface-variant">
            © 2025 ARITRA DHAR · CODED WITH CHAOS
          </div>
        </motion.footer>
      </div>
    </section>
  )
}
