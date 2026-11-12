import { useState, useCallback, useRef, useEffect, Fragment } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { scrollToAbout } from './lib/scrollToAbout'
import { scrollToCases } from './lib/scrollToCases'
import './GlobalMenu.css'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'instant' })
}

interface MenuChild {
  label: string
  to: string
  action?: () => void
}

interface MenuItem {
  label: string
  to: string
  action?: () => void
  children?: MenuChild[]
}

export default function GlobalMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const navigate = useNavigate()

  const close = useCallback(() => {
    setIsOpen(false)
    btnRef.current?.focus({ preventScroll: true })
  }, [])

  const goHomeSection = useCallback(
    (target: string) => {
      sessionStorage.setItem('tuiana-home-target', target)
      navigate('/')
    },
    [navigate]
  )

  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const additionalChildren: MenuChild[] = [
    { label: 'Нейрофотосессии', to: '/additional/#neurophoto' },
    { label: 'Презентации', to: '/additional/#presentations' },
    { label: 'Видео', to: '/additional/#video' },
    { label: 'Оформление соцсетей', to: '/additional/#social-design' },
    { label: 'Другие работы', to: '/additional/#other-works' },
  ]
  const caseChildren: MenuChild[] = [
    { label: 'Дари', to: '/projects/dari' },
    { label: 'Наша База', to: '/projects/baza' },
    { label: 'Taplink / мини-сайты', to: '/projects/taplink' },
    { label: 'Диагрупп · презентация', to: '/projects/diagrupp/' },
  ]

  const items: MenuItem[] = isHome
    ? [
        { label: 'Главная', to: '/', action: () => window.scrollTo({ top: 0, behavior: 'instant' }) },
        { label: 'Услуги и цены', to: '/services' },
        { label: 'Дополнительно', to: '/additional/', children: additionalChildren },
        {
          label: 'Кейсы',
          to: '/#cases',
          action: scrollToCases,
          children: caseChildren,
        },
        { label: 'Обо мне', to: '/#about', action: scrollToAbout },
        { label: 'Отзывы', to: '/#reviews', action: () => scrollToId('reviews') },
        { label: 'Контакты', to: '/#contact', action: () => scrollToId('contact') },
      ]
    : [
        { label: 'Главная', to: '/', action: () => goHomeSection('top') },
        { label: 'Услуги и цены', to: '/services' },
        { label: 'Дополнительно', to: '/additional/', children: additionalChildren },
        {
          label: 'Кейсы',
          to: '/#cases',
          action: () => goHomeSection('cases'),
          children: caseChildren,
        },
        { label: 'Обо мне', to: '/#about', action: () => goHomeSection('about') },
        { label: 'Отзывы', to: '/#reviews', action: () => goHomeSection('reviews') },
        { label: 'Контакты', to: '/#contact', action: () => goHomeSection('contact') },
      ]

  const handleItemClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>, item: MenuChild) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (item.action) {
      event.preventDefault()
      event.stopPropagation()
      item.action()
    } else if (location.pathname.replace(/\/$/, '') === '/additional' && item.to === `/additional/${location.hash}` && location.hash) {
      event.preventDefault()
      scrollToId(location.hash.slice(1))
    }
    close()
  }, [close, location.hash, location.pathname])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }

    const onClickOutside = (e: PointerEvent) => {
      const target = e.target as Node
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        btnRef.current && !btnRef.current.contains(target)
      ) {
        close()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onClickOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onClickOutside)
    }
  }, [isOpen, close])

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`global-menu-btn${isOpen ? ' global-menu-btn--open' : ''}`}
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={isOpen}
        aria-controls="global-menu-panel"
        onClick={toggle}
      >
        <span className="global-menu-btn__line" />
        <span className="global-menu-btn__line" />
      </button>

      <div
        ref={panelRef}
        id="global-menu-panel"
        className={`global-menu-panel${isOpen ? ' global-menu-panel--open' : ''}`}
        role="dialog"
        aria-label="Меню"
      >
        {items.map((item) => (
          <Fragment key={item.label}>
            <Link
              to={item.to}
              className="global-menu-panel__item"
              onClick={(event) => handleItemClick(event, item)}
            >
              {item.label}
            </Link>
            {item.children?.map((child) => (
              <Link
                key={child.label}
                to={child.to}
                className="global-menu-panel__item global-menu-panel__item--child"
                onClick={(event) => handleItemClick(event, child)}
              >
                {child.label}
              </Link>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  )
}
