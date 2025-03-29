
import React from "react";

interface HotelInfoCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
  };
}

const HotelInfoCard: React.FC<HotelInfoCardProps> = ({ hotel }) => {
  // Calculate dates for a typical stay (current day to 5 days later)
  const formatStayDates = () => {
    const today = new Date();
    const checkoutDate = new Date(today);
    checkoutDate.setDate(today.getDate() + 5);
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };
    
    return `${formatDate(today)} - ${formatDate(checkoutDate)}`;
  };

  return (
    <div className="bellboy-card bg-bellboy text-white mb-6">
      <h2 className="text-lg font-serif font-semibold">{hotel.name}</h2>
      <p className="text-white/80 text-sm">{hotel.location}</p>
      <div className="mt-4 text-sm">
        <p className="text-white/80">Active Stay: {formatStayDates()}</p>
      </div>
    </div>
  );
};

export default HotelInfoCard;
