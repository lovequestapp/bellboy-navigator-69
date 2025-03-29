
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import ExploreCard from "@/components/ui/ExploreCard";
import { Input } from "@/components/ui/input";

interface Place {
  id: string;
  name: string;
  category: string;
  distance: string;
  image: string;
  rating: number;
}

interface PlacesData {
  restaurants: Place[];
  attractions: Place[];
  shopping: Place[];
}

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<keyof PlacesData>("restaurants");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [places, setPlaces] = useState<PlacesData>({
    restaurants: [
      {
        id: "r1",
        name: "The Grand Restaurant",
        category: "Fine Dining",
        distance: "0.3 miles",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4.8,
      },
      {
        id: "r2",
        name: "Coastal Seafood",
        category: "Seafood",
        distance: "0.7 miles",
        image: "https://images.unsplash.com/photo-1615361200141-f45961202b05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4.6,
      },
    ],
    attractions: [
      {
        id: "a1",
        name: "City Museum",
        category: "Museum",
        distance: "1.2 miles",
        image: "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4.7,
      },
      {
        id: "a2",
        name: "Botanical Gardens",
        category: "Nature",
        distance: "2.5 miles",
        image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4.9,
      },
    ],
    shopping: [
      {
        id: "s1",
        name: "Luxury Mall",
        category: "Shopping Center",
        distance: "0.9 miles",
        image: "https://images.unsplash.com/photo-1609942072337-43aac6abcbbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4.5,
      },
      {
        id: "s2",
        name: "Artisan Boutique",
        category: "Boutique",
        distance: "1.4 miles",
        image: "https://images.unsplash.com/photo-1612130556996-dc7f178bf7d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        rating: 4.4,
      },
    ],
  });

  const [filteredPlaces, setFilteredPlaces] = useState<PlacesData>(places);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPlaces(places);
    } else {
      const query = searchQuery.toLowerCase();
      
      const filtered: PlacesData = {
        restaurants: places.restaurants.filter(
          (place) =>
            place.name.toLowerCase().includes(query) ||
            place.category.toLowerCase().includes(query)
        ),
        attractions: places.attractions.filter(
          (place) =>
            place.name.toLowerCase().includes(query) ||
            place.category.toLowerCase().includes(query)
        ),
        shopping: places.shopping.filter(
          (place) =>
            place.name.toLowerCase().includes(query) ||
            place.category.toLowerCase().includes(query)
        ),
      };
      
      setFilteredPlaces(filtered);
    }
  }, [searchQuery, places]);

  const handlePlaceClick = (placeId: string) => {
    console.info("Place clicked:", placeId);
    navigate(`/explore/${placeId}`);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search places, categories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex border-b overflow-x-auto no-scrollbar">
          {(Object.keys(places) as Array<keyof PlacesData>).map((category) => (
            <button
              key={category}
              className={`py-3 px-4 font-serif text-sm font-medium whitespace-nowrap ${
                activeTab === category
                  ? "text-bellboy border-b-2 border-bellboy"
                  : "text-muted-foreground hover:text-bellboy-light"
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlaces[activeTab].map((place) => (
            <ExploreCard
              key={place.id}
              place={place}
              onClick={handlePlaceClick}
            />
          ))}
        </div>

        {filteredPlaces[activeTab].length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No places found matching your search.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Explore;
