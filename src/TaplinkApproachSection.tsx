import './TaplinkApproachSection.css'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'

const STEPS = [
  {
    num: '01',
    title: 'Позиционирование',
    desc: 'Определяем, кто вы, с чем к вам приходят и что важно донести о вашей практике в первую очередь.',
  },
  {
    num: '02',
    title: 'Структура',
    desc: 'Расставляем информацию в логичном порядке, чтобы человек не искал нужное сам и не терялся по пути.',
  },
  {
    num: '03',
    title: 'Услуги',
    desc: 'Помогаем быстро понять, какие направления и форматы работы есть и что может подойти именно ему.',
  },
  {
    num: '04',
    title: 'Доверие',
    desc: 'Используем то, что действительно подтверждает экспертность: опыт, образование, отзывы, лицензии, кейсы и другие важные для конкретной практики факты.',
  },
  {
    num: '05',
    title: 'Запись',
    desc: 'Ведём к понятному следующему действию без лишних переходов и сложного маршрута.',
  },
]

export default function TaplinkApproachSection() {
  return (
    <section className="tp-approach tp-approach--dotted">
      <HeroParticleField
        alphaMultiplier={1}
        cursorForceMultiplier={0.4}
        baseColor={{ r: 0, g: 0, b: 0 }}
        hoverColor={{ r: 255, g: 0, b: 0 }}
      />
      <div className="tp-approach__inner">
        <div className="tp-approach__text">
          <p className="tp-approach__eyebrow">НЕ ТОЛЬКО ДИЗАЙН</p>
          <h2 className="tp-approach__title">
            {ruTypo('Мини-сайт начинается не с цвета кнопок')}
          </h2>
          <p className="tp-approach__desc">
            {ruTypo(
              'Сначала я разбираюсь, что человеку важно понять о вашей практике, в каком порядке показать информацию и что должно привести его к следующему шагу.'
            )}
          </p>
        </div>

        <div className="tp-approach__steps">
          {STEPS.map((s) => (
            <div key={s.num} className="tp-approach__step">
              <span className="tp-approach__step-num">{s.num}</span>
              <div className="tp-approach__step-body">
                <h3 className="tp-approach__step-title">{ruTypo(s.title)}</h3>
                <p className="tp-approach__step-desc">{ruTypo(s.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
