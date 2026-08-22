import './HeroStatic.css'
import { ruTypo } from './lib/typography'
import ProjectPointCloud from './ProjectPointCloud'
import HeroParticleField from './HeroParticleField'

function HeroStatic() {
  return (
    <section className="hero">
      <HeroParticleField />
      <header className="hero__head">
        <p className="hero__tag">WEB DESIGN · AI · DIGITAL EXPERIENCES</p>
        <h1 className="hero__wordmark">TUIANA DESIGN</h1>
      </header>
      <div className="hero__projects">
        <div className="hero__screen hero__screen--dari">
          <img src="/hero/dari.png" alt="Проект DARI" draggable={false} />
          <div className="dari__interactive-layer">
            <ProjectPointCloud
              imageSrc="/hero/dari.png"
              sampling={7}
              particleRadius={0.7}
              baseAlpha={0.08}
              crop={{ mode: 'heightFit', translateXPercent: 0.12 }}
            />
          </div>
        </div>
        <div className="hero__screen hero__screen--baza">
          <img src="/hero/nasha-baza.png" alt="Проект Наша База" draggable={false} />
          <div className="baza__interactive-layer">
            <ProjectPointCloud
              imageSrc="/hero/nasha-baza.png"
              sampling={8}
              particleRadius={0.65}
              baseAlpha={0.06}
              crop={{ mode: 'coverFit', objectPositionPercent: 52 }}
            />
          </div>
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
