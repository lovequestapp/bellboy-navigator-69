
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Utensils, Bed, DoorOpen, Bell, Check } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

// Mock data for services
const servicesData = [
  {
    id: "1",
    name: "Room Service",
    description: "Order food and drinks directly to your room",
    icon: <Utensils size={24} className="text-bellboy" />,
    longDescription: "Enjoy delicious meals and refreshing beverages in the comfort of your room. Our extensive menu offers a variety of options to satisfy any craving, from light snacks to full course meals.",
    options: [
      { id: "breakfast", name: "Breakfast", price: "$25" },
      { id: "lunch", name: "Lunch", price: "$35" },
      { id: "dinner", name: "Dinner", price: "$45" },
      { id: "drinks", name: "Beverages", price: "$15" }
    ]
  },
  {
    id: "2",
    name: "Housekeeping",
    description: "Schedule room cleaning and maintenance",
    icon: <Bed size={24} className="text-bellboy" />,
    longDescription: "Our professional housekeeping staff ensures your room is immaculate and comfortable throughout your stay. Schedule services at your convenience for daily cleaning, turndown service, or special requests.",
    options: [
      { id: "daily", name: "Daily Cleaning", price: "Included" },
      { id: "turndown", name: "Turndown Service", price: "Included" },
      { id: "extra-towels", name: "Extra Towels", price: "$5" },
      { id: "laundry", name: "Laundry Service", price: "From $20" }
    ]
  },
  {
    id: "3",
    name: "Smart Room Access",
    description: "Control your room's temperature, lights, and more",
    icon: <DoorOpen size={24} className="text-bellboy" />,
    longDescription: "Take control of your room environment with our smart room technology. Adjust lighting, temperature, curtains, and entertainment systems directly from your phone or voice commands.",
    options: [
      { id: "temperature", name: "Temperature Control", price: "Included" },
      { id: "lighting", name: "Lighting Control", price: "Included" },
      { id: "curtains", name: "Automated Curtains", price: "Included" },
      { id: "entertainment", name: "Entertainment System", price: "Included" }
    ]
  },
  {
    id: "4",
    name: "Concierge Assistance",
    description: "Get help with reservations, tickets, and local information",
    icon: <Bell size={24} className="text-bellboy" />,
    longDescription: "Our knowledgeable concierge team is available to enhance your stay with personalized recommendations, reservations at top restaurants, tickets to events, and insider tips on local attractions.",
    options: [
      { id: "restaurant", name: "Restaurant Reservations", price: "Included" },
      { id: "tickets", name: "Event Tickets", price: "Varies" },
      { id: "transportation", name: "Transportation Arrangements", price: "Varies" },
      { id: "tours", name: "Local Tours", price: "From $50" }
    ]
  }
];

const ServiceDetails: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  const service = servicesData.find(s => s.id === serviceId);
  
  if (!service) {
    return (
      <PageContainer showBackButton={true}>
        <div className="bellboy-card text-center p-8">
          <h2 className="text-xl font-serif font-semibold mb-4">Service Not Found</h2>
          <p className="text-muted-foreground mb-6">The requested service could not be found.</p>
          <Button onClick={() => navigate('/services')}>
            Return to Services
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOption) {
      toast({
        title: "Selection Required",
        description: "Please select a service option to continue.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Service Ordered",
      description: `Your ${service.name} has been successfully scheduled.`,
    });
    
    // Reset form and navigate back to services page
    setTimeout(() => {
      navigate('/services');
    }, 1500);
  };

  return (
    <PageContainer showBackButton={true}>
      <div className="space-y-6">
        <div className="flex items-center mb-2">
          <div className="p-3 bg-bellboy-accent rounded-full mr-4">
            <div className="text-bellboy">
              {service.icon}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-serif font-semibold">{service.name}</h1>
            <p className="text-muted-foreground">{service.description}</p>
          </div>
        </div>
        
        <div className="bellboy-card mb-6">
          <p>{service.longDescription}</p>
        </div>
        
        <div className="bellboy-card">
          <h2 className="text-xl font-serif font-semibold mb-4">Order Service</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Select Option</h3>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {service.options.map(option => (
                  <div key={option.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50">
                    <div className="flex items-center">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="ml-2">{option.name}</Label>
                    </div>
                    <span className="text-muted-foreground">{option.price}</span>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Schedule Service</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                      id="date" 
                      type="date" 
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                      id="time" 
                      type="time" 
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="special-requests">Special Requests (Optional)</Label>
              <Textarea 
                id="special-requests"
                placeholder="Any special requests or instructions..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
              />
            </div>
            
            <Button type="submit" className="w-full bg-bellboy hover:bg-bellboy-light">
              <Check className="mr-2 h-4 w-4" /> Complete Order
            </Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default ServiceDetails;
