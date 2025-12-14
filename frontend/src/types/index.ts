// Frontend types matching the backend API structure

export interface DaySchedule {
  start: string;
  end: string;
}

export interface WorkSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface Barber {
  id: string;
  name: string;
  workSchedule: WorkSchedule;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface Booking {
  id: string;
  barberId: string;
  customerEmail: string;
  dateTime: string; // ISO string
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface TimeSlot {
  time: string; // HH:MM format
  available: boolean;
  dateTime: string; // Full ISO string
}
