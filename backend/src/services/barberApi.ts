import axios from 'axios';
import dotenv from 'dotenv';
import { Barber, ApiResponse } from '../types';

dotenv.config();

class BarberApiService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiUrl = process.env.BARBER_API_URL!;
    this.apiKey = process.env.BARBER_API_KEY!;

    if (!this.apiUrl || !this.apiKey) {
      console.error('❌ Missing environment variables:');
      console.error('BARBER_API_URL:', this.apiUrl);
      console.error('BARBER_API_KEY:', this.apiKey ? 'Set' : 'Missing');
    }
  }

  /**
   * Generate mock barber data for development
   */
  private getMockBarbers(): Barber[] {
    return [
      {
        id: '1',
        name: 'John Smith',
        workSchedule: {
          monday: { start: '09:00', end: '18:00' },
          tuesday: { start: '09:00', end: '18:00' },
          wednesday: { start: '09:00', end: '18:00' },
          thursday: { start: '09:00', end: '18:00' },
          friday: { start: '09:00', end: '18:00' },
          saturday: { start: '10:00', end: '16:00' },
          sunday: { start: '', end: '' }, // Closed
        },
      },
      {
        id: '2',
        name: 'Mike Johnson',
        workSchedule: {
          monday: { start: '10:00', end: '19:00' },
          tuesday: { start: '10:00', end: '19:00' },
          wednesday: { start: '', end: '' }, // Closed
          thursday: { start: '10:00', end: '19:00' },
          friday: { start: '10:00', end: '19:00' },
          saturday: { start: '09:00', end: '17:00' },
          sunday: { start: '11:00', end: '15:00' },
        },
      },
      {
        id: '3',
        name: 'David Wilson',
        workSchedule: {
          monday: { start: '08:00', end: '17:00' },
          tuesday: { start: '08:00', end: '17:00' },
          wednesday: { start: '08:00', end: '17:00' },
          thursday: { start: '08:00', end: '17:00' },
          friday: { start: '08:00', end: '17:00' },
          saturday: { start: '', end: '' }, // Closed
          sunday: { start: '', end: '' }, // Closed
        },
      },
    ];
  }
  /**
   * Fetch all barbers from external API
   */
  async getAllBarbers(): Promise<ApiResponse<Barber[]>> {
    try {
      console.log('🔄 Fetching barbers from external API...');
      const response = await axios.get(this.apiUrl, {
        headers: {
          'X-API-Key': this.apiKey,
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });

      const barbers: Barber[] = (response.data as any[]).map((barber: any) => ({
        id: barber.id,
        name: barber.name,
        workSchedule: barber.workSchedule,
      }));

      console.log(`✅ Successfully fetched ${barbers.length} barbers`);

      return {
        success: true,
        data: barbers,
        message: 'Barbers fetched successfully',
      };
    } catch (error: any) {
      console.error('❌ Failed to fetch barbers:', error.message);

      // In development or when external API fails, return mock data
      if (
        process.env.NODE_ENV === 'development' ||
        error.response?.status === 401
      ) {
        console.log('🔧 Using mock barber data for development');
        const mockBarbers = this.getMockBarbers();

        return {
          success: true,
          data: mockBarbers,
          message: `Mock barber data (${mockBarbers.length} barbers) - External API unavailable`,
        };
      }

      return {
        success: false,
        error: 'Failed to fetch barbers from external API',
        message: error.message,
      };
    }
  }

  /**
   * Get a specific barber by ID
   */
  async getBarberById(id: string): Promise<ApiResponse<Barber | null>> {
    try {
      const barbersResponse = await this.getAllBarbers();

      if (!barbersResponse.success || !barbersResponse.data) {
        return {
          success: false,
          error: 'Failed to fetch barbers',
        };
      }

      const barber = barbersResponse.data.find((b) => b.id === id);

      return {
        success: true,
        data: barber || null,
        message: barber ? 'Barber found' : 'Barber not found',
      };
    } catch (error: any) {
      return {
        success: false,
        error: 'Failed to fetch barber',
        message: error.message,
      };
    }
  }
}

export const barberApiService = new BarberApiService();
