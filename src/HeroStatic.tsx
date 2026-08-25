import { useEffect, useState } from 'react'
import './HeroStatic.css'
import { ruTypo } from './lib/typography'
import ProjectPointCloud from './ProjectPointCloud'
import HeroParticleField from './HeroParticleField'
import HeroCursor from './HeroCursor'

function HeroStatic() {
  const [introReady, setIntroReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setIntroReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className={`hero${introReady ? ' hero--intro-ready' : ''}`}>
      <HeroCursor />
      <HeroParticleField />
      <header className="hero__head">
        <p className="hero__tag hero__intro-item hero__intro-item--tag">
          <span className="hero__tag-mark" />
          WEB DESIGN · AI VISUALS · DIGITAL PRODUCTS
        </p>
        <div className="hero__wordmark-wrap">
          <h1 className="hero__wordmark">TUIANA DESIGN</h1>
        </div>
      </header>
      <div className="hero__projects">
        <div className="hero__projects-group">
        <div className="hero__screen hero__screen--dari hero__intro-item hero__intro-item--dari">
          <img src="/hero/dari.png" alt="Проект DARI" draggable={false} />
          <div className="dari__interactive-layer">
            <ProjectPointCloud
              imageSrc="/hero/dari.png"
              sampling={6}
              particleRadius={0.7}
              baseAlpha={0}
              crop={{ mode: 'heightFit', translateXPercent: 0.12 }}
              interactionRadius={145}
              maxDisplacement={28}
              returnDamping={0.11}
              activeAlpha={0.95}
              activeRadius={1.2}
              interactionStrength={1.0}
              tintColor="#D58A5C"
              tintStrength={0.4}
            />
          </div>
        </div>
        <div className="hero__screen hero__screen--baza hero__intro-item hero__intro-item--baza">
          <img src="/hero/nasha-baza.png" alt="Проект Наша База" draggable={false} />
          <div className="baza__interactive-layer">
            <ProjectPointCloud
              imageSrc="/hero/nasha-baza.png"
              sampling={6}
              particleRadius={0.65}
              baseAlpha={0}
              crop={{ mode: 'coverFit', objectPositionPercent: 52 }}
              interactionRadius={125}
              maxDisplacement={20}
              returnDamping={0.07}
              activeAlpha={0.90}
              activeRadius={1.08}
              interactionStrength={0.78}
              tintColor="#D58A5C"
              tintStrength={0.38}
              velocityInfluence={0.14}
            />
          </div>
        </div>
        </div>
      </div>
      <footer className="hero__foot">
        <div className="hero__intro-item hero__intro-item--foot">
          <p className="hero__eyebrow">САЙТЫ ПОД КЛЮЧ</p>
          <p className="hero__lead">
            {ruTypo('Для врачей и экспертов')}
            <br />
            {ruTypo('с личной практикой')}
          </p>
          <p className="hero__meta">{ruTypo('Стратегия · структура · тексты · дизайн · запуск')}</p>
        </div>
        <a href="#contact" className="hero__cta hero__intro-item hero__intro-item--cta">
          <span>Обсудить проект</span>
          <span className="hero__cta-arrow" aria-hidden="true">→</span>
        </a>
      </footer>
    </section>
  )
}

export default HeroStatic
