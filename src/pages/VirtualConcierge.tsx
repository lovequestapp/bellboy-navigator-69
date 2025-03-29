
import React, { useState } from "react";
import { Calendar, ChefHat, Music, Users, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { getUpcomingHotels } from "@/services/hotelService";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VirtualConciergeChat from "@/components/VirtualConciergeChat";

interface ConciergeService {
  id: string;
  title: string;
  description: string;
  price: string;
  date: string;
  image: string;
  icon: React.ReactNode;
  location: string;
  tags: string[];
}

const VirtualConcierge: React.FC = () => {
  const navigate = useNavigate();
  const upcomingStays = getUpcomingHotels();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<string>("explore");
  
  // Mock data for concierge services
  const conciergeServices: ConciergeService[] = [
    {
      id: "1",
      title: "Private Chef Experience",
      description: "Enjoy a gourmet 5-course meal prepared by a renowned chef in your suite.",
      price: "$350 per person",
      date: "Oct 16, 2023",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <ChefHat size={20} />,
      location: "Grand Majestic Hotel, New York",
      tags: ["dining", "exclusive"]
    },
    {
      id: "2",
      title: "Jazz Night VIP Access",
      description: "Exclusive entry to New York's premier jazz club with reserved seating.",
      price: "$120 per person",
      date: "Oct 18, 2023",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Music size={20} />,
      location: "Blue Note Jazz Club, New York",
      tags: ["entertainment", "nightlife"]
    },
    {
      id: "3",
      title: "Private Art Gallery Tour",
      description: "Guided tour of exclusive art collections not open to the public.",
      price: "$180 per person",
      date: "Oct 19, 2023",
      image: "https://images.unsplash.com/photo-1594760467013-64ac2b80b7d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Star size={20} />,
      location: "Private Collection, Manhattan",
      tags: ["culture", "exclusive"]
    },
    {
      id: "4",
      title: "Holiday Season Yacht Party",
      description: "Celebrate the season on a luxury yacht with champagne and gourmet appetizers.",
      price: "$450 per person",
      date: "Dec 24, 2023",
      image: "https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <Users size={20} />,
      location: "Seaside Resort & Spa, Miami",
      tags: ["entertainment", "exclusive"]
    },
  ];

  const filteredServices = selectedFilter === "all" 
    ? conciergeServices 
    : conciergeServices.filter(service => service.tags.includes(selectedFilter));

  const handleBookService = (serviceId: string) => {
    toast({
      title: "Service Booked",
      description: "Your experience has been confirmed. Details sent to your email.",
    });
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-semibold">Virtual Concierge</h1>
          <p className="text-muted-foreground">Curated experiences and assistance for your stay</p>
        </div>

        <Tabs defaultValue="explore" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="explore">Explore Experiences</TabsTrigger>
            <TabsTrigger value="chat">Concierge Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="mt-6">
            {upcomingStays.length === 0 ? (
              <div className="bellboy-card text-center p-8">
                <h2 className="text-xl font-serif font-semibold mb-4">No Upcoming Stays</h2>
                <p className="text-muted-foreground mb-6">Add a hotel stay to see personalized recommendations.</p>
                <Button onClick={() => navigate('/check-in')} className="bg-bellboy hover:bg-bellboy-light">
                  Add New Stay
                </Button>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-r from-bellboy to-bellboy-light rounded-lg p-6 text-white">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="h-6 w-6" />
                    <h2 className="text-xl font-serif font-medium">Upcoming Stay</h2>
                  </div>
                  <h3 className="text-lg font-serif">{upcomingStays[0].name}</h3>
                  <p className="opacity-90">{upcomingStays[0].location}</p>
                  <p className="mt-2 opacity-90">{upcomingStays[0].checkIn} - {upcomingStays[0].checkOut}</p>
                </div>

                <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
                  <Button 
                    variant={selectedFilter === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedFilter("all")}
                    className={selectedFilter === "all" ? "bg-bellboy hover:bg-bellboy-light" : ""}
                  >
                    All
                  </Button>
                  <Button 
                    variant={selectedFilter === "dining" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedFilter("dining")}
                    className={selectedFilter === "dining" ? "bg-bellboy hover:bg-bellboy-light" : ""}
                  >
                    Dining
                  </Button>
                  <Button 
                    variant={selectedFilter === "entertainment" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedFilter("entertainment")}
                    className={selectedFilter === "entertainment" ? "bg-bellboy hover:bg-bellboy-light" : ""}
                  >
                    Entertainment
                  </Button>
                  <Button 
                    variant={selectedFilter === "culture" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedFilter("culture")}
                    className={selectedFilter === "culture" ? "bg-bellboy hover:bg-bellboy-light" : ""}
                  >
                    Culture
                  </Button>
                  <Button 
                    variant={selectedFilter === "exclusive" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedFilter("exclusive")}
                    className={selectedFilter === "exclusive" ? "bg-bellboy hover:bg-bellboy-light" : ""}
                  >
                    Exclusive
                  </Button>
                </div>

                <div className="space-y-6">
                  <h2 className="text-xl font-serif font-semibold">Recommended Experiences</h2>
                  
                  <div className="space-y-4">
                    {filteredServices.map((service) => (
                      <div 
                        key={service.id} 
                        className="relative bg-white rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className={`flex flex-col ${isMobile ? "" : "md:flex-row"}`}>
                          <div className={`${isMobile ? "w-full" : "md:w-1/3"} h-48 md:h-auto relative`}>
                            <img 
                              src={service.image} 
                              alt={service.title} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                              {service.price}
                            </div>
                          </div>
                          <div className={`p-4 ${isMobile ? "w-full" : "md:w-2/3"} flex flex-col justify-between`}>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-bellboy-accent rounded-full text-bellboy">
                                  {service.icon}
                                </div>
                                <h3 className="font-serif text-lg font-medium">{service.title}</h3>
                              </div>
                              
                              <p className="text-muted-foreground mb-3">{service.description}</p>
                              
                              <div className={`${isMobile ? "flex flex-col gap-2" : "flex items-center gap-4"} text-sm`}>
                                <div className="flex items-center">
                                  <Calendar size={14} className="mr-1 text-bellboy" />
                                  <span>{service.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Star size={14} className="mr-1 text-bellboy" />
                                  <span className={isMobile ? "line-clamp-1" : ""}>{service.location}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className={`${isMobile ? "flex flex-col gap-3" : "flex justify-between items-center"} mt-4`}>
                              <div className="flex flex-wrap gap-2">
                                {service.tags.map(tag => (
                                  <span key={tag} className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <Button 
                                size="sm" 
                                className="bg-bellboy hover:bg-bellboy-light"
                                onClick={() => handleBookService(service.id)}
                              >
                                Book Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="chat" className="mt-6">
            <VirtualConciergeChat />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default VirtualConcierge;
