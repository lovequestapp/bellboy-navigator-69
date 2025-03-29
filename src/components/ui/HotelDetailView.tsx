
import React from "react";
import { Hotel } from "@/services/hotelService";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Star, Utensils, Wifi, Dumbbell, Coffee, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface HotelDetailViewProps {
  hotel: Hotel | null;
  isOpen: boolean;
  onClose: () => void;
  onCancel?: (hotelId: string) => void;
  onModify?: (hotelId: string) => void;
}

const HotelDetailView: React.FC<HotelDetailViewProps> = ({ 
  hotel, 
  isOpen, 
  onClose,
  onCancel,
  onModify
}) => {
  const { toast } = useToast();

  if (!hotel) return null;

  const handleModify = () => {
    if (onModify) {
      onModify(hotel.id);
    } else {
      toast({
        title: "Modification Requested",
        description: "This feature will be available soon.",
      });
    }
    onClose();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(hotel.id);
    } else {
      toast({
        title: "Cancellation Requested",
        description: "This feature will be available soon.",
      });
    }
    onClose();
  };

  const getAmenityIcon = (amenity: string) => {
    const lowercaseAmenity = amenity.toLowerCase();
    if (lowercaseAmenity.includes("wifi")) return <Wifi size={16} />;
    if (lowercaseAmenity.includes("breakfast") || lowercaseAmenity.includes("restaurant")) return <Utensils size={16} />;
    if (lowercaseAmenity.includes("fitness") || lowercaseAmenity.includes("gym")) return <Dumbbell size={16} />;
    if (lowercaseAmenity.includes("coffee")) return <Coffee size={16} />;
    if (lowercaseAmenity.includes("parking") || lowercaseAmenity.includes("shuttle")) return <Car size={16} />;
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">{hotel.name}</DialogTitle>
          <DialogDescription className="flex items-center text-foreground">
            <MapPin size={16} className="mr-1 text-bellboy" />
            {hotel.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="w-full h-48 overflow-hidden rounded-md mb-4">
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            {hotel.rating && (
              <div className="flex items-center">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={16} 
                      className={`${star <= Math.round(hotel.rating!) ? "text-bellboy-gold fill-bellboy-gold" : "text-gray-300"} mr-1`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{hotel.rating} out of 5</span>
              </div>
            )}
            
            <div>
              <h3 className="font-medium mb-2">Stay Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-bellboy" />
                  <div>
                    <p className="text-muted-foreground">Check-in</p>
                    <p>{hotel.checkIn}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-bellboy" />
                  <div>
                    <p className="text-muted-foreground">Check-out</p>
                    <p>{hotel.checkOut}</p>
                  </div>
                </div>
                {hotel.roomType && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Room Type</p>
                    <p>{hotel.roomType}</p>
                  </div>
                )}
                {hotel.price && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Rate</p>
                    <p className="font-medium text-bellboy">{hotel.price}</p>
                  </div>
                )}
              </div>
            </div>
            
            {hotel.description && (
              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{hotel.description}</p>
              </div>
            )}
            
            {hotel.amenities && hotel.amenities.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1 py-1">
                      {getAmenityIcon(amenity)}
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {hotel.status === "upcoming" && (
            <>
              <Button variant="outline" onClick={handleModify}>
                Modify Reservation
              </Button>
              <Button variant="destructive" onClick={handleCancel}>
                Cancel Reservation
              </Button>
            </>
          )}
          <Button className="bg-bellboy hover:bg-bellboy-light ml-auto" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HotelDetailView;
