import { ruTypo } from './lib/typography'
import './TaplinkPricingSection.css'

export default function TaplinkPricingSection() {
  return (
    <section className="tp-pricing">
      <div className="tp-pricing__inner">
        <div className="tp-pricing__grid">
          <div className="tp-pricing__left">
            <p className="tp-pricing__eyebrow">СТОИМОСТЬ И СОСТАВ</p>
            <h2 className="tp-pricing__title">
              {ruTypo('Мини-сайт на Taplink под ключ')}
            </h2>
            <p className="tp-pricing__desc">
              {ruTypo('Беру на себя весь путь — от структуры и текстов до сборки и публикации сайта.')}
            </p>

            <p className="tp-pricing__accent">
              {ruTypo('Можно прийти без готовой структуры и текстов.')}
            </p>

            <p className="tp-pricing__section-label">Что входит:</p>
            <ul className="tp-pricing__list">
              <li>разбор задачи;</li>
              <li>структура сайта;</li>
              <li>помощь с текстами;</li>
              <li>визуальная концепция;</li>
              <li>индивидуальное оформление;</li>
              <li>сборка{'\u00A0'}в Taplink;</li>
              <li>формы и кнопки связи;</li>
              <li>подключение нужных функций;</li>
              <li>проверка на телефоне{'\u00A0'}и компьютере;</li>
              <li>публикация.</li>
            </ul>
          </div>

          <div className="tp-pricing__right">
            <div className="tp-pricing__right-top">
              <div className="tp-pricing__price-block">
                <p className="tp-pricing__price">от 15{'\u00A0'}000{'\u00A0'}₽</p>
                <p className="tp-pricing__price-note">
                  Базовый формат — одностраничный мини-сайт{'\u00A0'}до{'\u00A0'}7 смысловых блоков.
                </p>
              </div>

              <div className="tp-pricing__sep" />

              <p className="tp-pricing__extra-price">
                Дополнительная внутренняя страница — от 5{'\u00A0'}000{'\u00A0'}₽.
              </p>
              <p className="tp-pricing__extra">
                {ruTypo('Более сложная структура, дополнительные формы и нестандартные элементы рассчитываются отдельно.')}
              </p>
            </div>

            <div className="tp-pricing__tariff-group">
              <div className="tp-pricing__sep" />
              <p className="tp-pricing__tariff-label">Тариф Taplink оплачивается отдельно.</p>
              <p className="tp-pricing__tariff-desc">
                {ruTypo('У Taplink есть свои тарифы. Перед началом работы я скажу, какой понадобится для вашей задачи. Если нужен собственный домен, он тоже оплачивается отдельно.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
