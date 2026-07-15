import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'

function Particles({ count }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = (Math.random() - 0.5) * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.015
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#7C3AED" size={0.035} sizeAttenuation transparent opacity={0.5} />
    </points>
  )
}

export default function ParticleField({ isMobile, dpr }) {
  const count = isMobile ? 60 : 200
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={dpr} gl={{ alpha: true, antialias: true }}>
        <Particles count={count} />
      </Canvas>
    </div>
  )
}
