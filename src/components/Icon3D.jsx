import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

const SHAPES = {
  design: (color) => (
    <mesh>
      <torusKnotGeometry args={[0.55, 0.16, 100, 16]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.6} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  ),
  dev: (color) => (
    <mesh rotation={[0.4, 0.4, 0]}>
      <octahedronGeometry args={[0.75, 0]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  ),
  brand: (color) => (
    <mesh>
      <dodecahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.5} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  ),
  motion: (color) => (
    <group>
      <mesh>
        <torusGeometry args={[0.55, 0.12, 16, 48]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} emissive={color} emissiveIntensity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.55, 0.05, 16, 48]} />
        <meshStandardMaterial color="#FF3DAA" roughness={0.2} metalness={0.7} emissive="#FF3DAA" emissiveIntensity={0.2} />
      </mesh>
    </group>
  ),
  growth: (color) => (
    <mesh>
      <coneGeometry args={[0.5, 1, 4]} />
      <meshStandardMaterial color={color} roughness={0.25} metalness={0.6} emissive={color} emissiveIntensity={0.15} />
    </mesh>
  ),
}

function Shape({ shape, color, hovered }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * (hovered ? 1.4 : 0.3)
    ref.current.rotation.x += delta * (hovered ? 0.6 : 0.12)
    const targetY = hovered ? 0.15 : 0
    ref.current.position.y += (targetY - ref.current.position.y) * 0.1
  })
  return <group ref={ref}>{SHAPES[shape](color)}</group>
}

export default function Icon3D({ shape = 'design', color = '#7C3AED', hovered = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.6], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 2, 3]} intensity={1.2} color="#22D3EE" />
      <pointLight position={[-2, -1, 2]} intensity={0.6} color="#7C3AED" />
      <Shape shape={shape} color={color} hovered={hovered} />
    </Canvas>
  )
}
