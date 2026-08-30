import './BazaDreamSection.css'

const BASE = import.meta.env.BASE_URL

export default function BazaDreamSection() {
  return (
    <section className="baza-dream">
      <div className="baza-dream__inner">
        <div className="baza-dream__head">
          <p className="baza-dream__eyebrow">ОТДЕЛЬНЫЙ СЦЕНАРИЙ</p>
          <h2 className="baza-dream__title">
            «Мир Моей Мечты» — отдельная страница программы на базе
          </h2>

          <div className="baza-dream__cols">
            <div className="baza-dream__col">
              <p className="baza-dream__text">
                «Мир Моей Мечты» — авторская детская программа, которая проходит на{'\u00A0'}территории «Нашей Базы». Её ведёт хозяйка базы Анна Марактаева — психолог и{'\u00A0'}руководитель программы.
              </p>
            </div>
            <div className="baza-dream__col">
              <p className="baza-dream__text">
                Для этой страницы нужна была другая логика: здесь решение принимает уже родитель.
              </p>
              <p className="baza-dream__text">
                Поэтому важно было объяснить, что происходит с{'\u00A0'}ребёнком во время смены, кто работает с{'\u00A0'}детьми и{'\u00A0'}чем программа отличается от обычного отдыха.
              </p>
            </div>
          </div>

          <div className="baza-dream__markers">
            <div className="baza-dream__marker">
              <span className="baza-dream__marker-label">РОДИТЕЛЬ</span>
              <span className="baza-dream__marker-text">
                ребёнок / программа / команда / безопасность / результат
              </span>
            </div>
          </div>
        </div>

        <div className="baza-dream__gallery">
          <div className="baza-dream__main">
            <img
              className="baza-dream__img"
              src={`${BASE}baza/dream-hero.webp`}
              alt="Мир Моей Мечты — главная страница программы"
            />
          </div>
          <div className="baza-dream__side">
            <img
              className="baza-dream__img"
              src={`${BASE}baza/dream-program.webp`}
              alt="Мир Моей Мечты — программа смены"
            />
            <img
              className="baza-dream__img"
              src={`${BASE}baza/dream-team.webp`}
              alt="Мир Моей Мечты — команда и вожатые"
            />
          </div>
        </div>

        <p className="baza-dream__result">
          Одна визуальная система — два разных пути принятия решения
        </p>
      </div>
    </section>
  )
}
