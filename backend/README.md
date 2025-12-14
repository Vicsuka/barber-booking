# Barber Booking System - Backend

Express.js REST API for managing barber bookings with TypeScript and in-memory storage optimized for serverless deployment.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **TypeScript** - Type-safe development
- **Axios** - HTTP client for external barber API
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Server runs on http://localhost:3001 with hot reload via nodemon.

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create `.env` in backend root:

```env
PORT=3001
API_SECRET=very-secret-key-for-internal-auth
BARBER_API_URL=https://barber-hono-on-vercel.vercel.app/api/v1/barbers
BARBER_API_KEY=08980fd4d393b390ec1d60a33945ff301e28c9092e660f593d6d182bc8364d2f
NODE_ENV=development
```

## Project Structure

```
backend/
├── src/
│   ├── index.ts              # Express app, CORS config, routes
│   ├── middleware/
│   │   └── auth.ts          # API key authentication
│   ├── routes/
│   │   ├── barbers.ts       # Barber endpoints
│   │   └── bookings.ts      # Booking endpoints
│   ├── services/
│   │   ├── barberApi.ts     # External barber API client
│   │   ├── bookingService.ts # Booking business logic
│   │   └── dataService.ts   # In-memory storage (Map)
│   └── types/
│       └── index.ts         # TypeScript definitions
├── vercel.json              # Vercel serverless config
├── tsconfig.json
└── package.json
```

## API Endpoints

All endpoints require `X-API-Key` header with value matching `API_SECRET`.

### GET /api/barbers

Fetch all available barbers from external API.

**Response**:

```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "rating": 4.8,
      "hourlyRate": 30
    }
  ]
}
```

### POST /api/bookings

Create a new booking.

**Request**:

```json
{
  "barberId": "1",
  "customerEmail": "customer@example.com",
  "dateTime": "2025-12-15T10:00:00Z"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "barberId": "1",
    "customerEmail": "customer@example.com",
    "dateTime": "2025-12-15T10:00:00Z",
    "createdAt": "2025-12-14T12:00:00Z"
  }
}
```

### GET /api/bookings/search?email=customer@example.com

Search bookings by customer email.

### DELETE /api/bookings/:id

Delete a booking by ID.

### GET /health

Health check endpoint (no authentication required).

## Authentication

All API requests must include the `X-API-Key` header:

```bash
curl -H "X-API-Key: very-secret-key-for-internal-auth" \
  http://localhost:3001/api/barbers
```

The auth middleware automatically skips OPTIONS preflight requests for CORS.

## Data Storage

Bookings are stored **in-memory** using a JavaScript `Map` for Vercel serverless compatibility.

⚠️ **Important**: Data persists only during the serverless function lifetime and will reset on:

- Cold starts (function hasn't been called recently)
- New deployments
- Container restarts

**For production**, integrate a persistent database:

- **Vercel KV/Postgres** - Native Vercel integration
- **Supabase** - PostgreSQL with real-time features
- **MongoDB Atlas** - Document database
- **PlanetScale** - MySQL-compatible serverless

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Deploy:

```bash
vercel --prod
```

3. Set environment variables in Vercel Dashboard:
   - `API_SECRET`
   - `BARBER_API_URL`
   - `BARBER_API_KEY`

The `vercel.json` configures the Express app as a serverless function.

### Docker

```bash
docker build -t barber-booking-backend .
docker run -p 3001:3001 --env-file .env barber-booking-backend
```

## Scripts

- `npm run dev` - Development with nodemon & ts-node
- `npm run build` - Compile TypeScript to `dist/`
- `npm start` - Run compiled production server

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

**Status codes**:

- `200` - Success
- `400` - Bad request / validation error
- `401` - Unauthorized (missing/invalid API key)
- `404` - Resource not found
- `500` - Internal server error

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message description"
}
```

Common status codes:

- `200` - Success
- `400` - Bad request / validation error
- `401` - Unauthorized (missing/invalid API key)
- `404` - Resource not found
- `500` - Internal server error
