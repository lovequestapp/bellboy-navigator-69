
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Monitor, Home, Earth } from "lucide-react";

interface RoomModeVisualizerProps {
  activeMode: string;
}

const RoomModeVisualizer: React.FC<RoomModeVisualizerProps> = ({ activeMode }) => {
  const modeDetails = {
    default: {
      title: "Default Mode",
      description: "Standard room settings with optimal comfort",
      icon: <Home className="h-8 w-8 text-white/80" />,
      gradient: "from-blue-400 to-blue-600",
      animation: "pulse",
    },
    sleep: {
      title: "Sleep Mode",
      description: "Optimized for rest with dim lighting and comfortable temperature",
      icon: <Settings className="h-8 w-8 text-white/80" />,
      gradient: "from-indigo-900 to-purple-900",
      animation: "breathe",
    },
    work: {
      title: "Work Mode",
      description: "Enhanced lighting and settings for productivity",
      icon: <Monitor className="h-8 w-8 text-white/80" />,
      gradient: "from-amber-400 to-orange-600",
      animation: "rise",
    },
    relax: {
      title: "Relax Mode",
      description: "Ambient lighting and calm atmosphere",
      icon: <Settings className="h-8 w-8 text-white/80" />,
      gradient: "from-green-400 to-teal-500",
      animation: "float",
    },
    eco: {
      title: "Eco Mode",
      description: "Energy efficient settings to reduce consumption",
      icon: <Earth className="h-8 w-8 text-white/80" />,
      gradient: "from-green-600 to-emerald-700",
      animation: "wave",
    },
  };

  // Helper function to get current mode details
  const getCurrentMode = () => modeDetails[activeMode as keyof typeof modeDetails] || modeDetails.default;

  return (
    <div className="w-full rounded-xl overflow-hidden h-48 md:h-64 relative mb-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.4 }}
          className={`absolute inset-0 bg-gradient-to-br ${getCurrentMode().gradient} flex flex-col items-center justify-center p-6 text-center`}
        >
          <div className="relative w-16 h-16 mb-4">
            <motion.div 
              className="absolute inset-0 bg-white/10 rounded-full"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.5, 0.7],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {getCurrentMode().icon}
            </div>
          </div>
          <motion.h3 
            className="text-xl font-medium text-white mb-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {getCurrentMode().title}
          </motion.h3>
          <motion.p 
            className="text-white/80 text-sm max-w-xs"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {getCurrentMode().description}
          </motion.p>

          {/* Scene elements that change based on mode */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {activeMode === "sleep" && (
              <>
                <motion.div 
                  className="absolute top-10 right-10 w-3 h-3 bg-white rounded-full"
                  animate={{ 
                    opacity: [0.5, 0.2, 0.5],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute top-20 right-32 w-2 h-2 bg-white rounded-full"
                  animate={{ 
                    opacity: [0.3, 0.1, 0.3],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </>
            )}
            
            {activeMode === "work" && (
              <>
                <motion.div 
                  className="absolute bottom-10 left-10 w-16 h-1 bg-white/20 rounded-full"
                  animate={{ width: [16, 40, 16] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute bottom-16 left-20 w-24 h-1 bg-white/10 rounded-full"
                  animate={{ width: [24, 60, 24] }}
                  transition={{ duration: 7, repeat: Infinity }}
                />
              </>
            )}
            
            {activeMode === "relax" && (
              <>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-teal-500/20 to-transparent"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
              </>
            )}
            
            {activeMode === "eco" && (
              <>
                <motion.div 
                  className="absolute top-5 left-5 w-8 h-8 border border-white/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute bottom-5 right-5 w-12 h-12 border border-white/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoomModeVisualizer;
