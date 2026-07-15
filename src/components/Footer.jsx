import { useState } from 'react'
import LogoMark from './LogoMark.jsx'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const SOCIALS = [
  { label: 'X', href: 'https://x.com' },
  { label: 'IG', href: 'https://instagram.com' },
  { label: 'IN', href: 'https://linkedin.com' },
  { label: 'DR', href: 'https://dribbble.com' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="relative border-t border-white/10 px-6 md:px-10 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark size={26} />
            <span className="font-display font-semibold text-white text-lg">NEXORA</span>
          </div>
          <p className="text-sm text-mist mt-4 max-w-xs">
            A design and engineering studio building the future of the web.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-4">Navigate</h4>
          <ul className="flex flex-col gap-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} data-magnetic className="text-sm text-mist hover:text-white transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-4">Connect</h4>
          <ul className="flex flex-col gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" data-magnetic className="text-sm text-mist hover:text-white transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-medium mb-4">Newsletter</h4>
          <p className="text-sm text-mist mb-4">Occasional notes on design, 3D, and the web.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSubscribed(true)
            }}
            className="flex items-center gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="flex-1 min-w-0 bg-white/[0.03] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white outline-none focus:border-cyan transition-colors"
            />
            <button
              type="submit"
              data-magnetic
              className="shrink-0 rounded-full bg-white text-void text-sm font-medium px-4 py-2.5 hover:bg-cyan transition-colors"
            >
              {subscribed ? '✓' : 'Join'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mt-14 pt-8 border-t border-white/5">
        <p className="text-xs text-mist">© {new Date().getFullYear()} Nexora Web Agency. All rights reserved.</p>
        <p className="text-xs text-mist">Built with React, Three.js & Framer Motion.</p>
      </div>
    </footer>
  )
}
