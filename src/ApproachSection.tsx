import './ApproachSection.css'
import { ruTypo } from './lib/typography'
import { useInView } from './hooks/useInView'

function ApproachSection() {
  const { ref, inView } = useInView(0.2)

  return (
    <section ref={ref} className={`approach${inView ? ' approach--in-view' : ''}`}>
      <p className="approach__label approach__anim approach__anim--label">01 · APPROACH</p>

      <div className="approach__body">
        <div className="approach__left">
          <h2 className="approach__manifesto">
            <span className="approach__line approach__line--1 approach__anim">САЙТ —</span>
            <br />
            <span className="approach__line approach__line--2 approach__anim">ЭТО НЕ КАРТИНКА.</span>
            <br />
            <span className="approach__accent approach__line--3 approach__anim">ЭТО СИСТЕМА</span>
          </h2>

          <p className="approach__conclusion approach__anim">
            {ruTypo('Поэтому я начинаю не с цвета кнопок,')}
            <br />
            {ruTypo('а с проработки ')}
            <span className="approach__conclusion-accent">структуры</span>,{' '}
            <span className="approach__conclusion-accent">смыслов</span>{' '}
            {ruTypo('и пути человека по сайту.')}
          </p>
        </div>

        <div className="approach__aside">
          <p className="approach__aside-title approach__anim">
            {ruTypo('Человек должен за несколько секунд понять:')}
          </p>
          <div className="approach__route">
            <span className="approach__route-line approach__anim" />
            <ol className="approach__list" role="list">
              <li className="approach__item approach__anim">
                <span className="approach__node" />
                <span className="approach__num">01</span>
                <span className="approach__item-text">Кто вы</span>
              </li>
              <li className="approach__item approach__anim">
                <span className="approach__node" />
                <span className="approach__num">02</span>
                <span className="approach__item-text">Чем можете помочь</span>
              </li>
              <li className="approach__item approach__anim">
                <span className="approach__node" />
                <span className="approach__num">03</span>
                <span className="approach__item-text">{ruTypo('Почему вам можно доверять')}</span>
              </li>
              <li className="approach__item approach__anim">
                <span className="approach__node" />
                <span className="approach__num">04</span>
                <span className="approach__item-text">Как записаться или оставить заявку</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachSection
