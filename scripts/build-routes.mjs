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

const ROUTES = [
  {
    out: 'projects/dari',
    url: 'https://tuiana.ru/projects/dari',
    title: 'ДАРИ — кейс разработки сайта медицинской клиники | Tuiana Design',
    description:
      'Кейс разработки многостраничного сайта клиники ДАРИ: структура услуг и специалистов, тексты, дизайн, адаптив, юридические требования и понятный путь пациента к записи.',
  },
  {
    out: 'projects/baza',
    url: 'https://tuiana.ru/projects/baza',
    title: 'Наша База — кейс разработки сайта | Tuiana Design',
    description:
      'Кейс Tuiana Design: разработка структуры и дизайна проекта «Наша База», организация большого объёма информации и адаптация сайта для разных устройств.',
  },
  {
    out: 'privacy',
    url: 'https://tuiana.ru/privacy',
    title: 'Политика обработки персональных данных | Tuiana Design',
    description:
      'Политика в отношении обработки персональных данных на сайте Tuiana Design — tuiana.ru. Оператор: Будаева Туяна Валерьевна.',
  },
]

// Remove a previously injected SEO block so the script is safe to re-run.
function stripSeo(html) {
  return html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/i, '')
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

function emit(relPath, html, label) {
  const dest = relPath
    ? resolve(root, 'dist', relPath, 'index.html')
    : resolve(root, 'dist', 'index.html')
  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, html, 'utf8')
  console.log(`[build-routes] wrote ${relPath || '<root>'} (${label})`)
}

// Root home page (ГЛАВНАЯ) — optimize dist/index.html itself.
emit(null, withSeo(baseHtml, HOME), 'home')

// Sub-route physical HTML entries.
for (const r of ROUTES) {
  emit(r.out, withSeo(baseHtml, r), r.out)
}

console.log('[build-routes] done.')
