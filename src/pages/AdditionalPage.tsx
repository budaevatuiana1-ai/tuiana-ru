import { useEffect } from 'react'
import './AdditionalPage.css'
import { ruTypo } from '../lib/typography'
import StaticParticleField from '../StaticParticleField'
import Footer from '../Footer'

export default function AdditionalPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="additional-page">
        <section className="additional-hero">
          <StaticParticleField
            baseColor={{ r: 0, g: 0, b: 0 }}
            alphaMultiplier={1}
          />
          <div className="additional-hero__inner">
            <div className="additional-hero__text">
              <p className="additional-hero__eyebrow">ДОПОЛНИТЕЛЬНО</p>
              <h1 className="additional-hero__title">
                Визуал и материалы, которые дополняют сайт
              </h1>
              <p className="additional-hero__desc">
                Если для запуска не хватает фотографий, презентации, ролика или других материалов — это можно подготовить в одной визуальной системе с сайтом.
              </p>
              <p className="additional-hero__formats">
                AI-визуал · презентации · видео · материалы
              </p>
            </div>

            <div className="additional-hero__visual">
              <img
                className="additional-hero__img additional-hero__img--ai"
                src="/additional/hero-ai.jpg"
                alt="AI-визуал"
              />
              <img
                className="additional-hero__img additional-hero__img--presentation"
                src="/additional/hero-presentation.jpg"
                alt="Презентация"
              />
              <img
                className="additional-hero__img additional-hero__img--reels"
                src="/additional/hero-reels.jpg"
                alt="Видео-ролик"
              />
            </div>
          </div>
        </section>

        {/* ── AI Visual ── */}
        <section className="additional-ai">
          <StaticParticleField />
          <div className="additional-ai__inner">
            <div className="additional-ai__text">
              <p className="additional-ai__eyebrow">AI-ВИЗУАЛ</p>
              <h2 className="additional-ai__title">
                {ruTypo('Нет подходящих фотографий?')}<br />
                <span className="additional-ai__title-accent">{ruTypo('Это не мешает')}</span>{ruTypo(' начать работу над сайтом.')}
              </h2>
              <p className="additional-ai__desc">
                {ruTypo('Если своих кадров недостаточно, я могу подготовить серию изображений на основе ваших фото — в нужной стилистике и сразу с учётом того, где они будут использоваться.')}
              </p>
              <p className="additional-ai__formats">
                {ruTypo('Для сайта и Taplink · соцсетей · баннеров · презентаций')}
              </p>
              <p className="additional-ai__accent">
                {ruTypo('Один исходник — несколько кадров для разных задач.')}
              </p>
            </div>

            <div className="additional-ai__visual">
              <div className="additional-ai__source">
                <img
                  className="additional-ai__source-img"
                  src="/additional/ai-source.jpg"
                  alt={ruTypo('Исходное фото')}
                />
                <span className="additional-ai__source-label">Исходное фото</span>
              </div>

              <span className="additional-ai__arrow">→</span>

              <div className="additional-ai__results">
                <img
                  className="additional-ai__result additional-ai__result--back"
                  src="/additional/ai-result-workplace-portrait.jpg.png"
                  alt={ruTypo('AI-визуал')}
                />
                <img
                  className="additional-ai__result additional-ai__result--front"
                  src="/additional/ai-result-workspace.png"
                  alt={ruTypo('AI-визуал рабочее пространство')}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
