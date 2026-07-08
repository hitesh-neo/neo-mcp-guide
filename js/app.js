/* ============================================================
   Neosapien · MCP Guide — router + block renderer (vanilla)
   ============================================================ */

const view = document.getElementById('view');
const backBtn = document.getElementById('backBtn');
const appbarTitle = document.getElementById('appbarTitle');
const toastEl = document.getElementById('toast');

/* ---------- icon library (inline SVG, offline-safe) ---------- */
const ICONS = {
  chevron: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  question: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M9.6 9.3a2.4 2.4 0 114.2 1.6c-.8.8-1.8 1.2-1.8 2.4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="16.6" r="1" fill="currentColor"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H8l-4 3.5z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="9" cy="10.5" r="1" fill="currentColor"/><circle cx="12.5" cy="10.5" r="1" fill="currentColor"/><circle cx="16" cy="10.5" r="1" fill="currentColor"/></svg>',
  stars: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.7 4.6L18 8l-4.3 1.4L12 14l-1.7-4.6L6 8l4.3-1.4z"/><path d="M18.5 13l.9 2.3L21.5 16l-2.1.7-.9 2.3-.9-2.3L15.5 16l2.1-.7z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M6 15H5a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v1" stroke="currentColor" stroke-width="1.7"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  // MCP wordmark (Model Context Protocol) — currentColor
  mcp: '<svg viewBox="0 0 24 24" fill="currentColor" fill-rule="evenodd"><path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z"/><path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z"/></svg>',
  // Phosphor (regular) — use-case icons, viewBox 256
  sunHorizon: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M240,152H199.55a73.54,73.54,0,0,0,.45-8,72,72,0,0,0-144,0,73.54,73.54,0,0,0,.45,8H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM72,144a56,56,0,1,1,111.41,8H72.59A56.13,56.13,0,0,1,72,144Zm144,56a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16H208A8,8,0,0,1,216,200ZM72.84,43.58a8,8,0,0,1,14.32-7.16l8,16a8,8,0,0,1-14.32,7.16Zm-56,48.84a8,8,0,0,1,10.74-3.57l16,8a8,8,0,0,1-7.16,14.31l-16-8A8,8,0,0,1,16.84,92.42Zm192,15.16a8,8,0,0,1,3.58-10.73l16-8a8,8,0,1,1,7.16,14.31l-16,8a8,8,0,0,1-10.74-3.58Zm-48-55.16,8-16a8,8,0,0,1,14.32,7.16l-8,16a8,8,0,1,1-14.32-7.16Z"/></svg>',
  pencilLine: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"/></svg>',
  calendarDots: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"/></svg>',
  magnifier: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>',
  listChecks: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z"/></svg>',
  squaresFour: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-96,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48Zm96-64H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,200,136Zm0,64H152V152h48v48Z"/></svg>',
  export: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"/></svg>',
  sparkle: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M197.58,129.06,146,110l-19-51.62a15.92,15.92,0,0,0-29.88,0L78,110l-51.62,19a15.92,15.92,0,0,0,0,29.88L78,178l19,51.62a15.92,15.92,0,0,0,29.88,0L146,178l51.62-19a15.92,15.92,0,0,0,0-29.88ZM137,164.22a8,8,0,0,0-4.74,4.74L112,223.85,91.78,169A8,8,0,0,0,87,164.22L32.15,144,87,123.78A8,8,0,0,0,91.78,119L112,64.15,132.22,119a8,8,0,0,0,4.74,4.74L191.85,144ZM144,40a8,8,0,0,1,8-8h16V16a8,8,0,0,1,16,0V32h16a8,8,0,0,1,0,16H184V64a8,8,0,0,1-16,0V48H152A8,8,0,0,1,144,40ZM248,88a8,8,0,0,1-8,8h-8v8a8,8,0,0,1-16,0V96h-8a8,8,0,0,1,0-16h8V72a8,8,0,0,1,16,0v8h8A8,8,0,0,1,248,88Z"/></svg>',
  plugs: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M237.66,18.34a8,8,0,0,0-11.32,0l-52.4,52.41-5.37-5.38a32.05,32.05,0,0,0-45.26,0L100,88.69l-6.34-6.35A8,8,0,0,0,82.34,93.66L88.69,100,65.37,123.31a32,32,0,0,0,0,45.26l5.38,5.37-52.41,52.4a8,8,0,0,0,11.32,11.32l52.4-52.41,5.37,5.38a32,32,0,0,0,45.26,0L156,167.31l6.34,6.35a8,8,0,0,0,11.32-11.32L167.31,156l23.32-23.31a32,32,0,0,0,0-45.26l-5.38-5.37,52.41-52.4A8,8,0,0,0,237.66,18.34Zm-116.29,161a16,16,0,0,1-22.62,0L76.69,157.25a16,16,0,0,1,0-22.62L100,111.31,144.69,156Zm57.94-57.94L156,144.69,111.31,100l23.32-23.31a16,16,0,0,1,22.62,0l22.06,22A16,16,0,0,1,179.31,121.37ZM88.57,35A8,8,0,0,1,103.43,29l8,20A8,8,0,0,1,96.57,55ZM24.57,93A8,8,0,0,1,35,88.57l20,8A8,8,0,0,1,49,111.43l-20-8A8,8,0,0,1,24.57,93ZM231.43,163a8,8,0,0,1-10.4,4.46l-20-8A8,8,0,1,1,207,144.57l20,8A8,8,0,0,1,231.43,163Zm-64,58.06A8,8,0,0,1,152.57,227l-8-20A8,8,0,0,1,159.43,201Z"/></svg>',
};
const icon = (name, cls) => `<span class="${cls || ''}">${ICONS[name] || ''}</span>`;

