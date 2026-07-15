import { useEffect, useState } from 'react'

/**
 * Detects touch/mobile devices so 3D scenes and interactions can scale down.
 * Returns { isTouch, isMobile, dpr } — dpr is a safe device-pixel-ratio cap.
 */
export function useDeviceCapability() {
  const [state, setState] = useState({
    isTouch: false,
    isMobile: false,
    dpr: [1, 2],
  })

  useEffect(() => {
    const isTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches || isTouch

    setState({
      isTouch,
      isMobile,
      dpr: isMobile ? [1, 1.5] : [1, 2],
    })

    if (!isTouch) {
      document.documentElement.classList.add('has-custom-cursor')
    }

    const onResize = () => {
      const nowMobile = window.matchMedia('(max-width: 768px)').matches || isTouch
      setState((s) => ({ ...s, isMobile: nowMobile, dpr: nowMobile ? [1, 1.5] : [1, 2] }))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return state
}
