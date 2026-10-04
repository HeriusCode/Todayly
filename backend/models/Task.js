import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    time: { type: String, default: '09:00 – 10:30' },
    startTime: { type: String, default: '09:00' },
    endTime: { type: String, default: '10:30' },
    category: { type: String, default: 'Công việc' },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    matrixQuadrant: {
      type: String,
      enum: ['important_urgent', 'important_not_urgent', 'not_important_urgent', 'not_important_not_urgent'],
      default: 'important_not_urgent',
    },
    completed: { type: Boolean, default: false },
    pomodoroTarget: { type: Number, default: 2 },
    pomodoroCompleted: { type: Number, default: 0 },
    location: { type: String, default: '' },
    note: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
