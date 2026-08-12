import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import messageRoutes from './routes/messageRoutes.js';

dotenv.config();

const app = express();

app.use(helmet());

// Allow both 5173 and 5174
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://hibah-mehendi-svqe.vercel.app',
  process.env.CORS_ORIGIN,
].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
}));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use('/api', limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ All routes registered
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => res.send('Hibah Mehendi Store API is running.'));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(res.statusCode === 200 ? 500 : res.statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  });
