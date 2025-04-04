
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FeedbackFormProps {
  stayId?: string;
  hotelName: string;
  onClose?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ stayId, hotelName, onClose }) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your valuable feedback!",
      });
      
      if (onClose) {
        onClose();
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="bg-gradient-to-r from-bellboy to-bellboy-light text-white">
        <CardTitle className="font-serif">Share Your Experience</CardTitle>
        <CardDescription className="text-white/80">
          {hotelName ? `Tell us about your stay at ${hotelName}` : "How was your BellBoy experience?"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">What would you like to rate?</Label>
            <select 
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-bellboy"
            >
              <option value="general">Overall Experience</option>
              <option value="app">BellBoy App</option>
              <option value="hotel">Hotel Service</option>
              <option value="concierge">Concierge Assistance</option>
              <option value="room-service">Room Service</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Your Rating</Label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <StarIcon
                    size={28}
                    className={`${
                      rating >= star
                        ? "fill-bellboy-gold text-bellboy-gold"
                        : "fill-transparent text-muted-foreground"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Your Feedback</Label>
            <Textarea
              id="feedback"
              placeholder="Please share your thoughts..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="resize-none"
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {onClose && (
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            className="bg-bellboy hover:bg-bellboy-light text-white"
            disabled={isSubmitting || rating === 0}
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FeedbackForm;
