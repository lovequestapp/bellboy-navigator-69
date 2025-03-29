
import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import CoffeeDeliveryForm from "./CoffeeDeliveryForm";

interface CoffeeRecommendationProps {
  hotelName: string;
}

const CoffeeRecommendation: React.FC<CoffeeRecommendationProps> = ({ hotelName }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDailyDeliverySet, setIsDailyDeliverySet] = useState(false);
  
  // Check for saved delivery on component mount
  React.useEffect(() => {
    const savedDelivery = localStorage.getItem("dailyCoffeeDelivery");
    if (savedDelivery) {
      setIsDailyDeliverySet(true);
    }
  }, []);

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

  const handleDeliverySet = () => {
    setIsDailyDeliverySet(true);
    setIsDialogOpen(false);
  };

  return (
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] p-4 sm:p-6 max-h-[90vh] overflow-hidden flex flex-col">
          <CoffeeDeliveryForm 
            hotelName={hotelName} 
            onComplete={handleDeliverySet} 
            onCancel={() => setIsDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoffeeRecommendation;
