import { useEffect, useRef } from 'react'
import './TaplinkSection.css'
import { ruTypo } from './lib/typography'

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

export default function TaplinkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isDesktop = window.matchMedia(
      '(min-width: 901px) and (hover: hover) and (pointer: fine)'
    ).matches
    if (!isDesktop) return

    const section = sectionRef.current
    const leftFlow = leftRef.current
    const rightFlow = rightRef.current
    if (!section || !leftFlow || !rightFlow) return

    let raf = 0

    function tick() {
      if (!section || !leftFlow || !rightFlow) return
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

      leftFlow.style.transform = `translate3d(0, ${leftY}px, 0)`
      rightFlow.style.transform = `translate3d(0, ${rightY}px, 0)`

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      if (leftFlow) leftFlow.style.transform = ''
      if (rightFlow) rightFlow.style.transform = ''
    }
  }, [])

  return (
    <section className="taplink" ref={sectionRef}>
      <div className="taplink__layout">
        <div className="taplink__flow taplink__flow--left" ref={leftRef}>
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

        <div className="taplink__flow taplink__flow--right" ref={rightRef}>
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
      </div>

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
