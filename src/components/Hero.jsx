import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import HeroScene from './HeroScene.jsx'

const HEADLINE_LINES = ['We Build Digital', 'Experiences That Move']

function TiltButton() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-40, 40], [12, -12]), { damping: 15, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-60, 60], [-12, 12]), { damping: 15, stiffness: 200 })

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href="#contact"
      data-magnetic
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      className="relative inline-flex items-center gap-2 rounded-full bg-nexora-gradient px-8 py-4 font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.35)]"
    >
      Start Your Project
      <span className="text-lg">→</span>
    </motion.a>
  )
}

export default function Hero({ isMobile, dpr }) {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-nexora-radial">
      <HeroScene isMobile={isMobile} dpr={dpr} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-cyan mb-6 font-medium"
        >
          Nexora Web Agency
        </motion.p>

        <h1 className="font-display font-semibold text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.02] max-w-4xl">
          {HEADLINE_LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.35 + li * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {li === 1 ? <span className="text-gradient">{line}</span> : line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-8 text-lg text-mist max-w-xl"
        >
          Nexora is a design and engineering studio for brands building the future
          of the web — premium websites, motion, and product experiences that feel
          inevitable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.6 }}
          className="mt-10 flex items-center gap-6"
        >
          <TiltButton />
          <a href="#work" data-magnetic className="text-sm text-white/80 hover:text-white underline underline-offset-4 decoration-white/30">
            View our work
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-mist">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-cyan to-transparent"
        />
      </motion.div>
    </section>
  )
}
