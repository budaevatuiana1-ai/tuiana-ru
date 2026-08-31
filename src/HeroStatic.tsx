import { useEffect, useState, useCallback } from 'react'
import './HeroStatic.css'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'

const BASE = import.meta.env.BASE_URL

function HeroStatic() {
  const [introReady, setIntroReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setIntroReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const handleContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const el = document.getElementById('contact')
    if (el) el.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <section className={`hero${introReady ? ' hero--intro-ready' : ''}`}>
      <HeroParticleField />
      <header className="hero__head">
        <p className="hero__tag hero__intro-item hero__intro-item--tag">
          <span className="hero__tag-mark" />
          WEB DESIGN · AI VISUALS · DIGITAL PRODUCTS
        </p>
        <div className="hero__wordmark-wrap">
          <span className="hero__wordmark">TUIANA DESIGN</span>
        </div>
      </header>
      <div className="hero__projects">
        <div className="hero__projects-group">
        <div className="hero__screen hero__screen--dari hero__intro-item hero__intro-item--dari">
          <img src={`${BASE}hero/dari.png`} alt="Проект Дари" draggable={false} />
        </div>
        <div className="hero__screen hero__screen--baza hero__intro-item hero__intro-item--baza">
          <img src={`${BASE}hero/nasha-baza.png`} alt="Проект Наша База" draggable={false} />
        </div>
        </div>
      </div>
      <footer className="hero__foot">
        <div className="hero__intro-item hero__intro-item--foot">
          <h1>
            <span className="hero__eyebrow">САЙТЫ ПОД КЛЮЧ</span>
            <span className="hero__lead">
              {ruTypo('Для врачей и экспертов')}
              <br />
              {ruTypo('с личной практикой')}
            </span>
          </h1>
          <p className="hero__meta">{ruTypo('Стратегия · структура · тексты · дизайн · запуск')}</p>
        </div>
        <a href="#contact" className="hero__cta hero__intro-item hero__intro-item--cta" onClick={handleContact}>
          <span>Обсудить проект</span>
          <span className="hero__cta-arrow" aria-hidden="true">→</span>
        </a>
      </footer>
    </section>
  )
}

export default HeroStatic
