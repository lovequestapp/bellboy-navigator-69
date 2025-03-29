
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const CheckIn: React.FC = () => {
  const navigate = useNavigate();
  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted", { hotelName, hotelLocation, checkInDate, checkOutDate });
    navigate("/hotels");
  };

  return (
    <PageContainer showBackButton={true}>
      <div className="space-y-6">
        <h2 className="text-xl font-serif font-semibold mb-6">Register New Hotel Stay</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="hotelName">Hotel Name</Label>
            <Input
              id="hotelName"
              placeholder="Enter hotel name"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="hotelLocation">Hotel Location</Label>
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
              <Label>Check-in Date</Label>
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
                    onSelect={setCheckInDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-3">
              <Label>Check-out Date</Label>
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
                      (checkInDate ? date < checkInDate : false) || 
                      date < new Date()
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-bellboy hover:bg-bellboy-light"
              disabled={!hotelName || !hotelLocation || !checkInDate || !checkOutDate}
            >
              <span>Register Stay</span>
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </form>
        
        <div className="pt-6">
          <div className="bellboy-card">
            <h3 className="font-serif text-lg font-medium text-foreground mb-2">What happens next?</h3>
            <p className="text-sm text-muted-foreground">
              After registering your stay, you'll be able to check in digitally, access hotel services, and get personalized recommendations for your trip.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckIn;
