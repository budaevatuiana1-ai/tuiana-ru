import './DariCasePage.css'
import CtaButton from '../CtaButton'

export default function DariCasePage() {
  return (
    <section className="dari-page">
      <p className="dari-page__eyebrow">CASE / DARI</p>
      <h1 className="dari-page__title">DARI</h1>
      <p className="dari-page__status">Case study in progress</p>
      <CtaButton to="/" arrow={false}>
        ← Вернуться к DARI
      </CtaButton>
    </section>
  )
}
