
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Edit, Trash2, Loader2, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Destination {
  id: number;
  name: string;
  category: string;
  status: "Active" | "Scheduled" | "Archived";
  views: number;
  image?: string;
  description?: string;
}

const initialDestinations: Destination[] = [
  { id: 1, name: "Bali, Indonesia", category: "Beach", status: "Active", views: 4520, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1024", description: "Tropical paradise with stunning beaches and rich cultural heritage." },
  { id: 2, name: "Paris, France", category: "City", status: "Active", views: 3890, image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=1024", description: "Romantic city of lights with iconic architecture and world-class cuisine." },
  { id: 3, name: "Swiss Alps", category: "Mountain", status: "Active", views: 2950, image: "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&q=80&w=1024", description: "Breathtaking mountain scenery perfect for skiing and hiking adventures." },
  { id: 4, name: "Tokyo, Japan", category: "City", status: "Scheduled", views: 2140, image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1024", description: "Vibrant metropolis blending ultramodern and traditional culture." },
  { id: 5, name: "Santorini, Greece", category: "Beach", status: "Active", views: 3570, image: "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&q=80&w=1024", description: "Stunning island with white-washed buildings and crystal blue waters." },
];

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialog, setEditDialog] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const categories = ["Beach", "City", "Mountain", "Island", "Countryside", "Historic", "Cultural", "Adventure", "Wildlife", "Desert"];

  useEffect(() => {
    // Simulate API fetch for destinations
    const loadDestinations = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setDestinations(initialDestinations);
      } catch (error) {
        console.error("Error loading destinations:", error);
        toast({
          title: "Failed to load destinations",
          description: "Please refresh and try again",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDestinations();
  }, []);

  // Filter destinations based on search
  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    destination.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDestination = () => {
    setCurrentDestination({
      id: destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1,
      name: "",
      category: "Beach",
      status: "Scheduled",
      views: 0,
      image: "",
      description: ""
    });
    setEditDialog(true);
  };

  const handleEditDestination = (destination: Destination) => {
    setCurrentDestination(destination);
    setEditDialog(true);
  };

  const handleDeletePrompt = (destination: Destination) => {
    setCurrentDestination(destination);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!currentDestination) return;
    
    setIsSaving(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDestinations(prevDestinations => prevDestinations.filter(d => d.id !== currentDestination.id));
      
      toast({
        title: "Destination Removed",
        description: `${currentDestination.name} has been removed from featured destinations.`
      });
    } catch (error) {
      console.error("Error deleting destination:", error);
      toast({
        title: "Error",
        description: "Failed to delete destination. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
      setDeleteDialog(false);
      setCurrentDestination(null);
    }
  };

  const handleSaveDestination = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDestination) return;
    setIsSaving(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const isNew = !destinations.some(d => d.id === currentDestination.id);
      
      if (isNew) {
        setDestinations(prev => [...prev, currentDestination]);
      } else {
        setDestinations(prev => 
          prev.map(d => d.id === currentDestination.id ? currentDestination : d)
        );
      }
      
      toast({
        title: isNew ? "Destination Added" : "Destination Updated",
        description: `${currentDestination.name} has been ${isNew ? 'added to' : 'updated in'} featured destinations.`
      });
      
      setEditDialog(false);
      setCurrentDestination(null);
    } catch (error) {
      console.error("Error saving destination:", error);
      toast({
        title: "Error",
        description: "Failed to save destination. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!currentDestination) return;
    
    const { name, value } = e.target;
    const updatedValue = name === "views" ? parseInt(value) : value;
    
    setCurrentDestination({
      ...currentDestination,
      [name]: updatedValue
    });
  };

  return (
    <AdminLayout currentPage="/admin/destinations">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Featured Destinations</h1>
          <p className="text-slate-500">Manage featured travel destinations for your users</p>
        </div>
        <Button onClick={handleAddDestination}>
          <Plus className="mr-2 h-4 w-4" />
          Add Destination
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Destinations</CardTitle>
          <CardDescription>
            Featured destinations that appear on the Explore page
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-2">Loading destinations...</span>
            </div>
          ) : filteredDestinations.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              {searchTerm ? "No destinations match your search" : "No destinations available"}
            </div>
          ) : (
            <div className="relative overflow-x-auto rounded-md border">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Destination</th>
                    <th scope="col" className="px-6 py-3">Category</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Views</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDestinations.map(destination => (
                    <tr key={destination.id} className="bg-white border-b">
                      <td className="px-6 py-4 font-medium flex items-center">
                        <div className="w-8 h-8 mr-3 rounded bg-slate-100 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-slate-500" />
                        </div>
                        {destination.name}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{destination.category}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          destination.status === "Active" 
                            ? "bg-green-100 text-green-800" 
                            : destination.status === "Scheduled"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-slate-100 text-slate-800"
                        }`}>
                          {destination.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">{destination.views.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditDestination(destination)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => handleDeletePrompt(destination)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Edit/Create Destination Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentDestination && destinations.some(d => d.id === currentDestination.id && d.name)
                ? "Edit Destination"
                : "Add New Destination"
              }
            </DialogTitle>
            <DialogDescription>
              {currentDestination && destinations.some(d => d.id === currentDestination.id && d.name)
                ? "Update the details of this destination."
                : "Add a new destination to your featured list."
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSaveDestination}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Destination Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentDestination?.name || ""}
                  onChange={handleDestinationChange}
                  placeholder="e.g., Rome, Italy"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  value={currentDestination?.description || ""}
                  onChange={handleDestinationChange}
                  placeholder="Brief description of the destination"
                  className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background resize-none"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={currentDestination?.image || ""}
                  onChange={handleDestinationChange}
                  placeholder="https://example.com/image.jpg"
                />
                {currentDestination?.image && (
                  <div className="mt-2">
                    <img 
                      src={currentDestination.image} 
                      alt={currentDestination.name} 
                      className="h-40 w-full object-cover rounded-md"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  name="category"
                  value={currentDestination?.category || ""}
                  onChange={handleDestinationChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={currentDestination?.status || "Scheduled"}
                  onChange={handleDestinationChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="Active">Active</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="views">Views Count</Label>
                <Input
                  id="views"
                  name="views"
                  type="number"
                  min="0"
                  value={currentDestination?.views || 0}
                  onChange={handleDestinationChange}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialog(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : currentDestination && destinations.some(d => d.id === currentDestination.id && d.name)
                  ? "Update Destination"
                  : "Add Destination"
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Destination</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove "{currentDestination?.name}" from featured destinations? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialog(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default FeaturedDestinations;
