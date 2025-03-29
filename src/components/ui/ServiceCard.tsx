
import React from "react";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
  };
  onClick: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    onClick(service.id);
  };

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the card click
    onClick(service.id);
  };

  return (
    <div 
      className="bellboy-card flex items-center mb-4 animate-fade-in cursor-pointer group hover:shadow-lg transition-all duration-300"
      onClick={handleClick}
    >
      <div className="mr-4 p-3.5 bg-bellboy-accent rounded-full group-hover:bg-bellboy-gold/20 transition-colors duration-300">
        <div className="text-bellboy">
          {service.icon}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-lg font-medium text-foreground">{service.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
      </div>
      <Button 
        variant="outline" 
        className="bellboy-button-primary bg-transparent border-bellboy hover:bg-bellboy hover:text-white text-bellboy text-sm rounded-full group-hover:bg-bellboy"
        size="sm"
        onClick={handleOrderClick}
      >
        Order <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
  );
};

export default ServiceCard;
