
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Star, Building, Home, Phone, CreditCard } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { format, addDays } from "date-fns";
import { addNewHotelStay } from "@/services/hotelService";
import { useToast } from "@/hooks/use-toast";

const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Current date for defaults
  const currentDate = new Date(2025, 2, 29); // March 29, 2025
  
  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [step, setStep] = useState(1);
  
  const handleNext = () => {
    if (step === 1 && (!hotelName || !hotelLocation || !checkInDate || !checkOutDate)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to continue.",
        variant: "destructive",
      });
      return;
    }
    setStep(2);
  };
  
  const handleBack = () => {
    setStep(1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hotelName || !hotelLocation || !checkInDate || !checkOutDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Format dates for display
      const formattedCheckIn = format(checkInDate, "MMM d, yyyy");
      const formattedCheckOut = format(checkOutDate, "MMM d, yyyy");
      
      // Sample image URLs
      const hotelImages = [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
      ];
      
      // Sample hotel amenities
      const amenities = [
        "Free Wi-Fi", 
        "Pool", 
        "Fitness Center", 
        "Restaurant", 
        "Room Service"
      ];
      
      // Create a new hotel stay
      addNewHotelStay({
        name: hotelName,
        location: hotelLocation,
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        image: hotelImages[Math.floor(Math.random() * hotelImages.length)],
        roomType: roomType || "Standard Room",
        price: price || undefined,
        amenities,
        description: specialRequests || undefined,
        rating: 4 + Math.random()
      });
      
      toast({
        title: "Success!",
        description: "Your hotel stay has been successfully registered.",
      });
      
      navigate("/hotels");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem registering your stay. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleCheckInSelect = (date: Date | undefined) => {
    setCheckInDate(date);
    // If checkout date is before check-in date or not set, update it
    if (date && (!checkOutDate || checkOutDate < date)) {
      setCheckOutDate(addDays(date, 1));
    }
  };

  return (
    <PageContainer showBackButton={true}>
      <div className="space-y-6">
        <h2 className="text-xl font-serif font-semibold mb-6">Register New Hotel Stay</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            /* Step 1: Basic Hotel Information */
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="hotelName">Hotel Name<span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="hotelName"
                    placeholder="Enter hotel name"
                    className="pl-10"
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="hotelLocation">Hotel Location<span className="text-destructive">*</span></Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="hotelLocation"
                    placeholder="City, State, Country"
                    className="pl-10"
                    value={hotelLocation}
                    onChange={(e) => setHotelLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>Check-in Date<span className="text-destructive">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkInDate ? (
                          format(checkInDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={checkInDate}
                        onSelect={handleCheckInSelect}
                        initialFocus
                        disabled={(date) => date < currentDate}
                        defaultMonth={currentDate}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-3">
                  <Label>Check-out Date<span className="text-destructive">*</span></Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkOutDate ? (
                          format(checkOutDate, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        initialFocus
                        disabled={(date) => 
                          (checkInDate ? date <= checkInDate : false) || 
                          date < currentDate
                        }
                        defaultMonth={currentDate}
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="button" 
                  className="w-full bg-bellboy hover:bg-bellboy-light"
                  onClick={handleNext}
                  disabled={!hotelName || !hotelLocation || !checkInDate || !checkOutDate}
                >
                  <span>Continue</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          ) : (
            /* Step 2: Additional Hotel Details */
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="roomType">Room Type</Label>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="roomType"
                    placeholder="e.g., Standard King, Deluxe Suite"
                    className="pl-10"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="price">Room Rate (per night)</Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input
                    id="price"
                    placeholder="e.g., $200"
                    className="pl-10"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="specialRequests">Special Requests or Notes</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requests or notes for your stay"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex-1"
                  onClick={handleBack}
                >
                  Back
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 bg-bellboy hover:bg-bellboy-light"
                >
                  <span>Register Stay</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </form>
        
        <Separator />
        
        <div className="pt-2">
          <div className="bellboy-card">
            <h3 className="font-serif text-lg font-medium text-foreground mb-2">What happens next?</h3>
            <p className="text-sm text-muted-foreground">
              After registering your stay, you'll be able to check in digitally, access hotel services, and get personalized recommendations for your trip.
            </p>
            <div className="mt-4 flex items-center text-bellboy">
              <Star size={16} className="fill-bellboy-gold text-bellboy-gold" />
              <span className="ml-2 text-sm font-medium">
                You'll earn BellBoy Reward points for each registered stay!
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckIn;
