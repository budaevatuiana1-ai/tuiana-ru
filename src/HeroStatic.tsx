import './HeroStatic.css'
import { ruTypo } from './lib/typography'

function HeroStatic() {
  return (
    <section className="hero">
      <header className="hero__head">
        <p className="hero__tag">WEB DESIGN · AI · DIGITAL EXPERIENCES</p>
        <h1 className="hero__wordmark">TUIANA DESIGN</h1>
      </header>
      <div className="hero__projects">
        <div className="hero__screen hero__screen--dari">
          <img src="/hero/dari.png" alt="Проект DARI" draggable={false} />
        </div>
        <div className="hero__screen hero__screen--baza">
          <img src="/hero/nasha-baza.png" alt="Проект Наша База" draggable={false} />
        </div>

      </div>
      <footer className="hero__foot">
        <p className="hero__lead">
          {ruTypo('Веб-дизайн для врачей и экспертов с личной практикой.')}
        </p>
        <p className="hero__meta">{ruTypo('Структура · тексты · дизайн · запуск')}</p>
      </footer>
    </section>
  )
}

export default HeroStatic
