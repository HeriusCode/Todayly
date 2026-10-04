import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    avatar: {
      type: String,
      default: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAs8RRecSTQGaXt0G9jAZj3inZF63HILmxziYUMS3mBoj1dFfohnZk_zbO6AcZ0765E62hGaYA2JKinZUy-IFIhSRzcQ3GQcZnmdWkZ0aKsycKl_PtOmxQD1CMrNNWNZDkvniMZ-xB2mr0eLh1jxDelxAzUpv5sqgtdgsuGqhFhnAVp9BVG4dDXACe5geALaOVncnol1KQx3PARbdXSM6_Yu1MijkBjwq4SIw4FVPx-kw4afdNM9pf5',
    },
    bio: { type: String, default: 'Yêu thích lối sống tối giản, thảnh thơi và tích cực mỗi ngày.' },
    city: { type: String, default: 'Đà Nẵng' },
    wakeUpTime: { type: String, default: '06:30' },
    sleepTime: { type: String, default: '23:00' },
    dietaryPreference: { type: String, default: 'Thanh đạm, ít ngọt' },
    favoriteStyle: { type: String, default: 'Smart-Casual' },
    transportation: { type: String, default: 'Xe máy & Đi bộ' },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);
