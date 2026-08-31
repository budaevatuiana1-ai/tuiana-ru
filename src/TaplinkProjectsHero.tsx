import './TaplinkProjectsHero.css'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'

const BASE = import.meta.env.BASE_URL

export default function TaplinkProjectsHero() {
  return (
    <section className="tp-hero tp-hero--dotted">
      <HeroParticleField
        alphaMultiplier={1}
        cursorForceMultiplier={0.4}
        baseColor={{ r: 0, g: 0, b: 0 }}
        hoverColor={{ r: 255, g: 0, b: 0 }}
      />
      <div className="tp-hero__inner">
        <div className="tp-hero__text">
          <p className="tp-hero__eyebrow">
            МИНИ-САЙТ ДЛЯ ЧАСТНОЙ ПРАКТИКИ
          </p>
          <h1 className="tp-hero__title">
            <span className="tp-hero__accent">Taplink</span>
            <br />
            для вашей
            <br />
            практики
          </h1>
          <p className="tp-hero__desc">
            {ruTypo('Одна понятная страница, где сразу видно, кто вы, с чем к вам можно обратиться, какие услуги вы предлагаете и как записаться.')}
          </p>
          <p className="tp-hero__sub">
            {ruTypo(
              'Подходит врачам, психологам и экспертам с частной практикой, если клиенты чаще приходят из соцсетей, мессенджеров, рекламы или по рекомендации и открывают ссылку с телефона.'
            )}
          </p>
          <div className="tp-hero__cta">
            <a className="cta-button cta-button--secondary" href="#taplink-projects">
              <span>Посмотреть проекты</span>
              <span className="cta-button__arrow" aria-hidden="true">↓</span>
            </a>
            <a className="cta-button" href="#contact">
              <span>Обсудить задачу</span>
              <span className="cta-button__arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="tp-hero__visual">
          <div className="tp-hero__img tp-hero__img--left">
            <img
              src={`${BASE}taplink/galushchenko.png`}
              alt={ruTypo('Светлана Галущенко — мини-сайт')}
              draggable={false}
            />
          </div>
          <div className="tp-hero__img tp-hero__img--center">
            <img
              src={`${BASE}taplink/panferova.png`}
              alt={ruTypo('Анна Панферова — мини-сайт')}
              draggable={false}
            />
          </div>
          <div className="tp-hero__img tp-hero__img--right">
            <img
              src={`${BASE}taplink/kholodova.png`}
              alt={ruTypo('Анна Холодова — мини-сайт')}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
