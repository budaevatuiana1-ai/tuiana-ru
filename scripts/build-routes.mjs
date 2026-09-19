import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distIndex = resolve(root, 'dist', 'index.html')

if (!existsSync(distIndex)) {
  console.error('[build-routes] dist/index.html not found. Run `vite build` first.')
  process.exit(1)
}

const baseHtml = readFileSync(distIndex, 'utf8')

const HOME = {
  out: null, // root index.html
  url: 'https://tuiana.ru/',
  title: 'Сайты для врачей с личной практикой — Tuiana Design',
  description:
    'Разрабатываю сайты, лендинги и мини-сайты для врачей и экспертов с личной практикой: структура, тексты, дизайн, адаптация и запуск под ключ.',
}

// Open Graph / Twitter image meta — homepage only.
const HOME_OG_IMAGE = `<!-- ogimage:start -->
    <meta property="og:image" content="https://tuiana.ru/og/tuiana-home-og.jpg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:type" content="image/jpeg">
    <meta name="twitter:image" content="https://tuiana.ru/og/tuiana-home-og.jpg">
    <!-- ogimage:end -->`

const HOME_JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://tuiana.ru/#website',
      url: 'https://tuiana.ru/',
      name: 'Tuiana Design',
      inLanguage: 'ru',
      publisher: { '@id': 'https://tuiana.ru/#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://tuiana.ru/#person',
      name: 'Будаева Туяна Валерьевна',
      url: 'https://tuiana.ru/',
      jobTitle: 'Веб-дизайнер',
      image: 'https://tuiana.ru/about/tuiana-office.webp',
      sameAs: [
        'https://t.me/TuianaBudaeva',
        'https://max.ru/u/f9LHodD0cOJDGbO0Sorwblf99n3A7bCVNPyelDjsJJW77eyRZo7ssG4wJr4',
        'https://vk.ru/tuianadesign',
        'https://www.instagram.com/tuiana.design/',
      ],
    },
  ],
}

const ROUTES = [
  {
    out: 'projects/dari',
    url: 'https://tuiana.ru/projects/dari/',
    title: 'Дари — кейс разработки сайта медицинской клиники | Tuiana Design',
    description:
      'Кейс разработки многостраничного сайта клиники Дари: структура услуг и специалистов, тексты, дизайн, адаптив, юридические требования и понятный путь пациента к записи.',
  },
  {
    out: 'projects/baza',
    url: 'https://tuiana.ru/projects/baza/',
    title: 'Наша База — кейс разработки сайта | Tuiana Design',
    description:
      'Кейс Tuiana Design: разработка структуры и дизайна проекта «Наша База», организация большого объёма информации и адаптация сайта для разных устройств.',
  },
  {
    out: 'projects/taplink',
    url: 'https://tuiana.ru/projects/taplink/',
    title: 'Сайт-визитка и мини-сайт для специалиста — Tuiana Design',
    description:
      'Разрабатываю сайты-визитки и мини-сайты для специалистов и экспертов: структура, тексты, дизайн, мобильная адаптация и запуск под ключ.',
  },
  {
    out: 'privacy',
    url: 'https://tuiana.ru/privacy/',
    title: 'Политика обработки персональных данных | Tuiana Design',
    description:
      'Политика в отношении обработки персональных данных на сайте Tuiana Design — tuiana.ru. Оператор: Будаева Туяна Валерьевна.',
  },
  {
    out: 'additional',
    url: 'https://tuiana.ru/additional/',
    title: 'Дополнительные услуги — AI-визуал, презентации, видео | Tuiana Design',
    description:
      'AI-визуал, презентации, видео, PDF-материалы и digital-оформление для экспертов. Дополнительно к сайту или как отдельная задача.',
    preload: '/additional/hero-ai.webp',
  },
]

// Remove previously injected SEO / JSON-LD / OG-image blocks so the script is safe to re-run.
function stripSeo(html) {
  return html
    .replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/i, '')
    .replace(/<!-- jsonld:start -->[\s\S]*?<!-- jsonld:end -->/i, '')
    .replace(/<!-- ogimage:start -->[\s\S]*?<!-- ogimage:end -->/i, '')
}

// Inject ONLY SEO <head> metadata. Vite <script>/<link> tags are left untouched.
function withSeo(html, { url, title, description }) {
  let out = stripSeo(html)
  out = out.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)

  const seo = `<!-- seo:start -->
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">
    <meta name="robots" content="index, follow">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Tuiana Design">
    <meta property="og:locale" content="ru_RU">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${url}">
    <meta name="twitter:card" content="summary_large_image">
    <!-- seo:end -->`

  return out.replace(/<\/head>/i, `  ${seo}\n  </head>`)
}

// Inject a resource preload link before </head>. Idempotent: strips prior preload links first.
function withPreload(html, href) {
  let out = html.replace(/<!-- preload:start -->[\s\S]*?<!-- preload:end -->/gi, '')
  const tag = `<!-- preload:start -->\n    <link rel="preload" as="image" href="${href}" fetchpriority="high">\n    <!-- preload:end -->`
  return out.replace(/<\/head>/i, `  ${tag}\n  </head>`)
}

// Inject structured data (JSON-LD) before </head>. Idempotent: strips prior JSON-LD block first.
function withJsonLd(html) {
  let out = html.replace(/<!-- jsonld:start -->[\s\S]*?<!-- jsonld:end -->/gi, '')
  const json = JSON.stringify(HOME_JSON_LD, null, 2)
    .split('\n')
    .map((line) => `    ${line}`)
    .join('\n')
  const tag = `<!-- jsonld:start -->\n    <script type="application/ld+json">\n${json}\n    </script>\n    <!-- jsonld:end -->`
  return out.replace(/<\/head>/i, `  ${tag}\n  </head>`)
}

// Inject Open Graph / Twitter image meta. Idempotent: strips prior block first.
function withOgImage(html) {
  const out = html.replace(/<!-- ogimage:start -->[\s\S]*?<!-- ogimage:end -->/gi, '')
  return out.replace(/<\/head>/i, `  ${HOME_OG_IMAGE}\n  </head>`)
}

function emit(relPath, html, label) {
  const dest = relPath
    ? resolve(root, 'dist', relPath, 'index.html')
    : resolve(root, 'dist', 'index.html')
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, html, 'utf8')
  console.log(`[build-routes] wrote ${relPath || '<root>'} (${label})`)
}

// Root home page (ГЛАВНАЯ) — optimize dist/index.html itself.
emit(null, withOgImage(withJsonLd(withSeo(baseHtml, HOME))), 'home')

// Sub-route physical HTML entries.
for (const r of ROUTES) {
  let html = withSeo(baseHtml, r)
  if (r.preload) html = withPreload(html, r.preload)
  emit(r.out, html, r.out)
}

console.log('[build-routes] done.')
