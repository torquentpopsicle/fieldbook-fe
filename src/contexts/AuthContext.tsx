import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { API_ENDPOINTS } from "@/config/env";
import { apiRequest } from "@/lib/api";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "customer";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string,
    role: "admin" | "customer",
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Helper function to get access token
  const getAccessToken = (): string | null => {
    return localStorage.getItem('fieldbook_token');
  };

  // Helper function to get refresh token
  const getRefreshToken = (): string | null => {
    return localStorage.getItem('fieldbook_refresh_token');
  };

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = localStorage.getItem("fieldbook_user");
        const token = localStorage.getItem('fieldbook_token');
        const refreshToken = localStorage.getItem('fieldbook_refresh_token');

        if (savedUser && token) {
          // Check if token is expired
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiresAt = payload.exp * 1000;
            const now = Date.now();
            
            if (expiresAt > now) {
              // Token is still valid
              const userData = JSON.parse(savedUser);
              setUser(userData);
              setIsAuthenticated(true);
            } else if (refreshToken) {
              // Token is expired, try to refresh
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
                  
                  // Validate the user data is still valid
                  const userData = JSON.parse(savedUser);
                  setUser(userData);
                  setIsAuthenticated(true);
                } else {
                  // Refresh failed, clear everything
                  localStorage.removeItem("fieldbook_user");
                  localStorage.removeItem("fieldbook_token");
                  localStorage.removeItem("fieldbook_refresh_token");
                  setUser(null);
                  setIsAuthenticated(false);
                }
              } catch (error) {
                console.error('Token refresh failed:', error);
                // Clear everything on refresh error
                localStorage.removeItem("fieldbook_user");
                localStorage.removeItem("fieldbook_token");
                localStorage.removeItem("fieldbook_refresh_token");
                setUser(null);
                setIsAuthenticated(false);
              }
            } else {
              // No refresh token, clear everything
              localStorage.removeItem("fieldbook_user");
              localStorage.removeItem("fieldbook_token");
              localStorage.removeItem("fieldbook_refresh_token");
              setUser(null);
              setIsAuthenticated(false);
            }
          } catch (error) {
            console.error('Token validation error:', error);
            // Clear everything on token decode error
            localStorage.removeItem("fieldbook_user");
            localStorage.removeItem("fieldbook_token");
            localStorage.removeItem("fieldbook_refresh_token");
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          // No saved data, ensure clean state
          localStorage.removeItem("fieldbook_user");
          localStorage.removeItem("fieldbook_token");
          localStorage.removeItem("fieldbook_refresh_token");
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear everything on error
        localStorage.removeItem("fieldbook_user");
        localStorage.removeItem("fieldbook_token");
        localStorage.removeItem("fieldbook_refresh_token");
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (
    email: string,
    password: string,
    role: "admin" | "customer",
  ): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Login failed:', errorData);
        setLoading(false);
        return false;
      }

      const responseData = await response.json();
      
      // Handle the nested data structure from the backend
      const data = responseData.data || responseData;
      
      // Store the access token
      if (data.access_token) {
        localStorage.setItem('fieldbook_token', data.access_token);
      } else {
        console.error('No access token received from server');
        setLoading(false);
        return false;
      }

      // Store the refresh token if provided
      if (data.refresh_token) {
        localStorage.setItem('fieldbook_refresh_token', data.refresh_token);
      }

      // Create user object from API response
      const user: User = {
        id: data.user?.id || `user-${Date.now()}`,
        email: data.user?.email || email,
        name: data.user?.name || email.split('@')[0],
        role: data.user?.role || role,
        avatar: data.user?.avatar,
      };

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("fieldbook_user", JSON.stringify(user));
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to invalidate token on server
      const token = getAccessToken();
      if (token) {
        await apiRequest(API_ENDPOINTS.LOGOUT, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).catch(() => {
          // Ignore errors on logout - we still want to clear local state
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("fieldbook_user");
      localStorage.removeItem("fieldbook_token");
      localStorage.removeItem("fieldbook_refresh_token");
    }
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated,
    getAccessToken,
    getRefreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { useAuth, AuthProvider };
