
import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Bed, MapPin, Heart, Calendar, DoorOpen, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUpcomingHotels } from "@/services/hotelService";
import UpcomingStayCard from "@/components/ui/UpcomingStayCard";

const Index = () => {
  const navigate = useNavigate();
  const upcomingHotels = getUpcomingHotels();

  const handleFeatureClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-bellboy text-white py-8 px-6">
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome to BellBoy</h1>
        <p className="text-white/80">Your premium hotel companion</p>
      </header>
      
      <main className="flex-1 p-6">
        {/* Show upcoming stay if available */}
        {upcomingHotels.length > 0 && (
          <section className="mb-10 animate-fade-in">
            <h2 className="text-xl font-serif font-semibold mb-4">Your Next Stay</h2>
            <UpcomingStayCard hotel={upcomingHotels[0]} />
          </section>
        )}
        
        <section className="mb-10 animate-fade-in">
          <h2 className="text-2xl font-serif font-semibold mb-6">Elevate Your Stay</h2>
          <div className="prose text-muted-foreground">
            <p>BellBoy puts the comfort of home in your hands with AI-powered personalization and seamless hotel services.</p>
          </div>
          
          <div className="mt-6 space-y-4">
            <Button 
              className="w-full py-6 bg-bellboy hover:bg-bellboy-light text-white"
              onClick={() => navigate("/hotels")}
            >
              {upcomingHotels.length > 0 ? "Manage Your Stays" : "Get Started"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full py-6 border-bellboy text-bellboy hover:bg-bellboy/5"
              onClick={() => navigate("/landing")}
            >
              Learn More <ArrowRight className="ml-2" />
            </Button>
          </div>
        </section>
        
        <section className="mb-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-xl font-serif font-semibold mb-4">Key Features</h2>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="bellboy-card flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFeatureClick("/hotels")}
            >
              <Bed size={32} className="text-bellboy mb-2" />
              <h3 className="font-medium">Hotel Management</h3>
              <p className="text-xs text-muted-foreground mt-1">Easy check-in and room access</p>
            </div>
            <div 
              className="bellboy-card flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFeatureClick("/services")}
            >
              <Bell size={32} className="text-bellboy mb-2" />
              <h3 className="font-medium">Concierge Services</h3>
              <p className="text-xs text-muted-foreground mt-1">Pre-order meals and services</p>
            </div>
            <div 
              className="bellboy-card flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFeatureClick("/explore")}
            >
              <MapPin size={32} className="text-bellboy mb-2" />
              <h3 className="font-medium">City Exploration</h3>
              <p className="text-xs text-muted-foreground mt-1">Discover local attractions</p>
            </div>
            <div 
              className="bellboy-card flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFeatureClick("/rewards")}
            >
              <Heart size={32} className="text-bellboy mb-2" />
              <h3 className="font-medium">Loyalty Rewards</h3>
              <p className="text-xs text-muted-foreground mt-1">Earn points with every stay</p>
            </div>
            <div 
              className="bellboy-card flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFeatureClick("/smart-room")}
            >
              <DoorOpen size={32} className="text-bellboy mb-2" />
              <h3 className="font-medium">Smart Room</h3>
              <p className="text-xs text-muted-foreground mt-1">Control room features remotely</p>
            </div>
            <div 
              className="bellboy-card flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleFeatureClick("/feedback")}
            >
              <MessageSquare size={32} className="text-bellboy mb-2" />
              <h3 className="font-medium">Feedback</h3>
              <p className="text-xs text-muted-foreground mt-1">Share your experience</p>
            </div>
          </div>
        </section>
        
        <section className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="bellboy-card bg-bellboy text-white">
            <h2 className="text-lg font-serif font-semibold mb-2">Ready for your next trip?</h2>
            <p className="text-white/80 text-sm mb-4">Register your upcoming hotel stay now.</p>
            <button 
              className="bg-white text-bellboy font-medium px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors w-full flex items-center justify-center"
              onClick={() => navigate("/check-in")}
            >
              <Calendar size={18} className="mr-2" />
              <span>Add New Stay</span>
            </button>
          </div>
        </section>
      </main>
      
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>&copy; 2025 BellBoy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
