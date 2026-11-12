export function scrollToAbout() {
  const stage = document.querySelector<HTMLElement>('.pac-stage')
  const scroll = document.querySelector<HTMLElement>('.pac-scroll')

  if (stage && scroll && getComputedStyle(stage).position === 'sticky') {
    const top = scroll.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + window.innerHeight * 1.4 * 0.9, behavior: 'instant' })
  } else {
    document.getElementById('about')?.scrollIntoView({ behavior: 'instant' })
  }
}
