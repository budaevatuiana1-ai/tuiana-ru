import { Link } from 'react-router-dom'
import './DariCaseIntro.css'
import { ruTypo } from './lib/typography'
import CtaButton from './CtaButton'

export default function DariCaseIntro() {
  return (
    <section id="dari-case" className="dari-case">
      <div className="dari-case__main" id="dari-case-content">
        <div className="dari-case__inner">
          <div className="dari-case__text">
            <p className="dari-case__eyebrow">SELECTED CASE / 01</p>
            <h2 className="dari-case__title">DARI</h2>
            <p className="dari-case__subtitle">
              {ruTypo('Многостраничный сайт медицинской клиники')}
            </p>
            <p className="dari-case__desc">
              {ruTypo(
                'Из сложной структуры услуг, специалистов, цен, БАДов и обязательной документации — в понятную цифровую систему для пациента.'
              )}
            </p>
            <p className="dari-case__meta">
              UX / STRUCTURE / COPY / DESIGN / DEVELOPMENT / LEGAL
            </p>
            <CtaButton
              to="/projects/dari"
              onClick={() => {
                sessionStorage.setItem(
                  'tuiana-case-return-scroll',
                  String(window.scrollY)
                )
              }}
            >
              Смотреть кейс
            </CtaButton>
          </div>
          <Link to="/projects/dari" className="dari-case__visual">
            <img
              className="dari-case__screenshot"
              src="/dari-hero.png"
              alt={ruTypo('Сайт DARI — главная страница')}
              width="1920"
              height="1080"
            />
          </Link>
        </div>
      </div>

      <div className="dari-case__facts">
        <div className="dari-case__facts-line" />
        <div className="dari-case__facts-grid">
          <div className="dari-case__fact">
            <p className="dari-case__fact-label">
              <span className="dari-case__fact-num">01</span>{' '}
              /&nbsp;АРХИТЕКТУРА
            </p>
            <p className="dari-case__fact-text">
              Услуги · специалисты · цены · БАДы
            </p>
          </div>
          <div className="dari-case__fact">
            <p className="dari-case__fact-label">
              <span className="dari-case__fact-num">02</span>{' '}
              /&nbsp;LEGAL
            </p>
            <p className="dari-case__fact-text">
              Лицензия · согласия · документы
            </p>
          </div>
          <div className="dari-case__fact">
            <p className="dari-case__fact-label">
              <span className="dari-case__fact-num">03</span>{' '}
              /&nbsp;ЗАПУСК
            </p>
            <p className="dari-case__fact-text">
              Адаптив · формы · рабочий сайт
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
