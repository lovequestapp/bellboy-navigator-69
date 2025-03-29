
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-32 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif font-medium text-lg truncate">{hotel.name}</h3>
          <div className="flex items-center text-sm">
            <MapPin size={12} className="mr-1" />
            <span className="truncate">{hotel.location}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <Clock size={16} className="text-bellboy mr-2" />
            <span className="text-sm font-medium">
              {days > 0 
                ? `${days} day${days > 1 ? 's' : ''} until check-in` 
                : days === 0 
                  ? "Check-in today!" 
                  : "Stay in progress"}
            </span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          {hotel.checkIn} - {hotel.checkOut}
        </div>
        
        <Button 
          className="w-full bg-bellboy hover:bg-bellboy-light"
          onClick={() => navigate("/hotels")}
        >
          View Reservation <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default UpcomingStayCard;
