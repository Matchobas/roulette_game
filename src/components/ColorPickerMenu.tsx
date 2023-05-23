import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

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

  function handleNewWheelColors() {
    const newColors = wheelColors.map((c, i) => {
      if (i === colorOptionSelected) return color;
      return c;
    });
    localStorage.setItem("savedWheelColors", JSON.stringify(newColors));
    handleWheelColors(newColors);
  }

  return (
    <div className="fixed flex-col bg-gray-300 p-3 rounded-md">
      <div className="flex items-start gap-3">
        {wheelColors.map((_, index) => {
          return (
            <button
              key={index}
              className={`h-8 w-8 flex items-center justify-center rounded-full p-3 text-white text-xl bg-black ${
                colorOptionSelected === index ? "opacity-100" : "opacity-50"
              }`}
              onClick={() => setColorOptionSelected(index)}
            >
              {index}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col items-start gap-5">
        <HexColorPicker
          className="top-2"
          color={wheelColors[colorOptionSelected]}
          onChange={setColor}
        />

        <HexColorInput
          className="w-[200px]"
          color={wheelColors[colorOptionSelected]}
          onChange={setColor}
        />
      </div>
      <button
        className="p-2 rounded-md bg-green-500 text-white font-bold hover:bg-green-600 transition-colors mt-3"
        onClick={() => handleNewWheelColors()}
      >
        Apply
      </button>
    </div>
  );
}
