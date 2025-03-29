
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Bed, DoorOpen, Bell } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import HotelInfoCard from "@/components/services/HotelInfoCard";
import ServiceCardList from "@/components/services/ServiceCardList";
import CoffeeRecommendation from "@/components/services/CoffeeRecommendation";

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
  const [servicesLoading, setServicesLoading] = useState(true);

  // Simulate loading services
  useEffect(() => {
    const timer = setTimeout(() => {
      setServicesLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleServiceClick = (serviceId: string) => {
    console.log("Service clicked:", serviceId);
    navigate(`/services/${serviceId}`);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <HotelInfoCard hotel={activeHotel} />
        
        <h2 className="text-xl font-serif font-semibold mb-4">Available Services</h2>
        
        <ServiceCardList 
          services={services}
          isLoading={servicesLoading}
          onServiceClick={handleServiceClick}
        />
        
        <CoffeeRecommendation hotelName={activeHotel.name} />
      </div>
    </PageContainer>
  );
};

export default Services;
