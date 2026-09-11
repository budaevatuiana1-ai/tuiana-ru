import './TaplinkFitSection.css'
import { ruTypo } from './lib/typography'
import StaticParticleField from './StaticParticleField'

const ITEMS = [
  {
    num: '01',
    title: 'Всё важное в\u00A0одном месте',
    desc: 'Услуги, цены, опыт, отзывы и\u00A0контакты не приходится искать по\u00A0разным площадкам.',
  },
  {
    num: '02',
    title: 'Сразу понятно, чем вы можете помочь',
    desc: 'Человек быстро видит, что вы предлагаете, кому это подходит и\u00A0как с\u00A0вами связаться.',
  },
  {
    num: '03',
    title: 'Удобно вести людей из\u00A0соцсетей и\u00A0рекламы',
    desc: 'Одна ссылка из\u00A0профиля, сообщения, рекламы или QR-кода ведёт туда, где собрана нужная информация.',
  },
  {
    num: '04',
    title: 'Большой сайт пока не\u00A0нужен',
    desc: 'Когда задача компактная и\u00A0нет необходимости делать более сложный сайт с\u00A0большим количеством разделов и\u00A0функций.',
  },
]

export default function TaplinkFitSection() {
  return (
    <section className="tp-fit">
      <StaticParticleField alphaMultiplier={0.45} />
      <div className="tp-fit__inner">
        <div className="tp-fit__text">
          <p className="tp-fit__eyebrow">КОГДА ПОДХОДИТ</p>
          <h2 className="tp-fit__title">
            {ruTypo('Когда')} <span style={{ color: '#D58A5C' }}>Taplink</span> {ruTypo('— подходящий формат')}
          </h2>
          <p className="tp-fit__desc">
            {ruTypo(
              'Taplink подходит, когда нужно собрать основную информацию о\u00A0вас или бизнесе в\u00A0одном месте и\u00A0дать человеку понятный путь к\u00A0записи или обращению.'
            )}
          </p>
          <p className="tp-fit__desc tp-fit__desc--secondary">
            {ruTypo(
              'Это хороший вариант, если отдельный большой сайт пока не\u00A0нужен, а\u00A0одной ссылки на\u00A0соцсети уже мало.'
            )}
          </p>
        </div>

        <div className="tp-fit__list">
          {ITEMS.map((item) => (
            <div key={item.num} className="tp-fit__item">
              <span className="tp-fit__item-num">{item.num}</span>
              <div className="tp-fit__item-body">
                <h3 className="tp-fit__item-title">{ruTypo(item.title)}</h3>
                <p className="tp-fit__item-desc">{ruTypo(item.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
