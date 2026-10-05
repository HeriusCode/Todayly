import mongoose from 'mongoose';

export let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGO_URI || '';
  if (!uri || uri.includes('<db_password>')) {
    console.error('[MongoDB] MONGO_URI chưa hợp lệ. API ghi dữ liệu sẽ trả về 503.');
    return;
  }

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 6000 });
    isConnected = true;
    console.log(`✅ [MongoDB Atlas Connected]: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.error(`[MongoDB Atlas Connection Failed]: ${error.message}`);
    console.error('[MongoDB] Không dùng dữ liệu tạm; API ghi dữ liệu sẽ trả về 503.');
  }
};

export default connectDB;
