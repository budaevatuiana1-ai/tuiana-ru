import { useEffect, useRef } from 'react'

interface SystemCursorProps {
  isRowActive: boolean
  sectionRef: React.RefObject<HTMLElement | null>
}

export default function SystemCursor({ isRowActive, sectionRef }: SystemCursorProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const dot = dotRef.current
    const ring = ringRef.current
    if (!wrap || !dot || !ring) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window
    const isFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (prefersReduced || isTouch || !isFine) return

    const wrapEl = wrap
    const dotEl = dot
    const ringEl = ring

    let mouseX = -9999
    let mouseY = -9999
    let dotX = -9999
    let dotY = -9999
    let ringX = -9999
    let ringY = -9999
    let raf = 0
    let inside = false

    const DOT_SPEED = 0.40
    const RING_DAMPING = 0.36

    function isPointerInside(e: PointerEvent) {
      const section = sectionRef.current
      if (!section) return false
      const rect = section.getBoundingClientRect()
      return (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      )
    }

    function onMove(e: PointerEvent) {
      mouseX = e.clientX
      mouseY = e.clientY

      const nowInside = isPointerInside(e)
      if (nowInside && !inside) {
        inside = true
        wrapEl.style.opacity = '1'
        dotX = mouseX
        dotY = mouseY
        ringX = mouseX
        ringY = mouseY
      } else if (!nowInside && inside) {
        inside = false
        wrapEl.style.opacity = '0'
      }
    }

    function onLeave() {
      inside = false
      wrapEl.style.opacity = '0'
    }

    function animate() {
      raf = requestAnimationFrame(animate)

      dotX += (mouseX - dotX) * DOT_SPEED
      dotY += (mouseY - dotY) * DOT_SPEED
      ringX += (mouseX - ringX) * RING_DAMPING
      ringY += (mouseY - ringY) * RING_DAMPING

      dotEl.style.transform = `translate(${dotX - 2}px, ${dotY - 2}px)`
      ringEl.style.transform = `translate(${ringX - 13}px, ${ringY - 13}px)`
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [sectionRef])

  const ringSize = isRowActive ? 40 : 26
  const ringOffset = ringSize / 2

  return (
    <div ref={wrapRef} className="system-cursor" aria-hidden="true" style={{ opacity: 0 }}>
      <div
        ref={dotRef}
        className="system-cursor__dot"
        style={{ opacity: 1 }}
      />
      <div
        ref={ringRef}
        className={`system-cursor__ring${isRowActive ? ' system-cursor__ring--active' : ''}`}
        style={{
          opacity: 1,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringOffset,
          marginTop: -ringOffset,
        }}
      />
    </div>
  )
}
