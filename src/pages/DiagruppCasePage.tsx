import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ruTypo } from '../lib/typography'
import Footer from '../Footer'
import ContactSection from '../ContactSection'
import StaticParticleField from '../StaticParticleField'
import './DiagruppCasePage.css'

const root = '/diagrupp/'
const t = (text: string) => ruTypo(ruTypo(text))
const comparisons = [
  ['01', 'Титульный слайд', 'before-after-01-cover.png', 'От учебной заставки к цельному визуальному образу лекции.'],
  ['02', 'Три стороны общения', 'before-after-02-communication.png', 'Содержание, процесс и восприятие представлены как три понятные составляющие медицинского общения.'],
  ['03', 'Карта консультации', 'before-after-03-consultation-map.png', 'Этапы Калгари-Кембриджской модели и сквозные задачи получили наглядную структуру.'],
  ['04', 'Золотая минута', 'before-after-04-golden-minute.png', 'Результаты исследования и практический приём внимательного слушания выделены как главные элементы слайда.'],
  ['05', 'Модель ICE', 'before-after-05-ice.png', 'Представления, тревоги и ожидания пациента показаны через три составляющие модели и примеры вопросов.'],
  ['06', 'Эмпатия и NURSE', 'before-after-06-nurse.png', 'Пять способов реагирования на эмоции пациента представлены в единой визуальной системе.'],
]
const approach = [
  ['СТРУКТУРА', 'Материал разделён на логические части. Ключевые тезисы выделены, подробные объяснения вынесены в заметки лектора.'],
  ['СОДЕРЖАНИЕ', 'Формулировки сверялись с исходной презентацией и профессиональной литературой.'],
  ['ВИЗУАЛЬНАЯ СИСТЕМА', 'Разработаны наглядные схемы, иллюстрации, светлые и тёмные композиции на основе корпоративных цветов «Диагрупп».'],
  ['ПОДГОТОВКА К ВЫСТУПЛЕНИЮ', 'К слайдам подготовлены подробные пояснения и практические примеры для лектора.'],
]

