
import React from "react";
import { Calendar, DoorOpen } from "lucide-react";
import { Button } from "./button";

interface HotelCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
    checkIn: string;
    checkOut: string;
    image: string;
  };
  onClick: (hotelId: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onClick }) => {
  return (
    <div 
      className="bellboy-card mb-5 animate-fade-in cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={() => onClick(hotel.id)}
    >
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-serif font-semibold text-xl">{hotel.name}</h3>
          <p className="text-white/90 text-sm">{hotel.location}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar size={16} className="mr-1.5 text-bellboy" />
          <span>Check-in: <span className="font-medium text-foreground">{hotel.checkIn}</span></span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar size={16} className="mr-1.5 text-bellboy" />
          <span>Check-out: <span className="font-medium text-foreground">{hotel.checkOut}</span></span>
        </div>
      </div>
      
      <div className="flex justify-between mt-4 gap-3">
        <Button 
          className="flex-1 bg-bellboy hover:bg-bellboy-light text-white" 
          size="sm"
        >
          <DoorOpen size={16} className="mr-1.5" />
          <span>Quick Access</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-bellboy text-bellboy hover:bg-bellboy hover:text-white"
          size="sm"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default HotelCard;
