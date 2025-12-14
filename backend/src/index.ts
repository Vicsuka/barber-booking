import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { authenticateApiKey } from './middleware/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Barber Booking System API is running!',
    timestamp: new Date().toISOString(),
  });
});

// Protected routes
app.use('/api/barbers', authenticateApiKey);
app.use('/api/bookings', authenticateApiKey);

app.get('/api/barbers', (req, res) => {
  res.json({ success: true, message: 'Barbers endpoint - coming soon' });
});

app.get('/api/bookings', (req, res) => {
  res.json({ success: true, message: 'Bookings endpoint - coming soon' });
});

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
