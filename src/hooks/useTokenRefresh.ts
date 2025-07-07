import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { API_ENDPOINTS } from '@/config/env';

export const useTokenRefresh = () => {
  const { getAccessToken, getRefreshToken, isAuthenticated } = useAuth();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      // Clear any existing interval if not authenticated
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      return;
    }

    // Check token every 5 minutes
    const checkToken = async () => {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      
      if (!accessToken || !refreshToken) {
        // Tokens are missing, redirect to login
        window.location.href = '/signin';
        return;
      }

      // Basic token expiration check (you might want to decode JWT for more accurate check)
      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]));
        const expiresAt = payload.exp * 1000;
        const now = Date.now();
        
        // If token expires in less than 10 minutes, refresh it
        if (expiresAt - now < 10 * 60 * 1000) {
          console.log('Token is about to expire, attempting refresh');
          
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
              
              console.log('Token refreshed successfully');
            } else {
              console.log('Token refresh failed, redirecting to login');
              window.location.href = '/signin';
            }
          } catch (error) {
            console.error('Token refresh error:', error);
            window.location.href = '/signin';
          }
        }
      } catch (error) {
        console.error('Error checking token expiration:', error);
        // If we can't decode the token, redirect to login
        window.location.href = '/signin';
      }
    };

    // Check immediately
    checkToken();

    // Set up interval to check every 5 minutes
    refreshIntervalRef.current = setInterval(checkToken, 5 * 60 * 1000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [isAuthenticated, getAccessToken, getRefreshToken]);

  return null;
}; 