
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ApiStatus = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [apiServices, setApiServices] = useState([
    { id: 1, name: "Hotel Booking API", status: "operational", latency: "45ms", lastChecked: "Just now" },
    { id: 2, name: "Payment Gateway", status: "operational", latency: "120ms", lastChecked: "Just now" },
    { id: 3, name: "User Authentication", status: "operational", latency: "65ms", lastChecked: "Just now" },
    { id: 4, name: "Weather Service", status: "degraded", latency: "350ms", lastChecked: "Just now" },
    { id: 5, name: "Email Service", status: "operational", latency: "90ms", lastChecked: "Just now" },
    { id: 6, name: "SMS Notifications", status: "operational", latency: "110ms", lastChecked: "Just now" },
    { id: 7, name: "Maps Integration", status: "down", latency: "—", lastChecked: "Just now" },
  ]);

  useEffect(() => {
    // Update the "lastChecked" for all services
    const updateLastChecked = () => {
      const now = new Date();
      const timeElapsed = Math.floor((now.getTime() - lastRefreshed.getTime()) / 60000); // minutes
      
      setApiServices(prev => prev.map(service => ({
        ...service,
        lastChecked: timeElapsed === 0 ? "Just now" : `${timeElapsed} minute${timeElapsed !== 1 ? 's' : ''} ago`
      })));
    };
    
    // Update every minute
    const interval = setInterval(updateLastChecked, 60000);
    
    // Initial update
    updateLastChecked();
    
    return () => clearInterval(interval);
  }, [lastRefreshed]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API check with randomized status changes
    setTimeout(() => {
      const updatedServices = apiServices.map(service => {
        // Randomly change some service statuses for demonstration
        const rand = Math.random();
        let newStatus = service.status;
        let newLatency = service.latency;
        
        if (rand < 0.2) {
          // 20% chance to change status
          if (service.status === "operational") {
            newStatus = Math.random() > 0.5 ? "degraded" : "operational";
            newLatency = newStatus === "degraded" ? `${Math.floor(Math.random() * 200) + 200}ms` : `${Math.floor(Math.random() * 100) + 40}ms`;
          } else if (service.status === "degraded") {
            newStatus = Math.random() > 0.5 ? "operational" : "down";
            newLatency = newStatus === "operational" ? `${Math.floor(Math.random() * 100) + 40}ms` : "—";
          } else if (service.status === "down") {
            newStatus = Math.random() > 0.7 ? "degraded" : "down";
            newLatency = newStatus === "degraded" ? `${Math.floor(Math.random() * 200) + 200}ms` : "—";
          }
        } else if (service.status === "operational") {
          // If operational, still update the latency
          newLatency = `${Math.floor(Math.random() * 100) + 40}ms`;
        }
        
        return {
          ...service,
          status: newStatus,
          latency: newLatency,
          lastChecked: "Just now"
        };
      });
      
      setApiServices(updatedServices);
      setIsRefreshing(false);
      setLastRefreshed(new Date());
      
      // Count statuses for the toast message
      const operational = updatedServices.filter(s => s.status === "operational").length;
      const degraded = updatedServices.filter(s => s.status === "degraded").length;
      const down = updatedServices.filter(s => s.status === "down").length;
      
      toast({
        title: "Status Refreshed",
        description: `${operational} operational, ${degraded} degraded, ${down} down services`
      });
    }, 1500);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "down":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "operational":
        return "Operational";
      case "degraded":
        return "Degraded";
      case "down":
        return "Down";
      default:
        return status;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800";
      case "degraded":
        return "bg-amber-100 text-amber-800";
      case "down":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  // Count services by status
  const operationalCount = apiServices.filter(s => s.status === "operational").length;
  const degradedCount = apiServices.filter(s => s.status === "degraded").length;
  const downCount = apiServices.filter(s => s.status === "down").length;

  return (
    <AdminLayout currentPage="/admin/api-status">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">API Status</h1>
          <p className="text-slate-500">Monitor the health of connected services and APIs</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          {isRefreshing ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh Status
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>System Status</CardTitle>
          <CardDescription>
            Current operational status of all integrated services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm flex items-center">
              <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
              {operationalCount} Operational
            </div>
            <div className="bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm flex items-center">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              {degradedCount} Degraded
            </div>
            <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm flex items-center">
              <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
              {downCount} Down
            </div>
          </div>
          
          <div className="relative overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Service</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Latency</th>
                  <th scope="col" className="px-6 py-3">Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {apiServices.map(service => (
                  <tr key={service.id} className="bg-white border-b">
                    <td className="px-6 py-4 font-medium">{service.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs flex items-center w-fit ${getStatusClass(service.status)}`}>
                        {getStatusIcon(service.status)}
                        <span className="ml-1.5">{getStatusText(service.status)}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">{service.latency}</td>
                    <td className="px-6 py-4">{service.lastChecked}</td>
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

export default ApiStatus;
