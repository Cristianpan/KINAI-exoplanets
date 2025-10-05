/**
 * API Service for KINAI Exoplanets Backend
 * Handles communication with the Flask backend
 */

import { API_CONFIG } from '@/config/api';

export interface PredictionRequest {
  mappings: Array<{
    schemaId: string;
    csvColumn: string;
  }>;
  csvData: {
    headers: string[];
    rows: (string | number)[][];
    totalRows: number;
  };
}

export interface PredictionResponse {
  predictions: (number | null)[];
  total_predictions: number;
  successful_predictions: number;
  results: {
    search_id: string;
    prediction: number;
  }[];
  errors?: string[];
}

export interface ApiError {
  error: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_CONFIG.BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Make a prediction using the fast model
   */
  async fastPredict(data: PredictionRequest): Promise<PredictionResponse> {
    return this.makeRequest(API_CONFIG.ENDPOINTS.FAST_PREDICT, data);
  }

  /**
   * Make a prediction using the deep learning model
   */
  async deepPredict(data: PredictionRequest): Promise<PredictionResponse> {
    return this.makeRequest(API_CONFIG.ENDPOINTS.DEEP_PREDICT, data);
  }

  /**
   * Generic method to make API requests
   */
  private async makeRequest(
    endpoint: string,
    data: PredictionRequest
  ): Promise<PredictionResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        console.log(errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result: PredictionResponse = await response.json();
      return result;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Check if the API is available
   */
  async healthCheck(): Promise<boolean> {
    try {
      // Try to make a simple request to check if the server is running
      const response = await fetch(`${this.baseUrl}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.status < 500; // Any response other than server error means it's running
    } catch {
      return false;
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();

// Export the class for testing or custom instances
export default ApiService;
