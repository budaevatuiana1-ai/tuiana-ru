import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import GlobalCursor from './GlobalCursor'
import GlobalMenu from './GlobalMenu'
import HeroStatic from './HeroStatic'
import ApproachSystemTransition from './ApproachSystemTransition'
import ApproachSection from './ApproachSection'
import SystemSection from './SystemSection'
import DariCaseIntro from './DariCaseIntro'
import BazaCaseIntro from './BazaCaseIntro'
import TaplinkSection from './TaplinkSection'
import ServicesSection from './ServicesSection'
import ProcessSection from './ProcessSection'
import AboutSection from './AboutSection'
import CertificatesSection from './CertificatesSection'
import ProcessAboutCertificatesTransition from './ProcessAboutCertificatesTransition'
import ResponsibilitiesSection from './ResponsibilitiesSection'
import ReviewsSection from './ReviewsSection'
import ContactSection from './ContactSection'
import Footer from './Footer'
import DariCasePage from './pages/DariCasePage'
import BazaCasePage from './pages/BazaCasePage'
import TaplinkProjectsPage from './pages/TaplinkProjectsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import AdditionalPage from './pages/AdditionalPage'
import useSmoothScroll from './hooks/useSmoothScroll'

const RETURN_KEYS = [
  'tuiana-case-return-scroll',
  'tuiana-baza-return-scroll',
]

function HomePage() {
  const lenisRef = useSmoothScroll()

  useEffect(() => {
    const homeTarget = sessionStorage.getItem('tuiana-home-target')
    if (homeTarget !== null) {
      const scrollToId = (id: string) => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'instant' })
      }
      const scrollToPacScroll = (offset: number) => {
        const pacEl = document.querySelector('.pac-scroll')
        if (!pacEl) return
        const target = pacEl.getBoundingClientRect().top + window.scrollY + offset
        window.scrollTo({ top: target, behavior: 'instant' })
      }

      const raf = requestAnimationFrame(() => {
        switch (homeTarget) {
          case 'top':
            window.scrollTo({ top: 0, behavior: 'instant' })
            break
          case 'services':
            scrollToId('services')
            break
          case 'cases':
            scrollToId('cases')
            break
          case 'taplink':
            scrollToId('taplink')
            break
          case 'process':
            scrollToPacScroll(0)
            break
          case 'about':
            scrollToPacScroll(window.innerHeight * 1.4 * 0.9)
            break
          case 'reviews':
            scrollToId('reviews')
            break
          case 'contact':
            scrollToId('contact')
            break
        }
        sessionStorage.removeItem('tuiana-home-target')
        sessionStorage.removeItem('tuiana-case-return-scroll')
        sessionStorage.removeItem('tuiana-baza-return-scroll')
      })
      return () => cancelAnimationFrame(raf)
    }

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
      <ProcessAboutCertificatesTransition
        process={<ProcessSection />}
        about={<AboutSection />}
        certificates={<CertificatesSection />}
      />
      <ResponsibilitiesSection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </>
  )
}

function App() {
  return (
    <>
      <GlobalCursor />
      <GlobalMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/dari" element={<DariCasePage />} />
        <Route path="/projects/baza" element={<BazaCasePage />} />
        <Route path="/projects/taplink" element={<TaplinkProjectsPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/additional" element={<AdditionalPage />} />
      </Routes>
    </>
  )
}

export default App
