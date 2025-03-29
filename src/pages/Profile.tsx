import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Settings, CreditCard, Heart, LogOut, ChevronRight, LayoutDashboard, ShieldCheck } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import PreferencesModal from "@/components/modals/PreferencesModal";
import PaymentMethodsModal from "@/components/modals/PaymentMethodsModal";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showPreferences, setShowPreferences] = React.useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = React.useState(false);

  const isAdmin = true;

  const menuItems = [
    {
      icon: <Settings size={20} className="text-bellboy" />,
      title: "Preferences",
      description: "App settings and customization",
      onClick: () => setShowPreferences(true),
    },
    {
      icon: <CreditCard size={20} className="text-bellboy" />,
      title: "Payment Methods",
      description: "Manage your saved payment methods",
      onClick: () => setShowPaymentMethods(true),
    },
    {
      icon: <Heart size={20} className="text-bellboy" />,
      title: "Rewards & Points",
      description: "View your rewards status and history",
      onClick: () => navigate("/rewards"),
    },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // In a real app, perform actual logout logic here
    setTimeout(() => {
      navigate("/landing");
    }, 1500);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-2 border-border">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-serif font-semibold">{user?.name || "Jane Doe"}</h1>
            <p className="text-muted-foreground">{user?.tier || "Premium Member"}</p>
            <p className="text-sm text-muted-foreground">{user?.email || "jane.doe@example.com"}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs px-2 py-0 h-7"
              onClick={() => navigate("/profile/edit")}
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bellboy-card">
          <h2 className="text-lg font-serif font-medium mb-4">Your Stats</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-serif font-medium text-bellboy">12</p>
              <p className="text-sm text-muted-foreground">Stays</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-medium text-bellboy">4,350</p>
              <p className="text-sm text-muted-foreground">Points</p>
            </div>
            <div>
              <p className="text-2xl font-serif font-medium text-bellboy">Gold</p>
              <p className="text-sm text-muted-foreground">Status</p>
            </div>
          </div>
        </div>

        {/* Admin Dashboard Access - Now shown for all users in development */}
        <div className="bellboy-card bg-slate-100 border-2 border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShieldCheck size={24} className="mr-3 text-bellboy" />
              <div>
                <h3 className="font-serif font-medium text-lg">Admin Dashboard</h3>
                <p className="text-sm text-muted-foreground">Access administrative controls and analytics</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/admin")} 
              className="bg-bellboy hover:bg-bellboy/90"
            >
              <LayoutDashboard size={16} className="mr-2" />
              Access
            </Button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full bellboy-card flex items-center justify-between p-4 text-left hover:bg-muted/30 transition-colors"
              onClick={item.onClick}
            >
              <div className="flex items-center">
                <div className="mr-3">{item.icon}</div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full mt-6 border-dashed text-destructive hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>

      {/* Modals */}
      <PreferencesModal open={showPreferences} onOpenChange={setShowPreferences} />
      <PaymentMethodsModal open={showPaymentMethods} onOpenChange={setShowPaymentMethods} />
    </PageContainer>
  );
};

export default Profile;
