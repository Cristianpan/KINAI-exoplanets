/**
 * API Configuration for KINAI Exoplanets Frontend
 */

export const API_CONFIG = {
  // Base URL for the Flask backend
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  
  // API Endpoints
  ENDPOINTS: {
    FAST_PREDICT: '/fast-predict',
    DEEP_PREDICT: '/deep-predict',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 30000,
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000,
  },
} as const;

export default API_CONFIG;
