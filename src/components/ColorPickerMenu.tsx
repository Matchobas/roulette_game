import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerMenuProps {
  wheelColors: string[];
  handleWheelColors: (colors: string[]) => void;
}

export function ColorPickerMenu({
  wheelColors,
  handleWheelColors
}: ColorPickerMenuProps) {
  const [color, setColor] = useState("#000000");
  const [colorOptionSelected, setColorOptionSelected] = useState(0);

  useEffect(() => {
    const newColors = wheelColors.map((c, i) => {
      if (i === colorOptionSelected) return color;
      return c;
    });
    handleWheelColors(newColors);
  }, [color]);

  return (
    <div className="fixed">
      <div className="flex items-start gap-3">
        {wheelColors.map((_, index) => {
          return (
            <button
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full p-3 text-white text-xl bg-black ${
                colorOptionSelected === index ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => setColorOptionSelected(index)}
            >
              {index}
            </button>
          );
        })}
      </div>
      <HexColorPicker
        color={wheelColors[colorOptionSelected]}
        onChange={setColor}
      />
    </div>
  );
}
