import { API_ENDPOINTS } from "@/config/env";

// Get access token from localStorage
const getAccessToken = (): string | null => {
  return localStorage.getItem('fieldbook_token');
};

// Get refresh token from localStorage
const getRefreshToken = (): string | null => {
  return localStorage.getItem('fieldbook_refresh_token');
};

// Check if token is expired (basic check - you might want to decode JWT for more accurate check)
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return false; // If we can't decode, assume it's valid
  }
};

// Refresh token function
const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(API_ENDPOINTS.REFRESH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      const data = responseData.data || responseData;
      
      // Store new tokens
      if (data.access_token) {
        localStorage.setItem('fieldbook_token', data.access_token);
      }
      
      if (data.refresh_token) {
        localStorage.setItem('fieldbook_refresh_token', data.refresh_token);
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

// Base API request function with authentication and automatic token refresh
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  let token = getAccessToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add authorization header if token exists and is not expired
  if (token && !isTokenExpired(token)) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let response = await fetch(endpoint, {
    ...options,
    headers,
  });

  // Handle 401 Unauthorized - try to refresh token
  if (response.status === 401) {
    const refreshSuccess = await refreshAccessToken();
    
    if (refreshSuccess) {
      // Retry the original request with new token
      token = getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        response = await fetch(endpoint, {
          ...options,
          headers,
        });
      }
    } else {
      // Refresh failed, clear tokens and redirect to login
      localStorage.removeItem('fieldbook_token');
      localStorage.removeItem('fieldbook_refresh_token');
      localStorage.removeItem('fieldbook_user');
      
      // Redirect to login if we're not already there
      if (window.location.pathname !== '/signin') {
        window.location.href = '/signin';
      }
    }
  }

  return response;
};

// Authenticated GET request
export const apiGet = async (endpoint: string): Promise<Response> => {
  return apiRequest(endpoint, { method: 'GET' });
};

// Authenticated POST request
export const apiPost = async (
  endpoint: string, 
  data: any
): Promise<Response> => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// Authenticated PUT request
export const apiPut = async (
  endpoint: string, 
  data: any
): Promise<Response> => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

// Authenticated DELETE request
export const apiDelete = async (endpoint: string): Promise<Response> => {
  return apiRequest(endpoint, { method: 'DELETE' });
};

// Export API endpoints for convenience
export { API_ENDPOINTS }; 