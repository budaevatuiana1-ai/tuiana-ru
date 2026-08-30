import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { fireConsentEvent } from './YandexMetrika'
import './ConsentBanner.css'

const CONSENT_KEY = 'tuiana_analytics_consent'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  const read = useCallback(() => {
    try {
      return localStorage.getItem(CONSENT_KEY)
    } catch {
      return null
    }
  }, [])

  useEffect(() => {
    if (read() === null) setVisible(true)
  }, [read])

  useEffect(() => {
    const onOpen = () => setVisible(true)
    window.addEventListener('tuiana:open-analytics-settings', onOpen)
    return () => window.removeEventListener('tuiana:open-analytics-settings', onOpen)
  }, [])

  const choose = (value: 'granted' | 'denied') => {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {}
    fireConsentEvent()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="consent" role="dialog" aria-label="Настройки аналитики">
      <div className="consent__body">
        <p className="consent__text">
          Мы используем Яндекс Метрику только с вашего разрешения, чтобы понимать,
          как используют сайт, и улучшать его.{' '}
          <Link to="/privacy" className="consent__link">
            Подробнее
          </Link>
        </p>
      </div>
      <div className="consent__buttons">
        <button
          type="button"
          className="consent__btn consent__btn--secondary"
          onClick={() => choose('denied')}
        >
          Только необходимые
        </button>
        <button
          type="button"
          className="consent__btn consent__btn--primary"
          onClick={() => choose('granted')}
        >
          Разрешить аналитику
        </button>
      </div>
    </div>
  )
}
