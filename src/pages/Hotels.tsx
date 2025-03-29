
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import HotelCard from "@/components/ui/HotelCard";
import { Button } from "@/components/ui/button";

// Mock data
const upcomingHotels = [
  {
    id: "1",
    name: "Grand Majestic Hotel",
    location: "New York, NY",
    checkIn: "Oct 15, 2023",
    checkOut: "Oct 20, 2023",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Seaside Resort & Spa",
    location: "Miami, FL",
    checkIn: "Dec 23, 2023",
    checkOut: "Dec 30, 2023",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const pastHotels = [
  {
    id: "3",
    name: "Mountain View Lodge",
    location: "Aspen, CO",
    checkIn: "Jan 5, 2023",
    checkOut: "Jan 10, 2023",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const Hotels: React.FC = () => {
  const navigate = useNavigate();

  const handleHotelClick = (hotelId: string) => {
    console.log("Hotel clicked:", hotelId);
    // Navigate to hotel detail page
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-semibold">Upcoming Stays</h2>
          <Button 
            variant="outline" 
            className="flex items-center text-sm"
            onClick={() => navigate("/check-in")}
          >
            <Calendar size={16} className="mr-1" />
            <span>Add New</span>
          </Button>
        </div>
        
        {upcomingHotels.length > 0 ? (
          <div className="space-y-4">
            {upcomingHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onClick={handleHotelClick}
              />
            ))}
          </div>
        ) : (
          <div className="bellboy-card text-center p-8">
            <p className="text-muted-foreground mb-4">No upcoming stays found</p>
            <Button 
              className="bg-bellboy hover:bg-bellboy-light"
              onClick={() => navigate("/check-in")}
            >
              Add Your First Stay
            </Button>
          </div>
        )}
        
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-semibold">Past Stays</h2>
            {pastHotels.length > 0 && (
              <button className="text-bellboy flex items-center text-sm">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </button>
            )}
          </div>
          
          {pastHotels.length > 0 ? (
            <div className="space-y-4">
              {pastHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onClick={handleHotelClick}
                />
              ))}
            </div>
          ) : (
            <div className="bellboy-card text-center p-6">
              <p className="text-muted-foreground">No past stays found</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Hotels;
