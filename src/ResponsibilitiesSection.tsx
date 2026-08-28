import { useInView } from './hooks/useInView'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'
import './ResponsibilitiesSection.css'

const items = [
  {
    num: '01',
    label: 'СТРУКТУРА И ТЕКСТЫ',
    title: ruTypo('Помогаю собрать главное'),
    text: ruTypo('Определяю логику страницы, помогаю разобрать материалы и сформулировать тексты так, чтобы человеку было понятно, кто вы, чем можете помочь и что делать дальше.'),
  },
  {
    num: '02',
    label: 'ВИЗУАЛ И AI',
    title: ruTypo('Создаю цельный образ проекта'),
    text: ruTypo('Подбираю визуальное направление. Если не хватает фотографий, графики или видео — подключаю AI и создаю материалы в едином стиле.'),
  },
  {
    num: '03',
    label: 'РАЗРАБОТКА И ЗАПУСК',
    title: ruTypo('Довожу до рабочего сайта'),
    text: ruTypo('Собираю сайт, адаптирую под разные экраны, проверяю основные сценарии и довожу проект до запуска — не оставляю его на уровне макета.'),
  },
]

export default function ResponsibilitiesSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section
      ref={ref}
      className={`resp${inView ? ' resp--in-view' : ''}`}
    >
      <HeroParticleField />
      <div className="resp__inner">
        <div className="resp__header">
          <div className="resp__eyebrow">
            ЧТО БЕРУ НА СЕБЯ
          </div>

          <h2 className="resp__title">
            {ruTypo('Вам ')}<span className="resp__title-accent">{ruTypo('не нужно')}</span>{ruTypo(' приходить')}
            <br />
            {ruTypo('с готовым решением')}
          </h2>

          <p className="resp__desc">
            {ruTypo('Достаточно рассказать о задаче. Я помогу определить, что важно показать, как это сформулировать и как собрать всё в работающий проект.')}
          </p>
        </div>

        <div className="resp__columns">
          {items.map((item) => (
            <div key={item.num} className="resp__col">
              <div className="resp__col-head">
                <span className="resp__col-num">{item.num}</span>
                <span className="resp__col-label">/ {item.label}</span>
              </div>
              <h3 className="resp__col-title">{item.title}</h3>
              <p className="resp__col-text">{item.text}</p>
            </div>
          ))}
        </div>

        <p className="resp__footer">
          {ruTypo('Большую часть работы можно собрать в одном проекте — без постоянной передачи задачи между разными специалистами.')}
        </p>
      </div>
    </section>
  )
}
