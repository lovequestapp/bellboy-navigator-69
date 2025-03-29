
import React, { useState, useRef, useEffect } from "react";
import { SendIcon, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: "Hello! I'm your BellBoy virtual concierge. I can help you with information about the BellBoy app, hotel services, local recommendations, or assist with any questions about your stay. How can I assist you today?",
    timestamp: new Date(),
  },
];

// This would be replaced with actual API keys in production
const OPENAI_API_KEY_PLACEHOLDER = "sk-placeholder";

const VirtualConciergeChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // In development, we'll simulate a response
      // In production, this would be a real API call to OpenAI
      setTimeout(() => {
        const botResponses = {
          "hotel": "Our hotel offers luxury accommodations with amenities including spa services, room service, and concierge assistance. Would you like to know more about any specific service?",
          "reservation": "You can make or modify reservations directly through the BellBoy app. Just navigate to the Check-In page and follow the prompts. Would you like me to guide you there?",
          "restaurant": "We have several dining options including our main restaurant 'The Grand', a rooftop bar, and in-room dining. I can help you make a reservation or provide menus.",
          "explore": "The Explore page shows you local attractions, restaurants, and activities near your hotel. You can filter by category and distance.",
          "services": "Hotel services can be found on the Services page. You can request room service, housekeeping, wake-up calls, and more.",
          "rewards": "The BellBoy rewards program offers points for stays and services that can be redeemed for free nights, upgrades, and special experiences.",
          "default": "I'm here to help with any aspects of the BellBoy app and your hotel stay. You can ask about hotel services, local recommendations, your rewards, or any other assistance you might need during your stay."
        };

        let responseContent = botResponses.default;
        
        // Simple keyword matching
        Object.entries(botResponses).forEach(([keyword, response]) => {
          if (inputValue.toLowerCase().includes(keyword) && keyword !== "default") {
            responseContent = response;
          }
        });

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: responseContent,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
      // In production, this would be the actual API call:
      /*
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY || OPENAI_API_KEY_PLACEHOLDER}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful virtual concierge for the BellBoy hotel app. Provide information about the app features including: hotel services, local recommendations, rewards program, and check-in process. Be concise, helpful, and maintain a luxury hotel tone.'
            },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: inputValue
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: data.choices[0].message.content,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error?.message || 'Failed to get response');
      }
      */

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Unable to connect to concierge services. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[70vh] rounded-lg border shadow-sm bg-white">
      {/* Chat header */}
      <div className="flex items-center p-4 border-b">
        <Bot className="h-6 w-6 text-bellboy mr-2" />
        <h3 className="font-serif text-lg font-medium">Virtual Concierge</h3>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex-shrink-0 rounded-full p-2 flex items-center justify-center ${message.role === 'assistant' ? 'bg-bellboy text-white' : 'bg-muted'}`}>
                {message.role === 'assistant' ? (
                  <Bot className="h-5 w-5" />
                ) : (
                  <User className="h-5 w-5" />
                )}
              </div>
              <div 
                className={`mx-2 p-3 rounded-lg ${
                  message.role === 'assistant' 
                    ? 'bg-white border border-border shadow-sm' 
                    : 'bg-bellboy text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-[85%]">
              <div className="flex-shrink-0 rounded-full p-2 bg-bellboy text-white flex items-center justify-center">
                <Bot className="h-5 w-5" />
              </div>
              <div className="mx-2 p-4 rounded-lg bg-white border border-border shadow-sm">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-bellboy rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-bellboy rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="h-2 w-2 bg-bellboy rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <Separator />
      
      {/* Input area */}
      <div className="p-4 bg-white">
        <div className="flex items-end gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 min-h-[80px] resize-none focus-visible:ring-bellboy"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-bellboy hover:bg-bellboy-light h-10 px-4"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Ask about hotel services, local attractions, or how to use the app.
        </p>
      </div>
    </div>
  );
};

export default VirtualConciergeChat;
