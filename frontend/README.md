# Barber Booking System - Frontend

Next.js 15 frontend application for the Barber Booking System with a modern, responsive UI.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type-safe development
- **Chakra UI v2** - Component library
- **Lucide React** - Icon library

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000 to view the application.

### Production Build

```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=very-secret-key-for-internal-auth
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── BookingWizard.tsx   # Multi-step booking form
│   ├── BookingManagement.tsx
│   ├── BarberSelection.tsx
│   ├── DatePicker.tsx
│   ├── TimeSlotPicker.tsx
│   └── ...
├── contexts/
│   └── DarkModeContext.tsx # Theme management
├── services/
│   └── api.ts              # API client
└── types/
    └── index.ts            # TypeScript definitions
```

## Features

- 🎨 Dark/Light mode with persistence
- 📱 Fully responsive design
- ♿ Accessible components
- 🚀 Optimized performance
- 🔄 Real-time availability updates
- ✨ Smooth animations

## API Integration

The frontend communicates with the backend API using the `ApiService` class:

```typescript
// Fetch barbers
const barbers = await api.getBarbers();

// Create booking
const booking = await api.createBooking(bookingData);

// Search bookings
const bookings = await api.searchBookings(email);
```

All requests include API key authentication via `X-API-Key` header.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Docker

The frontend includes a multi-stage Dockerfile for optimized production builds:

```bash
docker build -t barber-booking-frontend .
docker run -p 3000:3000 barber-booking-frontend
```

│ ├── page.tsx # Home page
│ └── globals.css # Global styles
├── components/
│ ├── BarberCard.tsx
│ ├── BarberSelection.tsx
│ ├── BookingWizard.tsx
│ ├── BookingManagement.tsx
│ ├── DatePicker.tsx
│ ├── TimeSlotPicker.tsx
│ └── ...
├── contexts/
│ └── DarkModeContext.tsx
├── services/
│ └── api.ts
└── types/
└── index.ts

```

## Features

- Server-side rendering (SSR)
- Dark mode support
- Responsive design
- Type-safe API calls
- Component-based architecture
```
