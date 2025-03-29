
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Clock, ExternalLink, Phone, Globe } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Mock data for all place types
const allPlaces = {
  restaurants: [
    {
      id: "r1",
      name: "Le Bistro Parisien",
      category: "French Restaurant",
      distance: "0.3 miles",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      description: "Experience authentic French cuisine in an elegant setting with a menu that changes seasonally to highlight the best ingredients.",
      address: "123 Fifth Avenue, New York, NY 10010",
      hours: "Mon-Sat: 11am-10pm, Sun: 11am-9pm",
      phone: "+1 (212) 555-1234",
      website: "https://lebistroparisien.example.com",
      priceRange: "$$$",
      popularDishes: ["Coq au Vin", "Beef Bourguignon", "Crème Brûlée"],
    },
    {
      id: "r2",
      name: "Sakura Sushi",
      category: "Japanese Restaurant",
      distance: "0.7 miles",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.5,
      description: "Premium sushi and Japanese specialties using the freshest fish, imported directly from Tokyo's fish market every morning.",
      address: "456 Madison Avenue, New York, NY 10022",
      hours: "Daily: 12pm-11pm",
      phone: "+1 (212) 555-5678",
      website: "https://sakurasushi.example.com",
      priceRange: "$$",
      popularDishes: ["Dragon Roll", "Fatty Tuna Sashimi", "Tempura Udon"],
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
      description: "One of the world's largest and most influential museums of modern and contemporary art, featuring works by Van Gogh, Picasso, Warhol, and more.",
      address: "11 West 53rd Street, New York, NY 10019",
      hours: "Sat-Thu: 10am-5:30pm, Fri: 10am-8pm",
      phone: "+1 (212) 708-9400",
      website: "https://www.moma.org",
      ticketPrice: "$25 for adults, free for members and children under 16",
      currentExhibitions: ["Contemporary Photography", "Abstract Expressionism", "Design Innovation"],
    },
    {
      id: "a2",
      name: "Central Park",
      category: "Park",
      distance: "0.5 miles",
      image: "https://images.unsplash.com/photo-1534251369789-5067c8b8602a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      description: "An urban oasis in the heart of Manhattan, offering beautiful landscapes, recreational activities, and seasonal events throughout the year.",
      address: "Central Park, New York, NY",
      hours: "Daily: 6am-1am",
      phone: "+1 (212) 310-6600",
      website: "https://www.centralparknyc.org",
      attractions: ["Bethesda Fountain", "Strawberry Fields", "The Mall", "Belvedere Castle"],
      activities: ["Boating", "Biking", "Ice Skating (seasonal)", "Horse Carriage Rides"],
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
      description: "The world's premier shopping street, featuring flagship stores of luxury brands, department stores, and specialty boutiques.",
      address: "Fifth Avenue, New York, NY",
      hours: "Most stores: Mon-Sat: 10am-8pm, Sun: 11am-7pm",
      website: "https://www.fifthavenue.nyc",
      notableStores: ["Saks Fifth Avenue", "Tiffany & Co.", "Apple Store", "Bergdorf Goodman"],
    },
    {
      id: "s2",
      name: "Luxury Boutique Mall",
      category: "Shopping Mall",
      distance: "1.5 miles",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
      description: "A curated collection of high-end boutiques, designer stores, and luxury services in an elegant indoor shopping environment.",
      address: "10 Columbus Circle, New York, NY 10019",
      hours: "Mon-Sat: 10am-9pm, Sun: 11am-7pm",
      phone: "+1 (212) 823-6300",
      website: "https://luxurymall.example.com",
      stores: ["Gucci", "Louis Vuitton", "Dior", "Fendi", "Prada"],
      services: ["Personal Shopping", "Valet Parking", "Concierge"],
    },
  ],
};

// Helper function to find a place by ID across all categories
const findPlaceById = (placeId: string) => {
  for (const category in allPlaces) {
    const foundPlace = allPlaces[category as keyof typeof allPlaces].find(
      (place) => place.id === placeId
    );
    if (foundPlace) return foundPlace;
  }
  return null;
};

