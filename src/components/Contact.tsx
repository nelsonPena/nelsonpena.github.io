import type { Copy, Locale } from '../i18n/copy'
import { cvPath, portfolio } from '../data/portfolio'
import { Icon } from './Icon'

export function Contact({ text, locale }: { text: Copy; locale: Locale }) {
  return <section id="contact" className="contact-section"><div className="container contact-inner">
    <div><p className="eyebrow">{text.contactEyebrow}</p><h2>{text.contactTitle}</h2><p>{text.contactDescription}</p></div>
    <div className="contact-links"><a className="contact-email" href={`mailto:${portfolio.profile.email}`}><span>{text.email}<small>{portfolio.profile.email}</small></span><Icon name="arrow" /></a><a href={portfolio.profile.github} target="_blank" rel="noopener noreferrer"><span>{text.github}</span><Icon name="arrow" /></a><a href={cvPath(locale)} download><span>{text.download}<small>{text.cvMeta}</small></span><Icon name="download" /></a></div>
  </div></section>
}
