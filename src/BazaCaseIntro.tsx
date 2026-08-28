import './BazaCaseIntro.css'
import { ruTypo } from './lib/typography'
import CtaButton from './CtaButton'

const BASE = import.meta.env.BASE_URL

export default function BazaCaseIntro() {
  return (
    <section className="baza-case">
      <div className="baza-case__inner">
        <div className="baza-case__text">
          <p className="baza-case__eyebrow">
            КЕЙС{' '}
            <span className="baza-case__eyebrow-accent">02</span>
          </p>
          <h2 className="baza-case__title">BAZA</h2>
          <p className="baza-case__subtitle">
            {ruTypo('Многостраничный контентный проект')}
          </p>
          <p className="baza-case__desc">
            {ruTypo(
              'Структура, визуальная подача и отдельные страницы собраны в единую систему.'
            )}
          </p>
          <p className="baza-case__meta">
            STRUCTURE / UX / DESIGN / CONTENT / DEVELOPMENT
          </p>
          <CtaButton
            to="/projects/baza"
            onClick={() => {
              sessionStorage.setItem(
                'tuiana-baza-return-scroll',
                String(window.scrollY)
              )
            }}
          >
            Смотреть кейс
          </CtaButton>
        </div>
        <div className="baza-case__visual">
          <img
            className="baza-case__screenshot"
            src={`${BASE}hero/nasha-baza.png`}
            alt={ruTypo('Сайт BAZA — главная страница')}
            width="1920"
            height="1080"
          />
        </div>
      </div>

      <div className="sd-facts">
        <div className="sd-facts__line" />
        <div className="sd-facts__grid">
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">01</span>{' '}
              /&nbsp;СТРУКТУРА
            </p>
            <p className="sd-facts__text">
              Разделы · отдельные страницы · сценарии
            </p>
          </div>
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">02</span>{' '}
              /&nbsp;КОНТЕНТ
            </p>
            <p className="sd-facts__text">
              Иерархия · навигация · визуальная подача
            </p>
          </div>
          <div className="sd-facts__item">
            <p className="sd-facts__label">
              <span className="sd-facts__num">03</span>{' '}
              /&nbsp;РЕЗУЛЬТАТ
            </p>
            <p className="sd-facts__text">
              Многостраничный проект · реальный запуск
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
