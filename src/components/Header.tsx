import { useEffect, useRef, useState } from 'react'
import type { Copy, Locale } from '../i18n/copy'
import { Icon } from './Icon'

export function Header({ text, locale, onLocaleChange }: { text: Copy; locale: Locale; onLocaleChange: (value: Locale) => void }) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); menuButton.current?.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return <header className="header">
    <div className="container header-inner">
      <a className="brand" href="#top" onClick={() => setOpen(false)} aria-label="Nelson Peña">
        <span className="monogram" aria-hidden="true">np<span>.</span></span><span className="brand-name">Nelson Peña</span>
      </a>
      <nav id="main-navigation" className={`navigation ${open ? 'is-open' : ''}`} aria-label={text.navigation}>
        {Object.entries(text.nav).map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <div className="language-control" role="group" aria-label={text.language}>
          {(['en', 'es'] as const).map(value => <button key={value} type="button" lang={value} aria-pressed={locale === value} aria-label={value === 'en' ? 'English' : 'Español'} onClick={() => { onLocaleChange(value); setOpen(false) }}>{value.toUpperCase()}</button>)}
        </div>
        <button ref={menuButton} className="menu-toggle" type="button" aria-controls="main-navigation" aria-expanded={open} aria-label={open ? text.closeMenu : text.menu} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
      </div>
    </div>
  </header>
}
