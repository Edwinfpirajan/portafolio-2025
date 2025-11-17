const map = new Map();

export function registerTaskButton(name, el) {
  if (!el) return;
  map.set(name, el);
}

export function unregisterTaskButton(name, el) {
  const current = map.get(name);
  if (current === el) map.delete(name);
}

export function getTaskButtonRect(name) {
  const el = map.get(name);
  if (!el) return null;
  return el.getBoundingClientRect();
}

export function getTaskButtonEl(name) {
  return map.get(name) || null;
}
