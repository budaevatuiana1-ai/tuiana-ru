import { Fragment } from 'react'
import './BazaLogicSection.css'

const STEPS = [
  { num: '01', label: 'МЕСТО', text: 'Что это за\u00A0пространство' },
  { num: '02', label: 'ФОРМАТ', text: 'Подходит ли оно моей группе' },
  {
    num: '03',
    label: 'УСЛОВИЯ',
    text: 'Как устроены проживание, питание и\u00A0занятия',
  },
  { num: '04', label: 'АТМОСФЕРА', text: 'Как здесь живёт и\u00A0работает группа' },
  { num: '05', label: 'СВОБОДНЫЕ ДАТЫ', text: 'Понятный следующий шаг' },
]

export default function BazaLogicSection() {
  return (
    <section className="baza-logic">
      <div className="baza-logic__inner">
        <div className="baza-logic__header">
          <p className="baza-logic__eyebrow">НОВАЯ ЛОГИКА</p>
          <h2 className="baza-logic__title">
            Собрали сайт вокруг пути организатора
          </h2>
          <p className="baza-logic__desc">
            Структуру выстроили в{'\u00A0'}той последовательности, в{'\u00A0'}которой организатор принимает решение: сначала понять место и{'\u00A0'}формат, затем проверить условия, почувствовать атмосферу и{'\u00A0'}только после этого перейти к{'\u00A0'}обсуждению свободных дат.
          </p>
        </div>

        <div className="baza-logic__flow">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              <div className="baza-logic__step">
                <p className="baza-logic__step-num">{step.num}</p>
                <p className="baza-logic__step-label">{step.label}</p>
                <p className="baza-logic__step-text">{step.text}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="baza-logic__arrow" aria-hidden="true">
                  →
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
