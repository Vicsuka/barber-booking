# Barber Booking System - Frontend

Next.js 15 frontend application with modern UI and seamless booking experience.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Chakra UI v2** - Component library
- **Lucide React** - Icon system

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

Create `.env.local` in frontend root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_KEY=very-secret-key-for-internal-auth
```

⚠️ **Important**: `NEXT_PUBLIC_API_KEY` must match the backend's `API_SECRET`.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Chakra & theme providers
│   │   ├── page.tsx            # Home page with booking wizard
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── BookingWizard.tsx   # Multi-step booking form
│   │   ├── BookingManagement.tsx # Search & manage bookings
│   │   ├── BarberSelection.tsx # Barber grid with cards
│   │   ├── BarberCard.tsx      # Individual barber display
│   │   ├── DatePicker.tsx      # Date selection
│   │   ├── TimeSlotPicker.tsx  # Time slot selection
│   │   ├── BookingSummary.tsx  # Booking confirmation
│   │   ├── BookingResult.tsx   # Success/error display
│   │   ├── BookingSearchForm.tsx
│   │   ├── BookingListItem.tsx
│   │   ├── DeleteBookingModal.tsx
│   │   └── DarkModeToggle.tsx  # Theme switcher
│   ├── contexts/
│   │   └── DarkModeContext.tsx # Dark mode state management
│   ├── services/
│   │   └── api.ts              # Backend API client
│   └── types/
│       └── index.ts            # TypeScript definitions
├── next.config.js              # Next.js configuration
├── tsconfig.json
└── package.json
```

## Features

- 🎨 **Dark/Light Mode** - Persistent theme with context API
- 📱 **Responsive Design** - Mobile-first approach
- ♿ **Accessible** - ARIA labels and keyboard navigation
- 🚀 **Optimized** - Next.js 15 App Router with RSC
- 🔄 **Real-time** - Live availability updates
- ✨ **Smooth UX** - Loading states and error handling
- 🎯 **Type-safe** - Full TypeScript coverage

## API Integration

The frontend uses the `apiService` class to communicate with the backend:

```typescript
import { apiService } from '@/services/api';

// Fetch barbers
const response = await apiService.getBarbers();

// Create booking
const booking = await apiService.createBooking({
  barberId: '1',
  customerEmail: 'user@example.com',
  dateTime: '2025-12-15T10:00:00Z',
});

// Search bookings
const bookings = await apiService.searchBookings('user@example.com');

// Delete booking
await apiService.deleteBooking('booking-id');
```

All requests automatically include the `X-API-Key` header from `NEXT_PUBLIC_API_KEY`.

## Components Overview

### BookingWizard

Multi-step form managing the entire booking flow:

1. Barber selection
2. Date & time selection
3. Email input
4. Confirmation & result

### BookingManagement

Search and manage existing bookings by email with delete functionality.

### BarberSelection

Grid display of available barbers with selection state.

### DarkModeContext

Global theme state using React Context API with localStorage persistence.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build optimized production bundle
- `npm start` - Run production server
- `npm run lint` - Run ESLint

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
   - `NEXT_PUBLIC_API_URL` - Your deployed backend URL
   - `NEXT_PUBLIC_API_KEY` - Must match backend's `API_SECRET`

Next.js is automatically detected and configured by Vercel.

### Docker

```bash
docker build -t barber-booking-frontend .
docker run -p 3000:3000 barber-booking-frontend
```

## Development Tips

- Hot reload is enabled for all files
- API calls are made client-side from browser
- Use browser DevTools Network tab to debug API calls
- Check console for any error messages

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
