
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Tag, Calendar } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Promotions = () => {
  const promotions = [
    { id: 1, name: "Summer Special", code: "SUMMER23", discount: "20%", expires: "2023-08-31", status: "Active" },
    { id: 2, name: "Weekend Getaway", code: "WEEKEND", discount: "15%", expires: "2023-12-31", status: "Active" },
    { id: 3, name: "First Time Booking", code: "FIRST10", discount: "10%", expires: "2023-12-31", status: "Active" },
    { id: 4, name: "Fall Discount", code: "FALL23", discount: "25%", expires: "2023-11-30", status: "Scheduled" },
    { id: 5, name: "Holiday Special", code: "HOLIDAY", discount: "30%", expires: "2023-12-25", status: "Scheduled" },
  ];

  const handleAddPromotion = () => {
    toast({
      title: "Add Promotion",
      description: "Promotion creation form would open here"
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
                      <Button variant="ghost" size="sm">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default Promotions;
