# Screen content model (shared schema)

Every screen is a JSON file: `{ "id", "title", "subtitle"?, "brand"?, "headerCard"?, "blocks": [...] }`

`blocks` is an ordered array. Each block is one of:

- `{ "type": "heading", "text": "...", "sub"?: "..." }` — section heading (24px) + optional muted subtitle
- `{ "type": "paragraph", "html": "..." }` — body copy; inline `<b>`, `<span class="grad">` (green gradient), `<a>` allowed
- `{ "type": "step", "n": 1, "title": "...", "html"?: "...", "image"?: "assets/guides/<id>/step-1.png", "caption"?: "...", "note"?: {"variant":"info|warning|success","html":"..."} }` — a numbered setup step. `html` is the step description. `image` optional screenshot.
- `{ "type": "callout", "variant": "info|warning|success", "title"?: "...", "html": "..." }` — highlighted box
- `{ "type": "code", "text": "..." }` — monospace code/command block (copyable)
- `{ "type": "image", "src": "...", "caption"?: "..." }`
- `{ "type": "usecases", "groups": [ { "items": [ {"title":"...","desc":"...","icon"?:"stars|export"} ] } ] }` — the "Here's what it does for you" grouped cards
- `{ "type": "linklist", "items": [ {"label":"Troubleshooting","href":"#/troubleshooting","icon":"question|chat"} ] }`
- `{ "type": "faq", "items": [ {"q":"...","a":"..."} ] }` — accordion
- `{ "type": "divider" }`

## Rules for extraction
- Copy text EXACTLY as in Figma (punctuation, casing, quotes).
- Number steps as shown. Put the step's instruction text in `html`.
- Download every screenshot/illustration referenced in a step into `assets/guides/<id>/` and reference by relative path `assets/guides/<id>/<file>.png`. Use descriptive names like `step-3.png`.
- Skip pure chrome (iOS status bar, home indicator, "Back" app bar) — the shell renders those.
- If a step has a red-circled highlight/annotation in the screenshot, that's fine — keep the screenshot as-is.
- Icons: for usecases/linklist just use the icon keyword; don't download icon SVGs.
