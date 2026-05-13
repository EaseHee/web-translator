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

const STYLE = `
#wt-widget {
  position: fixed;
  z-index: 2147483647;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.4;
}
#wt-widget.wt-top-right { top: 12px; right: 12px; }
#wt-widget.wt-top-left  { top: 12px; left: 12px; }
#wt-widget.wt-bottom-right { bottom: 12px; right: 12px; }
#wt-widget.wt-bottom-left  { bottom: 12px; left: 12px; }
#wt-widget select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #fff;
  color: #222;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  padding: 6px 26px 6px 10px;
  box-shadow: 0 1px 3px rgba(0,0,0,.08);
  cursor: pointer;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M0 0l5 6 5-6z' fill='%23666'/></svg>");
  background-repeat: no-repeat;
  background-position: right 8px center;
}
#wt-widget select:focus { outline: 2px solid #4f8cff; outline-offset: 1px; }
#wt-widget[data-busy="1"] select { opacity: .6; cursor: progress; }
@media (prefers-color-scheme: dark) {
  #wt-widget select {
    background-color: #1f1f23;
    color: #e6e6e6;
    border-color: #3a3a40;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path d='M0 0l5 6 5-6z' fill='%23bbb'/></svg>");
  }
}
`;

function labelFor(code) {
  return LANG_LABELS[code] || code;
}

export function mount({ position, defaultLang, langs, onChange }) {
  if (document.getElementById('wt-widget')) return null;

  const style = document.createElement('style');
  style.id = 'wt-style';
  style.textContent = STYLE;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.id = 'wt-widget';
  container.setAttribute('data-no-translate', '');
  const pos = ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(position)
    ? position
    : 'top-right';
  container.className = 'wt-' + pos;

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
