import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

export default function useSmoothScroll() {
  useEffect(() => {
    const isDesktop = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches
    if (!isDesktop) return

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      duration: 1,
      anchors: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])
}
