
import React from "react";
import { MapPin } from "lucide-react";

interface ExploreCardProps {
  place: {
    id: string;
    name: string;
    category: string;
    distance: string;
    image: string;
    rating: number;
  };
  onClick: (placeId: string) => void;
}

const ExploreCard: React.FC<ExploreCardProps> = ({ place, onClick }) => {
  return (
    <div 
      className="bellboy-card mb-4 animate-fade-in cursor-pointer"
      onClick={() => onClick(place.id)}
    >
      <div className="relative h-40 mb-2 rounded-md overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
          ★ {place.rating}/5
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="font-serif text-lg font-medium text-foreground">{place.name}</h3>
        <p className="text-sm text-muted-foreground">{place.category}</p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin size={14} className="mr-1" />
          <span>{place.distance} away</span>
        </div>
      </div>
      
      <div className="mt-4">
        <button className="bellboy-button-primary w-full">View Details</button>
      </div>
    </div>
  );
};

export default ExploreCard;
