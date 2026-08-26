import { useEffect, useRef, type ReactNode } from 'react'
import './AboutCertificatesTransition.css'

interface Props {
  about: ReactNode
  certificates: ReactNode
}

const REVEAL_START = 0.13
const REVEAL_END = 0.72

export default function AboutCertificatesTransition({ about, certificates }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const certsLayerRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return

    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const scrollEl = scrollRef.current
    const certsEl = certsLayerRef.current
    if (!scrollEl || !certsEl) return

    let raf = 0
    let running = false

    function apply() {
      if (!scrollEl || !certsEl) return
      const rect = scrollEl.getBoundingClientRect()
      const total = scrollEl.offsetHeight - window.innerHeight
      if (total <= 0) return

      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)

      if (progress < REVEAL_START) {
        certsEl.style.clipPath = 'ellipse(0% 0% at 50% 100%)'
      } else if (progress < REVEAL_END) {
        const t = (progress - REVEAL_START) / (REVEAL_END - REVEAL_START)
        const rx = t * 150
        const ry = t * 130
        certsEl.style.clipPath = `ellipse(${rx}% ${ry}% at 50% 100%)`
      } else {
        certsEl.style.clipPath = 'none'
      }

      const flowEl = flowRef.current
      if (flowEl) {
        const settled = progress >= 1
        flowEl.style.visibility = settled ? 'visible' : 'hidden'
        flowEl.style.pointerEvents = settled ? 'auto' : 'none'
      }
    }

    function tick() {
      apply()
      if (!scrollEl) return
      const rect = scrollEl.getBoundingClientRect()
      const total = scrollEl.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, -rect.top)
      const progress = Math.min(1, scrolled / total)
      if (!(progress >= 1 || progress <= 0)) {
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
    apply()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      if (certsEl) certsEl.style.clipPath = ''
      const flowEl = flowRef.current
      if (flowEl) {
        flowEl.style.visibility = ''
        flowEl.style.pointerEvents = ''
      }
    }
  }, [])

  return (
    <>
      <div ref={scrollRef} className="act-scroll">
        <div className="act-stage">
          <div className="act-layer act-layer--about">
            {about}
          </div>
          <div ref={certsLayerRef} className="act-layer act-layer--certs">
            {certificates}
          </div>
        </div>
      </div>
      <div ref={flowRef} className="act-certs-flow">
        {certificates}
      </div>
    </>
  )
}
