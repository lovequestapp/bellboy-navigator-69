
import React, { useState } from "react";
import { MapPin, Search } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ExploreCard from "@/components/ui/ExploreCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data
const places = {
  restaurants: [
    {
      id: "r1",
      name: "Le Bistro Parisien",
      category: "French Restaurant",
      distance: "0.3 miles",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
    },
    {
      id: "r2",
      name: "Sakura Sushi",
      category: "Japanese Restaurant",
      distance: "0.7 miles",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
    },
  ],
  attractions: [
    {
      id: "a1",
      name: "Museum of Modern Art",
      category: "Museum",
      distance: "1.2 miles",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
    },
    {
      id: "a2",
      name: "Central Park",
      category: "Park",
      distance: "0.5 miles",
      image: "https://images.unsplash.com/photo-1534251369789-5067c8b8602a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
    },
  ],
  shopping: [
    {
      id: "s1",
      name: "Fifth Avenue Shops",
      category: "Shopping District",
      distance: "0.8 miles",
      image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
    },
    {
      id: "s2",
      name: "Luxury Boutique Mall",
      category: "Shopping Mall",
      distance: "1.5 miles",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
    },
  ],
};

const Explore: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handlePlaceClick = (placeId: string) => {
    console.log("Place clicked:", placeId);
    // Navigate to place detail page
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search places, restaurants, attractions..."
            className="pl-10 pr-4 py-6"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bellboy-card bg-bellboy text-white mb-6 flex items-center">
          <div className="flex-1">
            <h2 className="text-lg font-serif font-semibold">Explore New York City</h2>
            <p className="text-white/80 text-sm">Discover places near your hotel</p>
          </div>
          <div className="flex items-center">
            <MapPin size={20} className="mr-1" />
            <span className="text-sm">0.3 mi radius</span>
          </div>
        </div>
        
        <Tabs defaultValue="restaurants">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="restaurants">Dining</TabsTrigger>
            <TabsTrigger value="attractions">Attractions</TabsTrigger>
            <TabsTrigger value="shopping">Shopping</TabsTrigger>
          </TabsList>
          
          <TabsContent value="restaurants" className="space-y-4">
            <h2 className="text-xl font-serif font-semibold mb-4">Recommended Restaurants</h2>
            {places.restaurants.map((place) => (
              <ExploreCard
                key={place.id}
                place={place}
                onClick={handlePlaceClick}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="attractions" className="space-y-4">
            <h2 className="text-xl font-serif font-semibold mb-4">Popular Attractions</h2>
            {places.attractions.map((place) => (
              <ExploreCard
                key={place.id}
                place={place}
                onClick={handlePlaceClick}
              />
            ))}
          </TabsContent>
          
          <TabsContent value="shopping" className="space-y-4">
            <h2 className="text-xl font-serif font-semibold mb-4">Shopping Destinations</h2>
            {places.shopping.map((place) => (
              <ExploreCard
                key={place.id}
                place={place}
                onClick={handlePlaceClick}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Explore;
