import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import HeroStatic from './HeroStatic'
import ApproachSystemTransition from './ApproachSystemTransition'
import ApproachSection from './ApproachSection'
import SystemSection from './SystemSection'
import DariCaseIntro from './DariCaseIntro'
import BazaCaseIntro from './BazaCaseIntro'
import TaplinkSection from './TaplinkSection'
import ServicesSection from './ServicesSection'
import ProcessSection from './ProcessSection'
import DariCasePage from './pages/DariCasePage'
import BazaCasePage from './pages/BazaCasePage'
import useSmoothScroll from './hooks/useSmoothScroll'

const RETURN_KEYS = [
  'tuiana-case-return-scroll',
  'tuiana-baza-return-scroll',
]

function HomePage() {
  const lenisRef = useSmoothScroll()

  useEffect(() => {
    for (const key of RETURN_KEYS) {
      const saved = sessionStorage.getItem(key)
      if (saved !== null) {
        sessionStorage.removeItem(key)
        const y = Number(saved) || 0
        if (lenisRef.current) {
          lenisRef.current.scrollTo(y, { immediate: true })
        } else {
          window.scrollTo({ top: y, behavior: 'auto' })
        }
        return
      }
    }

    const hash = window.location.hash
    if (!hash) return
    const el = document.getElementById(hash.slice(1))
    if (!el) return

    const tryScroll = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { immediate: true })
      } else {
        el.scrollIntoView({ behavior: 'auto' })
      }
    }

    const raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [lenisRef])

  return (
    <>
      <HeroStatic />
      <ApproachSystemTransition
        approach={<ApproachSection />}
        system={<SystemSection />}
        dari={<DariCaseIntro />}
        baza={<BazaCaseIntro />}
      />
      <TaplinkSection />
      <ServicesSection />
      <ProcessSection />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/dari" element={<DariCasePage />} />
      <Route path="/projects/baza" element={<BazaCasePage />} />
    </Routes>
  )
}

export default App
