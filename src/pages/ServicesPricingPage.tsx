import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './ServicesPricingPage.css'
import { ruTypo } from '../lib/typography'
import ContactSection from '../ContactSection'
import Footer from '../Footer'

type PriceItem = {
  id: string
  name: string
  price: string
  summary: string
  details: string
  includes?: string[]
  example?: { to: string; label: string }
  additionalExample?: { to: string; label: string }
}

type PriceGroup = {
  label?: string
  items: PriceItem[]
}

type PriceSection = {
  id: string
  title: string
  intro: string
  groups: PriceGroup[]
  note?: string
  example?: { to: string; label: string }
}

const sections: PriceSection[] = [
  {
    id: 'sites',
    title: 'Сайты',
    intro: 'От компактной страницы для записи до многостраничного проекта с индивидуальной структурой.',
    groups: [{ items: [
      {
        id: 'taplink', name: 'Мини-сайт на Taplink', price: 'от 15 000 ₽',
        summary: 'Услуги, контакты и запись — в одной удобной ссылке.',
        details: 'Компактная страница с индивидуальным оформлением. Помогу продумать структуру и тексты, настрою Taplink и подготовлю сайт к публикации.',
        includes: ['Структура и тексты', 'Индивидуальное оформление', 'Кнопки связи и встроенная форма заявки', 'Настройка и публикация'],
        example: { to: '/projects/taplink', label: 'О формате Taplink' },
      },
      {
        id: 'landing', name: 'Лендинг под ключ', price: 'от 25 000 ₽',
        summary: 'Полноценная одностраничная история о продукте или услуге.',
        details: 'Собираю информацию, выстраиваю логику блоков, помогаю с текстами, создаю индивидуальный дизайн, адаптирую страницу для разных экранов и запускаю сайт.',
      },
      {
        id: 'multipage', name: 'Многостраничный сайт', price: 'от 45 000 ₽',
        summary: 'Для нескольких услуг, направлений или разделов.',
        details: 'Проектирую архитектуру страниц и навигацию, работаю с текстами, создаю единую визуальную систему и адаптивную версию. Количество страниц, интеграции, дополнительные функции и специальные требования обсуждаем до начала работы. Для сложных проектов стоимость рассчитывается индивидуально.',
        example: { to: '/projects/baza', label: 'Посмотреть кейс «Наша База»' },
        additionalExample: { to: '/projects/dari', label: 'Посмотреть кейс клиники ДАРИ' },
      },
    ] }],
    note: 'Для Taplink встроенная форма заявки входит в базовую стоимость. Дополнительные внутренние страницы, сторонний календарь записи и тариф платформы обсуждаются отдельно. Сложные многостраничные проекты с нестандартными функциями рассчитываются индивидуально.',
  },
  {
    id: 'social',
    title: 'Соцсети и каналы',
    intro: 'Оформление сообщества или канала, чтобы проект выглядел цельно и его было удобно читать.',
    groups: [
      { label: 'ВКонтакте', items: [
        { id: 'vk-base', name: 'Обложка + аватар', price: 'от 2 000 ₽', summary: 'Базовый комплект для страницы или сообщества.', details: 'Горизонтальная обложка и аватар в едином стиле.' },
        { id: 'vk-mobile', name: 'Обложка + аватар + вертикальная обложка', price: 'от 3 000 ₽', summary: 'Дополнительно — оформление для мобильного просмотра.', details: 'Для сообщества ВКонтакте: горизонтальная обложка, аватар и статичная вертикальная («живая») обложка. Анимация и видео в эту цену не входят.' },
        { id: 'vk-full', name: 'Полное оформление сообщества', price: 'от 5 500 ₽', summary: 'Основные элементы сообщества в одной визуальной системе.', details: 'Включены обложка, аватар, меню, описание, оформление основных разделов и закреплённый приветственный пост.' },
      ] },
      { label: 'Telegram', items: [
        { id: 'tg-base', name: 'Базовое оформление', price: 'от 1 800 ₽', summary: 'Аватар, название и описание канала.', details: 'Оформление аватара, помощь с названием, описанием и основными настройками.' },
        { id: 'tg-full', name: 'Оформление под ключ', price: 'от 3 800 ₽', summary: 'Канал с навигацией и приветствием.', details: 'Базовое оформление, закреплённый приветственный пост, навигация и два шаблона публикаций.' },
      ] },
      { label: 'MAX', items: [
        { id: 'max-base', name: 'Базовое оформление', price: 'от 1 800 ₽', summary: 'Аватар, название, описание и настройки.', details: 'Оформление в пределах возможностей MAX. Создание публичного канала зависит от условий площадки и доступов владельца.' },
        { id: 'max-full', name: 'Расширенное оформление', price: 'от 2 800 ₽', summary: 'Базовое оформление с приветствием и навигацией.', details: 'Базовое оформление, закреплённый пост и простая навигация, если они доступны для конкретного типа канала.' },
      ] },
      { label: 'Комплексы', items: [
        { id: 'tg-max', name: 'Telegram + MAX', price: '5 200 ₽', summary: 'Единый стиль для двух каналов.', details: 'Оформление Telegram под ключ и адаптация общей визуальной системы для MAX.' },
        { id: 'vk-tg', name: 'ВКонтакте + Telegram', price: '7 900 ₽', summary: 'Сообщество и канал в согласованном составе.', details: 'Оформление сообщества ВКонтакте и Telegram в едином стиле. Состав работ уточняем до старта.' },
        { id: 'vk-tg-max', name: 'ВКонтакте + Telegram + MAX', price: '9 900 ₽', summary: 'Три площадки — одна визуальная система.', details: 'Комплексное оформление трёх площадок. Дополнительные публикации сверх согласованного состава не включены.' },
      ] },
      { label: 'Запуск проекта', items: [
        {
          id: 'project-launch', name: 'Запуск проекта с нуля', price: 'от 15 000 ₽',
          summary: 'От идеи до оформленных площадок и первых публикаций.',
          details: 'Для тех, у кого уже есть идея, но пока нет оформленного проекта. Помогу определить основную концепцию, подготовить название и описания, создать единый визуальный стиль и оформить выбранные площадки. '
            + 'Базовая стоимость рассчитана на один проект, до трёх площадок, три готовые публикации и два раунда правок. '
            + 'Глубокий брендинг, дополнительные публикации, сложные видео, регулярное ведение, реклама и продвижение не входят в стоимость. '
            + 'Создание и настройка площадок выполняются при наличии необходимых доступов и технических возможностей платформ. '
            + 'Точный состав работ и стоимость согласовываются до начала проекта.',
          includes: [
            'Знакомство с идеей, целями и аудиторией',
            'Базовая концепция и позиционирование',
            'Помощь с названием и описаниями',
            'Единый визуальный стиль',
            'Оформление до трёх площадок: ВКонтакте, Telegram и MAX',
            'Три стартовые публикации: тексты и визуалы',
            'Передача материалов и объяснение основных функций',
          ],
        },
      ] },
      { label: 'Дополнительные материалы', items: [
        { id: 'vk-menu', name: 'Дополнительная карточка меню ВК', price: 'от 500 ₽', summary: 'Один дополнительный элемент меню.', details: 'Оформление одной карточки в существующем стиле сообщества.' },
        { id: 'post-cover', name: 'Обложка публикации', price: 'от 700 ₽', summary: 'Изображение для одного поста.', details: 'Подготовка отдельной обложки или иллюстрации для публикации.' },
        { id: 'post', name: 'Пост: текст + изображение', price: 'от 1 200 ₽', summary: 'Одна готовая публикация.', details: 'Подготовка текста и визуального оформления для одного поста.' },
        { id: 'posts-3', name: 'Комплект из 3 постов', price: 'от 3 000 ₽', summary: 'Три публикации с текстами и визуалами.', details: 'Три готовые публикации в согласованной теме и стиле.' },
        { id: 'templates-3', name: 'Набор из 3 шаблонов', price: 'от 2 000 ₽', summary: 'Шаблоны для самостоятельных публикаций.', details: 'Три согласованных шаблона, которые можно использовать для следующих материалов.' },
        { id: 'adapt-social', name: 'Адаптация под другую площадку', price: 'от 1 000 ₽', summary: 'Перенос существующего оформления в другой формат.', details: 'Адаптация ранее созданных материалов под размеры и особенности второй платформы.' },
      ] },
    ],
    note: 'Обычно 3–10 рабочих дней после получения материалов, до двух раундов правок. Ведение, реклама, продвижение и привлечение подписчиков не входят в оформление.',
  },
  {
    id: 'presentations',
    title: 'Презентации',
    intro: 'Для выступлений, проектов, обучения и деловых встреч. От аккуратного оформления до работы с содержанием.',
    groups: [{ items: [
      { id: 'slide-design', name: 'Оформление готового слайда', price: 'от 350 ₽ / слайд', summary: 'Когда содержание уже готово, но нужен порядок в оформлении.', details: 'Улучшаю шрифты, цвета, отступы и выравнивание существующего слайда. Переработка содержания не входит.' },
      { id: 'slide-text', name: 'Слайд из готового текста', price: 'от 600 ₽ / слайд', summary: 'Создаю композицию из предоставленного текста.', details: 'Дизайн слайда, визуальная иерархия и простая графика. Сложные схемы и поиск информации оцениваются отдельно.' },
      { id: 'slide-full', name: 'Слайд под ключ', price: 'от 900 ₽ / слайд', summary: 'От исходных материалов до готового слайда.', details: 'Выделяю главное, сокращаю и структурирую текст, создаю визуальную подачу. Глубокое исследование, сложные графики и уникальные иллюстрации — отдельно.' },
      { id: 'slide-template', name: 'Шаблон презентации', price: 'от 3 000 ₽', summary: 'Пять редактируемых макетов в PowerPoint.', details: 'Титульный слайд, текстовый, текст с изображением, разделитель и финальный слайд. Заполнение всей презентации не входит.' },
    ] }],
    example: { to: '/additional', label: 'Примеры презентаций и визуальных материалов' },
  },
  {
    id: 'ai-photo',
    title: 'AI-фотосессии',
    intro: 'Новые портреты и визуальные истории на основе ваших фотографий и пожеланий.',
    groups: [{ items: [
      { id: 'photo-one', name: 'Один AI-портрет', price: 'от 500 ₽', summary: 'Один готовый кадр.', details: 'Создаю портрет по исходным материалам и согласованной идее.' },
      { id: 'photo-five', name: '5 готовых фото', price: '1 800 ₽', summary: 'Небольшая серия в одном стиле.', details: 'Пять готовых изображений одного человека.' },
      { id: 'photo-ten', name: '10 готовых фото', price: '3 000 ₽', summary: 'Серия портретов с разными образами.', details: 'Десять готовых изображений одного человека.' },
      { id: 'photo-twenty', name: '20 готовых фото', price: '5 000 ₽', summary: 'Большой комплект изображений.', details: 'Двадцать готовых изображений одного человека.' },
    ] }],
    note: 'Пакеты рассчитаны на одного человека. Групповые кадры, сложная реставрация и дополнительные изображения оплачиваются отдельно. Абсолютная точность сходства при AI-генерации не гарантируется.',
    example: { to: '/additional', label: 'Посмотреть AI-визуал' },
  },
  {
    id: 'ai-video',
    title: 'AI-видео',
    intro: 'Короткие ролики, оживление фотографий и рекламные видео с использованием AI.',
    groups: [{ items: [
      { id: 'animate-one', name: 'Оживление одной фотографии', price: 'от 800 ₽', summary: 'Небольшое движение в статичном кадре.', details: 'Простая AI-анимация одной фотографии. Длительность и сложность согласовываем до заказа.' },
      { id: 'clip-15', name: 'Короткое AI-видео до 15 секунд', price: 'от 2 500 ₽', summary: 'Короткий ролик в выбранном стиле.', details: 'Создание ролика в согласованном объёме и визуальном стиле.' },
      { id: 'clip-30', name: 'AI-видео 15–30 секунд', price: 'от 4 500 ₽', summary: 'Несколько сцен в единой визуальной истории.', details: 'Ролик длительностью 15–30 секунд. Сложность и количество сцен определяем заранее.' },
      { id: 'clip-60', name: 'Рекламный AI-ролик 30–60 секунд', price: 'от 8 000 ₽', summary: 'Видео для продукта, бренда или услуги.', details: 'Сценарий, количество сцен, звук и сложность монтажа обсуждаем перед расчётом.' },
    ] }],
    example: { to: '/additional', label: 'Посмотреть видеоработы' },
  },
  {
    id: 'video-greetings',
    title: 'Видеопоздравления',
    intro: 'Личные истории из фотографий и видео — от простого монтажа до авторского фильма.',
    groups: [{ items: [
      { id: 'greeting-basic', name: 'Видеопоздравление из фотографий', price: 'от 2 000 ₽', summary: 'Монтаж фото под музыку, без AI-оживления.', details: 'Собираю согласованные фотографии в ролик с музыкой, переходами и надписями.' },
      { id: 'greeting-ai', name: 'Видеопоздравление с AI-оживлением', price: 'от 4 000 ₽', summary: 'Часть фотографий оживает в кадре.', details: 'Монтаж фотографий с AI-анимацией согласованного количества кадров.' },
      { id: 'greeting-film', name: 'Сложный авторский фильм', price: 'от 6 000 ₽', summary: 'Индивидуальная история с продуманной драматургией.', details: 'Замысел, подбор материалов и монтаж согласовываем до начала работы.' },
    ] }],
    note: 'Фотографии, музыка, надписи и идея согласовываются до монтажа. Изменения готового ролика оплачиваются отдельно; свои опечатки и технические ошибки исправляю бесплатно.',
  },
  {
    id: 'graphic-design',
    title: 'Графический дизайн',
    intro: 'Афиши, сертификаты и другие материалы для бизнеса, мероприятий и личных проектов.',
    groups: [{ items: [
      { id: 'poster', name: 'Афиша / постер', price: 'от 1 000 ₽', summary: 'Один дизайн-макет.', details: 'Разрабатываю макет в согласованном формате и стиле.' },
      { id: 'certificate', name: 'Подарочный сертификат', price: 'от 1 000 ₽', summary: 'Персональный дизайн сертификата.', details: 'Один макет сертификата в согласованном формате.' },
      { id: 'invitation', name: 'Приглашение / открытка', price: 'от 700 ₽', summary: 'Для события или личного повода.', details: 'Один индивидуальный дизайн в согласованном формате.' },
      { id: 'banner', name: 'Рекламный баннер', price: 'от 800 ₽', summary: 'Графика для объявления или акции.', details: 'Один рекламный баннер. Дополнительные размеры и адаптации оцениваются отдельно.' },
      { id: 'price-list', name: 'Прайс-лист до 2 страниц', price: 'от 1 500 ₽', summary: 'Аккуратная подача услуг и цен.', details: 'Оформление прайс-листа на одной или двух страницах по предоставленным материалам.' },
    ] }],
    example: { to: '/additional', label: 'Посмотреть примеры дизайна' },
  },
  {
    id: 'songs',
    title: 'Персональные песни',
    intro: 'Музыкальный подарок, посвящённый человеку, событию или вашей истории.',
    groups: [{ items: [
      { id: 'song-lyrics', name: 'Песня на готовые стихи', price: 'от 1 200 ₽', summary: 'Музыка для ваших слов.', details: 'Создаю песню с помощью AI по готовому тексту. Формат результата согласовываем заранее.' },
      { id: 'song-full', name: 'Песня с написанием текста', price: 'от 2 500 ₽', summary: 'История, текст и музыкальная версия.', details: 'Пишу текст по вашей истории или пожеланиям и создаю песню с помощью AI. Это не студийная запись с живыми музыкантами.' },
    ] }],
    note: 'Условия использования готовой музыки, включая коммерческое применение, зависят от лицензии и согласовываются до заказа.',
  },
]

