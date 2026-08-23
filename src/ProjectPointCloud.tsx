import { useRef, useEffect } from 'react'

const DPR_CAP = 2

interface Particle {
  originalX: number
  originalY: number
  currentX: number
  currentY: number
  vx: number
  vy: number
  r: number
  g: number
  b: number
}

interface CropConfig {
  mode: 'heightFit' | 'coverFit'
  translateXPercent?: number
  objectPositionPercent?: number
}

interface ProjectPointCloudProps {
  imageSrc: string
  sampling: number
  particleRadius: number
  baseAlpha: number
  crop: CropConfig
  className?: string
  interactionRadius?: number
  maxDisplacement?: number
  returnDamping?: number
  activeAlpha?: number
  activeRadius?: number
  interactionStrength?: number
  tintColor?: string
  tintStrength?: number
}

function drawImageWithCrop(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number,
  crop: CropConfig,
) {
  const imgAspect = img.naturalWidth / img.naturalHeight

  if (crop.mode === 'heightFit') {
    const drawH = canvasH
    const drawW = drawH * imgAspect
    const offsetX = crop.translateXPercent
      ? -(drawW - canvasW) * crop.translateXPercent
      : 0
    ctx.drawImage(img, offsetX, 0, drawW, drawH)
  } else if (crop.mode === 'coverFit') {
    const posPercent = (crop.objectPositionPercent ?? 50) / 100
    const canvasAspect = canvasW / canvasH

    let drawW: number, drawH: number
    if (imgAspect > canvasAspect) {
      drawH = canvasH
      drawW = drawH * imgAspect
    } else {
      drawW = canvasW
      drawH = drawW / imgAspect
    }

    const maxOffsetX = drawW - canvasW
    const maxOffsetY = drawH - canvasH
    const offsetX = -maxOffsetX * posPercent
    const offsetY = -maxOffsetY * 0.5

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH)
  }
}

