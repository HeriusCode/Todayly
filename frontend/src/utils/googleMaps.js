let googleMapsPromise;

export const loadGoogleMaps = (apiKey) => {
  if (window.google?.maps?.importLibrary) return Promise.resolve(window.google.maps);
  if (!apiKey) return Promise.reject(new Error('Thiếu VITE_GOOGLE_MAPS_API_KEY'));
  if (googleMapsPromise) return googleMapsPromise;

  googleMapsPromise = new Promise((resolve, reject) => {
    const callbackName = '__todaylyGoogleMapsReady';
    const existingScript = document.querySelector('script[data-todayly-google-maps]');

    window[callbackName] = () => {
      delete window[callbackName];
      resolve(window.google.maps);
    };

    if (existingScript) {
      existingScript.addEventListener('error', () => reject(new Error('Không tải được Google Maps JavaScript API')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.dataset.todaylyGoogleMaps = 'true';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&v=weekly&loading=async&libraries=marker&language=vi&region=VN&callback=${callbackName}`;
    script.onerror = () => {
      delete window[callbackName];
      googleMapsPromise = undefined;
      reject(new Error('Không tải được Google Maps JavaScript API'));
    };
    document.head.appendChild(script);
  });

  return googleMapsPromise;
};
