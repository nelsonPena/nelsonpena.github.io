import { useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Experience } from './components/Experience'
import { SelectedWork } from './components/SelectedWork'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Icon } from './components/Icon'
import { copy } from './i18n/copy'
import type { Locale } from './i18n/copy'

function initialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  const query = new URLSearchParams(window.location.search).get('lang')
  if (query === 'en' || query === 'es') return query
  try { return window.localStorage.getItem('portfolio-language') === 'es' ? 'es' : 'en' }
  catch { return 'en' }
}

export default function App() {
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const text = copy[locale]

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = text.metaTitle
    const metadata = [
      ['meta[name="description"]', text.metaDescription],
      ['meta[property="og:title"]', text.metaTitle],
      ['meta[property="og:description"]', text.metaDescription],
      ['meta[property="og:locale"]', locale === 'en' ? 'en_US' : 'es_CO'],
      ['meta[property="og:locale:alternate"]', locale === 'en' ? 'es_CO' : 'en_US'],
      ['meta[name="twitter:title"]', text.metaTitle],
      ['meta[name="twitter:description"]', text.metaDescription],
    ]
    metadata.forEach(([selector, value]) => document.querySelector(selector)?.setAttribute('content', value))
    try { window.localStorage.setItem('portfolio-language', locale) } catch { /* Language selection also works without storage. */ }
  }, [locale, text])

  function changeLocale(value: Locale) {
    setLocale(value)
    const url = new URL(window.location.href)
    url.searchParams.set('lang', value)
    window.history.replaceState(null, '', url)
  }

  return <div id="top">
    <a className="skip-link" href="#main">{text.skip}</a>
    <Header text={text} locale={locale} onLocaleChange={changeLocale} />
    <main id="main" tabIndex={-1}><Hero text={text} locale={locale} /><About text={text} locale={locale} /><Experience text={text} locale={locale} /><SelectedWork text={text} locale={locale} /><Skills text={text} locale={locale} /><Contact text={text} locale={locale} /></main>
    <footer className="container footer"><p>© {new Date().getUTCFullYear()} Nelson Peña<span>{text.footer}</span></p><a href="#top">{text.top}<Icon name="up" /></a></footer>
    <span className="sr-only" aria-live="polite">{text.changed}</span>
  </div>
}
