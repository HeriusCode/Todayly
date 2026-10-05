const weatherDescriptions = {
  0: 'Trời quang',
  1: 'Chủ yếu trời quang',
  2: 'Có mây rải rác',
  3: 'Trời nhiều mây',
  45: 'Có sương mù',
  48: 'Sương mù đóng băng',
  51: 'Mưa phùn nhẹ',
  53: 'Mưa phùn',
  55: 'Mưa phùn dày',
  61: 'Mưa nhẹ',
  63: 'Có mưa',
  65: 'Mưa lớn',
  71: 'Tuyết nhẹ',
  73: 'Có tuyết',
  75: 'Tuyết dày',
  80: 'Mưa rào nhẹ',
  81: 'Có mưa rào',
  82: 'Mưa rào lớn',
  95: 'Có giông',
  96: 'Giông kèm mưa đá',
  99: 'Giông mạnh kèm mưa đá',
};

const airQualityLabel = (aqi) => {
  if (!Number.isFinite(aqi)) return 'Chưa có dữ liệu AQI';
  if (aqi <= 50) return `Tốt (AQI ${Math.round(aqi)})`;
  if (aqi <= 100) return `Trung bình (AQI ${Math.round(aqi)})`;
  if (aqi <= 150) return `Không tốt cho nhóm nhạy cảm (AQI ${Math.round(aqi)})`;
  if (aqi <= 200) return `Không tốt (AQI ${Math.round(aqi)})`;
  return `Rất xấu (AQI ${Math.round(aqi)})`;
};

const humidityLabel = (humidity) => {
  if (!Number.isFinite(humidity)) return 'Chưa có dữ liệu';
  const comfort = humidity < 30 ? 'Khô' : humidity > 70 ? 'Ẩm cao' : 'Dễ chịu';
  return `${Math.round(humidity)}% ${comfort}`;
};

export const getCurrentWeather = async (req, res, next) => {
  try {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lon);
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return res.status(400).json({ message: 'Tọa độ vị trí không hợp lệ.' });
    }
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ message: 'Tọa độ nằm ngoài phạm vi cho phép.' });
    }

    const forecastUrl = new URL('https://api.open-meteo.com/v1/forecast');
    forecastUrl.search = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
      timezone: 'auto',
    });
    const airUrl = new URL('https://air-quality-api.open-meteo.com/v1/air-quality');
    airUrl.search = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: 'us_aqi',
      timezone: 'auto',
    });
    const placeUrl = new URL('https://api.bigdatacloud.net/data/reverse-geocode-client');
    placeUrl.search = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      localityLanguage: 'vi',
    });

    const [forecastResponse, airResponse, placeResponse] = await Promise.all([
      fetch(forecastUrl),
      fetch(airUrl).catch(() => null),
      fetch(placeUrl).catch(() => null),
    ]);
    if (!forecastResponse.ok) throw new Error('Không lấy được dữ liệu thời tiết từ Open-Meteo.');

    const forecast = await forecastResponse.json();
    const air = airResponse?.ok ? await airResponse.json() : null;
    const place = placeResponse?.ok ? await placeResponse.json() : null;
    const current = forecast.current || {};
    const city = place?.city || place?.locality || place?.principalSubdivision;
    const country = place?.countryName;
    const location = [city, country].filter(Boolean).join(', ') || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

    return res.json({
      observedAt: current.time || new Date().toISOString(),
      timezone: forecast.timezone,
      location,
      latitude,
      longitude,
      temperature: Math.round(current.temperature_2m),
      apparentTemperature: Math.round(current.apparent_temperature),
      condition: weatherDescriptions[current.weather_code] || 'Thời tiết hiện tại',
      weatherCode: current.weather_code,
      humidity: humidityLabel(current.relative_humidity_2m),
      windSpeed: current.wind_speed_10m,
      airQuality: airQualityLabel(Number(air?.current?.us_aqi)),
    });
  } catch (error) {
    next(error);
  }
};
