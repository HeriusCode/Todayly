import { taskService } from './taskService';

const categoryByType = {
  task: 'Công việc',
  food: 'Ăn uống',
  place: 'Thư giãn',
};

// Lịch trình và Hôm nay làm gì dùng chung collection Task.
// Service này chỉ chuyển đổi tên trường dành cho giao diện lịch trình.
export const scheduleService = {
  getToday: async () => ({ timeline: await taskService.getAll() }),

  addItem: async (item) =>
    taskService.create({
      ...item,
      activityType: item.type || 'task',
      category: item.category || categoryByType[item.type] || 'Công việc',
    }),

  toggleItem: async (id, completed) => taskService.toggleComplete(id, completed),

  deleteItem: async (id) => taskService.delete(id),
};
