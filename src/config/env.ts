// Environment configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// API endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_URL}/api/v1/auth/login`,
  REGISTER: `${API_URL}/api/v1/auth/register`,
  LOGOUT: `${API_URL}/api/v1/auth/logout`,
  REFRESH: `${API_URL}/api/v1/auth/refresh`,
  FIELDS: `${API_URL}/api/v1/fields`,
} as const; 