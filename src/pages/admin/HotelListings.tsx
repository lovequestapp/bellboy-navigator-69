
import React, { useState, useEffect } from "react";
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
  Trash,
  Loader2
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
import { useHotels } from "@/hooks/useHotels";

const HotelListings = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isAddHotelOpen, setIsAddHotelOpen] = React.useState(false);
  const [editingHotel, setEditingHotel] = React.useState(null);
  const [isProcessing, setIsProcessing] = React.useState(false);
  
  const { 
    hotels, 
    isLoading, 
    addHotel, 
    updateHotel, 
    deleteHotel, 
    toggleFeatured 
  } = useHotels();

  // Filter hotels based on search term
  const filteredHotels = React.useMemo(() => {
    if (searchTerm.trim() === "") {
      return hotels;
    }
    
    return hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hotels, searchTerm]);

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

  const onSubmit = async (data) => {
    setIsProcessing(true);
    
    try {
      if (editingHotel) {
        await updateHotel({
          ...data,
          id: editingHotel.id,
        });
        
        toast({
          title: "Hotel updated",
          description: `${data.name} has been updated successfully.`,
        });
      } else {
        await addHotel(data);
        
        toast({
          title: "Hotel created",
          description: `${data.name} has been created successfully.`,
        });
      }
      
      setIsAddHotelOpen(false);
      setEditingHotel(null);
    } catch (error) {
      console.error("Error saving hotel:", error);
      toast({
        title: "Error",
        description: "There was an error saving the hotel. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditHotel = (hotelId) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    if (hotel) {
      setEditingHotel(hotel);
      setIsAddHotelOpen(true);
    }
  };

  const handleDeleteHotel = async (hotelId) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    
    if (hotel) {
      try {
        await deleteHotel(hotelId);
        
        toast({
          title: "Hotel deleted",
          description: `${hotel.name} has been deleted.`,
        });
      } catch (error) {
        console.error("Error deleting hotel:", error);
        toast({
          title: "Error",
          description: "There was an error deleting the hotel. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleToggleFeatured = async (hotelId) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    
    if (hotel) {
      try {
        const newStatus = !hotel.featured;
        await toggleFeatured(hotelId, newStatus);
        
        const actionText = newStatus ? "featured" : "unfeatured";
        toast({
          title: `Hotel ${actionText}`,
          description: `${hotel.name} has been ${actionText}.`,
        });
      } catch (error) {
        console.error("Error updating featured status:", error);
        toast({
          title: "Error",
          description: "There was an error updating the hotel. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const getStatusBadge = (status) => {
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

          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2">Loading hotels...</span>
            </div>
          ) : (
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
                  {filteredHotels.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        {searchTerm ? (
                          <div className="text-muted-foreground">No hotels match your search</div>
                        ) : (
                          <div className="text-muted-foreground">No hotels available</div>
                        )}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredHotels.map((hotel) => (
                      <TableRow key={hotel.id}>
                        <TableCell>
                          <div className="font-medium">{hotel.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[240px]">
                            {hotel.description && hotel.description.substring(0, 60)}...
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
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
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
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddHotelOpen(false)}
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {editingHotel ? "Updating..." : "Adding..."}
                    </>
                  ) : (
                    editingHotel ? "Update Hotel" : "Add Hotel"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default HotelListings;
