import HeroStatic from './HeroStatic'
import ApproachSystemTransition from './ApproachSystemTransition'
import ApproachSection from './ApproachSection'
import SystemSection from './SystemSection'
import DariCaseIntro from './DariCaseIntro'
import useSmoothScroll from './hooks/useSmoothScroll'

function App() {
  useSmoothScroll()

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

export default App
