export interface Barber {
  id: string;
  name: string;
  email: string;
  specialties: string[];
  avatar?: string;
}

export interface Booking {
  id: string;
  barberId: string;
  customerEmail: string;
  dateTime: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface TimeSlot {
  dateTime: string;
  available: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