// Map a use-case sample title -> Phosphor icon key (icons on every sample)
const UC_ICON = {
  'catch up on your day': 'sunHorizon',
  'draft your replies': 'pencilLine',
  "prep for what's next": 'calendarDots',
  'recall any detail': 'magnifier',
  'turn talk into to-dos': 'listChecks',
  'turn task into to-dos': 'listChecks',
  'work across your tools': 'squaresFour',
  'export data': 'export',
  'not getting results?': 'sparkle',
};
const ucIconName = (it) => {
  if (it.icon === 'export') return 'export';
  if (it.icon === 'stars') return 'sparkle';
  const key = (it.title || '').trim().toLowerCase().replace(/[‘’]/g, "'");
  return UC_ICON[key] || (ICONS[it.icon] ? it.icon : 'sparkle');
};

const BRAND_LOGO = {
  chatgpt: 'assets/logos/chatgpt.svg',
  claude: 'assets/logos/claude.svg',
};

/* ---------- small helpers ---------- */
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};

let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1600);
}

/* ============================================================
   Block renderers
   ============================================================ */
const renderers = {
  hero(b) {
    const cluster = (b.logos || [])
      .map((l) =>
        l === 'mcp'
          ? `<span class="mcp">${ICONS.mcp}</span>`
          : `<img src="${l}" alt="" />`
      )
      .join('');
    return el('section', 'hero', `
      <div class="hero-logos">
        <img class="neo" src="${b.neo}" alt="Neosapien" />
        <svg class="x" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        <div class="cluster">${cluster}</div>
      </div>
      <h1>${b.title}</h1>
      <p>${b.html}</p>
    `);
  },

  sectionhead(b) {
    const n = el('div', 'section-head' + (b.center ? ' center' : ''));
    n.appendChild(el('h2', 'h-section', b.text));
    if (b.sub) n.appendChild(el('p', 'sub', b.sub));
    return n;
  },

  heading(b) {
    const n = el('div', 'section-head');
    n.appendChild(el('h2', 'h-section', b.text));
    if (b.sub) n.appendChild(el('p', 'sub', b.sub));
    return n;
  },

  paragraph(b) {
    return el('p', 'note-line', b.html);
  },

  steps(b) {
    const wrap = el('div', 'steps');
    (b.items || []).forEach((s) => {
      wrap.appendChild(el('div', 'step-chip',
        `<div class="n">${s.n}</div><span class="label">${s.label}</span>`));
    });
    return wrap;
  },

  ailist(b) {
    const wrap = el('div', 'ai-list');
    (b.items || []).forEach((it) => {
      const lead = it.logo
        ? `<img src="${it.logo}" alt="" />`
        : `<span class="mcp">${ICONS.mcp}</span>`;
      const a = el('a', 'ai-option', `
        <div class="lead">
          ${lead}
          <div class="copy">
            <span class="name">${it.name}</span>
            <span class="desc">${it.desc}</span>
          </div>
        </div>
        <span class="cta">${it.cta || 'Open Guide →'}</span>
      `);
      a.href = it.href;
      wrap.appendChild(a);
    });
    return wrap;
  },

  note(b) {
    return el('p', 'note-line', b.html);
  },

  step(b) {
    const card = el('div', 'step-card' + (b.image ? '' : ' no-shot'));
    if (b.image) {
      const shot = el('div', 'card-shot');
      const img = el('img');
      img.loading = 'lazy';
      img.src = b.image;
      img.alt = b.caption || 'Step ' + b.n + ' screenshot';
      shot.appendChild(img);
      card.appendChild(shot);
    }
    const details = el('div', 'card-details');
    details.appendChild(el('span', 'step-label', 'Step ' + b.n));
    if (b.html) details.appendChild(el('div', 'step-instr', b.html));
    if (b.note) details.appendChild(renderers.callout(b.note));
    card.appendChild(details);
    return card;
  },

  tabs(b, screen) {
    const wrap = el('div', 'tabgroup');
    const bar = el('div', 'tabbar');
    bar.setAttribute('role', 'tablist');
    const panel = el('div', 'tabpanel');
    const tabs = screen.tabs;
    let active = 0;

    const paint = (i) => {
      active = i;
      [...bar.children].forEach((btn, j) => {
        btn.classList.toggle('active', j === i);
        btn.setAttribute('aria-selected', j === i ? 'true' : 'false');
      });
      panel.innerHTML = '';
      const t = tabs[i];
      if (t.headerCard) panel.appendChild(renderers.callout(t.headerCard));
      const blocks = el('div', 'blocks');
      (t.blocks || []).forEach((blk) => blocks.appendChild(renderBlock(blk, screen)));
      panel.appendChild(blocks);
      // replay the soft cross-fade on tab change
      panel.classList.remove('swap');
      void panel.offsetWidth;
      panel.classList.add('swap');
    };

    tabs.forEach((t, i) => {
      const btn = el('button', 'tab', t.label);
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.addEventListener('click', () => paint(i));
      bar.appendChild(btn);
    });
    wrap.appendChild(bar);
    wrap.appendChild(panel);
    paint(0);
    return wrap;
  },

  callout(b) {
    const v = b.variant || 'info';
    const ic = v === 'success' ? 'check' : 'sparkle';
    const n = el('div', 'callout ' + v);
    if (b.title) n.appendChild(el('div', 'c-title',
      `<span class="c-ico">${ICONS[ic] || ''}</span><span>${b.title}</span>`));
    if (b.html) n.appendChild(el('div', 'c-body', b.html));
    return n;
  },

  code(b) {
    const n = el('div', 'code');
    const pre = document.createElement('span');
    pre.textContent = b.text;
    n.appendChild(pre);
    const btn = el('button', 'copy-btn', ICONS.copy);
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Copy');
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(b.text); toast('Copied'); }
      catch { toast('Copy failed'); }
    });
    n.appendChild(btn);
    return n;
  },

  image(b) {
    const fig = el('figure', 'image shot');
    const img = el('img');
    img.loading = 'lazy';
    img.src = b.src;
    img.alt = b.caption || '';
    fig.appendChild(img);
    if (b.caption) fig.appendChild(el('figcaption', null, b.caption));
    return fig;
  },

  usecases(b) {
    const frag = document.createDocumentFragment();
    (b.groups || []).forEach((g) => {
      const card = el('div', 'usecases');
      (g.items || []).forEach((it) => {
        const uc = el('div', 'usecase');
        const title = el('div', 'title');
        const ic = el('span', 'uc-ico');
        ic.innerHTML = ICONS[ucIconName(it)] || '';
        title.appendChild(ic);
        title.appendChild(el('span', 'grad', it.title));
        uc.appendChild(title);
        if (it.desc) uc.appendChild(el('div', 'desc', it.desc));
        card.appendChild(uc);
      });
      frag.appendChild(card);
    });
    return frag;
  },

  linklist(b) {
    const card = el('div', 'link-card');
    (b.items || []).forEach((it) => {
      const a = el('a', 'link-row', `
        ${icon(it.icon || 'question', 'ico')}
        <span class="label">${it.label}</span>
        ${icon('chevron', 'chev')}
      `);
      a.href = normalizeHref(it.href);
      card.appendChild(a);
    });
    return card;
  },

  faq(b) {
    const wrap = el('div', 'faq');
    (b.items || []).forEach((it) => {
      const item = el('div', 'faq-item');
      const q = el('button', 'faq-q',
        `<span>${it.q}</span>${icon('plus', 'tw')}`);
      q.type = 'button';
      const a = el('div', 'faq-a');
      a.appendChild(el('div', 'faq-a-inner', it.a));
      q.addEventListener('click', () => item.toggleAttribute('open'));
      item.appendChild(q);
      item.appendChild(a);
      wrap.appendChild(item);
    });
    return wrap;
  },

  divider() { return el('hr', 'divider'); },
};

