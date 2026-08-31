import { useState, useCallback, useRef, useEffect, Fragment } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './GlobalMenu.css'

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'instant' })
}

function scrollToPacScroll(offset: number) {
  const pacEl = document.querySelector('.pac-scroll')
  if (!pacEl) return
  const target = pacEl.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top: target, behavior: 'instant' })
}

interface MenuChild {
  label: string
  action: () => void
}

interface MenuItem {
  label: string
  action: () => void
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
    btnRef.current?.focus()
  }, [])

  const goHomeSection = useCallback(
    (target: string) => {
      sessionStorage.setItem('tuiana-home-target', target)
      navigate('/')
    },
    [navigate]
  )

  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const items: MenuItem[] = isHome
    ? [
        { label: 'Главная', action: () => window.scrollTo({ top: 0, behavior: 'instant' }) },
        { label: 'Услуги', action: () => scrollToId('services') },
        {
          label: 'Кейсы',
          action: () => scrollToId('cases'),
          children: [
            { label: 'Дари', action: () => navigate('/projects/dari') },
            { label: 'Наша База', action: () => navigate('/projects/baza') },
            { label: 'Taplink / мини-сайты', action: () => navigate('/projects/taplink') },
          ],
        },
        { label: 'Обо мне', action: () => scrollToPacScroll(window.innerHeight * 1.4 * 0.9) },
        { label: 'Отзывы', action: () => scrollToId('reviews') },
        { label: 'Контакты', action: () => scrollToId('contact') },
      ]
    : [
        { label: 'Главная', action: () => goHomeSection('top') },
        { label: 'Услуги', action: () => goHomeSection('services') },
        {
          label: 'Кейсы',
          action: () => goHomeSection('cases'),
          children: [
            { label: 'Дари', action: () => navigate('/projects/dari') },
            { label: 'Наша База', action: () => navigate('/projects/baza') },
            { label: 'Taplink / мини-сайты', action: () => navigate('/projects/taplink') },
          ],
        },
        { label: 'Обо мне', action: () => goHomeSection('about') },
        { label: 'Отзывы', action: () => goHomeSection('reviews') },
        { label: 'Контакты', action: () => goHomeSection('contact') },
      ]

  const handleItemClick = useCallback((item: { action: () => void }) => {
    item.action()
    close()
  }, [close])

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
            <button
              type="button"
              className="global-menu-panel__item"
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </button>
            {item.children?.map((child) => (
              <button
                key={child.label}
                type="button"
                className="global-menu-panel__item global-menu-panel__item--child"
                onClick={() => handleItemClick(child)}
              >
                {child.label}
              </button>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  )
}
