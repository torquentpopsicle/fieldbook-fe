import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("fieldbook_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (
    email: string,
    password: string,
    role: "admin" | "customer",
  ): Promise<boolean> => {
    setLoading(true);

    // Mock authentication - in real app, this would be an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock users for demo
    const mockUsers = {
      admin: {
        email: "admin@fieldbook.com",
        password: "admin123",
        user: {
          id: "admin-1",
          email: "admin@fieldbook.com",
          name: "Admin User",
          role: "admin" as const,
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        },
      },
      customer: {
        email: "customer@example.com",
        password: "customer123",
        user: {
          id: "customer-1",
          email: "customer@example.com",
          name: "John Doe",
          role: "customer" as const,
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        },
      },
    };

    const mockUser = mockUsers[role];
    if (
      mockUser &&
      email === mockUser.email &&
      password === mockUser.password
    ) {
      setUser(mockUser.user);
      localStorage.setItem("fieldbook_user", JSON.stringify(mockUser.user));
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fieldbook_user");
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