function renderBlock(b, screen) {
  const fn = renderers[b.type];
  return fn ? fn(b, screen) : el('div', null, '');
}

/* ============================================================
   Screen rendering
   ============================================================ */
function renderScreen(screen) {
  view.innerHTML = '';
  const isHome = screen.id === 'home';
  const isGuide = !!(screen.tabs || screen.brand);
  view.classList.toggle('home', isHome);
  view.classList.toggle('guide', isGuide && !isHome);

  // App-bar title (centered) for non-home screens
  appbarTitle.textContent = isHome ? '' : (screen.appTitle || screen.title || '');

  if (isHome) {
    (screen.blocks || []).forEach((b) => view.appendChild(renderBlock(b, screen)));
  } else if (screen.tabs) {
    // Guide with Web / Desktop App / Code tabs
    view.appendChild(renderers.tabs({}, screen));
  } else {
    // Simple screen (FAQ, Troubleshooting, Others) — optional header card + blocks
    if (!screen.brand) view.appendChild(renderers.heading({ text: screen.title, sub: screen.subtitle }));
    if (screen.headerCard) view.appendChild(renderers.callout(screen.headerCard));
    const blocks = el('div', 'blocks');
    (screen.blocks || []).forEach((b) => blocks.appendChild(renderBlock(b, screen)));
    view.appendChild(blocks);
  }

  document.title = isHome ? 'Neosapien · MCP Guide' : `${screen.title} · MCP Guide`;
  backBtn.hidden = isHome;
  window.scrollTo(0, 0);
}

