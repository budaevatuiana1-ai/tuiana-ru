import { useCallback } from 'react'
import StaticParticleField from './StaticParticleField'
import './Footer.css'

const socialLinks = [
  { label: 'Telegram', href: 'https://t.me/TuianaBudaeva' },
  { label: 'MAX', href: 'https://max.ru/u/f9LHodD0cOJDGbO0Sorwblf99n3A7bCVNPyelDjsJJW77eyRZo7ssG4wJr4' },
  { label: 'VK', href: 'https://vk.ru/tuianadesign' },
  { label: 'Instagram', href: 'https://www.instagram.com/tuiana.design/' },
]

function scrollToPacScroll(offset: number) {
  const pacEl = document.querySelector('.pac-scroll')
  if (!pacEl) return
  const target = pacEl.getBoundingClientRect().top + window.scrollY + offset
  window.scrollTo({ top: target, behavior: 'instant' })
}

export default function Footer() {
  const handleProcess = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    scrollToPacScroll(0)
  }, [])

  const handleAbout = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const transitionDistance = window.innerHeight * 1.4
    scrollToPacScroll(transitionDistance * 0.9)
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
            <div className="footer__col-label">Навигация</div>
            <ul className="footer__links">
              <li><a className="footer__link" href="#services">Услуги</a></li>
              <li><a className="footer__link" href="#process" onClick={handleProcess}>Как я работаю</a></li>
              <li><a className="footer__link" href="#about" onClick={handleAbout}>Обо мне</a></li>
              <li><a className="footer__link" href="#reviews">Отзывы</a></li>
              <li><a className="footer__link" href="#contact">Контакты</a></li>
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
          <a className="footer__top" href="#">Наверх ↑</a>
        </div>
      </div>
    </footer>
  )
}
