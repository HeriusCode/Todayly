const timeZone = 'Asia/Bangkok';

export const dateKey = (offset = 0) => {
  const date = new Date(Date.now() + offset * 86400000);
  return date.toLocaleDateString('sv-SE', { timeZone });
};

export const currentWeek = () => {
  const weekday = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short' }).format(new Date());
  const index = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 }[weekday] ?? 0;
  return { from: dateKey(-index), to: dateKey(6 - index) };
};

export const formatVietnameseDate = (value = new Date(), options = {}) =>
  new Intl.DateTimeFormat('vi-VN', { timeZone, ...options }).format(value instanceof Date ? value : new Date(`${value}T00:00:00+07:00`));
