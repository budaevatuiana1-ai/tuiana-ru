import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import './AdditionalPage.css'
import { ruTypo } from '../lib/typography'
import StaticParticleField from '../StaticParticleField'
import Footer from '../Footer'
import ExternalCtaButton from '../ExternalCtaButton'
import { trackMetrikaGoal } from '../YandexMetrika'
import { Link, useLocation } from 'react-router-dom'

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const socialProjects = [
  {
    name: 'Tuiana Design',
    description: 'Фирменное оформление собственного сообщества: обложка, аватар и навигационные карточки.',
    preview: '/additional/social-design/01-tuiana-design-vk-preview.webp',
    full: '/additional/social-design/01-tuiana-design-vk-full.png',
  },
  {
    name: 'ПроМамаВдохновение',
    description: 'Нежное оформление женского проекта: обложка, аватар и карточки навигации в едином стиле.',
    preview: '/additional/social-design/02-pro-mama-vdohnovenie-vk-preview.webp',
    full: '/additional/social-design/02-pro-mama-vdohnovenie-vk-full.png',
  },
  {
    name: 'Расстановки с Оланой Мункоевой',
    description: 'Оформление экспертного сообщества с выразительной зелёной палитрой, обложкой и навигационными элементами.',
    preview: '/additional/social-design/03-olana-munkoeva-vk-preview.webp',
    full: '/additional/social-design/03-olana-munkoeva-vk-full.png',
  },
]

