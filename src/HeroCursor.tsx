import { useRef, useEffect, useState } from 'react'

const DOT_SIZE = 4
const RING_DEFAULT = 24
const RING_HOVER = 40
const RING_LINK = 30
const RING_DAMPING = 0.16

export default function HeroCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0, size: RING_DEFAULT })
  const target = useRef({ x: 0, y: 0, size: RING_DEFAULT })
  const raf = useRef(0)
  const visible = useRef(false)

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const hero = document.querySelector('.hero')
    if (!hero) return

    setEnabled(true)

    function tick() {
      raf.current = requestAnimationFrame(tick)

      const dot = dotRef.current
      const ringEl = ringRef.current
      if (!dot || !ringEl) return

      dot.style.transform = `translate(${pos.current.x - DOT_SIZE / 2}px, ${pos.current.y - DOT_SIZE / 2}px)`
      dot.style.opacity = visible.current ? '1' : '0'

      ring.current.x += (target.current.x - ring.current.x) * RING_DAMPING
      ring.current.y += (target.current.y - ring.current.y) * RING_DAMPING
      ring.current.size += (target.current.size - ring.current.size) * RING_DAMPING

      const s = ring.current.size
      ringEl.style.width = s + 'px'
      ringEl.style.height = s + 'px'
      ringEl.style.transform = `translate(${ring.current.x - s / 2}px, ${ring.current.y - s / 2}px)`
      ringEl.style.opacity = visible.current ? '1' : '0'
    }

    raf.current = requestAnimationFrame(tick)

    function onPointerMove(e: PointerEvent) {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      target.current.x = e.clientX
      target.current.y = e.clientY

      const insideHero = hero!.contains(e.target as Node)
      visible.current = insideHero

      if (insideHero) {
        const el = e.target as Element
        if (el.closest('.hero__screen--dari, .hero__screen--baza')) {
          target.current.size = RING_HOVER
        } else if (el.closest('a, button, [role="button"]')) {
          target.current.size = RING_LINK
        } else {
          target.current.size = RING_DEFAULT
        }
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="hero-cursor">
      <div ref={dotRef} className="hero-cursor__dot" />
      <div ref={ringRef} className="hero-cursor__ring" />
    </div>
  )
}
