
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUpcomingHotels } from "@/services/hotelService";
import { MessageSquare, History, Star } from "lucide-react";

// Mock past feedback data
const pastFeedback = [
  {
    id: "1",
    date: "March 15, 2025",
    hotel: "Seaside Resort & Spa",
    rating: 5,
    category: "Hotel Service",
    feedback: "The staff was incredibly attentive and professional. Room service was prompt and the food was exceptional."
  },
  {
    id: "2",
    date: "January 22, 2025",
    hotel: "Grand Majestic Hotel",
    rating: 4,
    category: "Concierge Assistance",
    feedback: "The concierge recommendations for restaurants were excellent, but there was a slight delay in getting our theater tickets."
  }
];

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const upcomingHotels = getUpcomingHotels();
  const [activeTab, setActiveTab] = useState("new");
  
  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-serif font-semibold">Feedback Center</h1>
          <p className="text-muted-foreground">Your opinions help us improve your experience</p>
        </div>
        
        <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new" className="flex items-center">
              <MessageSquare size={16} className="mr-2" />
              <span>Provide Feedback</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <History size={16} className="mr-2" />
              <span>Past Feedback</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="pt-6">
            {upcomingHotels.length > 0 ? (
              <div className="space-y-6">
                <Card className="border-bellboy/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-lg">Current Stay</CardTitle>
                    <CardDescription>
                      Share your experience with your current hotel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FeedbackForm 
                      hotelName={upcomingHotels[0].name} 
                      stayId={upcomingHotels[0].id} 
                    />
                  </CardContent>
                </Card>
                
                <Card className="border-bellboy/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-serif text-lg">BellBoy App Experience</CardTitle>
                    <CardDescription>
                      How is your experience with the BellBoy app?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FeedbackForm hotelName="" />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-bellboy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} className="text-bellboy" />
                </div>
                <h2 className="text-xl font-serif font-semibold mb-2">No Active Stays</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add a hotel stay to provide feedback about your experience.
                </p>
                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate('/check-in')}
                    className="bg-bellboy hover:bg-bellboy-light text-white"
                  >
                    Add Hotel Stay
                  </Button>
                  <div className="pt-4">
                    <p className="text-sm font-medium mb-2">Or provide feedback about the BellBoy app:</p>
                    <FeedbackForm hotelName="" />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="pt-6">
            {pastFeedback.length > 0 ? (
              <div className="space-y-4">
                {pastFeedback.map(feedback => (
                  <Card key={feedback.id} className="border-bellboy/10">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-serif text-lg">{feedback.hotel}</CardTitle>
                          <CardDescription>{feedback.date}</CardDescription>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < feedback.rating ? "fill-bellboy-gold text-bellboy-gold" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <span className="text-xs px-2 py-1 bg-bellboy/10 text-bellboy rounded-full">
                          {feedback.category}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">{feedback.feedback}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You haven't provided any feedback yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default Feedback;
