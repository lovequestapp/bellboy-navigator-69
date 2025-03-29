
import React from "react";
import { User, Settings, CreditCard, LogOut, Bell, Moon, Shield, ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Switch } from "@/components/ui/switch";

const Profile: React.FC = () => {
  // Mock user data
  const user = {
    name: "Alexander Johnson",
    email: "alex.johnson@example.com",
    memberSince: "March 2022",
    tier: "Gold Member",
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-bellboy rounded-full flex items-center justify-center mr-4">
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
                <Bell size={18} className="mr-3 text-bellboy" />
                <span>Notifications</span>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center">
                <Moon size={18} className="mr-3 text-bellboy" />
                <span>Dark Mode</span>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Shield size={18} className="mr-3 text-bellboy" />
                <span>Privacy Settings</span>
              </div>
              <button className="text-sm text-bellboy">Manage</button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <button className="bellboy-card w-full flex items-center justify-between p-4">
            <div className="flex items-center">
              <CreditCard size={20} className="mr-3 text-bellboy" />
              <span>Payment Methods</span>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </button>
          
          <button className="bellboy-card w-full flex items-center justify-between p-4">
            <div className="flex items-center">
              <Settings size={20} className="mr-3 text-bellboy" />
              <span>Preferences</span>
            </div>
            <ArrowRight size={16} className="text-muted-foreground" />
          </button>
          
          <button className="bellboy-card w-full flex items-center justify-between p-4 text-destructive">
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
