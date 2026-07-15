import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useDeviceCapability } from './hooks/useDeviceCapability.js'
import CustomCursor from './components/CustomCursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Work from './components/Work.jsx'
import Process from './components/Process.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function Loader() {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[200] bg-void flex items-center justify-center"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="h-px w-40 bg-nexora-gradient origin-left"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute font-display text-sm tracking-[0.4em] uppercase text-white/70 mt-16"
      >
        Nexora
      </motion.span>
    </motion.div>
  )
}

export default function App() {
  const { isTouch, isMobile, dpr } = useDeviceCapability()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="bg-void min-h-screen">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <CustomCursor isTouch={isTouch} />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Hero isMobile={isMobile} dpr={dpr} />
        <Services />
        <Work isTouch={isTouch} />
        <Process />
        <Testimonials />
        <Contact isMobile={isMobile} dpr={dpr} />
      </motion.main>

      <Footer />
    </div>
  )
}
