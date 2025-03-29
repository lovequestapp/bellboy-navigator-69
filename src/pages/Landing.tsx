import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Bed, 
  MapPin, 
  Heart, 
  Calendar, 
  ChefHat, 
  Star, 
  Key, 
  MessageSquare, 
  Shield,
  Globe,
  Gift,
  ArrowRight,
  Check,
  Smartphone,
  Clock
} from "lucide-react";
import PageContainer from "@/components/layout/PageContainer";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";

const LuxuryFeatureCard = ({ 
  icon, 
  title, 
  description, 
  imageSrc 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  imageSrc: string;
}) => (
  <Card className="overflow-hidden border-0 shadow-xl transition-all duration-300 hover:shadow-2xl group relative bg-white rounded-xl flex flex-col h-full">
    <div className="absolute inset-0 bg-gradient-to-b from-bellboy/30 to-bellboy-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
    
    <div className="h-40 overflow-hidden">
      <img 
        src={imageSrc} 
        alt={title} 
        className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
      />
    </div>
    
    <CardHeader className="pb-2 relative z-20">
      <div className="w-12 h-12 rounded-full bg-bellboy-accent flex items-center justify-center mb-2">
        <div className="text-bellboy">{icon}</div>
      </div>
      <CardTitle className="font-serif text-xl font-semibold text-bellboy-dark group-hover:text-white transition-colors duration-300">{title}</CardTitle>
    </CardHeader>
    
    <CardContent className="flex-grow relative z-20">
      <p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300">{description}</p>
    </CardContent>
    
    <CardFooter className="pt-0 relative z-20">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="ghost" className="p-0 text-bellboy hover:text-bellboy-light group-hover:text-white transition-colors duration-300">
            Learn more <ArrowRight className="ml-1" size={16} />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold text-bellboy">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
            <ul className="text-sm space-y-1">
              {[1, 2, 3].map((_, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check size={14} className="text-bellboy" />
                  <span>Feature benefit {i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </HoverCardContent>
      </HoverCard>
    </CardFooter>
  </Card>
);

const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  company, 
  imageSrc 
}: { 
  quote: string; 
  author: string; 
  role: string; 
  company: string; 
  imageSrc: string;
}) => (
  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
    <CardContent className="p-0">
      <div className="relative">
        <img 
          src={imageSrc} 
          alt={author}
          className="w-full h-32 object-cover object-center opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bellboy-dark/70"></div>
      </div>
      <div className="p-6">
        <div className="flex justify-start mb-4">
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Star key={i} size={18} className="fill-bellboy-gold text-bellboy-gold mr-1" />
          ))}
        </div>
        <p className="italic text-foreground mb-6 border-l-4 border-bellboy-accent pl-4 py-2">"{quote}"</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-bellboy/10 flex items-center justify-center text-bellboy font-serif text-xl">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-muted-foreground">{role}, {company}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ValuePropositionCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-bellboy-accent/20 hover:shadow-xl transition-all duration-300">
    <CardContent className="p-6 flex flex-col items-center text-center">
      <div className="h-16 w-16 rounded-full bg-gradient-to-br from-bellboy to-bellboy-light flex items-center justify-center mb-4 shadow-lg">
        {React.cloneElement(icon as React.ReactElement, { 
          size: 32, 
          className: "text-white" 
        })}
      </div>
      <CardTitle className="font-serif font-semibold text-xl mb-3">{title}</CardTitle>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const StepCard = ({ 
  step, 
  title, 
  description, 
  features, 
  imageSrc 
}: { 
  step: number; 
  title: string; 
  description: string; 
  features: string[]; 
  imageSrc: string;
}) => (
  <div className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow-xl overflow-hidden">
    <div className="w-full md:w-1/2 p-8">
      <div className="inline-block px-4 py-2 bg-bellboy text-white rounded-full font-medium mb-4">
        Step {step}
      </div>
      <h3 className="font-serif text-2xl font-medium mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
      <ul className="space-y-3">
        {features.map((item, i) => (
          <li key={i} className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-bellboy/10 flex items-center justify-center mr-3">
              <Check size={14} className="text-bellboy" />
            </div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="w-full md:w-1/2">
      <div className="relative h-full min-h-[300px] overflow-hidden">
        <div className="absolute inset-0 bg-bellboy/10"></div>
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PageContainer showBottomNav={true} className="px-0 pb-0">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 md:px-8 bg-gradient-to-br from-bellboy-dark via-bellboy to-bellboy-light text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578683010236-d716f9a3f461')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
            Transform Your <span className="text-bellboy-accent">Hotel Experience</span> with BellBoy
          </h1>
          <p className="text-white/90 text-xl md:text-2xl mb-10 leading-relaxed">
            Your AI-powered travel companion that puts premium hotel services in the palm of your hand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-bellboy hover:bg-bellboy-accent hover:text-bellboy-dark font-medium shadow-md"
              onClick={() => navigate("/")}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10 shadow-md font-medium"
              onClick={() => navigate("/hotels")}
            >
              Explore Features
            </Button>
          </div>
          
          <div className="relative mt-16 max-w-xs mx-auto sm:max-w-sm">
            <div className="absolute -top-6 -right-6 -left-6 -bottom-6 bg-gradient-to-br from-bellboy-accent to-bellboy-gold/40 rounded-2xl transform rotate-3"></div>
            <div className="absolute -top-6 -right-6 -left-6 -bottom-6 bg-bellboy-accent/30 backdrop-blur-sm rounded-2xl transform -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
              alt="Woman using BellBoy app" 
              className="relative rounded-xl shadow-2xl border-4 border-white z-10"
            />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 px-4 bg-gradient-to-b from-background to-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-semibold mb-6">Why Choose BellBoy?</h2>
          <p className="text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            BellBoy revolutionizes how you experience hotels and travel by combining AI-driven personalization with seamless service access.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValuePropositionCard 
              icon={<Clock />} 
              title="Save Time" 
              description="Skip front desk lines with mobile check-in and instant room access" 
            />
            
            <ValuePropositionCard 
              icon={<Shield />} 
              title="Enhanced Privacy" 
              description="Private, contactless service ordering and personalized recommendations" 
            />
            
            <ValuePropositionCard 
              icon={<Globe />} 
              title="Local Expertise" 
              description="Discover hidden gems with AI-curated local recommendations" 
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 bg-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571896349842-33c89424de2d')] opacity-5 bg-cover bg-fixed"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="font-serif text-4xl font-semibold mb-3 text-center">Luxury Features</h2>
          <p className="text-muted-foreground mb-16 text-center max-w-2xl mx-auto text-lg">
            BellBoy integrates every aspect of your hotel stay into one seamless experience
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <LuxuryFeatureCard 
              icon={<Key size={24} />} 
              title="Digital Room Key" 
              description="Access your room instantly with your smartphone, eliminating the need for physical key cards." 
              imageSrc="https://images.unsplash.com/photo-1545128485-c400e7702796"
            />
            <LuxuryFeatureCard 
              icon={<ChefHat size={24} />} 
              title="Room Service" 
              description="Order meals and services with personalized AI recommendations tailored to your preferences." 
              imageSrc="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
            />
            <LuxuryFeatureCard 
              icon={<MapPin size={24} />} 
              title="City Exploration" 
              description="Discover local attractions and hidden gems with AI-powered recommendations based on your interests." 
              imageSrc="https://images.unsplash.com/photo-1519741347686-c1e331ec5a7a"
            />
            <LuxuryFeatureCard 
              icon={<Calendar size={24} />} 
              title="Quick Check-in/out" 
              description="Skip the line with mobile check-in and check-out, saving you valuable time during your travels." 
              imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
            />
            <LuxuryFeatureCard 
              icon={<Bell size={24} />} 
              title="Service Requests" 
              description="Request housekeeping, maintenance, or concierge services with just a few taps on your smartphone." 
              imageSrc="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            />
            <LuxuryFeatureCard 
              icon={<Heart size={24} />} 
              title="Loyalty Rewards" 
              description="Earn points with every stay and unlock exclusive perks, upgrades, and special offers." 
              imageSrc="https://images.unsplash.com/photo-1494526585095-c41746248156"
            />
            <LuxuryFeatureCard 
              icon={<MessageSquare size={24} />} 
              title="Instant Support" 
              description="Chat with hotel staff or AI assistant anytime to resolve questions or address concerns immediately." 
              imageSrc="https://images.unsplash.com/photo-1534536281715-e28d76689b4d"
            />
            <LuxuryFeatureCard 
              icon={<Bed size={24} />} 
              title="Room Customization" 
              description="Personalize your room settings, temperature, and ambiance before you even arrive at the hotel." 
              imageSrc="https://images.unsplash.com/photo-1590490360182-c33d57733427"
            />
            <LuxuryFeatureCard 
              icon={<Gift size={24} />} 
              title="Special Offers" 
              description="Access exclusive deals and personalized promotions based on your preferences and travel history." 
              imageSrc="https://images.unsplash.com/photo-1549465220-1a8b9238cd48"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-muted/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl font-semibold mb-3 text-center">What Our Users Say</h2>
          <p className="text-muted-foreground mb-16 text-center max-w-2xl mx-auto text-lg">
            Discover how BellBoy has transformed the travel experience for our users
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="BellBoy saved me so much time during my business trip. The mobile check-in and room key feature was a game-changer."
              author="Sarah Johnson"
              role="Marketing Director"
              company="Tech Innovations"
              imageSrc="https://images.unsplash.com/photo-1551373884-8a0750074df7"
            />
            <TestimonialCard 
              quote="The restaurant recommendations were spot on! BellBoy knew exactly what I would enjoy based on my preferences."
              author="Michael Chen"
              role="Software Engineer"
              company="CloudTech"
              imageSrc="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8"
            />
            <TestimonialCard 
              quote="I discovered the most amazing local spots that weren't on any tourist map. BellBoy made my vacation truly unforgettable."
              author="Emma Rodriguez"
              role="Travel Blogger"
              company="Wanderlust Weekly"
              imageSrc="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl font-semibold mb-6 text-center">How BellBoy Works</h2>
          <p className="text-muted-foreground mb-16 text-center max-w-2xl mx-auto text-lg">
            Experience luxury hotel service at your fingertips in three simple steps
          </p>
          
          <div className="space-y-12">
            <StepCard 
              step={1}
              title="Download & Register"
              description="Download the BellBoy app and create your personalized profile with your preferences and needs. Our AI learns from your choices to enhance your experience."
              features={[
                "Simple registration process", 
                "Preference customization", 
                "Secure account creation"
              ]}
              imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
            />
            
            <StepCard 
              step={2}
              title="Add Your Hotel Stay"
              description="Register your upcoming hotel visits by scanning your reservation or entering your booking details. BellBoy connects with the hotel to prepare for your arrival."
              features={[
                "QR code reservation scanning", 
                "Seamless hotel integration", 
                "Pre-arrival preparation"
              ]}
              imageSrc="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            />
            
            <StepCard 
              step={3}
              title="Enjoy Seamless Service"
              description="Use BellBoy throughout your stay to access your room, order services, explore the city, and communicate with hotel staff without friction."
              features={[
                "Digital room access", 
                "On-demand service ordering", 
                "AI-powered recommendations",
                "Instant staff communication"
              ]}
              imageSrc="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-bellboy to-bellboy-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-serif text-4xl font-semibold mb-6">Ready to Transform Your Travel Experience?</h2>
          <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who have upgraded their hotel stays with BellBoy's AI-powered assistant.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-bellboy hover:bg-bellboy-accent hover:text-bellboy-dark font-medium shadow-lg"
            onClick={() => navigate("/")}
          >
            Get Started Now <ArrowRight className="ml-2" />
          </Button>
          <p className="mt-6 text-white/80 text-sm">No credit card required • Free to download</p>
          
          <div className="mt-16 flex justify-center">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl">
              <Smartphone size={32} className="text-white" />
              <div className="text-left">
                <p className="text-sm text-white/80">Download our app</p>
                <p className="font-semibold">Available on iOS and Android</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-16 px-4 bg-bellboy-dark text-white/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-serif font-semibold text-white text-xl mb-6">BellBoy</h3>
              <p className="text-sm mb-6">
                Your AI-powered hotel companion for a seamless travel experience.
              </p>
              <div className="flex space-x-4">
                {/* Social media links would go here */}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-lg">Features</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white transition-colors duration-200">Hotel Check-in/out</li>
                <li className="hover:text-white transition-colors duration-200">Room Service</li>
                <li className="hover:text-white transition-colors duration-200">City Exploration</li>
                <li className="hover:text-white transition-colors duration-200">Loyalty Rewards</li>
                <li className="hover:text-white transition-colors duration-200">Concierge Services</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white transition-colors duration-200">About Us</li>
                <li className="hover:text-white transition-colors duration-200">Careers</li>
                <li className="hover:text-white transition-colors duration-200">Partners</li>
                <li className="hover:text-white transition-colors duration-200">Blog</li>
                <li className="hover:text-white transition-colors duration-200">Press</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-white transition-colors duration-200">Help Center</li>
                <li className="hover:text-white transition-colors duration-200">Contact Us</li>
                <li className="hover:text-white transition-colors duration-200">Privacy Policy</li>
                <li className="hover:text-white transition-colors duration-200">Terms of Service</li>
                <li className="hover:text-white transition-colors duration-200">FAQ</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm">
            <p>&copy; 2023 BellBoy Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </PageContainer>
  );
};

export default Landing;
