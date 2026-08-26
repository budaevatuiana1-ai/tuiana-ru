import { useState, useEffect, useCallback, useRef } from 'react'
import { setGlobalRafPaused } from './rafPause'
import './ReviewsSection.css'

const row1 = [
  { src: '/reviews/Instagram post - 7.png', thumb: '/reviews/optimized/Instagram post - 7.webp', size: 'lg' },
  { src: '/reviews/ec47d79c-e585-4590-ad8c-49df59870d97.png', thumb: '/reviews/optimized/ec47d79c-e585-4590-ad8c-49df59870d97.webp', size: 'md' },
  { src: '/reviews/b6c80006-a7e6-4d3a-a230-d209d7099930.jpg', thumb: '/reviews/optimized/b6c80006-a7e6-4d3a-a230-d209d7099930.webp', size: 'lg' },
  { src: '/reviews/22a2b723-4730-4d00-a3ec-2445750b851a.png', thumb: '/reviews/optimized/22a2b723-4730-4d00-a3ec-2445750b851a.webp', size: 'sm' },
  { src: '/reviews/3ffdef72-0323-485c-a4f3-abb699f9e712.png', thumb: '/reviews/optimized/3ffdef72-0323-485c-a4f3-abb699f9e712.webp', size: 'md' },
  { src: '/reviews/0aca0ffb-51ad-4feb-a928-2d5b8da4bfa0.jpg', thumb: '/reviews/optimized/0aca0ffb-51ad-4feb-a928-2d5b8da4bfa0.webp', size: 'lg' },
  { src: '/reviews/3fcf1db8-7350-400d-9f6d-b7655a10c2f5.png', thumb: '/reviews/optimized/3fcf1db8-7350-400d-9f6d-b7655a10c2f5.webp', size: 'sm' },
  { src: '/reviews/985ec5ca-c963-4700-8681-386491c11d0c.png', thumb: '/reviews/optimized/985ec5ca-c963-4700-8681-386491c11d0c.webp', size: 'lg' },
  { src: '/reviews/8612c1af-3c18-4302-9f78-81443a3769d9.jpg', thumb: '/reviews/optimized/8612c1af-3c18-4302-9f78-81443a3769d9.webp', size: 'md' },
  { src: '/reviews/04dbd359-b87d-4c44-b65d-25de1c21f453.png', thumb: '/reviews/optimized/04dbd359-b87d-4c44-b65d-25de1c21f453.webp', size: 'md' },
]

const row2 = [
  { src: '/reviews/e42c1f73-0ea2-40fc-b788-7f6c8460bfcf.jpg', thumb: '/reviews/optimized/e42c1f73-0ea2-40fc-b788-7f6c8460bfcf.webp', size: 'lg' },
  { src: '/reviews/7cf89939-5462-4083-a87b-348077aaf4e9.png', thumb: '/reviews/optimized/7cf89939-5462-4083-a87b-348077aaf4e9.webp', size: 'md' },
  { src: '/reviews/4ab4bf52-66ac-4ac1-b182-a0930200752d.png', thumb: '/reviews/optimized/4ab4bf52-66ac-4ac1-b182-a0930200752d.webp', size: 'md' },
  { src: '/reviews/d24c17a4-0985-479b-bc67-1d0b2679ce5a.png', thumb: '/reviews/optimized/d24c17a4-0985-479b-bc67-1d0b2679ce5a.webp', size: 'md' },
  { src: '/reviews/Instagram post - 17.png', thumb: '/reviews/optimized/Instagram post - 17.webp', size: 'lg' },
  { src: '/reviews/a9fe524f-a0c4-44b4-8a42-858bc320f356.png', thumb: '/reviews/optimized/a9fe524f-a0c4-44b4-8a42-858bc320f356.webp', size: 'md' },
  { src: '/reviews/Instagram post - 9.png', thumb: '/reviews/optimized/Instagram post - 9.webp', size: 'lg' },
  { src: '/reviews/b1666eda-0793-4669-9901-e24abceba738.png', thumb: '/reviews/optimized/b1666eda-0793-4669-9901-e24abceba738.webp', size: 'md' },
  { src: '/reviews/Instagram post - 10.png', thumb: '/reviews/optimized/Instagram post - 10.webp', size: 'lg' },
  { src: '/reviews/741af2d5-6fe2-48bc-b5f7-fc8a3ae1157b.png', thumb: '/reviews/optimized/741af2d5-6fe2-48bc-b5f7-fc8a3ae1157b.webp', size: 'md' },
  { src: '/reviews/Instagram post - 8.png', thumb: '/reviews/optimized/Instagram post - 8.webp', size: 'lg' },
]

function TrackCards({ items, onOpen }: { items: typeof row1; onOpen: (src: string) => void }) {
  return (
    <>
      {items.map((img, i) => (
        <button
          key={`${img.src}-${i}`}
          type="button"
          className={`reviews__card reviews__card--${img.size}`}
          onClick={() => onOpen(img.src)}
        >
          <img src={img.thumb} alt="" draggable={false} />
        </button>
      ))}
    </>
  )
}

