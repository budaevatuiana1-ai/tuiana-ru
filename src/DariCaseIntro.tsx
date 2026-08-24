import { Link } from 'react-router-dom'
import './DariCaseIntro.css'
import { ruTypo } from './lib/typography'
import CtaButton from './CtaButton'

export default function DariCaseIntro() {
  return (
    <section id="dari-case" className="dari-case">
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
          <CtaButton to="/projects/dari">Смотреть кейс</CtaButton>
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
    </section>
  )
}
