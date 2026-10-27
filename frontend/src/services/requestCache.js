const memoryCache = new Map();
const pendingRequests = new Map();

const storageKey = (key) => `todayly_cache:${key}`;

export const paramsKey = (params = {}) =>
  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${String(value)}`)
    .join('&');

const readSessionCache = (key, now) => {
  try {
    const raw = sessionStorage.getItem(storageKey(key));
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (cached.expiresAt <= now) {
      sessionStorage.removeItem(storageKey(key));
      return null;
    }
    return cached;
  } catch {
    return null;
  }
};

export const cachedRequest = async (
  key,
  loader,
  { ttl = 60_000, persist = false } = {},
) => {
  const now = Date.now();
  const memoryValue = memoryCache.get(key);
  if (memoryValue?.expiresAt > now) return memoryValue.data;

  if (persist) {
    const storedValue = readSessionCache(key, now);
    if (storedValue) {
      memoryCache.set(key, storedValue);
      return storedValue.data;
    }
  }

  if (pendingRequests.has(key)) return pendingRequests.get(key);

  const request = Promise.resolve()
    .then(loader)
    .then((data) => {
      const cached = { data, expiresAt: Date.now() + ttl };
      memoryCache.set(key, cached);
      if (persist) {
        try {
          sessionStorage.setItem(storageKey(key), JSON.stringify(cached));
        } catch {
          // Storage can be unavailable or full; memory caching still works.
        }
      }
      return data;
    })
    .finally(() => pendingRequests.delete(key));

  pendingRequests.set(key, request);
  return request;
};

export const clearRequestCache = (prefix) => {
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) memoryCache.delete(key);
  }
  try {
    for (let index = sessionStorage.length - 1; index >= 0; index -= 1) {
      const key = sessionStorage.key(index);
      if (key?.startsWith(storageKey(prefix))) sessionStorage.removeItem(key);
    }
  } catch {
    // Ignore browsers that block session storage.
  }
};
