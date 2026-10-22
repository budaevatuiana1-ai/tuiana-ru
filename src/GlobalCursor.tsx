import { useRef, useEffect, useState } from 'react'
import './GlobalCursor.css'

const GLOW_SIZE = 40

export default function GlobalCursor() {
  const [enabled, setEnabled] = useState(false)
  const glowRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)
  const started = useRef(false)

  useEffect(() => {
    const fine = matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    if (started.current) return
    started.current = true
    setEnabled(true)

    function onMove(e: PointerEvent) {
      const g = glowRef.current
      if (!g) return

      g.style.transform = `translate3d(${e.clientX - GLOW_SIZE / 2}px, ${e.clientY - GLOW_SIZE / 2}px, 0)`

      if (!visibleRef.current) {
        visibleRef.current = true
        g.style.opacity = '1'
      }
    }

    function onLeave() {
      visibleRef.current = false
      glowRef.current && (glowRef.current.style.opacity = '0')
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      started.current = false
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  if (!enabled) return null

  return (
    <div className="global-cursor" aria-hidden="true">
      <div ref={glowRef} className="global-cursor__glow" />
    </div>
  )
}
