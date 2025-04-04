
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { DoorOpen, Thermometer, Lightbulb, Lock, Volume2, Tv, PhoneCall, WifiIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
    bedside: false
  });
  const [tvOn, setTvOn] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  
  const handleUnlockDoor = () => {
    setDoorUnlocked(true);
    // Simulate door unlocking
    toast({
      title: "Door Unlocked",
      description: `Room ${roomNumber} door has been unlocked.`
    });
    
    // Auto-lock after 30 seconds
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-semibold">Smart Room Controls</h2>
      <p className="text-muted-foreground">Control your room's features from anywhere</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Door Access Card */}
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
            <div className="space-y-4">
              <Button 
                onClick={handleUnlockDoor} 
                disabled={doorUnlocked}
                className="w-full bg-bellboy hover:bg-bellboy-light text-white"
              >
                Unlock Door <Lock className="ml-2" size={16} />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Climate Control Card */}
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
      </div>
      
      {/* Lighting Controls */}
      <Card className="border-bellboy/20 hover:border-bellboy/40 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-lg flex items-center">
            <Lightbulb className="mr-2 text-bellboy" size={20} />
            Lighting Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
        </CardContent>
      </Card>
      
      {/* Room Settings */}
      <Card className="border-bellboy/20 hover:border-bellboy/40 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="font-serif text-lg">Room Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              setLightsOn({ main: false, bathroom: false, bedside: false });
              setTemperature(72);
              setTvOn(false);
              setDoNotDisturb(false);
            }}
          >
            Reset All Settings
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SmartRoomAccess;
