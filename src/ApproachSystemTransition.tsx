import { useEffect, useRef, type ReactNode } from 'react'
import './ApproachSystemTransition.css'

interface Props {
  approach: ReactNode
  system: ReactNode
  dari?: ReactNode
  baza?: ReactNode
}

export default function ApproachSystemTransition({ approach, system, dari, baza }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)
  const systemRef = useRef<HTMLDivElement>(null)
  const dariRef = useRef<HTMLDivElement>(null)
  const bazaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const scrollEl = scrollRef.current
    const depthEl = depthRef.current
    const systemEl = systemRef.current
    const dariEl = dariRef.current
    const bazaEl = bazaRef.current
    if (!scrollEl || !depthEl || !systemEl) return

    let smoothScroll = 0
    let targetScroll = 0
    let raf = 0
    let running = false

    const approachDistance = window.innerHeight * 1.4
    const dariDistance = window.innerHeight * 1.1
    const bazaStart = approachDistance + dariDistance
    const bazaDistance = window.innerHeight * 1.1

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
      if (!depthEl || !systemEl) return

      const approachProgress = clamp(smoothScroll / approachDistance, 0, 1)
      const p = approachProgress
      const eased = p * p * (3 - 2 * p)

      const blurAmt = remapBlur(eased) * 8
      depthEl.style.filter = blurAmt > 0.01 ? `blur(${blurAmt}px)` : 'none'
      depthEl.style.transform = `scale(${1 - eased * 0.018})`
      depthEl.style.opacity = `${1 - eased * 0.15}`

      const systemProgress = smoothstep(0.02, 0.90, approachProgress)
      const systemY = (1 - systemProgress) * 100
      systemEl.style.transform = `translate3d(0, ${systemY}%, 0)`

      const radius = eased * 24
      systemEl.style.borderRadius =
        radius > 0.1 ? `${radius}px ${radius}px 0 0` : '0'
      systemEl.style.boxShadow =
        eased > 0.01
          ? `0 -${8 * eased}px ${32 * eased}px rgba(0,0,0,${0.14 * eased})`
          : 'none'

      depthEl.style.pointerEvents = eased > 0.45 ? 'none' : 'auto'
      systemEl.style.pointerEvents = eased > 0.55 ? 'auto' : 'none'

      if (dariEl) {
        const dariRaw = clamp((smoothScroll - approachDistance) / dariDistance, 0, 1)
        const dariEased = dariRaw * dariRaw * (3 - dariRaw * 2)
        const dariX = (1 - dariEased) * 100
        dariEl.style.transform = `translate3d(${dariX}%, 0, 0)`
      }

      if (bazaEl) {
        const bazaRaw = clamp((smoothScroll - bazaStart) / bazaDistance, 0, 1)
        const bazaEased = bazaRaw * bazaRaw * (3 - bazaRaw * 2)
        const bazaX = (1 - bazaEased) * 100
        bazaEl.style.transform = `translate3d(${bazaX}%, 0, 0)`
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
      systemEl.style.transform = ''
      systemEl.style.borderRadius = ''
      systemEl.style.boxShadow = ''
      systemEl.style.pointerEvents = ''
      if (dariEl) dariEl.style.transform = ''
      if (bazaEl) bazaEl.style.transform = ''
    }
  }, [])

  return (
    <div ref={scrollRef} className="ats-scroll" id="portfolio-scroll-scene">
      <div className="ats-stage">
        <div className="ats-layer ats-layer--approach">
          <div ref={depthRef} className="ats-approach-depth">
            {approach}
          </div>
        </div>
        <div ref={systemRef} className="ats-layer ats-layer--system">
          {system}
        </div>
        <div ref={dariRef} className="sd-dari">
          {dari}
        </div>
        <div ref={bazaRef} className="sd-baza">
          {baza}
        </div>
      </div>
    </div>
  )
}
