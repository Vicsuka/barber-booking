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
