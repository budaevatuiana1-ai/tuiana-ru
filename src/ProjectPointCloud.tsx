import { useRef, useEffect, useMemo } from 'react'

const DPR_CAP = 2

interface Particle {
  originalX: number
  originalY: number
  currentX: number
  currentY: number
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
}: ProjectPointCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  const particles = useMemo<Particle[]>(() => [], [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const draw = () => {
      const rect = parent.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)

      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = imageSrc
      img.onload = () => {
        ctx.clearRect(0, 0, rect.width, rect.height)

        const offscreen = document.createElement('canvas')
        offscreen.width = Math.round(rect.width * dpr)
        offscreen.height = Math.round(rect.height * dpr)
        const offCtx = offscreen.getContext('2d')
        if (!offCtx) return
        offCtx.scale(dpr, dpr)

        drawImageWithCrop(offCtx, img, rect.width, rect.height, crop)

        const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height)
        const data = imageData.data

        const w = rect.width
        const h = rect.height

        particles.length = 0

        for (let x = 0; x < w; x += sampling) {
          for (let y = 0; y < h; y += sampling) {
            const sx = Math.round(x * dpr)
            const sy = Math.round(y * dpr)
            if (sx < 0 || sx >= offscreen.width || sy < 0 || sy >= offscreen.height) continue

            const i = (sy * offscreen.width + sx) * 4
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
              r,
              g,
              b,
            })
          }
        }

        particlesRef.current = particles

        ctx.globalAlpha = baseAlpha
        for (const p of particles) {
          ctx.beginPath()
          ctx.arc(p.currentX, p.currentY, particleRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`
          ctx.fill()
        }
      }
    }

    draw()
  }, [imageSrc, sampling, particleRadius, baseAlpha, crop])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
