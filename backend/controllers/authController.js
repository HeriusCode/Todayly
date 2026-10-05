import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { isConnected } from '../config/db.js';

const requireDatabase = (res) => {
  if (isConnected) return true;
  res.status(503).json({
    message: 'MongoDB chưa kết nối. Tài khoản không được lưu tạm để tránh tạo dữ liệu giả.',
  });
  return false;
};

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const serializeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  city: user.city,
  bio: user.bio,
  dietaryPreference: user.dietaryPreference,
  favoriteStyle: user.favoriteStyle,
  wakeUpTime: user.wakeUpTime,
  sleepTime: user.sleepTime,
  transportation: user.transportation,
});

export const register = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    const { name, email, password, ...rest } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!name?.trim() || !normalizedEmail || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
    }
    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ message: 'Email này đã được sử dụng.' });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
      ...rest,
    });
    return res.status(201).json({ token: generateToken(user._id), user: serializeUser(user) });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
    }
    return res.json({ token: generateToken(user._id), user: serializeUser(user) });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res) => {
  res.json(serializeUser(req.user));
};

export const updatePreferences = async (req, res, next) => {
  try {
    if (!requireDatabase(res)) return;
    const allowedFields = [
      'name', 'avatar', 'bio', 'city', 'wakeUpTime', 'sleepTime',
      'dietaryPreference', 'favoriteStyle', 'transportation',
    ];
    const updateData = Object.fromEntries(
      allowedFields
        .filter((field) => Object.hasOwn(req.body, field))
        .map((field) => [field, req.body[field]]),
    );
    const user = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ message: 'Không tìm thấy tài khoản.' });
    return res.json(serializeUser(user));
  } catch (error) {
    next(error);
  }
};
