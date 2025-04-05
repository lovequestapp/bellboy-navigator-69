import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/hooks/use-toast";
import { 
  DoorOpen, Thermometer, Lightbulb, Lock, Volume2, Tv, 
  PhoneCall, WifiIcon, Activity, Battery, Bluetooth,
  Settings, Cloud, Power, Cog, Home, Monitor, Earth
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import RoomModeVisualizer from "./RoomModeVisualizer";
import { motion } from "framer-motion";

<lov-add-dependency>framer-motion@latest</lov-add-dependency>

interface SmartRoomProps {
  roomNumber: string;
  hotel: {
    name: string;
    id: string;
  };
}

const SmartRoomAccess: React.FC<SmartRoomProps> = ({ roomNumber, hotel }) => {
  const isMobile = useIsMobile();
  const [doorUnlocked, setDoorUnlocked] = useState(false);
  const [temperature, setTemperature] = useState(72);
  const [lightsOn, setLightsOn] = useState({
    main: false,
    bathroom: false,
    bedside: false,
    ambient: false
  });
  const [tvOn, setTvOn] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [roomMode, setRoomMode] = useState<string>("default");
  const [wifiConnected, setWifiConnected] = useState(true);
  const [roomService, setRoomService] = useState(false);
  const [energyUsage, setEnergyUsage] = useState(0);
  const [syncStatus, setSyncStatus] = useState("Connected");
  const [syncInterval, setSyncInterval] = useState<number | null>(null);

  useEffect(() => {
    let usage = 0;
    if (lightsOn.main) usage += 15;
    if (lightsOn.bathroom) usage += 10;
    if (lightsOn.bedside) usage += 5;
    if (lightsOn.ambient) usage += 8;
    if (tvOn) usage += 30;
    
    setEnergyUsage(usage);
  }, [lightsOn, tvOn]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const syncSuccess = Math.random() > 0.05;
      
      if (syncSuccess) {
        setSyncStatus("Connected");
      } else {
        setSyncStatus("Reconnecting...");
        setTimeout(() => setSyncStatus("Connected"), 3000);
      }
    }, 30000);
    
    setSyncInterval(interval);
    return () => {
      if (syncInterval) clearInterval(syncInterval);
    };
  }, []);

  const handleUnlockDoor = () => {
    setDoorUnlocked(true);
    toast({
      title: "Door Unlocked",
      description: `Room ${roomNumber} door has been unlocked. Auto-lock in 30 seconds.`
    });
    
    setTimeout(() => {
      setDoorUnlocked(false);
      toast({
        title: "Door Locked",
        description: `Room ${roomNumber} door has been automatically locked.`
      });
    }, 30000);
  };

  const handleTemperatureChange = (value: number) => {
    setTemperature(value);
    toast({
      title: "Temperature Adjusted",
      description: `Room temperature set to ${value}°F`
    });
  };

  const handleLightToggle = (light: keyof typeof lightsOn) => {
    setLightsOn(prev => {
      const newState = { ...prev, [light]: !prev[light] };
      toast({
        title: `${light.charAt(0).toUpperCase() + light.slice(1)} Lights`,
        description: newState[light] ? "Turned on" : "Turned off"
      });
      return newState;
    });
  };

  const toggleDoNotDisturb = () => {
    setDoNotDisturb(prev => !prev);
    toast({
      title: "Do Not Disturb",
      description: !doNotDisturb ? "Activated" : "Deactivated"
    });
  };

  const toggleCurtains = () => {
    setCurtainsOpen(prev => !prev);
    toast({
      title: "Smart Curtains",
      description: !curtainsOpen ? "Opened" : "Closed"
    });
  };

  const handleRoomModeChange = (value: string) => {
    if (!value) return;
    
    setRoomMode(value);
    
    switch (value) {
      case "sleep":
        setLightsOn({ main: false, bathroom: false, bedside: true, ambient: false });
        setTemperature(68);
        setDoNotDisturb(true);
        setCurtainsOpen(false);
        setTvOn(false);
        break;
      case "work":
        setLightsOn({ main: true, bathroom: false, bedside: true, ambient: false });
        setTemperature(72);
        setDoNotDisturb(true);
        setCurtainsOpen(true);
        setTvOn(false);
        break;
      case "relax":
        setLightsOn({ main: false, bathroom: false, bedside: false, ambient: true });
        setTemperature(74);
        setDoNotDisturb(true);
        setCurtainsOpen(false);
        setTvOn(true);
        break;
      case "eco":
        setLightsOn({ main: false, bathroom: false, bedside: false, ambient: false });
        setTemperature(76);
        setDoNotDisturb(false);
        setCurtainsOpen(true);
        setTvOn(false);
        break;
      default:
        setLightsOn({ main: true, bathroom: false, bedside: false, ambient: false });
        setTemperature(72);
        setDoNotDisturb(false);
        setCurtainsOpen(true);
        break;
    }
    
    toast({
      title: "Room Mode Activated",
      description: `${value.charAt(0).toUpperCase() + value.slice(1)} mode settings applied`
    });
  };

  const toggleRoomService = () => {
    setRoomService(prev => !prev);
    toast({
      title: "Room Service",
      description: !roomService 
        ? "Your request has been sent to hotel staff" 
        : "Room service request canceled"
    });
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
        <div>
          <h1 className="text-3xl font-serif font-semibold bg-gradient-to-r from-bellboy to-bellboy-light bg-clip-text text-transparent">
            Smart Room Control
          </h1>
          <p className="text-muted-foreground">
            Control your room's features remotely
          </p>
        </div>
        <div className="flex items-center mt-4 md:mt-0 space-x-4">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${syncStatus === "Connected" ? "bg-green-500" : "bg-yellow-500 animate-pulse"}`}></div>
            <span className="text-sm text-muted-foreground">{syncStatus}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-bellboy/20 text-bellboy hover:bg-bellboy/10"
            onClick={() => toast({
              title: "Synchronizing with Hotel Systems",
              description: "Refreshing connection to hotel network"
            })}
          >
            <Cloud className="h-4 w-4 mr-2" />
            Sync
          </Button>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-r from-bellboy/5 to-transparent border-bellboy/10">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center justify-center p-3 bg-white/60 dark:bg-black/10 backdrop-blur-sm rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">Temperature</span>
                <div className="flex items-center">
                  <Thermometer size={14} className="text-bellboy mr-1" />
                  <span className="text-lg font-semibold">{temperature}°F</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-3 bg-white/60 dark:bg-black/10 backdrop-blur-sm rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">Energy Usage</span>
                <div className="flex items-center">
                  <Activity size={14} className="text-bellboy mr-1" />
                  <span className="text-lg font-semibold">{energyUsage}W</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-3 bg-white/60 dark:bg-black/10 backdrop-blur-sm rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">Door</span>
                <div className="flex items-center">
                  <Lock size={14} className={doorUnlocked ? "text-red-500 mr-1" : "text-green-500 mr-1"} />
                  <span className="text-lg font-semibold">{doorUnlocked ? "Unlocked" : "Locked"}</span>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center p-3 bg-white/60 dark:bg-black/10 backdrop-blur-sm rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">Room Mode</span>
                <div className="flex items-center">
                  <Home size={14} className="text-bellboy mr-1" />
                  <span className="text-lg font-semibold capitalize">{roomMode}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-bellboy/20 hover:border-bellboy/40 transition-colors overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center">
              <Settings className="mr-2 text-bellboy" size={20} />
              Room Modes
            </CardTitle>
            <CardDescription>
              Quick presets to set your perfect environment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RoomModeVisualizer activeMode={roomMode} />
            
            <ToggleGroup 
              type="single" 
              value={roomMode} 
              onValueChange={handleRoomModeChange} 
              className="grid grid-cols-2 md:grid-cols-5 gap-2"
            >
              <ToggleGroupItem value="default" className="flex-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-bellboy data-[state=on]:to-bellboy-light data-[state=on]:text-white">
                <Home className="mr-2 h-4 w-4" />
                Default
              </ToggleGroupItem>
              <ToggleGroupItem value="sleep" className="flex-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-bellboy data-[state=on]:to-bellboy-light data-[state=on]:text-white">
                <Settings className="mr-2 h-4 w-4" />
                Sleep
              </ToggleGroupItem>
              <ToggleGroupItem value="work" className="flex-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-bellboy data-[state=on]:to-bellboy-light data-[state=on]:text-white">
                <Monitor className="mr-2 h-4 w-4" />
                Work
              </ToggleGroupItem>
              <ToggleGroupItem value="relax" className="flex-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-bellboy data-[state=on]:to-bellboy-light data-[state=on]:text-white">
                <Settings className="mr-2 h-4 w-4" />
                Relax
              </ToggleGroupItem>
              <ToggleGroupItem value="eco" className="flex-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-bellboy data-[state=on]:to-bellboy-light data-[state=on]:text-white">
                <Earth className="mr-2 h-4 w-4" />
                Eco
              </ToggleGroupItem>
            </ToggleGroup>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-bellboy/20 hover:border-bellboy/40 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif text-lg flex items-center">
                  <DoorOpen className="mr-2 text-bellboy" size={20} />
                  Door Access
                </CardTitle>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${doorUnlocked ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm text-muted-foreground">{doorUnlocked ? 'Unlocked' : 'Locked'}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Room {roomNumber}</p>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={handleUnlockDoor} 
                  disabled={doorUnlocked}
                  className="bg-bellboy hover:bg-bellboy-light text-white"
                >
                  Unlock Door <Lock className="ml-2" size={16} />
                </Button>
                
                <Button
                  onClick={toggleCurtains}
                  variant="outline"
                  className="border-bellboy/30 text-bellboy"
                >
                  {curtainsOpen ? "Close Curtains" : "Open Curtains"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-bellboy/20 hover:border-bellboy/40 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="font-serif text-lg flex items-center">
                <Thermometer className="mr-2 text-bellboy" size={20} />
                Climate Control
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-medium">{temperature}°F</span>
              </div>
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  onClick={() => handleTemperatureChange(Math.max(65, temperature - 1))}
                  disabled={temperature <= 65}
                >
                  -
                </Button>
                <div className="w-full mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-red-500" 
                    style={{ width: `${((temperature - 65) / 20) * 100}%` }}
                  ></div>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => handleTemperatureChange(Math.min(85, temperature + 1))}
                  disabled={temperature >= 85}
                >
                  +
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-bellboy/20 hover:border-bellboy/40 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg flex items-center">
              <Lightbulb className="mr-2 text-bellboy" size={20} />
              Lighting Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${lightsOn.main ? 'bg-yellow-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                    <Lightbulb size={16} className={lightsOn.main ? 'text-yellow-500' : 'text-gray-400'} />
                  </div>
                  <Label htmlFor="main-light">Main Lights</Label>
                </div>
                <Switch
                  id="main-light"
                  checked={lightsOn.main}
                  onCheckedChange={() => handleLightToggle('main')}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${lightsOn.bathroom ? 'bg-yellow-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                    <Lightbulb size={16} className={lightsOn.bathroom ? 'text-yellow-500' : 'text-gray-400'} />
                  </div>
                  <Label htmlFor="bathroom-light">Bathroom</Label>
                </div>
                <Switch
                  id="bathroom-light"
                  checked={lightsOn.bathroom}
                  onCheckedChange={() => handleLightToggle('bathroom')}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${lightsOn.bedside ? 'bg-yellow-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                    <Lightbulb size={16} className={lightsOn.bedside ? 'text-yellow-500' : 'text-gray-400'} />
                  </div>
                  <Label htmlFor="bedside-light">Bedside</Label>
                </div>
                <Switch
                  id="bedside-light"
                  checked={lightsOn.bedside}
                  onCheckedChange={() => handleLightToggle('bedside')}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full ${lightsOn.ambient ? 'bg-yellow-100' : 'bg-gray-100'} flex items-center justify-center mr-3`}>
                    <Lightbulb size={16} className={lightsOn.ambient ? 'text-yellow-500' : 'text-gray-400'} />
                  </div>
                  <Label htmlFor="ambient-light">Ambient</Label>
                </div>
                <Switch
                  id="ambient-light"
                  checked={lightsOn.ambient}
                  onCheckedChange={() => handleLightToggle('ambient')}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="border-bellboy/20 hover:border-bellboy/40 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="font-serif text-lg">Room Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3`}>
                    <PhoneCall size={16} className="text-bellboy" />
                  </div>
                  <div>
                    <Label htmlFor="dnd-switch">Do Not Disturb</Label>
                    <p className="text-xs text-muted-foreground">Prevent staff from disturbing</p>
                  </div>
                </div>
                <Switch
                  id="dnd-switch"
                  checked={doNotDisturb}
                  onCheckedChange={toggleDoNotDisturb}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3`}>
                    <Tv size={16} className="text-bellboy" />
                  </div>
                  <div>
                    <Label htmlFor="tv-switch">Television</Label>
                    <p className="text-xs text-muted-foreground">Power on/off</p>
                  </div>
                </div>
                <Switch
                  id="tv-switch"
                  checked={tvOn}
                  onCheckedChange={() => setTvOn(prev => !prev)}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-3`}>
                    <WifiIcon size={16} className="text-bellboy" />
                  </div>
                  <div>
                    <Label htmlFor="wifi-switch">Wi-Fi</Label>
                    <p className="text-xs text-muted-foreground">Room guest network</p>
                  </div>
                </div>
                <Switch
                  id="wifi-switch"
                  checked={wifiConnected}
                  onCheckedChange={() => setWifiConnected(prev => !prev)}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                className="w-full border border-bellboy text-white bg-bellboy hover:bg-bellboy-light"
                onClick={toggleRoomService}
              >
                {roomService ? "Cancel Room Service" : "Request Room Service"}
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full border-bellboy text-bellboy hover:bg-bellboy hover:text-white"
              onClick={() => {
                toast({
                  title: "Room Reset",
                  description: "All room settings have been reset to default"
                });
                setLightsOn({ main: false, bathroom: false, bedside: false, ambient: false });
                setTemperature(72);
                setTvOn(false);
                setDoNotDisturb(false);
                setCurtainsOpen(false);
                setRoomMode("default");
              }}
            >
              Reset All Settings
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="flex items-center justify-between text-xs text-muted-foreground mt-10 px-2">
          <div className="flex items-center">
            <Activity size={14} className="mr-1" />
            <span>System v2.4.1</span>
          </div>
          
          <div className="flex items-center">
            <Bluetooth size={14} className="mr-1" />
            <span>Connected</span>
          </div>
          
          <div className="flex items-center">
            <Battery size={14} className="mr-1" />
            <span>Power: 98%</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SmartRoomAccess;
