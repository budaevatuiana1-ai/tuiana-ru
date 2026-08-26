import { useState } from 'react'
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
  const [activeRow, setActiveRow] = useState<number | null>(null)

  return (
    <section className="process" id="process">
      <div className="process__layout">
        <div className="process__left">
          <div className="process__eyebrow">
            ПРОЦЕСС <span className="process__eyebrow-num">/ 05</span>
          </div>

          <h2 className="process__title">
            От задачи —<br />
            к&nbsp;работающему <span className="process__title-accent">проекту</span>
          </h2>

          <p className="process__intro">
            Сначала разбираюсь в задаче и логике проекта. Потом — структура, тексты, визуальная система и только после этого дизайн и запуск.
          </p>
        </div>

        <div className="process__right">
          <div className="process__list">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`process__row${activeRow === i ? ' process__row--active' : ''}${activeRow !== null && activeRow !== i ? ' process__row--dimmed' : ''}`}
                onMouseEnter={() => setActiveRow(i)}
                onMouseLeave={() => setActiveRow(null)}
              >
                <div className="process__row-header">
                  <span className="process__num">
                    {step.num}
                    <span className="process__num-dash" />
                  </span>
                  <h3 className="process__title-text">{step.title}</h3>
                </div>
                <p className="process__desc">{step.text}</p>
                <span className="process__row-line" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
