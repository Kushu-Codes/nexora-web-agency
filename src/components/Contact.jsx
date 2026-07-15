import { motion } from 'framer-motion'
import { useState } from 'react'
import ParticleField from './ParticleField.jsx'

function FloatingInput({ label, type = 'text', name, textarea = false }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const Tag = textarea ? 'textarea' : 'input'
  const active = focused || value.length > 0

  return (
    <div className="relative">
      <Tag
        name={name}
        type={!textarea ? type : undefined}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`peer w-full bg-white/[0.03] border rounded-xl px-4 pt-6 pb-2 text-white outline-none transition-all duration-300 resize-none ${
          focused ? 'border-cyan shadow-[0_0_0_3px_rgba(34,211,238,0.15)]' : 'border-white/10'
        }`}
      />
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none text-mist ${
          active ? 'top-2 text-xs text-cyan' : 'top-1/2 -translate-y-1/2 text-sm'
        }`}
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact({ isMobile, dpr }) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden">
      <ParticleField isMobile={isMobile} dpr={dpr} />
      <div className="absolute inset-0 bg-nexora-radial pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight"
        >
          Let's Build Something <span className="text-gradient">Extraordinary.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 text-mist max-w-lg mx-auto"
        >
          Tell us about your project and we'll get back to you within one business day.
        </motion.p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 max-w-xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5"
      >
        <FloatingInput label="Your Name" name="name" />
        <FloatingInput label="Email Address" name="email" type="email" />
        <div className="sm:col-span-2">
          <FloatingInput label="Company (optional)" name="company" />
        </div>
        <div className="sm:col-span-2">
          <FloatingInput label="Tell us about your project" name="message" textarea />
        </div>
        <div className="sm:col-span-2 flex justify-center mt-2">
          <button
            type="submit"
            data-magnetic
            className="inline-flex items-center gap-2 rounded-full bg-nexora-gradient px-8 py-4 font-medium text-white shadow-[0_0_40px_rgba(124,58,237,0.35)] hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] transition-shadow duration-500"
          >
            {submitted ? 'Message Sent ✓' : 'Send Message'}
          </button>
        </div>
      </motion.form>
    </section>
  )
}
