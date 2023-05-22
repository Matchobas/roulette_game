import { FloppyDisk, Minus, PaintBrush, Shuffle } from "phosphor-react";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { WheelOptionModel } from "../model/WheelOptionModel";
import { api } from "../utils/api";
import { DeleteAllOptions } from "./DeleteAllOptions";
import { ImportFormDropzone } from "./ImportFormDropzone";

interface OptionsHeaderProps {
  isModalOpen: boolean;
  wheelOptions: WheelOptionModel[];
  wheelColors: string[];
  handleWheelOptions: (options: WheelOptionModel[]) => void;
  handleOptionsModal: (state: boolean) => void;
  handleWheelColors: (colors: string[]) => void;
}

export function OptionsHeader({
  isModalOpen,
  wheelOptions,
  wheelColors,
  handleWheelOptions,
  handleOptionsModal,
  handleWheelColors
}: OptionsHeaderProps) {
  const [isServerOnline, setIsServerOnline] = useState(true);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [color, setColor] = useState("#aabbcc");
  const [colorOptionSelected, setColorOptionSelected] = useState(0);

  function handleOptionsSaveFile() {
    const now = new Date();
    const saveOptionsData = {
      name: now.getTime(),
      options: wheelOptions
    };
    api
      .post("/export", saveOptionsData, { responseType: "blob" })
      .then((response) => response.data)
      .then((data) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${saveOptionsData.name}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  function handleShuffleOptions() {
    const rearrengedOptions = wheelOptions;
    for (let i = rearrengedOptions.length - 1; i > 0; i -= 1) {
      const toChange = Math.floor(Math.random() * (i + 1));
      [rearrengedOptions[i], rearrengedOptions[toChange]] = [
        rearrengedOptions[toChange],
        rearrengedOptions[i]
      ];
    }

    handleWheelOptions(rearrengedOptions);
  }

  useEffect(() => {
    api
      .get("/healthcheck")
      .then((res) => console.log(res))
      .catch(() => {
        setIsServerOnline(false);
      });
  }, []);

  useEffect(() => {
    const newColors = wheelColors.map((c, i) => {
      if (i === colorOptionSelected) return color;
      return c;
    });
    handleWheelColors(newColors);
  }, [color]);

  return (
    <header className="w-full flex justify-between items-start">
      <b className="text-white text-xl">Options</b>
      <div>
        <button onClick={() => handleShuffleOptions()}>
          <Shuffle size={20} weight="bold" className="text-white mr-4" />
        </button>
        <button onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}>
          <PaintBrush size={20} weight="bold" className="text-white mr-4" />
        </button>
        {isColorPickerOpen && (
          <div className="fixed">
            <div className="flex items-start gap-3">
              {wheelColors.map((color, index) => {
                return (
                  <button
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center rounded-full p-3 text-white text-xl bg-black ${
                      colorOptionSelected === index
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                    onClick={() => setColorOptionSelected(index)}
                  >
                    {index}
                  </button>
                );
              })}
            </div>
            <HexColorPicker color={color} onChange={setColor} />
          </div>
        )}
        {isServerOnline && (
          <>
            <ImportFormDropzone
              handleWheelOptions={handleWheelOptions}
              isModalOpen={isModalOpen}
            />
            <button
              disabled={!wheelOptions.length}
              onClick={() => handleOptionsSaveFile()}
            >
              <FloppyDisk
                size={20}
                weight="bold"
                className={`text-white mr-4 ${
                  wheelOptions.length ? "opacity-100" : "opacity-30"
                }`}
              />
            </button>
          </>
        )}
        <DeleteAllOptions
          wheelOptions={wheelOptions}
          handleWheelOptions={handleWheelOptions}
        />
        <button onClick={() => handleOptionsModal(false)}>
          <Minus size={20} weight="bold" className="text-white" />
        </button>
      </div>
    </header>
  );
}
