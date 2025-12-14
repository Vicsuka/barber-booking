import { Router, Request, Response } from 'express';
import { barberApiService } from '../services/barberApi';

const router = Router();

/**
 * GET /api/barbers/test
 * Test endpoint to verify routing works
 */
router.get('/test', async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Barber routes are working!',
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/barbers
 * Fetch all barbers from external API
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('📍 GET /api/barbers called');
    const result = await barberApiService.getAllBarbers();

    if (result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  } catch (error: any) {
    console.error('Error in GET /api/barbers:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

/**
 * GET /api/barbers/:id
 * Get a specific barber by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await barberApiService.getBarberById(id);

    if (result.success) {
      if (result.data) {
        res.json(result);
      } else {
        res.status(404).json({
          success: false,
          error: 'Barber not found',
        });
      }
    } else {
      res.status(500).json(result);
    }
  } catch (error: any) {
    console.error('Error in GET /api/barbers/:id:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message,
    });
  }
});

export default router;
