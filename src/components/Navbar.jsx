import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import LogoMark from './LogoMark.jsx'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-void/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4">
        <a href="#top" data-magnetic className="flex items-center gap-2 group">
          <LogoMark size={28} />
          <span className="font-display font-semibold tracking-tight text-lg text-white">
            NEXORA
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-magnetic
                className="text-sm text-mist hover:text-white transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          data-magnetic
          className="hidden md:inline-flex items-center rounded-full bg-white text-void text-sm font-medium px-5 py-2.5 hover:bg-cyan transition-colors duration-300"
        >
          Start Your Project
        </a>

        <button
          data-magnetic
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-white"
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-[1.5px] bg-white transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[1.5px] bg-white transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-[1.5px] bg-white transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-void/95 backdrop-blur-md border-b border-white/5 px-6 py-6 flex flex-col gap-5"
        >
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-white text-lg">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-nexora-gradient text-white text-sm font-medium px-5 py-3"
          >
            Start Your Project
          </a>
        </motion.div>
      )}
    </motion.header>
  )
}
