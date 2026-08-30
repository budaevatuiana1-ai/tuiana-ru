import './BazaDifficultySection.css'

const BASE = import.meta.env.BASE_URL

const QUESTIONS = [
  'Где жить',
  'Где заниматься',
  'Как организовано питание',
  'Безопасно ли детям',
  'Что есть на\u00A0территории',
  'Подходит ли место для\u00A0группы',
]

export default function BazaDifficultySection() {
  return (
    <section className="baza-diff">
      <div className="baza-diff__inner">
        <div className="baza-diff__cols">
          <div className="baza-diff__left">
            <p className="baza-diff__eyebrow">ГЛАВНАЯ СЛОЖНОСТЬ</p>
            <h2 className="baza-diff__title">
              <span className="baza-diff__title-line">
                Продавать нужно было{' '}
                <span className="baza-diff__title-accent">не комнаты</span>,
              </span>
              <span className="baza-diff__title-line">
                <span className="baza-diff__title-keep">а сценарий</span> для{'\u00A0'}целой группы
              </span>
            </h2>

            <div className="baza-diff__intro">
              <p className="baza-diff__text">
                Для{'\u00A0'}обычной базы достаточно показать номер, цену
                <br className="baza-diff__br" />{' '}
                <span className="baza-diff__nowrap">и кнопку</span> «Забронировать».
              </p>
              <p className="baza-diff__text">
                Здесь решение принимает организатор группы —
                <br className="baza-diff__br" />{' '}
                <span className="baza-diff__nowrap">и его</span> интересуют совсем
                другие вопросы.
              </p>
            </div>

            <ul className="baza-diff__questions">
              {QUESTIONS.map((q, i) => (
                <li className="baza-diff__q" key={q}>
                  <span className="baza-diff__q-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="baza-diff__q-sep">/</span>
                  <span className="baza-diff__q-text">{q}</span>
                </li>
              ))}
            </ul>

            <p className="baza-diff__result">
              Поэтому структура сайта строилась не{'\u00A0'}вокруг номеров и{'\u00A0'}цен,
              <br className="baza-diff__br" /> а{'\u00A0'}вокруг{' '}
              <span className="baza-diff__result-accent">
                сценария принятия решения организатором
              </span>
              .
            </p>
          </div>

          <div className="baza-diff__media">
            <img
              className="baza-diff__img"
              src={`${BASE}baza/about-space.webp`}
              alt="О пространстве — База, созданная организатором групп"
            />
            <img
              className="baza-diff__img"
              src={`${BASE}baza/group-benefits.webp`}
              alt="Почему группам у нас удобно"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
