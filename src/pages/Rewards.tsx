
import React, { useState } from "react";
import { Heart, Gift, ArrowRight, Check, AlertCircle } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  redeemed?: boolean;
  date?: string;
  status?: string;
}

const Rewards: React.FC = () => {
  // User data state
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);
  const nextRewardAt = 2000;
  
  // Rewards state
  const [rewardsHistory, setRewardsHistory] = useState<Reward[]>([
    {
      id: "1",
      name: "Free Breakfast",
      description: "Continental breakfast for two",
      date: "Sept 12, 2023",
      points: 500,
      status: "Redeemed",
    },
    {
      id: "2",
      name: "Room Upgrade",
      description: "Upgrade to premium room with view",
      date: "Aug 24, 2023",
      points: 1000,
      status: "Redeemed",
    },
  ]);
  
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([
    {
      id: "3",
      name: "Late Checkout",
      description: "Extended checkout until 3 PM",
      points: 300,
    },
    {
      id: "4",
      name: "Premium Spa Session",
      description: "60-minute massage treatment",
      points: 800,
    },
    {
      id: "5",
      name: "Complimentary Dinner",
      description: "Dinner for two at hotel restaurant",
      points: 1200,
    },
  ]);

  const [showAllHistory, setShowAllHistory] = useState(false);

  // Function to handle reward redemption
  const handleRedeemReward = (reward: Reward) => {
    if (loyaltyPoints >= reward.points) {
      // Update points balance
      setLoyaltyPoints(prev => prev - reward.points);
      
      // Remove from available rewards
      setAvailableRewards(prev => prev.filter(r => r.id !== reward.id));
      
      // Add to history with current date
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
      const redeemedReward = {
        ...reward,
        date: formattedDate,
        status: "Redeemed"
      };
      
      setRewardsHistory(prev => [redeemedReward, ...prev]);
      
      // Show success toast
      toast({
        title: "Reward Redeemed!",
        description: `You've successfully redeemed ${reward.name} for ${reward.points} points.`,
      });
    } else {
      // Show error toast if not enough points
      toast({
        title: "Not Enough Points",
        description: `You need ${reward.points - loyaltyPoints} more points to redeem this reward.`,
        variant: "destructive",
      });
    }
  };

  // Function to toggle history view
  const toggleHistoryView = () => {
    setShowAllHistory(prev => !prev);
  };

  // Progress calculation
  const progressPercentage = Math.min((loyaltyPoints / nextRewardAt) * 100, 100);

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="bellboy-card bg-bellboy text-white mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Heart size={24} className="mr-2 text-bellboy-gold" />
              <h2 className="text-xl font-serif font-semibold">BellBoy Rewards</h2>
            </div>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-7 w-7 text-white hover:text-white hover:bg-white/20">
                    <AlertCircle size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Earn points for every stay and service. Redeem points for exclusive rewards.</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-bellboy-gold font-bold">{loyaltyPoints} pts</span>
            </div>
          </div>
          
          <p className="text-sm text-white/80 mb-2">Progress to next reward</p>
          <Progress value={progressPercentage} className="h-2 mb-2 bg-white/20" indicatorClassName="bg-bellboy-gold" />
          <div className="flex justify-between text-xs text-white/80">
            <span>Current: {loyaltyPoints}</span>
            <span>Next reward: {nextRewardAt}</span>
          </div>
        </div>
        
        <h2 className="text-xl font-serif font-semibold mb-4 flex items-center">
          <Gift size={20} className="mr-2 text-bellboy" />
          Available Rewards
        </h2>
        
        <div className="space-y-4">
          {availableRewards.length > 0 ? (
            availableRewards.map((reward) => (
              <div key={reward.id} className="bellboy-card hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-medium text-foreground">{reward.name}</h3>
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-bellboy font-bold">{reward.points} pts</p>
                    <Button 
                      className={`mt-2 px-4 py-1 ${loyaltyPoints >= reward.points ? 'bg-bellboy hover:bg-bellboy-light text-white' : 'bg-muted text-muted-foreground'}`}
                      disabled={loyaltyPoints < reward.points}
                      onClick={() => handleRedeemReward(reward)}
                    >
                      {loyaltyPoints >= reward.points ? 'Redeem' : 'Not Enough Points'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bellboy-card text-center p-6">
              <p className="text-muted-foreground">No available rewards at the moment.</p>
              <Button className="mt-4 bg-bellboy hover:bg-bellboy-light" onClick={() => toast({
                title: "Coming Soon!",
                description: "New rewards will be available soon. Check back later!"
              })}>
                Check for New Rewards
              </Button>
            </div>
          )}
        </div>
        
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-semibold flex items-center">
              <Check size={20} className="mr-2 text-green-500" />
              Rewards History
            </h2>
            {rewardsHistory.length > 2 && (
              <Button 
                variant="ghost" 
                className="text-bellboy flex items-center text-sm hover:bg-bellboy/10"
                onClick={toggleHistoryView}
              >
                <span>{showAllHistory ? "Show Less" : "View All"}</span>
                <ArrowRight size={16} className={`ml-1 transition-transform duration-300 ${showAllHistory ? "rotate-90" : ""}`} />
              </Button>
            )}
          </div>
          
          {rewardsHistory.length > 0 ? (
            <div className="space-y-4">
              {(showAllHistory ? rewardsHistory : rewardsHistory.slice(0, 2)).map((reward) => (
                <div key={reward.id} className="bellboy-card hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-foreground">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">{reward.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Redeemed on {reward.date}</p>
                    </div>
                    <div className="flex items-center">
                      <Gift size={16} className="mr-2 text-bellboy" />
                      <span className="text-bellboy font-medium">{reward.points} pts</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bellboy-card text-center p-6">
              <p className="text-muted-foreground">No rewards history yet</p>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default Rewards;
