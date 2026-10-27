import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import drinkRoutes from './routes/drinkRoutes.js';
import placeRoutes from './routes/placeRoutes.js';
import outfitRoutes from './routes/outfitRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET chưa được cấu hình trong backend/.env');
}

const app = express();

connectDB();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Todayly API Server is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/drinks', drinkRoutes);
app.use('/api/places', placeRoutes);
app.use('/api/outfits', outfitRoutes);

app.get('/api/debug-routes', (req, res) => {
  res.json({
    message: 'Debug endpoint is working',
    foods: foodRoutes.stack
      .filter(r => r.route)
      .map(r => r.route.path),
    drinks: drinkRoutes.stack
      .filter(r => r.route)
      .map(r => r.route.path),
    places: placeRoutes.stack
      .filter(r => r.route)
      .map(r => r.route.path),
    outfits: outfitRoutes.stack
      .filter(r => r.route)
      .map(r => r.route.path),
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 [Todayly Backend] Server running on port ${PORT}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🔑 API Auth: http://localhost:${PORT}/api/auth/login`);
});
