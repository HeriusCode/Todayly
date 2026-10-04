import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isConnected } from '../config/db.js';
import { memoryUsers } from '../controllers/authController.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'todayly_secret');

      if (isConnected) {
        req.user = await User.findById(decoded.id).select('-password');
      } else {
        const found = memoryUsers.find((u) => u.id === decoded.id || u._id === decoded.id);
        if (found) {
          const { password, ...userWithoutPass } = found;
          req.user = userWithoutPass;
        }
      }

      if (!req.user) {
        return res.status(401).json({ message: 'Người dùng không còn tồn tại trên hệ thống.' });
      }
      return next();
    } catch {
      return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn.' });
    }
  }

  return res.status(401).json({ message: 'Chưa đăng nhập, vui lòng cung cấp token ủy quyền.' });
};
