
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { usePreferences } from "@/contexts/PreferencesContext";
import ColorPicker from "@/components/ui/ColorPicker";

interface PreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PreferencesFormValues {
  notifications: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  language: string;
  currency: string;
  theme: string;
}

const PreferencesModal: React.FC<PreferencesModalProps> = ({ open, onOpenChange }) => {
  const { preferences, updatePreferences } = usePreferences();
  
  const form = useForm<PreferencesFormValues>({
    defaultValues: {
      notifications: preferences.notifications,
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      language: "english",
      currency: "usd",
      theme: preferences.darkMode ? "dark" : "light",
    },
  });
  
  const handleNotificationsChange = (checked: boolean) => {
    form.setValue("notifications", checked);
    updatePreferences({ notifications: checked });
  };
  
  const handleThemeChange = (value: string) => {
    form.setValue("theme", value);
    updatePreferences({ darkMode: value === "dark" });
  };
  
  const handleAccentColorChange = (color: string) => {
    updatePreferences({ accentColor: color });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-serif">Preferences</DialogTitle>
          <DialogDescription>
            Customize your app experience and notification settings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 mt-2">
          <Form {...form}>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <FormLabel>All Notifications</FormLabel>
                    <Switch
                      checked={form.watch("notifications")}
                      onCheckedChange={handleNotificationsChange}
                    />
                  </div>
                  
                  <div className="ml-4 space-y-3">
                    <FormField
                      control={form.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0 py-1">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!form.watch("notifications")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pushNotifications"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0 py-1">
                          <FormLabel>Push Notifications</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!form.watch("notifications")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0 py-1">
                          <FormLabel>Marketing Emails</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!form.watch("notifications")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Regional Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="usd">USD ($)</SelectItem>
                            <SelectItem value="eur">EUR (€)</SelectItem>
                            <SelectItem value="gbp">GBP (£)</SelectItem>
                            <SelectItem value="jpy">JPY (¥)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Appearance</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Theme</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => handleThemeChange(value)}
                            defaultValue={field.value}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="light" id="light" />
                              <FormLabel htmlFor="light">Light</FormLabel>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="dark" />
                              <FormLabel htmlFor="dark">Dark</FormLabel>
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div>
                    <FormLabel>Accent Color</FormLabel>
                    <ColorPicker
                      selectedColor={preferences.accentColor}
                      onChange={handleAccentColorChange}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Privacy</h3>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="analytics"
                    render={({ field }) => (
                      <FormItem className="flex space-x-3 space-y-0 py-1">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Share analytics data</FormLabel>
                          <FormDescription>
                            Help us improve by sharing anonymous usage data
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;
