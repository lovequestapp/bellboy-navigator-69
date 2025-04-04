
import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import SmartRoomAccess from "@/components/smart-room/SmartRoomAccess";
import { getUpcomingHotels } from "@/services/hotelService";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoorClosed, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SmartRoom: React.FC = () => {
  const navigate = useNavigate();
  const upcomingHotels = getUpcomingHotels();
  const [isLoading, setIsLoading] = useState(true);
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  
  useEffect(() => {
    // Simulate loading time for room access verification
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (upcomingHotels.length > 0) {
        setIsAccessGranted(true);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [upcomingHotels.length]);
  
  const handleRoomAccessAttempt = () => {
    setIsLoading(true);
    
    // Simulate room access verification
    setTimeout(() => {
      setIsLoading(false);
      setIsAccessGranted(true);
      
      toast({
        title: "Room Access Granted",
        description: "You now have access to Room 412"
      });
    }, 2000);
  };
  
  // If no hotel stays, show a prompt to add one
  if (upcomingHotels.length === 0 && !isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-bellboy/10 rounded-full flex items-center justify-center mb-4">
            <DoorClosed size={30} className="text-bellboy" />
          </div>
          <h2 className="text-2xl font-serif font-semibold mb-2">No Active Rooms</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You need to have an active hotel stay to access smart room controls.
          </p>
          <Button 
            onClick={() => navigate('/check-in')}
            className="bg-bellboy hover:bg-bellboy-light text-white"
          >
            Add Hotel Stay
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Loader2 size={40} className="text-bellboy animate-spin mb-4" />
          <h2 className="text-xl font-serif font-medium mb-2">Verifying Room Access</h2>
          <p className="text-muted-foreground max-w-md">
            Please wait while we verify your room access credentials...
          </p>
        </div>
      </PageContainer>
    );
  }
  
  // Access verification needed
  if (!isAccessGranted) {
    return (
      <PageContainer>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
            <DoorClosed size={30} className="text-yellow-700" />
          </div>
          <h2 className="text-2xl font-serif font-semibold mb-2">Verify Room Access</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You have an active stay at {upcomingHotels[0].name}. Please verify your identity to access room controls.
          </p>
          <Button 
            onClick={handleRoomAccessAttempt}
            className="bg-bellboy hover:bg-bellboy-light text-white"
          >
            Verify Identity
          </Button>
        </div>
      </PageContainer>
    );
  }
  
  // Show room access controls
  return (
    <PageContainer>
      <SmartRoomAccess 
        roomNumber="412" 
        hotel={{
          name: upcomingHotels[0].name,
          id: upcomingHotels[0].id
        }} 
      />
    </PageContainer>
  );
};

export default SmartRoom;
