import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'

const PROJECTS = [
  {
    name: 'Aurora Finance',
    category: 'Fintech · Web Platform',
    gradient: 'from-violet to-cyan',
    summary:
      'A full rebuild of a fintech dashboard — real-time data visualization, a new design system, and a 40% drop in support tickets after launch.',
  },
  {
    name: 'Halcyon Studio',
    category: 'Branding · Site',
    gradient: 'from-hot to-violet',
    summary:
      'Identity and site for an independent film studio: a kinetic type system, a custom video player, and a festival-ready press kit.',
  },
  {
    name: 'Verdant Labs',
    category: 'E-commerce',
    gradient: 'from-cyan to-violet',
    summary:
      'A headless commerce build for a sustainable goods brand, with 3D product configurators and sub-second page loads.',
  },
  {
    name: 'Monolith OS',
    category: 'Product · SaaS',
    gradient: 'from-violet to-hot',
    summary:
      'Marketing site and onboarding flow for a developer-tools startup — shipped in six weeks alongside their Series A.',
  },
  {
    name: 'Pulsewave',
    category: '3D · Motion',
    gradient: 'from-cyan to-hot',
    summary:
      'An audio-reactive WebGL experience for an electronic label\u2019s album launch, built with custom shaders and spatial audio.',
  },
]

function TiltCard({ project, onOpen, isTouch }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-100, 100], [8, -8]), { damping: 20, stiffness: 200 })
  const rotateY = useSpring(useTransform(x, [-150, 150], [-10, 10]), { damping: 20, stiffness: 200 })

  const handleMove = (e) => {
    if (isTouch) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }
  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      onClick={() => onOpen(project)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      data-magnetic
      className="group relative shrink-0 w-[78vw] sm:w-[380px] aspect-[4/5] rounded-2xl overflow-hidden snap-center text-left"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500`} />
      <div className="absolute inset-0 bg-ink border border-white/10 rounded-2xl" />
      <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br ${project.gradient} opacity-30 blur-3xl group-hover:opacity-50 transition-opacity duration-500`} />

      <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-xs uppercase tracking-[0.2em] text-cyan mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {project.category}
        </span>
        <h3 className="font-display text-2xl font-semibold text-white">{project.name}</h3>
      </div>
    </motion.button>
  )
}

export default function Work({ isTouch }) {
  const [active, setActive] = useState(null)

  return (
    <section id="work" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12 flex items-end justify-between flex-wrap gap-6">
        <div className="max-w-2xl">
          <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">Selected Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mt-4">
            Built to <span className="text-gradient">outperform.</span>
          </h2>
        </div>
        <p className="text-sm text-mist max-w-xs">Drag or scroll to explore. Tap a project for details.</p>
      </div>

      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pb-6 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROJECTS.map((p) => (
          <TiltCard key={p.name} project={p} onOpen={setActive} isTouch={isTouch} />
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-void/80 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ type: 'spring', damping: 24, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full rounded-2xl bg-ink border border-white/10 p-8 overflow-hidden"
            >
              <div className={`absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-br ${active.gradient} opacity-25 blur-3xl`} />
              <button
                onClick={() => setActive(null)}
                className="absolute top-5 right-5 text-mist hover:text-white text-sm"
                aria-label="Close"
              >
                Close ✕
              </button>
              <span className="text-xs uppercase tracking-[0.2em] text-cyan">{active.category}</span>
              <h3 className="font-display text-3xl font-semibold text-white mt-3">{active.name}</h3>
              <p className="mt-4 text-mist leading-relaxed">{active.summary}</p>
              <a href="#contact" data-magnetic className="mt-6 inline-flex items-center gap-2 text-sm text-white underline underline-offset-4 decoration-cyan">
                Start a similar project →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
