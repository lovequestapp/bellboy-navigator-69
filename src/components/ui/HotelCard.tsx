
import React from "react";
import { Calendar, DoorOpen } from "lucide-react";

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
      className="bellboy-card mb-4 animate-fade-in cursor-pointer"
      onClick={() => onClick(hotel.id)}
    >
      <div className="relative h-40 mb-4 rounded-md overflow-hidden">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white font-serif font-semibold text-xl">{hotel.name}</h3>
          <p className="text-white/90 text-sm">{hotel.location}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar size={16} className="mr-1" />
          <span>Check-in: {hotel.checkIn}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar size={16} className="mr-1" />
          <span>Check-out: {hotel.checkOut}</span>
        </div>
      </div>
      
      <div className="flex justify-between mt-4">
        <button className="bellboy-button-primary flex items-center">
          <DoorOpen size={16} className="mr-1" />
          <span>Quick Access</span>
        </button>
        <button className="bellboy-button-secondary">View Details</button>
      </div>
    </div>
  );
};

export default HotelCard;
