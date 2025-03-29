
import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, RefreshCw, EyeOff, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ThemeSettings = () => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [primaryColor, setPrimaryColor] = useState("#0F3460");
  const [secondaryColor, setSecondaryColor] = useState("#E94560");
  const [bgColor, setBgColor] = useState("#f8fafc");
  const [textColor, setTextColor] = useState("#0f172a");
  const [previewMode, setPreviewMode] = useState(true);
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving theme settings
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Theme Settings Saved",
        description: "Your theme customizations have been applied."
      });
      
      // In a real app, we would apply the theme here
      document.documentElement.style.setProperty("--bellboy-color", primaryColor);
    }, 1200);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <AdminLayout currentPage="/admin/theme">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Theme Settings</h1>
          <p className="text-slate-500">Customize the look and feel of your application</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={togglePreview}>
            {previewMode ? (
              <>
                <EyeOff className="mr-2 h-4 w-4" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="mr-2 h-4 w-4" />
                Show Preview
              </>
            )}
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Theme
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="components">Components</TabsTrigger>
            </TabsList>
            
            <TabsContent value="colors" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Color Settings</CardTitle>
                  <CardDescription>
                    Configure your application's color palette
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-md border" 
                          style={{ backgroundColor: primaryColor }}
                        />
                        <Input 
                          id="primaryColor" 
                          value={primaryColor} 
                          onChange={(e) => setPrimaryColor(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-md border" 
                          style={{ backgroundColor: secondaryColor }}
                        />
                        <Input 
                          id="secondaryColor" 
                          value={secondaryColor} 
                          onChange={(e) => setSecondaryColor(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bgColor">Background Color</Label>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-md border" 
                          style={{ backgroundColor: bgColor }}
                        />
                        <Input 
                          id="bgColor" 
                          value={bgColor} 
                          onChange={(e) => setBgColor(e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="textColor">Text Color</Label>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded-md border" 
                          style={{ backgroundColor: textColor }}
                        />
                        <Input 
                          id="textColor" 
                          value={textColor} 
                          onChange={(e) => setTextColor(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="typography" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Typography Settings</CardTitle>
                  <CardDescription>
                    Configure fonts and text styles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="headingFont">Heading Font</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger id="headingFont">
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="poppins">Poppins</SelectItem>
                          <SelectItem value="montserrat">Montserrat</SelectItem>
                          <SelectItem value="playfair">Playfair Display</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="bodyFont">Body Font</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger id="bodyFont">
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter</SelectItem>
                          <SelectItem value="roboto">Roboto</SelectItem>
                          <SelectItem value="poppins">Poppins</SelectItem>
                          <SelectItem value="montserrat">Montserrat</SelectItem>
                          <SelectItem value="lato">Lato</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="baseFontSize">Base Font Size</Label>
                      <Select defaultValue="16px">
                        <SelectTrigger id="baseFontSize">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="14px">14px</SelectItem>
                          <SelectItem value="16px">16px</SelectItem>
                          <SelectItem value="18px">18px</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="lineHeight">Line Height</Label>
                      <Select defaultValue="1.5">
                        <SelectTrigger id="lineHeight">
                          <SelectValue placeholder="Select line height" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.3">Tight (1.3)</SelectItem>
                          <SelectItem value="1.5">Normal (1.5)</SelectItem>
                          <SelectItem value="1.7">Relaxed (1.7)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="components" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Component Styles</CardTitle>
                  <CardDescription>
                    Customize UI components appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="buttonRadius">Button Radius</Label>
                      <Select defaultValue="md">
                        <SelectTrigger id="buttonRadius">
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None (0px)</SelectItem>
                          <SelectItem value="sm">Small (4px)</SelectItem>
                          <SelectItem value="md">Medium (6px)</SelectItem>
                          <SelectItem value="lg">Large (8px)</SelectItem>
                          <SelectItem value="full">Full (9999px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="buttonStyle">Button Style</Label>
                      <Select defaultValue="filled">
                        <SelectTrigger id="buttonStyle">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="filled">Filled</SelectItem>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="soft">Soft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardRadius">Card Radius</Label>
                      <Select defaultValue="md">
                        <SelectTrigger id="cardRadius">
                          <SelectValue placeholder="Select radius" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None (0px)</SelectItem>
                          <SelectItem value="sm">Small (4px)</SelectItem>
                          <SelectItem value="md">Medium (6px)</SelectItem>
                          <SelectItem value="lg">Large (8px)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="inputStyle">Input Style</Label>
                      <Select defaultValue="outline">
                        <SelectTrigger id="inputStyle">
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="outline">Outline</SelectItem>
                          <SelectItem value="filled">Filled</SelectItem>
                          <SelectItem value="underline">Underline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {previewMode && (
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Theme Preview</CardTitle>
                <CardDescription>
                  See how your theme will look
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 p-4 rounded-md" style={{ backgroundColor: bgColor, color: textColor }}>
                  <div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: textColor }}>Sample Heading</h3>
                    <p className="text-sm" style={{ color: textColor }}>
                      This is how your text will appear with the current settings.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full" style={{ backgroundColor: primaryColor }}>
                      Primary Button
                    </Button>
                    <Button className="w-full" variant="outline" style={{ borderColor: secondaryColor, color: secondaryColor }}>
                      Secondary Button
                    </Button>
                  </div>
                  
                  <div className="p-3 rounded-md border" style={{ borderColor: `${textColor}20` }}>
                    <p className="text-sm" style={{ color: textColor }}>
                      Card component example with your current theme settings.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ThemeSettings;
