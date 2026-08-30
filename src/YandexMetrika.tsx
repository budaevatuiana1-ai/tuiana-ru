import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    ym: (id: number, method: string, ...args: unknown[]) => void
  }
}

const CONSENT_KEY = 'tuiana_analytics_consent'
type ConsentValue = 'granted' | 'denied'

const TAG_JS_URL = 'https://mc.yandex.ru/metrika/tag.js'
const COUNTER_ID = 109523910

let tagPromise: Promise<void> | null = null

function loadTag(): Promise<void> {
  if (tagPromise) return tagPromise

  tagPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-metrika="ym"]`
    )
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve()
      } else {
        existing.addEventListener('load', () => resolve(), { once: true })
        existing.addEventListener('error', () => reject(), { once: true })
      }
      return
    }

    const script = document.createElement('script')
    script.src = TAG_JS_URL
    script.async = true
    script.dataset.metrika = 'ym'
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => reject()
    document.head.appendChild(script)
  })

  return tagPromise
}

function callYm(method: string, ...args: unknown[]) {
  if (typeof window.ym === 'function') {
    window.ym(COUNTER_ID, method, ...args)
  }
}

function getConsent(): ConsentValue | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    if (v === 'granted' || v === 'denied') return v
  } catch {}
  return null
}

function fireConsentEvent() {
  window.dispatchEvent(new Event('tuiana:analytics-consent'))
}

export { fireConsentEvent }

export default function YandexMetrika() {
  const location = useLocation()
  const [consent, setConsent] = useState<ConsentValue | null>(getConsent)
  const [ready, setReady] = useState(false)
  const initRef = useRef(false)

  useEffect(() => {
    const onConsentChange = () => setConsent(getConsent())
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) onConsentChange()
    }

    window.addEventListener('tuiana:analytics-consent', onConsentChange)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('tuiana:analytics-consent', onConsentChange)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  useEffect(() => {
    if (import.meta.env.DEV) return
    if (consent !== 'granted') {
      if (initRef.current) {
        callYm('destruct')
        initRef.current = false
        setReady(false)
      }
      return
    }

    let cancelled = false

    loadTag().then(() => {
      if (cancelled) return
      if (initRef.current) return

      callYm('init', {
        defer: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      })
      initRef.current = true
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [consent])

  useEffect(() => {
    if (import.meta.env.DEV) return
    if (consent !== 'granted' || !ready) return

    const url = location.pathname + location.search
    callYm('hit', url)
  }, [ready, consent, location.pathname, location.search])

  return null
}
