# Neosapien · MCP Guide (PWA)

A mobile-first, installable Progressive Web App that walks users through connecting
their Neosapien memories to ChatGPT, Claude, or any MCP-capable AI. Built to the
Figma "MCP Detail" flow. **No build step, no dependencies** — plain HTML/CSS/JS.

## Run locally

Any static file server works. With Python (no Node required):

```bash
cd neo-mcp-guide
python3 -m http.server 4173
# open http://localhost:4173
```

> Open over `http://localhost` (or HTTPS), **not** `file://` — the service worker
> and `fetch()` of the JSON content files require an origin.

## Install as an app
Open in Chrome/Safari on mobile → "Add to Home Screen". It launches standalone,
full-screen, and works **offline** (service worker caches the shell + every screen
you've visited).

## Deploy (GitHub Pages)
This is a static site with **relative paths**, so it works from a project subpath
(`https://<user>.github.io/<repo>/`) with no config changes.

1. Push this folder to a GitHub repo (see below).
2. Repo → **Settings → Pages** → *Build and deployment* → **Deploy from a branch** →
   Branch: **main**, Folder: **/ (root)** → Save.
3. Wait ~1 min; your live URL appears at the top of that Pages settings page.

`.nojekyll` is included so GitHub serves every file as-is (no Jekyll processing).
Because it's served over HTTPS, the service worker + "Add to Home Screen" work in
production. To update the live site, just commit and `git push` — Pages redeploys.

## Structure

```
index.html                 App shell (top bar + <main> mount) + PWA meta
manifest.webmanifest       Installability (name, icons, theme)
sw.js                      Offline cache (stale-while-revalidate)
css/styles.css             Design system — tokens lifted from Figma
js/app.js                  Hash router + data-driven block renderer
data/*.json                All screen content (one file per screen)
assets/                    Fonts (Work Sans), logos, PWA icons, guide screenshots
```

## How content works
Every screen is a JSON file of ordered **blocks** (`hero`, `step`, `callout`,
`code`, `usecases`, `faq`, `linklist`, …). `js/app.js` renders each block type.
To edit copy or add a screen, edit/add a `data/<id>.json` — no code changes needed.
Routes map `#/<id>` → `data/<id>.json`. See `data/CONTENT_SPEC.md` for the schema.

### Screens
`home` · `chatgpt` (Web / Desktop App tabs) · `claude` (Web / Desktop App / Code
tabs) · `others` · `troubleshooting` · `faq`

Guides use a `tabs` array in their JSON — each tab has its own `headerCard` + `blocks`.
Non-tab screens use a flat `blocks` array. The app bar shows a centered `appTitle`.

### Responsive
Mobile-first. At ≥700px the app grows to a capped **tablet width** (700px, centered)
with two-up step cards, AI options, and use-case cards. It does not expand to full
desktop width by design.

## Notes / to review
- **FAQ answers 2–7** and the **Troubleshooting** solution text are placeholders —
  only FAQ #1 had an authored answer in Figma. Replace with real product copy.
- Setup-step screenshots were exported from Figma into `assets/guides/<id>/`.
```
