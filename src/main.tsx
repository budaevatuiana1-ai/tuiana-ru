import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import YandexMetrika from './YandexMetrika'
import ConsentBanner from './ConsentBanner'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <YandexMetrika />
      <ConsentBanner />
      <App />
    </BrowserRouter>
  </StrictMode>,
)
