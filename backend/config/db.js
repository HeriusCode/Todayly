import mongoose from 'mongoose';

export let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || '';
  if (!uri || uri.includes('<db_password>')) {
    console.log('--------------------------------------------------');
    console.log('ℹ️  [MongoDB Atlas]: URI đang chứa placeholder <db_password>');
    console.log('👉 Vui lòng thay <db_password> bằng mật khẩu thật trong backend/.env');
    console.log('⚡ [Fallback Mode]: Server kích hoạt Store dự phòng để toàn bộ API Auth/Task hoạt động thông suốt.');
    console.log('--------------------------------------------------');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 6000,
    });
    isConnected = true;
    console.log('--------------------------------------------------');
    console.log('✅ [MongoDB Atlas Connected]:', conn.connection.host);
    console.log('--------------------------------------------------');
  } catch (error) {
    console.warn('⚠️ [MongoDB Atlas Connection Failed]:', error.message);
    console.warn('⚡ [Fallback Mode]: Tự động chuyển sang Store dự phòng.');
  }
};

export default connectDB;
