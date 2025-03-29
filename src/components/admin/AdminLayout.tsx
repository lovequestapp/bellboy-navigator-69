
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Users, Settings, Hotel, Tag, MapPin, BarChart, 
  Link, Palette, Mail, ToggleRight, MessageSquare, Activity, Layers, LogOut,
  Menu, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin access check
  React.useEffect(() => {
    if (!isAuthenticated || (user?.tier !== "Admin" && user?.tier !== "Gold Member")) {
      navigate("/profile");
    }
  }, [isAuthenticated, user, navigate]);

  // If path not explicitly passed, get it from the location
  const activePath = currentPage || location.pathname;

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
      {/* Desktop Sidebar */}
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
                  item.path === activePath || (item.path === "/admin" && activePath === "/admin")
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

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-slate-800 text-white border-slate-700">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-slate-900 text-white p-0 border-slate-800 w-64">
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">BellBoy Admin</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-slate-400">Welcome, {user.name}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleExitAdmin}
                  className="mt-2 w-full text-slate-300 border-slate-700 hover:bg-slate-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Exit Admin Dashboard
                </Button>
              </div>
              
              {sidebarItems.map((group, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-sm font-semibold text-slate-400 mb-2">{group.group}</h3>
                  {group.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center w-full text-left px-3 py-2 rounded-md text-sm mb-1 transition-colors",
                        item.path === activePath || (item.path === "/admin" && activePath === "/admin")
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
          </SheetContent>
        </Sheet>
      </div>

      {/* Floating exit button for mobile (in addition to menu exit) */}
      <Button 
        variant="outline" 
        size="icon" 
        onClick={handleExitAdmin}
        className="md:hidden fixed top-4 right-4 z-50 bg-slate-800 text-white border-slate-700"
        title="Exit Admin Dashboard"
      >
        <LogOut className="h-5 w-5" />
      </Button>

      {/* Main content */}
      <div className="flex-1 bg-slate-100 overflow-y-auto pb-16 md:pb-0">
        <div className="container px-4 py-6 mx-auto mt-12 md:mt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
