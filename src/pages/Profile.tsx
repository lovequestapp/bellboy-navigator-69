
import React, { useState, useEffect } from "react";
import { User, Settings, CreditCard, LogOut, Bell, Moon, Shield, ArrowRight, Palette } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import ColorPicker from "@/components/ui/ColorPicker";

const Profile: React.FC = () => {
  // Mock user data
  const [user, setUser] = useState({
    name: "Alexander Johnson",
    email: "alex.johnson@example.com",
    memberSince: "March 2022",
    tier: "Gold Member",
    preferences: {
      notifications: true,
      darkMode: localStorage.getItem("theme") === "dark",
      accentColor: localStorage.getItem("accentColor") || "#0F1E54",
    }
  });

  // State for collapsible sections
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);

  // Set up form
  const form = useForm({
    defaultValues: {
      theme: localStorage.getItem("theme") || "light"
    },
  });

  // Effect to apply the theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedColor = localStorage.getItem("accentColor");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    if (savedColor) {
      document.documentElement.style.setProperty("--bellboy-color", savedColor);
    }
  }, []);

  // Handle theme change
  const handleDarkModeToggle = (checked: boolean) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        darkMode: checked
      }
    }));
    
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Handle notifications toggle
  const handleNotificationsToggle = (checked: boolean) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        notifications: checked
      }
    }));
    
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: checked 
        ? "You will now receive notifications from the app" 
        : "You will no longer receive notifications from the app",
    });
  };

  // Handle accent color change
  const handleAccentColorChange = (color: string) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        accentColor: color
      }
    }));
    
    document.documentElement.style.setProperty("--bellboy-color", color);
    localStorage.setItem("accentColor", color);
    
    toast({
      title: "App appearance updated",
      description: "Your color preference has been saved",
    });
  };

  // Handle button clicks
  const handlePaymentMethodsClick = () => {
    toast({
      title: "Payment Methods",
      description: "This feature is coming soon!",
    });
  };

  const handlePreferencesClick = () => {
    toast({
      title: "Preferences",
      description: "This feature is coming soon!",
    });
  };

  const handleLogoutClick = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handlePrivacySettingsClick = () => {
    toast({
      title: "Privacy Settings",
      description: "This feature is coming soon!",
    });
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center mb-8">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mr-4"
            style={{ backgroundColor: user.preferences.accentColor }}
          >
            <User size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs px-2 py-1 bg-bellboy-accent text-bellboy rounded-full font-medium">
                {user.tier}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                Member since {user.memberSince}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bellboy-card">
          <h3 className="font-serif text-lg font-medium text-foreground mb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Bell size={18} className="mr-3" style={{ color: user.preferences.accentColor }} />
                <span>Notifications</span>
              </div>
              <Switch 
                checked={user.preferences.notifications}
                onCheckedChange={handleNotificationsToggle}
              />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Moon size={18} className="mr-3" style={{ color: user.preferences.accentColor }} />
                <span>Dark Mode</span>
              </div>
              <Switch 
                checked={user.preferences.darkMode}
                onCheckedChange={handleDarkModeToggle}
              />
            </div>
            
            <Collapsible 
              open={isAppearanceOpen} 
              onOpenChange={setIsAppearanceOpen}
              className="py-2 border-b"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <Palette size={18} className="mr-3" style={{ color: user.preferences.accentColor }} />
                  <span>App Appearance</span>
                </div>
                <ArrowRight 
                  size={16} 
                  className={`text-muted-foreground transition-transform ${isAppearanceOpen ? 'rotate-90' : ''}`} 
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Theme</h4>
                    <Form {...form}>
                      <FormField
                        control={form.control}
                        name="theme"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  handleDarkModeToggle(value === "dark");
                                }}
                                defaultValue={user.preferences.darkMode ? "dark" : "light"}
                                className="flex gap-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="light" id="light" />
                                  <FormLabel htmlFor="light">Light</FormLabel>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="dark" id="dark" />
                                  <FormLabel htmlFor="dark">Dark</FormLabel>
                                </div>
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </Form>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Accent Color</h4>
                    <ColorPicker
                      selectedColor={user.preferences.accentColor}
                      onChange={handleAccentColorChange}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Shield size={18} className="mr-3" style={{ color: user.preferences.accentColor }} />
                <span>Privacy Settings</span>
              </div>
              <button 
                className="text-sm" 
                style={{ color: user.preferences.accentColor }}
                onClick={handlePrivacySettingsClick}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button 
            className="bellboy-card w-full flex items-center justify-between p-4"
            onClick={handlePaymentMethodsClick}
          >
            <div className="flex items-center">
              <CreditCard size={20} className="mr-3" style={{ color: user.preferences.accentColor }} />
              <span>Payment Methods</span>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </button>
          
          <button 
            className="bellboy-card w-full flex items-center justify-between p-4"
            onClick={handlePreferencesClick}
          >
            <div className="flex items-center">
              <Settings size={20} className="mr-3" style={{ color: user.preferences.accentColor }} />
              <span>Preferences</span>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </button>
          
          <button 
            className="bellboy-card w-full flex items-center justify-between p-4 text-destructive"
            onClick={handleLogoutClick}
          >
            <div className="flex items-center">
              <LogOut size={20} className="mr-3" />
              <span>Log Out</span>
            </div>
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

export default Profile;
