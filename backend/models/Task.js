import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true, trim: true },
    scheduledDate: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },
    time: { type: String, default: '09:00 – 10:30' },
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '10:30' },
    activityType: { type: String, enum: ['task', 'food', 'place'], default: 'task' },
    category: { type: String, default: 'Công việc' },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    matrixQuadrant: {
      type: String,
      enum: [
        'important_urgent',
        'important_not_urgent',
        'not_important_urgent',
        'not_important_not_urgent',
      ],
      default: 'important_not_urgent',
    },
    completed: { type: Boolean, default: false },
    pomodoroTarget: { type: Number, min: 0, default: 0 },
    pomodoroCompleted: { type: Number, min: 0, default: 0 },
    location: { type: String, default: '' },
    note: { type: String, default: '' },
    badge: { type: String, default: 'Tự chọn' },
    color: {
      type: String,
      enum: ['primary', 'secondary', 'tertiary'],
      default: 'primary',
    },
  },
  { timestamps: true },
);

taskSchema.index({ user: 1, scheduledDate: 1, startTime: 1 });

export default mongoose.model('Task', taskSchema);
