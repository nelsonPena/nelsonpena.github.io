import type { Copy, Locale } from '../i18n/copy'
import { portfolio } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'

export function About({ text, locale }: { text: Copy; locale: Locale }) {
  return <section id="about" className="section container about">
    <div className="about-profile">
      <SectionHeading eyebrow={text.aboutEyebrow} title={text.aboutTitle} />
      <img className="portrait" src={`${import.meta.env?.BASE_URL ?? '/'}images/nelson-pena.jpg`} alt="Nelson Peña" width={1024} height={768} loading="lazy" decoding="async" />
    </div>
    <div className="about-content"><p className="large-copy">{portfolio.profile.summary[locale]}</p><p>{text.aboutDetail}</p><div className="principles">{text.principles.map(item => <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></div>
  </section>
}
