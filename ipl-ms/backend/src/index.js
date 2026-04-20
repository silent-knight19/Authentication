
import '../config/env.js';

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from '../config/passport.js';
import connectDB from '../config/db.js';
import routes from '../routes/index.js';
import errorHandler from '../middleware/error-handler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Sanitize origin — trim whitespace/invisible chars and remove trailing slash
const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').trim().replace(/\/+$/, '');

// Middleware
app.use(cors({
  origin: clientUrl,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ message: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