export default function ProjectPointCloud({
  imageSrc,
  sampling,
  particleRadius,
  baseAlpha,
  crop,
  className,
  interactionRadius = 0,
  maxDisplacement = 0,
  returnDamping = 0.08,
  activeAlpha = 0,
  activeRadius = 0,
  interactionStrength = 1,
  tintColor,
  tintStrength = 0,
}: ProjectPointCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window
    const interactionEnabled = interactionRadius > 0 && !prefersReduced && !isTouch

    const card = canvas.closest('.hero__screen') as HTMLElement | null
    if (!card) return

    const projectLabel = card.classList.contains('hero__screen--dari') ? 'DARI' : 'BAZA'

    let tintR = 0, tintG = 0, tintB = 0
    if (tintColor && tintColor.length === 7) {
      tintR = parseInt(tintColor.slice(1, 3), 16)
      tintG = parseInt(tintColor.slice(3, 5), 16)
      tintB = parseInt(tintColor.slice(5, 7), 16)
    }

    let particles: Particle[] = []
    let raf = 0
    let mouseX = -9999
    let mouseY = -9999
    let mouseActive = false
    let ctx: CanvasRenderingContext2D | null = null
    let dpr = 1
    let w = 0
    let h = 0

    function onPointerMove(e: PointerEvent) {
      if (!mouseActive) {
        console.log(`ProjectPointCloud pointer active: ${projectLabel}`)
      }
      const rect = card!.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      mouseActive = true
    }

    function onPointerLeave() {
      mouseActive = false
      mouseX = -9999
      mouseY = -9999
    }

    if (interactionEnabled) {
      card.addEventListener('pointermove', onPointerMove, { passive: true })
      card.addEventListener('pointerleave', onPointerLeave, { passive: true })
    }

    function setupCanvas() {
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
    }

    function initParticles(imgData: ImageData) {
      const data = imgData.data
      const sw = imgData.width
      particles = []
      for (let x = 0; x < w; x += sampling) {
        for (let y = 0; y < h; y += sampling) {
          const sx = Math.round(x * dpr)
          const sy = Math.round(y * dpr)
          if (sx < 0 || sx >= sw || sy < 0 || sy >= imgData.height) continue

          const i = (sy * sw + sx) * 4
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]
          if (a < 128) continue

          particles.push({
            originalX: x,
            originalY: y,
            currentX: x,
            currentY: y,
            vx: 0,
            vy: 0,
            r,
            g,
            b,
          })
        }
      }
    }

    function sampleImage(img: HTMLImageElement) {
      const offscreen = document.createElement('canvas')
      offscreen.width = Math.round(w * dpr)
      offscreen.height = Math.round(h * dpr)
      const offCtx = offscreen.getContext('2d')
      if (!offCtx) return null
      offCtx.scale(dpr, dpr)
      drawImageWithCrop(offCtx, img, w, h, crop)
      return offCtx.getImageData(0, 0, offscreen.width, offscreen.height)
    }

    function renderStatic() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = baseAlpha
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.originalX, p.originalY, particleRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`
        ctx.fill()
      }
    }

    function animate() {
      raf = requestAnimationFrame(animate)
      if (!ctx) return

      ctx.clearRect(0, 0, w, h)

      const radiusSq = interactionRadius * interactionRadius

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (mouseActive) {
          const dx = p.currentX - mouseX
          const dy = p.currentY - mouseY
          const distSq = dx * dx + dy * dy

          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / interactionRadius
            const ease = t * t * (3 - 2 * t)
            const force = ease * maxDisplacement * interactionStrength
            const nx = dx / dist
            const ny = dy / dist
            p.vx += nx * force * 0.25
            p.vy += ny * force * 0.25
          }
        }

        p.vx += (p.originalX - p.currentX) * returnDamping
        p.vy += (p.originalY - p.currentY) * returnDamping
        p.vx *= 0.82
        p.vy *= 0.82
        p.currentX += p.vx
        p.currentY += p.vy

        let alpha = baseAlpha
        let dotR = particleRadius
        let drawR = p.r
        let drawG = p.g
        let drawB = p.b

        if (mouseActive) {
          const dx = p.currentX - mouseX
          const dy = p.currentY - mouseY
          const distSq = dx * dx + dy * dy

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq)
            const t = 1 - dist / interactionRadius
            const inner = t > 0.6
              ? 1 + (t - 0.6) / 0.4 * 0.5
              : Math.pow(t / 0.6, 2.5)
            const smoothT = Math.min(inner, 1.5)
            alpha = baseAlpha + (activeAlpha - baseAlpha) * Math.min(smoothT, 1)
            const sizeT = Math.pow(Math.min(t / 0.35, 1), 2)
            dotR = particleRadius + (activeRadius - particleRadius) * sizeT

            if (tintColor && tintStrength > 0) {
              const tintMix = smoothT * tintStrength
              drawR = Math.round(p.r + (tintR - p.r) * tintMix)
              drawG = Math.round(p.g + (tintG - p.g) * tintMix)
              drawB = Math.round(p.b + (tintB - p.b) * tintMix)
            }
          }
        }

        ctx.beginPath()
        ctx.arc(p.currentX, p.currentY, dotR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${drawR},${drawG},${drawB},${alpha})`
        ctx.fill()
      }
    }

    setupCanvas()

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageSrc
    img.onload = () => {
      setupCanvas()
      const imgData = sampleImage(img)
      if (!imgData) return
      initParticles(imgData)

      if (!interactionEnabled) {
        renderStatic()
        return
      }

      raf = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(raf)
      if (interactionEnabled) {
        card.removeEventListener('pointermove', onPointerMove)
        card.removeEventListener('pointerleave', onPointerLeave)
      }
    }
  }, [
    imageSrc,
    sampling,
    particleRadius,
    baseAlpha,
    crop,
    interactionRadius,
    maxDisplacement,
    returnDamping,
    activeAlpha,
    activeRadius,
    interactionStrength,
    tintColor,
    tintStrength,
  ])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
