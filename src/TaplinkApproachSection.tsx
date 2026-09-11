import './TaplinkApproachSection.css'
import { ruTypo } from './lib/typography'
import StaticParticleField from './StaticParticleField'

const STEPS = [
  {
    num: '01',
    title: 'О вас и\u00A0вашей работе',
    desc: 'Опыт, подход, образование, кейсы, портфолио и\u00A0отзывы.',
  },
  {
    num: '02',
    title: 'Услуги и\u00A0цены',
    desc: 'Направления работы, описание услуг, стоимость, пакеты и\u00A0условия.',
  },
  {
    num: '03',
    title: 'Запись и\u00A0обращение',
    desc: 'Формы, кнопки связи, мессенджеры, заявки и\u00A0другие удобные способы обратиться.',
  },
  {
    num: '04',
    title: 'Дополнительные страницы',
    desc: 'FAQ, подробные описания услуг, материалы, портфолио и\u00A0другие разделы, если они нужны.',
  },
]

export default function TaplinkApproachSection() {
  return (
    <section className="tp-approach tp-approach--dotted">
      <StaticParticleField alphaMultiplier={1} />
      <div className="tp-approach__inner">
        <div className="tp-approach__text">
          <p className="tp-approach__eyebrow">ВОЗМОЖНОСТИ</p>
          <h2 className="tp-approach__title">
            {ruTypo('Не просто ссылка в\u00A0профиле')}
          </h2>
          <p className="tp-approach__desc">
            {ruTypo(
              'На\u00A0Taplink можно собрать полноценную структуру под вашу задачу — от\u00A0знакомства с\u00A0вами до\u00A0записи или заявки.'
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
