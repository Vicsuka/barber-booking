import type { ApiResponse, Barber } from '../types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'secret-key';

class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': API_KEY,
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: 'Network error - please check if the backend server is running',
      };
    }
  }

  async getBarbers(): Promise<ApiResponse<Barber[]>> {
    return this.makeRequest<Barber[]>('/barbers');
  }
}

export const apiService = new ApiService();
