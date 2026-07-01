'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILL_CATEGORIES } from '@/lib/data'

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-violet-400 font-mono text-sm mb-3 tracking-widest uppercase">Tools & Technologies</p>
          <h2 className="section-heading">Skills</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="p-6 glass rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} bg-opacity-20 flex items-center justify-center text-xl`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-foreground group-hover:text-violet-300 transition-colors">
                  {cat.category}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIdx * 0.1 + skillIdx * 0.04 }}
                    whileHover={{ scale: 1.08 }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-default select-none
                      bg-gradient-to-r ${cat.color} bg-opacity-5
                      border-white/5 hover:border-white/20 text-foreground/80 hover:text-foreground
                    `}
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))`,
                    }}
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(6,182,212,0.1))',
            border: '1px solid rgba(139,92,246,0.2)',
          }}
        >
          <p className="text-muted-foreground">
            Always learning ·{' '}
            <span className="text-violet-400 font-medium">Currently exploring</span>
            {' '}advanced TypeScript patterns, Terraform, and AI integrations.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
