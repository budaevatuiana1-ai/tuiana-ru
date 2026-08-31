import './TaplinkFormatSection.css'
import { ruTypo } from './lib/typography'

const BASE = import.meta.env.BASE_URL

export default function TaplinkFormatSection() {
  return (
    <section className="tp-format">
      <div className="tp-format__inner">
        <div className="tp-format__text">
          <p className="tp-format__eyebrow">КАК ЭТО РАБОТАЕТ</p>
          <h2 className="tp-format__title">
            {ruTypo('Taplink создаётся прежде всего для телефона')}
          </h2>
          <p className="tp-format__desc">
            {ruTypo(
              'Большинство людей открывают такую страницу из соцсетей, мессенджеров или ссылки в профиле. Поэтому структура и дизайн в первую очередь рассчитаны на экран смартфона.'
            )}
          </p>

          <div className="tp-format__divider" />

          <h3 className="tp-format__subtitle">А что будет на компьютере?</h3>
          <p className="tp-format__desc">
            {ruTypo(
              'На большом экране Taplink выглядит как узкая вертикальная страница по центру. Он не растягивается на всю ширину монитора, как обычный сайт.'
            )}
          </p>
          <p className="tp-format__accent">
            {ruTypo('Это не ошибка адаптации, а особенность самого формата.')}
          </p>
        </div>

        <div className="tp-format__visual">
          <div className="tp-format__devices">
            <img
              className="tp-format__laptop"
              src={`${BASE}taplink/taplink-laptop.png`}
              alt=""
              draggable={false}
              loading="lazy"
            />
            <img
              className="tp-format__phone"
              src={`${BASE}taplink/taplink-phone.png`}
              alt={ruTypo('Taplink на телефоне и компьютере')}
              draggable={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
