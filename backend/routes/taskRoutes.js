import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  toggleTaskComplete,
  incrementPomodoro,
  deleteTask,
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.patch('/:id/toggle', toggleTaskComplete);
router.patch('/:id/pomodoro', incrementPomodoro);

export default router;
