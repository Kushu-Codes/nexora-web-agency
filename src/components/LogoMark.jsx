import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Icosa() {
  const ref = useRef()
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * 0.35
    ref.current.rotation.y += delta * 0.5
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#22D3EE" wireframe />
    </mesh>
  )
}

export default function LogoMark({ size = 32 }) {
  return (
    <div style={{ width: size, height: size }} className="shrink-0">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1} />
        <Icosa />
      </Canvas>
    </div>
  )
}
