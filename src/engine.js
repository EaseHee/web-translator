const GOOGLE = 'https://translate.googleapis.com/translate_a/single';

async function callGoogle(text, target, source) {
  const params = new URLSearchParams({
    client: 'gtx',
    sl: source || 'auto',
    tl: target,
    dt: 't',
    q: text,
  });
  const res = await fetch(`${GOOGLE}?${params.toString()}`);
  if (!res.ok) {
    const err = new Error(`translate ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error('translate: unexpected response');
  }
  return data[0].map((seg) => (Array.isArray(seg) ? seg[0] : '')).filter(Boolean).join('');
}

async function withBackoff(fn, retries = 3) {
  let delay = 400;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      const status = e && e.status;
      const retriable = !status || status === 429 || status >= 500;
      if (!retriable || i === retries) throw e;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

export const engines = {
  google: (text, target, source) => withBackoff(() => callGoogle(text, target, source)),
};

export async function translate(text, target, source) {
  return engines.google(text, target, source);
}
