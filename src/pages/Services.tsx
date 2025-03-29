
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Bed, DoorOpen, Bell, Check, X } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ServiceCard from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

const coffeeOptions = [
  { id: "americano", name: "Americano", description: "Rich, bold espresso with hot water" },
  { id: "latte", name: "Latte", description: "Espresso with steamed milk and a light layer of foam" },
  { id: "cappuccino", name: "Cappuccino", description: "Equal parts espresso, steamed milk, and foam" },
  { id: "espresso", name: "Espresso", description: "Concentrated coffee served in a small cup" },
];

const deliveryTimes = [
  { id: "7:00", label: "7:00 AM" },
  { id: "7:30", label: "7:30 AM" },
  { id: "8:00", label: "8:00 AM" },
  { id: "8:30", label: "8:30 AM" },
  { id: "9:00", label: "9:00 AM" },
];

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState("");
  const [selectedTime, setSelectedTime] = useState("7:30");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isDailyDeliverySet, setIsDailyDeliverySet] = useState(false);

  const handleServiceClick = (serviceId: string) => {
    console.log("Service clicked:", serviceId);
    navigate(`/services/${serviceId}`);
  };

  const handleRecommendationClick = () => {
    setIsDialogOpen(true);
  };

  const handleCancelDelivery = () => {
    setIsDailyDeliverySet(false);
    toast({
      title: "Coffee Service Cancelled",
      description: "Your daily coffee service has been cancelled.",
    });
  };

  const handleSetupDelivery = () => {
    if (!selectedCoffee) {
      toast({
        title: "Selection Required",
        description: "Please select a coffee type to continue.",
        variant: "destructive"
      });
      return;
    }

    const selectedCoffeeName = coffeeOptions.find(option => option.id === selectedCoffee)?.name || "Coffee";
    
    setIsDailyDeliverySet(true);
    setIsDialogOpen(false);
    
    toast({
      title: "Coffee Service Scheduled",
      description: `Your daily ${selectedCoffeeName} will be delivered at ${deliveryTimes.find(time => time.id === selectedTime)?.label || "7:30 AM"}.`,
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
            
            {isDailyDeliverySet ? (
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <div className="flex items-center gap-2 bg-bellboy/10 text-bellboy rounded-full py-1.5 px-3 text-sm">
                  <Check size={16} className="text-bellboy" />
                  <span>Daily Delivery Scheduled</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive sm:ml-auto"
                  onClick={handleCancelDelivery}
                >
                  <X className="h-4 w-4 mr-1" /> Cancel Service
                </Button>
              </div>
            ) : (
              <Button 
                className="bellboy-button-primary"
                onClick={handleRecommendationClick}
              >
                Set Up Daily Delivery
              </Button>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">Configure Coffee Service</DialogTitle>
            <DialogDescription>
              Set up your daily morning coffee delivery during your stay at {activeHotel.name}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-5 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Select Your Coffee</h4>
              <RadioGroup
                value={selectedCoffee}
                onValueChange={setSelectedCoffee}
                className="space-y-2"
              >
                {coffeeOptions.map((option) => (
                  <div key={option.id} className="flex items-start space-x-2 p-3 rounded-md border hover:bg-muted transition-colors">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Delivery Time</h4>
              <RadioGroup
                value={selectedTime}
                onValueChange={setSelectedTime}
                className="flex flex-wrap gap-2"
              >
                {deliveryTimes.map((time) => (
                  <div key={time.id} className="flex items-center">
                    <RadioGroupItem
                      value={time.id}
                      id={`time-${time.id}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`time-${time.id}`}
                      className="px-3 py-1.5 rounded-full border border-muted text-sm cursor-pointer peer-data-[state=checked]:bg-bellboy peer-data-[state=checked]:text-white peer-data-[state=checked]:border-bellboy"
                    >
                      {time.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="special-instructions" className="font-medium text-sm">Special Instructions (Optional)</Label>
              <Input
                id="special-instructions"
                placeholder="Any special preferences or requests..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter className="mt-2">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-bellboy text-bellboy hover:bg-bellboy/10"
            >
              Cancel
            </Button>
            <Button 
              className="bg-bellboy hover:bg-bellboy-light"
              onClick={handleSetupDelivery}
            >
              Confirm Daily Delivery
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Services;
