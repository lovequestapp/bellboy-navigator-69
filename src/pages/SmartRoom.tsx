
import React from "react";
import PageContainer from "@/components/layout/PageContainer";
import SmartRoomAccess from "@/components/smart-room/SmartRoomAccess";
import { getUpcomingHotels } from "@/services/hotelService";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoorClosed } from "lucide-react";

const SmartRoom: React.FC = () => {
  const navigate = useNavigate();
  const upcomingHotels = getUpcomingHotels();
  
  // If no hotel stays, show a prompt to add one
  if (upcomingHotels.length === 0) {
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
