import { useState } from 'react'
import { ruTypo } from './lib/typography'
import StaticParticleField from './StaticParticleField'
import './TaplinkFAQSection.css'

const ITEMS = [
  {
    q: 'Подойдёт ли мне Taplink или лучше полноценный сайт?',
    a: 'Taplink подходит, когда нужен компактный сайт: представить специалиста или бизнес, показать услуги, собрать важную информацию в одном месте и привести человека к записи или обращению. Если нужна более сложная структура, много отдельных страниц или другие возможности, лучше выбрать другой формат сайта. Я помогу определить это до начала работы.',
  },
  {
    q: 'Можно ли сделать в Taplink несколько страниц?',
    a: 'Да. Базовая стоимость от 15\u00A0000\u00A0₽ относится к одностраничному мини-сайту. Внутренние страницы можно добавить отдельно — от 5\u00A0000\u00A0₽ за страницу. Более сложная структура рассчитывается индивидуально.',
  },
  {
    q: 'Что оплачивается отдельно?',
    a: 'Отдельно оплачивается тариф самого Taplink. Если нужен собственный домен, его регистрация и продление тоже оплачиваются отдельно. Перед началом работы я подскажу, какой тариф понадобится именно для вашей задачи.',
  },
  {
    q: 'Что нужно подготовить до начала работы?',
    a: 'Достаточно рассказать о себе, услугах и задаче сайта и передать материалы, которые уже есть: фотографии, ссылки, отзывы, описание услуг. Готовую структуру и полностью написанные тексты приносить не нужно — с этим я помогаю в процессе.',
  },
]

export default function TaplinkFAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="tp-faq">
      <StaticParticleField
        baseColor={{ r: 47, g: 52, b: 56 }}
        alphaMultiplier={1.2}
      />
      <div className="tp-faq__inner">
        <div className="tp-faq__header">
          <p className="tp-faq__eyebrow">FAQ</p>
          <h2 className="tp-faq__title">{ruTypo('Частые вопросы')}</h2>
          <p className="tp-faq__subtitle">
            {ruTypo('О формате, стоимости и начале работы.')}
          </p>
        </div>

        <div className="tp-faq__list">
          {ITEMS.map((item, i) => {
            const expanded = open === i
            const id = `tp-faq-a-${i}`
            return (
              <div key={i} className="tp-faq__item">
                <button
                  id={`tp-faq-q-${i}`}
                  className="tp-faq__question"
                  aria-expanded={expanded}
                  aria-controls={id}
                  onClick={() => setOpen(expanded ? null : i)}
                >
                  <span className="tp-faq__question-text">
                    {ruTypo(item.q)}
                  </span>
                  <span className="tp-faq__icon" aria-hidden="true">
                    {expanded ? '−' : '+'}
                  </span>
                </button>
                <div
                  id={id}
                  className="tp-faq__answer"
                  role="region"
                  aria-labelledby={`tp-faq-q-${i}`}
                  hidden={!expanded}
                >
                  <div className="tp-faq__answer-inner">
                    <p className="tp-faq__answer-text">
                      {ruTypo(item.a)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
