import './ContactSection.css'

const socials = [
  { label: 'Telegram-канал', href: 'https://t.me/tuiana_ai_2' },
  { label: 'MAX-канал', href: 'https://max.ru/join/l4b4TZfcXXeDO7125wpWYlHtR2fUwyUkRJ4qahIL_yE' },
  { label: 'VK', href: 'https://vk.ru/tuianadesign' },
  { label: 'Instagram', href: 'https://www.instagram.com/tuiana.design/' },
]

export default function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__grid">
          {/* ── Left column ── */}
          <div className="contact__left">
            <div className="contact__eyebrow">
              КОНТАКТЫ
            </div>

            <h2 className="contact__title">
              Есть задача?<br />Давайте <span className="contact__title-accent">обсудим</span>
            </h2>

            <p className="contact__desc">
              Расскажите, что хотите запустить или улучшить. Я помогу понять, какой формат вам действительно нужен и с чего лучше начать.
            </p>

            <p className="contact__note">
              <span className="contact__note-accent">Можно написать без готового ТЗ</span> — достаточно описать задачу своими словами.
            </p>
          </div>

          {/* ── Right column ── */}
          <div className="contact__right">
            <div className="contact__right-label">НАПИСАТЬ</div>

            <a
              className="contact__action"
              href="https://t.me/TuianaBudaeva"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact__action-num">01</span>
              <span className="contact__action-label">Написать в Telegram</span>
              <span className="contact__action-arrow" aria-hidden="true">↗</span>
            </a>

            <a
              className="contact__action"
              href="https://max.ru/u/f9LHodD0cOJDGbO0Sorwblf99n3A7bCVNPyelDjsJJW77eyRZo7ssG4wJr4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact__action-num">02</span>
              <span className="contact__action-label">Написать в MAX</span>
              <span className="contact__action-arrow" aria-hidden="true">↗</span>
            </a>

            <div className="contact__legal">
              <p className="contact__legal-title">Официально и прозрачно</p>
              <p className="contact__legal-text">
                Работаю по договору, принимаю оплату как самозанятая и выдаю чек
              </p>
            </div>
          </div>
        </div>

        {/* ── Socials row ── */}
        <div className="contact__socials">
          <span className="contact__socials-label">Я в соцсетях</span>
          <nav className="contact__socials-links">
            {socials.map((s) => (
              <a
                key={s.href}
                className="contact__social-link"
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
