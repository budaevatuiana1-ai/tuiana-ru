export function scrollToCases() {
  const stage = document.querySelector<HTMLElement>('.ats-stage')
  const scene = document.getElementById('portfolio-scroll-scene')

  if (stage && scene && getComputedStyle(stage).position === 'sticky') {
    const top = scene.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + window.innerHeight * (1.4 + 1.1), behavior: 'instant' })
  } else {
    document.getElementById('cases')?.scrollIntoView({ behavior: 'instant' })
  }
}
