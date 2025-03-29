
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
    { name: "Royal Blue", value: "#2A3F7E", textColor: "text-white" },
    { name: "Gold", value: "#D4AF37", textColor: "text-black" },
    { name: "Silver", value: "#C0C0C0", textColor: "text-black" },
    { name: "Burgundy", value: "#800020", textColor: "text-white" },
    { name: "Forest", value: "#228B22", textColor: "text-white" },
    { name: "Purple", value: "#4B0082", textColor: "text-white" },
    { name: "Teal", value: "#008080", textColor: "text-white" },
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
                : "hover:scale-105"
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
