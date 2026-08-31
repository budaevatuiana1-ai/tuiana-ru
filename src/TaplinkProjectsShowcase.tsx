import { useState, useCallback, useEffect, useRef } from 'react'
import './TaplinkProjectsShowcase.css'
import { ruTypo } from './lib/typography'

const BASE = import.meta.env.BASE_URL

interface Project {
  num: string
  name: string
  url: string
  task: string
  taskShort: string
  taskText: string
  solution: string
  feature: string
  preview: string
  screens: [string, string]
}

const PROJECTS: Project[] = [
  {
    num: '01',
    name: 'Светлана Галущенко',
    url: 'https://taplink.cc/dr_galuqenko',
    task: 'Снять тревогу и быстро объяснить, чем специалист может помочь.',
    taskShort: 'Снять тревогу и быстро объяснить, чем специалист может помочь.',
    taskText: 'Нужно было собрать практику врача-психиатра и невролога в одну спокойную страницу. В этой теме особенно важно, чтобы человек не испугался, не потерялся в медицинских формулировках и заранее понял, как проходит обращение.',
    solution: 'Разобрала информацию о практике, собрала структуру и тексты, выстроила путь от первого знакомства до записи. Отдельно показала опыт врача, лицензию, форматы консультаций и кабинет. Подобрала и доработала визуал, затем собрала всё в Taplink.',
    feature: 'Получилась страница, которая не давит и не «продаёт психиатра», а спокойно отвечает на вопросы человека и постепенно ведёт его к записи.',
    preview: `${BASE}taplink/galushchenko.png`,
    screens: [`${BASE}taplink/galushchenko.png`, `${BASE}taplink/license.png`],
  },
  {
    num: '02',
    name: 'Анна Холодова',
    url: 'https://taplink.cc/anuta_trener',
    task: 'Собрать несколько направлений в одной понятной странице.',
    taskShort: 'Собрать несколько направлений в одной понятной странице.',
    taskText: 'У Анны несколько разных направлений: фитнес и йога, нутрициология, психология и коучинг. Если просто перечислить всё подряд, человеку трудно понять, чем именно Анна может быть полезна ему.',
    solution: 'Разобрала направления и собрала их в одну понятную систему. Продумала структуру, логику переходов, тексты и визуальную концепцию так, чтобы разные услуги не спорили друг с другом, а воспринимались как части одной практики.',
    feature: 'Вместо набора разрозненных услуг появилась одна точка входа: человек знакомится с экспертом и дальше выбирает именно то направление, которое ему нужно.',
    preview: `${BASE}taplink/kholodova.png`,
    screens: [`${BASE}taplink/kholodova.png`, `${BASE}taplink/psychologist.png`],
  },
  {
    num: '03',
    name: 'Любовь Степанова',
    url: 'https://taplink.cc/dr_stepanova',
    task: 'Показать экспертность и дать два понятных маршрута.',
    taskShort: 'Показать экспертность и дать два понятных маршрута.',
    taskText: 'У Любови Николаевны огромный профессиональный опыт — врач, кандидат медицинских наук, преподаватель. Но материалов для современной страницы было немного, а новое направление с MInternational нужно было связать с её медицинской экспертностью естественно, без ощущения каталога продукции.',
    solution: 'Сначала собрала историю самого специалиста и отобрала то, что действительно помогает увидеть её опыт и уровень. Выстроила структуру и тексты, а когда подходящих фотографий не хватило, создала нейрофотографии специально для проекта.',
    feature: 'В центре страницы остался человек и его многолетняя врачебная практика. А новое направление стало логичным продолжением этой истории, а не отдельным рекламным блоком.',
    preview: `${BASE}taplink/stepanova.png`,
    screens: [`${BASE}taplink/stepanova.png`, `${BASE}taplink/consultation.png`],
  },
  {
    num: '04',
    name: 'Анна Панферова',
    url: 'https://taplink.cc/anna_panferova_moon',
    task: 'Создать небольшую двухстраничную систему для разных сценариев.',
    taskShort: 'Создать небольшую двухстраничную систему для разных сценариев.',
    taskText: 'Здесь одной страницы было мало. У Анны есть индивидуальная работа и отдельная программа «Твоя сила внутри» — два разных сценария, которые не стоило смешивать в одну длинную страницу.',
    solution: 'Разобрала исходные материалы, переработала тексты и разделила содержание на два маршрута. Собрала личную страницу эксперта и отдельную страницу программы, связав их между собой одной визуальной системой.',
    feature: 'Получился уже не просто Taplink-визитка, а небольшая система из двух страниц: человек может познакомиться с Анной и индивидуальной работой или отдельно перейти к программе «Твоя сила внутри».',
    preview: `${BASE}taplink/panferova.png`,
    screens: [`${BASE}taplink/panferova.png`, `${BASE}taplink/course-viewer.png`],
  },
]

