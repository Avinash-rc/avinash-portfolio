'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  AdaptiveDpr,
  PerformanceMonitor,
} from '@react-three/drei'
import * as THREE from 'three'

// ─── Floating Icosahedron with Mouse Parallax ────────────────
function FloatingMesh({ mousePos }: { mousePos: React.MutableRefObject<[number, number]> }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const innerRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const [mx, my] = mousePos.current

    if (meshRef.current) {
      // Gentle float
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3
      // Mouse parallax
      meshRef.current.rotation.y = t * 0.2 + mx * 0.8
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2 + my * 0.4
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.4
      innerRef.current.rotation.z = t * 0.2
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3
      ringRef.current.rotation.x = Math.sin(t * 0.2) * 0.3
    }
  })

  return (
    <group position={[0, 0, 0]}>
      {/* Outer glowing icosahedron */}
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6d28d9"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner wireframe */}
      <mesh ref={innerRef} scale={1.2}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Torus ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} scale={1.8}>
        <torusGeometry args={[1, 0.03, 16, 60]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

// ─── Particle Field ──────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null!)

  const { positions, colors } = useMemo(() => {
    const count = 1500
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#8b5cf6'),
      new THREE.Color('#06b6d4'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#0891b2'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      const color = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03
      ref.current.rotation.x = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// ─── Scene ────────────────────────────────────────────────────
function Scene({ mousePos }: { mousePos: React.MutableRefObject<[number, number]> }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#8b5cf6" />
      <pointLight position={[-5, -5, 5]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, 5, -5]} intensity={1} color="#a855f7" />
      <FloatingMesh mousePos={mousePos} />
      <ParticleField />
      <AdaptiveDpr pixelated />
      <PerformanceMonitor onDecline={() => {}} />
    </>
  )
}

// ─── Main Export ─────────────────────────────────────────────
export default function HeroCanvas({
  mousePos,
}: {
  mousePos: React.MutableRefObject<[number, number]>
}) {
  return (
    <div className="hero-canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <Scene mousePos={mousePos} />
      </Canvas>
    </div>
  )
}
