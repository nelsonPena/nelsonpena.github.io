import type { Copy, Locale } from '../i18n/copy'
import { portfolio } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import { Tags } from './Tags'

export function Skills({ text, locale }: { text: Copy; locale: Locale }) {
  return <section id="skills" className="section container skills">
    <SectionHeading eyebrow={text.skillsEyebrow} title={text.skillsTitle} description={text.skillsIntro} />
    <div className="skills-grid">{portfolio.skillGroups.map((group, i) => <div key={group.title.en} className={`skill-group ${i === 4 ? 'complementary' : ''}`}><h3>{group.title[locale]}</h3><Tags items={group.items} /></div>)}</div>
  </section>
}
