import { useRef, useEffect } from 'react'

const DPR_CAP = 2
const BASE_SAMPLING = 12

const FAR = {
  alphaMin: 0.06, alphaMax: 0.10,
  radius: 0.5, depth: 0,
}
const MID = {
  alphaMin: 0.14, alphaMax: 0.20,
  radius: 0.75, depth: 1,
}
const NEAR = {
  alphaMin: 0.26, alphaMax: 0.36,
  radius: 0.95, depth: 2,
}

interface StaticParticleFieldProps {
  alphaMultiplier?: number
  baseColor?: { r: number; g: number; b: number }
}

const DEFAULT_BASE_COLOR = { r: 247, g: 243, b: 238 }

export default function StaticParticleField({ alphaMultiplier = 1, baseColor = DEFAULT_BASE_COLOR }: StaticParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    const rect = parent.getBoundingClientRect()
    const w = rect.width
    const h = rect.height

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)

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

        const alphaRange = layer.alphaMax - layer.alphaMin
        const alpha = (layer.alphaMin + (hash % 1000) / 1000 * alphaRange) * alphaMultiplier

        ctx.beginPath()
        ctx.arc(x, y, layer.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${alpha})`
        ctx.fill()
      }
    }

    const ro = new ResizeObserver(() => {
      const r2 = parent.getBoundingClientRect()
      const w2 = r2.width
      const h2 = r2.height
      const dpr2 = Math.min(window.devicePixelRatio || 1, DPR_CAP)
      canvas.width = w2 * dpr2
      canvas.height = h2 * dpr2
      canvas.style.width = w2 + 'px'
      canvas.style.height = h2 + 'px'
      const ctx2 = canvas.getContext('2d')
      if (!ctx2) return
      ctx2.setTransform(dpr2, 0, 0, dpr2, 0, 0)
      ctx2.clearRect(0, 0, w2, h2)
      for (let x = sampling / 2; x < w2; x += sampling) {
        for (let y = sampling / 2; y < h2; y += sampling) {
          const gx = Math.floor(x / sampling)
          const gy = Math.floor(y / sampling)
          const hash = ((gx * 73856093) ^ (gy * 19349663)) & 0x7fffffff
          const rHash = hash / 0x7fffffff
          let layer
          if (rHash < 0.15) layer = NEAR
          else if (rHash < 0.55) layer = MID
          else layer = FAR
          const alphaRange = layer.alphaMax - layer.alphaMin
          const alpha = (layer.alphaMin + (hash % 1000) / 1000 * alphaRange) * alphaMultiplier
          ctx2.beginPath()
          ctx2.arc(x, y, layer.radius, 0, Math.PI * 2)
          ctx2.fillStyle = `rgba(${baseColor.r},${baseColor.g},${baseColor.b},${alpha})`
          ctx2.fill()
        }
      }
    })
    ro.observe(parent)

    return () => ro.disconnect()
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
