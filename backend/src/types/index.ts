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

export interface Booking {
  id: string;
  barberId: string;
  customerEmail: string;
  dateTime: string;
  createdAt: string;
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
