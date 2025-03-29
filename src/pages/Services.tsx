
import React from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Bed, DoorOpen, Bell } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ServiceCard from "@/components/ui/ServiceCard";
import { toast } from "@/hooks/use-toast";

// Mock data
const services = [
  {
    id: "1",
    name: "Room Service",
    description: "Order food and drinks directly to your room",
    icon: <Utensils size={24} className="text-bellboy" />,
  },
  {
    id: "2",
    name: "Housekeeping",
    description: "Schedule room cleaning and maintenance",
    icon: <Bed size={24} className="text-bellboy" />,
  },
  {
    id: "3",
    name: "Smart Room Access",
    description: "Control your room's temperature, lights, and more",
    icon: <DoorOpen size={24} className="text-bellboy" />,
  },
  {
    id: "4",
    name: "Concierge Assistance",
    description: "Get help with reservations, tickets, and local information",
    icon: <Bell size={24} className="text-bellboy" />,
  },
];

const activeHotel = {
  id: "1",
  name: "Grand Majestic Hotel",
  location: "New York, NY",
};

const Services: React.FC = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceId: string) => {
    console.log("Service clicked:", serviceId);
    navigate(`/services/${serviceId}`);
  };

  const handleRecommendationClick = () => {
    toast({
      title: "Coffee Service Scheduled",
      description: "Your daily morning coffee will be delivered at 7:30 AM.",
    });
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="bellboy-card bg-bellboy text-white mb-6">
          <h2 className="text-lg font-serif font-semibold">{activeHotel.name}</h2>
          <p className="text-white/80 text-sm">{activeHotel.location}</p>
          <div className="mt-4 text-sm">
            <p className="text-white/80">Active Stay: Oct 15 - Oct 20, 2023</p>
          </div>
        </div>
        
        <h2 className="text-xl font-serif font-semibold mb-4">Available Services</h2>
        
        <div className="space-y-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onClick={handleServiceClick}
            />
          ))}
        </div>
        
        <div className="pt-6">
          <h2 className="text-xl font-serif font-semibold mb-4">Personalized Recommendations</h2>
          
          <div className="bellboy-card">
            <h3 className="font-serif text-lg font-medium text-foreground mb-2">Morning Coffee Service</h3>
            <p className="text-sm text-muted-foreground mb-4">Based on your preferences, we recommend our premium coffee service every morning at 7:30 AM.</p>
            <button 
              className="bellboy-button-primary"
              onClick={handleRecommendationClick}
            >
              Set Up Daily Delivery
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Services;
