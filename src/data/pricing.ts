type ServicePrice = {
  amount: number
  from: boolean
  unit?: string
}

// Единственный источник сумм. Одинаковые суммы у разных услуг независимы.
export const pricing = {
  // Сайты
  taplink: { amount: 15000, from: true },
  'taplink-page': { amount: 5000, from: true, unit: 'страница' },
  landing: { amount: 25000, from: true },
  multipage: { amount: 45000, from: true },

  // Соцсети и каналы. Цены комплексов самостоятельные, без пересчёта.
  'vk-base': { amount: 2000, from: true },
  'vk-mobile': { amount: 3000, from: true },
  'vk-full': { amount: 5500, from: true },
  'tg-base': { amount: 1800, from: true },
  'tg-full': { amount: 3800, from: true },
  'max-base': { amount: 1800, from: true },
  'max-full': { amount: 2800, from: true },
  'tg-max': { amount: 5200, from: false },
  'vk-tg': { amount: 7900, from: false },
  'vk-tg-max': { amount: 9900, from: false },
  'project-launch': { amount: 15000, from: true },
  'vk-menu': { amount: 500, from: true },
  'post-text': { amount: 800, from: true },
  'post-image': { amount: 300, from: true },
  'social-poll': { amount: 500, from: true },
  'adapt-social': { amount: 1000, from: true },

  // Презентации
  'slide-design': { amount: 350, from: true, unit: 'слайд' },
  'slide-text': { amount: 600, from: true, unit: 'слайд' },
  'slide-full': { amount: 900, from: true, unit: 'слайд' },
  'slide-template': { amount: 3000, from: true },

  // AI-фотосессии
  'photo-one': { amount: 500, from: true },
  'photo-five': { amount: 1800, from: false },
  'photo-ten': { amount: 3000, from: false },
  'photo-twenty': { amount: 5000, from: false },

  // AI-видео
  'animate-one': { amount: 800, from: true },
  'clip-15': { amount: 2500, from: true },
  'clip-30': { amount: 4500, from: true },
  'clip-60': { amount: 8000, from: true },

  // Видеопоздравления
  'greeting-basic': { amount: 2000, from: true },
  'greeting-ai': { amount: 4000, from: true },
  'greeting-film': { amount: 6000, from: true },

  // Графический дизайн
  poster: { amount: 1000, from: true },
  certificate: { amount: 1000, from: true },
  invitation: { amount: 700, from: true },
  banner: { amount: 800, from: true },
  'price-list': { amount: 1500, from: true },

  // Персональные песни
  'song-lyrics': { amount: 1200, from: true },
  'song-full': { amount: 2500, from: true },
} as const satisfies Record<string, ServicePrice>

export type PriceId = keyof typeof pricing

const NBSP = '\u00A0'
const numberFormat = new Intl.NumberFormat('ru-RU')

// В текстах Taplink единица уже указана словами («за страницу»).
export function formatPrice(id: PriceId, { includeUnit = true }: { includeUnit?: boolean } = {}): string {
  const price: ServicePrice = pricing[id]
  const prefix = price.from ? `от${NBSP}` : ''
  const unit = includeUnit && price.unit ? ` / ${price.unit}` : ''
  return `${prefix}${numberFormat.format(price.amount)}${NBSP}₽${unit}`
}
