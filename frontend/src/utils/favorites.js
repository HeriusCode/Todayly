const key = 'todayly_favorites';

export const getFavorites = () => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};

export const toggleFavorite = (item) => {
  const current = getFavorites();
  const exists = current.some((entry) => entry.id === item.id && entry.kind === item.kind);
  const next = exists ? current.filter((entry) => !(entry.id === item.id && entry.kind === item.kind)) : [...current, item];
  localStorage.setItem(key, JSON.stringify(next));
  window.dispatchEvent(new Event('todayly:favorites-changed'));
  return !exists;
};
