import { useRef, useEffect, useState } from 'react'
import './GlobalCursor.css'

const DOT_SIZE = 6
const DOT_HOVER = 8
const LERP = 0.32

export default function GlobalCursor() {
  const [enabled, setEnabled] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })
  const dot = useRef({ x: -100, y: -100, size: DOT_SIZE })
  const target = useRef({ x: -100, y: -100, size: DOT_SIZE })
  const raf = useRef(0)
  const running = useRef(false)

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    function tick() {
      const d = dotRef.current
      const g = glowRef.current
      if (!d || !g) return

      dot.current.x += (target.current.x - dot.current.x) * LERP
      dot.current.y += (target.current.y - dot.current.y) * LERP
      dot.current.size += (target.current.size - dot.current.size) * LERP

      const s = dot.current.size
      d.style.transform = `translate(${dot.current.x - s / 2}px, ${dot.current.y - s / 2}px)`
      d.style.width = s + 'px'
      d.style.height = s + 'px'

      g.style.transform = `translate(${dot.current.x - 20}px, ${dot.current.y - 20}px)`

      const dx = dot.current.x - target.current.x
      const dy = dot.current.y - target.current.y
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && Math.abs(dot.current.size - target.current.size) < 0.1) {
        running.current = false
        return
      }

      raf.current = requestAnimationFrame(tick)
    }

    function start() {
      if (!running.current) {
        running.current = true
        raf.current = requestAnimationFrame(tick)
      }
    }

    function onMove(e: PointerEvent) {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      target.current.x = e.clientX
      target.current.y = e.clientY

      const el = e.target as Element
      target.current.size = el.closest('a, button, [role="button"]') ? DOT_HOVER : DOT_SIZE
      start()
    }

    function onLeave() {
      target.current.x = mouse.current.x
      target.current.y = mouse.current.y
      dotRef.current && (dotRef.current.style.opacity = '0')
      glowRef.current && (glowRef.current.style.opacity = '0')
      start()
    }

    function onEnter() {
      dotRef.current && (dotRef.current.style.opacity = '1')
      glowRef.current && (glowRef.current.style.opacity = '1')
      start()
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)
    raf.current = requestAnimationFrame(tick)
    dotRef.current && (dotRef.current.style.opacity = '1')
    glowRef.current && (glowRef.current.style.opacity = '1')

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="global-cursor" aria-hidden="true">
      <div ref={dotRef} className="global-cursor__dot" />
      <div ref={glowRef} className="global-cursor__glow" />
    </div>
  )
}
