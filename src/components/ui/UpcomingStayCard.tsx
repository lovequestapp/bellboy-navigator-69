
import React from "react";
import { Hotel } from "@/services/hotelService";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpcomingStayCardProps {
  hotel: Hotel;
}

const UpcomingStayCard: React.FC<UpcomingStayCardProps> = ({ hotel }) => {
  const navigate = useNavigate();
  
  const daysUntilCheckIn = () => {
    const today = new Date();
    const checkInParts = hotel.checkIn.split(' ');
    const month = new Date(Date.parse(`${checkInParts[0]} 1, 2023`)).getMonth();
    const day = parseInt(checkInParts[1].replace(',', ''));
    const year = parseInt(checkInParts[2]);
    
    const checkInDate = new Date(year, month, day);
    const timeDiff = checkInDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return dayDiff;
  };
  
  const days = daysUntilCheckIn();
  
  return (
    <div className="relative bg-white/95 rounded-lg shadow-luxury overflow-hidden border border-white/30 transition-all duration-300 hover:shadow-premium group">
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bellboy/30 to-bellboy-navy/40 mix-blend-multiply z-10 opacity-60 group-hover:opacity-50 transition-opacity"></div>
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm z-20">
          <div className="flex items-center">
            <Clock size={14} className="text-bellboy mr-1.5" />
            <span className="text-xs font-medium">
              {days > 0 
                ? `${days} day${days > 1 ? 's' : ''} until check-in` 
                : days === 0 
                  ? "Check-in today!" 
                  : "Stay in progress"}
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-20 z-10"></div>
        <div className="absolute bottom-3 left-3 right-3 text-white z-20">
          <h3 className="font-serif font-medium text-xl tracking-tight">{hotel.name}</h3>
          <div className="flex items-center text-sm text-white/90">
            <MapPin size={14} className="mr-1" />
            <span className="truncate">{hotel.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-4">
          <span className="font-medium">{hotel.checkIn}</span> - <span className="font-medium">{hotel.checkOut}</span>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-bellboy to-bellboy-navy hover:from-bellboy-navy hover:to-bellboy border-none shadow-sm group-hover:shadow-md transition-all duration-300"
          onClick={() => navigate("/hotels")}
        >
          View Reservation <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default UpcomingStayCard;
