import './BazaStartSection.css'

export default function BazaStartSection() {
  return (
    <section className="baza-start">
      <div className="baza-start__inner">
        <div className="baza-start__body">
          <div className="baza-start__left">
            <p className="baza-start__eyebrow">НА СТАРТЕ</p>
            <h2 className="baza-start__title">
              <span className="baza-start__title-line">Информации было много.</span>
              <span className="baza-start__title-line">
                Системы — <span className="baza-start__title-accent">не было</span>
              </span>
            </h2>
          </div>

          <div className="baza-start__right">
            <div className="baza-start__cols">
              <p className="baza-start__text">
                Фотографии территории, условия проживания, рассказы о{'\u00A0'}программах и{'\u00A0'}детали для{'\u00A0'}организаторов существовали отдельно.
              </p>
              <p className="baza-start__text">
                Нужна была одна точка, где человек сможет сам понять, что это за{'\u00A0'}место, подходит ли оно его группе и{'\u00A0'}что делать дальше.
              </p>
            </div>
            <p className="baza-start__meta">
              ФОТОГРАФИИ / УСЛОВИЯ / ПРОГРАММЫ / ПЕРЕПИСКИ
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
