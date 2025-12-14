import { Router, Request, Response } from 'express';
import {
  bookingService,
  CreateBookingRequest,
} from '../services/bookingService';

const router = Router();

/**
 * POST /api/bookings
 * Create a new booking
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    console.log('📍 POST /api/bookings called');
    console.log('📝 Request body:', req.body);

    const { barberId, customerEmail, dateTime }: CreateBookingRequest =
      req.body;

    if (!barberId || !customerEmail || !dateTime) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: barberId, customerEmail, dateTime',
      });
    }

    const result = bookingService.createBooking({
      barberId,
      customerEmail,
      dateTime,
    });

    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    console.error('Error in POST /api/bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /api/bookings?email=customer@example.com
 * Get bookings by customer email
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('📍 GET /api/bookings called');
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Email query parameter is required',
      });
    }

    const result = bookingService.getBookingsByEmail(email);

    if (result.success) {
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error: any) {
    console.error('Error in GET /api/bookings:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /api/bookings/:id
 * Get a specific booking by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    console.log('📍 GET /api/bookings/:id called');
    const { id } = req.params;

    const result = bookingService.getBookingById(id);

    if (result.success) {
      if (result.data) {
        res.json(result);
      } else {
        res.status(404).json({
          success: false,
          error: 'Booking not found',
        });
      }
    } else {
      res.status(500).json(result);
    }
  } catch (error: any) {
    console.error('Error in GET /api/bookings/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * PATCH /api/bookings/:id/cancel
 * Cancel a booking
 */
router.patch('/:id/cancel', async (req: Request, res: Response) => {
  try {
    console.log('📍 PATCH /api/bookings/:id/cancel called');
    const { id } = req.params;

    const result = bookingService.cancelBooking(id);

    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error: any) {
    console.error('Error in PATCH /api/bookings/:id/cancel:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * DELETE /api/bookings/:id
 * Delete a booking permanently
 */
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    console.log('📍 DELETE /api/bookings/:id called');
    const { id } = req.params;

    const result = bookingService.deleteBooking(id);

    if (result.success) {
      res.json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error: any) {
    console.error('Error in DELETE /api/bookings/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

export default router;
