
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface User {
  name: string;
  email: string;
  memberSince: string;
  tier: string;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultUser = {
  name: "Alexander Johnson",
  email: "alex.johnson@example.com",
  memberSince: "March 2022",
  tier: "Gold Member",
  isLoggedIn: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // On mount, check if user is already logged in (via localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("bellboy_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // For demo purposes, auto-login with default user
      setUser(defaultUser);
      localStorage.setItem("bellboy_user", JSON.stringify(defaultUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    // In a real app, this would make an API call to verify credentials
    const loggedInUser = {
      ...defaultUser,
      email: email || defaultUser.email,
      isLoggedIn: true,
    };
    
    setUser(loggedInUser);
    localStorage.setItem("bellboy_user", JSON.stringify(loggedInUser));
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${loggedInUser.name}!`,
    });
    
    navigate("/profile");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bellboy_user");
    localStorage.removeItem("userPreferences");
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
