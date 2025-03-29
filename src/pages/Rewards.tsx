
import React from "react";
import { Heart, Gift, ArrowRight } from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { Progress } from "@/components/ui/progress";

const Rewards: React.FC = () => {
  // Mock data
  const loyaltyPoints = 1250;
  const nextRewardAt = 2000;
  const rewardsHistory = [
    {
      id: "1",
      name: "Free Breakfast",
      date: "Sept 12, 2023",
      points: 500,
      status: "Redeemed",
    },
    {
      id: "2",
      name: "Room Upgrade",
      date: "Aug 24, 2023",
      points: 1000,
      status: "Redeemed",
    },
  ];
  
  const availableRewards = [
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
  ];

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="bellboy-card bg-bellboy text-white mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Heart size={24} className="mr-2 text-bellboy-gold" />
              <h2 className="text-xl font-serif font-semibold">BellBoy Rewards</h2>
            </div>
            <span className="text-bellboy-gold font-bold">{loyaltyPoints} pts</span>
          </div>
          
          <p className="text-sm text-white/80 mb-2">Progress to next reward</p>
          <Progress value={(loyaltyPoints / nextRewardAt) * 100} className="h-2 mb-2" />
          <p className="text-xs text-right text-white/80">{loyaltyPoints} / {nextRewardAt} points</p>
        </div>
        
        <h2 className="text-xl font-serif font-semibold mb-4">Available Rewards</h2>
        <div className="space-y-4">
          {availableRewards.map((reward) => (
            <div key={reward.id} className="bellboy-card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-medium text-foreground">{reward.name}</h3>
                  <p className="text-sm text-muted-foreground">{reward.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-bellboy font-bold">{reward.points} pts</p>
                  <button 
                    className={`mt-2 px-4 py-1 rounded-md text-sm ${loyaltyPoints >= reward.points ? 'bg-bellboy text-white' : 'bg-muted text-muted-foreground'}`}
                    disabled={loyaltyPoints < reward.points}
                  >
                    {loyaltyPoints >= reward.points ? 'Redeem' : 'Not Enough Points'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-serif font-semibold">Rewards History</h2>
            {rewardsHistory.length > 0 && (
              <button className="text-bellboy flex items-center text-sm">
                <span>View All</span>
                <ArrowRight size={16} className="ml-1" />
              </button>
            )}
          </div>
          
          {rewardsHistory.length > 0 ? (
            <div className="space-y-4">
              {rewardsHistory.map((reward) => (
                <div key={reward.id} className="bellboy-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-medium text-foreground">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">Redeemed on {reward.date}</p>
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
