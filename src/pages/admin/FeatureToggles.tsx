
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, Plus, RefreshCw, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const FeatureToggles = () => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const features = [
    { 
      id: "new-booking-flow", 
      name: "New Booking Flow", 
      description: "Enable the redesigned hotel booking process",
      enabled: true,
      category: "Customer Facing"
    },
    { 
      id: "rewards-program", 
      name: "Rewards Program", 
      description: "Enable the loyalty points and rewards system",
      enabled: true,
      category: "Customer Facing"
    },
    { 
      id: "dark-mode", 
      name: "Dark Mode", 
      description: "Allow users to switch to dark mode theme",
      enabled: false,
      category: "UI/UX"
    },
    { 
      id: "ai-recommendations", 
      name: "AI Recommendations", 
      description: "Use AI to provide personalized hotel recommendations",
      enabled: true,
      category: "AI Features"
    },
    { 
      id: "multi-language", 
      name: "Multi-language Support", 
      description: "Enable support for multiple languages",
      enabled: false,
      category: "Internationalization"
    },
    { 
      id: "analytics-tracking", 
      name: "Advanced Analytics", 
      description: "Collect detailed usage analytics",
      enabled: true,
      category: "Admin Tools"
    },
    { 
      id: "chat-support", 
      name: "Live Chat Support", 
      description: "Enable live chat with customer support",
      enabled: false,
      category: "Support"
    },
    { 
      id: "mobile-checkin", 
      name: "Mobile Check-In", 
      description: "Allow users to check in using their mobile device",
      enabled: true,
      category: "Mobile Features"
    }
  ];
  
  const filteredFeatures = features.filter(feature => 
    feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddFeature = () => {
    toast({
      title: "Add Feature Toggle",
      description: "Feature creation form would open here"
    });
  };
  
  const handleToggleChange = (featureId: string) => {
    // In a real app, this would update the state
    toast({
      title: "Feature Updated",
      description: `Feature '${featureId}' status has been toggled`
    });
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving feature toggle state
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Features Saved",
        description: "Feature toggle configurations have been updated."
      });
    }, 1200);
  };

  return (
    <AdminLayout currentPage="/admin/features">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Feature Toggles</h1>
          <p className="text-slate-500">Enable or disable application features</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleAddFeature}>
            <Plus className="mr-2 h-4 w-4" />
            Add Feature
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Search features..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Application Features</CardTitle>
          <CardDescription>
            Toggle features on or off to control availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredFeatures.length === 0 ? (
            <div className="text-center py-6 text-slate-500">
              No features found matching your search
            </div>
          ) : (
            <div className="space-y-6">
              {filteredFeatures.map((feature) => (
                <div 
                  key={feature.id} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border"
                >
                  <div className="mb-3 md:mb-0">
                    <div className="flex items-center mb-1">
                      <h3 className="font-medium">{feature.name}</h3>
                      <span className="ml-2 text-xs px-2 py-1 rounded-full bg-slate-100">
                        {feature.category}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500">{feature.description}</p>
                    <div className="text-xs text-slate-400 mt-1">ID: {feature.id}</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-3">
                      {feature.enabled ? "Enabled" : "Disabled"}
                    </span>
                    <Switch 
                      id={`toggle-${feature.id}`}
                      checked={feature.enabled}
                      onCheckedChange={() => handleToggleChange(feature.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default FeatureToggles;
