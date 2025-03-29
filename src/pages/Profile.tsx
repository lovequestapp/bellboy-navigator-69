
import React, { useState } from "react";
import { User, Settings, CreditCard, LogOut, Bell, Moon, Shield, ArrowRight, Palette } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Switch } from "@/components/ui/switch";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { usePreferences } from "@/contexts/PreferencesContext";
import PaymentMethodsModal from "@/components/modals/PaymentMethodsModal";
import PreferencesModal from "@/components/modals/PreferencesModal";
import ColorPicker from "@/components/ui/ColorPicker";
import { toast } from "@/hooks/use-toast";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  
  // State for collapsible sections
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  
  // State for modals
  const [paymentMethodsOpen, setPaymentMethodsOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Handle notifications toggle
  const handleNotificationsToggle = (checked: boolean) => {
    updatePreferences({ notifications: checked });
  };

  // Handle dark mode toggle
  const handleDarkModeToggle = (checked: boolean) => {
    updatePreferences({ darkMode: checked });
  };

  // Handle accent color change
  const handleAccentColorChange = (color: string) => {
    updatePreferences({ accentColor: color });
    
    toast({
      title: "App appearance updated",
      description: "Your color preference has been saved",
    });
  };

  // Handle button clicks
  const handlePaymentMethodsClick = () => {
    setPaymentMethodsOpen(true);
  };

  const handlePreferencesClick = () => {
    setPreferencesOpen(true);
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
            style={{ backgroundColor: preferences.accentColor }}
          >
            <User size={32} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-semibold">{user?.name || "Guest User"}</h2>
            <p className="text-sm text-muted-foreground">{user?.email || "guest@example.com"}</p>
            <div className="flex items-center mt-1">
              <span className="text-xs px-2 py-1 bg-bellboy-accent text-bellboy rounded-full font-medium">
                {user?.tier || "Guest"}
              </span>
              <span className="text-xs text-muted-foreground ml-2">
                {user?.memberSince ? `Member since ${user.memberSince}` : "Not a member yet"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bellboy-card">
          <h3 className="font-serif text-lg font-medium text-foreground mb-4">Account Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Bell size={18} className="mr-3" style={{ color: preferences.accentColor }} />
                <span>Notifications</span>
              </div>
              <Switch 
                checked={preferences.notifications}
                onCheckedChange={handleNotificationsToggle}
              />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Moon size={18} className="mr-3" style={{ color: preferences.accentColor }} />
                <span>Dark Mode</span>
              </div>
              <Switch 
                checked={preferences.darkMode}
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
                  <Palette size={18} className="mr-3" style={{ color: preferences.accentColor }} />
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
                    <h4 className="text-sm font-medium mb-2">Accent Color</h4>
                    <ColorPicker
                      selectedColor={preferences.accentColor}
                      onChange={handleAccentColorChange}
                    />
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Shield size={18} className="mr-3" style={{ color: preferences.accentColor }} />
                <span>Privacy Settings</span>
              </div>
              <button 
                className="text-sm" 
                style={{ color: preferences.accentColor }}
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
              <CreditCard size={20} className="mr-3" style={{ color: preferences.accentColor }} />
              <span>Payment Methods</span>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </button>
          
          <button 
            className="bellboy-card w-full flex items-center justify-between p-4"
            onClick={handlePreferencesClick}
          >
            <div className="flex items-center">
              <Settings size={20} className="mr-3" style={{ color: preferences.accentColor }} />
              <span>Preferences</span>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </button>
          
          <button 
            className="bellboy-card w-full flex items-center justify-between p-4 text-destructive"
            onClick={logout}
          >
            <div className="flex items-center">
              <LogOut size={20} className="mr-3" />
              <span>Log Out</span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Modals */}
      <PaymentMethodsModal 
        open={paymentMethodsOpen} 
        onOpenChange={setPaymentMethodsOpen} 
      />
      
      <PreferencesModal 
        open={preferencesOpen} 
        onOpenChange={setPreferencesOpen} 
      />
    </PageContainer>
  );
};

export default Profile;
