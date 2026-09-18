# Nelson Peña — iOS engineering portfolio

A professional portfolio for **Nelson Peña, Senior iOS Developer / Technical Lead**, built with React, Vite and TypeScript. Primary language: English, with a complete Spanish translation.

## Run locally

Use Node.js 22.12 or later in the Node 22 line, or Node 24+ (the `.nvmrc` selects Node 22).

```sh
nvm use
npm ci
npm run dev
```

Open the address printed by Vite (normally `http://localhost:5173`).

```sh
npm run lint
npm run build
npm run preview
```

The build checks TypeScript, bundles the application into `dist/`, and pre-renders the English content. The main content and links are readable without JavaScript. The language selector and mobile navigation need JavaScript.

## Content and languages

- `src/data/portfolio.json`: profile, public contact email, experience, work summaries, skills and CV education.
- `src/i18n/copy.ts`: English and Spanish interface text.
- `src/components/`: Hero, About, Experience, Selected Work, Skills, Contact and navigation.
- `src/styles.css`: responsive layout, focus styles, reduced-motion support and print styles.
- `public/cv/`: downloadable English and Spanish PDF CVs.
- `scripts/generate_cv.py`: optional regeneration of both public CVs from the shared portfolio data.

English is the default on first visit. The language choice is saved locally when browser storage is available. `?lang=en` or `?lang=es` overrides the saved choice and can be shared; the page preserves section anchors. Changing language updates the page title, metadata, dates and CV download. Spanish is rendered on the client; it is not a separately pre-rendered route.

Dates and roles were checked against the supplied CVs. Independent contracts overlap with other engagements and are labeled accordingly. The summaries emphasize responsibilities without adding unverified performance metrics or outcomes. Flutter, Kotlin and React Native appear as complementary experience.

## Publish with GitHub Pages

This checkout is already connected to `https://github.com/nelsonPena/nelsonpena.github.io`. The account site uses `base: '/'` and the intended public URL is `https://nelsonpena.github.io/`.

1. Review the portfolio text, contact email and both public CVs.
2. In the GitHub repository, open **Settings → Pages → Build and deployment → Source**, and choose **GitHub Actions**.
3. Commit and push the reviewed files to `main`:

   ```sh
   git add .
   git commit -m "Create professional iOS portfolio"
   git push origin main
   ```

4. In **Actions**, wait for **Deploy portfolio to GitHub Pages** to finish. The deployment link appears in the `github-pages` environment. Later pushes to `main` publish updates automatically.

The workflow installs from the lockfile, checks lint and types, builds and verifies CV assets before deploying. Pull requests build and lint without publishing. No personal access token is needed; deployment uses the repository's `GITHUB_TOKEN` and Pages permissions. The workflow can also run manually from Actions after Pages is enabled.

GitHub Pages is configured to publish through GitHub Actions. Local edits become public after they are committed, pushed to `main`, and the deployment workflow finishes successfully.

If you rename this to a project repository rather than an account repository, set Vite's `base` to `'/REPOSITORY-NAME/'` and update the canonical/Open Graph URLs in `index.html`, `profile.url` in the data, `robots.txt` and `sitemap.xml`. For a custom domain, update those URLs, add `public/CNAME`, and configure the domain in Pages settings.

References: [Vite's GitHub Pages guide](https://vite.dev/guide/static-deploy#github-pages), [GitHub's custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## SEO and accessibility

The site includes pre-rendered English HTML, a page title and description, canonical URL, Open Graph and Twitter metadata, Person structured data, sitemap, robots file and favicon. Language changes update metadata in the browser. Social previews use text metadata. The About section displays academic education in both languages, highlighting Systems Engineering and the specialization in Mobile Application Development. It also includes Nelson's supplied portrait at `public/images/nelson-pena.jpg`, with accessible alt text, reserved dimensions and lazy loading. The public copy omits EXIF metadata and retains the original image pixels. No client imagery is included.

Semantic landmarks, a skip link, visible keyboard focus, accessible language buttons, an Escape-closeable mobile menu, native expandable work contributions and reduced-motion styles are included. Contact uses a direct email link; there is no backend, form submission, tracking or analytics.

## Public CVs and confidentiality

The downloadable PDFs are concise public versions created from the supplied professional history. They omit identity number, birth date, home address and phone number. They retain the professional contact email and the verified personal GitHub profile. Original CV files are not stored in this repository.

Selected Work describes professional contributions only. It contains no private client repository links, internal endpoints, credentials, source code, client screenshots, internal documents or non-public product metrics. Add project links or assets only if they are approved for public sharing. The skills listed describe experience, not endorsements or client certifications.

To regenerate the CVs after updating the shared data, install the optional Python dependency `reportlab`, then run:

```sh
python3 -m pip install reportlab
python3 scripts/generate_cv.py
```

PDF regeneration is separate from the website build. Review the rendered PDFs after changing content. Both PDFs are committed static assets, so CI needs only Node.js.
