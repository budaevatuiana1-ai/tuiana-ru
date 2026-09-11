import { useState, useEffect } from 'react'
import './TaplinkProjectsHero.css'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'

const BASE = import.meta.env.BASE_URL

export default function TaplinkProjectsHero() {
  const [fontsReady, setFontsReady] = useState(false)

  useEffect(() => {
    document.fonts.ready
      .then(() => setFontsReady(true))
      .catch(() => setFontsReady(true))
  }, [])

  return (
    <section className="tp-hero tp-hero--dotted">
      <HeroParticleField
        alphaMultiplier={1}
        cursorForceMultiplier={0.4}
        baseColor={{ r: 0, g: 0, b: 0 }}
        hoverColor={{ r: 255, g: 0, b: 0 }}
      />
      <div className="tp-hero__inner">
        <div className={`tp-hero__text${fontsReady ? ' tp-hero__text--ready' : ''}`}>
          <p className="tp-hero__eyebrow">
            МИНИ-САЙТ НА TAPLINK
          </p>
          <h1 className="tp-hero__title">
            Сайт-визитка
            <br />
            и{'\u00A0'}мини-сайт
            <br />
            <span className="tp-hero__accent">на{'\u00A0'}Taplink</span>
          </h1>
          <p className="tp-hero__desc">
            {ruTypo('Компактный сайт для специалиста или бизнеса — с понятной структурой, индивидуальным оформлением и\u00A0всем необходимым для записи или обращения.')}
          </p>
          <p className="tp-hero__sub">
            {ruTypo(
              'Сайт на\u00A0Taplink обычно стоит дешевле отдельной разработки: основные инструменты уже есть внутри\u00A0платформы.'
            )}
          </p>
          <div className="tp-hero__cta">
            <a className="cta-button cta-button--secondary" href="#taplink-projects">
              <span>Посмотреть проекты</span>
              <span className="cta-button__arrow" aria-hidden="true">↓</span>
            </a>
            <a className="cta-button" href="#contact">
              <span>Обсудить мини-сайт</span>
              <span className="cta-button__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="tp-hero__visual">
          <img
            className="tp-hero__img"
            src={`${BASE}taplink/hero-mini-sites-phones-q92.webp`}
            alt={ruTypo('Три телефона с\u00A0экранами мини-сайтов для специалистов')}
            width={1672}
            height={941}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </section>
  )
}
