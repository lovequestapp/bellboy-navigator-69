
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bed, Bell, MapPin, ChefHat, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white backdrop-blur-md bg-opacity-90 border-t border-border px-2 py-3 flex justify-around items-center z-10 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => navigate(item.path)}
          className={cn(
            "flex flex-col items-center justify-center p-1 rounded-md w-16 transition-colors",
            location.pathname === item.path
              ? "text-bellboy"
              : "text-muted-foreground hover:text-bellboy-light"
          )}
        >
          <item.icon size={20} />
          <span className="text-xs mt-1">{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
