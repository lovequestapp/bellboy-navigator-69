
import React, { useState } from "react";
import { BarChart, Users, Hotel, Activity, Download, RefreshCw } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RevenueChart from "@/components/admin/analytics/RevenueChart";
import BookingMetrics from "@/components/admin/analytics/BookingMetrics";
import UserEngagement from "@/components/admin/analytics/UserEngagement";
import { toast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">("monthly");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value as "daily" | "weekly" | "monthly");
  };

  const handleRefreshData = () => {
    setIsRefreshing(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Data Refreshed",
        description: "Dashboard data has been updated with the latest metrics."
      });
    }, 1200);
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your dashboard data is being prepared for download."
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Dashboard data has been exported successfully."
      });
    }, 1500);
  };

  return (
    <AdminLayout currentPage="/admin">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleString()}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="text-xs"
          >
            {isRefreshing ? (
              <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
            )}
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleExportData}
            className="text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
          <div className="hidden sm:block">
            <Select value={timeframe} onValueChange={handleTimeframeChange}>
              <SelectTrigger className="w-[130px] h-8 text-xs">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Hotel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,875</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
          <CardFooter className="pt-0 pb-2 px-4">
            <p className="text-xs text-blue-500 cursor-pointer">View details</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,287</div>
            <p className="text-xs text-muted-foreground">+24.3% from last month</p>
          </CardContent>
          <CardFooter className="pt-0 pb-2 px-4">
            <p className="text-xs text-blue-500 cursor-pointer">View details</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$437,890</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
          <CardFooter className="pt-0 pb-2 px-4">
            <p className="text-xs text-blue-500 cursor-pointer">View details</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">876</div>
            <p className="text-xs text-muted-foreground">+18.7% from last month</p>
          </CardContent>
          <CardFooter className="pt-0 pb-2 px-4">
            <p className="text-xs text-blue-500 cursor-pointer">View details</p>
          </CardFooter>
        </Card>
      </div>

      <div className="block sm:hidden mb-4">
        <Select value={timeframe} onValueChange={handleTimeframeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>
                Compare revenue metrics across different periods ({timeframe} view)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <RevenueChart timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Metrics</CardTitle>
              <CardDescription>
                Track conversion rates and booking performance ({timeframe} view)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <BookingMetrics timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="engagement" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                Monitor user activity and session statistics ({timeframe} view)
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <UserEngagement timeframe={timeframe} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
