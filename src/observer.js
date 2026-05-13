export function watch(target, onNewNodes) {
  const obs = new MutationObserver((mutations) => {
    const added = [];
    for (const m of mutations) {
      for (const n of m.addedNodes) {
        if (n.nodeType === 1 || n.nodeType === 3) added.push(n);
      }
    }
    if (added.length) onNewNodes(added);
  });
  obs.observe(target, { childList: true, subtree: true });
  return () => obs.disconnect();
}
