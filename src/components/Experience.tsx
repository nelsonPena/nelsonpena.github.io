import type { Copy, Locale } from '../i18n/copy'
import { dateRange, portfolio } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import { Tags } from './Tags'

export function Experience({ text, locale }: { text: Copy; locale: Locale }) {
  return <section id="experience" className="section container experience">
    <div className="experience-heading"><SectionHeading eyebrow={text.experienceEyebrow} title={text.experienceTitle} /><p className="experience-note">{text.experienceNote}</p></div>
    <ol className="experience-list">{portfolio.experience.map((job, index) => <li key={job.company} className="experience-row">
      <div className="job-meta"><span className="job-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{job.company}</h3><p className="job-date">{dateRange(job.start, job.end, locale)}</p><span className="job-kind">{job.kind === 'contract' ? text.contract : text.fullTime}</span></div>
      <div className="job-content"><h4>{job.role[locale]}</h4><p>{job.description[locale]}</p><ul className="job-highlights">{job.highlights[locale].map(item => <li key={item}>{item}</li>)}</ul><Tags items={job.tags} /></div>
    </li>)}</ol>
  </section>
}
