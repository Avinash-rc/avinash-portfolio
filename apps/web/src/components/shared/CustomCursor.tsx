'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    let rafId: number
    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
      // Ring follows with slight lag
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    const handleMouseEnterLink = () => setIsHovering(true)
    const handleMouseLeaveLink = () => setIsHovering(false)

    document.addEventListener('mousemove', handleMouseMove)
    const interactables = document.querySelectorAll('a, button, [role="button"]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnterLink)
      el.addEventListener('mouseleave', handleMouseLeaveLink)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (isTouchDevice) return null

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot transition-transform duration-100 ${isHovering ? 'scale-0' : 'scale-100'}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9999 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring transition-all duration-200 ${isHovering ? 'scale-150 border-violet-400 opacity-100' : ''}`}
        style={{ position: 'fixed', pointerEvents: 'none', zIndex: 9998 }}
      />
    </>
  )
}
