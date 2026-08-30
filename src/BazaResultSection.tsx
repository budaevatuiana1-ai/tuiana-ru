import './BazaResultSection.css'

export default function BazaResultSection() {
  return (
    <section className="baza-result">
      <div className="baza-result__inner">
        <p className="baza-result__eyebrow">РЕЗУЛЬТАТ</p>
        <h2 className="baza-result__title">
          Вместо разрозненной информации — одна понятная система
        </h2>
        <p className="baza-result__desc">
          У{'\u00A0'}проекта появилась единая точка онлайн-присутствия, куда
          можно{'\u00A0'}отправить организатора или{'\u00A0'}родителя вместо
          длинных объяснений в{'\u00A0'}переписке.
        </p>

        <div className="baza-result__list">
          <div className="baza-result__item">
            <p className="baza-result__num">01</p>
            <h3 className="baza-result__item-title">Система</h3>
            <p className="baza-result__item-text">
              Большой объём информации собран в{'\u00A0'}понятную структуру
            </p>
          </div>
          <div className="baza-result__item">
            <p className="baza-result__num">02</p>
            <h3 className="baza-result__item-title">Две аудитории</h3>
            <p className="baza-result__item-text">
              Отдельные сценарии для{'\u00A0'}организаторов групп
              и{'\u00A0'}родителей
            </p>
          </div>
          <div className="baza-result__item">
            <p className="baza-result__num">03</p>
            <h3 className="baza-result__item-title">Атмосфера</h3>
            <p className="baza-result__item-text">
              Сайт показывает не{'\u00A0'}только условия, но{'\u00A0'}и{'\u00A0'}реальную
              жизнь проекта
            </p>
          </div>
          <div className="baza-result__item">
            <p className="baza-result__num">04</p>
            <h3 className="baza-result__item-title">Следующий шаг</h3>
            <p className="baza-result__item-text">
              Понятный путь к{'\u00A0'}обсуждению свободных дат
              и{'\u00A0'}размещения
            </p>
          </div>
        </div>

        <div className="baza-result__final">
          <p className="baza-result__final-text">
            Не{'\u00A0'}просто сайт базы — цифровая точка, которая объясняет
            необычный формат проекта и{'\u00A0'}помогает принять решение
          </p>
        </div>
      </div>
    </section>
  )
}
