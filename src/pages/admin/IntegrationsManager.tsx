
import React, { useState } from "react";
import { Plus, ArrowRight, CheckCircle, XCircle, Globe, Cloud, Shield, MessageSquare, Zap } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Define the types for integrations
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  status: "active" | "inactive" | "error";
  lastSynced?: string;
  category: "booking" | "communication" | "analytics" | "payment" | "ai";
}

const IntegrationsManager: React.FC = () => {
  const { toast } = useToast();
  const [showAddApiDialog, setShowAddApiDialog] = useState(false);
  const [newApiDetails, setNewApiDetails] = useState({
    name: "",
    key: "",
    endpoint: "",
    description: ""
  });
  
  // Integration connection dialog state
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState("");

  // Sample integrations
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "stripe",
      name: "Stripe Payments",
      description: "Process payments and manage subscriptions",
      icon: <Shield className="h-6 w-6 text-[#635BFF]" />,
      connected: false,
      status: "inactive",
      category: "payment"
    },
    {
      id: "openai",
      name: "OpenAI",
      description: "Add AI capabilities to the concierge experience",
      icon: <Zap className="h-6 w-6 text-[#10a37f]" />,
      connected: false,
      status: "inactive",
      category: "ai"
    },
    {
      id: "twilio",
      name: "Twilio",
      description: "SMS notifications for bookings and services",
      icon: <MessageSquare className="h-6 w-6 text-[#F22F46]" />,
      connected: false,
      status: "inactive",
      category: "communication"
    },
    {
      id: "googleanalytics",
      name: "Google Analytics",
      description: "Track user behavior and app performance",
      icon: <Globe className="h-6 w-6 text-[#E37400]" />,
      connected: true,
      status: "active",
      lastSynced: "Today at 09:15 AM",
      category: "analytics"
    },
    {
      id: "amadeus",
      name: "Amadeus",
      description: "Connect to hotel booking systems",
      icon: <Cloud className="h-6 w-6 text-[#0066CC]" />,
      connected: false,
      status: "inactive",
      category: "booking"
    }
  ]);

  // Custom API keys (would be stored in backend in production)
  const [customApis, setCustomApis] = useState<{
    id: string;
    name: string;
    key: string;
    endpoint: string;
    description: string;
    active: boolean;
  }[]>([]);

  const handleConnectIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setShowConnectDialog(true);
  };

  const handleCompleteConnection = () => {
    if (!selectedIntegration || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please provide a valid API key",
        variant: "destructive"
      });
      return;
    }

    // Update integration status in the state
    setIntegrations(integrations.map(integration => 
      integration.id === selectedIntegration.id 
        ? { 
            ...integration, 
            connected: true, 
            status: "active",
            lastSynced: new Date().toLocaleString()
          } 
        : integration
    ));

    toast({
      title: "Integration Connected",
      description: `Successfully connected to ${selectedIntegration.name}`
    });

    // Reset form state
    setShowConnectDialog(false);
    setSelectedIntegration(null);
    setApiKey("");
  };

  const handleDisconnectIntegration = (integrationId: string) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, connected: false, status: "inactive", lastSynced: undefined } 
        : integration
    ));

    toast({
      title: "Integration Disconnected",
      description: "The integration has been disconnected"
    });
  };

  const handleAddCustomApi = () => {
    if (!newApiDetails.name || !newApiDetails.key || !newApiDetails.endpoint) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    const newApi = {
      id: Date.now().toString(),
      ...newApiDetails,
      active: true
    };

    setCustomApis([...customApis, newApi]);
    setNewApiDetails({ name: "", key: "", endpoint: "", description: "" });
    setShowAddApiDialog(false);

    toast({
      title: "API Added",
      description: `${newApiDetails.name} has been added to your integrations`
    });
  };

  const toggleApiStatus = (id: string) => {
    setCustomApis(customApis.map(api => 
      api.id === id ? { ...api, active: !api.active } : api
    ));

    const api = customApis.find(api => api.id === id);
    if (api) {
      toast({
        title: api.active ? "API Deactivated" : "API Activated",
        description: `${api.name} has been ${api.active ? "deactivated" : "activated"}`
      });
    }
  };

  return (
    <AdminLayout currentPage="/admin/integrations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-1">Integrations & APIs</h1>
            <p className="text-muted-foreground">Manage external services that connect with BellBoy</p>
          </div>
          <Button onClick={() => setShowAddApiDialog(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Custom API
          </Button>
        </div>

        {/* Integration Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <div key={integration.id} className="border rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="p-4 border-b bg-slate-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white p-2 rounded-full border">
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{integration.name}</h3>
                      <p className="text-xs text-muted-foreground">{integration.category.charAt(0).toUpperCase() + integration.category.slice(1)}</p>
                    </div>
                  </div>
                  {integration.connected ? (
                    <div className="flex items-center space-x-1 text-green-600 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Connected</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-400 text-sm">
                      <XCircle className="h-4 w-4" />
                      <span>Not Connected</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-600">{integration.description}</p>
                
                {integration.lastSynced && (
                  <p className="text-xs text-muted-foreground">Last synced: {integration.lastSynced}</p>
                )}
                
                {integration.connected ? (
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDisconnectIntegration(integration.id)}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button 
                    className="w-full mt-2 bg-bellboy hover:bg-bellboy/90"
                    onClick={() => handleConnectIntegration(integration)}
                  >
                    Connect <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Custom APIs Table */}
        {customApis.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Custom APIs</h2>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customApis.map((api) => (
                    <TableRow key={api.id}>
                      <TableCell className="font-medium">{api.name}</TableCell>
                      <TableCell className="font-mono text-xs">{api.endpoint}</TableCell>
                      <TableCell>{api.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={api.active} 
                            onCheckedChange={() => toggleApiStatus(api.id)} 
                          />
                          <Label>{api.active ? "Active" : "Inactive"}</Label>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setCustomApis(customApis.filter(item => item.id !== api.id));
                            toast({
                              title: "API Removed",
                              description: `${api.name} has been removed from your integrations`
                            });
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Add Custom API Dialog */}
        <Dialog open={showAddApiDialog} onOpenChange={setShowAddApiDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Custom API</DialogTitle>
              <DialogDescription>
                Enter the details of the external API you want to integrate
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="api-name">API Name</Label>
                <Input 
                  id="api-name" 
                  placeholder="e.g., Weather API" 
                  value={newApiDetails.name}
                  onChange={(e) => setNewApiDetails({...newApiDetails, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  placeholder="Your API key" 
                  type="password"
                  value={newApiDetails.key}
                  onChange={(e) => setNewApiDetails({...newApiDetails, key: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-endpoint">API Endpoint</Label>
                <Input 
                  id="api-endpoint" 
                  placeholder="https://api.example.com/v1" 
                  value={newApiDetails.endpoint}
                  onChange={(e) => setNewApiDetails({...newApiDetails, endpoint: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-description">Description (Optional)</Label>
                <Textarea 
                  id="api-description" 
                  placeholder="What this API will be used for..." 
                  value={newApiDetails.description}
                  onChange={(e) => setNewApiDetails({...newApiDetails, description: e.target.value})}
                />
              </div>
              
              <Alert className="bg-amber-50 border-amber-200">
                <AlertDescription className="text-amber-800 text-sm">
                  API keys are stored locally in this demo. In production, these would be securely stored in a backend service.
                </AlertDescription>
              </Alert>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddApiDialog(false)}>Cancel</Button>
              <Button onClick={handleAddCustomApi}>Add API</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Connect Integration Dialog */}
        <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Connect to {selectedIntegration?.name}</DialogTitle>
              <DialogDescription>
                Enter your API credentials to connect this integration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="integration-api-key">API Key</Label>
                <Input 
                  id="integration-api-key" 
                  placeholder="Your API key" 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-blue-800 text-sm">
                  To get an API key for this service, you may need to register for an account with {selectedIntegration?.name}.
                </AlertDescription>
              </Alert>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowConnectDialog(false)}>Cancel</Button>
              <Button onClick={handleCompleteConnection}>Connect</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default IntegrationsManager;
