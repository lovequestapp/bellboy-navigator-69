
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FeaturedDestinations = () => {
  const destinations = [
    { id: 1, name: "Bali, Indonesia", category: "Beach", status: "Active", views: 4520 },
    { id: 2, name: "Paris, France", category: "City", status: "Active", views: 3890 },
    { id: 3, name: "Swiss Alps", category: "Mountain", status: "Active", views: 2950 },
    { id: 4, name: "Tokyo, Japan", category: "City", status: "Scheduled", views: 2140 },
    { id: 5, name: "Santorini, Greece", category: "Beach", status: "Active", views: 3570 },
  ];

  const handleAddDestination = () => {
    toast({
      title: "Add Destination",
      description: "Destination creation form would open here"
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
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {destination.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{destination.views.toLocaleString()}</td>
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

export default FeaturedDestinations;
