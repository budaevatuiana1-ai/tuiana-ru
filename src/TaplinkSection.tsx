import { useEffect, useRef } from 'react'
import './TaplinkSection.css'
import { ruTypo } from './lib/typography'

const LEFT_IMGS = [
  { src: '/taplink/kholodova.png', alt: 'Анна Холодова — мини-сайт' },
  { src: '/taplink/psychologist.png', alt: 'Анна Холодова — психолог' },
  { src: '/taplink/license.png', alt: 'Светлана Галущенко — лицензия' },
  { src: '/taplink/stepanova.png', alt: 'Любовь Степанова — мини-сайт' },
]

const RIGHT_IMGS = [
  { src: '/taplink/panferova.png', alt: 'Анна Панферова — мини-сайт' },
  { src: '/taplink/course.png', alt: 'Анна Панферова — курс' },
  { src: '/taplink/galushchenko.png', alt: 'Светлана Галущенко — мини-сайт' },
  { src: '/taplink/consultation.png', alt: 'Любовь Степанова — консультация' },
]

export default function TaplinkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const smoothRef = useRef(0)

  useEffect(() => {
    const isDesktop = window.matchMedia(
      '(min-width: 901px) and (hover: hover) and (pointer: fine)'
    ).matches
    if (!isDesktop) return

    const section = sectionRef.current
    const leftCol = leftRef.current
    const rightCol = rightRef.current
    if (!section || !leftCol || !rightCol) return

    function tick() {
      const rect = section!.getBoundingClientRect()
      const sectionH = section!.offsetHeight
      const vh = window.innerHeight
      const scrollable = sectionH - vh
      if (scrollable <= 0) return

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable))
      const target = progress

      smoothRef.current += (target - smoothRef.current) * 0.08

      const p = smoothRef.current
      const leftY = -p * 120
      const rightY = -p * 60

      leftCol!.style.transform = `translate3d(0, ${leftY}vh, 0)`
      rightCol!.style.transform = `translate3d(0, ${rightY}vh, 0)`

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
      leftCol.style.transform = ''
      rightCol.style.transform = ''
    }
  }, [])

  return (
    <section className="taplink" ref={sectionRef}>
      <div className="taplink__viewport">
        <div className="taplink__col taplink__col--left" ref={leftRef}>
          {LEFT_IMGS.map((img) => (
            <div className="taplink__card" key={img.src}>
              <div className="taplink__frame">
                <img
                  src={img.src}
                  alt={ruTypo(img.alt)}
                  width="260"
                  height="520"
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="taplink__center">
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

        <div className="taplink__col taplink__col--right" ref={rightRef}>
          {RIGHT_IMGS.map((img) => (
            <div className="taplink__card" key={img.src}>
              <div className="taplink__frame">
                <img
                  src={img.src}
                  alt={ruTypo(img.alt)}
                  width="260"
                  height="520"
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
