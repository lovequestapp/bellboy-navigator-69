
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";

interface Preferences {
  notifications: boolean;
  darkMode: boolean;
  accentColor: string;
  language: string;
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (newPrefs: Partial<Preferences>) => void;
}

const defaultPreferences: Preferences = {
  notifications: true,
  darkMode: localStorage.getItem("theme") === "dark",
  accentColor: localStorage.getItem("accentColor") || "#0F1E54", // Navy blue default
  language: "english",
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  // Load preferences from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const storedPrefs = localStorage.getItem("userPreferences");
      if (storedPrefs) {
        setPreferences(JSON.parse(storedPrefs));
      } else {
        // Set defaults if no stored preferences
        setPreferences(defaultPreferences);
        localStorage.setItem("userPreferences", JSON.stringify(defaultPreferences));
      }
    }
  }, [user]);

  // Apply theme and accent color whenever they change
  useEffect(() => {
    // Apply dark mode
    if (preferences.darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    
    // Apply accent color
    document.documentElement.style.setProperty("--bellboy-color", preferences.accentColor);
    localStorage.setItem("accentColor", preferences.accentColor);
  }, [preferences.darkMode, preferences.accentColor]);

  const updatePreferences = (newPrefs: Partial<Preferences>) => {
    const updatedPrefs = { ...preferences, ...newPrefs };
    setPreferences(updatedPrefs);
    localStorage.setItem("userPreferences", JSON.stringify(updatedPrefs));
    
    // Show toast for certain preference changes
    if ('darkMode' in newPrefs) {
      toast({
        title: `${newPrefs.darkMode ? 'Dark' : 'Light'} Mode Enabled`,
        description: `App appearance has been updated`,
      });
    }
    
    if ('notifications' in newPrefs) {
      toast({
        title: newPrefs.notifications ? "Notifications Enabled" : "Notifications Disabled",
        description: newPrefs.notifications 
          ? "You will now receive notifications from the app" 
          : "You will no longer receive notifications from the app",
      });
    }
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};
