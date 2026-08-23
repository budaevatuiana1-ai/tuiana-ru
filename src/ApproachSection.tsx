import './ApproachSection.css'
import { ruTypo } from './lib/typography'

function ApproachSection() {
  return (
    <section className="approach">
      <p className="approach__label">01 · APPROACH</p>

      <div className="approach__body">
        <h2 className="approach__manifesto">
          САЙТ —<br />
          НЕ КАРТИНКА.<br />
          <span className="approach__accent">ЭТО СИСТЕМА.</span>
        </h2>

        <div className="approach__aside">
          <p className="approach__aside-title">
            {ruTypo('Человек должен за несколько секунд понять:')}
          </p>
          <ol className="approach__list" role="list">
            <li className="approach__item">
              <span className="approach__num">01</span>
              <span>Кто вы</span>
            </li>
            <li className="approach__item">
              <span className="approach__num">02</span>
              <span>Чем можете помочь</span>
            </li>
            <li className="approach__item">
              <span className="approach__num">03</span>
              <span>{ruTypo('Почему вам можно доверять')}</span>
            </li>
            <li className="approach__item">
              <span className="approach__num">04</span>
              <span>Что сделать дальше</span>
            </li>
          </ol>
        </div>
      </div>

      <p className="approach__conclusion">
        {ruTypo('Поэтому я начинаю не с цвета кнопок,')}<br />
        а{' '}
        <span className="approach__conclusion-accent">структуры</span>,{' '}
        <span className="approach__conclusion-accent">смысла</span>{' '}
        {ruTypo('и пути человека по сайту.')}
      </p>
    </section>
  )
}

export default ApproachSection
