
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, Bed, DoorOpen, Bell, Check, X, Loader2 } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ServiceCard from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// Form validation schema
const coffeeFormSchema = z.object({
  coffeeType: z.string({
    required_error: "Please select a coffee type",
  }),
  deliveryTime: z.string({
    required_error: "Please select a delivery time",
  }),
  specialInstructions: z.string().optional(),
});

type CoffeeFormValues = z.infer<typeof coffeeFormSchema>;

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDailyDeliverySet, setIsDailyDeliverySet] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(true);

  const form = useForm<CoffeeFormValues>({
    resolver: zodResolver(coffeeFormSchema),
    defaultValues: {
      coffeeType: "",
      deliveryTime: "7:30",
      specialInstructions: "",
    },
  });

  // Simulate loading services
  useEffect(() => {
    const timer = setTimeout(() => {
      setServicesLoading(false);
    }, 800);
    
    // Check if daily delivery is already set in localStorage
    const savedDelivery = localStorage.getItem("dailyCoffeeDelivery");
    if (savedDelivery) {
      setIsDailyDeliverySet(true);
      const deliveryData = JSON.parse(savedDelivery);
      form.reset({
        coffeeType: deliveryData.coffeeType,
        deliveryTime: deliveryData.deliveryTime,
        specialInstructions: deliveryData.specialInstructions || "",
      });
    }
    
    return () => clearTimeout(timer);
  }, [form]);

  const handleServiceClick = (serviceId: string) => {
    console.log("Service clicked:", serviceId);
    navigate(`/services/${serviceId}`);
  };

  const handleRecommendationClick = () => {
    setIsDialogOpen(true);
  };

  const handleCancelDelivery = () => {
    setIsDailyDeliverySet(false);
    localStorage.removeItem("dailyCoffeeDelivery");
    toast({
      title: "Coffee Service Cancelled",
      description: "Your daily coffee service has been cancelled.",
    });
  };

  const onSubmit = (values: CoffeeFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedCoffeeName = coffeeOptions.find(option => option.id === values.coffeeType)?.name || "Coffee";
      
      setIsDailyDeliverySet(true);
      setIsDialogOpen(false);
      setIsLoading(false);
      
      // Save to localStorage for persistence
      localStorage.setItem("dailyCoffeeDelivery", JSON.stringify(values));
      
      toast({
        title: "Coffee Service Scheduled",
        description: `Your daily ${selectedCoffeeName} will be delivered at ${deliveryTimes.find(time => time.id === values.deliveryTime)?.label || "7:30 AM"}.`,
      });
    }, 1000);
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
        
        {servicesLoading ? (
          <div className="py-10 flex flex-col items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-bellboy" />
            <p className="mt-2 text-sm text-muted-foreground">Loading services...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={handleServiceClick}
              />
            ))}
          </div>
        )}
        
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
        <DialogContent className="sm:max-w-[500px] p-4 sm:p-6 max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">Configure Coffee Service</DialogTitle>
            <DialogDescription>
              Set up your daily morning coffee delivery during your stay at {activeHotel.name}.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 overflow-y-auto py-4 flex-1">
              <FormField
                control={form.control}
                name="coffeeType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-medium text-sm">Select Your Coffee</FormLabel>
                    <div className="space-y-2">
                      {coffeeOptions.map((option) => (
                        <div key={option.id} className="flex items-start space-x-2 p-3 rounded-md border hover:bg-muted transition-colors">
                          <RadioGroupItem 
                            value={option.id} 
                            id={option.id} 
                            checked={field.value === option.id}
                            onCheckedChange={() => field.onChange(option.id)}
                          />
                          <div className="flex-1 space-y-1">
                            <Label htmlFor={option.id} className="font-medium">{option.name}</Label>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="font-medium text-sm">Delivery Time</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {deliveryTimes.map((time) => (
                        <div key={time.id} className="flex items-center">
                          <FormControl>
                            <input
                              type="radio"
                              id={`time-${time.id}`}
                              value={time.id}
                              checked={field.value === time.id}
                              onChange={() => field.onChange(time.id)}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <Label
                            htmlFor={`time-${time.id}`}
                            className="px-3 py-1.5 rounded-full border border-muted text-sm cursor-pointer peer-checked:bg-bellboy peer-checked:text-white peer-checked:border-bellboy"
                          >
                            {time.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel htmlFor="special-instructions" className="font-medium text-sm">Special Instructions (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        id="special-instructions"
                        placeholder="Any special preferences or requests..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          
          <DialogFooter className="mt-2 pt-2 border-t">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="border-bellboy text-bellboy hover:bg-bellboy/10"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              className="bg-bellboy hover:bg-bellboy-light"
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Daily Delivery"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Services;
