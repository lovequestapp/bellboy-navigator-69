
import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ColorOption {
  name: string;
  value: string;
  textColor: string;
}

interface ColorPickerProps {
  selectedColor: string;
  onChange: (color: string) => void;
  className?: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onChange,
  className,
}) => {
  const colorOptions: ColorOption[] = [
    { name: "Navy", value: "#0F1E54", textColor: "text-white" },
    { name: "Royal Blue", value: "#1A365D", textColor: "text-white" },
    { name: "Gold", value: "#B7922A", textColor: "text-black" },
    { name: "Burgundy", value: "#800020", textColor: "text-white" },
    { name: "Charcoal", value: "#333333", textColor: "text-white" },
    { name: "Emerald", value: "#046307", textColor: "text-white" },
    { name: "Plum", value: "#5B2C60", textColor: "text-white" },
    { name: "Teal", value: "#005E63", textColor: "text-white" },
    { name: "Slate", value: "#404E5C", textColor: "text-white" },
    { name: "Amber", value: "#FF8C00", textColor: "text-black" },
    { name: "Crimson", value: "#DC143C", textColor: "text-white" },
    { name: "Forest", value: "#0B5345", textColor: "text-white" },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-4 gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            className={cn(
              "w-full aspect-square rounded-md flex items-center justify-center relative transition-all",
              selectedColor === color.value
                ? "ring-2 ring-black dark:ring-white ring-offset-2"
                : "hover:scale-105 hover:shadow-lg"
            )}
            style={{ backgroundColor: color.value }}
            onClick={() => onChange(color.value)}
            title={color.name}
          >
            {selectedColor === color.value && (
              <Check className={cn("h-4 w-4", color.textColor)} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
