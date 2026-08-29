import { Link } from 'react-router-dom'
import './DariCaseIntro.css'
import { ruTypo } from './lib/typography'
import CtaButton from './CtaButton'

const BASE = import.meta.env.BASE_URL

export default function DariCaseIntro() {
  return (
    <section id="cases" className="dari-case">
      <div className="dari-case__main" id="dari-case-content">
        <div className="dari-case__inner">
          <div className="dari-case__text">
            <p className="dari-case__eyebrow">
              КЕЙС <span className="dari-case__eyebrow-accent">01</span>
            </p>
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
              src={`${BASE}dari-hero.webp`}
              alt={ruTypo('Сайт DARI — главная страница')}
              width="1920"
              height="1080"
            />
          </Link>
        </div>
      </div>

      <div className="sd-facts">
        <div className="sd-facts__line" />
        <div className="sd-facts__grid">
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">01</span>{' '}
              /&nbsp;АРХИТЕКТУРА
            </p>
            <p className="sd-facts__text">
              Услуги · специалисты · цены · БАДы
            </p>
          </div>
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">02</span>{' '}
              /&nbsp;LEGAL
            </p>
            <p className="sd-facts__text">
              Лицензия · согласия · документы
            </p>
          </div>
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">03</span>{' '}
              /&nbsp;ЗАПУСК
            </p>
            <p className="sd-facts__text">
              Адаптив · формы · рабочий сайт
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
