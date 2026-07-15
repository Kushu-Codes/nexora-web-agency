import { motion } from 'framer-motion'
import { useState } from 'react'
import Icon3D from './Icon3D.jsx'

const SERVICES = [
  {
    shape: 'design',
    color: '#7C3AED',
    title: 'Web Design',
    desc: 'Interfaces engineered around clarity, hierarchy, and feel — designed to convert as well as impress.',
  },
  {
    shape: 'dev',
    color: '#22D3EE',
    title: 'Web Development',
    desc: 'Performant, scalable builds on modern stacks — from marketing sites to full product platforms.',
  },
  {
    shape: 'brand',
    color: '#FF3DAA',
    title: 'Branding',
    desc: 'Identity systems — mark, type, color, voice — built to hold up across every surface you own.',
  },
  {
    shape: 'motion',
    color: '#22D3EE',
    title: '3D & Motion Design',
    desc: 'Real-time 3D, shader work, and choreographed motion that make an interface feel alive.',
  },
  {
    shape: 'growth',
    color: '#7C3AED',
    title: 'SEO & Growth',
    desc: 'Technical SEO, content architecture, and analytics that turn traffic into pipeline.',
  },
]

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
}
const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

function ServiceCard({ service }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={item}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 overflow-hidden"
      style={{
        boxShadow: hovered ? `0 20px 60px -20px ${service.color}55` : 'none',
      }}
    >
      <div className="h-28 w-28">
        <Icon3D shape={service.shape} color={service.color} hovered={hovered} />
      </div>
      <h3 className="font-display text-xl font-semibold text-white mt-2">{service.title}</h3>
      <p className="mt-3 text-sm text-mist leading-relaxed">{service.desc}</p>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ border: `1px solid ${service.color}66` }}
      />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-16">
        <span className="text-xs tracking-[0.3em] uppercase text-cyan font-medium">What We Do</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-white mt-4">
          Full-stack craft, <span className="text-gradient">one studio.</span>
        </h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {SERVICES.map((s) => (
          <ServiceCard key={s.title} service={s} />
        ))}
      </motion.div>
    </section>
  )
}
