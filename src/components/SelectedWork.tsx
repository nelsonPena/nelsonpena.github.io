import type { Copy, Locale } from '../i18n/copy'
import { portfolio } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import { Tags } from './Tags'

export function SelectedWork({ text, locale }: { text: Copy; locale: Locale }) {
  return <section id="work" className="work-section"><div className="section container">
    <SectionHeading eyebrow={text.workEyebrow} title={text.workTitle} description={text.workIntro} />
    <div className="work-grid">{portfolio.work.map((work, index) => <article className="work-card" key={work.id}>
      <div className="work-number" aria-hidden="true">0{index + 1}<span>/</span></div><p className="work-category">{work.category[locale]}</p><h3>{work.title[locale]}</h3><p className="work-company">{work.company}</p><p className="work-description">{work.description[locale]}</p><Tags items={work.tags} />
      <details><summary>{text.contributions}<span aria-hidden="true" className="details-plus">+</span></summary><ul>{work.contributions[locale].map(item => <li key={item}>{item}</li>)}</ul></details>
    </article>)}</div>
  </div></section>
}
