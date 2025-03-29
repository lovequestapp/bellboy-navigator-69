
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bed, Bell, MapPin, Heart, User } from "lucide-react";
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
      name: "Rewards",
      icon: Heart,
      path: "/rewards",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border px-2 py-3 flex justify-around items-center z-10">
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
