
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import Hotels from "./pages/Hotels";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Explore from "./pages/Explore";
import PlaceDetails from "./pages/PlaceDetails";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import CheckIn from "./pages/CheckIn";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import VirtualConcierge from "./pages/VirtualConcierge";
import { AuthProvider } from "./contexts/AuthContext";
import { PreferencesProvider } from "./contexts/PreferencesContext";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserProfiles from "./pages/admin/UserProfiles";
import ActivityTracking from "./pages/admin/ActivityTracking";
import SupportTickets from "./pages/admin/SupportTickets";
import HotelListings from "./pages/admin/HotelListings";

// Set default accent color for luxury aesthetics
document.documentElement.style.setProperty("--bellboy-color", "#0F3460");

// Configure React Query with error handling and retry logic
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  // Monitor and handle offline/online status
  useEffect(() => {
    const handleOnline = () => {
      toast({
        title: "You're back online",
        description: "Your connection has been restored.",
      });
    };

    const handleOffline = () => {
      toast({
        title: "You're offline",
        description: "Some features may be limited until connection is restored.",
        variant: "destructive",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <PreferencesProvider>
            <TooltipProvider>
              <div className="bg-gradient-to-tr from-background to-background/95 min-h-screen">
                <Toaster />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:serviceId" element={<ServiceDetails />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/explore/:placeId" element={<PlaceDetails />} />
                  <Route path="/rewards" element={<Rewards />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/check-in" element={<CheckIn />} />
                  <Route path="/concierge" element={<VirtualConcierge />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/users" element={<UserProfiles />} />
                  <Route path="/admin/activity" element={<ActivityTracking />} />
                  <Route path="/admin/tickets" element={<SupportTickets />} />
                  <Route path="/admin/hotels" element={<HotelListings />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </TooltipProvider>
          </PreferencesProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
