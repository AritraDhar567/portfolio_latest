import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, Linkedin, Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react'

const links = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aritrodhar.ad@gmail.com',
    href: 'mailto:aritrodhar.ad@gmail.com',
    color: '#00d4ff',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8420873513',
    href: 'tel:+918420873513',
    color: '#7c3aed',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/aritra',
    href: 'https://github.com/AritraDhar567',
    color: '#f0f0f0',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/aritra',
    href: 'https://www.linkedin.com/in/aritradhar567/',
    color: '#0077b5',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Kolkata, West Bengal, India',
    href: null,
    color: '#f72585',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="font-mono text-xs text-cyber-cyan tracking-[0.2em] uppercase">06 / Contact</span>
          <span className="flex-1 h-px bg-white/10 max-w-[80px]" />
        </motion.div>

        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-20"
        >
          <h2 className="font-display font-bold text-6xl md:text-8xl text-white leading-tight mb-6">
            Let's Build<br />
            <span className="gradient-text">Something Epic</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">
            Open to full-time roles, freelance projects, and hackathon collaborations.
            If you have a vision, I'll bring the code.
          </p>
        </motion.div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <motion.a
            href="mailto:aritrodhar.ad@gmail.com"
            data-cursor
            whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,212,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white font-display font-bold text-xl rounded-2xl"
          >
            <Send size={22} />
            Drop Me a Message
          </motion.a>
        </motion.div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              {link.href ? (
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  data-cursor
                  className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5 group hover:border-white/15 transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${link.color}15`, border: `1px solid ${link.color}30` }}
                  >
                    <link.icon size={16} style={{ color: link.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-white/30 font-mono mb-0.5">{link.label}</div>
                    <div className="text-sm text-white/70 group-hover:text-white transition-colors truncate">{link.value}</div>
                  </div>
                  <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/60 transition-colors ml-auto flex-shrink-0" />
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4 glass rounded-xl border border-white/5">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${link.color}15`, border: `1px solid ${link.color}30` }}
                  >
                    <link.icon size={16} style={{ color: link.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-white/30 font-mono mb-0.5">{link.label}</div>
                    <div className="text-sm text-white/70 truncate">{link.value}</div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-24 pt-8 border-t border-white/5"
        >
          <p className="text-white/20 font-mono text-xs tracking-widest">
            BUILT BY ARITRA DHAR · KOLKATA · 2025
          </p>
        </motion.div>
      </div>
    </section>
  )
}
