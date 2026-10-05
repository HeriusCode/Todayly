import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { isConnected } from '../config/db.js';

export const protect = async (req, res, next) => {
  if (!isConnected) {
    return res.status(503).json({ message: 'MongoDB chưa kết nối. Không thể xác thực tài khoản.' });
  }

  const authorization = req.headers.authorization;
  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });
  }

  try {
    const decoded = jwt.verify(
      authorization.slice(7),
      process.env.JWT_SECRET,
    );
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'Tài khoản không còn tồn tại.' });
    return next();
  } catch {
    return res.status(401).json({ message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' });
  }
};
