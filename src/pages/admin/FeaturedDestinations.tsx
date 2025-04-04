
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MapPin, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Destination {
  id: number;
  name: string;
  category: string;
  status: "Active" | "Scheduled" | "Archived";
  views: number;
}

const FeaturedDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([
    { id: 1, name: "Bali, Indonesia", category: "Beach", status: "Active", views: 4520 },
    { id: 2, name: "Paris, France", category: "City", status: "Active", views: 3890 },
    { id: 3, name: "Swiss Alps", category: "Mountain", status: "Active", views: 2950 },
    { id: 4, name: "Tokyo, Japan", category: "City", status: "Scheduled", views: 2140 },
    { id: 5, name: "Santorini, Greece", category: "Beach", status: "Active", views: 3570 },
  ]);
  
  const [editDialog, setEditDialog] = useState(false);
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  
  const categories = ["Beach", "City", "Mountain", "Island", "Countryside", "Historic"];

  const handleAddDestination = () => {
    setCurrentDestination({
      id: destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1,
      name: "",
      category: "Beach",
      status: "Scheduled",
      views: 0
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

  const handleDeleteConfirm = () => {
    if (currentDestination) {
      setDestinations(prevDestinations => prevDestinations.filter(d => d.id !== currentDestination.id));
      
      toast({
        title: "Destination Removed",
        description: `${currentDestination.name} has been removed from featured destinations.`
      });
      
      setDeleteDialog(false);
      setCurrentDestination(null);
    }
  };

  const handleSaveDestination = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentDestination) return;
    
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
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!currentDestination) return;
    
    const value = e.target.name === "views" ? parseInt(e.target.value) : e.target.value;
    
    setCurrentDestination({
      ...currentDestination,
      [e.target.name]: value
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

      <Card>
        <CardHeader>
          <CardTitle>All Destinations</CardTitle>
          <CardDescription>
            Featured destinations that appear on the Explore page
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                {destinations.map(destination => (
                  <tr key={destination.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium flex items-center">
                      <div className="w-8 h-8 mr-3 rounded bg-slate-100 flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-slate-500" />
                      </div>
                      {destination.name}
                    </td>
                    <td className="px-6 py-4">{destination.category}</td>
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
        </CardContent>
      </Card>
      
      {/* Edit/Create Destination Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentDestination && destinations.some(d => d.id === currentDestination.id)
                ? "Edit Destination"
                : "Add New Destination"
              }
            </DialogTitle>
            <DialogDescription>
              {currentDestination && destinations.some(d => d.id === currentDestination.id)
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
              
              {currentDestination && destinations.some(d => d.id === currentDestination.id) && (
                <div className="grid gap-2">
                  <Label htmlFor="views">Views Count</Label>
                  <Input
                    id="views"
                    name="views"
                    type="number"
                    value={currentDestination?.views || 0}
                    onChange={handleDestinationChange}
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {currentDestination && destinations.some(d => d.id === currentDestination.id)
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
            <Button type="button" variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default FeaturedDestinations;
