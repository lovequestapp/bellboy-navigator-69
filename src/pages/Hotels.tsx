
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, Search, Filter, X } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import HotelCard from "@/components/ui/HotelCard";
import HotelDetailView from "@/components/ui/HotelDetailView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  getUpcomingHotels, 
  getPastHotels, 
  getHotelById, 
  cancelReservation, 
  searchHotels,
  Hotel
} from "@/services/hotelService";
import { useToast } from "@/hooks/use-toast";

type FilterStatus = "upcoming" | "past" | "all";

const Hotels: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterStatus>("upcoming");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string | null>(null);
  
  // Get hotels based on status and search query
  const getFilteredHotels = () => {
    let hotels: Hotel[] = [];
    
    // First filter by status
    if (activeTab === "upcoming") {
      hotels = getUpcomingHotels();
    } else if (activeTab === "past") {
      hotels = getPastHotels();
    } else {
      hotels = [...getUpcomingHotels(), ...getPastHotels()];
    }
    
    // Then apply search if there's a query
    if (searchQuery.trim()) {
      hotels = hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting if selected
    if (sortOption) {
      switch (sortOption) {
        case "name-asc":
          hotels.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "name-desc":
          hotels.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "date-asc":
          hotels.sort((a, b) => new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime());
          break;
        case "date-desc":
          hotels.sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime());
          break;
        default:
          break;
      }
    }
    
    return hotels;
  };
  
  const filteredHotels = getFilteredHotels();
  
  const handleHotelClick = (hotelId: string) => {
    const hotel = getHotelById(hotelId);
    if (hotel) {
      setSelectedHotel(hotel);
      setIsDetailViewOpen(true);
    }
  };
  
  const handleCancelReservation = (hotelId: string) => {
    const success = cancelReservation(hotelId);
    if (success) {
      toast({
        title: "Reservation Cancelled",
        description: "Your hotel reservation has been successfully cancelled.",
      });
    } else {
      toast({
        title: "Error",
        description: "There was a problem cancelling your reservation. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const clearSearch = () => {
    setSearchQuery("");
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSortOption(null);
    setActiveTab("upcoming");
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as FilterStatus);
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* Search and filter section */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search hotels by name or location..."
              className="pl-10 pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={clearSearch}
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full max-w-[400px]">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
                <TabsTrigger value="all">All Stays</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              {(searchQuery || sortOption || activeTab !== "upcoming") && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs">
                  Clear Filters
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortOption("name-asc")}>
                    Name (A-Z)
                    {sortOption === "name-asc" && <Badge className="ml-2 bg-bellboy">Active</Badge>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("name-desc")}>
                    Name (Z-A)
                    {sortOption === "name-desc" && <Badge className="ml-2 bg-bellboy">Active</Badge>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("date-asc")}>
                    Date (Earliest First)
                    {sortOption === "date-asc" && <Badge className="ml-2 bg-bellboy">Active</Badge>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortOption("date-desc")}>
                    Date (Latest First)
                    {sortOption === "date-desc" && <Badge className="ml-2 bg-bellboy">Active</Badge>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        {/* Add new stay button */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-semibold">
            {activeTab === "upcoming" ? "Upcoming Stays" : 
             activeTab === "past" ? "Past Stays" : "All Hotel Stays"}
          </h2>
          <Button 
            variant="outline" 
            className="flex items-center text-sm"
            onClick={() => navigate("/check-in")}
          >
            <Calendar size={16} className="mr-1" />
            <span>Add New</span>
          </Button>
        </div>
        
        {/* Hotels list */}
        {filteredHotels.length > 0 ? (
          <div className="space-y-4">
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onClick={() => handleHotelClick(hotel.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bellboy-card text-center p-8">
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "No hotels found matching your search criteria" 
                : activeTab === "upcoming" 
                  ? "No upcoming stays found" 
                  : "No past stays found"}
            </p>
            <Button 
              className="bg-bellboy hover:bg-bellboy-light"
              onClick={() => navigate("/check-in")}
            >
              {searchQuery ? "Clear Search & Add Stay" : "Add Your First Stay"}
            </Button>
          </div>
        )}
        
        {/* View all past stays link */}
        {activeTab === "upcoming" && getPastHotels().length > 0 && (
          <div className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif font-semibold">Past Stays</h2>
              <button 
                className="text-bellboy flex items-center text-sm"
                onClick={() => setActiveTab("past")}
              >
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
            
            <div className="space-y-4">
              {getPastHotels().slice(0, 1).map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onClick={() => handleHotelClick(hotel.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Hotel detail view */}
      <HotelDetailView 
        hotel={selectedHotel} 
        isOpen={isDetailViewOpen} 
        onClose={() => setIsDetailViewOpen(false)}
        onCancel={handleCancelReservation}
        onModify={(hotelId) => {
          toast({
            title: "Modification Requested",
            description: "This feature will be available soon.",
          });
        }}
      />
    </PageContainer>
  );
};

export default Hotels;
