import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useInView } from './hooks/useInView'
import { ruTypo } from './lib/typography'
import './CertificatesSection.css'

const certs = [
  {
    num: '01',
    label: 'WEB DESIGN',
    title: 'Профессия Веб-дизайнер',
    org: 'Zerocoder · 189 академических часов',
    src: '/certificates/web-designer-zerocoder.webp',
    alt: 'Сертификат Веб-дизайнер Zerocoder',
  },
  {
    num: '02',
    label: 'AI',
    title: 'Нейросети: специалист по работе с системами искусственного интеллекта',
    org: 'Повышение квалификации · 144 часа',
    src: '/certificates/ai-specialist-certificate.webp',
    alt: 'Сертификат Специалист по ИИ',
  },
]

export default function CertificatesSection() {
  const { ref, inView } = useInView(0.1)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState('')

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxSrc(src)
    setLightboxAlt(alt)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxSrc(null)
    setLightboxAlt('')
  }, [])

  useEffect(() => {
    if (!lightboxSrc) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    document.addEventListener('keydown', onKey)

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [lightboxSrc, closeLightbox])

  return (
    <section
      ref={ref}
      className={`certs${inView ? ' certs--in-view' : ''}`}
    >
      <div className="certs__bg-track" aria-hidden="true">
        <span className="certs__bg-text">
          УЧУСЬ · ПРИМЕНЯЮ · СОБИРАЮ В СИСТЕМУ ·&nbsp;
        </span>
        <span className="certs__bg-text">
          УЧУСЬ · ПРИМЕНЯЮ · СОБИРАЮ В СИСТЕМУ ·&nbsp;
        </span>
      </div>

      <div className="certs__inner">
        <div className="certs__header">
          <div className="certs__eyebrow">
            ОБУЧЕНИЕ <span className="certs__eyebrow-num">/ 02</span>
          </div>

          <h2 className="certs__title">
            {ruTypo('Учусь тому, что могу')}
            <br />
            {ruTypo('применять в работе')}
          </h2>

          <p className="certs__desc">
            {ruTypo('Обучение для меня — продолжение практики: новые инструменты сразу проверяю в реальных проектах.')}
          </p>
        </div>

        <div className="certs__grid">
          {certs.map((c) => (
            <figure key={c.num} className="certs__item">
              <div className="certs__img-outer">
                <div
                  className="certs__img-frame"
                  role="button"
                  tabIndex={0}
                  onClick={() => openLightbox(c.src, ruTypo(c.alt))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openLightbox(c.src, ruTypo(c.alt))
                    }
                  }}
                >
                  <img
                    src={c.src}
                    alt={ruTypo(c.alt)}
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              </div>
              <figcaption className="certs__caption">
                <span className="certs__cert-num">{c.num} / {c.label}</span>
                <span className="certs__cert-title">{ruTypo(c.title)}</span>
                <span className="certs__cert-org">{ruTypo(c.org)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightboxSrc && createPortal(
        <div
          className="certs__lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр сертификата"
        >
          <button
            className="certs__lightbox-close"
            onClick={closeLightbox}
            aria-label="Закрыть"
          >
            ✕
          </button>
          <img
            className="certs__lightbox-img"
            src={lightboxSrc}
            alt={lightboxAlt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </section>
  )
}
