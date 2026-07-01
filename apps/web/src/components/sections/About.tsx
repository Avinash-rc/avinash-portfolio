'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import { OWNER, TECH_ICONS, STRENGTHS } from '@/lib/data'

function AnimatedCounter({ target, label, suffix = '' }: { target: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black text-gradient">
        {isInView ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {target}{suffix}
          </motion.span>
        ) : (
          '0'
        )}
      </div>
      <p className="text-muted-foreground text-sm mt-1">{label}</p>
    </div>
  )
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-violet-400 font-mono text-sm mb-3 tracking-widest uppercase">Get to know me</p>
          <h2 className="section-heading">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          {/* Profile Photo */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500 opacity-30 blur-xl animate-pulse-slow" />
              {/* Rotating border */}
              <div
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4, #8b5cf6)',
                  animation: 'ring 4s linear infinite',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full rounded-full bg-background" />
              </div>
              {/* Photo */}
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-violet-500/30 glow-violet">
                {/* Photo */}
                <Image
                  src="/images/profile-v2.jpg"
                  alt="Avinash Ramdas Chavan"
                  fill
                  sizes="(max-width: 768px) 256px, 256px"
                  className="object-cover object-[center_15%]"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Avinash Ramdas Chavan</h3>
              <p className="text-violet-400 font-mono text-sm">Fullstack Developer</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-base">
              {OWNER.bio}
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              {[
                { icon: <Mail size={15} />, text: OWNER.email, href: `mailto:${OWNER.email}` },
                { icon: <Phone size={15} />, text: OWNER.phone, href: `tel:${OWNER.phone}` },
                { icon: <MapPin size={15} />, text: OWNER.location, href: undefined },
              ].map(({ icon, text, href }) => (
                <div key={text} className="flex items-center gap-3 text-muted-foreground text-sm">
                  <span className="text-violet-400">{icon}</span>
                  {href ? (
                    <a href={href} className="hover:text-violet-400 transition-colors">{text}</a>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mb-20 py-10 px-8 glass rounded-2xl border border-white/5"
        >
          <AnimatedCounter target={2} label="Years Learning" suffix="+" />
          <AnimatedCounter target={4} label="Projects Built" suffix="+" />
          <AnimatedCounter target={3} label="Degrees" />
        </motion.div>

        {/* Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">
            Technologies I work with
          </h3>
          <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-11 gap-4">
            {TECH_ICONS.map((tech, i) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.03 }}
                whileHover={{ scale: 1.2, y: -4 }}
                className="flex flex-col items-center gap-1.5 group cursor-default"
                title={tech.name}
              >
                <div className="w-10 h-10 rounded-xl glass border border-white/5 flex items-center justify-center group-hover:border-violet-500/40 transition-all overflow-hidden relative">
                  <Image
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
                    alt={tech.name}
                    width={24}
                    height={24}
                    className="object-contain"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      const t = e.currentTarget
                      t.style.display = 'none'
                    }}
                    unoptimized
                  />
                </div>
                <span className="text-[10px] text-muted-foreground group-hover:text-violet-400 transition-colors text-center leading-tight">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strengths */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-center text-lg font-semibold text-muted-foreground mb-8">Core Strengths</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STRENGTHS.map((strength, i) => (
              <motion.div
                key={strength.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="p-5 glass rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all group"
              >
                <div className="text-3xl mb-3">{strength.icon}</div>
                <h4 className="font-semibold text-foreground mb-1 group-hover:text-violet-400 transition-colors">
                  {strength.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