function Viewer({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose, onPrev, onNext])

  function onOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose()
  }

  return (
    <div
      className="tp-viewer"
      ref={overlayRef}
      onClick={onOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} — проект ${project.num}`}
    >
      <div className="tp-viewer__inner">
        <div className="tp-viewer__header">
          <div className="tp-viewer__meta">
            <span className="tp-viewer__num">{project.num}</span>
            <span className="tp-viewer__name">{ruTypo(project.name)}</span>
          </div>
          <p className="tp-viewer__task">{ruTypo(project.taskShort)}</p>
          <button
            className="tp-viewer__close"
            onClick={onClose}
            aria-label="Закрыть"
            ref={closeRef}
          >
            ×
          </button>
        </div>

        <div className="tp-viewer__case">
          <div className="tp-viewer__text">
            <div className="tp-viewer__block">
              <h4 className="tp-viewer__label">НА СТАРТЕ</h4>
              <p className="tp-viewer__desc">{ruTypo(project.taskText)}</p>
            </div>
            <div className="tp-viewer__block">
              <h4 className="tp-viewer__label">ЧТО Я СДЕЛАЛА</h4>
              <p className="tp-viewer__desc">{ruTypo(project.solution)}</p>
            </div>
            <div className="tp-viewer__block">
              <h4 className="tp-viewer__label">В ИТОГЕ</h4>
              <p className="tp-viewer__desc">{ruTypo(project.feature)}</p>
            </div>
            <a
              className="tp-viewer__link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Открыть Taplink проекта ${project.name}`}
            >
              Открыть реальный Taplink ↗
            </a>
          </div>

          <div className="tp-viewer__screens" data-project={project.num}>
            {project.screens.map((src, i) => (
              <div
                key={i}
                className="tp-viewer__screen-item"
                data-project={project.num}
                data-screen={i + 1}
              >
                <span className="tp-viewer__screen-label">{String(i + 1).padStart(2, '0')}</span>
                <div className="tp-viewer__image-area" data-project={project.num}>
                  <img
                    className="tp-viewer__screen"
                    src={src}
                    alt={`${ruTypo(project.name)} — экран ${i + 1}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tp-viewer__nav">
          <button
            className="tp-viewer__nav-btn"
            onClick={onPrev}
            aria-label="Предыдущий проект"
          >
            ← предыдущий
          </button>
          <span className="tp-viewer__counter">
            {project.num} / 04
          </span>
          <button
            className="tp-viewer__nav-btn"
            onClick={onNext}
            aria-label="Следующий проект"
          >
            следующий →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TaplinkProjectsShowcase() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const open = useCallback((i: number) => setViewerIndex(i), [])

  const close = useCallback(() => {
    const idx = viewerIndex
    setViewerIndex(null)
    if (idx !== null) {
      requestAnimationFrame(() => triggerRefs.current[idx]?.focus())
    }
  }, [viewerIndex])

  const prev = useCallback(() => {
    setViewerIndex((i) => (i !== null ? (i + PROJECTS.length - 1) % PROJECTS.length : null))
  }, [])

  const next = useCallback(() => {
    setViewerIndex((i) => (i !== null ? (i + 1) % PROJECTS.length : null))
  }, [])

  return (
    <section className="tp-showcase">
      <div className="tp-showcase__inner">
        <div className="tp-showcase__header">
          <p className="tp-showcase__eyebrow">ПРОЕКТЫ</p>
          <h2 className="tp-showcase__title">
            {ruTypo('Четыре эксперта.')}<br />
            {ruTypo('Четыре разные задачи')}
          </h2>
          <p className="tp-showcase__desc">
            {ruTypo(
              'Taplink может решать разные задачи — от простой страницы для записи до небольшой системы с несколькими маршрутами. Здесь четыре проекта с разной логикой, структурой и визуальным характером.'
            )}
          </p>
        </div>

        <div className="tp-showcase__grid">
          {PROJECTS.map((p, i) => (
            <button
              key={p.num}
              className="tp-showcase__item"
              onClick={() => open(i)}
              ref={(el) => { triggerRefs.current[i] = el }}
              aria-label={`Открыть проект ${p.num} — ${p.name}`}
            >
              <div className="tp-showcase__stage">
                <img
                  className="tp-showcase__screen tp-showcase__screen--main"
                  src={p.preview}
                  alt=""
                  draggable={false}
                  loading="lazy"
                />
                <img
                  className="tp-showcase__screen tp-showcase__screen--second"
                  src={p.screens[1]}
                  alt=""
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <div className="tp-showcase__item-info">
                <span className="tp-showcase__item-num">{p.num} /</span>
                <h3 className="tp-showcase__item-name">{ruTypo(p.name)}</h3>
                <p className="tp-showcase__item-task">
                  {ruTypo(p.task)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {viewerIndex !== null && (
        <Viewer
          project={PROJECTS[viewerIndex]}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  )
}
