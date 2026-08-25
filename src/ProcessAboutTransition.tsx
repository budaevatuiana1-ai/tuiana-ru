import { useEffect, useRef, type ReactNode } from 'react'
import './ProcessAboutTransition.css'

interface Props {
  process: ReactNode
  about: ReactNode
}

export default function ProcessAboutTransition({ process, about }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const scrollEl = scrollRef.current
    const depthEl = depthRef.current
    const aboutEl = aboutRef.current
    if (!scrollEl || !depthEl || !aboutEl) return

    let smoothScroll = 0
    let targetScroll = 0
    let raf = 0
    let running = false

    const transitionDistance = window.innerHeight * 1.4

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
    }

    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v))
    }

    function remapBlur(p: number) {
      if (p < 0.08) return 0
      if (p > 0.55) return 1
      return (p - 0.08) / (0.55 - 0.08)
    }

    function smoothstep(edge0: number, edge1: number, x: number) {
      const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
      return t * t * (3 - 2 * t)
    }

    function apply() {
      if (!depthEl || !aboutEl) return

      const progress = clamp(smoothScroll / transitionDistance, 0, 1)
      const eased = progress * progress * (3 - 2 * progress)

      const blurAmt = remapBlur(eased) * 8
      depthEl.style.filter = blurAmt > 0.01 ? `blur(${blurAmt}px)` : 'none'
      depthEl.style.transform = `scale(${1 - eased * 0.018})`
      depthEl.style.opacity = `${1 - eased * 0.15}`

      const aboutProgress = smoothstep(0.02, 0.90, progress)
      const aboutY = (1 - aboutProgress) * 100
      aboutEl.style.transform = `translate3d(0, ${aboutY}%, 0)`

      const radius = eased * 24
      aboutEl.style.borderRadius =
        radius > 0.1 ? `${radius}px ${radius}px 0 0` : '0'
      aboutEl.style.boxShadow =
        eased > 0.01
          ? `0 -${8 * eased}px ${32 * eased}px rgba(0,0,0,${0.14 * eased})`
          : 'none'

      depthEl.style.pointerEvents = eased > 0.45 ? 'none' : 'auto'
      aboutEl.style.pointerEvents = eased > 0.55 ? 'auto' : 'none'
    }

    function tick() {
      if (!scrollEl) return
      const rect = scrollEl.getBoundingClientRect()
      const totalDistance = scrollEl.offsetHeight - window.innerHeight
      if (totalDistance <= 0) return

      const scrolledPx = clamp(-rect.top, 0, totalDistance)
      targetScroll = scrolledPx
      smoothScroll = lerp(smoothScroll, targetScroll, 0.16)

      apply()

      const settled = Math.abs(targetScroll - smoothScroll) < 0.5
      if (!settled) {
        raf = requestAnimationFrame(tick)
      } else {
        smoothScroll = targetScroll
        apply()
        running = false
      }
    }

    function onScroll() {
      if (!running) {
        running = true
        raf = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    const initRect = scrollEl.getBoundingClientRect()
    const initTotal = scrollEl.offsetHeight - window.innerHeight
    if (initTotal > 0) {
      const initScrolled = clamp(-initRect.top, 0, initTotal)
      smoothScroll = initScrolled
      targetScroll = initScrolled
      apply()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      depthEl.style.filter = ''
      depthEl.style.transform = ''
      depthEl.style.opacity = ''
      depthEl.style.pointerEvents = ''
      aboutEl.style.transform = ''
      aboutEl.style.borderRadius = ''
      aboutEl.style.boxShadow = ''
      aboutEl.style.pointerEvents = ''
    }
  }, [])

  return (
    <div ref={scrollRef} className="pa-scroll">
      <div className="pa-stage">
        <div className="pa-layer pa-layer--process">
          <div ref={depthRef} className="pa-process-depth">
            {process}
          </div>
        </div>
        <div ref={aboutRef} className="pa-layer pa-layer--about">
          {about}
        </div>
      </div>
    </div>
  )
}