/* ============================================================
   Router
   ============================================================ */
const ALIAS = { '': 'home', faqs: 'faq' };
function normalizeHref(href) {
  if (!href) return '#/';
  return href.replace('#/faqs', '#/faq');
}
function routeId() {
  const raw = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const id = raw[raw.length - 1] || '';
  return ALIAS[id] || id || 'home';
}

const cache = new Map();
async function loadScreen(id) {
  if (cache.has(id)) return cache.get(id);
  const res = await fetch(`data/${id}.json`, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  cache.set(id, data);
  return data;
}

function markSidebar(id) {
  document.querySelectorAll('.side-link').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === id);
  });
}

async function route() {
  const id = routeId();
  markSidebar(id);
  // Only show a loading state on a cold fetch — cached screens render instantly (no flicker)
  if (!cache.has(id)) view.innerHTML = '<div class="loading">Loading…</div>';
  try {
    const screen = await loadScreen(id);
    renderScreen(screen);
  } catch (err) {
    view.innerHTML = '';
    const box = el('div', 'errbox',
      `Couldn’t load this page.<br /><small>${id}.json — ${err.message}</small>`);
    const btn = el('button', null, 'Back to guide');
    btn.addEventListener('click', () => { location.hash = '#/'; });
    box.appendChild(btn);
    view.appendChild(box);
    backBtn.hidden = false;
  }
}

backBtn.addEventListener('click', () => {
  if (history.length > 1 && document.referrer !== '') history.back();
  else location.hash = '#/';
  // fallback: if still not home after back, go home
  setTimeout(() => { if (routeId() !== 'home' && history.length <= 1) location.hash = '#/'; }, 50);
});

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
route();

/* ---------- service worker ---------- */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
