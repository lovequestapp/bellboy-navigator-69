import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Settings, Hotel, Tag, MapPin, BarChart, 
  Link, Palette, Mail, ToggleRight, MessageSquare, Activity, Layers, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const sidebarItems = [
  {
    group: "User Management",
    items: [
      { name: "User Profiles", path: "/admin/users", icon: <Users className="mr-2 h-4 w-4" /> },
      { name: "Activity Tracking", path: "/admin/activity", icon: <Activity className="mr-2 h-4 w-4" /> },
      { name: "Support Tickets", path: "/admin/tickets", icon: <MessageSquare className="mr-2 h-4 w-4" /> }
    ]
  },
  {
    group: "Content Management",
    items: [
      { name: "Hotel Listings", path: "/admin/hotels", icon: <Hotel className="mr-2 h-4 w-4" /> },
      { name: "Promotions", path: "/admin/promotions", icon: <Tag className="mr-2 h-4 w-4" /> },
      { name: "Featured Destinations", path: "/admin/destinations", icon: <MapPin className="mr-2 h-4 w-4" /> }
    ]
  },
  {
    group: "Analytics",
    items: [
      { name: "Dashboard", path: "/admin", icon: <BarChart className="mr-2 h-4 w-4" /> }
    ]
  },
  {
    group: "Integrations",
    items: [
      { name: "Integrations Manager", path: "/admin/integrations", icon: <Layers className="mr-2 h-4 w-4" /> },
      { name: "API Status", path: "/admin/api-status", icon: <Link className="mr-2 h-4 w-4" /> },
      { name: "Configuration", path: "/admin/configuration", icon: <Settings className="mr-2 h-4 w-4" /> }
    ]
  },
  {
    group: "Customization",
    items: [
      { name: "Theme Settings", path: "/admin/theme", icon: <Palette className="mr-2 h-4 w-4" /> },
      { name: "Email Templates", path: "/admin/emails", icon: <Mail className="mr-2 h-4 w-4" /> },
      { name: "Feature Toggles", path: "/admin/features", icon: <ToggleRight className="mr-2 h-4 w-4" /> }
    ]
  }
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage = "" }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Admin access check
  React.useEffect(() => {
    if (!isAuthenticated || (user?.tier !== "Admin" && user?.tier !== "Gold Member")) {
      navigate("/profile");
    }
  }, [isAuthenticated, user, navigate]);

  const handleExitAdmin = () => {
    toast({
      title: "Exiting Admin Dashboard",
      description: "Returning to main application"
    });
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-4 hidden md:block overflow-y-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold mb-2">BellBoy Admin</h2>
            <p className="text-sm text-slate-400">Welcome, {user.name}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleExitAdmin}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
            title="Exit Admin Dashboard"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        
        {sidebarItems.map((group, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-sm font-semibold text-slate-400 mb-2">{group.group}</h3>
            {group.items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center w-full text-left px-3 py-2 rounded-md text-sm mb-1 transition-colors",
                  item.path === currentPage
                    ? "bg-slate-800 text-white font-medium"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
            {index < sidebarItems.length - 1 && <Separator className="my-3 bg-slate-800" />}
          </div>
        ))}
      </div>

      {/* Mobile nav - shown on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white z-50">
        <div className="flex justify-around p-2">
          {sidebarItems.slice(0, 3).map((group, index) => (
            <button
              key={index}
              onClick={() => navigate(group.items[0].path)}
              className="flex flex-col items-center justify-center py-1 px-3"
            >
              {group.items[0].icon}
              <span className="text-xs mt-1">{group.group}</span>
            </button>
          ))}
          <button
            onClick={handleExitAdmin}
            className="flex flex-col items-center justify-center py-1 px-3"
          >
            <LogOut size={20} />
            <span className="text-xs mt-1">Exit</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-slate-100 overflow-y-auto pb-16 md:pb-0">
        <div className="container px-4 py-6 mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
