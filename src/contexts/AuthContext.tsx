
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  memberSince: string;
  tier: string;
  isLoggedIn: boolean;
  lastActive?: Date;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshSession: () => void;
  checkBiometricAvailability: () => Promise<boolean>;
  useBiometricLogin: () => Promise<boolean>;
}

const TOKEN_KEY = "bellboy_auth_token";
const USER_KEY = "bellboy_user";
const SESSION_TIMEOUT = 1000 * 60 * 60; // 1 hour

const defaultUser = {
  name: "Alexander Johnson",
  email: "alex.johnson@example.com",
  memberSince: "March 2022",
  tier: "Gold Member",
  isLoggedIn: true,
  lastActive: new Date(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const refreshSession = () => {
    if (user) {
      const updatedUser = { ...user, lastActive: new Date() };
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
      
      // Simulate token refresh
      const fakeToken = `bellboy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(TOKEN_KEY, fakeToken);
    }
  };

  // Check for session timeout
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        const lastActive = userData.lastActive ? new Date(userData.lastActive) : null;
        
        if (lastActive && (new Date().getTime() - lastActive.getTime() > SESSION_TIMEOUT)) {
          logout();
          toast({
            title: "Session Expired",
            description: "You have been logged out due to inactivity.",
          });
        }
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  // On mount, check if user is already logged in
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        const storedUser = localStorage.getItem(USER_KEY);
        const storedToken = localStorage.getItem(TOKEN_KEY);
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          // Refresh the last active timestamp
          userData.lastActive = new Date();
          setUser(userData);
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
        } else {
          // For demo purposes, auto-login with default user
          const fakeToken = `bellboy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          localStorage.setItem(TOKEN_KEY, fakeToken);
          localStorage.setItem(USER_KEY, JSON.stringify({...defaultUser, lastActive: new Date()}));
          setUser({...defaultUser, lastActive: new Date()});
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would make an API call to verify credentials
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const loggedInUser = {
        ...defaultUser,
        email: email || defaultUser.email,
        isLoggedIn: true,
        lastActive: new Date(),
      };
      
      // Create a fake auth token
      const fakeToken = `bellboy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      setUser(loggedInUser);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));
      localStorage.setItem(TOKEN_KEY, fakeToken);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
      
      navigate("/profile");
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials or network error.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("userPreferences");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  // Check if biometric authentication is available
  const checkBiometricAvailability = async (): Promise<boolean> => {
    // This is a mock implementation
    // In a real app, you would use something like WebAuthn or platform-specific APIs
    try {
      // Simulate checking for biometric capability
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return true on mobile devices as they're more likely to support biometrics
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      return isMobile;
    } catch (error) {
      console.error("Biometric check failed:", error);
      return false;
    }
  };

  // Use biometric login
  const useBiometricLogin = async (): Promise<boolean> => {
    // This is a mock implementation
    try {
      setIsLoading(true);
      // Simulate biometric verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Auto-login with default user after "successful" biometric auth
      const loggedInUser = {
        ...defaultUser,
        isLoggedIn: true,
        lastActive: new Date(),
      };
      
      // Create a fake auth token
      const fakeToken = `bellboy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      setUser(loggedInUser);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));
      localStorage.setItem(TOKEN_KEY, fakeToken);
      
      toast({
        title: "Biometric Login Successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
      
      navigate("/profile");
      return true;
    } catch (error) {
      console.error("Biometric login failed:", error);
      toast({
        title: "Biometric Login Failed",
        description: "Could not authenticate using biometrics.",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user,
        isLoading,
        refreshSession,
        checkBiometricAvailability,
        useBiometricLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
