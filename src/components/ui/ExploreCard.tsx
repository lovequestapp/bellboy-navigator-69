
import React, { useState } from "react";
import { MapPin, Star, ImageOff } from "lucide-react";
import { Button } from "./button";

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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    onClick(place.id);
  };

  const handleViewDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(place.id);
  };

  return (
    <div 
      className="bellboy-card mb-5 animate-fade-in cursor-pointer hover:shadow-lg transition-all duration-300"
      onClick={handleCardClick}
    >
      <div className="relative h-44 mb-3 rounded-lg overflow-hidden bg-muted">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="h-8 w-8 rounded-full border-2 border-bellboy border-t-transparent animate-spin"></div>
          </div>
        )}
        
        {imageError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50">
            <ImageOff className="h-10 w-10 text-muted-foreground" />
            <p className="text-xs text-muted-foreground mt-2">Image unavailable</p>
          </div>
        )}
        
        <img
          src={place.image}
          alt={place.name}
          className={`w-full h-full object-cover transition-transform duration-700 hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-medium flex items-center">
          <Star size={12} className="mr-1 text-bellboy-gold fill-bellboy-gold" />
          {place.rating}/5
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="font-serif text-lg font-medium text-foreground">{place.name}</h3>
        <p className="text-sm text-muted-foreground">{place.category}</p>
        <div className="flex items-center mt-2 text-sm text-muted-foreground">
          <MapPin size={14} className="mr-1.5 text-bellboy" />
          <span>{place.distance} away</span>
        </div>
      </div>
      
      <div className="mt-4">
        <Button 
          className="w-full bg-bellboy hover:bg-bellboy-light text-white"
          onClick={handleViewDetailsClick}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default ExploreCard;
