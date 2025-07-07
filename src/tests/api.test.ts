import { describe, it, expect } from 'vitest';
import { API_ENDPOINTS } from '@/config/env';

describe('Auth API Tests', () => {
  it('should successfully login with customer credentials', async () => {
    const credentials = {
      email: 'customer@example.com',
      password: 'customer123',
      role: 'customer'
    };

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const { data } = await response.json();
      console.log('Response data:', data);

      // Check if the response is successful
      expect(response.ok).toBe(true);
      
      // Check if we have user data
      expect(data).toHaveProperty('user');
      expect(data.user).toHaveProperty('email', credentials.email);
      expect(data.user).toHaveProperty('role', credentials.role);
      expect(data).toHaveProperty('access_token');
      expect(typeof data.access_token).toBe('string');
      
      // Check if we have a token (optional)
      if (data.token) {
        expect(typeof data.token).toBe('string');
      }

    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });

  it('should fail with invalid credentials', async () => {
    const invalidCredentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword',
      role: 'customer'
    };

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidCredentials),
      });

      console.log('Invalid credentials response status:', response.status);
      
      // Should return an error status
      expect(response.ok).toBe(false);
      
      const data = await response.json();
      console.log('Error response data:', data);

    } catch (error) {
      console.error('Test failed with error:', error);
      throw error;
    }
  });
}); 