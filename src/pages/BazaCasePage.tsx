import { useEffect } from 'react'
import './BazaCasePage.css'
import CtaButton from '../CtaButton'
import ExternalCtaButton from '../ExternalCtaButton'
import BazaStartSection from '../BazaStartSection'
import BazaDifficultySection from '../BazaDifficultySection'
import BazaLogicSection from '../BazaLogicSection'
import BazaSiteSection from '../BazaSiteSection'
import BazaDreamSection from '../BazaDreamSection'
import BazaLiveSection from '../BazaLiveSection'
import BazaResultSection from '../BazaResultSection'
import ContactSection from '../ContactSection'
import Footer from '../Footer'

const BASE = import.meta.env.BASE_URL

export default function BazaCasePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <section className="baza-hero">
        <div className="baza-hero__inner">
        <div className="baza-hero__head">
          <p className="baza-hero__eyebrow">
            КЕЙС <span className="baza-hero__eyebrow-accent">02</span> / НАША БАЗА
          </p>
          <h1 className="baza-hero__title">Наша База</h1>
          <p className="baza-hero__subtitle">
            Сайт для{'\u00A0'}пространства группового отдыха на{'\u00A0'}Байкале
          </p>
          <p className="baza-hero__thesis">
            Не{'\u00A0'}просто показать место — объяснить необычный формат{' '}
            <span style={{ whiteSpace: 'nowrap' }}>и помочь</span> организатору
            принять решение.
          </p>
          <p className="baza-hero__meta">
            STRUCTURE / UX / CONTENT / DESIGN / DEVELOPMENT
          </p>
          <div className="baza-hero__cta">
            <ExternalCtaButton href="https://nashabaza03.ru" primary>
              Посмотреть сайт ↗
            </ExternalCtaButton>
            <CtaButton to="/" arrow={false}>
              ← На главную
            </CtaButton>
          </div>
        </div>

        <div className="baza-hero__visual">
          <img
            className="baza-hero__screenshot"
            src={`${BASE}hero/nasha-baza.webp`}
            alt="Сайт Наша База — главная страница"
            width="1901"
            height="832"
          />
        </div>
      </div>
    </section>
    <BazaStartSection />
    <BazaDifficultySection />
    <BazaLogicSection />
    <BazaSiteSection />
    <BazaDreamSection />
    <BazaLiveSection />
    <BazaResultSection />
    <ContactSection />
    <Footer />
    </>
  )
}
