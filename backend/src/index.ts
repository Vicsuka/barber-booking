import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { authenticateApiKey } from './middleware/auth';
import barbersRouter from './routes/barbers';
import bookingsRouter from './routes/bookings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS configuration
const corsOptions = {
  origin: true, // Reflect request origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-API-Key', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Disable for API
    contentSecurityPolicy: false,
  }),
);
app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Barber Booking System API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Protected routes
app.use('/api/barbers', authenticateApiKey, barbersRouter);
app.use('/api/bookings', authenticateApiKey, bookingsRouter);

// Error handling
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;