const navigatorUrl = 'https://budaevatuiana1-ai.github.io/site-format-navigator/'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

function PriceRow({ item, index, expanded, onToggle }: {
  item: PriceItem
  index: number
  expanded: boolean
  onToggle: () => void
}) {
  const panelId = `sp-detail-${item.id}`
  return (
    <article className={`sp-price${expanded ? ' sp-price--open' : ''}`}>
      <button
        type="button"
        className="sp-price__toggle"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className="sp-price__number">{String(index + 1).padStart(2, '0')}</span>
        <span className="sp-price__body">
          <span className="sp-price__name">{ruTypo(item.name)}</span>
          <span className="sp-price__summary">{ruTypo(item.summary)}</span>
        </span>
        <span className="sp-price__price">{ruTypo(item.price)}</span>
        <span className="sp-price__icon" aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>
      <div className="sp-price__details" id={panelId} hidden={!expanded}>
        <p>{ruTypo(item.details)}</p>
        {item.includes && (
          <ul className="sp-price__includes">
            {item.includes.map(part => <li key={part}>{ruTypo(part)}</li>)}
          </ul>
        )}
        {(item.example || item.additionalExample) && (
          <div className="sp-price__examples">
            {item.example && (
              <Link className="sp-text-link" to={item.example.to}>
                {ruTypo(item.example.label)}<span aria-hidden="true">↗</span>
              </Link>
            )}
            {item.additionalExample && (
              <Link className="sp-text-link" to={item.additionalExample.to}>
                {ruTypo(item.additionalExample.label)}<span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default function ServicesPricingPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleAnchor = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollToId(id)
  }

  return (
    <>
      <main className="services-pricing">
        <section className="sp-hero" aria-labelledby="sp-page-title">
          <div className="sp-hero__inner">
            <div className="sp-hero__story">
              <p className="sp-eyebrow"><span className="sp-eyebrow__mark" />TUIANA DESIGN / УСЛУГИ</p>
              <h1 id="sp-page-title" className="sp-hero__title">
                <span>Услуги</span>
                <span className="sp-hero__title-accent">и&nbsp;цены</span>
              </h1>
              <p className="sp-hero__lead">
                {ruTypo('Делаю сайты, оформляю страницы и каналы, создаю презентации, изображения и видео.')}
              </p>
              <p className="sp-hero__note">
                {ruTypo('Здесь можно посмотреть, что я предлагаю и сколько это стоит. Если пока не знаете, какой вариант вам подойдёт, расскажите о своей задаче — помогу определиться.')}
              </p>
              <div className="sp-hero__actions">
                <a className="sp-button" href="#contact" onClick={handleAnchor('contact')}>
                  Обсудить задачу <span aria-hidden="true">↗</span>
                </a>
                <a className="sp-hero__secondary" href="#sites" onClick={handleAnchor('sites')}>
                  Смотреть цены <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <nav className="sp-directory" aria-label="Навигация по направлениям услуг">
              <div className="sp-directory__head">
                <span>КАТАЛОГ УСЛУГ</span>
                <span>01 — 08</span>
              </div>
              <div className="sp-directory__list">
                {sections.map((section, index) => (
                  <a key={section.id} className="sp-directory__item" href={`#${section.id}`} onClick={handleAnchor(section.id)}>
                    <span className="sp-directory__number">{String(index + 1).padStart(2, '0')}</span>
                    <span className="sp-directory__name">{ruTypo(section.title)}</span>
                    <span className="sp-directory__arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <p className="sp-directory__hint">{ruTypo('Выберите направление, чтобы перейти к стоимости')}</p>
            </nav>
          </div>
        </section>

        {sections.map((section, sIndex) => (
          <section
            key={section.id}
            id={section.id}
            className={`sp-section${sIndex % 2 === 1 ? ' sp-section--alternate' : ''}`}
            aria-labelledby={`sp-title-${section.id}`}
          >
            <div className="sp-section__inner">
              <header className="sp-section__intro">
                <p className="sp-section__eyebrow">
                  <span>{String(sIndex + 1).padStart(2, '0')}</span> / НАПРАВЛЕНИЕ
                </p>
                <h2 id={`sp-title-${section.id}`} className="sp-section__title">{ruTypo(section.title)}</h2>
                <p className="sp-section__description">{ruTypo(section.intro)}</p>
                {section.example && (
                  <Link className="sp-section__example sp-text-link" to={section.example.to}>
                    {ruTypo(section.example.label)}<span aria-hidden="true">↗</span>
                  </Link>
                )}
              </header>

              <div className="sp-section__content">
                {section.groups.map((group, groupIndex) => (
                  <div className="sp-group" key={`${section.id}-${group.label ?? groupIndex}`}>
                    {group.label && <h3 className="sp-group__title">{ruTypo(group.label)}</h3>}
                    <div className="sp-group__items">
                      {group.items.map((item, itemIndex) => (
                        <PriceRow
                          key={item.id}
                          item={item}
                          index={itemIndex}
                          expanded={openItem === item.id}
                          onToggle={() => setOpenItem(openItem === item.id ? null : item.id)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
                {section.note && <p className="sp-section__note">{ruTypo(section.note)}</p>}
                {section.id === 'sites' && (
                  <a className="sp-navigator" href={navigatorUrl} target="_blank" rel="noopener noreferrer">
                    <span className="sp-navigator__copy">
                      <span className="sp-navigator__eyebrow">{ruTypo('ВСЁ ЕЩЁ НЕ ОПРЕДЕЛИЛИСЬ?')}</span>
                      <strong>{ruTypo('Навигатор выбора сайта')}</strong>
                      <span className="sp-navigator__desc">
                        {ruTypo('Ответьте на несколько вопросов — и получите предварительную рекомендацию по формату сайта.')}
                      </span>
                      <span className="sp-navigator__action">{ruTypo('Подобрать формат сайта')} <span aria-hidden="true">↗</span></span>
                    </span>
                    <span className="sp-navigator__arrow" aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </section>
        ))}

        <section className="sp-terms" aria-labelledby="sp-terms-title">
          <div className="sp-terms__inner">
            <div className="sp-terms__intro">
              <p className="sp-terms__eyebrow">ПЕРЕД НАЧАЛОМ РАБОТЫ</p>
              <h2 id="sp-terms-title">Прозрачные<br /><span>условия.</span></h2>
              <p>{ruTypo('Объём, формат результата, сроки и стоимость обсуждаем до начала проекта.')}</p>
              <a className="sp-terms__cta" href="#contact" onClick={handleAnchor('contact')}>
                Обсудить задачу <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="sp-terms__facts">
              <div className="sp-terms__fact">
                <span className="sp-terms__num">01</span>
                <div><strong>50% предоплата</strong><p>{ruTypo('Для всех услуг. Остальные условия оплаты согласовываем перед началом работы.')}</p></div>
              </div>
              <div className="sp-terms__fact">
                <span className="sp-terms__num">02</span>
                <div><strong>Стоимость без сюрпризов</strong><p>{ruTypo('Цена «от» — стартовая. Точную сумму фиксируем после согласования состава работы.')}</p></div>
              </div>
              <div className="sp-terms__fact">
                <span className="sp-terms__num">03</span>
                <div><strong>Сроки и правки</strong><p>{ruTypo('Определяем заранее для каждого проекта. Дополнительные задачи оцениваем отдельно.')}</p></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ContactSection />
      <Footer />
    </>
  )
}
