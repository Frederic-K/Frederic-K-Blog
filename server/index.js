import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import helmet from 'helmet';

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';
import contactRoutes from './routes/contact.route.js';

// Load environment variables
const loadEnv = () => {
  const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
  const result = dotenv.config({ path: envFile });
  if (result.error) {
    console.error(`Error loading ${envFile} file:`, result.error);
  }
};

loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Allow cross-origin requests from different domains
// TODO: Check COOP Issue with Same-Origin-Policy
// Global allow cross-origin requests from different domains
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
//   next();
// });
// Scooping headers
// Define the middleware function
// const setCOOPHeader = (req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
//   next();
// };

// Routes
// app.use('/api/auth', setCOOPHeader, authRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/send', contactRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Serve static files for production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MongoDB is connected 👍');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
};

startServer();