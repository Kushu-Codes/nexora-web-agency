import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import Icon3D from './Icon3D.jsx'

const STEPS = [
  { label: 'Discover', shape: 'growth', color: '#7C3AED', desc: 'Workshops, audits, and research to define the brief and the metrics that matter.' },
  { label: 'Design', shape: 'design', color: '#22D3EE', desc: 'Concept exploration through to a polished, tested visual system.' },
  { label: 'Develop', shape: 'dev', color: '#FF3DAA', desc: 'Production-grade engineering — fast, accessible, built to scale.' },
  { label: 'Launch', shape: 'motion', color: '#22D3EE', desc: 'QA, deployment, and the handoff — plus support for what comes next.' },
]

export default function Process() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.4'],
  })
  const pathLength = useSpring(scrollYProgress, { damping: 30, stiffness: 90 })

  return (
    <section id="process" ref={containerRef} className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-20">
        <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">How We Work</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mt-4">
          A process built for <span className="text-gradient">momentum.</span>
        </h2>
      </div>

      <div className="relative">
        {/* connecting line — desktop horizontal, mobile vertical */}
        <svg
          className="hidden md:block absolute top-14 left-0 w-full h-2 overflow-visible"
          viewBox="0 0 1000 2"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="1" x2="1000" y2="1" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
          <motion.line
            x1="0" y1="1" x2="1000" y2="1"
            stroke="url(#processGradient)"
            strokeWidth="2"
            style={{ pathLength }}
          />
          <defs>
            <linearGradient id="processGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-start md:items-center md:text-center"
            >
              <div className="h-24 w-24 md:mx-auto">
                <Icon3D shape={step.shape} color={step.color} />
              </div>
              <span className="text-xs text-mist font-medium tracking-wide">Step {String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-display text-xl font-semibold text-white mt-1">{step.label}</h3>
              <p className="mt-2 text-sm text-mist leading-relaxed max-w-[220px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
