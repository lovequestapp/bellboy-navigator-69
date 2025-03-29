
import React from "react";
import { Loader2 } from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceCardListProps {
  services: Service[];
  isLoading: boolean;
  onServiceClick: (serviceId: string) => void;
}

const ServiceCardList: React.FC<ServiceCardListProps> = ({ 
  services, 
  isLoading, 
  onServiceClick 
}) => {
  if (isLoading) {
    return (
      <div className="py-10 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-bellboy" />
        <p className="mt-2 text-sm text-muted-foreground">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onClick={onServiceClick}
        />
      ))}
    </div>
  );
};

export default ServiceCardList;