interface TrackState {
  pos: number
  setWidth: number
  speed: number
  paused: boolean
}

export default function ReviewsSection() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const state1 = useRef<TrackState>({ pos: 0, setWidth: 0, speed: 0, paused: false })
  const state2 = useRef<TrackState>({ pos: 0, setWidth: 0, speed: 0, paused: false })
  const raf = useRef(0)
  const lastTime = useRef(0)

  const close = useCallback(() => {
    setActiveSrc(null)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    if (!activeSrc) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeSrc, close])

  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const el1 = track1Ref.current
    const el2 = track2Ref.current
    if (!el1 || !el2) return

    function measure(el: HTMLDivElement, state: TrackState) {
      const gap = parseFloat(getComputedStyle(el).gap) || 0
      state.setWidth = (el.scrollWidth - gap) / 2
      state.pos = 0
    }

    function initTrack(el: HTMLDivElement, state: TrackState, pxPerSec: number, startOffset: number) {
      measure(el, state)
      state.speed = pxPerSec
      state.pos = startOffset
      el.style.transform = `translate3d(${state.pos}px, 0, 0)`
    }

    initTrack(el1, state1.current, 0, 0)
    initTrack(el2, state2.current, 0, 0)

    const w1 = state1.current.setWidth
    const w2 = state2.current.setWidth
    state1.current.speed = w1 / 69
    state2.current.speed = w2 / 80
    state2.current.pos = -w2

    el1.style.transform = `translate3d(0, 0, 0)`
    el2.style.transform = `translate3d(${-w2}px, 0, 0)`

    let rafId = 0
    let running = false

    function tick(now: number) {
      const dt = (now - lastTime.current) / 1000
      lastTime.current = now

      const s1 = state1.current
      const s2 = state2.current

      if (!s1.paused) {
        s1.pos -= s1.speed * dt
        if (s1.pos <= -s1.setWidth) s1.pos += s1.setWidth
        el1.style.transform = `translate3d(${s1.pos}px, 0, 0)`
      }

      if (!s2.paused) {
        s2.pos += s2.speed * dt
        if (s2.pos >= 0) s2.pos -= s2.setWidth
        el2.style.transform = `translate3d(${s2.pos}px, 0, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    function startRaf() {
      if (!running) {
        running = true
        lastTime.current = performance.now()
        rafId = requestAnimationFrame(tick)
        raf.current = rafId
      }
    }

    function stopRaf() {
      running = false
      cancelAnimationFrame(rafId)
    }

    const section = el1.closest('.reviews')
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGlobalRafPaused(true)
          startRaf()
        } else {
          stopRaf()
          setGlobalRafPaused(false)
        }
      },
      { threshold: 0 }
    )
    observer.observe(section)

    return () => {
      stopRaf()
      setGlobalRafPaused(false)
      observer.disconnect()
      el1.style.transform = ''
      el2.style.transform = ''
    }
  }, [])

  function onEnter1() { state1.current.paused = true }
  function onLeave1() {
    state1.current.paused = false
    lastTime.current = performance.now()
  }
  function onEnter2() { state2.current.paused = true }
  function onLeave2() {
    state2.current.paused = false
    lastTime.current = performance.now()
  }

  function openLightbox(src: string) {
    setActiveSrc(src)
    document.body.style.overflow = 'hidden'
  }

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__inner">
        <div className="reviews__header">
          <div className="reviews__eyebrow">
            ОТЗЫВЫ <span className="reviews__eyebrow-num">/ 04</span>
          </div>
          <h2 className="reviews__title">Отзывы<br />о совместной работе</h2>
        </div>
      </div>

      <div
        className="reviews__track reviews__track--1"
        onMouseEnter={onEnter1}
        onMouseLeave={onLeave1}
      >
        <div className="reviews__track-inner" ref={track1Ref}>
          <TrackCards items={row1} onOpen={openLightbox} />
          <TrackCards items={row1} onOpen={openLightbox} />
        </div>
      </div>
      <div
        className="reviews__track reviews__track--2"
        onMouseEnter={onEnter2}
        onMouseLeave={onLeave2}
      >
        <div className="reviews__track-inner" ref={track2Ref}>
          <TrackCards items={row2} onOpen={openLightbox} />
          <TrackCards items={row2} onOpen={openLightbox} />
        </div>
      </div>

      {activeSrc && (
        <div className="reviews__lightbox" onClick={close}>
          <button
            type="button"
            className="reviews__lightbox-close"
            onClick={close}
            aria-label="Закрыть"
          >
            ×
          </button>
          <div
            className="reviews__lightbox-img"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={activeSrc} alt="" draggable={false} />
          </div>
        </div>
      )}
    </section>
  )
}
