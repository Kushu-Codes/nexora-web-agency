import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const QUOTES = [
  {
    quote: 'Nexora rebuilt our site in six weeks and our demo-to-close rate doubled. They think like product people, not just designers.',
    name: 'Maya Ferreira',
    role: 'VP Marketing, Aurora Finance',
  },
  {
    quote: 'The 3D work they shipped for our launch felt like nothing else in our category. Zero compromises on performance either.',
    name: 'Dev Patel',
    role: 'Founder, Pulsewave',
  },
  {
    quote: 'Every deliverable came in ahead of schedule and better than the brief. Rare to find a studio that moves this fast at this quality.',
    name: 'Sofia Lund',
    role: 'CEO, Monolith OS',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), 5000)
    return () => clearInterval(id)
  }, [paused])

  const go = (dir) => setIndex((i) => (i + dir + QUOTES.length) % QUOTES.length)

  return (
    <section id="testimonials" className="relative py-28 md:py-36 px-6 md:px-10 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">Client Words</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mt-4">
          Don't take <span className="text-gradient">our word for it.</span>
        </h2>
      </div>

      <div
        className="relative h-72 md:h-56"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: -3, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotate: 3, y: -30 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 flex flex-col justify-between cursor-grab active:cursor-grabbing"
            style={{ boxShadow: '0 30px 80px -30px rgba(124,58,237,0.35)' }}
          >
            <p className="font-display text-xl md:text-2xl text-white leading-snug">
              "{QUOTES[index].quote}"
            </p>
            <div className="flex items-center gap-3 mt-6">
              <div className="h-10 w-10 rounded-full bg-nexora-gradient" />
              <div>
                <p className="text-white text-sm font-medium">{QUOTES[index].name}</p>
                <p className="text-mist text-xs">{QUOTES[index].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* stacked depth cards behind */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/[0.015] translate-y-4 scale-[0.96] -z-10" />
        <div className="absolute inset-0 rounded-2xl border border-white/5 bg-white/[0.01] translate-y-8 scale-[0.92] -z-20" />
      </div>

      <div className="flex items-center justify-center gap-2 mt-8">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-nexora-gradient' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
