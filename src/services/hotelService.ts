
import { toast } from "@/hooks/use-toast";

export interface Hotel {
  id: string;
  name: string;
  location: string;
  checkIn: string;
  checkOut: string;
  image: string;
  description?: string;
  amenities?: string[];
  price?: string;
  rating?: number;
  roomType?: string;
  status?: "upcoming" | "active" | "past";
}

// Mock data for hotels with dates relevant to 2025
const upcomingHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Majestic Hotel",
    location: "New York, NY",
    checkIn: "Apr 15, 2025",
    checkOut: "Apr 20, 2025",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Experience luxury in the heart of Manhattan with stunning city views and world-class amenities.",
    amenities: ["Free Wi-Fi", "Pool", "Spa", "Fitness Center", "Restaurant"],
    price: "$350/night",
    rating: 4.7,
    roomType: "Deluxe King Suite",
    status: "upcoming"
  },
  {
    id: "2",
    name: "Seaside Resort & Spa",
    location: "Miami, FL",
    checkIn: "Jun 23, 2025",
    checkOut: "Jun 30, 2025",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Beachfront paradise with private balconies and exceptional ocean views.",
    amenities: ["Beach Access", "Spa", "Pool", "Free Breakfast", "Water Sports"],
    price: "$420/night",
    rating: 4.5,
    roomType: "Ocean View Suite",
    status: "upcoming"
  },
  {
    id: "3",
    name: "Urban Boutique Hotel",
    location: "Chicago, IL",
    checkIn: "May 10, 2025",
    checkOut: "May 15, 2025",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Stylish urban retreat with designer interiors and personalized service.",
    amenities: ["Free Wi-Fi", "Lounge", "Bike Rental", "Restaurant", "Concierge"],
    price: "$280/night",
    rating: 4.3,
    roomType: "Designer Loft",
    status: "upcoming"
  },
];

const pastHotels: Hotel[] = [
  {
    id: "4",
    name: "Mountain View Lodge",
    location: "Aspen, CO",
    checkIn: "Jan 5, 2025",
    checkOut: "Jan 10, 2025",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Rustic elegance with breathtaking mountain views and ski-in/ski-out access.",
    amenities: ["Fireplace", "Hot Tub", "Ski Storage", "Shuttle", "Restaurant"],
    price: "$400/night",
    rating: 4.8,
    roomType: "Mountain Suite",
    status: "past"
  },
  {
    id: "5",
    name: "Riverside Inn",
    location: "Portland, OR",
    checkIn: "Feb 15, 2025",
    checkOut: "Feb 18, 2025",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Charming property nestled along the scenic river with farm-to-table dining.",
    amenities: ["River Views", "Organic Breakfast", "Kayaking", "Garden", "Bicycles"],
    price: "$230/night",
    rating: 4.5,
    roomType: "Riverside King",
    status: "past"
  },
];

// Functions to manage hotels
export const getUpcomingHotels = (): Hotel[] => {
  return upcomingHotels;
};

export const getPastHotels = (): Hotel[] => {
  return pastHotels;
};

export const getAllHotels = (): Hotel[] => {
  return [...upcomingHotels, ...pastHotels];
};

export const getHotelById = (id: string): Hotel | undefined => {
  return getAllHotels().find(hotel => hotel.id === id);
};

export const searchHotels = (query: string): Hotel[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllHotels().filter(hotel => 
    hotel.name.toLowerCase().includes(lowercaseQuery) || 
    hotel.location.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterHotelsByStatus = (status: "upcoming" | "past" | "all"): Hotel[] => {
  if (status === "all") return getAllHotels();
  return getAllHotels().filter(hotel => hotel.status === status);
};

export const cancelReservation = (hotelId: string): boolean => {
  const hotelIndex = upcomingHotels.findIndex(hotel => hotel.id === hotelId);
  if (hotelIndex !== -1) {
    upcomingHotels.splice(hotelIndex, 1);
    toast({
      title: "Reservation Cancelled",
      description: "Your hotel reservation has been successfully cancelled.",
    });
    return true;
  }
  return false;
};

export const addNewHotelStay = (hotel: Omit<Hotel, "id" | "status">): Hotel => {
  const newHotel: Hotel = {
    ...hotel,
    id: `${upcomingHotels.length + pastHotels.length + 1}`,
    status: "upcoming"
  };
  upcomingHotels.push(newHotel);
  toast({
    title: "Stay Added",
    description: "Your new hotel stay has been successfully added.",
  });
  return newHotel;
};
