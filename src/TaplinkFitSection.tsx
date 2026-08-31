import './TaplinkFitSection.css'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'

const ITEMS = [
  {
    num: '01',
    title: 'Клиенты заходят с телефона',
    desc: 'Ссылку открывают из соцсетей, мессенджеров или рекламы — и страницу удобно посмотреть сразу на смартфоне.',
  },
  {
    num: '02',
    title: 'Нужно быстро показать главное',
    desc: 'Кто вы, с чем помогаете, какие есть услуги и как записаться — без долгого поиска по большому сайту.',
  },
  {
    num: '03',
    title: 'У вас небольшая практика',
    desc: 'Если вы работаете самостоятельно или у вас немного направлений, большой многостраничный сайт может быть просто не нужен.',
  },
  {
    num: '04',
    title: 'Вся информация — в одном месте',
    desc: 'Услуги, информация о вас, отзывы, контакты и запись собраны на одной странице. Человеку не нужно искать всё это в разных соцсетях и сообщениях.',
  },
]

export default function TaplinkFitSection() {
  return (
    <section className="tp-fit">
      <HeroParticleField alphaMultiplier={0.45} cursorForceMultiplier={0.5} />
      <div className="tp-fit__inner">
        <div className="tp-fit__text">
          <p className="tp-fit__eyebrow">КОГДА ЭТОГО ДОСТАТОЧНО</p>
          <h2 className="tp-fit__title">
            {ruTypo('Когда Taplink — подходящий формат')}
          </h2>
          <p className="tp-fit__desc">
            {ruTypo(
              'Taplink подойдёт, если ваши клиенты чаще открывают ссылку с телефона — из соцсетей, мессенджеров, рекламы или сообщения.'
            )}
          </p>
          <p className="tp-fit__desc tp-fit__desc--secondary">
            {ruTypo(
              'Когда не нужен большой сайт, а важно быстро понять, кто вы, с чем к вам можно обратиться и как сделать следующий шаг.'
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
