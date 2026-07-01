'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-10"
                style={{
                  width: `${100 + i * 60}px`,
                  height: `${100 + i * 60}px`,
                  left: `${10 + i * 15}%`,
                  top: `${10 + i * 12}%`,
                  background: i % 2 === 0
                    ? 'radial-gradient(circle, #8b5cf6, transparent)'
                    : 'radial-gradient(circle, #06b6d4, transparent)',
                  animation: `floatParticle ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Initials */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="loading-initials relative z-10"
          >
            AC
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="relative z-10 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 via-cyan-500 to-violet-500"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1, transformOrigin: 'left' }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            />
          </motion.div>

          <motion.p
            className="text-muted-foreground text-sm font-mono relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Building experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
