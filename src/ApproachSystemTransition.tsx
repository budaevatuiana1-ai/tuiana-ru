import { useEffect, useRef, type ReactNode } from 'react'
import './ApproachSystemTransition.css'

interface Props {
  approach: ReactNode
  system: ReactNode
}

export default function ApproachSystemTransition({ approach, system }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const depthRef = useRef<HTMLDivElement>(null)
  const systemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const scrollEl = scrollRef.current
    const depthEl = depthRef.current
    const systemEl = systemRef.current
    if (!scrollEl || !depthEl || !systemEl) return

    let renderProgress = 0
    let targetProgress = 0
    let raf = 0
    let running = false

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t
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
      const p = renderProgress
      const eased = p * p * (3 - 2 * p)

      const blurAmt = remapBlur(eased) * 8
      depthEl.style.filter = blurAmt > 0.01 ? `blur(${blurAmt}px)` : 'none'
      depthEl.style.transform = `scale(${1 - eased * 0.018})`
      depthEl.style.opacity = `${1 - eased * 0.15}`

      const systemProgress = smoothstep(0.02, 0.90, renderProgress)
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
    }

    function tick() {
      if (!scrollEl) return
      const rect = scrollEl.getBoundingClientRect()
      const distance = scrollEl.offsetHeight - window.innerHeight
      if (distance <= 0) return

      targetProgress = Math.max(0, Math.min(1, -rect.top / distance))
      renderProgress = lerp(renderProgress, targetProgress, 0.16)

      apply()

      const settled = Math.abs(targetProgress - renderProgress) < 0.001
      if (!settled) {
        raf = requestAnimationFrame(tick)
      } else {
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
    }
  }, [])

  return (
    <div ref={scrollRef} className="ats-scroll">
      <div className="ats-stage">
        <div className="ats-layer ats-layer--approach">
          <div ref={depthRef} className="ats-approach-depth">
            {approach}
          </div>
        </div>
        <div ref={systemRef} className="ats-layer ats-layer--system">
          {system}
        </div>
      </div>
    </div>
  )
}
