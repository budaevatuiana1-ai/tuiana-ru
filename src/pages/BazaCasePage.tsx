import { useEffect } from 'react'
import './BazaCasePage.css'
import CtaButton from '../CtaButton'

export default function BazaCasePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="baza-page">
      <p className="baza-page__eyebrow">КЕЙС / BAZA</p>
      <h1 className="baza-page__title">BAZA</h1>
      <p className="baza-page__status">Кейс в разработке</p>
      <CtaButton to="/" arrow={false}>
        ← Вернуться к BAZA
      </CtaButton>
    </section>
  )
}
