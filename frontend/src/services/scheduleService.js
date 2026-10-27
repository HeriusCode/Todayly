import { taskService } from './taskService';

const SUPPORTED_ACTIVITY_TYPES = new Set(['task', 'food', 'place']);

const normalizeScheduleItem = (item = {}) => {
  const requestedType = item.activityType || item.type || 'task';
  const activityType = SUPPORTED_ACTIVITY_TYPES.has(requestedType)
    ? requestedType
    : 'task';
  const time = item.time || [item.startTime, item.endTime].filter(Boolean).join(' – ');

  return {
    ...item,
    activityType,
    ...(time ? { time } : {}),
  };
};

export const scheduleService = {
  addItem: async (item) => {
    const createdItem = await taskService.create(normalizeScheduleItem(item));
    window.dispatchEvent(new Event('todayly:tasks-changed'));
    return createdItem;
  },
};
