import { useEffect, useRef, useState, useCallback } from 'react'
import './TaplinkSection.css'
import { ruTypo } from './lib/typography'
import TaplinkDotField from './TaplinkDotField'

const LEFT_IMGS = [
  { src: '/taplink/kholodova.png', alt: 'Анна Холодова — мини-сайт', role: 'm' },
  { src: '/taplink/psychologist.png', alt: 'Анна Холодова — психолог', role: 'd' },
  { src: '/taplink/stepanova.png', alt: 'Любовь Степанова — мини-сайт', role: 'm' },
  { src: '/taplink/consultation.png', alt: 'Любовь Степанова — консультация', role: 'd' },
]

const RIGHT_IMGS = [
  { src: '/taplink/panferova.png', alt: 'Анна Панферова — мини-сайт', role: 'f' },
  { src: '/taplink/course.png', alt: 'Анна Панферова — курс', role: 'd' },
  { src: '/taplink/galushchenko.png', alt: 'Светлана Галущенко — мини-сайт', role: 'm' },
  { src: '/taplink/license.png', alt: 'Светлана Галущенко — лицензия', role: 'd' },
]

const ALL_IMGS = [...LEFT_IMGS, ...RIGHT_IMGS]

function useFlowScroll(ref: React.RefObject<HTMLDivElement | null>) {
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll('.taplink__card')) as HTMLElement[]
    if (cards.length === 0) return
    const sl = el.scrollLeft
    let best = 0
    let bestDist = Infinity
    for (let i = 0; i < cards.length; i++) {
      const d = Math.abs(cards[i].offsetLeft - sl)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    }
    setAtStart(best === 0)
    setAtEnd(best === cards.length - 1)
  }, [ref])

  const scrollRight = useCallback(() => {
    ref.current?.scrollBy({ left: 220, behavior: 'smooth' })
  }, [ref])

  const scrollLeft = useCallback(() => {
    ref.current?.scrollBy({ left: -220, behavior: 'smooth' })
  }, [ref])

  return { atStart, atEnd, update, scrollRight, scrollLeft }
}

