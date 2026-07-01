'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, School, Calendar, Award, BookOpen } from 'lucide-react'
import { EDUCATION } from '@/lib/data'
import type { EducationEntry } from '@portfolio/types'

function EducationCard({ entry, index }: { entry: EducationEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isLeft = entry.side === 'left'

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-4 md:gap-0 mb-12 md:mb-0 ${
        isLeft ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 60 : -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
        className={`w-full md:w-[calc(50%-3rem)] ${isLeft ? 'md:ml-auto md:pl-6' : 'md:mr-auto md:pr-6'}`}
      >
        <div className="p-6 glass rounded-2xl border border-amber-500/20 hover:border-amber-500/40 transition-all group glow-amber hover:scale-[1.02] duration-300">
          {/* Header */}
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500/30 transition-colors">
              {entry.icon === 'graduation' ? (
                <GraduationCap size={20} className="text-amber-400" />
              ) : (
                <School size={20} className="text-amber-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-amber-300 transition-colors">
                {entry.degree}
              </h3>
              {entry.status && (
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400 border border-green-500/30">
                  {entry.status}
                </span>
              )}
            </div>
          </div>

          {/* Institution */}
          <div className="flex items-start gap-2 mb-4">
            <BookOpen size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">{entry.institution}</p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 text-amber-400 text-sm font-medium">
              <Calendar size={13} />
              {entry.period}
            </div>
            {entry.grade && (
              <div className="flex items-center gap-1.5 text-sm">
                <Award size={13} className="text-amber-400" />
                <span className="font-semibold text-amber-300">{entry.grade}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Timeline dot — center on md+ */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-amber-400 bg-background shadow-lg glow-amber z-10"
      />
    </div>
  )
}

export default function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-amber-400 font-mono text-sm mb-3 tracking-widest uppercase">Academic Journey</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-amber mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px timeline-line -translate-x-1/2" />

          {/* Cards with spacing for desktop alignment */}
          <div className="space-y-8 md:space-y-16">
            {EDUCATION.map((entry, i) => (
              <EducationCard key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
