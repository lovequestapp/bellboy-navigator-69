
import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import SmartRoomAccess from "@/components/smart-room/SmartRoomAccess";
import { getUpcomingHotels } from "@/services/hotelService";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DoorClosed, Loader2, Shield, Fingerprint } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const SmartRoom: React.FC = () => {
  const navigate = useNavigate();
  const upcomingHotels = getUpcomingHotels();
  const [isLoading, setIsLoading] = useState(true);
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [biometricProgress, setBiometricProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading time for room access verification
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (upcomingHotels.length > 0) {
        setIsAccessGranted(false); // We'll require explicit verification for enhanced security
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [upcomingHotels.length]);
  
  const handleRoomAccessAttempt = () => {
    setIsBiometricOpen(true);
    
    // Simulate biometric scanning
    let progress = 0;
    const scanInterval = setInterval(() => {
      progress += 7;
      setBiometricProgress(progress);
      
      if (progress >= 100) {
        clearInterval(scanInterval);
        setTimeout(() => {
          setIsBiometricOpen(false);
          setIsLoading(true);
          
          // After a short delay, grant access
          setTimeout(() => {
            setIsLoading(false);
            setIsAccessGranted(true);
            
            toast({
              title: "Biometric Authentication Successful",
              description: "You now have secure access to Room 412"
            });
          }, 1200);
        }, 500);
      }
    }, 150);
  };
  
  // If no hotel stays, show a prompt to add one
  if (upcomingHotels.length === 0 && !isLoading) {
    return (
      <PageContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-bellboy/10 rounded-full flex items-center justify-center mb-4">
            <DoorClosed size={30} className="text-bellboy" />
          </div>
          <h2 className="text-2xl font-serif font-semibold mb-2">No Active Rooms</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            You need to have an active hotel stay to access smart room controls.
          </p>
          <Button 
            onClick={() => navigate('/check-in')}
            className="bg-bellboy hover:bg-bellboy-light text-white"
          >
            Add Hotel Stay
          </Button>
        </motion.div>
      </PageContainer>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <PageContainer>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <Loader2 size={40} className="text-bellboy animate-spin mb-4" />
          <h2 className="text-xl font-serif font-medium mb-2">Verifying Room Access</h2>
          <p className="text-muted-foreground max-w-md">
            Please wait while we synchronize with the hotel systems...
          </p>
          <div className="w-64 h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
            <motion.div 
              className="h-full bg-bellboy"
              initial={{ width: "0%" }}
              animate={{ width: "60%" }}
              transition={{ duration: 1.5 }}
            ></motion.div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Secure Channel Established</p>
        </motion.div>
      </PageContainer>
    );
  }
  
  // Access verification needed
  if (!isAccessGranted) {
    return (
      <PageContainer>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-12 text-center glass-card mx-auto max-w-md"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-bellboy to-bellboy-light rounded-full flex items-center justify-center mb-4">
            <Shield size={30} className="text-white" />
          </div>
          <h2 className="text-2xl font-serif font-semibold mb-2">Secure Room Access</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Welcome to {upcomingHotels[0].name}. For your security, please verify your identity to access your room controls.
          </p>
          
          <motion.div 
            className="bg-black/5 backdrop-blur-lg p-6 rounded-lg w-full mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Room:</span>
              <span className="text-bellboy">412</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Check-in:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Check-out:</span>
              <span>{new Date(Date.now() + 86400000 * 3).toLocaleDateString()}</span>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Button 
              onClick={handleRoomAccessAttempt}
              className="w-full bg-gradient-to-r from-bellboy to-bellboy-light text-white hover:opacity-90 transition-all shadow-luxury"
              size="lg"
            >
              <Fingerprint className="mr-2" size={18} />
              Authenticate Access
            </Button>
          </motion.div>
          
          <p className="text-xs text-muted-foreground mt-4">
            Your biometric data is securely stored and never leaves your device
          </p>
        </motion.div>

        {/* Biometric Authentication Dialog */}
        <Dialog open={isBiometricOpen} onOpenChange={setIsBiometricOpen}>
          <DialogContent className="sm:max-w-md bg-black/80 text-white border-white/20">
            <DialogHeader>
              <DialogTitle className="text-center text-white">Biometric Authentication</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center justify-center py-6 space-y-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div 
                  className="absolute inset-0 border-4 border-white/20 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
                <motion.div 
                  className="absolute inset-0 border-4 border-transparent border-t-bellboy rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                <Fingerprint size={56} className="text-white/80" />
              </div>
              
              <div className="w-full space-y-2">
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-bellboy to-bellboy-light transition-all duration-300" 
                    style={{ width: `${biometricProgress}%` }}
                  ></motion.div>
                </div>
                <div className="flex justify-between text-xs text-white/60">
                  <span>Processing</span>
                  <span>{biometricProgress}%</span>
                </div>
              </div>
              
              <p className="text-sm text-white/60 text-center">
                Please keep your finger on the scanner
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </PageContainer>
    );
  }
  
  // Show room access controls with animation
  return (
    <PageContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key="room-access"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SmartRoomAccess 
            roomNumber="412" 
            hotel={{
              name: upcomingHotels[0].name,
              id: upcomingHotels[0].id
            }} 
          />
        </motion.div>
      </AnimatePresence>
    </PageContainer>
  );
};

export default SmartRoom;
