# Barber Booking System

A modern full-stack barber appointment booking application with a clean UI and seamless user experience.

## Tech Stack

**Frontend**: Next.js 15, React 19, TypeScript, Chakra UI v2  
**Backend**: Node.js, Express, TypeScript  
**Deployment**: Docker, Docker Compose

## Features

- 📅 Book appointments with available barbers
- 🔍 Search and manage bookings by email
- ⏰ Real-time availability checking
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design
- 🔒 API key authentication
- 🐳 Docker-ready deployment

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for containerized setup)

### Option 1: Docker (Recommended)

```bash
# Clone repository
git clone <repository-url>
cd booking-system

# Start all services
docker-compose up --build
```

Access the application:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

### Option 2: Local Development

**Backend**:

```bash
cd backend
npm install
npm run dev
```

**Frontend**:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

**Backend** (`.env`):

```env
PORT=3001
API_SECRET=very-secret-key-for-internal-auth
BARBER_API_URL=<external-barber-api-url>
BARBER_API_KEY=<external-barber-api-key>
```

**Frontend** (`.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=very-secret-key-for-internal-auth
```

## Project Structure

```
booking-system/
├── backend/              # Express API server
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   ├── middleware/  # Authentication
│   │   └── types/       # TypeScript types
│   └── data/            # JSON data storage
├── frontend/            # Next.js application
│   └── src/
│       ├── app/         # App Router pages
│       ├── components/  # React components
│       ├── contexts/    # React contexts
│       └── services/    # API client
└── docker-compose.yml   # Container orchestration
```

## API Documentation

### Endpoints

- `GET /api/barbers` - List all barbers
- `POST /api/bookings` - Create a booking
- `GET /api/bookings/search?email=<email>` - Search bookings
- `DELETE /api/bookings/:id` - Delete a booking

All endpoints require `X-API-Key` header for authentication.

## Development

```bash
# Backend
cd backend
npm run dev    # Start dev server with hot reload

# Frontend
cd frontend
npm run dev    # Start Next.js dev server
```

## Production Build

```bash
# Backend
cd backend
npm run build  # Compile TypeScript
npm start      # Run production server

# Frontend
cd frontend
npm run build  # Build optimized production bundle
npm start      # Start production server
```

## Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build
```

## License

MIT
│ │ ├── services/ # Business logic
│ │ ├── middleware/ # Auth middleware
│ │ └── types/ # TypeScript types
│ ├── Dockerfile
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── app/ # Next.js app router
│ │ ├── components/ # React components
│ │ ├── contexts/ # React contexts
│ │ ├── services/ # API service
│ │ └── types/ # TypeScript types
│ ├── Dockerfile
│ ├── next.config.js
│ └── package.json
├── docker-compose.yml
└── DEPLOYMENT.md

````

## 🔧 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=production
API_KEY=your-secret-key
````

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_API_KEY=your-secret-key
```

## 🌐 API Endpoints

### Barbers

- `GET /api/barbers` - Get all barbers with schedules

### Bookings

- `GET /api/bookings?email=<email>` - Get bookings by email
- `GET /api/bookings?barberId=<id>&date=<date>` - Get bookings for specific date
- `POST /api/bookings` - Create new booking
- `DELETE /api/bookings/:id` - Delete booking

### Health

- `GET /health` - Health check endpoint

> **Note**: All API endpoints (except /health) require `X-API-Key` header

## 🎨 Tech Stack Details

### Frontend

- Next.js 15 with App Router
- React 19
- TypeScript
- Chakra UI v3
- Framer Motion
- Lucide React Icons

### Backend

- Node.js with Express
- TypeScript
- CORS & Helmet for security
- UUID for unique IDs

## 🔒 Security

- API key authentication for all endpoints
- CORS enabled
- Helmet.js for security headers
- Input validation on all forms

## 🚢 Production Deployment

1. Set strong API keys in environment variables
2. Use HTTPS with SSL certificates
3. Set up proper logging and monitoring
4. Consider using a production database (PostgreSQL, MongoDB, etc.)
5. Implement rate limiting
6. Set up automated backups

## 📝 License

MIT

- React 18
- TypeScript
- Vite
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- CORS middleware
