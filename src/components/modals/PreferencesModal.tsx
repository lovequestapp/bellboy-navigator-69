
import React, { useState } from "react";
import { X } from "lucide-react";
import { usePreferences } from "@/contexts/PreferencesContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import ColorPicker from "@/components/ui/ColorPicker";

interface PreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type PreferenceTab = "theme" | "notifications" | "language" | "currency";

const PreferencesModal: React.FC<PreferencesModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { preferences, updatePreferences } = usePreferences();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<PreferenceTab>("theme");

  const handleSave = () => {
    updatePreferences(preferences);
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully.",
    });
    onOpenChange(false);
  };

  const handleColorChange = (color: string) => {
    document.documentElement.style.setProperty("--bellboy-color", color);
    updatePreferences({ ...preferences, accentColor: color });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-serif">Preferences</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X size={18} />
          </Button>
        </DialogHeader>

        <Tabs
          defaultValue="theme"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as PreferenceTab)}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
            <TabsTrigger value="currency">Currency</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode" className="font-medium">
                  Dark Mode
                </Label>
                <Switch
                  id="dark-mode"
                  checked={preferences.darkMode}
                  onCheckedChange={(checked) =>
                    updatePreferences({ ...preferences, darkMode: checked })
                  }
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium">Accent Color</Label>
                <ColorPicker
                  selectedColor={preferences.accentColor || "#0F1E54"}
                  onChange={handleColorChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-animations" className="font-medium">
                  Reduce Animations
                </Label>
                <Switch
                  id="reduce-animations"
                  checked={preferences.reduceAnimations}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      ...preferences,
                      reduceAnimations: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="font-medium">
                  High Contrast
                </Label>
                <Switch
                  id="high-contrast"
                  checked={preferences.highContrast}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      ...preferences,
                      highContrast: checked,
                    })
                  }
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications" className="font-medium">
                  Email Notifications
                </Label>
                <Switch
                  id="email-notifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      ...preferences,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications" className="font-medium">
                  Push Notifications
                </Label>
                <Switch
                  id="push-notifications"
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      ...preferences,
                      pushNotifications: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="marketing-emails" className="font-medium">
                    Marketing Emails
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new features and promotions
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={preferences.marketingEmails}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      ...preferences,
                      marketingEmails: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="data-collection"
                  checked={preferences.dataCollection}
                  onCheckedChange={(checked) =>
                    updatePreferences({
                      ...preferences,
                      dataCollection: checked === true,
                    })
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor="data-collection"
                    className="font-medium cursor-pointer"
                  >
                    Data Collection
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect usage data to improve your experience
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="language" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language" className="font-medium">
                  Display Language
                </Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value) =>
                    updatePreferences({ ...preferences, language: value })
                  }
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="ja">Japanese</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date-format" className="font-medium">
                  Date Format
                </Label>
                <Select
                  value={preferences.dateFormat}
                  onValueChange={(value) =>
                    updatePreferences({ ...preferences, dateFormat: value })
                  }
                >
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-format" className="font-medium">
                  Time Format
                </Label>
                <Select
                  value={preferences.timeFormat}
                  onValueChange={(value) =>
                    updatePreferences({ ...preferences, timeFormat: value })
                  }
                >
                  <SelectTrigger id="time-format">
                    <SelectValue placeholder="Select time format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                    <SelectItem value="24h">24-hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="currency" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency" className="font-medium">
                  Display Currency
                </Label>
                <Select
                  value={preferences.currency}
                  onValueChange={(value) =>
                    updatePreferences({ ...preferences, currency: value })
                  }
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                    <SelectItem value="CAD">CAD ($)</SelectItem>
                    <SelectItem value="AUD">AUD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button variant="outline" className="mr-2" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-bellboy text-white hover:bg-bellboy-light">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;
