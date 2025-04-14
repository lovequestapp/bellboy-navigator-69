
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bed, Bell, MapPin, ChefHat, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navItems = [
    {
      name: "Hotels",
      icon: Bed,
      path: "/hotels",
    },
    {
      name: "Services",
      icon: Bell,
      path: "/services",
    },
    {
      name: "Explore",
      icon: MapPin,
      path: "/explore",
    },
    {
      name: "Smart Room",
      icon: Home,
      path: "/smart-room",
    },
    {
      name: "Concierge",
      icon: ChefHat,
      path: "/concierge",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  // Don't show bottom nav on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-border/30 px-2 py-3 flex justify-around items-center z-10 shadow-[0_-8px_30px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex flex-col items-center justify-center p-1 rounded-md transition-all duration-300",
            isMobile ? "w-14" : "w-16",
            location.pathname === item.path
              ? "text-bellboy scale-105"
              : "text-muted-foreground hover:text-bellboy-light"
          )}
        >
          <item.icon size={isMobile ? 18 : 20} className={cn("transition-all duration-300", 
            location.pathname === item.path ? "stroke-[2.25px]" : "")} />
          <span className={cn("text-xs mt-1 font-medium transition-all", 
            location.pathname === item.path ? "opacity-100" : "opacity-80")}>{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
