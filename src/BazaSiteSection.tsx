import './BazaSiteSection.css'

const BASE = import.meta.env.BASE_URL

export default function BazaSiteSection() {
  return (
    <section className="baza-site">
      <div className="baza-site__inner">
        <div className="baza-site__head">
          <p className="baza-site__eyebrow">САЙТ БАЗЫ</p>
          <h2 className="baza-site__title">
            От условий — к{'\u00A0'}ощущению места
          </h2>
          <p className="baza-site__desc">
            Сайт постепенно отвечает на{'\u00A0'}вопросы организатора: как будет
            жить группа, что находится рядом и{'\u00A0'}как перейти к{'\u00A0'}обсуждению
            свободных дат
          </p>
        </div>

        <div className="baza-site__gallery">
          <div className="baza-site__main">
            <img
              className="baza-site__img"
              src={`${BASE}baza/accommodation.webp`}
              alt="Сайт Базы — размещение и условия проживания"
            />
          </div>
          <div className="baza-site__side">
            <img
              className="baza-site__img"
              src={`${BASE}baza/baikal.webp`}
              alt="Сайт Базы — окрестности Байкала"
            />
            <img
              className="baza-site__img"
              src={`${BASE}baza/contacts.webp`}
              alt="Сайт Базы — контакты и свободные даты"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
