import { useRef, useState, useEffect, useCallback } from 'react'
import { ruTypo } from './lib/typography'
import './ProcessSection.css'

const steps = [
  {
    num: '01',
    title: 'Погружаюсь в задачу',
    text: 'Разбираемся, для кого проект, что человеку важно понять и к какому действию он должен прийти.',
  },
  {
    num: '02',
    title: 'Собираю структуру',
    text: 'Продумываю сценарий страницы или сайта: что показать первым, какие вопросы закрыть и как привести человека к записи или обращению.',
  },
  {
    num: '03',
    title: 'Работаю со смыслом и визуалом',
    text: 'Помогаю сформулировать тексты, собираю референсы, определяю стиль. Если не хватает фотографий или графики — подключаю AI-визуал.',
  },
  {
    num: '04',
    title: 'Дизайн и разработка',
    text: 'Создаю интерфейс, адаптирую под разные экраны и собираю рабочий сайт. Не просто макет в Figma.',
  },
  {
    num: '05',
    title: 'Проверяю и запускаю',
    text: 'Тестирую основные сценарии, формы и адаптив, вношу финальные правки и передаю готовый проект.',
  },
]

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionEl = useRef<HTMLElement | null>(null)

  const setStepRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    stepRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i)
          }
        },
        {
          rootMargin: '-35% 0px -55% 0px',
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const section = sectionEl.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionTop = -rect.top
      const sectionHeight = rect.height - window.innerHeight
      const raw = sectionTop / sectionHeight
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      ref={sectionEl}
      className="process"
    >
      <div className="process__layout">
        <div className="process__left">
          <div className="process__sticky">
            <div className="process__eyebrow">
              ПРОЦЕСС <span className="process__eyebrow-num">/ 05</span>
            </div>

            <h2 className="process__title">
              От задачи —<br />
              к&nbsp;работающему проекту
            </h2>

            <p className="process__intro">
              {ruTypo('Сначала разбираюсь в задаче и логике проекта. Потом — структура, тексты, визуальная система и только после этого дизайн и запуск.')}
            </p>
          </div>
        </div>

        <div className="process__right">
          <div className="process__track">
            <div
              className="process__track-fill"
              style={{ '--progress': progress } as React.CSSProperties}
            />

            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={setStepRef(i)}
                className={`process__step${activeStep === i ? ' process__step--active' : ''}`}
              >
                <div className="process__step-marker">
                  <div className="process__step-dot" />
                </div>

                <div className="process__step-content">
                  <span className="process__step-num">{step.num}</span>
                  <h3 className="process__step-title">{ruTypo(step.title)}</h3>
                  <p className="process__step-text">{ruTypo(step.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