export default function DiagruppCasePage() {
  const [active, setActive] = useState<number | null>(null)
  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Диагрупп — презентация для обучения врачей | Tuiana Design'
    const entries: [string, string, string][] = [
      ['meta[name="description"]', 'content', 'Кейс Tuiana Design: структура, визуальное оформление и заметки лектора для корпоративной обучающей презентации Диагрупп.'],
      ['link[rel="canonical"]', 'href', 'https://tuiana.ru/projects/diagrupp/'],
      ['meta[property="og:title"]', 'content', 'Диагрупп — презентация для обучения врачей | Tuiana Design'],
      ['meta[property="og:description"]', 'content', 'Кейс Tuiana Design: структура, визуальное оформление и заметки лектора для корпоративной обучающей презентации Диагрупп.'],
      ['meta[property="og:image"]', 'content', 'https://tuiana.ru/diagrupp/hero-slide.png'],
      ['meta[property="og:url"]', 'content', 'https://tuiana.ru/projects/diagrupp/'],
    ]
    const restore = entries.map(([selector, attribute, value]) => {
      let element = document.head.querySelector(selector)
      const created = !element
      if (!element) {
        const match = selector.match(/^(\w+)\[(\w+)="([^"]+)"\]$/)!
        element = document.createElement(match[1])
        element.setAttribute(match[2], match[3])
        document.head.appendChild(element)
      }
      const previous = element.getAttribute(attribute)
      element.setAttribute(attribute, value)
      return () => {
        if (created) element.remove()
        else if (previous === null) element.removeAttribute(attribute)
        else element.setAttribute(attribute, previous)
      }
    })
    return () => { document.title = previousTitle; restore.forEach(fn => fn()) }
  }, [])
  useEffect(() => {
    if (active === null) return
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') setActive(null) }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', key)
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', key) }
  }, [active])
  return <>
    <main className="diag">
      <StaticParticleField baseColor={{ r: 213, g: 138, b: 92 }} />
      <section className="diag__hero diag__dark"><div className="diag__inner">
        <Link className="diag__back" to="/additional/#presentations">← {t('К презентациям')}</Link>
        <div className="diag__hero-grid"><div>
          <p className="diag__eyebrow">КЕЙС / ПРЕЗЕНТАЦИИ / КОРПОРАТИВНОЕ ОБУЧЕНИЕ</p>
          <h1>{t('«Диагрупп». Презентация для обучения врачей')}</h1>
          <p className="diag__subtitle">{t('Профессиональное общение врача с пациентом')}</p>
          <p className="diag__lead">{t('45 слайдов для корпоративного обучения врачей. Переработка большого профессионального материала по Калгари-Кембриджской модели: структура, визуализация, оформление и заметки лектора.')}</p>
          <p className="diag__meta">45 СЛАЙДОВ / POWERPOINT / КОРПОРАТИВНОЕ ОБУЧЕНИЕ</p>
        </div><img className="diag__hero-image" src={`${root}hero-slide.png`} width="1600" height="900" alt={t('Титульный слайд презентации Диагрупп о профессиональном общении врача с пациентом')} fetchPriority="high" /></div>
      </div></section>
      <section className="diag__section diag__light"><div className="diag__inner diag__split"><div><p className="diag__eyebrow">ЗАДАЧА</p><h2>{t('Сложный материал, который нужно не только прочитать, но и объяснить')}</h2></div><div className="diag__copy"><p>{t('Исходная презентация содержала большой объём профессиональной информации: этапы медицинской консультации, модели общения, практические приёмы и примеры.')}</p><p>{t('Нужно было сохранить учебное содержание, но сделать его более структурированным, наглядным и удобным для выступления перед врачами.')}</p><div className="diag__words"><span>СТРУКТУРА</span><span>ПОДАЧА</span><span>ПОНИМАНИЕ</span></div></div></div></section>
      <section className="diag__section diag__dark"><div className="diag__inner"><p className="diag__eyebrow">ПОДХОД</p><h2>{t('От материала к цельной презентации')}</h2><div className="diag__approach">{approach.map(([title, desc], i) => <article key={title}><h3><span>0{i + 1} / </span>{t(title)}</h3><p>{t(desc)}</p></article>)}</div></div></section>
      <section className="diag__section diag__light"><div className="diag__inner"><p className="diag__eyebrow">ТРАНСФОРМАЦИЯ</p><h2>{t('Одна тема. Два способа её показать')}</h2><p className="diag__intro">{t('Содержание должно оставаться точным, а подача — помогать его понять. На этих примерах видно, как изменилась структура слайдов, работа с текстом и визуальными акцентами.')}</p><div className="diag__gallery">{comparisons.map(([number, title, file, desc], i) => <figure className={i === 0 || i === 5 ? 'diag__figure diag__figure--wide' : 'diag__figure'} key={file}><button className="diag__image-button" onClick={() => setActive(i)} aria-label={t(`Увеличить сравнение: ${title}`)}><img src={root + file} alt={t(`Сравнение слайдов до и после: ${title}`)} width="927" height="1039" loading="lazy" decoding="async" /></button><figcaption><h3><span>{number} / </span>{t(title.toUpperCase())}</h3><p>{t(desc)}</p></figcaption></figure>)}</div></div></section>
      <section className="diag__section diag__dark"><div className="diag__inner"><p className="diag__eyebrow">РЕЗУЛЬТАТ</p><h2>{t('45 слайдов для корпоративного обучения')}</h2><div className="diag__results"><div><strong>45</strong><p>{t('слайдов в готовой PowerPoint-презентации.')}</p></div><div><strong>Редактируемый PPTX</strong><p>{t('тексты можно изменять.')}</p></div><div><strong>Заметки лектора</strong><p>{t('пояснения к содержанию и практические примеры.')}</p></div></div><p className="diag__intro">{t('В готовой презентации объединились визуальные материалы и редактируемые тексты. Подробные объяснения остались доступны лектору, но не перегружают сами слайды.')}</p></div></section>
      <section className="diag__section diag__light"><div className="diag__inner"><p className="diag__eyebrow">ОБРАТНАЯ СВЯЗЬ</p><h2>{t('Презентация, которую будут использовать в работе')}</h2><div className="diag__feedback"><div><blockquote>{t('«Ваша преза просто класс! Буду использовать в работе».')}</blockquote><p>Буянтуева Соелма Степановна<br />Лектор</p></div><img src={`${root}lecturer-feedback.png`} width="926" height="984" loading="lazy" alt={t('Скриншот письма с отзывом лектора о презентации')} /></div></div></section>
      <section className="diag__section diag__dark"><div className="diag__inner diag__split"><div><p className="diag__eyebrow">ПРЕЗЕНТАЦИЯ</p><h2>{t('Посмотрите, как это получилось')}</h2><p className="diag__intro">{t('Двенадцать избранных слайдов из готовой презентации: схемы, практические примеры, учебные модели и разные варианты оформления.')}</p><div className="diag__actions"><a href={`${root}selected-slides.pdf`} target="_blank" rel="noopener noreferrer">Открыть PDF ↗</a><a href={`${root}selected-slides.pdf`} download>Скачать PDF ↓</a></div></div><img className="diag__pdf-image" src={`${root}hero-slide.png`} width="1600" height="900" loading="lazy" alt={t('Обложка PDF с избранными слайдами презентации')} /></div><div className="diag__inner"><p className="diag__credit">{t('Исходное учебное содержание и Калгари-Кембриджская модель не являются авторской разработкой Tuiana Design. Работа студии включала переработку структуры и подачи материала, сверку формулировок, визуальное оформление и подготовку заметок лектора.')}</p></div></section>
      <section className="diag__section diag__light"><div className="diag__inner"><p className="diag__eyebrow">ОБСУДИМ ПРОЕКТ</p><h2>{t('Есть презентация, которую нужно привести в порядок?')}</h2><p className="diag__intro">{t('Помогу разобраться в материале, выстроить структуру и оформить презентацию так, чтобы она поддерживала выступление, а не перегружала его.')}</p><a className="diag__cta" href="#contact">Обсудить проект →</a></div></section>
    </main>
    <ContactSection /><Footer />
    {active !== null && createPortal(<div className="diag-lightbox" role="dialog" aria-modal="true" aria-label={t(`Сравнение: ${comparisons[active][1]}`)} onClick={() => setActive(null)}><button autoFocus className="diag-lightbox__close" onClick={() => setActive(null)} aria-label="Закрыть просмотр">×</button><img src={root + comparisons[active][2]} alt={t(`Сравнение слайдов до и после: ${comparisons[active][1]}`)} onClick={e => e.stopPropagation()} /></div>, document.body)}
  </>
}
