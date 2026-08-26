import { useRef, useEffect } from 'react'
import { isGlobalRafPaused } from './rafPause'

interface HeroParticleFieldProps {
  alphaMultiplier?: number
  cursorForceMultiplier?: number
}

const DPR_CAP = 2
const BASE_SAMPLING = 12
const CURSOR_RADIUS = 175
const ACTIVE_RADIUS_RATIO = 0.35
const BASE_COLOR = { r: 247, g: 243, b: 238 }
const HOVER_COLOR = { r: 213, g: 138, b: 92 }

interface Particle {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
  baseAlpha: number
  radius: number
  maxDisp: number
  returnDamp: number
  depth: number
  parallaxX: number
  parallaxY: number
}

const FAR = {
  alphaMin: 0.06, alphaMax: 0.10,
  radius: 0.5, maxDisp: 4, returnDamp: 0.055,
  parallax: 3, cursorForce: 0.15, depth: 0,
  activeAlpha: 0.18, activeRadius: 0.6,
}
const MID = {
  alphaMin: 0.14, alphaMax: 0.20,
  radius: 0.75, maxDisp: 11, returnDamp: 0.09,
  parallax: 7, cursorForce: 0.28, depth: 1,
  activeAlpha: 0.50, activeRadius: 0.95,
}
const NEAR = {
  alphaMin: 0.26, alphaMax: 0.36,
  radius: 0.95, maxDisp: 20, returnDamp: 0.12,
  parallax: 11, cursorForce: 0.35, depth: 2,
  activeAlpha: 0.62, activeRadius: 1.05,
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

export default function HeroParticleField({ alphaMultiplier = 1, cursorForceMultiplier = 1 }: HeroParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, active: false, normX: 0, normY: 0 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const mouseInsideRef = useRef(false)

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
    let visible = true
    let rafRunning = false

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
      const sampling = BASE_SAMPLING
      for (let x = sampling / 2; x < w; x += sampling) {
        for (let y = sampling / 2; y < h; y += sampling) {
          const gx = Math.floor(x / sampling)
          const gy = Math.floor(y / sampling)
          const hash = ((gx * 73856093) ^ (gy * 19349663)) & 0x7fffffff
          const r = hash / 0x7fffffff

          let layer
          if (r < 0.15) layer = NEAR
          else if (r < 0.55) layer = MID
          else layer = FAR

          particles.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
            baseAlpha: (layer.alphaMin + (hash % 1000) / 1000 * (layer.alphaMax - layer.alphaMin)) * alphaMultiplier,
            radius: layer.radius,
            maxDisp: layer.maxDisp,
            returnDamp: layer.returnDamp,
            depth: layer.depth,
            parallaxX: 0,
            parallaxY: 0,
          })
        }
      }
      particlesRef.current = particles
    }

    function onPointerMove(e: PointerEvent) {
      const rect = hero!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      mouseRef.current.x = x
      mouseRef.current.y = y
      mouseRef.current.active = true
      mouseRef.current.normX = (x / w) * 2 - 1
      mouseRef.current.normY = (y / h) * 2 - 1
    }

    function onPointerLeave() {
      mouseInsideRef.current = false
      mouseRef.current.active = false
      mouseRef.current.x = -1000
      mouseRef.current.y = -1000
      mouseRef.current.normX = 0
      mouseRef.current.normY = 0
    }

    resize()
    initParticles()

    hero.addEventListener('pointermove', onPointerMove, { passive: true })
    hero.addEventListener('pointerleave', onPointerLeave, { passive: true })
    hero.addEventListener('pointerenter', () => {
      mouseInsideRef.current = true
      if (visible && !rafRunning) startRaf()
    }, { passive: true })

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const layers = [
      { ...FAR, cursorForce: FAR.cursorForce * cursorForceMultiplier },
      { ...MID, cursorForce: MID.cursorForce * cursorForceMultiplier },
      { ...NEAR, cursorForce: NEAR.cursorForce * cursorForceMultiplier },
    ]

    function frame() {
      if (!visible || (isGlobalRafPaused() && !mouseInsideRef.current)) { rafRunning = false; return }
      rafRef.current = requestAnimationFrame(frame)

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseActive = mouseRef.current.active && !prefersReduced && !isTouch
      const nx = mouseRef.current.normX
      const ny = mouseRef.current.normY
      const radiusSq = CURSOR_RADIUS * CURSOR_RADIUS

      const particles = particlesRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const layer = layers[p.depth]

        // Parallax
        if (!prefersReduced && !isTouch) {
          const targetPX = nx * -layer.parallax
          const targetPY = ny * -layer.parallax
          p.parallaxX += (targetPX - p.parallaxX) * 0.04
          p.parallaxY += (targetPY - p.parallaxY) * 0.04
        }

        const homeX = p.ox + p.parallaxX
        const homeY = p.oy + p.parallaxY

        // Cursor displacement
        if (mouseActive) {
          const dx = p.x - mx
          const dy = p.y - my
          const distSq = dx * dx + dy * dy

          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / CURSOR_RADIUS
            const pushT = t * t * (3 - 2 * t)
            const force = pushT * p.maxDisp * layer.cursorForce
            const nxp = dx / dist
            const nyp = dy / dist
            p.vx += nxp * force * 0.3
            p.vy += nyp * force * 0.3
          }
        }

        // Return to home (with parallax offset)
        p.vx += (homeX - p.x) * p.returnDamp
        p.vy += (homeY - p.y) * p.returnDamp
        p.vx *= 0.85
        p.vy *= 0.85
        p.x += p.vx
        p.y += p.vy

        // Draw
        let color = BASE_COLOR
        let alpha = p.baseAlpha
        let dotR = p.radius

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
            alpha = lerp(p.baseAlpha, layer.activeAlpha * alphaMultiplier, Math.min(smoothT, 1))
            const sizeT = Math.pow(Math.min(t / ACTIVE_RADIUS_RATIO, 1), 2)
            dotR = p.radius + (layer.activeRadius - p.radius) * sizeT
          }
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, dotR, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${color.r},${color.g},${color.b},${alpha})`
        ctx!.fill()
      }
    }

    rafRef.current = requestAnimationFrame(frame)

    function startRaf() {
      if (!rafRunning) {
        rafRunning = true
        rafRef.current = requestAnimationFrame(frame)
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) startRaf()
      },
      { rootMargin: '15% 0px', threshold: 0 }
    )
    observer.observe(hero)

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
      observer.disconnect()
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
