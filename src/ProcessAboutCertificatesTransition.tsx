import { useEffect, useRef, type ReactNode } from 'react'
import './ProcessAboutCertificatesTransition.css'

interface Props {
  process: ReactNode
  about: ReactNode
  certificates: ReactNode
}

const REVEAL_START = 0.13
const REVEAL_END = 0.72

export default function ProcessAboutCertificatesTransition({
  process,
  about,
  certificates,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const certsLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const scrollEl = scrollRef.current
    const depthEl = depthRef.current
    const aboutEl = aboutRef.current
    const certsEl = certsLayerRef.current
    if (!scrollEl || !depthEl || !aboutEl || !certsEl) return

    const transitionDistance = window.innerHeight * 1.4

    let smoothScroll = 0
    let targetScroll = 0
    let raf = 0
    let running = false

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
      if (!depthEl || !aboutEl || !certsEl) return

      const rect = scrollEl!.getBoundingClientRect()
      const totalDistance = scrollEl!.offsetHeight - window.innerHeight
      if (totalDistance <= 0) return

      const rawScrolled = clamp(-rect.top, 0, totalDistance)

      /* ── Phase 1: Process → About (lerp-smoothed) ── */
      const p1 = clamp(smoothScroll / transitionDistance, 0, 1)
      const p1eased = p1 * p1 * (3 - 2 * p1)

      const blurAmt = remapBlur(p1eased) * 8
      depthEl.style.filter = blurAmt > 0.01 ? `blur(${blurAmt}px)` : 'none'
      depthEl.style.transform = `scale(${1 - p1eased * 0.018})`
      depthEl.style.opacity = `${1 - p1eased * 0.15}`

      const aboutProgress = smoothstep(0.02, 0.9, p1)
      const aboutY = (1 - aboutProgress) * 100
      aboutEl.style.transform = `translate3d(0, ${aboutY}%, 0)`

      const radius = p1eased * 24
      aboutEl.style.borderRadius =
        radius > 0.1 ? `${radius}px ${radius}px 0 0` : '0'
      aboutEl.style.boxShadow =
        p1eased > 0.01
          ? `0 -${8 * p1eased}px ${32 * p1eased}px rgba(0,0,0,${0.14 * p1eased})`
          : 'none'

      depthEl.style.pointerEvents = p1eased > 0.45 ? 'none' : 'auto'
      aboutEl.style.pointerEvents = p1eased > 0.55 ? 'auto' : 'none'

      /* ── Phase 2: About → Certificates (raw scroll, clip-path reveal) ── */
      const phase2Start = transitionDistance
      const phase2Total = totalDistance - phase2Start
      const p2 = phase2Total > 0 ? clamp((rawScrolled - phase2Start) / phase2Total, 0, 1) : 1

      if (p2 < REVEAL_START) {
        certsEl.style.clipPath = 'ellipse(0% 0% at 50% 100%)'
      } else if (p2 < REVEAL_END) {
        const t = (p2 - REVEAL_START) / (REVEAL_END - REVEAL_START)
        const rx = t * 150
        const ry = t * 130
        certsEl.style.clipPath = `ellipse(${rx}% ${ry}% at 50% 100%)`
      } else {
        certsEl.style.clipPath = 'none'
      }
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
      certsEl.style.clipPath = ''
    }
  }, [])

  return (
    <div ref={scrollRef} className="pac-scroll">
      <div className="pac-stage">
        <div className="pac-layer pac-layer--process">
          <div ref={depthRef} className="pac-process-depth">
            {process}
          </div>
        </div>
        <div ref={aboutRef} className="pac-layer pac-layer--about">
          {about}
        </div>
        <div ref={certsLayerRef} className="pac-layer pac-layer--certs">
          {certificates}
        </div>
      </div>
    </div>
  )
}
