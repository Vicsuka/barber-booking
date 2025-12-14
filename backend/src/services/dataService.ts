import fs from 'fs';
import path from 'path';
import { Booking } from '../types';

class DataService {
  private readonly dataDir: string;
  private readonly bookingsFile: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.bookingsFile = path.join(this.dataDir, 'bookings.json');
    this.ensureDataDirectory();
  }

  /**
   * Ensure data directory exists
   */
  private ensureDataDirectory(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
      console.log('📁 Created data directory');
    }

    if (!fs.existsSync(this.bookingsFile)) {
      this.writeBookings([]);
      console.log('📄 Created bookings.json file');
    }
  }

  /**
   * Read all bookings from JSON file
   */
  readBookings(): Booking[] {
    try {
      const data = fs.readFileSync(this.bookingsFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('❌ Error reading bookings:', error);
      return [];
    }
  }

  /**
   * Write bookings to JSON file
   */
  writeBookings(bookings: Booking[]): void {
    try {
      fs.writeFileSync(this.bookingsFile, JSON.stringify(bookings, null, 2));
    } catch (error) {
      console.error('❌ Error writing bookings:', error);
      throw new Error('Failed to save bookings');
    }
  }

  /**
   * Add a new booking
   */
  createBooking(booking: Booking): Booking {
    const bookings = this.readBookings();
    bookings.push(booking);
    this.writeBookings(bookings);
    console.log(`✅ Created booking: ${booking.id}`);
    return booking;
  }

  /**
   * Get booking by ID
   */
  getBookingById(id: string): Booking | null {
    const bookings = this.readBookings();
    return bookings.find((b) => b.id === id) || null;
  }

  /**
   * Get bookings by customer email
   */
  getBookingsByEmail(email: string): Booking[] {
    const bookings = this.readBookings();
    return bookings.filter((b) => b.customerEmail === email);
  }

  /**
   * Get bookings by barber ID
   */
  getBookingsByBarberId(barberId: string): Booking[] {
    const bookings = this.readBookings();
    return bookings.filter((b) => b.barberId === barberId);
  }

  /**
   * Delete booking by ID
   */
  deleteBooking(id: string): boolean {
    const bookings = this.readBookings();
    const initialLength = bookings.length;
    const filteredBookings = bookings.filter((b) => b.id !== id);

    if (filteredBookings.length < initialLength) {
      this.writeBookings(filteredBookings);
      console.log(`🗑️ Deleted booking: ${id}`);
      return true;
    }
    return false;
  }

  /**
   * Update booking status
   */
  updateBookingStatus(
    id: string,
    status: 'confirmed' | 'cancelled',
  ): Booking | null {
    const bookings = this.readBookings();
    const booking = bookings.find((b) => b.id === id);

    if (booking) {
      booking.status = status;
      this.writeBookings(bookings);
      console.log(`📝 Updated booking ${id} status to: ${status}`);
      return booking;
    }
    return null;
  }
}

export const dataService = new DataService();
