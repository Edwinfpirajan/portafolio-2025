const previews = new Map();

export function setPreview(name, dataUrl) {
  previews.set(name, dataUrl);
}

export function getPreview(name) {
  return previews.get(name) || null;
}

export function clearPreview(name) {
  previews.delete(name);
}

export function hasPreview(name) {
  return previews.has(name);
}
