import mongoose from 'mongoose';
import Task from '../models/Task.js';
import { isConnected } from '../config/db.js';

const todayInBangkok = () =>
  new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Bangkok',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

const splitTimeRange = (time = '') => {
  const [startTime = '', endTime = ''] = time.split(/\s*[–—-]\s*/).map((value) => value.trim());
  return { startTime, endTime };
};

const serializeTask = (task) => {
  const value = task.toObject ? task.toObject() : task;
  const id = value._id?.toString() || value.id;
  return {
    ...value,
    _id: id,
    id,
    user: value.user?.toString(),
    type: value.activityType,
    status: value.completed ? 'completed' : 'upcoming',
  };
};

const requireDatabase = (res) => {
  if (isConnected) return true;
  res.status(503).json({
    message: 'MongoDB chưa kết nối. Dữ liệu không được lưu tạm để tránh tạo trạng thái giả.',
  });
  return false;
};

const validateId = (id, res) => {
  if (mongoose.isValidObjectId(id)) return true;
  res.status(400).json({ message: 'ID công việc không hợp lệ.' });
  return false;
};

const ownedTaskQuery = (req) => ({ _id: req.params.id, user: req.user._id });

export const getTasks = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    const { category, priority, completed, date, from, to } = req.query;
    const query = { user: req.user._id };
    if (from || to) {
      query.scheduledDate = {};
      if (from) query.scheduledDate.$gte = from;
      if (to) query.scheduledDate.$lte = to;
    } else {
      query.scheduledDate = date || todayInBangkok();
    }
    if (category && category !== 'all') query.category = category;
    if (priority && priority !== 'all') query.priority = priority;
    if (completed !== undefined) query.completed = completed === 'true';
    const tasks = await Task.find(query).sort({ startTime: 1, createdAt: 1 });
    res.json(tasks.map(serializeTask));
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    if (!requireDatabase(res) || !validateId(req.params.id, res)) return;
    const task = await Task.findOne(ownedTaskQuery(req));
    if (!task) return res.status(404).json({ message: 'Không tìm thấy công việc.' });
    res.json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    const {
      title,
      time = '09:00 – 10:30',
      startTime,
      endTime,
      scheduledDate,
      category = 'Công việc',
      activityType = 'task',
      priority = 'medium',
      matrixQuadrant = 'important_not_urgent',
      location = '',
      note = '',
      badge = 'Tự chọn',
      color,
      pomodoroTarget = 0,
    } = req.body;
    if (!title?.trim()) {
      return res.status(400).json({ message: 'Tiêu đề công việc không được để trống.' });
    }
    const parsedTime = splitTimeRange(time);
    const numericPomodoroTarget = Number(pomodoroTarget);
    const task = await Task.create({
      user: req.user._id,
      title: title.trim(),
      time,
      startTime: startTime || parsedTime.startTime || '09:00',
      endTime: endTime || parsedTime.endTime || '10:30',
      scheduledDate: scheduledDate || todayInBangkok(),
      category,
      activityType,
      priority,
      matrixQuadrant,
      location,
      note,
      badge,
      color: color || (activityType === 'food' ? 'secondary' : activityType === 'place' ? 'tertiary' : 'primary'),
      pomodoroTarget: Number.isFinite(numericPomodoroTarget) ? numericPomodoroTarget : 0,
    });
    res.status(201).json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    if (!requireDatabase(res) || !validateId(req.params.id, res)) return;
    const updates = { ...req.body };
    delete updates.user;
    if (updates.time && (!updates.startTime || !updates.endTime)) {
      Object.assign(updates, splitTimeRange(updates.time));
    }
    const task = await Task.findOneAndUpdate(ownedTaskQuery(req), updates, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: 'Không tìm thấy công việc để cập nhật.' });
    res.json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

export const toggleTaskComplete = async (req, res, next) => {
  try {
    if (!requireDatabase(res) || !validateId(req.params.id, res)) return;
    const task = await Task.findOne(ownedTaskQuery(req));
    if (!task) return res.status(404).json({ message: 'Không tìm thấy công việc.' });
    task.completed = typeof req.body.completed === 'boolean' ? req.body.completed : !task.completed;
    await task.save();
    res.json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

export const incrementPomodoro = async (req, res, next) => {
  try {
    if (!requireDatabase(res) || !validateId(req.params.id, res)) return;
    const task = await Task.findOneAndUpdate(
      ownedTaskQuery(req),
      { $inc: { pomodoroCompleted: 1 } },
      { new: true },
    );
    if (!task) return res.status(404).json({ message: 'Không tìm thấy công việc.' });
    res.json(serializeTask(task));
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    if (!requireDatabase(res) || !validateId(req.params.id, res)) return;
    const task = await Task.findOneAndDelete(ownedTaskQuery(req));
    if (!task) return res.status(404).json({ message: 'Không tìm thấy công việc để xóa.' });
    res.json({ success: true, id: req.params.id });
  } catch (error) {
    next(error);
  }
};
