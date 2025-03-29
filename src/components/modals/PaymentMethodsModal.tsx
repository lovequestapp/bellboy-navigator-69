
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, X, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
}

interface PaymentMethodsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentMethodsModal: React.FC<PaymentMethodsModalProps> = ({ open, onOpenChange }) => {
  // Mock payment methods data
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card_1",
      type: "visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "card_2",
      type: "mastercard",
      last4: "5555",
      expMonth: 4,
      expYear: 2024,
      isDefault: false,
    }
  ]);
  
  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const toggleAddCard = () => {
    setShowAddCard(!showAddCard);
  };

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
  };

  const handleAddCard = () => {
    // Basic validation
    if (!newCard.cardNumber || !newCard.expiry || !newCard.cvc || !newCard.name) {
      toast({
        title: "Error",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to a payment processor
    const last4 = newCard.cardNumber.slice(-4);
    const [expMonth, expYear] = newCard.expiry.split("/").map(Number);
    
    const newPaymentMethod: PaymentMethod = {
      id: `card_${Date.now()}`,
      type: newCard.cardNumber.startsWith("4") ? "visa" : "mastercard",
      last4,
      expMonth,
      expYear: 2000 + expYear,
      isDefault: paymentMethods.length === 0,
    };
    
    setPaymentMethods([...paymentMethods, newPaymentMethod]);
    setNewCard({ cardNumber: "", expiry: "", cvc: "", name: "" });
    setShowAddCard(false);
    
    toast({
      title: "Card Added",
      description: `Card ending in ${last4} has been added to your account.`,
    });
  };

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    
    const card = paymentMethods.find(method => method.id === id);
    if (card) {
      toast({
        title: "Default Payment Method Updated",
        description: `Card ending in ${card.last4} is now your default payment method.`,
      });
    }
  };

  const handleRemoveCard = (id: string) => {
    const card = paymentMethods.find(method => method.id === id);
    if (card?.isDefault && paymentMethods.length > 1) {
      toast({
        title: "Cannot Remove Default Card",
        description: "Please set another card as default first.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
    
    // If we removed the last card, close the modal
    if (updatedMethods.length === 0) {
      onOpenChange(false);
    }
    
    if (card) {
      toast({
        title: "Card Removed",
        description: `Card ending in ${card.last4} has been removed.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-serif">Payment Methods</DialogTitle>
          <DialogDescription>
            Manage your payment methods for booking stays and services.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          {paymentMethods.map(method => (
            <div 
              key={method.id} 
              className={`p-4 border rounded-lg flex items-center justify-between ${
                method.isDefault ? "border-bellboy-accent bg-accent/10" : ""
              }`}
            >
              <div className="flex items-center">
                <CreditCard 
                  size={20} 
                  className="mr-3" 
                  style={{ color: method.isDefault ? "var(--bellboy-color)" : "" }} 
                />
                <div>
                  <p className="text-sm font-medium">
                    {method.type.charAt(0).toUpperCase() + method.type.slice(1)} •••• {method.last4}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires {method.expMonth}/{method.expYear}
                    {method.isDefault && <span className="ml-2 text-bellboy-accent">Default</span>}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                {!method.isDefault && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set Default
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveCard(method.id)}
                >
                  <Trash2 size={16} className="text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          
          {showAddCard ? (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">Add New Card</h4>
                <Button variant="ghost" size="icon" onClick={toggleAddCard}>
                  <X size={16} />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Input
                    name="cardNumber"
                    placeholder="Card Number"
                    value={newCard.cardNumber}
                    onChange={handleCardInputChange}
                    maxLength={16}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    name="expiry"
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={handleCardInputChange}
                    maxLength={5}
                  />
                  <Input
                    name="cvc"
                    placeholder="CVC"
                    value={newCard.cvc}
                    onChange={handleCardInputChange}
                    maxLength={3}
                  />
                </div>
                <Input
                  name="name"
                  placeholder="Name on Card"
                  value={newCard.name}
                  onChange={handleCardInputChange}
                />
                <Button onClick={handleAddCard} className="w-full">Add Card</Button>
              </div>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center"
              onClick={toggleAddCard}
            >
              <Plus size={16} className="mr-2" />
              Add Payment Method
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodsModal;
