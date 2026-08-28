import './ApproachSection.css'
import { ruTypo } from './lib/typography'
import { useInView } from './hooks/useInView'

function ApproachSection() {
  const { ref, inView } = useInView(0.2)

  return (
    <section ref={ref} className={`approach${inView ? ' approach--in-view' : ''}`}>

      <div className="approach__body">
        <div className="approach__left">
          <p className="approach__label approach__anim approach__anim--label">ПОДХОД</p>
          <h2 className="approach__manifesto">
            <span className="approach__line approach__line--1 approach__anim">САЙТ —</span>
            <br />
            <span className="approach__line approach__line--2 approach__anim">ЭТО НЕ{'\u00A0'}КАРТИНКА.</span>
            <br />
            <span className="approach__accent approach__line--3 approach__anim">ЭТО СИСТЕМА</span>
          </h2>

          <p className="approach__conclusion approach__anim">
            {ruTypo('Поэтому сначала я продумываю ')}
            <span className="approach__conclusion-accent">структуру</span>,{' '}
            <span className="approach__conclusion-accent">смыслы</span>{' '}
            {ruTypo('и путь человека по сайту, а затем — его визуальное оформление.')}
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
                <div className="approach__item-content">
                  <span className="approach__item-text">Кто вы</span>
                  <p className="approach__item-desc">Ваша специализация, опыт и с какими запросами к&nbsp;вам можно обратиться.</p>
                </div>
              </li>
              <li className="approach__item approach__anim">
                <span className="approach__node" />
                <span className="approach__num">02</span>
                <div className="approach__item-content">
                  <span className="approach__item-text">Чем можете помочь</span>
                  <p className="approach__item-desc">Какие задачи вы решаете и к какому результату ведёте.</p>
                </div>
              </li>
              <li className="approach__item approach__anim">
                <span className="approach__node" />
                <span className="approach__num">03</span>
                <div className="approach__item-content">
                  <span className="approach__item-text">{ruTypo('Почему вам можно доверять')}</span>
                  <p className="approach__item-desc">Ваш подход, опыт, кейсы и другие доказательства компетентности.</p>
                </div>
              </li>
              <li className="approach__item approach__anim">
                <span className="approach__node" />
                <span className="approach__num">04</span>
                <div className="approach__item-content">
                  <span className="approach__item-text">Как записаться или оставить заявку</span>
                  <p className="approach__item-desc">Понятный следующий шаг без поиска контактов и лишних действий.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApproachSection
