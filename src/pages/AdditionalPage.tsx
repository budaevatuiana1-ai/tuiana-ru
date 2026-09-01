import { useEffect } from 'react'
import './AdditionalPage.css'
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
      </main>
      <Footer />
    </>
  )
}
