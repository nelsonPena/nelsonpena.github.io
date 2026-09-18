import type { Copy, Locale } from '../i18n/copy'
import { cvPath } from '../data/portfolio'
import { Icon } from './Icon'

export function Hero({ text, locale }: { text: Copy; locale: Locale }) {
  const layers = [
    [text.toolkitUi, 'SwiftUI · UIKit'],
    [text.toolkitFeature, 'TCA · MVVM · VIPER'],
    [text.toolkitDomain, text.toolkitFoundation],
    [text.toolkitDelivery, text.toolkitRelease],
  ]
  return <section className="hero container" aria-labelledby="hero-title">
    <div className="hero-main">
      <p className="hero-name">Nelson Peña</p>
      <p className="eyebrow role">{text.role}</p>
      <h1 id="hero-title">{text.heroLine1}<br /><span>{text.heroLine2}</span></h1>
      <p className="hero-description">{text.heroDescription}</p>
      <div className="hero-links">
        <a className="button button-primary" href="#work">{text.viewWork}<Icon name="arrow" /></a>
        <a className="cv-link" href={cvPath(locale)} download><span>{text.download}<small>{text.cvMeta}</small></span><Icon name="download" /></a>
      </div>
    </div>
    <aside className="toolkit" aria-label={text.toolkit}>
      <div className="toolkit-top"><span className="eyebrow">{text.toolkit}</span><span className="toolkit-mark" aria-hidden="true">{'{ }'}</span></div>
      <h2>{text.toolkitTitle}</h2>
      <div className="layers">{layers.map(([label, value], i) => <div className="layer" key={label}><span className="layer-number" aria-hidden="true">0{i + 1}</span><div><span className="layer-label">{label}</span><strong>{value}</strong></div></div>)}</div>
      <div className="toolkit-bottom"><span>Swift</span><span aria-hidden="true">/</span><span>iOS</span></div>
    </aside>
    <div className="focus-strip"><span className="eyebrow">{text.focus}</span><ul>{text.focusItems.map(item => <li key={item}>{item}</li>)}</ul></div>
  </section>
}
