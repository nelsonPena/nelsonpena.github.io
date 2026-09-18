import data from './portfolio.json'
import type { Locale } from '../i18n/copy'

export const portfolio = data
export const cvPath = (locale: Locale) => `${import.meta.env?.BASE_URL ?? '/'}cv/nelson-pena-cv-${locale}.pdf`

export function dateRange(start: string, end: string | null, locale: Locale) {
  const format = (value: string) => new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'es-CO', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}-01T12:00:00Z`))
  return `${format(start)} — ${end ? format(end) : locale === 'en' ? 'Present' : 'Actualidad'}`
}
