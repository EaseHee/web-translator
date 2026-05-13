const LANG_LABELS = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ru: 'Русский',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  id: 'Bahasa Indonesia',
  ar: 'العربية',
  hi: 'हिन्दी',
  tr: 'Türkçe',
  nl: 'Nederlands',
  pl: 'Polski',
};

const ARROW_LIGHT = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M0 0l5 6 5-6z' fill='%23666'/></svg>\")";
const ARROW_DARK = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M0 0l5 6 5-6z' fill='%23bbb'/></svg>\")";

const STYLE = `
#wt-widget {
  --wt-offset-x: 12px;
  --wt-offset-y: 12px;
  --wt-z-index: 2147483647;
  --wt-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  --wt-font-size: 14px;
  --wt-line-height: 1.4;
  --wt-color: #222;
  --wt-bg: #fff;
  --wt-border-color: #d0d0d0;
  --wt-border-width: 1px;
  --wt-radius: 6px;
  --wt-padding-y: 6px;
  --wt-padding-left: 10px;
  --wt-padding-right: 26px;
  --wt-shadow: 0 1px 3px rgba(0,0,0,.08);
  --wt-focus-color: #4f8cff;
  --wt-focus-width: 2px;
  --wt-arrow: ${ARROW_LIGHT};
  --wt-arrow-position: right 8px center;
  --wt-busy-opacity: .6;
  --wt-transition: background-color .15s, color .15s, border-color .15s;

  position: fixed;
  z-index: var(--wt-z-index);
  font-family: var(--wt-font-family);
  font-size: var(--wt-font-size);
  line-height: var(--wt-line-height);
}
#wt-widget.wt-top-right    { top: var(--wt-offset-y);    right: var(--wt-offset-x); }
#wt-widget.wt-top-left     { top: var(--wt-offset-y);    left: var(--wt-offset-x); }
#wt-widget.wt-bottom-right { bottom: var(--wt-offset-y); right: var(--wt-offset-x); }
#wt-widget.wt-bottom-left  { bottom: var(--wt-offset-y); left: var(--wt-offset-x); }
#wt-widget.wt-top-center {
  top: var(--wt-offset-y);
  left: 50%;
  transform: translateX(-50%);
}
#wt-widget.wt-bottom-center {
  bottom: var(--wt-offset-y);
  left: 50%;
  transform: translateX(-50%);
}
#wt-widget select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  font: inherit;
  color: var(--wt-color);
  background-color: var(--wt-bg);
  border: var(--wt-border-width) solid var(--wt-border-color);
  border-radius: var(--wt-radius);
  padding: var(--wt-padding-y) var(--wt-padding-right) var(--wt-padding-y) var(--wt-padding-left);
  box-shadow: var(--wt-shadow);
  cursor: pointer;
  background-image: var(--wt-arrow);
  background-repeat: no-repeat;
  background-position: var(--wt-arrow-position);
  transition: var(--wt-transition);
}
#wt-widget select:focus {
  outline: var(--wt-focus-width) solid var(--wt-focus-color);
  outline-offset: 1px;
}
#wt-widget[data-busy="1"] select {
  opacity: var(--wt-busy-opacity);
  cursor: progress;
}
@media (prefers-color-scheme: dark) {
  #wt-widget:not(.wt-theme-light) {
    --wt-color: #e6e6e6;
    --wt-bg: #1f1f23;
    --wt-border-color: #3a3a40;
    --wt-arrow: ${ARROW_DARK};
  }
}
#wt-widget.wt-theme-dark {
  --wt-color: #e6e6e6;
  --wt-bg: #1f1f23;
  --wt-border-color: #3a3a40;
  --wt-arrow: ${ARROW_DARK};
}
`;

const POSITIONS = new Set([
  'top-right', 'top-left',
  'bottom-right', 'bottom-left',
  'top-center', 'bottom-center',
]);

const VAR_KEYS = new Set([
  'offset-x', 'offset-y', 'z-index',
  'font-family', 'font-size', 'line-height',
  'color', 'bg',
  'border-color', 'border-width',
  'radius',
  'padding-y', 'padding-left', 'padding-right',
  'shadow',
  'focus-color', 'focus-width',
  'arrow', 'arrow-position',
  'busy-opacity', 'transition',
]);

function labelFor(code) {
  return LANG_LABELS[code] || code;
}

function applyInlineVars(el, opts) {
  for (const [k, v] of Object.entries(opts || {})) {
    if (v == null || v === '') continue;
    if (VAR_KEYS.has(k)) {
      el.style.setProperty(`--wt-${k}`, String(v));
    }
  }
}

function applyRawStyle(el, raw) {
  if (!raw) return;
  for (const decl of String(raw).split(';')) {
    const idx = decl.indexOf(':');
    if (idx < 0) continue;
    const prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (prop.startsWith('--wt-') && value) el.style.setProperty(prop, value);
  }
}

export function mount({
  position,
  defaultLang,
  langs,
  onChange,
  theme,
  vars,
  rawStyle,
}) {
  if (document.getElementById('wt-widget')) return null;

  const style = document.createElement('style');
  style.id = 'wt-style';
  style.textContent = STYLE;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'wt-widget';
  container.setAttribute('data-no-translate', '');

  const pos = POSITIONS.has(position) ? position : 'top-right';
  container.classList.add('wt-' + pos);

  if (theme === 'light' || theme === 'dark') {
    container.classList.add('wt-theme-' + theme);
  }

  applyInlineVars(container, vars);
  applyRawStyle(container, rawStyle);

  const select = document.createElement('select');
  select.setAttribute('aria-label', 'Language');

  const seen = new Set();
  const order = [defaultLang, ...langs].filter((c) => {
    if (!c || seen.has(c)) return false;
    seen.add(c);
    return true;
  });
  for (const code of order) {
    const opt = document.createElement('option');
    opt.value = code;
    opt.textContent = labelFor(code);
    select.appendChild(opt);
  }
  select.value = defaultLang;
  select.addEventListener('change', () => onChange(select.value));
  container.appendChild(select);
  document.body.appendChild(container);

  return {
    setBusy(b) {
      container.setAttribute('data-busy', b ? '1' : '0');
    },
    setLang(l) {
      select.value = l;
    },
  };
}
