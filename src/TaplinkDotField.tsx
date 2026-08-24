import { useRef, useEffect } from 'react'

const DPR_CAP = 2
const BASE_SAMPLING = 12
const COLOR = { r: 247, g: 243, b: 238 }

const FAR = { alphaMin: 0.05, alphaMax: 0.09, radius: 0.65 }
const MID = { alphaMin: 0.12, alphaMax: 0.17, radius: 0.95 }
const NEAR = { alphaMin: 0.22, alphaMax: 0.30, radius: 1.2 }

export default function TaplinkDotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const rect = parent.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    const w = rect.width
    const h = rect.height

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = w + 'px'
    canvas.style.height = h + 'px'

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

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

        const alpha = layer.alphaMin + ((hash % 1000) / 1000) * (layer.alphaMax - layer.alphaMin)

        ctx.beginPath()
        ctx.arc(x, y, layer.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${COLOR.r},${COLOR.g},${COLOR.b},${alpha})`
        ctx.fill()
      }
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
