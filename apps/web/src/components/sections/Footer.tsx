'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart, Code2 } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/data'

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={16} />,
  linkedin: <Linkedin size={16} />,
  twitter: <Twitter size={16} />,
  mail: <Mail size={16} />,
}

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative py-10 border-t border-border/50 overflow-hidden">
      {/* Gradient top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 font-bold text-lg"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-sm font-black">
                AC
              </div>
              <span className="text-gradient font-black tracking-tight">Avinash</span>
            </motion.button>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Avinash Ramdas Chavan — Built with{' '}
              <span className="text-violet-400">Next.js</span> &{' '}
              <span className="text-cyan-400">Three.js</span>
            </p>
          </div>

          {/* Tech stack credits */}
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            Made with <Heart size={12} className="text-red-400 animate-pulse" /> and{' '}
            <Code2 size={12} className="text-violet-400" /> in India 🇮🇳
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={link.label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/40 transition-all"
              >
                {socialIcons[link.icon]}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
