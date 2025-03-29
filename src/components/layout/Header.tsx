
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ArrowLeft } from "lucide-react";

interface HeaderProps {
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showBackButton = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "BellBoy";
      case "/hotels":
        return "Your Hotels";
      case "/services":
        return "Hotel Services";
      case "/explore":
        return "Explore";
      case "/rewards":
        return "Loyalty Rewards";
      case "/profile":
        return "Profile";
      case "/check-in":
        return "Check In";
      case "/check-out":
        return "Check Out";
      case "/concierge":
        return "Virtual Concierge";
      case "/landing":
        return "Welcome";
      default:
        return "BellBoy";
    }
  };

  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-lg border-b border-border/30 shadow-sm z-10">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={() => navigate(-1)}
              className="mr-3 text-foreground hover:text-bellboy transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-lg font-serif font-semibold tracking-tight">{getPageTitle()}</h1>
        </div>
        <button 
          className="text-foreground hover:text-bellboy transition-colors relative bg-transparent p-1.5 rounded-full hover:bg-muted/50"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-bellboy-gold rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
