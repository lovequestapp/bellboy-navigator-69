
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Tag, Calendar, Edit, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Promotion {
  id: number;
  name: string;
  code: string;
  discount: string;
  expires: string;
  status: "Active" | "Scheduled" | "Expired";
}

const Promotions = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([
    { id: 1, name: "Summer Special", code: "SUMMER23", discount: "20%", expires: "2023-08-31", status: "Active" },
    { id: 2, name: "Weekend Getaway", code: "WEEKEND", discount: "15%", expires: "2023-12-31", status: "Active" },
    { id: 3, name: "First Time Booking", code: "FIRST10", discount: "10%", expires: "2023-12-31", status: "Active" },
    { id: 4, name: "Fall Discount", code: "FALL23", discount: "25%", expires: "2023-11-30", status: "Scheduled" },
    { id: 5, name: "Holiday Special", code: "HOLIDAY", discount: "30%", expires: "2023-12-25", status: "Scheduled" },
  ]);
  
  const [editDialog, setEditDialog] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState<Promotion | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleAddPromotion = () => {
    setCurrentPromotion({
      id: promotions.length > 0 ? Math.max(...promotions.map(p => p.id)) + 1 : 1,
      name: "",
      code: "",
      discount: "",
      expires: new Date().toISOString().split('T')[0],
      status: "Scheduled"
    });
    setEditDialog(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    setEditDialog(true);
  };

  const handleDeletePrompt = (promotion: Promotion) => {
    setCurrentPromotion(promotion);
    setDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (currentPromotion) {
      setPromotions(prevPromotions => prevPromotions.filter(p => p.id !== currentPromotion.id));
      
      toast({
        title: "Promotion Deleted",
        description: `${currentPromotion.name} has been removed successfully.`
      });
      
      setDeleteDialog(false);
      setCurrentPromotion(null);
    }
  };

  const handleSavePromotion = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPromotion) return;
    
    const isNew = !promotions.some(p => p.id === currentPromotion.id);
    
    if (isNew) {
      setPromotions(prev => [...prev, currentPromotion]);
    } else {
      setPromotions(prev => 
        prev.map(p => p.id === currentPromotion.id ? currentPromotion : p)
      );
    }
    
    toast({
      title: isNew ? "Promotion Created" : "Promotion Updated",
      description: `${currentPromotion.name} has been ${isNew ? 'added' : 'updated'} successfully.`
    });
    
    setEditDialog(false);
    setCurrentPromotion(null);
  };

  const handlePromotionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPromotion) return;
    
    setCurrentPromotion({
      ...currentPromotion,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AdminLayout currentPage="/admin/promotions">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Promotions</h1>
          <p className="text-slate-500">Manage special offers and discount codes</p>
        </div>
        <Button onClick={handleAddPromotion}>
          <Plus className="mr-2 h-4 w-4" />
          Add Promotion
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Promotions</CardTitle>
          <CardDescription>
            Active and upcoming promotional offers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Promotion</th>
                  <th scope="col" className="px-6 py-3">Code</th>
                  <th scope="col" className="px-6 py-3">Discount</th>
                  <th scope="col" className="px-6 py-3">Expires</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map(promotion => (
                  <tr key={promotion.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium flex items-center">
                      <div className="w-8 h-8 mr-3 rounded bg-slate-100 flex items-center justify-center">
                        <Tag className="h-4 w-4 text-slate-500" />
                      </div>
                      {promotion.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                        {promotion.code}
                      </span>
                    </td>
                    <td className="px-6 py-4">{promotion.discount}</td>
                    <td className="px-6 py-4 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1.5 text-slate-400" />
                      {promotion.expires}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        promotion.status === "Active" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {promotion.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPromotion(promotion)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          onClick={() => handleDeletePrompt(promotion)}
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
      
      {/* Edit/Create Promotion Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentPromotion && promotions.some(p => p.id === currentPromotion.id)
                ? "Edit Promotion"
                : "Create New Promotion"
              }
            </DialogTitle>
            <DialogDescription>
              {currentPromotion && promotions.some(p => p.id === currentPromotion.id)
                ? "Update the details of this promotion."
                : "Add a new promotion to your system."
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSavePromotion}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Promotion Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentPromotion?.name || ""}
                  onChange={handlePromotionChange}
                  placeholder="e.g., Summer Special"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="code">Promotion Code</Label>
                <Input
                  id="code"
                  name="code"
                  value={currentPromotion?.code || ""}
                  onChange={handlePromotionChange}
                  placeholder="e.g., SUMMER23"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="discount">Discount Amount</Label>
                <Input
                  id="discount"
                  name="discount"
                  value={currentPromotion?.discount || ""}
                  onChange={handlePromotionChange}
                  placeholder="e.g., 20%"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="expires">Expiry Date</Label>
                <Input
                  id="expires"
                  name="expires"
                  type="date"
                  value={currentPromotion?.expires || ""}
                  onChange={handlePromotionChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  value={currentPromotion?.status || "Scheduled"}
                  onChange={(e) => {
                    if (currentPromotion) {
                      setCurrentPromotion({
                        ...currentPromotion,
                        status: e.target.value as "Active" | "Scheduled" | "Expired"
                      });
                    }
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="Active">Active</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Promotion</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Promotion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{currentPromotion?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteDialog(false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Promotions;
