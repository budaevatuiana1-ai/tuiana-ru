import './DariCaseIntro.css'
import { ruTypo } from './lib/typography'

export default function DariCaseIntro() {
  return (
    <section className="dari-case">
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
        </div>
        <div className="dari-case__visual">
          <img
            className="dari-case__screenshot"
            src="/dari-hero.png"
            alt={ruTypo('Сайт DARI — главная страница')}
            width="1920"
            height="1080"
          />
        </div>
      </div>
    </section>
  )
}
