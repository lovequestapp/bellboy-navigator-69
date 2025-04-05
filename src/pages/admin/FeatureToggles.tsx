
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Save, Plus, RefreshCw, Search, Loader2, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: string;
}

const FeatureToggles = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [features, setFeatures] = useState<Feature[]>([
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
  ]);
  
  const [featureHistory, setFeatureHistory] = useState<Feature[][]>([]);
  const [pendingChanges, setPendingChanges] = useState(false);
  
  // Form for adding features
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      enabled: false,
      category: "Customer Facing",
    },
  });

  // Track changes for pending change indicator
  useEffect(() => {
    if (featureHistory.length > 0) {
      const lastSavedState = featureHistory[featureHistory.length - 1];
      const hasChanges = JSON.stringify(lastSavedState) !== JSON.stringify(features);
      setPendingChanges(hasChanges);
    }
  }, [features, featureHistory]);
  
  const filteredFeatures = features.filter(feature => 
    feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddFeature = () => {
    setIsAddFeatureOpen(true);
  };
  
  const onAddFeatureSubmit = (data) => {
    const newFeature: Feature = {
      ...data,
      id: data.name.toLowerCase().replace(/\s+/g, '-'),
    };
    
    // Check for duplicate IDs
    if (features.some(feature => feature.id === newFeature.id)) {
      toast({
        title: "Feature ID already exists",
        description: "Please use a different feature name",
        variant: "destructive"
      });
      return;
    }
    
    setFeatures([...features, newFeature]);
    setIsAddFeatureOpen(false);
    form.reset();
    
    toast({
      title: "Feature Added",
      description: `${newFeature.name} has been added successfully.`
    });
  };
  
  const handleDeleteFeature = (featureId: string) => {
    const featureToDelete = features.find(f => f.id === featureId);
    if (!featureToDelete) return;
    
    const newFeatures = features.filter(feature => feature.id !== featureId);
    setFeatures(newFeatures);
    
    toast({
      title: "Feature Deleted",
      description: `${featureToDelete.name} has been removed.`
    });
  };
  
  const handleToggleChange = (featureId: string) => {
    // Update the feature toggle state
    setFeatures(prevFeatures => 
      prevFeatures.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled: !feature.enabled } 
          : feature
      )
    );
    
    const feature = features.find(f => f.id === featureId);
    if (feature) {
      toast({
        title: "Feature Updated",
        description: `${feature.name} is now ${!feature.enabled ? 'enabled' : 'disabled'}`
      });
    }
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Save current state to history for undo capability
    setFeatureHistory([...featureHistory, [...features]]);
    
    // Simulate saving feature toggle state to an API
    setTimeout(() => {
      setIsSaving(false);
      setPendingChanges(false);
      
      toast({
        title: "Features Saved",
        description: "Feature toggle configurations have been updated successfully."
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
          <Button 
            onClick={handleSave} 
            disabled={isSaving || !pendingChanges} 
            className={pendingChanges ? "animate-pulse" : ""}
          >
            {isSaving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
            {pendingChanges && " *"}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteFeature(feature.id)}
                      className="ml-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Feature Dialog */}
      <Dialog open={isAddFeatureOpen} onOpenChange={setIsAddFeatureOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Feature Toggle</DialogTitle>
            <DialogDescription>
              Create a new feature toggle that can be enabled or disabled in the application.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddFeatureSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature Name</FormLabel>
                    <FormControl>
                      <Input placeholder="New Feature" {...field} />
                    </FormControl>
                    <FormDescription>
                      A user-friendly name for this feature
                    </FormDescription>
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
                      <Input placeholder="Feature description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Brief explanation of what this feature does
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="Customer Facing">Customer Facing</option>
                        <option value="Admin Tools">Admin Tools</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Mobile Features">Mobile Features</option>
                        <option value="AI Features">AI Features</option>
                        <option value="Internationalization">Internationalization</option>
                        <option value="Support">Support</option>
                        <option value="Analytics">Analytics</option>
                        <option value="Experimental">Experimental</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      Group similar features together
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div>
                      <FormLabel className="text-base">Status</FormLabel>
                      <FormDescription>
                        Should this feature be enabled by default?
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
                  onClick={() => setIsAddFeatureOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Add Feature
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default FeatureToggles;
