import './HeroStatic.css'

function HeroStatic() {
  return (
    <section className="hero">
      <div className="hero__stage">
        <div className="hero__projects">
          <div className="hero__screen hero__screen--dari">
            <div className="hero__frame">
              <img src="/hero/dari.png" alt="Проект DARI" draggable={false} />
            </div>
          </div>
          <div className="hero__screen hero__screen--baza">
            <div className="hero__frame">
              <img src="/hero/nasha-baza.png" alt="Проект Наша База" draggable={false} />
            </div>
          </div>
          <div className="hero__screen hero__screen--atelier">
            <div className="hero__frame">
              <img src="/hero/atelier.png" alt="Проект Atelier" draggable={false} />
            </div>
          </div>
        </div>
        <div className="hero__portrait">
          <img src="/hero/tuiana.jpg" alt="Туяна" draggable={false} />
        </div>
        <div className="hero__copy">
          <p className="hero__eyebrow">TUIANA DESIGN · WEB &amp; AI DESIGN</p>
          <h1 className="hero__title">
            Сложную экспертизу
            <br />
            превращаю в <span className="hero__accent">понятный</span>
            <br />
            цифровой продукт
          </h1>
          <p className="hero__subtitle">
            Сайты для врачей и экспертов с личной практикой — структура, тексты, дизайн и запуск.
          </p>
          <div className="hero__actions">
            <button type="button" className="hero__btn hero__btn--primary">
              Обсудить проект
            </button>
            <button type="button" className="hero__btn hero__btn--ghost">
              Смотреть кейсы
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroStatic
