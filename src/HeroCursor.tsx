import { useRef, useEffect, useState } from 'react'

const DOT_SIZE = 4
const DOT_HOVER = 5
const RING_DEFAULT = 22
const RING_HOVER = 40
const RING_LINK = 30
const RING_DAMPING = 0.32

export default function HeroCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visibleClass, setVisibleClass] = useState('')
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0, size: RING_DEFAULT, dotSize: DOT_SIZE })
  const target = useRef({ x: 0, y: 0, size: RING_DEFAULT, dotSize: DOT_SIZE })
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

      dot.style.opacity = visible.current ? '0.9' : '0'

      dot.style.transform = `translate(${pos.current.x - ring.current.dotSize / 2}px, ${pos.current.y - ring.current.dotSize / 2}px)`

      ring.current.x += (target.current.x - ring.current.x) * RING_DAMPING
      ring.current.y += (target.current.y - ring.current.y) * RING_DAMPING
      ring.current.size += (target.current.size - ring.current.size) * RING_DAMPING
      ring.current.dotSize += (target.current.dotSize - ring.current.dotSize) * RING_DAMPING

      const s = ring.current.size
      ringEl.style.width = s + 'px'
      ringEl.style.height = s + 'px'
      ringEl.style.transform = `translate(${ring.current.x - s / 2}px, ${ring.current.y - s / 2}px)`
      ringEl.style.opacity = visible.current ? '1' : '0'

      const d = ring.current.dotSize
      dot.style.width = d + 'px'
      dot.style.height = d + 'px'
    }

    raf.current = requestAnimationFrame(tick)

    function onPointerEnter() {
      visible.current = true
      setVisibleClass(' hero-cursor--visible')
    }

    function onPointerLeave() {
      visible.current = false
      setVisibleClass('')
    }

    function onPointerMove(e: PointerEvent) {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      target.current.x = e.clientX
      target.current.y = e.clientY

      if (visible.current) {
        const el = e.target as Element
        if (el.closest('.hero__screen--dari, .hero__screen--baza')) {
          target.current.size = RING_HOVER
          target.current.dotSize = DOT_HOVER
        } else if (el.closest('a, button, [role="button"]')) {
          target.current.size = RING_LINK
          target.current.dotSize = DOT_SIZE
        } else {
          target.current.size = RING_DEFAULT
          target.current.dotSize = DOT_SIZE
        }
      }
    }

    hero.addEventListener('pointerenter', onPointerEnter)
    hero.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      hero.removeEventListener('pointerenter', onPointerEnter)
      hero.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <div ref={wrapRef} className={`hero-cursor${visibleClass}`}>
      <div ref={dotRef} className="hero-cursor__dot" />
      <div ref={ringRef} className="hero-cursor__ring" />
    </div>
  )
}
