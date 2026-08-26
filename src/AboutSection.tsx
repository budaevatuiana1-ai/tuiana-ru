import { useInView } from './hooks/useInView'
import { ruTypo } from './lib/typography'
import HeroParticleField from './HeroParticleField'
import ProjectPointCloud from './ProjectPointCloud'
import './AboutSection.css'

export default function AboutSection() {
  const { ref, inView } = useInView(0.15)

  return (
    <section
      ref={ref}
      id="about"
      className={`about${inView ? ' about--in-view' : ''}`}
    >
      <HeroParticleField />
      <div className="about__top">
        <div className="about__header">
          <div className="about__eyebrow">
            ОБО МНЕ <span className="about__eyebrow-num">/ 03</span>
          </div>

          <h2 className="about__title">
            {ruTypo('Из медицины —')}
            <br />
            {ruTypo('в\u00A0дизайн')}
            <br />
            {ruTypo('с тем же вниманием')}
            <br />
            {<span className="about__title-accent">к{'\u00A0'}человеку</span>}
          </h2>
        </div>

        <div className="about__photo">
          <img
            src="/about/tuiana-office.webp"
            alt={ruTypo('Туiana — в студии')}
            draggable={false}
          />
          <ProjectPointCloud
            imageSrc="/about/tuiana-office.webp"
            sampling={6}
            particleRadius={0.7}
            baseAlpha={0}
            crop={{ mode: 'coverFit', objectPositionPercent: 50 }}
            containerSelector=".about__photo"
            interactionRadius={145}
            maxDisplacement={28}
            returnDamping={0.11}
            activeAlpha={0.95}
            activeRadius={1.2}
            interactionStrength={1.0}
            tintColor="#D58A5C"
            tintStrength={0.4}
          />
        </div>
      </div>

      <div className="about__blocks">
        <div className="about__block">
          <div className="about__block-head">
            <span className="about__block-num">01</span>
            <span className="about__block-label">/ МЕДИЦИНА</span>
          </div>
          <h3 className="about__block-title">{ruTypo('Опыт, который научил видеть главное')}</h3>
          <p className="about__block-text">
            {ruTypo('Много лет я работала врачом анестезиологом-реаниматологом. Этот опыт научил меня разбираться в\u00A0сложной информации, замечать детали и\u00A0всегда учитывать человека — то, как он воспринимает информацию и\u00A0принимает решения.')}
          </p>
        </div>

        <div className="about__block">
          <div className="about__block-head">
            <span className="about__block-num">02</span>
            <span className="about__block-label">/ ВЕБ-ДИЗАЙН</span>
          </div>
          <h3 className="about__block-title">{ruTypo('Сайт как система, а\u00A0не\u00A0картинка')}</h3>
          <p className="about__block-text">
            {ruTypo('Продумываю структуру так, чтобы человек быстро понял, кто вы, чем можете помочь и\u00A0почему стоит обратиться именно к\u00A0вам. Тексты и\u00A0визуал выстраиваю так, чтобы сайт не\u00A0просто знакомил, а\u00A0вёл к\u00A0записи или заявке.')}
          </p>
        </div>

        <div className="about__block">
          <div className="about__block-head">
            <span className="about__block-num">03</span>
            <span className="about__block-label">/ AI & DIGITAL</span>
          </div>
              <h3 className="about__block-title">{ruTypo('AI, который усиливает проект')}</h3>
          <p className="about__block-text">
            {ruTypo('Если для сайта или продвижения не\u00A0хватает подходящего визуала, видео или digital-материалов, подключаю нейросети. Могу создать изображения, ролики и\u00A0дополнительные материалы в\u00A0едином стиле проекта — без необходимости собирать всё у\u00A0разных специалистов.')}
          </p>
        </div>
      </div>
    </section>
  )
}
