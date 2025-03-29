
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ApiStatus = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const apiServices = [
    { id: 1, name: "Hotel Booking API", status: "operational", latency: "45ms", lastChecked: "2 minutes ago" },
    { id: 2, name: "Payment Gateway", status: "operational", latency: "120ms", lastChecked: "5 minutes ago" },
    { id: 3, name: "User Authentication", status: "operational", latency: "65ms", lastChecked: "3 minutes ago" },
    { id: 4, name: "Weather Service", status: "degraded", latency: "350ms", lastChecked: "10 minutes ago" },
    { id: 5, name: "Email Service", status: "operational", latency: "90ms", lastChecked: "7 minutes ago" },
    { id: 6, name: "SMS Notifications", status: "operational", latency: "110ms", lastChecked: "8 minutes ago" },
    { id: 7, name: "Maps Integration", status: "down", latency: "—", lastChecked: "15 minutes ago" },
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API check
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Status Refreshed",
        description: "All API statuses have been updated"
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
              5 Operational
            </div>
            <div className="bg-amber-100 text-amber-800 rounded-full px-3 py-1 text-sm flex items-center">
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              1 Degraded
            </div>
            <div className="bg-red-100 text-red-800 rounded-full px-3 py-1 text-sm flex items-center">
              <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
              1 Down
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
