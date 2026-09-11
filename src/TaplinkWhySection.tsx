import { ruTypo } from './lib/typography'
import './TaplinkWhySection.css'

export default function TaplinkWhySection() {
  return (
    <section className="tp-why">
      <div className="tp-why__inner">
        <div className="tp-why__header">
          <div className="tp-why__left">
            <p className="tp-why__eyebrow">ПОЧЕМУ ДЕШЕВЛЕ</p>
            <h2 className="tp-why__title">
              {ruTypo('Почему сайт на Taplink стоит дешевле')}
            </h2>
          </div>
          <div className="tp-why__right">
            <p className="tp-why__desc">
              {ruTypo(
                'В Taplink уже есть готовая основа для сайта: страницы, формы, кнопки, хостинг и другие нужные инструменты. Поэтому не нужно отдельно создавать всё это с нуля — и разработка обычно стоит дешевле.'
              )}
            </p>
          </div>
        </div>

        <div className="tp-why__sep" />

        <div className="tp-why__compare">
          <div className="tp-why__col">
            <h3 className="tp-why__col-title tp-why__col-title--taplink">Taplink — для{'\u00A0'}компактной задачи</h3>
            <ul className="tp-why__list">
              <li>ниже стоимость разработки;</li>
              <li>основные инструменты уже есть внутри платформы;</li>
              <li>хорошо подходит для компактных задач;</li>
              <li>дизайн и функции ограничены возможностями Taplink.</li>
            </ul>
          </div>
          <div className="tp-why__divider" />
          <div className="tp-why__col">
            <h3 className="tp-why__col-title">Отдельный сайт — когда нужно больше свободы</h3>
            <ul className="tp-why__list">
              <li>больше свободы в дизайне и структуре;</li>
              <li>подходит для более сложных проектов;</li>
              <li>можно реализовать нестандартные функции;</li>
              <li>больше возможностей для поискового продвижения.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
