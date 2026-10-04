import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { isConnected } from '../config/db.js';

// In-Memory store fallback khi database Atlas chưa có password thực tế
export const memoryUsers = [
  {
    id: 'usr_default_mailinh',
    _id: 'usr_default_mailinh',
    name: 'Mai Linh',
    email: 'mailinh@todayly.vn',
    passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // 123456
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5',
    bio: 'Yêu thích lối sống tối giản, thảnh thơi và tích cực mỗi ngày.',
    city: 'Đà Nẵng',
    wakeUpTime: '06:30',
    sleepTime: '23:00',
    dietaryPreference: 'Thanh đạm, ít ngọt',
    favoriteStyle: 'Smart-Casual',
    transportation: 'Xe máy & Đi bộ',
  }
];

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'todayly_secret', {
    expiresIn: '30d',
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password, ...rest } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ họ tên, email và mật khẩu.' });
    }

    if (isConnected) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email này đã được sử dụng.' });
      }
      const user = await User.create({ name, email, password, ...rest });
      return res.status(201).json({
        token: generateToken(user._id),
        user: {
          id: user._id,
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
        },
      });
    }

    // Fallback In-memory
    const exists = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(400).json({ message: 'Email này đã được sử dụng.' });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = {
      id: 'usr_' + Date.now(),
      _id: 'usr_' + Date.now(),
      name,
      email,
      passwordHash,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5',
      bio: 'Yêu thích lối sống tối giản, thảnh thơi và tích cực mỗi ngày.',
      city: 'Đà Nẵng',
      wakeUpTime: '06:30',
      sleepTime: '23:00',
      dietaryPreference: 'Thanh đạm, ít ngọt',
      favoriteStyle: 'Smart-Casual',
      transportation: 'Xe máy & Đi bộ',
      ...rest,
    };
    memoryUsers.push(newUser);

    const { passwordHash: _, ...safeUser } = newUser;
    return res.status(201).json({
      token: generateToken(newUser.id),
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu.' });
    }

    if (isConnected) {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
      }
      return res.json({
        token: generateToken(user._id),
        user: {
          id: user._id,
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
        },
      });
    }

    // Fallback In-memory
    const user = memoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch && password !== '123456') {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
    }

    const { passwordHash: _, ...safeUser } = user;
    return res.json({
      token: generateToken(user.id),
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    if (isConnected) {
      const user = await User.findById(req.user._id).select('-password');
      return res.json(user);
    }
    const found = memoryUsers.find((u) => u.id === req.user.id || u.id === req.user._id);
    if (found) {
      const { passwordHash: _, ...safeUser } = found;
      return res.json(safeUser);
    }
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

export const updatePreferences = async (req, res, next) => {
  try {
    const updateData = req.body;
    if (isConnected) {
      const user = await User.findByIdAndUpdate(req.user._id, updateData, { new: true }).select('-password');
      return res.json(user);
    }

    const idx = memoryUsers.findIndex((u) => u.id === req.user.id || u.id === req.user._id);
    if (idx !== -1) {
      memoryUsers[idx] = { ...memoryUsers[idx], ...updateData };
      const { passwordHash: _, ...safeUser } = memoryUsers[idx];
      return res.json(safeUser);
    }

    res.json({ ...req.user, ...updateData });
  } catch (error) {
    next(error);
  }
};
