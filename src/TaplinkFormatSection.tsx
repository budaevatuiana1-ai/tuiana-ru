import './TaplinkFormatSection.css'
import { ruTypo } from './lib/typography'

const BASE = import.meta.env.BASE_URL

export default function TaplinkFormatSection() {
  return (
    <section className="tp-format">
      <div className="tp-format__inner">
        <div className="tp-format__text">
          <p className="tp-format__eyebrow">КАК ЭТО ВЫГЛЯДИТ</p>
          <h2 className="tp-format__title">
            {ruTypo('Taplink в\u00A0первую очередь рассчитан на\u00A0телефон')}
          </h2>
          <p className="tp-format__desc">
            {ruTypo(
              'Большинство людей открывают такой сайт из\u00A0соцсетей, мессенджеров, рекламы или по\u00A0QR-коду. Поэтому структура и\u00A0дизайн в\u00A0первую очередь рассчитаны на\u00A0экран смартфона.'
            )}
          </p>

          <div className="tp-format__divider" />

          <h3 className="tp-format__subtitle">А что будет на{'\u00A0'}компьютере?</h3>
          <p className="tp-format__desc">
            {ruTypo(
              'На\u00A0большом экране Taplink сохраняет компактный вертикальный формат и\u00A0не растягивается на\u00A0всю ширину монитора, как обычный сайт.'
            )}
          </p>
          <p className="tp-format__accent">
            {ruTypo('Это особенность формата, а\u00A0не ошибка адаптации.')}
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
