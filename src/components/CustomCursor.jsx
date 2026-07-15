import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor({ isTouch }) {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { damping: 25, stiffness: 300, mass: 0.4 })
  const ringY = useSpring(dotY, { damping: 25, stiffness: 300, mass: 0.4 })
  const scale = useSpring(1, { damping: 20, stiffness: 300 })
  const ringRef = useRef(null)

  useEffect(() => {
    if (isTouch) return

    const move = (e) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
    }
    const onEnter = (e) => {
      if (e.target.closest('a, button, [data-magnetic]')) {
        scale.set(2.4)
      }
    }
    const onLeave = (e) => {
      if (e.target.closest('a, button, [data-magnetic]')) {
        scale.set(1)
      }
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [isTouch, dotX, dotY, scale])

  if (isTouch) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan/70 pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%', scale }}
      />
    </>
  )
}
