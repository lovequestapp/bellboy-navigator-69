
import React from "react";

interface HotelInfoCardProps {
  hotel: {
    id: string;
    name: string;
    location: string;
  };
}

const HotelInfoCard: React.FC<HotelInfoCardProps> = ({ hotel }) => {
  return (
    <div className="bellboy-card bg-bellboy text-white mb-6">
      <h2 className="text-lg font-serif font-semibold">{hotel.name}</h2>
      <p className="text-white/80 text-sm">{hotel.location}</p>
      <div className="mt-4 text-sm">
        <p className="text-white/80">Active Stay: Oct 15 - Oct 20, 2023</p>
      </div>
    </div>
  );
};

export default HotelInfoCard;
