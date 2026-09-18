import type { Copy, Locale } from '../i18n/copy'
import { portfolio } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import { Tags } from './Tags'

export function Skills({ text, locale }: { text: Copy; locale: Locale }) {
  return <section id="skills" className="section container skills">
    <SectionHeading eyebrow={text.skillsEyebrow} title={text.skillsTitle} description={text.skillsIntro} />
    <div className="skills-grid">{portfolio.skillGroups.map(group => <div key={group.title.en} className={`skill-group ${group.complementary ? 'complementary' : ''}`}><h3>{group.title[locale]}</h3><Tags items={group.items} /></div>)}</div>
    <div className="platforms" aria-labelledby="platforms-title">
      <div className="platforms-heading"><h3 id="platforms-title">{text.platformsTitle}</h3><p>{text.platformsIntro}</p></div>
      <div className="platforms-grid">{portfolio.platformIntegrations.map(platform => <article className="platform-card" key={platform.id}><h4>{platform.name}</h4><p>{platform.description[locale]}</p></article>)}</div>
    </div>
  </section>
}
