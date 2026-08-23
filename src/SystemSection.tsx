import { useCallback, useRef, useState } from 'react'
import './SystemSection.css'
import { ruTypo } from './lib/typography'
import SystemPointField from './SystemPointField'

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
  const listRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

  const getRowBounds = useCallback(
    (index: number) => {
      const list = listRef.current
      const row = rowRefs.current[index]
      if (!list || !row) return { top: 0, bottom: 0 }
      const listRect = list.getBoundingClientRect()
      const rowRect = row.getBoundingClientRect()
      return {
        top: rowRect.top - listRect.top,
        bottom: rowRect.bottom - listRect.top,
      }
    },
    []
  )

  const activeBounds = activeRow !== null ? getRowBounds(activeRow) : { top: 0, bottom: 0 }

  return (
    <section className="system">
      <div className="system__inner">
        <div className="system__left">
          <p className="system__label">02 · SYSTEM</p>
          <h2 className="system__headline">
            ЧТО ВХОДИТ<br />
            В ЭТУ<br />
            <span className="system__accent">СИСТЕМУ.</span>
          </h2>
        </div>

        <div className="system__list" ref={listRef}>
          <SystemPointField
            activeRowTop={activeBounds.top}
            activeRowBottom={activeBounds.bottom}
            hasActive={activeRow !== null}
          />
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
