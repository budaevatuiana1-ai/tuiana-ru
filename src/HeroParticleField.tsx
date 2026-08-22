import { useRef, useEffect } from 'react'

const DPR_CAP = 2
const SAMPLING = 14
const PARTICLE_RADIUS = 0.65
const CURSOR_RADIUS = 175
const MAX_DISPLACEMENT = 22
const ACTIVE_RADIUS_RATIO = 0.35
const MAX_DOT_RADIUS = 0.9
const RETURN_DAMPING = 0.08
const BASE_COLOR = { r: 247, g: 243, b: 238 }
const HOVER_COLOR = { r: 213, g: 138, b: 92 }
const BASE_ALPHA_MIN = 0.08
const BASE_ALPHA_MAX = 0.12

interface Particle {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  baseAlpha: number
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpColor(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  t: number,
) {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t)),
  }
}

export default function HeroParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const hero = canvas.parentElement
    if (!hero) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window

    let dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    let w = 0
    let h = 0

    function resize() {
      const rect = hero!.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
    }

    function initParticles() {
      const particles: Particle[] = []
      for (let x = SAMPLING / 2; x < w; x += SAMPLING) {
        for (let y = SAMPLING / 2; y < h; y += SAMPLING) {
          particles.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            baseAlpha: BASE_ALPHA_MIN + Math.random() * (BASE_ALPHA_MAX - BASE_ALPHA_MIN),
          })
        }
      }
      particlesRef.current = particles
    }

    function onPointerMove(e: PointerEvent) {
      const rect = hero!.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.active = true
    }

    function onPointerLeave() {
      mouseRef.current.active = false
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
    }

    resize()
    initParticles()

    hero.addEventListener('pointermove', onPointerMove, { passive: true })
    hero.addEventListener('pointerleave', onPointerLeave, { passive: true })

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function frame() {
      rafRef.current = requestAnimationFrame(frame)

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mouseRef.current.active && !prefersReduced && !isTouch
      const radiusSq = CURSOR_RADIUS * CURSOR_RADIUS

      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const distSq = dx * dx + dy * dy

          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / CURSOR_RADIUS
            const pushT = t * t * (3 - 2 * t)
            const force = pushT * MAX_DISPLACEMENT
            const nx = dx / dist
            const ny = dy / dist
            p.vx += nx * force * 0.3
            p.vy += ny * force * 0.3
          }
        }

        p.vx += (p.ox - p.x) * RETURN_DAMPING
        p.vy += (p.oy - p.y) * RETURN_DAMPING
        p.vx *= 0.85
        p.vy *= 0.85
        p.x += p.vx
        p.y += p.vy

        let color = BASE_COLOR
        let alpha = p.baseAlpha
        let dotR = PARTICLE_RADIUS

        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const distSq = dx * dx + dy * dy

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / CURSOR_RADIUS
            const inner = t > (1 - ACTIVE_RADIUS_RATIO)
              ? 1 + (t - (1 - ACTIVE_RADIUS_RATIO)) / ACTIVE_RADIUS_RATIO * 0.6
              : Math.pow(t / (1 - ACTIVE_RADIUS_RATIO), 2.5)
            const smoothT = Math.min(inner, 1.6)
            color = lerpColor(BASE_COLOR, HOVER_COLOR, Math.min(smoothT, 1))
            alpha = lerp(p.baseAlpha, 0.60, Math.min(smoothT, 1))
            const sizeT = Math.pow(Math.min(t / ACTIVE_RADIUS_RATIO, 1), 2)
            dotR = PARTICLE_RADIUS + (MAX_DOT_RADIUS - PARTICLE_RADIUS) * sizeT
          }
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, dotR, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`
        ctx!.fill()
      }
    }

    rafRef.current = requestAnimationFrame(frame)

    const resizeObserver = new ResizeObserver(() => {
      resize()
      initParticles()
    })
    resizeObserver.observe(hero)

    return () => {
      cancelAnimationFrame(rafRef.current)
      hero.removeEventListener('pointermove', onPointerMove)
      hero.removeEventListener('pointerleave', onPointerLeave)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
