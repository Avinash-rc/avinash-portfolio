'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowDown, Download, ChevronRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/data'

// Must be no-SSR: @react-three/fiber uses react-reconciler@0.27 which breaks React 18 SSR
const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false })

const TAGLINES = [
  'Building scalable web experiences',
  'with code & creativity',
  '→ Next.js · Node.js · TypeScript',
]

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
  mail: <Mail size={20} />,
}

function TypingText({ texts }: { texts: string[] }) {
  const [displayed, setDisplayed] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = texts[lineIdx]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      }, 55)
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      }, 30)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setLineIdx((l) => (l + 1) % texts.length)
    }

    return () => clearTimeout(timer)
  }, [charIdx, deleting, lineIdx, texts])

  return (
    <span className="font-mono text-cyan-400">
      {displayed}
      <span className="typing-cursor" />
    </span>
  )
}

export default function Hero() {
  const mousePos = useRef<[number, number]>([0, 0])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mousePos.current = [x, y]
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* 3D Canvas Background */}
      <HeroCanvas mousePos={mousePos} />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-hero-mesh pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        {/* Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-violet-500/30 text-sm text-violet-300 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight leading-none"
        >
          <span className="text-gradient">Avinash</span>
          <br />
          <span className="text-foreground">Ramdas Chavan</span>
        </motion.h1>

        {/* Designation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl md:text-2xl font-semibold text-muted-foreground mb-4"
        >
          <span className="text-violet-400">{'< '}</span>
          Fullstack Developer
          <span className="text-violet-400">{' />'}</span>
        </motion.div>

        {/* Typing tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-base md:text-lg mb-10 h-7 text-muted-foreground"
        >
          <TypingText texts={TAGLINES} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139,92,246,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToProjects}
            id="hero-view-work-btn"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-semibold flex items-center gap-2 justify-center shadow-lg shadow-violet-500/25 transition-shadow"
          >
            View My Work
            <ChevronRight size={18} />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/resume.pdf"
            download
            id="hero-download-resume-btn"
            className="px-8 py-3.5 rounded-xl glass border border-white/10 text-white font-semibold flex items-center gap-2 justify-center hover:border-violet-500/50 transition-all"
          >
            <Download size={18} />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-center gap-4"
        >
          {SOCIAL_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={link.label}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-violet-400 hover:border-violet-500/50 border border-white/10 transition-colors"
            >
              {socialIcons[link.icon]}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-violet-400 transition-colors"
      >
        <span className="text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
