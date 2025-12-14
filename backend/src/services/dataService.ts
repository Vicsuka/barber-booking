import { Booking } from '../types';

// In-memory storage for Vercel deployment
const bookingsStore = new Map<string, Booking>();

class DataService {
  /**
   * Read all bookings from memory
   */
  readBookings(): Booking[] {
    return Array.from(bookingsStore.values());
  }

  /**
   * Add a new booking
   */
  createBooking(booking: Booking): Booking {
    bookingsStore.set(booking.id, booking);
    console.log(`✅ Created booking: ${booking.id}`);
    return booking;
  }

  /**
   * Get booking by ID
   */
  getBookingById(id: string): Booking | null {
    return bookingsStore.get(id) || null;
  }

  /**
   * Get bookings by customer email
   */
  getBookingsByEmail(email: string): Booking[] {
    return this.readBookings().filter((b) => b.customerEmail === email);
  }

  /**
   * Get bookings by barber ID
   */
  getBookingsByBarberId(barberId: string): Booking[] {
    return this.readBookings().filter((b) => b.barberId === barberId);
  }

  /**
   * Delete booking by ID
   */
  deleteBooking(id: string): boolean {
    const deleted = bookingsStore.delete(id);
    if (deleted) {
      console.log(`🗑️ Deleted booking: ${id}`);
    }
    return deleted;
  }
}

export const dataService = new DataService();
