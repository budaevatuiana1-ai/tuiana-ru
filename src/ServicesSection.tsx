import { useRef, useCallback } from 'react'
import { useInView } from './hooks/useInView'
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
  const timers = useRef<Map<HTMLElement, ReturnType<typeof setTimeout>>>(new Map())

  const onEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget
    const pending = timers.current.get(card)
    if (pending) {
      clearTimeout(pending)
      timers.current.delete(card)
    }

    // Instant graphite background via inline style
    card.style.backgroundColor = '#2F3438'
    card.style.transitionProperty = 'transform, border-color, box-shadow'
    card.classList.add('is-bg-active')
    card.classList.remove('is-text-active')
    card.classList.remove('is-dots-active')
    card.classList.remove('is-spotlight-ready')

    // Text: 100ms
    const tText = setTimeout(() => {
      card.classList.add('is-text-active')
    }, 100)
    timers.current.set(card, tText)

    // Dots: 130ms
    const tDots = setTimeout(() => {
      card.classList.add('is-dots-active')
    }, 130)
    timers.current.set(card, tDots)

    // Spotlight: 300ms
    const tSpot = setTimeout(() => {
      card.classList.add('is-spotlight-ready')
    }, 300)
    timers.current.set(card, tSpot)
  }, [])

  const onMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  const onLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const card = e.currentTarget
    const pending = timers.current.get(card)
    if (pending) {
      clearTimeout(pending)
      timers.current.delete(card)
    }
    card.classList.remove('is-spotlight-ready')
    card.classList.remove('is-dots-active')
    card.classList.remove('is-text-active')
    card.classList.remove('is-bg-active')
    card.style.removeProperty('background-color')
    card.style.removeProperty('transition-property')
    card.style.removeProperty('--mx')
    card.style.removeProperty('--my')
  }, [])

  return (
    <section
      ref={ref}
      className={`services${inView ? ' services--in-view' : ''}`}
    >
      <div className="services__intro">
        <div className="services__eyebrow">
          УСЛУГИ <span className="services__eyebrow-num">/ 05</span>
        </div>

        <h2 className="services__title">
          От короткой точки входа до&nbsp;полноценного сайта
        </h2>

        <p className="services__desc">
          Подбираю формат под задачу, а не предлагаю всем одно и то же.
          Структуру, тексты и путь пользователя продумываю вместе с&nbsp;дизайном.
        </p>
      </div>

      <div className="services__grid">
        {services.map((s, i) => (
          <article
            key={s.num}
            className="services__card"
            style={{ transitionDelay: `${180 + i * 80}ms` }}
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

            <h3 className="services__card-name">{s.name}</h3>

            <p className="services__card-desc">{s.desc}</p>

            <p className="services__card-micro">{s.micro}</p>

            <div className="services__card-foot">
              <span className={`services__card-price${'priceMuted' in s && s.priceMuted ? ' services__card-price--muted' : ''}`}>{s.price}</span>
              <span className="services__card-arrow" aria-hidden="true">→</span>
            </div>
          </article>
        ))}
      </div>

      <p className="services__also">
        Также: оформление Telegram-канала · визуальная система · шаблоны для контента · сопровождение проекта
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
