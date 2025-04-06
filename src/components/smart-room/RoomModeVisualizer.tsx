
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Monitor, Home, Earth, Moon, Sun, Zap, Lightbulb } from "lucide-react";

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
      accent: "bg-blue-400/40",
      lightColor: "#e0f2fe",
      tempColor: "#60a5fa"
    },
    sleep: {
      title: "Sleep Mode",
      description: "Optimized for rest with dim lighting and comfortable temperature",
      icon: <Moon className="h-8 w-8 text-white/80" />,
      gradient: "from-indigo-900 to-purple-900",
      accent: "bg-indigo-900/40",
      lightColor: "#4c1d95",
      tempColor: "#6366f1"
    },
    work: {
      title: "Work Mode",
      description: "Enhanced lighting and settings for productivity",
      icon: <Monitor className="h-8 w-8 text-white/80" />,
      gradient: "from-amber-400 to-orange-600",
      accent: "bg-amber-500/40",
      lightColor: "#fbbf24",
      tempColor: "#f97316"
    },
    relax: {
      title: "Relax Mode",
      description: "Ambient lighting and calm atmosphere",
      icon: <Sun className="h-8 w-8 text-white/80" />,
      gradient: "from-green-400 to-teal-500",
      accent: "bg-emerald-400/40",
      lightColor: "#6ee7b7",
      tempColor: "#10b981"
    },
    eco: {
      title: "Eco Mode",
      description: "Energy efficient settings to reduce consumption",
      icon: <Earth className="h-8 w-8 text-white/80" />,
      gradient: "from-green-600 to-emerald-700",
      accent: "bg-green-600/40",
      lightColor: "#6ee7b7",
      tempColor: "#047857"
    },
  };

  // Helper function to get current mode details
  const getCurrentMode = () => modeDetails[activeMode as keyof typeof modeDetails] || modeDetails.default;

  return (
    <div className="w-full rounded-xl overflow-hidden h-64 md:h-96 relative mb-6 shadow-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-br ${getCurrentMode().gradient}`}
        >
          {/* Virtual 3D Room */}
          <div className="absolute inset-0 perspective-1000">
            {/* Floor */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-black/10 backdrop-blur-sm"
              initial={{ rotateX: 60, scaleY: 0.7, y: 20, opacity: 0 }}
              animate={{ rotateX: 60, scaleY: 0.7, y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            ></motion.div>
            
            {/* Back Wall */}
            <motion.div 
              className={`absolute top-0 left-0 right-0 h-3/5 ${getCurrentMode().accent} backdrop-blur-sm`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            ></motion.div>
            
            {/* Window on the wall */}
            {(activeMode === "default" || activeMode === "work" || activeMode === "eco") && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="absolute top-[15%] right-[15%] w-24 h-28 md:w-32 md:h-36 rounded-t-xl bg-blue-100/40 border border-white/30 flex items-center justify-center overflow-hidden"
              >
                <div className="absolute inset-0 flex flex-col">
                  <div className="h-full w-px bg-white/50 mx-auto"></div>
                  <div className="h-px w-full bg-white/50 my-auto"></div>
                </div>
                {activeMode === "eco" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-b from-blue-400/50 to-blue-200/50"
                  >
                    <motion.div
                      className="absolute top-0 right-0 h-8 w-8 rounded-full bg-yellow-200/80"
                      animate={{ y: [-20, 15], opacity: [0.9, 0.5] }}
                      transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                    />
                  </motion.div>
                )}
                {activeMode === "default" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-400/50 to-blue-200/50"></div>
                )}
                {activeMode === "work" && (
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-300/50 to-yellow-200/50">
                    <motion.div
                      className="absolute top-5 right-5 h-10 w-10 rounded-full bg-yellow-300/80"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                )}
              </motion.div>
            )}
            
            {/* Bed element for sleep mode */}
            {activeMode === "sleep" && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-[30%] left-[20%] right-[20%] h-[25%] rounded-t-lg bg-purple-200/30"
              >
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-4 rounded-t-lg bg-purple-300/30"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute top-1/2 left-5 w-2 h-2 bg-indigo-300/70 rounded-full"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            )}
            
            {/* Relax Mode Elements */}
            {activeMode === "relax" && (
              <>
                <motion.div
                  className="absolute bottom-[30%] left-[15%] w-16 h-16 rounded-lg bg-teal-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-2 rounded-lg bg-teal-400/30"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-teal-500/10 to-transparent"
                >
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-20 bg-teal-300/20 rounded-full"
                      style={{ 
                        left: `${15 + i * 15}%`,
                        bottom: '-5px',
                        transformOrigin: 'bottom'
                      }}
                      animate={{ 
                        scaleY: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ 
                        duration: 2 + i * 0.5, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </motion.div>
              </>
            )}
            
            {/* Smart Lighting */}
            <motion.div 
              className="absolute top-[15%] left-[15%] w-10 h-10 rounded-full"
              style={{ backgroundColor: getCurrentMode().lightColor }}
              animate={{ 
                opacity: [0.7, 0.9, 0.7],
                boxShadow: [
                  `0 0 15px 5px ${getCurrentMode().lightColor}40`,
                  `0 0 25px 10px ${getCurrentMode().lightColor}60`,
                  `0 0 15px 5px ${getCurrentMode().lightColor}40`
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.div 
                className="absolute inset-2 rounded-full bg-white/80"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
            
            {/* Smart Device/Thermostat */}
            <motion.div 
              className="absolute bottom-[20%] right-[15%] w-14 h-20 rounded-lg bg-black/40 backdrop-blur-lg flex flex-col items-center justify-center p-2 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.div 
                className="w-9 h-9 rounded-full mb-2 flex items-center justify-center"
                style={{ backgroundColor: getCurrentMode().tempColor }}
              >
                {activeMode === "eco" && <Zap className="w-5 h-5 text-white/90" />}
                {activeMode === "sleep" && <Moon className="w-5 h-5 text-white/90" />}
                {(activeMode === "default" || activeMode === "work") && <Lightbulb className="w-5 h-5 text-white/90" />}
                {activeMode === "relax" && <Sun className="w-5 h-5 text-white/90" />}
              </motion.div>
              <motion.div 
                className="w-8 h-2 rounded-full bg-white/30"
                animate={{ width: activeMode === "eco" ? 4 : activeMode === "sleep" ? 5 : activeMode === "work" ? 8 : 6 }}
                transition={{ duration: 1 }}
              />
              <motion.div 
                className="w-6 h-1.5 rounded-full bg-white/20 mt-1"
                animate={{ width: activeMode === "eco" ? 3 : activeMode === "sleep" ? 4 : activeMode === "work" ? 6 : 5 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </motion.div>
            
            {/* Mode-specific ambient particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {activeMode === "sleep" && (
                <>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-1 h-1 bg-indigo-200 rounded-full"
                      initial={{ 
                        x: Math.random() * 100 + '%', 
                        y: Math.random() * 100 + '%', 
                        opacity: 0 
                      }}
                      animate={{ 
                        y: ['0%', '100%'],
                        opacity: [0, 0.7, 0], 
                      }}
                      transition={{ 
                        duration: 5 + Math.random() * 10, 
                        repeat: Infinity, 
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </>
              )}
              
              {activeMode === "work" && (
                <>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-1.5 h-6 bg-orange-300/30 rounded-full"
                      initial={{ 
                        x: Math.random() * 100 + '%', 
                        y: '100%', 
                        opacity: 0 
                      }}
                      animate={{ 
                        y: ['-100%', '100%'],
                        opacity: [0, 0.6, 0], 
                      }}
                      transition={{ 
                        duration: 8 + Math.random() * 7, 
                        repeat: Infinity, 
                        delay: Math.random() * 5,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </>
              )}
              
              {activeMode === "eco" && (
                <>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: i % 3 === 0 ? '#059669' : '#10b981',
                        opacity: 0.3 + (i % 5) * 0.1
                      }}
                      initial={{ 
                        x: Math.random() * 100 + '%', 
                        y: Math.random() * 100 + '%',
                        scale: 0.2
                      }}
                      animate={{ 
                        rotate: 360,
                        x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                        scale: [0.2, 0.7, 0.2]
                      }}
                      transition={{ 
                        duration: 15 + Math.random() * 20, 
                        repeat: Infinity, 
                        ease: "linear"
                      }}
                    />
                  ))}
                </>
              )}
              
              {activeMode === "relax" && (
                <>
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute w-10 h-10 rounded-full bg-teal-300/10"
                      initial={{ 
                        x: Math.random() * 100 + '%', 
                        y: Math.random() * 100 + '%',
                        scale: 0.1,
                        opacity: 0
                      }}
                      animate={{ 
                        scale: [0.1, 0.6, 0.1],
                        opacity: [0, 0.3, 0]
                      }}
                      transition={{ 
                        duration: 10 + Math.random() * 5, 
                        repeat: Infinity,
                        delay: Math.random() * 5
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Mode Information */}
          <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <motion.div
              className="relative z-10" 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center mb-2">
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mr-3">
                  {getCurrentMode().icon}
                </div>
                <div>
                  <motion.h3 
                    className="text-xl font-medium text-white mb-1"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {getCurrentMode().title}
                  </motion.h3>
                  <motion.p 
                    className="text-white/80 text-sm md:text-base max-w-sm"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {getCurrentMode().description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RoomModeVisualizer;
