const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'NOSCRIPT', 'IFRAME', 'SVG', 'CANVAS', 'KBD', 'SAMP', 'VAR',
]);

function shouldSkip(el) {
  while (el) {
    if (el.nodeType !== 1) { el = el.parentNode; continue; }
    if (SKIP_TAGS.has(el.tagName)) return true;
    if (el.id === 'wt-widget') return true;
    if (el.hasAttribute && el.hasAttribute('data-no-translate')) return true;
    if (el.isContentEditable) return true;
    el = el.parentElement;
  }
  return false;
}

export function collectTextNodes(root) {
  const start = root || document.body;
  if (!start) return [];
  const nodes = [];
  const walker = document.createTreeWalker(start, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue;
      if (!text || !text.trim()) return NodeFilter.FILTER_REJECT;
      if (shouldSkip(node.parentElement)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  let n;
  while ((n = walker.nextNode())) nodes.push(n);
  return nodes;
}

export function isVisibleText(node) {
  return node && node.nodeType === 3 && node.nodeValue && node.nodeValue.trim().length > 0;
}
