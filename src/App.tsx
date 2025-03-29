
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Set default accent color for luxury aesthetics
document.documentElement.style.setProperty("--bellboy-color", "#0F3460");

const queryClient = new QueryClient();

const App = () => (
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
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </TooltipProvider>
        </PreferencesProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
