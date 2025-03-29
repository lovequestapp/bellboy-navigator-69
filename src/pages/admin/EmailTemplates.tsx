
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, RefreshCw, Copy, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const EmailTemplates = () => {
  const [isSaving, setIsSaving] = React.useState(false);
  const [currentTemplate, setCurrentTemplate] = React.useState("welcome");
  
  const templates = {
    welcome: {
      subject: "Welcome to BellBoy - Your Personal Hotel Concierge",
      content: `<h1>Welcome to BellBoy!</h1>
<p>Hello {{firstName}},</p>
<p>We're thrilled to welcome you to BellBoy, your personal hotel concierge service.</p>
<p>With BellBoy, you can:</p>
<ul>
  <li>Easily book hotel services</li>
  <li>Explore local attractions</li>
  <li>Manage your stay preferences</li>
  <li>Earn rewards with every interaction</li>
</ul>
<p>If you have any questions, our support team is here to help.</p>
<p>Enjoy your stay!</p>
<p>The BellBoy Team</p>`
    },
    booking: {
      subject: "Your Booking Confirmation #{{bookingId}}",
      content: `<h1>Booking Confirmation</h1>
<p>Hello {{firstName}},</p>
<p>Your booking has been confirmed!</p>
<p><strong>Booking Details:</strong></p>
<ul>
  <li>Booking ID: {{bookingId}}</li>
  <li>Hotel: {{hotelName}}</li>
  <li>Check-in: {{checkInDate}}</li>
  <li>Check-out: {{checkOutDate}}</li>
</ul>
<p>We look forward to welcoming you!</p>
<p>The BellBoy Team</p>`
    },
    receipt: {
      subject: "Receipt for Your Recent Purchase #{{transactionId}}",
      content: `<h1>Receipt</h1>
<p>Hello {{firstName}},</p>
<p>Thank you for your recent purchase. Here's your receipt:</p>
<p><strong>Transaction Details:</strong></p>
<ul>
  <li>Transaction ID: {{transactionId}}</li>
  <li>Date: {{transactionDate}}</li>
  <li>Amount: {{amount}}</li>
  <li>Payment Method: {{paymentMethod}}</li>
</ul>
<p>Thank you for choosing BellBoy!</p>
<p>The BellBoy Team</p>`
    }
  };
  
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate saving email template
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Template Saved",
        description: "Email template has been updated successfully."
      });
    }, 1200);
  };

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(templates[currentTemplate as keyof typeof templates].content);
    toast({
      title: "HTML Copied",
      description: "Template HTML has been copied to clipboard"
    });
  };

  const handlePreview = () => {
    toast({
      title: "Preview Email",
      description: "Email preview functionality would open here"
    });
  };

  return (
    <AdminLayout currentPage="/admin/emails">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Email Templates</h1>
          <p className="text-slate-500">Manage and customize email templates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCopyHTML}>
            <Copy className="mr-2 h-4 w-4" />
            Copy HTML
          </Button>
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Template
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Select a template to edit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button 
                  className={`w-full text-left p-3 rounded-md transition ${currentTemplate === 'welcome' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                  onClick={() => setCurrentTemplate('welcome')}
                >
                  <div className="font-medium">Welcome Email</div>
                  <div className="text-xs text-slate-500">Sent when a user signs up</div>
                </button>
                
                <button 
                  className={`w-full text-left p-3 rounded-md transition ${currentTemplate === 'booking' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                  onClick={() => setCurrentTemplate('booking')}
                >
                  <div className="font-medium">Booking Confirmation</div>
                  <div className="text-xs text-slate-500">Sent after booking is confirmed</div>
                </button>
                
                <button 
                  className={`w-full text-left p-3 rounded-md transition ${currentTemplate === 'receipt' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}
                  onClick={() => setCurrentTemplate('receipt')}
                >
                  <div className="font-medium">Receipt</div>
                  <div className="text-xs text-slate-500">Sent after a purchase</div>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {currentTemplate === 'welcome' ? 'Welcome Email' : 
                 currentTemplate === 'booking' ? 'Booking Confirmation' : 
                 'Receipt Template'}
              </CardTitle>
              <CardDescription>
                Customize the email template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="design" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="design" className="mt-4 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="emailSubject">Email Subject</Label>
                      <Input 
                        id="emailSubject" 
                        defaultValue={templates[currentTemplate as keyof typeof templates].subject} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="preheader">Preheader Text</Label>
                      <Input 
                        id="preheader" 
                        placeholder="Brief summary shown in email clients"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        This text appears in email clients as a preview
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      <div 
                        className="p-4 border rounded-md bg-white" 
                        dangerouslySetInnerHTML={{ 
                          __html: templates[currentTemplate as keyof typeof templates].content 
                        }} 
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="html" className="mt-4">
                  <div className="space-y-4">
                    <Textarea 
                      className="min-h-80 font-mono text-sm" 
                      defaultValue={templates[currentTemplate as keyof typeof templates].content}
                    />
                    <div className="text-xs text-slate-500">
                      <p>Available variables:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>{{"{{"}}firstName{{"}}"}}: Recipient's first name</li>
                        <li>{{"{{"}}bookingId{{"}}"}}: Booking reference number</li>
                        <li>{{"{{"}}hotelName{{"}}"}}: Hotel name</li>
                        <li>{{"{{"}}checkInDate{{"}}"}}: Check-in date</li>
                        <li>{{"{{"}}checkOutDate{{"}}"}}: Check-out date</li>
                        <li>{{"{{"}}transactionId{{"}}"}}: Transaction reference</li>
                        <li>{{"{{"}}amount{{"}}"}}: Transaction amount</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-4">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="senderName">Sender Name</Label>
                      <Input id="senderName" defaultValue="BellBoy Concierge" />
                    </div>
                    
                    <div>
                      <Label htmlFor="senderEmail">Sender Email</Label>
                      <Input id="senderEmail" defaultValue="noreply@bellboy.example.com" />
                    </div>
                    
                    <div>
                      <Label htmlFor="emailCategory">Email Category</Label>
                      <Select defaultValue="transactional">
                        <SelectTrigger id="emailCategory">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transactional">Transactional</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="notification">Notification</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EmailTemplates;
