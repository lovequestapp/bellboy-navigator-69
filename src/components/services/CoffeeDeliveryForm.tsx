
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Coffee options and delivery times
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

interface CoffeeDeliveryFormProps {
  hotelName: string;
  onComplete: () => void;
  onCancel: () => void;
}

const CoffeeDeliveryForm: React.FC<CoffeeDeliveryFormProps> = ({ 
  hotelName, 
  onComplete, 
  onCancel 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CoffeeFormValues>({
    resolver: zodResolver(coffeeFormSchema),
    defaultValues: {
      coffeeType: "",
      deliveryTime: "7:30",
      specialInstructions: "",
    },
  });

  // Load saved data if available
  useEffect(() => {
    const savedDelivery = localStorage.getItem("dailyCoffeeDelivery");
    if (savedDelivery) {
      const deliveryData = JSON.parse(savedDelivery);
      form.reset({
        coffeeType: deliveryData.coffeeType,
        deliveryTime: deliveryData.deliveryTime,
        specialInstructions: deliveryData.specialInstructions || "",
      });
    }
  }, [form]);

  const onSubmit = (values: CoffeeFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedCoffeeName = coffeeOptions.find(option => option.id === values.coffeeType)?.name || "Coffee";
      
      // Save to localStorage for persistence
      localStorage.setItem("dailyCoffeeDelivery", JSON.stringify(values));
      
      toast({
        title: "Coffee Service Scheduled",
        description: `Your daily ${selectedCoffeeName} will be delivered at ${deliveryTimes.find(time => time.id === values.deliveryTime)?.label || "7:30 AM"}.`,
      });
      
      setIsLoading(false);
      onComplete();
    }, 1000);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl font-serif">Configure Coffee Service</DialogTitle>
        <DialogDescription>
          Set up your daily morning coffee delivery during your stay at {hotelName}.
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
                        onChange={() => field.onChange(option.id)}
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
          onClick={onCancel}
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
    </>
  );
};

export default CoffeeDeliveryForm;
