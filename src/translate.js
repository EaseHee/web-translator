import { collectTextNodes } from './walker.js';
import * as cache from './cache.js';
import { translate as runEngine } from './engine.js';
import { watch } from './observer.js';
import { mount } from './widget.js';

const SCRIPT_EL = (function findScript() {
  if (document.currentScript) return document.currentScript;
  const list = document.querySelectorAll('script[src*="translate"]');
  return list.length ? list[list.length - 1] : null;
})();

const originals = new WeakMap();
let currentTarget = null;
let cfg = null;
let ui = null;

function readConfig() {
  const d = (SCRIPT_EL && SCRIPT_EL.dataset) || {};
  const htmlLang = (document.documentElement.getAttribute('lang') || '').split('-')[0] || 'auto';
  return {
    langs: (d.langs || 'en,ja,zh-CN').split(',').map((s) => s.trim()).filter(Boolean),
    defaultLang: d.default || htmlLang || 'auto',
    position: d.position || 'top-right',
    auto: d.auto === 'true',
    concurrency: Math.max(1, parseInt(d.concurrency || '4', 10)),
  };
}

async function withConcurrency(items, limit, worker) {
  let i = 0;
  const runners = Array(Math.min(limit, items.length || 1))
    .fill(0)
    .map(async () => {
      while (true) {
        const idx = i++;
        if (idx >= items.length) return;
        try {
          await worker(items[idx], idx);
        } catch (e) {
          console.warn('[web-translator]', e);
        }
      }
    });
  await Promise.all(runners);
}

async function translateNodes(nodes, target) {
  if (!nodes.length || !target) return;
  const tasks = [];
  for (const node of nodes) {
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    tasks.push({ node, raw: originals.get(node) });
  }
  await withConcurrency(tasks, cfg.concurrency, async ({ node, raw }) => {
    const trimmed = raw.replace(/\s+/g, ' ').trim();
    if (!trimmed) return;
    let out = cache.get(trimmed, target);
    if (!out) {
      out = await runEngine(trimmed, target);
      if (out) cache.set(trimmed, target, out);
    }
    if (!out) return;
    const leading = raw.match(/^\s*/)[0];
    const trailing = raw.match(/\s*$/)[0];
    const next = leading + out + trailing;
    if (node.nodeValue !== next) node.nodeValue = next;
  });
}

function restoreOriginals() {
  for (const node of collectTextNodes()) {
    const o = originals.get(node);
    if (o != null && node.nodeValue !== o) node.nodeValue = o;
  }
}

function browserPreferred() {
  const nav = (navigator.language || 'en').toLowerCase();
  return nav;
}

function pickAutoTarget() {
  const pref = browserPreferred();
  const base = pref.split('-')[0];
  if (pref === cfg.defaultLang.toLowerCase() || base === cfg.defaultLang.toLowerCase()) return null;
  const exact = cfg.langs.find((l) => l.toLowerCase() === pref);
  if (exact) return exact;
  const partial = cfg.langs.find((l) => l.toLowerCase().split('-')[0] === base);
  return partial || null;
}

async function applyTarget(target) {
  if (target === cfg.defaultLang) {
    restoreOriginals();
    currentTarget = cfg.defaultLang;
    return;
  }
  if (!ui) return;
  ui.setBusy(true);
  try {
    await translateNodes(collectTextNodes(), target);
    currentTarget = target;
  } finally {
    ui.setBusy(false);
  }
}

function start() {
  cfg = readConfig();
  currentTarget = cfg.defaultLang;

  ui = mount({
    position: cfg.position,
    defaultLang: cfg.defaultLang,
    langs: cfg.langs,
    onChange: applyTarget,
  });

  watch(document.body, async (added) => {
    if (currentTarget === cfg.defaultLang) return;
    const fresh = [];
    for (const n of added) {
      if (n.nodeType === 3) {
        if (n.nodeValue && n.nodeValue.trim()) fresh.push(n);
      } else if (n.nodeType === 1) {
        fresh.push(...collectTextNodes(n));
      }
    }
    if (fresh.length) await translateNodes(fresh, currentTarget);
  });

  if (cfg.auto) {
    const target = pickAutoTarget();
    if (target) {
      if (ui) ui.setLang(target);
      applyTarget(target);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
