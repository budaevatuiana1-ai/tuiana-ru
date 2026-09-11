import { useEffect } from 'react'
import './TaplinkProjectsPage.css'
import TaplinkProjectsHero from '../TaplinkProjectsHero'
import TaplinkFitSection from '../TaplinkFitSection'
import TaplinkFormatSection from '../TaplinkFormatSection'
import TaplinkApproachSection from '../TaplinkApproachSection'
import TaplinkWhySection from '../TaplinkWhySection'
import TaplinkProjectsShowcase from '../TaplinkProjectsShowcase'
import TaplinkPricingSection from '../TaplinkPricingSection'
import TaplinkFAQSection from '../TaplinkFAQSection'
import ContactSection from '../ContactSection'
import Footer from '../Footer'

export default function TaplinkProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <main className="taplink-page">
        <TaplinkProjectsHero />
        <TaplinkFitSection />
        <TaplinkApproachSection />
        <TaplinkFormatSection />
        <TaplinkWhySection />
        <TaplinkProjectsShowcase />
        <TaplinkPricingSection />
        <TaplinkFAQSection />
      </main>
      <ContactSection />
      <Footer />
    </>
  )
}