const PlaceDetails: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const place = placeId ? findPlaceById(placeId) : null;
  
  if (!place) {
    return (
      <PageContainer showBackButton>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="text-xl font-serif font-medium mb-4">Place not found</h2>
          <Button onClick={() => navigate("/explore")}>
            Return to Explore
          </Button>
        </div>
      </PageContainer>
    );
  }

  // Handle reservation/booking
  const handleBooking = () => {
    toast({
      title: "Booking Requested",
      description: `Your request for ${place.name} has been received. We'll confirm shortly.`,
    });
  };

  // Handle saving to favorites
  const handleSaveToFavorites = () => {
    toast({
      title: "Added to Favorites",
      description: `${place.name} has been added to your favorites.`,
    });
  };

  return (
    <PageContainer showBackButton>
      <div className="space-y-6 animate-fade-in">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium flex items-center">
            <Star size={16} className="mr-1.5 text-bellboy-gold fill-bellboy-gold" />
            {place.rating}/5
          </div>
        </div>

        {/* Place Info */}
        <div>
          <h1 className="text-2xl font-serif font-semibold">{place.name}</h1>
          <div className="flex items-center mt-2 text-muted-foreground">
            <MapPin size={16} className="mr-1.5 text-bellboy" />
            <span>{place.address} • {place.distance} away</span>
          </div>
        </div>

        {/* Description */}
        <div className="bellboy-card">
          <h2 className="text-lg font-serif font-medium mb-2">About</h2>
          <p className="text-muted-foreground">{place.description}</p>
        </div>

        {/* Details */}
        <div className="bellboy-card">
          <h2 className="text-lg font-serif font-medium mb-4">Details</h2>
          
          {place.hours && (
            <div className="flex items-start mb-3">
              <Clock size={18} className="mr-3 text-bellboy mt-0.5" />
              <div>
                <p className="font-medium">Opening Hours</p>
                <p className="text-sm text-muted-foreground">{place.hours}</p>
              </div>
            </div>
          )}
          
          {place.phone && (
            <div className="flex items-start mb-3">
              <Phone size={18} className="mr-3 text-bellboy mt-0.5" />
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-sm text-muted-foreground">{place.phone}</p>
              </div>
            </div>
          )}
          
          {place.website && (
            <div className="flex items-start mb-3">
              <Globe size={18} className="mr-3 text-bellboy mt-0.5" />
              <div>
                <p className="font-medium">Website</p>
                <a 
                  href={place.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-bellboy flex items-center hover:underline"
                >
                  Visit website <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
          )}
          
          {/* Category specific details */}
          {'priceRange' in place && (
            <div className="mt-4">
              <p className="font-medium">Price Range</p>
              <p className="text-sm text-muted-foreground">{place.priceRange}</p>
            </div>
          )}
          
          {'popularDishes' in place && place.popularDishes && (
            <div className="mt-4">
              <p className="font-medium">Popular Dishes</p>
              <ul className="text-sm text-muted-foreground mt-1 ml-5 list-disc">
                {place.popularDishes.map((dish, index) => (
                  <li key={index}>{dish}</li>
                ))}
              </ul>
            </div>
          )}
          
          {'ticketPrice' in place && (
            <div className="mt-4">
              <p className="font-medium">Admission</p>
              <p className="text-sm text-muted-foreground">{place.ticketPrice}</p>
            </div>
          )}
          
          {'notableStores' in place && place.notableStores && (
            <div className="mt-4">
              <p className="font-medium">Notable Stores</p>
              <p className="text-sm text-muted-foreground">
                {place.notableStores.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3">
          <Button className="w-full bg-bellboy hover:bg-bellboy-light text-white" onClick={handleBooking}>
            {place.category.includes("Restaurant") ? "Reserve a Table" : 
             place.category.includes("Museum") ? "Book Tickets" : 
             "Plan a Visit"}
          </Button>
          <Button variant="outline" className="w-full" onClick={handleSaveToFavorites}>
            Save to Favorites
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default PlaceDetails;
