
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Bell, 
  Bed, 
  MapPin, 
  Heart, 
  Calendar, 
  ChefHat, 
  Star, 
  DoorOpen, 
  Key, 
  Smartphone, 
  ShoppingBag, 
  Gift, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Globe,
  MessageSquare,
  Shield
} from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="h-full transition-all duration-300 hover:shadow-lg border-border/50">
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className="h-12 w-12 rounded-full bg-bellboy-accent flex items-center justify-center mb-4">
        <div className="text-bellboy">{icon}</div>
      </div>
      <h3 className="font-serif font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </CardContent>
  </Card>
);

const TestimonialCard = ({ quote, author, role, company }: { quote: string; author: string; role: string; company: string }) => (
  <Card className="border-border/50 bg-white">
    <CardContent className="p-6">
      <div className="flex justify-start mb-4">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <Star key={i} size={18} className="fill-bellboy-gold text-bellboy-gold mr-1" />
        ))}
      </div>
      <p className="italic text-foreground mb-4">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}, {company}</p>
      </div>
    </CardContent>
  </Card>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PageContainer showBottomNav={false} className="px-0 pb-0">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-br from-bellboy-dark via-bellboy to-bellboy-light text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Transform Your Hotel Experience with BellBoy
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
            Your AI-powered travel companion that puts premium hotel services in the palm of your hand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              size="lg" 
              className="bg-white text-bellboy hover:bg-bellboy-accent font-medium"
              onClick={() => navigate("/")}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => navigate("/hotels")}
            >
              Explore Features
            </Button>
          </div>
          <div className="relative mt-12 max-w-md mx-auto">
            <div className="absolute -top-4 -left-4 w-full h-full bg-bellboy-accent rounded-lg"></div>
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
              alt="Woman using BellBoy app" 
              className="relative rounded-lg shadow-lg border-4 border-white z-10"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-semibold mb-6">Why Choose BellBoy?</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            BellBoy revolutionizes how you experience hotels and travel by combining AI-driven personalization with seamless service access.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-bellboy-accent flex items-center justify-center mb-4">
                <Clock size={32} className="text-bellboy" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Save Time</h3>
              <p className="text-muted-foreground text-center">Skip front desk lines with mobile check-in and instant room access</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-bellboy-accent flex items-center justify-center mb-4">
                <Shield size={32} className="text-bellboy" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Enhanced Privacy</h3>
              <p className="text-muted-foreground text-center">Private, contactless service ordering and personalized recommendations</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-bellboy-accent flex items-center justify-center mb-4">
                <Globe size={32} className="text-bellboy" />
              </div>
              <h3 className="font-serif font-semibold text-xl mb-2">Local Expertise</h3>
              <p className="text-muted-foreground text-center">Discover hidden gems with AI-curated local recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold mb-3 text-center">Comprehensive Features</h2>
          <p className="text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            BellBoy integrates every aspect of your hotel stay into one seamless experience
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Key size={24} />} 
              title="Digital Room Key" 
              description="Access your room instantly with your smartphone"
            />
            <FeatureCard 
              icon={<ChefHat size={24} />} 
              title="Room Service" 
              description="Order meals and services with personalized recommendations"
            />
            <FeatureCard 
              icon={<MapPin size={24} />} 
              title="City Exploration" 
              description="Discover local attractions and hidden gems"
            />
            <FeatureCard 
              icon={<Calendar size={24} />} 
              title="Quick Check-in/out" 
              description="Skip the line with mobile check-in and check-out"
            />
            <FeatureCard 
              icon={<Bell size={24} />} 
              title="Service Requests" 
              description="Request housekeeping, maintenance, or concierge services"
            />
            <FeatureCard 
              icon={<Heart size={24} />} 
              title="Loyalty Rewards" 
              description="Earn points with every stay and unlock exclusive perks"
            />
            <FeatureCard 
              icon={<MessageSquare size={24} />} 
              title="Instant Support" 
              description="Chat with hotel staff or AI assistant anytime"
            />
            <FeatureCard 
              icon={<ShoppingBag size={24} />} 
              title="Local Shopping" 
              description="Find and order from nearby shops and services"
            />
            <FeatureCard 
              icon={<Gift size={24} />} 
              title="Special Offers" 
              description="Access exclusive deals and personalized promotions"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold mb-3 text-center">What Our Users Say</h2>
          <p className="text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Discover how BellBoy has transformed the travel experience for our users
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TestimonialCard 
              quote="BellBoy saved me so much time during my business trip. The mobile check-in and room key feature was a game-changer."
              author="Sarah Johnson"
              role="Marketing Director"
              company="Tech Innovations"
            />
            <TestimonialCard 
              quote="The restaurant recommendations were spot on! BellBoy knew exactly what I would enjoy based on my preferences."
              author="Michael Chen"
              role="Software Engineer"
              company="CloudTech"
            />
            <TestimonialCard 
              quote="I discovered the most amazing local spots that weren't on any tourist map. BellBoy made my vacation truly unforgettable."
              author="Emma Rodriguez"
              role="Travel Blogger"
              company="Wanderlust Weekly"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-semibold mb-6 text-center">How BellBoy Works</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-muted rounded-xl p-2">
                  <div className="bg-bellboy text-white text-center rounded-lg py-2 mb-2">
                    <p className="font-medium">Step 1</p>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Download and setup" 
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif text-2xl font-medium mb-3">Download & Register</h3>
                <p className="text-muted-foreground mb-4">
                  Download the BellBoy app and create your personalized profile with your preferences and needs. Our AI learns from your choices to enhance your experience.
                </p>
                <ul className="space-y-2">
                  {[
                    "Simple registration process", 
                    "Preference customization", 
                    "Secure account creation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle size={16} className="text-bellboy mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex flex-col-reverse md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <h3 className="font-serif text-2xl font-medium mb-3">Add Your Hotel Stay</h3>
                <p className="text-muted-foreground mb-4">
                  Register your upcoming hotel visits by scanning your reservation or entering your booking details. BellBoy connects with the hotel to prepare for your arrival.
                </p>
                <ul className="space-y-2">
                  {[
                    "QR code reservation scanning", 
                    "Seamless hotel integration", 
                    "Pre-arrival preparation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle size={16} className="text-bellboy mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/2">
                <div className="bg-muted rounded-xl p-2">
                  <div className="bg-bellboy text-white text-center rounded-lg py-2 mb-2">
                    <p className="font-medium">Step 2</p>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="Add hotel stay" 
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="bg-muted rounded-xl p-2">
                  <div className="bg-bellboy text-white text-center rounded-lg py-2 mb-2">
                    <p className="font-medium">Step 3</p>
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                    alt="Enjoy your stay" 
                    className="rounded-lg"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <h3 className="font-serif text-2xl font-medium mb-3">Enjoy Seamless Service</h3>
                <p className="text-muted-foreground mb-4">
                  Use BellBoy throughout your stay to access your room, order services, explore the city, and communicate with hotel staff without friction.
                </p>
                <ul className="space-y-2">
                  {[
                    "Digital room access", 
                    "On-demand service ordering", 
                    "AI-powered recommendations",
                    "Instant staff communication"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle size={16} className="text-bellboy mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-bellboy text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl font-semibold mb-6">Ready to Transform Your Travel Experience?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have upgraded their hotel stays with BellBoy's AI-powered assistant.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-bellboy hover:bg-bellboy-accent"
            onClick={() => navigate("/")}
          >
            Get Started Now <ArrowRight className="ml-2" />
          </Button>
          <p className="mt-4 text-white/80 text-sm">No credit card required • Free to download</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-bellboy-dark text-white/80">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-semibold text-white mb-4">BellBoy</h3>
              <p className="text-sm mb-4">
                Your AI-powered hotel companion for a seamless travel experience.
              </p>
              <div className="flex space-x-4">
                {/* Social media links would go here */}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>Hotel Check-in/out</li>
                <li>Room Service</li>
                <li>City Exploration</li>
                <li>Loyalty Rewards</li>
                <li>Concierge Services</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>About Us</li>
                <li>Careers</li>
                <li>Partners</li>
                <li>Blog</li>
                <li>Press</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2023 BellBoy Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </PageContainer>
  );
};

export default Landing;
