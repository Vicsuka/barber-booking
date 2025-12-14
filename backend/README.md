# Barber Booking System - Backend

Express.js REST API for managing barber bookings with TypeScript and JSON storage.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express 5** - Web framework
- **TypeScript** - Type-safe development
- **Axios** - HTTP client for external API
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

Server runs on http://localhost:3001

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create `.env`:

```env
PORT=3001
API_SECRET=very-secret-key-for-internal-auth
BARBER_API_URL=https://barber-hono-on-vercel.vercel.app/api/v1/barbers
BARBER_API_KEY=08980fd4d393b390ec1d60a33945ff301e28c9092e660f593d6d182bc8364d2f
NODE_ENV=development
```

## Project Structure

```
src/
├── index.ts              # Express app setup
├── middleware/
│   └── auth.ts          # API key authentication
├── routes/
│   ├── barbers.ts       # Barber endpoints
│   └── bookings.ts      # Booking endpoints
├── services/
│   ├── barberApi.ts     # External API client
│   ├── bookingService.ts # Booking business logic
│   └── dataService.ts   # JSON file operations
├── types/
│   └── index.ts         # TypeScript definitions
└── data/
    └── bookings.json    # Booking data storage
```

## API Endpoints

All endpoints require `X-API-Key` header.

### Barbers

```
GET /api/barbers
```

Fetches available barbers from external API.

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

### Bookings

```
POST /api/bookings
```

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

```
GET /api/bookings/search?email=customer@example.com
```

Search bookings by customer email.

```
DELETE /api/bookings/:id
```

Delete a booking by ID.

## Authentication

All API requests must include the API key:

```bash
curl -H "X-API-Key: very-secret-key-for-internal-auth" \
  http://localhost:3001/api/barbers
```

## Data Storage

Bookings are stored in `data/bookings.json` as a simple JSON file. For production, consider using a proper database like PostgreSQL or MongoDB.

## Health Check

```
GET /health
```

Returns server status (no authentication required).

## Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run compiled production server

## Docker

```bash
docker build -t barber-booking-backend .
docker run -p 3001:3001 --env-file .env barber-booking-backend
```

## Error Handling

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
