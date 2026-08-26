import { useState, useEffect, useCallback } from 'react'
import './ReviewsSection.css'

const row1 = [
  { src: '/reviews/Instagram post - 7.png', size: 'lg' },
  { src: '/reviews/ec47d79c-e585-4590-ad8c-49df59870d97.png', size: 'md' },
  { src: '/reviews/b6c80006-a7e6-4d3a-a230-d209d7099930.jpg', size: 'lg' },
  { src: '/reviews/22a2b723-4730-4d00-a3ec-2445750b851a.png', size: 'sm' },
  { src: '/reviews/3ffdef72-0323-485c-a4f3-abb699f9e712.png', size: 'md' },
  { src: '/reviews/0aca0ffb-51ad-4feb-a928-2d5b8da4bfa0.jpg', size: 'lg' },
  { src: '/reviews/3fcf1db8-7350-400d-9f6d-b7655a10c2f5.png', size: 'sm' },
  { src: '/reviews/985ec5ca-c963-4700-8681-386491c11d0c.png', size: 'lg' },
  { src: '/reviews/8612c1af-3c18-4302-9f78-81443a3769d9.jpg', size: 'md' },
  { src: '/reviews/04dbd359-b87d-4c44-b65d-25de1c21f453.png', size: 'md' },
]

const row2 = [
  { src: '/reviews/e42c1f73-0ea2-40fc-b788-7f6c8460bfcf.jpg', size: 'lg' },
  { src: '/reviews/7cf89939-5462-4083-a87b-348077aaf4e9.png', size: 'md' },
  { src: '/reviews/4ab4bf52-66ac-4ac1-b182-a0930200752d.png', size: 'md' },
  { src: '/reviews/d24c17a4-0985-479b-bc67-1d0b2679ce5a.png', size: 'md' },
  { src: '/reviews/Instagram post - 17.png', size: 'lg' },
  { src: '/reviews/a9fe524f-a0c4-44b4-8a42-858bc320f356.png', size: 'md' },
  { src: '/reviews/Instagram post - 9.png', size: 'lg' },
  { src: '/reviews/b1666eda-0793-4669-9901-e24abceba738.png', size: 'md' },
  { src: '/reviews/Instagram post - 10.png', size: 'lg' },
  { src: '/reviews/741af2d5-6fe2-48bc-b5f7-fc8a3ae1157b.png', size: 'md' },
  { src: '/reviews/Instagram post - 8.png', size: 'lg' },
]

export default function ReviewsSection() {
  const [activeSrc, setActiveSrc] = useState<string | null>(null)

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

  function openLightbox(src: string) {
    setActiveSrc(src)
    document.body.style.overflow = 'hidden'
  }

  return (
    <section className="reviews">
      <div className="reviews__inner">
        <div className="reviews__track reviews__track--1">
          {row1.map((img) => (
            <button
              key={img.src}
              type="button"
              className={`reviews__card reviews__card--${img.size}`}
              onClick={() => openLightbox(img.src)}
            >
              <img src={img.src} alt="" draggable={false} />
            </button>
          ))}
        </div>
        <div className="reviews__track reviews__track--2">
          {row2.map((img) => (
            <button
              key={img.src}
              type="button"
              className={`reviews__card reviews__card--${img.size}`}
              onClick={() => openLightbox(img.src)}
            >
              <img src={img.src} alt="" draggable={false} />
            </button>
          ))}
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
