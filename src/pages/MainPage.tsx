import { useEffect, useState } from "react";

import { OptionsMenu } from "../components/OptionsMenu";
import { WheelOfFortune } from "../components/WheelOfFortune";
import { WheelOptionModel } from "../model/WheelOptionModel";

const storagedOptions = localStorage.getItem("savedOptions");
let currentSavedWheelOptions: WheelOptionModel[] = [];
if (storagedOptions) {
  currentSavedWheelOptions = JSON.parse(storagedOptions);
}

export function MainPage() {
  const [wheelOptions, setWheelOptions] = useState<WheelOptionModel[]>(
    currentSavedWheelOptions
  );
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(true);
  const [colors, setColors] = useState(["#000000", "#ffffff", "#808080"]);

  function handleWheelOptions(options: WheelOptionModel[]) {
    setWheelOptions([...options]);
  }

  function handleOptionsModal(state: boolean) {
    setIsOptionsModalOpen(state);
  }

  function handleWheelColors(colors: string[]) {
    setColors([...colors]);
  }

  useEffect(() => {
    localStorage.setItem("savedOptions", JSON.stringify(wheelOptions));
  }, [wheelOptions]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-zinc-700 overflow-hidden">
      <div
        className={`flex w-1/2 flex-col items-center justify-center gap-2 mr-4 transition-all duration-300 ${
          isOptionsModalOpen ? "translate-x-0" : "translate-x-1/4"
        }`}
      >
        <WheelOfFortune
          options={wheelOptions}
          canvasSize={650}
          colors={colors}
        />
      </div>

      <OptionsMenu
        wheelOptions={wheelOptions}
        isModalOpen={isOptionsModalOpen}
        wheelColors={colors}
        handleWheelOptions={handleWheelOptions}
        handleOptionsModal={handleOptionsModal}
        handleWheelColors={handleWheelColors}
      />
    </div>
  );
}
