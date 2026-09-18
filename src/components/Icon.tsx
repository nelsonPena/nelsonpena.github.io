type IconName = 'arrow' | 'download' | 'menu' | 'close' | 'up'

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, string[]> = {
    arrow: ['M5 19 19 5', 'M5 5h14v14'],
    download: ['M12 3v12', 'm7 10 5 5 5-5', 'M5 17v4h14v-4'],
    menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
    close: ['m6 6 12 12', 'M18 6 6 18'],
    up: ['M12 20V4', 'm5 11 7-7 7 7'],
  }
  return <svg className={`icon ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name].map((d) => <path key={d} d={d} />)}</svg>
}
