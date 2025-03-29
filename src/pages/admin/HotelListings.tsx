
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Edit, 
  ImagePlus, 
  MoreHorizontal, 
  Plus, 
  Search, 
  Star, 
  Trash
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Mock hotel data
const hotelData = [
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

const HotelListings = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredHotels, setFilteredHotels] = React.useState(hotelData);
  const [isAddHotelOpen, setIsAddHotelOpen] = React.useState(false);
  const [editingHotel, setEditingHotel] = React.useState<typeof hotelData[0] | null>(null);

  // Filter hotels based on search term
  React.useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredHotels(hotelData);
    } else {
      const filtered = hotelData.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredHotels(filtered);
    }
  }, [searchTerm]);

  // Form for adding/editing a hotel
  const form = useForm({
    defaultValues: {
      name: "",
      location: "",
      description: "",
      starRating: 4,
      featured: false,
      status: "active",
    },
  });

  React.useEffect(() => {
    if (editingHotel) {
      form.reset({
        name: editingHotel.name,
        location: editingHotel.location,
        description: editingHotel.description,
        starRating: editingHotel.starRating,
        featured: editingHotel.featured,
        status: editingHotel.status,
      });
    } else {
      form.reset({
        name: "",
        location: "",
        description: "",
        starRating: 4,
        featured: false,
        status: "active",
      });
    }
  }, [editingHotel, form]);

  const onSubmit = (data: any) => {
    // In a real app, this would call an API
    const action = editingHotel ? "updated" : "created";
    const hotelName = data.name;
    
    toast({
      title: `Hotel ${action}`,
      description: `${hotelName} has been ${action} successfully.`,
    });
    
    setIsAddHotelOpen(false);
    setEditingHotel(null);
    form.reset();
  };

  const handleEditHotel = (hotelId: string) => {
    const hotel = hotelData.find((h) => h.id === hotelId);
    if (hotel) {
      setEditingHotel(hotel);
      setIsAddHotelOpen(true);
    }
  };

  const handleDeleteHotel = (hotelId: string) => {
    const hotel = hotelData.find((h) => h.id === hotelId);
    
    if (hotel) {
      // In a real app, this would call an API
      toast({
        title: "Hotel deleted",
        description: `${hotel.name} has been deleted.`,
        variant: "destructive",
      });
    }
  };

  const handleToggleFeatured = (hotelId: string) => {
    const hotel = hotelData.find((h) => h.id === hotelId);
    
    if (hotel) {
      const newStatus = !hotel.featured;
      const actionText = newStatus ? "featured" : "unfeatured";
      
      // In a real app, this would call an API
      toast({
        title: `Hotel ${actionText}`,
        description: `${hotel.name} has been ${actionText}.`,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>;
      case "maintenance":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">Maintenance</Badge>;
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout currentPage="/admin/hotels">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Hotel Listings</h1>
          <p className="text-slate-500">Manage hotel properties and details</p>
        </div>
        <Button 
          onClick={() => {
            setEditingHotel(null);
            setIsAddHotelOpen(true);
          }}
          className="mt-4 sm:mt-0"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Hotel
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>All Hotels</CardTitle>
          <CardDescription>
            Manage hotel listings, features, and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search hotels..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <div className="font-medium">{hotel.name}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[240px]">
                        {hotel.description.substring(0, 60)}...
                      </div>
                    </TableCell>
                    <TableCell>{hotel.location}</TableCell>
                    <TableCell>
                      <div className="flex">
                        {[...Array(hotel.starRating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - hotel.starRating)].map((_, i) => (
                          <Star key={i + hotel.starRating} className="h-4 w-4 text-gray-300" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(hotel.status)}</TableCell>
                    <TableCell>
                      {hotel.featured ? (
                        <Badge variant="default" className="bg-blue-600">Featured</Badge>
                      ) : (
                        <Badge variant="outline">Not Featured</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditHotel(hotel.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ImagePlus className="mr-2 h-4 w-4" />
                            Manage images
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleToggleFeatured(hotel.id)}>
                            {hotel.featured ? "Remove from featured" : "Add to featured"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteHotel(hotel.id)}
                            className="text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete hotel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Hotel Dialog */}
      <Dialog open={isAddHotelOpen} onOpenChange={setIsAddHotelOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingHotel ? "Edit Hotel" : "Add New Hotel"}</DialogTitle>
            <DialogDescription>
              {editingHotel 
                ? "Update the details for this hotel property" 
                : "Fill in the details to add a new hotel property"}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hotel Name</FormLabel>
                    <FormControl>
                      <Input placeholder="The Grand Hotel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="City, State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the hotel and its unique features..." 
                        className="resize-none" 
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="starRating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Star Rating</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          max={5}
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          {...field}
                        >
                          <option value="active">Active</option>
                          <option value="maintenance">Maintenance</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Featured Hotel</FormLabel>
                      <FormDescription>
                        Display this hotel prominently on the homepage and in search results
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">{editingHotel ? "Update Hotel" : "Add Hotel"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default HotelListings;
