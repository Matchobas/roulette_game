import { ArrowLeft, FloppyDisk, Minus } from "phosphor-react";
import { WheelOptionModel } from "../model/WheelOptionModel";
import { AddOptionForm } from "./AddOptionForm";
import { WheelOption } from "./WheelOption";
import { api } from "../utils/api";

interface OptionMenuProps {
  wheelOptions: WheelOptionModel[];
  handleWheelOptions: (options: WheelOptionModel[]) => void;
  isModalOpen: boolean;
  handleOptionsModal: (state: boolean) => void;
}

export function OptionsMenu({ 
  wheelOptions,
  handleWheelOptions,
  isModalOpen,
  handleOptionsModal
}: OptionMenuProps) {
  function handleNewOption(option: WheelOptionModel) {
    handleWheelOptions([...wheelOptions, option]);
  }

  function handleUpdateOption(percentage: number, title: string, index: number) {
    wheelOptions[index].percentage = percentage;
    wheelOptions[index].title = title;
  
    handleWheelOptions([...wheelOptions]);
  }

  function handleRemoveOption(index: number) {
    const updatedOptions = wheelOptions.filter((option) => wheelOptions.indexOf(option) !== index);
    handleWheelOptions(updatedOptions);
  }
  
  function handleOptionsSaveFile() {
    api.get("/").then((response) => response.data).then((data) => console.log(data));
  }

  return (
    <>
      <div 
        className={`flex h-[600px] flex-col justify-start items-center p-5 bg-zinc-600 border-white border-[3px] rounded-md transition-all duration-300 ease-out transform ${
          isModalOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <header className="w-full flex justify-between items-start">
          <b className="text-white text-xl">Options</b>
          <div>
            <button onClick={() => handleOptionsSaveFile()}>
              <FloppyDisk size={20} weight="bold" className="text-white mr-4 opacity-30" />
            </button>
            <button onClick={() => handleOptionsModal(false)}>
              <Minus size={20} weight="bold" className="text-white" />
            </button>
          </div>
        </header>
        <AddOptionForm saveOption={handleNewOption} />
        <div className="w-full flex flex-col items-start gap-2 overflow-y-auto">
          {wheelOptions.map((option, index) => 
            <WheelOption
              key={`option-${index}`}
              index={index}
              option={option}
              updateOption={handleUpdateOption}
              removeOption={handleRemoveOption}
            />
          )}
        </div>
      </div>

      <button
        className={`fixed right-28 transition-all ease-in transform ${
          isModalOpen ? 'duration-300 translate-x-full opacity-0' : 'duration-500 translate-x-0 opacity-100'
        }`}
        onClick={() => handleOptionsModal(true)}
        disabled={isModalOpen}
      >
        <ArrowLeft size={32} className="text-white" />
      </button>
    </>
  )
}