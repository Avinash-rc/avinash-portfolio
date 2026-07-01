'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Code2 } from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import { PROJECTS } from '@/lib/data'

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-cyan-400 font-mono text-sm mb-3 tracking-widest uppercase">What I&apos;ve built</p>
          <h2 className="section-heading">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of projects I&apos;ve built, from AI-powered tools to automation systems.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                scale={1.02}
                transitionSpeed={400}
                gyroscope={false}
                className="h-full"
              >
                <div className="h-full p-6 glass rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col">
                  {/* Project number */}
                  <div className="text-6xl font-black text-white/5 select-none mb-4 leading-none">
                    0{i + 1}
                  </div>

                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                      <Code2 size={22} className="text-cyan-400" />
                    </div>
                    <div className="flex gap-2">
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1, y: -2 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:border-violet-500/50 transition-all"
                        >
                          <Github size={16} />
                        </motion.a>
                      )}
                      {project.demoUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1, y: -2 }}
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Live Demo"
                          className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-500/50 transition-all"
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </div>

        {/* Work Experience Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 p-8 glass rounded-2xl border border-dashed border-violet-500/30 text-center"
        >
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-xl font-bold text-foreground mb-2">Open to Opportunities</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Actively seeking my first professional role as a Fullstack Developer. Let&apos;s build something great together!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/20"
          >
            Get in Touch →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
