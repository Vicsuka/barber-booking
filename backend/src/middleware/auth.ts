import { Request, Response, NextFunction } from 'express';

export const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const apiKey = req.headers['x-api-key'] as string;
  const expectedKey = process.env.API_SECRET;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'API key is required',
    });
  }

  if (apiKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      error: 'Invalid API key',
    });
  }

  next();
};
