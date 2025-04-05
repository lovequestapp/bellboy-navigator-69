
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  starRating: number;
  amenities?: string[];
  images?: string[];
  status: "active" | "maintenance" | "inactive";
  featured: boolean;
}

// Initial hotel data
const initialHotels: Hotel[] = [
  {
    id: "h1",
    name: "The Grand Hotel",
    location: "New York, NY",
    description: "A luxurious 5-star hotel in the heart of Manhattan with stunning views of Central Park.",
    starRating: 5,
    amenities: ["Pool", "Spa", "Gym", "Restaurant", "Bar", "Room Service", "WiFi", "Parking"],
    images: ["grand_hotel_1.jpg", "grand_hotel_2.jpg", "grand_hotel_3.jpg"],
    status: "active",
    featured: true
  },
  {
    id: "h2",
    name: "Seaside Resort",
    location: "Miami, FL",
    description: "A beautiful beachfront resort with private access to white sand beaches and crystal clear waters.",
    starRating: 4,
    amenities: ["Beach Access", "Pool", "Restaurant", "Bar", "WiFi", "Parking"],
    images: ["seaside_resort_1.jpg", "seaside_resort_2.jpg"],
    status: "active",
    featured: true
  },
  {
    id: "h3",
    name: "Mountain Lodge",
    location: "Aspen, CO",
    description: "A cozy mountain lodge perfect for ski vacations with direct access to ski slopes.",
    starRating: 4,
    amenities: ["Ski-in/Ski-out", "Fireplace", "Hot Tub", "Restaurant", "Bar", "WiFi"],
    images: ["mountain_lodge_1.jpg", "mountain_lodge_2.jpg"],
    status: "active",
    featured: false
  },
  {
    id: "h4",
    name: "City Center Hotel",
    location: "Chicago, IL",
    description: "A modern hotel located in downtown Chicago, close to major attractions and business districts.",
    starRating: 3,
    amenities: ["Business Center", "Restaurant", "Gym", "WiFi", "Parking"],
    images: ["city_center_1.jpg"],
    status: "active",
    featured: false
  },
  {
    id: "h5",
    name: "Sunset Inn",
    location: "San Diego, CA",
    description: "A charming boutique hotel offering beautiful sunset views over the Pacific Ocean.",
    starRating: 4,
    amenities: ["Ocean View", "Pool", "Restaurant", "Bar", "WiFi", "Parking"],
    images: ["sunset_inn_1.jpg", "sunset_inn_2.jpg"],
    status: "maintenance",
    featured: false
  },
  {
    id: "h6",
    name: "Historic Mansion Hotel",
    location: "Boston, MA",
    description: "An elegant hotel housed in a restored 19th century mansion with period decor and modern amenities.",
    starRating: 4,
    amenities: ["Garden", "Library", "Restaurant", "Bar", "WiFi", "Parking"],
    images: ["historic_mansion_1.jpg"],
    status: "active",
    featured: true
  }
];

// Function to simulate an async API call
const simulateApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export function useHotels() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load hotels on initial render
    const loadHotels = async () => {
      setIsLoading(true);
      try {
        // Simulate API fetch
        const data = await simulateApiCall(initialHotels, 800);
        setHotels(data);
      } catch (error) {
        console.error("Failed to load hotels:", error);
        toast({
          title: "Failed to load hotels",
          description: "Please refresh the page and try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadHotels();
  }, []);

  const addHotel = async (hotelData: Omit<Hotel, "id" | "images" | "amenities">): Promise<Hotel> => {
    // Create a new hotel object
    const newHotel: Hotel = {
      ...hotelData,
      id: `h${Date.now()}`, // Generate a unique ID
      images: [],
      amenities: [],
    };

    try {
      // Simulate API call to add hotel
      await simulateApiCall(null, 800);
      
      // Update state
      setHotels((prev) => [...prev, newHotel]);
      return newHotel;
    } catch (error) {
      console.error("Failed to add hotel:", error);
      throw new Error("Failed to add hotel");
    }
  };

  const updateHotel = async (hotelData: Partial<Hotel> & { id: string }): Promise<Hotel> => {
    try {
      // Simulate API call to update hotel
      await simulateApiCall(null, 800);
      
      // Update state
      setHotels((prev) =>
        prev.map((hotel) =>
          hotel.id === hotelData.id ? { ...hotel, ...hotelData } : hotel
        )
      );
      
      const updatedHotel = hotels.find((h) => h.id === hotelData.id);
      if (!updatedHotel) {
        throw new Error("Hotel not found");
      }
      
      return { ...updatedHotel, ...hotelData };
    } catch (error) {
      console.error("Failed to update hotel:", error);
      throw new Error("Failed to update hotel");
    }
  };

  const deleteHotel = async (hotelId: string): Promise<void> => {
    try {
      // Simulate API call to delete hotel
      await simulateApiCall(null, 800);
      
      // Update state
      setHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
    } catch (error) {
      console.error("Failed to delete hotel:", error);
      throw new Error("Failed to delete hotel");
    }
  };

  const toggleFeatured = async (hotelId: string, featured: boolean): Promise<void> => {
    try {
      // Simulate API call to update featured status
      await simulateApiCall(null, 500);
      
      // Update state
      setHotels((prev) =>
        prev.map((hotel) =>
          hotel.id === hotelId ? { ...hotel, featured } : hotel
        )
      );
    } catch (error) {
      console.error("Failed to update featured status:", error);
      throw new Error("Failed to update featured status");
    }
  };

  return { 
    hotels, 
    isLoading, 
    addHotel, 
    updateHotel, 
    deleteHotel, 
    toggleFeatured 
  };
}
