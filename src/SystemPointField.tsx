import { useRef, useEffect } from 'react'

const DPR_CAP = 2
const SAMPLING = 6
const PARTICLE_R = 1.2
const BASE_ALPHA = 0.025
const ACTIVE_ALPHA = 0.92
const TINT_R = 213
const TINT_G = 138
const TINT_B = 92

interface Particle {
  ox: number
  oy: number
  x: number
  y: number
  vx: number
  vy: number
}

interface SystemPointFieldProps {
  activeRowTop: number
  activeRowBottom: number
  hasActive: boolean
}

export default function SystemPointField({
  activeRowTop,
  activeRowBottom,
  hasActive,
}: SystemPointFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window
    if (prefersReduced || isTouch) return

    let particles: Particle[] = []
    let raf = 0
    let ctx: CanvasRenderingContext2D | null = null
    let dpr = 1
    let w = 0
    let h = 0
    let mouseX = -9999
    let mouseY = -9999
    let mouseActive = false

    let prevMouseX = -9999
    let prevMouseY = -9999
    let velX = 0
    let velY = 0
    const VEL_DECAY = 0.86
    const VEL_MAX = 16

    const INTERACTION_RADIUS = 170
    const MAX_DISPLACEMENT = 30
    const RETURN_DAMPING = 0.07
    const VELOCITY_INFLUENCE = 0.26
    const ACTIVE_RADIUS = 1.3

    function onPointerMove(e: PointerEvent) {
      const rect = parent!.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      if (prevMouseX > -9999) {
        velX = mouseX - prevMouseX
        velY = mouseY - prevMouseY
        const speed = Math.sqrt(velX * velX + velY * velY)
        if (speed > VEL_MAX) {
          const s = VEL_MAX / speed
          velX *= s
          velY *= s
        }
      }
      prevMouseX = mouseX
      prevMouseY = mouseY
      mouseActive = true
    }

    function onPointerLeave() {
      mouseActive = false
      mouseX = -9999
      mouseY = -9999
      prevMouseX = -9999
      prevMouseY = -9999
      velX = 0
      velY = 0
    }

    parent.addEventListener('pointermove', onPointerMove, { passive: true })
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true })

    function setup() {
      const rect = parent!.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      w = rect.width
      h = rect.height
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = w + 'px'
      canvas!.style.height = h + 'px'
      ctx = canvas!.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
      initParticles()
    }

    function initParticles() {
      particles = []
      for (let x = 0; x < w; x += SAMPLING) {
        for (let y = 0; y < h; y += SAMPLING) {
          particles.push({
            ox: x,
            oy: y,
            x,
            y,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    let resizeRaf = 0
    let lastW = 0
    let lastH = 0

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect
        if (Math.abs(nw - lastW) < 1 && Math.abs(nh - lastH) < 1) return
        lastW = nw
        lastH = nh
        cancelAnimationFrame(resizeRaf)
        resizeRaf = requestAnimationFrame(setup)
      }
    })
    ro.observe(parent)
    const initRect = parent.getBoundingClientRect()
    lastW = initRect.width
    lastH = initRect.height

    setup()

    function animate() {
      raf = requestAnimationFrame(animate)
      if (!ctx) return

      velX *= VEL_DECAY
      velY *= VEL_DECAY
      if (Math.abs(velX) < 0.01) velX = 0
      if (Math.abs(velY) < 0.01) velY = 0

      ctx.clearRect(0, 0, w, h)

      const radiusSq = INTERACTION_RADIUS * INTERACTION_RADIUS
      const localActiveTop = activeRowTop
      const localActiveBottom = activeRowBottom

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (mouseActive) {
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const distSq = dx * dx + dy * dy
          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / INTERACTION_RADIUS
            const ease = t * t * (3 - 2 * t)
            const force = ease * MAX_DISPLACEMENT
            const nx = dx / dist
            const ny = dy / dist
            p.vx += nx * force * 0.25 + velX * VELOCITY_INFLUENCE * ease
            p.vy += ny * force * 0.25 + velY * VELOCITY_INFLUENCE * ease
          }
        }

        p.vx += (p.ox - p.x) * RETURN_DAMPING
        p.vy += (p.oy - p.y) * RETURN_DAMPING
        p.vx *= 0.82
        p.vy *= 0.82
        p.x += p.vx
        p.y += p.vy

        let alpha = BASE_ALPHA
        let dotR = PARTICLE_R

        if (hasActive) {
          const inRow = p.oy >= localActiveTop && p.oy <= localActiveBottom
          if (inRow) {
            alpha = ACTIVE_ALPHA
            if (mouseActive) {
              const dx = p.x - mouseX
              const dy = p.y - mouseY
              const distSq = dx * dx + dy * dy
              if (distSq < radiusSq) {
                const dist = Math.sqrt(distSq)
                const t = 1 - dist / INTERACTION_RADIUS
                const sizeT = Math.pow(Math.min(t / 0.35, 1), 2)
                dotR = PARTICLE_R + (ACTIVE_RADIUS - PARTICLE_R) * sizeT
              }
            }
          } else {
            const dyToZone =
              p.oy < localActiveTop
                ? localActiveTop - p.oy
                : p.oy - localActiveBottom
            const fadeDist = 120
            if (dyToZone < fadeDist) {
              alpha = BASE_ALPHA + (ACTIVE_ALPHA - BASE_ALPHA) * (1 - dyToZone / fadeDist) * 0.35
            }
          }
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${TINT_R},${TINT_G},${TINT_B},${alpha})`
        ctx.fill()
      }
    }

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      cancelAnimationFrame(resizeRaf)
      ro.disconnect()
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [activeRowTop, activeRowBottom, hasActive])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
