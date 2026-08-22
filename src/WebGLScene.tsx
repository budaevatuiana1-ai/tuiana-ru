import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SAMPLE_STEP_COARSE = 14
const SAMPLE_STEP_FINE = 10
const MIN_BRIGHTNESS = 35
const FINE_BRIGHTNESS = 100
const COLOR_BOOST_START = 110
const COLOR_BOOST_MAX = 0.25
const POINT_SIZE = 0.022
const WIDTH_RATIO = 0.78

function mountScene(container: HTMLElement): () => void {
  const width = container.clientWidth || window.innerWidth
  const height = container.clientHeight || window.innerHeight

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111210)

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  const geometry = new THREE.BufferGeometry()
  const material = new THREE.PointsMaterial({
    size: POINT_SIZE,
    sizeAttenuation: true,
    vertexColors: true,
  })
  const points = new THREE.Points(geometry, material)
  points.visible = false
  scene.add(points)

  const render = () => {
    renderer.render(scene, camera)
  }
  render()

  const heroImage = new Image()

  const handleHeroImageLoad = () => {
    const canvas = document.createElement('canvas')
    canvas.width = heroImage.naturalWidth
    canvas.height = heroImage.naturalHeight
    const context = canvas.getContext('2d')
    if (!context) return
    context.drawImage(heroImage, 0, 0)
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    const visibleHeight = 2 * Math.tan(((camera.fov / 2) * Math.PI) / 180) * camera.position.z
    const visibleWidth = visibleHeight * camera.aspect
    const fitScale = Math.min(
      (visibleWidth * WIDTH_RATIO) / canvas.width,
      (visibleHeight * 0.92) / canvas.height,
    )

    const posList: number[] = []
    const colorList: number[] = []
    const color = new THREE.Color()
    let sampledPointCount = 0

    const tryAddSample = (x: number, y: number, minBrightness: number) => {
      const i = (y * canvas.width + x) * 4
      const r = data[i]
      const g = data[i + 1]
      const b = data[i + 2]
      const brightness = (r + g + b) / 3
      if (brightness < minBrightness) return
      const boost =
        1 +
        (Math.max(0, brightness - COLOR_BOOST_START) / (255 - COLOR_BOOST_START)) *
          COLOR_BOOST_MAX
      color
        .setRGB(
          Math.min(1, (r / 255) * boost),
          Math.min(1, (g / 255) * boost),
          Math.min(1, (b / 255) * boost),
        )
        .convertSRGBToLinear()
      posList.push((x - canvas.width / 2) * fitScale, (canvas.height / 2 - y) * fitScale, 0)
      colorList.push(color.r, color.g, color.b)
      sampledPointCount += 1
    }

    for (let y = 0; y < canvas.height; y += SAMPLE_STEP_COARSE) {
      for (let x = 0; x < canvas.width; x += SAMPLE_STEP_COARSE) {
        tryAddSample(x, y, MIN_BRIGHTNESS)
      }
    }
    for (let y = 0; y < canvas.height; y += SAMPLE_STEP_FINE) {
      for (let x = 0; x < canvas.width; x += SAMPLE_STEP_FINE) {
        tryAddSample(x, y, FINE_BRIGHTNESS)
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(posList), 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorList), 3))
    points.visible = true
    console.log('sampledPointCount', sampledPointCount)
    render()
  }
  heroImage.addEventListener('load', handleHeroImageLoad)
  heroImage.src = '/dari-hero.png'

  const handleResize = () => {
    const w = container.clientWidth || window.innerWidth
    const h = container.clientHeight || window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    render()
  }
  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
    heroImage.removeEventListener('load', handleHeroImageLoad)
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement)
    }
  }
}

export default function WebGLScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined
    return mountScene(container)
  }, [])

  return <div ref={containerRef} className="webgl-scene" aria-hidden="true" />
}