export default function AdditionalPage() {
  const location = useLocation()
  const video1Ref = useRef<HTMLVideoElement>(null)
  const video2Ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState<'video1' | 'video2' | null>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  const jubileeRef = useRef<HTMLVideoElement>(null)
  const [jubileePlaying, setJubileePlaying] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioTime, setAudioTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const lightboxTriggerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.hash, location.key])

  const openLightbox = useCallback((src: string, alt: string, trigger?: HTMLElement) => {
    lightboxTriggerRef.current = trigger ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null)
    setLightbox({ src, alt })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
  }, [])

  useLayoutEffect(() => {
    if (!lightbox) return
    const trigger = lightboxTriggerRef.current
    lightboxCloseRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'Tab') {
        e.preventDefault()
        lightboxCloseRef.current?.focus({ preventScroll: true })
      }
    }
    const onFocus = (e: FocusEvent) => {
      if (e.target !== lightboxCloseRef.current) lightboxCloseRef.current?.focus({ preventScroll: true })
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('focusin', onFocus)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('focusin', onFocus)
      document.body.style.overflow = prev
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [lightbox, closeLightbox])

  const pauseOtherMedia = (active: HTMLMediaElement) => {
    for (const media of [video1Ref.current, video2Ref.current, jubileeRef.current, audioRef.current]) {
      if (media && media !== active) media.pause()
    }
  }

  const toggleMedia = (media: HTMLMediaElement | null) => {
    if (!media) return
    if (!media.paused) {
      media.pause()
      return
    }
    pauseOtherMedia(media)
    void media.play().catch(() => {
      // Media events remain the source of truth if playback is rejected or interrupted.
    })
  }

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    const onTime = () => setAudioTime(a.currentTime)
    const onDur = () => setAudioDuration(Number.isFinite(a.duration) ? a.duration : 0)
    const onEnd = () => setAudioTime(a.currentTime)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('loadedmetadata', onDur)
    a.addEventListener('ended', onEnd)
    return () => {
      a.removeEventListener('timeupdate', onTime)
      a.removeEventListener('loadedmetadata', onDur)
      a.removeEventListener('ended', onEnd)
    }
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
              <p className="additional-hero__eyebrow">{ruTypo('ДОПОЛНИТЕЛЬНО')}</p>
              <h1 className="additional-hero__title">
                <span className="additional-hero__title-accent">{ruTypo('Визуал и материалы,')}</span>{ruTypo(' которые дополняют сайт')}
              </h1>
              <p className="additional-hero__desc">
                {ruTypo('Если для запуска не хватает фотографий, презентации, ролика или других материалов — это можно подготовить в одной визуальной системе с сайтом.')}
              </p>
              <p className="additional-hero__formats">
                {ruTypo('AI-визуал · презентации · видео · материалы')}
              </p>
            </div>

            <div className="additional-hero__visual">
              <img
                className="additional-hero__img additional-hero__img--ai"
                src="/additional/hero-ai.webp"
                alt={ruTypo('AI-визуал')}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="additional-hero__img additional-hero__img--presentation"
                src="/additional/hero-presentation.webp"
                alt={ruTypo('Презентация')}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <img
                className="additional-hero__img additional-hero__img--reels"
                src="/additional/hero-reels.webp"
                alt={ruTypo('Видео-ролик')}
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* ── AI Visual ── */}
        <section className="additional-ai" id="neurophoto">
          <StaticParticleField />
          <div className="additional-ai__inner">
            <div className="additional-ai__text">
              <p className="additional-ai__eyebrow">НЕЙРОФОТОСЕССИЯ</p>
              <h2 className="additional-ai__title">
                {ruTypo('Нет подходящих фотографий?')}<br />
                <span className="additional-ai__title-accent">{ruTypo('Это не мешает')}</span>{ruTypo(' начать работу над сайтом.')}
              </h2>
              <p className="additional-ai__desc">
                {ruTypo('Если своих кадров недостаточно, я могу подготовить нейрофотосессию — серию реалистичных изображений, созданных с помощью нейросетей на основе ваших фотографий, в нужной стилистике и с учётом того, где они будут использоваться.')}
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
                  src="/additional/ai-source.webp"
                  alt={ruTypo('Исходное фото')}
                  loading="lazy"
                  decoding="async"
                />
                <span className="additional-ai__source-label">Исходное фото</span>
              </div>

              <span className="additional-ai__arrow">→</span>

              <div className="additional-ai__results">
                <img
                  className="additional-ai__result additional-ai__result--back"
                  src="/additional/ai-result-workplace-portrait.jpg.webp"
                  alt={ruTypo('AI-визуал')}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  className="additional-ai__result additional-ai__result--front"
                  src="/additional/ai-result-workspace.webp"
                  alt={ruTypo('AI-визуал рабочее пространство')}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Presentations ── */}
        <section className="additional-presentations" id="presentations">
          <div className="additional-presentations__inner">
            <div className="additional-presentations__header">
              <div className="additional-presentations__header-left">
                <p className="additional-presentations__eyebrow">ПРЕЗЕНТАЦИИ</p>
                <h2 className="additional-presentations__title">
                  {ruTypo('Не просто оформить слайды,\nа собрать ')}<span className="additional-presentations__title-accent">{ruTypo('понятную подачу')}</span>
                </h2>
              </div>
              <div className="additional-presentations__header-right">
                <p className="additional-presentations__desc">
                  {ruTypo('Помогаю выстроить структуру, расставить смысловые акценты и собрать визуальную систему, в которой человеку легко следить за вашей мыслью.')}
                </p>
                <p className="additional-presentations__applications">
                  {ruTypo('выступления и конференции · обучение · презентации услуг · коммерческие предложения')}
                </p>
                <p className="additional-presentations__accent">
                  {ruTypo('Структура · тексты · дизайн · визуал')}
                </p>
                <p className="additional-presentations__hint">{ruTypo('Нажмите на слайд, чтобы увеличить')}</p>
              </div>
            </div>

            <div className="additional-presentations__gallery">
              <div className="additional-presentations__project">
                <div className="additional-presentations__preview-wrap additional-presentations__diagrupp">
                  <button className="additional-presentations__diagrupp-slide additional-presentations__diagrupp-slide--cover" onClick={(e) => openLightbox('/diagrupp/hero-slide.png', ruTypo('Диагрупп — титульный слайд'), e.currentTarget)} aria-label={ruTypo('Открыть титульный слайд презентации Диагрупп')}>
                    <img className="additional-presentations__img" src="/diagrupp/hero-slide.png" alt="" width="1600" height="900" loading="lazy" decoding="async" />
                  </button>
                  <button className="additional-presentations__diagrupp-slide additional-presentations__diagrupp-slide--minute" onClick={(e) => openLightbox('/diagrupp/golden-minute.png', ruTypo('Диагрупп — золотая минута'), e.currentTarget)} aria-label={ruTypo('Открыть слайд «Золотая минута»')}>
                    <img className="additional-presentations__img" src="/diagrupp/golden-minute.png" alt="" width="1600" height="900" loading="lazy" decoding="async" />
                  </button>
                  <button className="additional-presentations__diagrupp-slide additional-presentations__diagrupp-slide--map" onClick={(e) => openLightbox('/diagrupp/consultation-map.png', ruTypo('Диагрупп — карта консультации'), e.currentTarget)} aria-label={ruTypo('Открыть слайд «Карта консультации»')}>
                    <img className="additional-presentations__img" src="/diagrupp/consultation-map.png" alt="" width="1600" height="900" loading="lazy" decoding="async" />
                  </button>
                </div>
                <div className="additional-presentations__caption">
                  <p className="additional-presentations__caption-title"><Link className="additional-presentations__case-link" to="/projects/diagrupp/">Диагрупп</Link></p>
                  <p className="additional-presentations__caption-desc">Корпоративная обучающая презентация · 45 слайдов</p>
                  <Link className="additional-presentations__case-action" to="/projects/diagrupp/">Смотреть кейс <span aria-hidden="true">→</span></Link>
                </div>
              </div>

              <div className="additional-presentations__project">
                <div className="additional-presentations__preview-wrap">
                  <img
                    className="additional-presentations__img"
                    src="/additional/presentation-crimea.webp"
                    alt="Любимый Крым — презентация"
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    className="additional-presentations__hotspot"
                    style={{ top: '0%', left: '0%', width: '55%', height: '75%' }}
                    onClick={(e) => openLightbox('/additional/presentation-slides/crimea-01.webp', ruTypo('Любимый Крым — слайд 1'), e.currentTarget)}
                    aria-label={ruTypo('Открыть слайд 1 презентации Любимый Крым')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/presentation-slides/crimea-01.webp', ruTypo('Любимый Крым — слайд 1')) } }}
                  />
                  <button
                    className="additional-presentations__hotspot"
                    style={{ top: '25%', left: '40%', width: '60%', height: '75%' }}
                    onClick={(e) => openLightbox('/additional/presentation-slides/crimea-02.webp', ruTypo('Любимый Крым — слайд 2'), e.currentTarget)}
                    aria-label={ruTypo('Открыть слайд 2 презентации Любимый Крым')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/presentation-slides/crimea-02.webp', ruTypo('Любимый Крым — слайд 2')) } }}
                  />
                </div>
                <div className="additional-presentations__caption">
                  <p className="additional-presentations__caption-title">Любимый Крым</p>
                  <p className="additional-presentations__caption-desc">Презентация авторского тура</p>
                </div>
              </div>

              <div className="additional-presentations__project">
                <div className="additional-presentations__preview-wrap">
                  <img
                    className="additional-presentations__img"
                    src="/additional/presentation-exosomes.webp"
                    alt="Экзосомы — презентация"
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    className="additional-presentations__hotspot"
                    style={{ top: '5%', left: '0%', width: '35%', height: '50%' }}
                    onClick={(e) => openLightbox('/additional/presentation-slides/exosomes-01.webp', ruTypo('Экзосомы — слайд 1'), e.currentTarget)}
                    aria-label={ruTypo('Открыть слайд 1 презентации Экзосомы')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/presentation-slides/exosomes-01.webp', ruTypo('Экзосомы — слайд 1')) } }}
                  />
                  <button
                    className="additional-presentations__hotspot"
                    style={{ top: '15%', left: '25%', width: '40%', height: '60%' }}
                    onClick={(e) => openLightbox('/additional/presentation-slides/exosomes-02.webp', ruTypo('Экзосомы — слайд 2'), e.currentTarget)}
                    aria-label={ruTypo('Открыть слайд 2 презентации Экзосомы')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/presentation-slides/exosomes-02.webp', ruTypo('Экзосомы — слайд 2')) } }}
                  />
                  <button
                    className="additional-presentations__hotspot"
                    style={{ top: '35%', left: '45%', width: '55%', height: '65%' }}
                    onClick={(e) => openLightbox('/additional/presentation-slides/exosomes-03.webp', ruTypo('Экзосомы — слайд 3'), e.currentTarget)}
                    aria-label={ruTypo('Открыть слайд 3 презентации Экзосомы')}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/presentation-slides/exosomes-03.webp', ruTypo('Экзосомы — слайд 3')) } }}
                  />
                </div>
                <div className="additional-presentations__caption">
                  <p className="additional-presentations__caption-title">{ruTypo('Экзосомы')}</p>
                  <p className="additional-presentations__caption-desc">{ruTypo('Научно-медицинская презентация')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Video / Reels ── */}
        <section className="additional-video" id="video">
          <StaticParticleField />
          <div className="additional-video__inner">
            <div className="additional-video__header">
              <div className="additional-video__header-left">
                <p className="additional-video__eyebrow">ВИДЕО / REELS</p>
                <h2 className="additional-video__title">
                  {ruTypo('Когда одного кадра мало,\nможно ')}<span className="additional-video__title-accent">{ruTypo('добавить движение')}</span>
                </h2>
              </div>
              <div className="additional-video__header-right">
                <p className="additional-video__desc">
                  {ruTypo('Короткое видео помогает представить эксперта, объяснить услугу, показать проект или собрать историю в более живом формате.')}
                </p>
                <p className="additional-video__formats">
                  {ruTypo('экспертные Reels · AI-видео · событийные ролики · storytelling')}
                </p>
                <p className="additional-video__accent">
                  {ruTypo('Сценарий · визуал · анимация · монтаж')}
                </p>
              </div>
            </div>

            <div className="additional-video__gallery">
              <div className="additional-video__item additional-video__item--main">
                <div className="additional-video__preview">
                  <video
                    ref={video1Ref}
                    className="additional-video__video"
                    src="/additional/video/experts-lose-clients.mp4"
                    poster="/additional/video/experts-lose-clients-poster.jpg.webp"
                    preload="none"
                    playsInline
                    controls={playing === 'video1'}
                    onPlay={(e) => { if (!e.currentTarget.paused) { pauseOtherMedia(e.currentTarget); setPlaying('video1') } }}
                    onPause={(e) => { if (e.currentTarget.paused) setPlaying((current) => current === 'video1' ? null : current) }}
                    onEnded={() => setPlaying((current) => current === 'video1' ? null : current)}
                    onError={() => setPlaying((current) => current === 'video1' ? null : current)}
                  />
                  {playing !== 'video1' && (
                    <button
                      className="additional-video__play"
                      type="button"
                      aria-label={ruTypo('Воспроизвести: Почему эксперты теряют клиентов?')}
                      onClick={() => toggleMedia(video1Ref.current)}
                    >
                      <span className="additional-video__play-icon" />
                    </button>
                  )}
                </div>
                <p className="additional-video__item-title">{ruTypo('Почему эксперты теряют клиентов?')}</p>
                <p className="additional-video__item-desc">{ruTypo('Экспертный Reels')}</p>
              </div>

              <div className="additional-video__item additional-video__item--second">
                <div className="additional-video__preview">
                  <video
                    ref={video2Ref}
                    className="additional-video__video"
                    src="/additional/video/ai-presenter.mp4"
                    poster="/additional/video/ai-presenter-poster.webp"
                    preload="none"
                    playsInline
                    controls={playing === 'video2'}
                    onPlay={(e) => { if (!e.currentTarget.paused) { pauseOtherMedia(e.currentTarget); setPlaying('video2') } }}
                    onPause={(e) => { if (e.currentTarget.paused) setPlaying((current) => current === 'video2' ? null : current) }}
                    onEnded={() => setPlaying((current) => current === 'video2' ? null : current)}
                    onError={() => setPlaying((current) => current === 'video2' ? null : current)}
                  />
                  {playing !== 'video2' && (
                    <button
                      className="additional-video__play"
                      type="button"
                      aria-label={ruTypo('Воспроизвести: Экспертное AI-видео')}
                      onClick={() => toggleMedia(video2Ref.current)}
                    >
                      <span className="additional-video__play-icon" />
                    </button>
                  )}
                </div>
                <p className="additional-video__item-title">{ruTypo('Экспертное AI-видео')}</p>
                <p className="additional-video__item-desc">{ruTypo('AI-видео')}</p>
              </div>

              <a
                className="additional-video__item additional-video__item--third"
                href="https://vkvideo.ru/video-211494936_456239164"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="additional-video__preview">
                  <img
                    className="additional-video__poster"
                    src="/additional/video/mlf-90-poster.jpg.webp"
                    alt={ruTypo('МЛФ-90 — 30 лет спустя')}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="additional-video__play">
                    <span className="additional-video__play-icon" />
                  </div>
                </div>
                <p className="additional-video__item-title">{ruTypo('МЛФ-90 — 30 лет спустя')}</p>
                <p className="additional-video__item-desc">{ruTypo('Событийный видеопроект')}</p>
              </a>
            </div>
            <Link className="additional-price-link additional-price-link--video" to="/services/#ai-video">{ruTypo('Варианты AI-видео и цены')} <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="additional-social" id="social-design">
          <div className="additional-social__inner">
            <div className="additional-social__header">
              <div>
                <p className="additional-social__eyebrow">{ruTypo('СОЦСЕТИ И КАНАЛЫ')}</p>
                <h2 className="additional-social__title">{ruTypo('Оформление соцсетей и каналов')}</h2>
              </div>
              <p className="additional-social__desc">{ruTypo(ruTypo('Оформляю сообщества ВКонтакте и каналы Telegram и MAX: от обложек и аватаров до навигации, шаблонов публикаций и единого визуального стиля.'))}</p>
            </div>
            <div className="additional-social__gallery-header">
              <h3>{ruTypo('Примеры оформления ВКонтакте')}</h3>
              <p>{ruTypo('Нажмите на изображение, чтобы увеличить')}</p>
            </div>
            <div className="additional-social__gallery">
              {socialProjects.map((project) => (
                <article className="additional-social__project" key={project.name}>
                  <button className="additional-social__preview" type="button" onClick={(e) => openLightbox(project.full, ruTypo(`Оформление ВКонтакте: ${project.name}`), e.currentTarget)} aria-label={ruTypo(`Увеличить оформление ВКонтакте: ${project.name}`)}>
                    <img src={project.preview} alt={ruTypo(`Превью оформления сообщества ${project.name}`)} width="912" height="596" loading="lazy" decoding="async" />
                  </button>
                  <h4>{ruTypo(project.name)}</h4>
                  <p>{ruTypo(ruTypo(project.description))}</p>
                </article>
              ))}
            </div>
            <div className="additional-social__footer">
              <p>{ruTypo(ruTypo('Можно заказать как отдельные элементы оформления, так и комплексное оформление сообщества или канала.'))}</p>
              <Link className="additional-social__price" to="/services/#social">{ruTypo('Посмотреть варианты оформления и цены')} <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        {/* ── Materials for work ── */}
        <section className="additional-materials" id="other-works">
          <div className="additional-materials__inner">
            <div className="additional-materials__header">
              <div className="additional-materials__header-left">
                <p className="additional-materials__eyebrow">МАТЕРИАЛЫ ДЛЯ РАБОТЫ</p>
                <h2 className="additional-materials__title">
                  {ruTypo('Не просто оформить,\nа сделать материал,')}<br />
                  {ruTypo('которым ')}<span className="additional-materials__title-accent">{ruTypo('удобно пользоваться')}</span>
                </h2>
              </div>
              <div className="additional-materials__header-right">
                <p className="additional-materials__desc">
                  {ruTypo('Памятки, инструкции, чек-листы и другие рабочие материалы — с понятной структурой и визуальной системой, которую можно использовать вместе с сайтом или отдельно.')}
                </p>
                <p className="additional-materials__formats">
                  {ruTypo('памятки · инструкции · чек-листы · сертификаты · материалы для клиентов')}
                </p>
                <p className="additional-materials__accent">
                  {ruTypo('Структура · тексты · дизайн · подготовка к использованию')}
                </p>
              </div>
            </div>

            <div className="additional-materials__gallery">
              <div className="additional-materials__project additional-materials__project--hpv">
                <div className="additional-materials__img-wrap">
                  <img
                    className="additional-materials__img additional-materials__img--zoomable"
                    src="/additional/materials/hpv-series-preview.webp"
                    alt={ruTypo('ВПЧ: серия из 4 карточек')}
                    role="button"
                    tabIndex={0}
                    loading="lazy"
                    decoding="async"
                    aria-label={ruTypo('Увеличить: ВПЧ: серия из 4 карточек')}
                    onClick={(e) => openLightbox('/additional/materials/hpv-series-preview.webp', ruTypo('ВПЧ: серия из 4 карточек'), e.currentTarget)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/materials/hpv-series-preview.webp', ruTypo('ВПЧ: серия из 4 карточек')) } }}
                  />
                </div>
                <p className="additional-materials__caption-title">{ruTypo('ВПЧ: что важно знать')}</p>
                <p className="additional-materials__caption-desc">{ruTypo('Медицинская информация · серия из 4 карточек')}</p>
              </div>

              <div className="additional-materials__project additional-materials__project--certs">
                <div className="additional-materials__cert-collage">
                  <img
                    className="additional-materials__cert-main additional-materials__img--zoomable"
                    src="/additional/materials/certificate-closeup.webp"
                    alt={ruTypo('Дизайн сертификата')}
                    role="button"
                    tabIndex={0}
                    loading="lazy"
                    decoding="async"
                    aria-label={ruTypo('Увеличить: Дизайн сертификата')}
                    onClick={(e) => openLightbox('/additional/materials/certificate-closeup.webp', ruTypo('Дизайн сертификата'), e.currentTarget)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/materials/certificate-closeup.webp', ruTypo('Дизайн сертификата')) } }}
                  />
                  <img
                    className="additional-materials__cert-side additional-materials__img--zoomable"
                    src="/additional/materials/certificate-example.webp"
                    alt={ruTypo('Пример сертификата')}
                    role="button"
                    tabIndex={0}
                    loading="lazy"
                    decoding="async"
                    aria-label={ruTypo('Увеличить: Пример сертификата')}
                    onClick={(e) => openLightbox('/additional/materials/certificate-example.webp', ruTypo('Пример сертификата'), e.currentTarget)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/materials/certificate-example.webp', ruTypo('Пример сертификата')) } }}
                  />
                  <img
                    className="additional-materials__cert-side additional-materials__img--zoomable"
                    src="/additional/materials/certificate-tracking.webp"
                    alt={ruTypo('Учёт сертификатов')}
                    role="button"
                    tabIndex={0}
                    loading="lazy"
                    decoding="async"
                    aria-label={ruTypo('Увеличить: Учёт сертификатов')}
                    onClick={(e) => openLightbox('/additional/materials/certificate-tracking.webp', ruTypo('Учёт сертификатов'), e.currentTarget)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/materials/certificate-tracking.webp', ruTypo('Учёт сертификатов')) } }}
                  />
                </div>
                <p className="additional-materials__caption-title">{ruTypo('Система подарочных сертификатов')}</p>
                <p className="additional-materials__caption-desc">{ruTypo('Редактируемые шаблоны · учёт · инструкция')}</p>
                <Link className="additional-price-link additional-price-link--light" to="/services/#graphic-design">{ruTypo('Графический дизайн и цены')} <span aria-hidden="true">→</span></Link>
              </div>

              <div className="additional-materials__project additional-materials__project--memo">
                <div className="additional-materials__memo-preview">
                  <img
                    className="additional-materials__memo-page additional-materials__img--zoomable"
                    src="/additional/materials/online-consultation-memo-01.webp"
                    alt={ruTypo('Памятка — страница 1')}
                    role="button"
                    tabIndex={0}
                    loading="lazy"
                    decoding="async"
                    aria-label={ruTypo('Увеличить: Памятка — страница 1')}
                    onClick={(e) => openLightbox('/additional/materials/online-consultation-memo-01.webp', ruTypo('Памятка — страница 1'), e.currentTarget)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/materials/online-consultation-memo-01.webp', ruTypo('Памятка — страница 1')) } }}
                  />
                  <img
                    className="additional-materials__memo-page additional-materials__memo-page--offset additional-materials__img--zoomable"
                    src="/additional/materials/online-consultation-memo-02.webp"
                    alt={ruTypo('Памятка — страница 2')}
                    role="button"
                    tabIndex={0}
                    loading="lazy"
                    decoding="async"
                    aria-label={ruTypo('Увеличить: Памятка — страница 2')}
                    onClick={(e) => openLightbox('/additional/materials/online-consultation-memo-02.webp', ruTypo('Памятка — страница 2'), e.currentTarget)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/materials/online-consultation-memo-02.webp', ruTypo('Памятка — страница 2')) } }}
                  />
                </div>
                <p className="additional-materials__caption-title">{ruTypo('К онлайн-консультации')}</p>
                <p className="additional-materials__caption-desc">{ruTypo('Памятка для пациента · 2 страницы')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Нестандартные digital-задачи ── */}
        <section className="additional-special">
          <StaticParticleField />
          <div className="additional-special__inner">
            <div className="additional-special__header">
              <div className="additional-special__header-left">
                <p className="additional-special__eyebrow">{ruTypo('НЕСТАНДАРТНЫЕ DIGITAL-ЗАДАЧИ')}</p>
                <h2 className="additional-special__title">
                  {ruTypo('Когда готового формата мало,')}<br />
                  {ruTypo('можно собрать')}<br />
                  <span className="additional-special__title-accent">{ruTypo('своё решение')}</span>
                </h2>
              </div>
              <div className="additional-special__header-right">
                <p className="additional-special__desc">
                  {ruTypo('Иногда задача не укладывается в сайт, презентацию или обычный ролик. Тогда я собираю под неё отдельный формат — соединяю идею, сценарий, визуал, AI, звук и монтаж в одну цельную историю.')}
                </p>
                <p className="additional-special__formats">
                  {ruTypo('комиксы · персональные ролики · AI-аудио · digital-истории')}
                </p>
                <p className="additional-special__accent">
                  {ruTypo('Идея · сценарий · визуал · звук · монтаж')}
                </p>
              </div>
            </div>

            <div className="additional-special__gallery">
              <div className="additional-special__comic">
                <img
                  className="additional-special__comic-img additional-special__comic-img--zoomable"
                  src="/additional/special/doctor-tuya-comic.webp"
                  alt={ruTypo('Вторая жизнь доктора Туя — комикс')}
                  role="button"
                  tabIndex={0}
                  loading="lazy"
                  decoding="async"
                  aria-label={ruTypo('Увеличить: Вторая жизнь доктора Туя')}
                  onClick={(e) => openLightbox('/additional/special/doctor-tuya-comic.webp', ruTypo('Вторая жизнь доктора Туя — комикс'), e.currentTarget)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox('/additional/special/doctor-tuya-comic.webp', ruTypo('Вторая жизнь доктора Туя — комикс')) } }}
                />
                <p className="additional-special__project-title">{ruTypo('Вторая жизнь доктора Туи')}</p>
                <p className="additional-special__project-desc">{ruTypo('Комикс · digital-история')}</p>
              </div>

              <div className="additional-special__right">
                <div className="additional-special__jubilee">
                  <div className="additional-special__jubilee-preview">
                    <video
                      ref={jubileeRef}
                      className="additional-special__jubilee-video"
                      src="/additional/special/jubilee-video.mp4"
                      poster="/additional/special/jubilee-video-poster.webp"
                      preload="none"
                      playsInline
                      controls={jubileePlaying}
                      onPlay={(e) => { if (!e.currentTarget.paused) { pauseOtherMedia(e.currentTarget); setJubileePlaying(true) } }}
                      onPause={(e) => { if (e.currentTarget.paused) setJubileePlaying(false) }}
                      onEnded={() => setJubileePlaying(false)}
                      onError={() => setJubileePlaying(false)}
                    />
                    {!jubileePlaying && (
                      <button
                        className="additional-special__play"
                        type="button"
                        aria-label={ruTypo('Воспроизвести: Персональный ролик к юбилею')}
                        onClick={() => toggleMedia(jubileeRef.current)}
                      >
                        <span className="additional-special__play-icon" />
                      </button>
                    )}
                  </div>
                  <p className="additional-special__project-title">{ruTypo('Персональный ролик к\u00A0юбилею')}</p>
                  <p className="additional-special__project-desc">{ruTypo('AI-видео · 00:46')}</p>
                  <Link className="additional-price-link" to="/services/#video-greetings">{ruTypo('Видеопоздравления: форматы и цены')} <span aria-hidden="true">→</span></Link>
                </div>

                <div className="additional-special__audio">
                  <p className="additional-special__audio-title">{ruTypo('Песня об\u00A0ИИ')}</p>
                  <p className="additional-special__audio-desc">{ruTypo('AI-аудиопроект о\u00A0вдохновении на\u00A0стыке человека и\u00A0технологии.')}</p>
                  <div className="additional-special__audio-player">
                    <audio ref={audioRef} src="/additional/special/ai-song.mp3" preload="metadata"
                      onPlay={(e) => { if (!e.currentTarget.paused) { pauseOtherMedia(e.currentTarget); setAudioPlaying(true) } }}
                      onPause={(e) => { if (e.currentTarget.paused) setAudioPlaying(false) }}
                      onEnded={() => setAudioPlaying(false)}
                      onError={() => setAudioPlaying(false)}
                    />
                    <button
                      className="additional-special__audio-btn"
                      type="button"
                      aria-label={audioPlaying ? ruTypo('Пауза') : ruTypo('Воспроизвести')}
                      onClick={() => toggleMedia(audioRef.current)}
                    >
                      {audioPlaying ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor"/><rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 2.5v11l9-5.5z" fill="currentColor"/></svg>
                      )}
                    </button>
                    <input
                      className="additional-special__audio-timeline"
                      type="range"
                      min={0}
                      max={audioDuration || 0}
                      step={1}
                      value={Math.min(audioTime, audioDuration)}
                      disabled={!audioDuration}
                      onChange={(e) => {
                        const time = Number(e.currentTarget.value)
                        if (audioRef.current) audioRef.current.currentTime = time
                        setAudioTime(time)
                      }}
                      aria-label={ruTypo('Прогресс воспроизведения')}
                      aria-valuetext={`${formatTime(audioTime)} / ${formatTime(audioDuration)}`}
                      style={{ backgroundSize: `${audioDuration ? (audioTime / audioDuration) * 100 : 0}% 4px, 100% 4px` }}
                    />
                    <span className="additional-special__audio-time">{formatTime(audioTime)}</span>
                    <span className="additional-special__audio-time">{formatTime(audioDuration)}</span>
                  </div>
                  <p className="additional-special__project-desc">{ruTypo('AI-аудио · 03:26')}</p>
                  <Link className="additional-price-link" to="/services/#songs">{ruTypo('Персональные песни: варианты и цены')} <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="additional-cta">
          <StaticParticleField baseColor={{ r: 0, g: 0, b: 0 }} alphaMultiplier={1} />
          <div className="additional-cta__inner">
            <div className="additional-cta__text">
              <p className="additional-cta__eyebrow">{ruTypo('Обсудить проект')}</p>
              <h2 className="additional-cta__title">
                {ruTypo('Есть цель —')}<br />
                {ruTypo('подберём способ')}<br />
                <span className="additional-cta__title-accent">{ruTypo('её реализовать')}</span>
              </h2>
              <p className="additional-cta__desc">
                {ruTypo('Если вы понимаете, что хотите получить в\u00A0итоге, но не знаете, нужен ли для этого сайт, Taplink, презентация, видео или другой визуальный материал — расскажите. Я\u00A0помогу выбрать подходящий вариант в\u00A0рамках моих услуг и\u00A0при необходимости собрать несколько элементов в\u00A0одной визуальной системе.')}
              </p>
              <div className="additional-cta__actions">
                <ExternalCtaButton href="https://t.me/TuianaBudaeva" onClick={() => trackMetrikaGoal('lead_telegram')}>
                  {ruTypo('Написать в Telegram')}
                </ExternalCtaButton>
                <ExternalCtaButton href="https://max.ru/u/f9LHodD0cOJDGbO0Sorwblf99n3A7bCVNPyelDjsJJW77eyRZo7ssG4wJr4" primary={false} onClick={() => trackMetrikaGoal('lead_max')}>
                  {ruTypo('Написать в MAX')}
                </ExternalCtaButton>
              </div>
              <div className="additional-cta__more">
                <p className="additional-cta__more-title">{ruTypo('Хотите посмотреть больше?')}</p>
                <p className="additional-cta__more-desc">
                  {ruTypo('В каналах я показываю новые сайты, AI-визуал, ролики, презентации и экспериментальные проекты — то, что не всегда попадает в портфолио.')}
                </p>
                <nav className="additional-cta__socials" aria-label={ruTypo('Социальные сети')}>
                  <a className="additional-cta__social-link additional-cta__social-link--featured" href="https://t.me/tuiana_ai_2" target="_blank" rel="noopener noreferrer">{ruTypo('Telegram-канал')}<span className="additional-cta__social-arrow" aria-hidden="true"> ↗</span></a>
                  <span className="additional-cta__social-sep" aria-hidden="true">·</span>
                  <a className="additional-cta__social-link additional-cta__social-link--featured" href="https://max.ru/channel_Tuiana_Design" target="_blank" rel="noopener noreferrer">{ruTypo('MAX-канал')}<span className="additional-cta__social-arrow" aria-hidden="true"> ↗</span></a>
                  <span className="additional-cta__social-sep" aria-hidden="true">·</span>
                  <a className="additional-cta__social-link" href="https://vk.ru/tuiana.design" target="_blank" rel="noopener noreferrer">VK<span className="additional-cta__social-arrow" aria-hidden="true"> ↗</span></a>
                  <span className="additional-cta__social-sep" aria-hidden="true">·</span>
                  <a className="additional-cta__social-link" href="https://www.instagram.com/tuiana.design/" target="_blank" rel="noopener noreferrer">Instagram<span className="additional-cta__social-arrow" aria-hidden="true"> ↗</span></a>
                </nav>
              </div>
            </div>
            <div className="additional-cta__portrait">
              <img
                className="additional-cta__portrait-img"
                src="/additional/cta-portrait.webp"
                alt={ruTypo('Tuiana — портрет')}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {lightbox && createPortal(
        <div
          className="additional-materials__lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр изображения"
        >
          <button
            ref={lightboxCloseRef}
            className="additional-materials__lightbox-close"
            onClick={closeLightbox}
            aria-label="Закрыть увеличенное изображение"
          >
            ✕
          </button>
          <img
            className="additional-materials__lightbox-img"
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  )
}
