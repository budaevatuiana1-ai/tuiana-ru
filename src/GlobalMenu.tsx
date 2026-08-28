import { useState, useCallback, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

interface MenuItem {
  label: string
  action: () => void
}

export default function GlobalMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const close = useCallback(() => {
    setIsOpen(false)
    btnRef.current?.focus()
  }, [])

  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const items: MenuItem[] = isHome
    ? [
        { label: 'Услуги', action: () => scrollToId('services') },
        { label: 'Как я работаю', action: () => scrollToPacScroll(0) },
        { label: 'Обо мне', action: () => scrollToPacScroll(window.innerHeight * 1.4 * 0.9) },
        { label: 'Отзывы', action: () => scrollToId('reviews') },
        { label: 'Контакты', action: () => scrollToId('contact') },
      ]
    : [
        { label: 'Услуги', action: () => {} },
        { label: 'Как я работаю', action: () => {} },
        { label: 'Обо мне', action: () => {} },
        { label: 'Отзывы', action: () => {} },
        { label: 'Контакты', action: () => {} },
      ]

  const handleItemClick = useCallback((item: MenuItem) => {
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
          <button
            key={item.label}
            type="button"
            className="global-menu-panel__item"
            onClick={() => handleItemClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  )
}
