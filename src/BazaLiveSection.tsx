import './BazaLiveSection.css'

const BASE = import.meta.env.BASE_URL

export default function BazaLiveSection() {
  return (
    <section className="baza-live">
      <div className="baza-live__inner">
        <div className="baza-live__head">
          <p className="baza-live__eyebrow">ЖИВАЯ ПРОГРАММА</p>
          <h2 className="baza-live__title">
            За страницей — настоящая жизнь
          </h2>
          <p className="baza-live__desc">
            Важно было не придумать программе новый образ, а{'\u00A0'}сохранить то, что уже
            есть в{'\u00A0'}реальности: Байкал, живое общение, работу психологов
            и{'\u00A0'}тренеров, занятия и{'\u00A0'}атмосферу группы.
          </p>
          <p className="baza-live__caption">
            Сайт собирает эти разные моменты в одну понятную историю для{'\u00A0'}родителя.
          </p>
        </div>

        <div className="baza-live__gallery">
          <img
            className="baza-live__img"
            src={`${BASE}baza/baikal-group.webp`}
            alt="Группа на Байкале — живая программа на базе"
          />
          <img
            className="baza-live__img"
            src={`${BASE}baza/art-workshop.webp`}
            alt="Арт-мастерская для детей на базе"
          />
          <img
            className="baza-live__img"
            src={`${BASE}baza/group-session.webp`}
            alt="Групповая сессия с психологом"
          />
          <img
            className="baza-live__img"
            src={`${BASE}baza/anna-with-children.webp`}
            alt="Анна Марактаева с детьми на программе"
          />
        </div>
      </div>
    </section>
  )
}
