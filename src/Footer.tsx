import { useCallback } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import StaticParticleField from './StaticParticleField'
import './Footer.css'

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/TuianaBudaeva' },
  { label: 'MAX', href: 'https://max.ru/u/f9LHodD0cOJDGbO0Sorwblf99n3A7bCVNPyelDjsJJW77eyRZo7ssG4wJr4' },
  { label: 'VK', href: 'https://vk.ru/tuianadesign' },
  { label: 'Instagram', href: 'https://www.instagram.com/tuiana.design/' },
]

const siteLinks = [
  { label: 'Главная', target: 'top' },
  { label: 'Услуги', target: 'services' },
  { label: 'Обо мне', target: 'about' },
  { label: 'Отзывы', target: 'reviews' },
  { label: 'Контакты', target: 'contact' },
]

const caseLinks = [
  { label: 'DARI', route: '/projects/dari' },
  { label: 'Наша База', route: '/projects/baza' },
]

function scrollToPacScroll(offset: number) {
  const pacEl = document.querySelector('.pac-scroll')
  if (!pacEl) return
  const target = pacEl.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top: target, behavior: 'instant' })
}

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'instant' })
}

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  const handleSite = useCallback(
    (target: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      if (isHome) {
        if (target === 'top') {
          window.scrollTo({ top: 0, behavior: 'instant' })
        } else if (target === 'services') {
          scrollToId('services')
        } else if (target === 'about') {
          scrollToPacScroll(window.innerHeight * 1.4 * 0.9)
        } else if (target === 'reviews') {
          scrollToId('reviews')
        } else if (target === 'contact') {
          scrollToId('contact')
        }
      } else {
        sessionStorage.setItem('tuiana-home-target', target)
        navigate('/')
      }
    },
    [isHome, navigate]
  )

  const handleCase = useCallback(
    (route: string) => (e: React.MouseEvent) => {
      e.preventDefault()
      navigate(route)
    },
    [navigate]
  )

  const handleTop = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleAnalytics = useCallback(() => {
    window.dispatchEvent(new Event('tuiana:open-analytics-settings'))
  }, [])

  return (
    <footer className="footer">
      <StaticParticleField />
      <div className="footer__inner">
        <div className="footer__brand">
          TUIANA DESIGN
        </div>

        <div className="footer__divider" aria-hidden="true" />

        <div className="footer__grid">
          <div className="footer__col footer__col--about">
            <p className="footer__about-line">Сайты под ключ</p>
            <p className="footer__about-line">для врачей и экспертов</p>
            <p className="footer__about-line footer__about-line--dim">с личной практикой</p>
          </div>

          <div className="footer__col">
            <div className="footer__col-label">Сайт</div>
            <ul className="footer__links">
              {siteLinks.map((l) => (
                <li key={l.label}>
                  <a
                    className={`footer__link${l.target === 'top' ? ' footer__link--home' : ''}`}
                    href={isHome ? '#' : '/'}
                    onClick={handleSite(l.target)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <div className="footer__col-label">Кейсы</div>
            <ul className="footer__links">
              {caseLinks.map((l) => (
                <li key={l.route}>
                  <a
                    className="footer__link"
                    href={l.route}
                    onClick={handleCase(l.route)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <div className="footer__col-label">Связаться</div>
            <ul className="footer__links">
              {socialLinks.map((l) => (
                <li key={l.href}>
                  <a
                    className="footer__link"
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">© 2026 Tuiana Design</span>
          <Link className="footer__privacy" to="/privacy">
            Политика обработки персональных данных
          </Link>
          <button
            type="button"
            className="footer__analytics"
            onClick={handleAnalytics}
          >
            Настройки аналитики
          </button>
          <a className="footer__top" href="#" onClick={handleTop}>Наверх ↑</a>
        </div>
      </div>
    </footer>
  )
}
