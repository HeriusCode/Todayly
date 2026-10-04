import express from 'express';
import { register, login, getMe, updatePreferences } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/preferences', protect, updatePreferences);

export default router;
