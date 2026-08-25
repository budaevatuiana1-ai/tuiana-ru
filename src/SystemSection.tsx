import { useRef, useState } from 'react'
import './SystemSection.css'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'

const items = [
  {
    num: '01',
    title: 'Стратегия',
    desc: 'Понимаем задачу, аудиторию и что сайт должен изменить в бизнесе.',
  },
  {
    num: '02',
    title: 'Структура',
    desc: 'Выстраиваем путь человека от первого экрана до нужного действия.',
  },
  {
    num: '03',
    title: 'Тексты',
    desc: 'Говорим понятно: без воды, сложных формулировок и давления.',
  },
  {
    num: '04',
    title: 'Дизайн',
    desc: 'Создаём визуальную систему, которая поддерживает смысл и доверие.',
  },
  {
    num: '05',
    title: 'Запуск',
    desc: 'Адаптируем, собираем, проверяем и готовим сайт к реальной работе.',
  },
]

function SystemSection() {
  const [activeRow, setActiveRow] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  return (
    <section className="system" ref={sectionRef}>
      <HeroParticleField alphaMultiplier={0.55} cursorForceMultiplier={0.45} />
      <div className="system__inner">
        <div className="system__left">
          <p className="system__label">02 · SYSTEM</p>
          <h2 className="system__headline">
            ЧТО ДЕЛАЕТ<br />
            САЙТ<br />
            <span className="system__accent">СИСТЕМОЙ</span>
          </h2>
        </div>

        <div className="system__list">
          {items.map((item, i) => (
            <div
              className={`system__row${activeRow === i ? ' system__row--active' : ''}${activeRow !== null && activeRow !== i ? ' system__row--dimmed' : ''}`}
              key={item.num}
              ref={(el) => { rowRefs.current[i] = el }}
              onMouseEnter={() => setActiveRow(i)}
              onMouseLeave={() => setActiveRow(null)}
            >
              <div className="system__row-header">
                <span className="system__num">
                  {item.num}
                  <span className="system__num-dash" />
                </span>
                <span className="system__title">{item.title}</span>
              </div>
              <p className="system__desc">{ruTypo(item.desc)}</p>
              <span className="system__row-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SystemSection
