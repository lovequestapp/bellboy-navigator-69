
import React from "react";

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
  return (
    <div 
      className="bellboy-card flex items-center mb-4 animate-fade-in cursor-pointer"
      onClick={() => onClick(service.id)}
    >
      <div className="mr-4 p-3 bg-bellboy-accent rounded-full">
        {service.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-lg font-medium text-foreground">{service.name}</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
      </div>
      <button className="bellboy-button-primary text-sm">Order</button>
    </div>
  );
};

export default ServiceCard;
