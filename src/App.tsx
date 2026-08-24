import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import HeroStatic from './HeroStatic'
import ApproachSystemTransition from './ApproachSystemTransition'
import ApproachSection from './ApproachSection'
import SystemSection from './SystemSection'
import DariCaseIntro from './DariCaseIntro'
import DariCasePage from './pages/DariCasePage'
import useSmoothScroll from './hooks/useSmoothScroll'

function HomePage() {
  const lenisRef = useSmoothScroll()

  useEffect(() => {
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
      />
      <DariCaseIntro />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects/dari" element={<DariCasePage />} />
    </Routes>
  )
}

export default App