export default function TaplinkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftScrollRef = useRef<HTMLDivElement>(null)
  const rightScrollRef = useRef<HTMLDivElement>(null)
  const leftGalleryRef = useRef<HTMLDivElement>(null)
  const rightGalleryRef = useRef<HTMLDivElement>(null)
  const mobileGalleryRef = useRef<HTMLDivElement>(null)

  const left = useFlowScroll(leftScrollRef)
  const right = useFlowScroll(rightScrollRef)
  const mobile = useFlowScroll(mobileGalleryRef)

  const mobileUpdateRef = useRef(mobile.update)
  mobileUpdateRef.current = mobile.update

  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null)

  const closeLightbox = useCallback(() => setLightboxImg(null), [])

  useEffect(() => {
    if (!lightboxImg) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    document.addEventListener('keydown', onKey)
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [lightboxImg, closeLightbox])

  const tapStartRef = useRef<{ x: number; y: number } | null>(null)
  const draggedRef = useRef(false)

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    tapStartRef.current = { x: e.clientX, y: e.clientY }
    draggedRef.current = false
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!tapStartRef.current || draggedRef.current) return
    const dx = Math.abs(e.clientX - tapStartRef.current.x)
    const dy = Math.abs(e.clientY - tapStartRef.current.y)
    if (dx > 10 || dy > 10) draggedRef.current = true
  }, [])

  const onPointerUp = useCallback(() => {
    tapStartRef.current = null
    setTimeout(() => { draggedRef.current = false }, 0)
  }, [])

  const onMobileCardClick = useCallback(
    (e: React.MouseEvent) => {
      if (draggedRef.current) return
      const card = (e.target as HTMLElement).closest('.taplink__card')
      if (!card) return
      const img = card.querySelector('img') as HTMLImageElement | null
      if (!img) return
      setLightboxImg({ src: img.src, alt: img.alt })
    },
    []
  )

  useEffect(() => {
    const isDesktop = window.matchMedia(
      '(min-width: 901px) and (hover: hover) and (pointer: fine)'
    ).matches

    if (isDesktop) {
      const section = sectionRef.current
      const lg = leftGalleryRef.current
      const rg = rightGalleryRef.current
      if (!section || !lg || !rg) return

      let raf = 0

      function tick() {
        if (!section || !lg || !rg) return
        const rect = section.getBoundingClientRect()
        const vh = window.innerHeight

        if (rect.bottom < 0 || rect.top > vh) {
          raf = requestAnimationFrame(tick)
          return
        }

        const scrollDelta = -rect.top
        if (scrollDelta <= 0) {
          raf = requestAnimationFrame(tick)
          return
        }

        const leftY = scrollDelta * 0.10
        const rightY = -scrollDelta * 0.08

        lg.style.transform = `translate3d(0, ${leftY}px, 0)`
        rg.style.transform = `translate3d(0, ${rightY}px, 0)`

        raf = requestAnimationFrame(tick)
      }

      raf = requestAnimationFrame(tick)

      return () => {
        cancelAnimationFrame(raf)
        lg.style.transform = ''
        rg.style.transform = ''
      }
    }

    const mobileEl = mobileGalleryRef.current
    if (!mobileEl) return

    mobileUpdateRef.current()

    function onScroll() { mobileUpdateRef.current() }
    mobileEl.addEventListener('scroll', onScroll, { passive: true })

    function onImageLoad() { mobileUpdateRef.current() }
    const images = Array.from(mobileEl.querySelectorAll('img')) as HTMLImageElement[]
    for (const img of images) {
      if (!img.complete) img.addEventListener('load', onImageLoad, { once: true })
    }

    return () => {
      mobileEl.removeEventListener('scroll', onScroll)
      for (const img of images) img.removeEventListener('load', onImageLoad)
    }
  }, [])

  return (
    <section className="taplink" ref={sectionRef}>
      <TaplinkDotField />
      <div className="taplink__layout">
        <div className="taplink__flow taplink__flow--left" ref={leftGalleryRef}>
          <div className="taplink__scroll" ref={leftScrollRef}>
            {LEFT_IMGS.map((img) => (
              <div
                className={`taplink__card taplink__card--${img.role}`}
                key={img.src}
              >
                <div className="taplink__frame">
                  <img
                    src={img.src}
                    alt={ruTypo(img.alt)}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="taplink__arrow taplink__arrow--left"
            onClick={left.scrollLeft}
            aria-label="Прокрутить влево"
            style={{ visibility: left.atStart ? 'hidden' : 'visible' }}
          >
            ←
          </button>
          <button
            className="taplink__arrow taplink__arrow--right"
            onClick={left.scrollRight}
            aria-label="Прокрутить вправо"
            style={{ visibility: left.atEnd ? 'hidden' : 'visible' }}
          >
            →
          </button>
        </div>

        <div className="taplink__center">
          <div className="taplink__center-inner">
            <div className="taplink__text">
              <p className="taplink__eyebrow">
                МИНИ-САЙТЫ /{' '}
                <span className="taplink__eyebrow-accent">TAPLINK</span>
              </p>
              <h2 className="taplink__title">
                {ruTypo('Мини-сайты')}
                <br />
                {ruTypo('для экспертов')}
              </h2>
              <p className="taplink__desc">
                {ruTypo(
                  'Несколько проектов для врачей, психологов и специалистов с частной практикой. Разные ниши, разные задачи, одна логика — собрать всё важное в понятную точку входа: услуги, доверие, запись.'
                )}
              </p>
              <p className="taplink__sub">
                {ruTypo(
                  'Подходят, когда нужен аккуратный mobile-first формат: быстро показать экспертность, объяснить услуги и привести человека к записи.'
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="taplink__flow taplink__flow--right" ref={rightGalleryRef}>
          <div className="taplink__scroll" ref={rightScrollRef}>
            {RIGHT_IMGS.map((img) => (
              <div
                className={`taplink__card taplink__card--${img.role}`}
                key={img.src}
              >
                <div className="taplink__frame">
                  <img
                    src={img.src}
                    alt={ruTypo(img.alt)}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            className="taplink__arrow taplink__arrow--left"
            onClick={right.scrollLeft}
            aria-label="Прокрутить влево"
            style={{ visibility: right.atStart ? 'hidden' : 'visible' }}
          >
            ←
          </button>
          <button
            className="taplink__arrow taplink__arrow--right"
            onClick={right.scrollRight}
            aria-label="Прокрутить вправо"
            style={{ visibility: right.atEnd ? 'hidden' : 'visible' }}
          >
            →
          </button>
        </div>
      </div>

      <div className="taplink__mobile-gallery">
        <div
          className="taplink__scroll"
          ref={mobileGalleryRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onClick={onMobileCardClick}
        >
          {ALL_IMGS.map((img) => (
            <div
              className={`taplink__card taplink__card--${img.role}`}
              key={img.src}
            >
              <div className="taplink__frame">
                <img
                  src={img.src}
                  alt={ruTypo(img.alt)}
                  draggable={false}
                />
                <div className="taplink__zoom-hint">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        {!mobile.atStart && (
          <button
            className="taplink__arrow taplink__arrow--left"
            onClick={mobile.scrollLeft}
            aria-label="Прокрутить влево"
          >
            ←
          </button>
        )}
        {!mobile.atEnd && (
          <button
            className="taplink__arrow taplink__arrow--right"
            onClick={mobile.scrollRight}
            aria-label="Прокрутить вправо"
          >
            →
          </button>
        )}
      </div>

      {lightboxImg && (
        <div className="taplink-lightbox" onClick={closeLightbox}>
          <button
            className="taplink-lightbox__close"
            onClick={closeLightbox}
            aria-label="Закрыть"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            className="taplink-lightbox__img"
            src={lightboxImg.src}
            alt={lightboxImg.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="sd-facts">
        <div className="sd-facts__line" />
        <div className="sd-facts__grid">
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">01</span>{' '}
              /&nbsp;НИШИ
            </p>
            <p className="sd-facts__text">
              Врачи · психологи · частная практика
            </p>
          </div>
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">02</span>{' '}
              /&nbsp;ЗАДАЧА
            </p>
            <p className="sd-facts__text">
              Услуги · доверие · запись
            </p>
          </div>
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">03</span>{' '}
              /&nbsp;ФОРМАТ
            </p>
            <p className="sd-facts__text">
              Mobile-first · Taplink · мини-сайт
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
