import { readFile, writeFile } from 'node:fs/promises'
import { renderToString } from 'react-dom/server'
import App from '../src/App'

const path = new URL('../dist/index.html', import.meta.url)
const html = await readFile(path, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error('The HTML root marker is missing.')
await writeFile(path, html.replace(marker, `<div id="root">${renderToString(<App />)}</div>`))
console.log('Pre-rendered the English portfolio for crawlers and no-JavaScript visitors.')
