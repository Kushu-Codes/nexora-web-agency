import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function NetworkMesh({ count, isMobile }) {
  const groupRef = useRef()
  const pointsRef = useRef()
  const lineRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  const { positions, linePositions, velocities } = useMemo(() => {
    const rand = seededRandom(42)
    const radius = 4.4
    const positions = new Float32Array(count * 3)
    const velocities = []
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const r = radius * (0.55 + rand() * 0.45)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      velocities.push({
        x: (rand() - 0.5) * 0.15,
        y: (rand() - 0.5) * 0.15,
        z: (rand() - 0.5) * 0.15,
      })
    }
    // preallocate max possible line segment buffer (pairs within threshold)
    const maxSegments = count * 6
    const linePositions = new Float32Array(maxSegments * 2 * 3)
    return { positions, linePositions, velocities }
  }, [count])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // gentle autonomous rotation
    groupRef.current.rotation.y += delta * 0.06
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1

    // mouse parallax (desktop only, static on mobile)
    if (!isMobile) {
      const targetX = mouse.current.y * 0.25
      const targetY = mouse.current.x * 0.35
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02
    }

    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i].x * delta
      arr[i * 3 + 1] += velocities[i].y * delta
      arr[i * 3 + 2] += velocities[i].z * delta

      const len = Math.sqrt(arr[i * 3] ** 2 + arr[i * 3 + 1] ** 2 + arr[i * 3 + 2] ** 2)
      if (len > 5.2 || len < 2.2) {
        velocities[i].x *= -1
        velocities[i].y *= -1
        velocities[i].z *= -1
      }
    }
    posAttr.needsUpdate = true

    // rebuild connecting lines between nearby nodes
    const threshold = isMobile ? 1.6 : 1.9
    const lineArr = lineRef.current.geometry.attributes.position.array
    let idx = 0
    const maxIdx = lineArr.length
    for (let i = 0; i < count && idx < maxIdx - 6; i++) {
      for (let j = i + 1; j < count && idx < maxIdx - 6; j++) {
        const dx = arr[i * 3] - arr[j * 3]
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1]
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < threshold) {
          lineArr[idx++] = arr[i * 3]
          lineArr[idx++] = arr[i * 3 + 1]
          lineArr[idx++] = arr[i * 3 + 2]
          lineArr[idx++] = arr[j * 3]
          lineArr[idx++] = arr[j * 3 + 1]
          lineArr[idx++] = arr[j * 3 + 2]
        }
      }
    }
    lineRef.current.geometry.setDrawRange(0, idx / 3)
    lineRef.current.geometry.attributes.position.needsUpdate = true
  })

  const onPointerMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1
  }

  return (
    <group
      ref={groupRef}
      onPointerMove={!isMobile ? onPointerMove : undefined}
    >
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#22D3EE" size={0.06} sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={linePositions.length / 3} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#7C3AED" transparent opacity={0.25} />
      </lineSegments>
    </group>
  )
}

function Rig({ isMobile }) {
  useFrame((state) => {
    if (isMobile) return
    const x = (state.mouse.x * 0.4)
    const y = (state.mouse.y * 0.4)
    state.camera.position.x += (x - state.camera.position.x) * 0.02
    state.camera.position.y += (y - state.camera.position.y) * 0.02
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroScene({ isMobile, dpr }) {
  const count = isMobile ? 40 : 90

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <fog attach="fog" args={['#05050A', 6, 12]} />
        <ambientLight intensity={0.6} />
        <NetworkMesh count={count} isMobile={isMobile} />
        <Rig isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
