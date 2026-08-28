import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from './hooks/useInView'
import { ruTypo } from './lib/typography'
import './ServicesSection.css'

const services = [
  {
    num: '01',
    name: 'Индивидуальный сайт',
    desc: 'Для эксперта, клиники или проекта, которому уже тесно в одном экране. Продумываю архитектуру, разделы, тексты, визуальную систему, адаптив и путь пользователя — от первого знакомства до нужного действия.',
    price: 'от 45 000 ₽',
    micro: 'Для сложной структуры и нескольких направлений',
    tags: ['для клиник', 'проект'],
  },
  {
    num: '02',
    name: 'Лендинг под ключ',
    desc: 'Полноценный одностраничный сайт для специалиста, услуги или проекта. Собираю информацию, выстраиваю логику блоков, помогаю с текстами, создаю дизайн и адаптирую под мобильные устройства.',
    price: 'от 30 000 ₽',
    micro: 'Одна задача — один понятный сценарий',
    tags: ['под ключ'],
  },
  {
    num: '03',
    name: 'Taplink / мини-сайт',
    desc: 'Компактная mobile-first страница, когда большой сайт пока не нужен. Услуги, экспертность, важные ответы, контакты и запись — в одной ссылке, которую удобно отправлять клиентам и размещать в соцсетях.',
    price: 'от 15 000 ₽',
    micro: 'Быстрая и понятная точка входа',
    tags: ['mobile-first'],
  },
  {
    num: '04',
    name: 'Презентации',
    desc: 'Для выступлений, вебинаров, конференций и образовательных проектов. Помогаю структурировать материал и собираю спокойную профессиональную визуальную подачу — в том числе в едином стиле с сайтом.',
    price: 'по задаче',
    micro: 'Чтобы содержание было видно, а не потеряно в оформлении',
    tags: [],
    priceMuted: true,
  },
  {
    num: '05',
    name: 'AI и digital для проекта',
    desc: 'Нейрофотосессии, AI-видео, визуалы, обложки, стикеры, сертификаты и другие материалы, которые помогают собрать проект в единую визуальную систему.',
    price: 'индивидуально',
    micro: 'Можно добавить к сайту или заказать отдельно',
    tags: ['AI'],
    priceMuted: true,
  },
]

export default function ServicesSection() {
  const { ref, inView } = useInView(0.1)

  const onEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    e.currentTarget.classList.add('is-hovered')
  }, [])

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  const onLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget
    card.classList.remove('is-hovered')
    card.style.removeProperty('--mx')
    card.style.removeProperty('--my')
  }, [])

  const scrollRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    function update() {
      const cards = Array.from(el!.querySelectorAll('.services__card')) as HTMLElement[]
      if (cards.length === 0) return
      const sl = el!.scrollLeft
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
    }

    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const scrollToCard = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll('.services__card')) as HTMLElement[]
    if (cards.length === 0) return
    const sl = el.scrollLeft
    let bestIdx = 0
    let bestDist = Infinity
    for (let i = 0; i < cards.length; i++) {
      const d = Math.abs(cards[i].offsetLeft - sl)
      if (d < bestDist) {
        bestDist = d
        bestIdx = i
      }
    }
    const target = bestIdx + direction
    if (target < 0 || target >= cards.length) return
    el.scrollTo({ left: cards[target].offsetLeft, behavior: 'smooth' })
  }, [])

  const scrollLeft = useCallback(() => scrollToCard(-1), [scrollToCard])
  const scrollRight = useCallback(() => scrollToCard(1), [scrollToCard])

  return (
    <section
      ref={ref}
      id="services"
      className={`services${inView ? ' services--in-view' : ''}`}
    >
      <div className="services__intro">
        <div className="services__eyebrow">
          УСЛУГИ
        </div>

        <h2 className="services__title">
          {ruTypo('От короткой точки входа до\u00A0полноценного сайта')}
        </h2>

        <p className="services__desc">
          {ruTypo('Подбираю формат под задачу, а не предлагаю всем одно и то же.')}
          <br />
          {ruTypo('Структуру, тексты и путь пользователя продумываю вместе с\u00A0дизайном.')}
        </p>
      </div>

      <div className="services__carousel">
        <div className="services__grid" ref={scrollRef}>
          {services.map((s) => (
            <article
              key={s.num}
              className="services__card"
              onPointerEnter={onEnter}
              onPointerMove={onMove}
              onPointerLeave={onLeave}
            >
              <div className="services__card-head">
                <span className="services__card-num">{s.num}</span>
                {s.tags.length > 0 && (
                  <div className="services__card-tags">
                    {s.tags.map(t => (
                      <span key={t} className="services__card-tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>

              <h3 className="services__card-name">{ruTypo(s.name)}</h3>

              <p className="services__card-desc">{ruTypo(s.desc)}</p>

              <p className="services__card-micro">{ruTypo(s.micro)}</p>

              <div className="services__card-foot">
                <span className={`services__card-price${'priceMuted' in s && s.priceMuted ? ' services__card-price--muted' : ''}`}>{ruTypo(s.price)}</span>
                <span className="services__card-arrow" aria-hidden="true">→</span>
              </div>
            </article>
          ))}
        </div>
        {!atStart && (
          <button
            className="services__arrow services__arrow--left"
            onClick={scrollLeft}
            aria-label="Предыдущая услуга"
          >
            ←
          </button>
        )}
        {!atEnd && (
          <button
            className="services__arrow services__arrow--right"
            onClick={scrollRight}
            aria-label="Следующая услуга"
          >
            →
          </button>
        )}
      </div>

      <p className="services__swipe-hint">
        Листайте услуги <span aria-hidden="true">→</span>
      </p>

      <p className="services__also">
        {ruTypo('Также: оформление Telegram-канала · визуальная система · шаблоны для контента · сопровождение проекта')}
      </p>

      <div className="services__cta">
        <p className="services__cta-text">Не уверены, какой формат нужен?</p>
        <a href="#contact" className="cta-button">
          <span>Обсудить, какой формат вам подходит</span>
          <span className="cta-button__arrow" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  )
}
