const NS = 'wt:';
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

function hash(s) {
  let h = 0xdeadbeef;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
  }
  return (h >>> 0).toString(36);
}

function key(text, lang) {
  return NS + lang + ':' + hash(text);
}

export function get(text, lang) {
  try {
    const raw = localStorage.getItem(key(text, lang));
    if (!raw) return null;
    const { v, t } = JSON.parse(raw);
    if (Date.now() - t > TTL_MS) {
      localStorage.removeItem(key(text, lang));
      return null;
    }
    return v;
  } catch {
    return null;
  }
}

export function set(text, lang, value) {
  try {
    localStorage.setItem(key(text, lang), JSON.stringify({ v: value, t: Date.now() }));
  } catch {
    // quota 초과 무시
  }
}
