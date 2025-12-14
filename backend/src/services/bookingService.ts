import { v4 as uuidv4 } from 'uuid';
import { Booking, ApiResponse } from '../types';
import { dataService } from './dataService';

export interface CreateBookingRequest {
  barberId: string;
  customerEmail: string;
  dateTime: string;
}

class BookingService {
  /**
   * Create a new booking
   */
  createBooking(request: CreateBookingRequest): ApiResponse<Booking> {
    try {
      // Validate email format
      if (!this.isValidEmail(request.customerEmail)) {
        return {
          success: false,
          error: 'Invalid email format',
        };
      }

      // Validate date is not in the past
      const bookingDate = new Date(request.dateTime);
      const now = new Date();
      if (bookingDate <= now) {
        return {
          success: false,
          error: 'Cannot book appointments in the past',
        };
      }

      // Check for overlapping bookings for the same barber
      const existingBookings = dataService.getBookingsByBarberId(
        request.barberId,
      );
      const hasConflict = existingBookings.some((booking) => {
        return booking.dateTime === request.dateTime;
      });

      if (hasConflict) {
        return {
          success: false,
          error: 'This time slot is already booked',
        };
      }

      // Create the booking
      const booking: Booking = {
        id: uuidv4(),
        barberId: request.barberId,
        customerEmail: request.customerEmail.toLowerCase(),
        dateTime: request.dateTime,
        createdAt: new Date().toISOString(),
      };

      const savedBooking = dataService.createBooking(booking);

      return {
        success: true,
        data: savedBooking,
        message: 'Booking created successfully',
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Failed to create booking',
        message: error.message,
      };
    }
  }

  /**
   * Get bookings by customer email
   */
  getBookingsByEmail(email: string): ApiResponse<Booking[]> {
    try {
      if (!this.isValidEmail(email)) {
        return {
          success: false,
          error: 'Invalid email format',
        };
      }

      const bookings = dataService.getBookingsByEmail(email.toLowerCase());

      return {
        success: true,
        data: bookings,
        message: `Found ${bookings.length} bookings`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Failed to fetch bookings',
        message: error.message,
      };
    }
  }

  /**
   * Get booking by ID
   */
  getBookingById(id: string): ApiResponse<Booking | null> {
    try {
      const booking = dataService.getBookingById(id);

      return {
        success: true,
        data: booking,
        message: booking ? 'Booking found' : 'Booking not found',
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Failed to fetch booking',
        message: error.message,
      };
    }
  }

  /**
   * Delete a booking permanently
   */
  deleteBooking(id: string): ApiResponse<null> {
    try {
      const deleted = dataService.deleteBooking(id);

      if (deleted) {
        return {
          success: true,
          data: null,
          message: 'Booking deleted successfully',
        };
      } else {
        return {
          success: false,
          error: 'Booking not found',
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: 'Failed to delete booking',
        message: error.message,
      };
    }
  }

  /**
   * Get bookings for a specific barber on a specific date
   */
  getBookingsByBarberAndDate(
    barberId: string,
    date: string,
  ): ApiResponse<Booking[]> {
    try {
      const barberBookings = dataService.getBookingsByBarberId(barberId);
      const dateObj = new Date(date);
      const targetDate = dateObj.toISOString().split('T')[0];

      const filteredBookings = barberBookings.filter((booking) => {
        const bookingDate = new Date(booking.dateTime)
          .toISOString()
          .split('T')[0];
        return bookingDate === targetDate;
      });

      return {
        success: true,
        data: filteredBookings,
        message: `Found ${filteredBookings.length} bookings for barber ${barberId} on ${targetDate}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Failed to fetch bookings for barber and date',
        message: error.message,
      };
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const bookingService = new BookingService();
