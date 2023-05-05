import { ArrowLeft, FloppyDisk, Minus, Shuffle } from "phosphor-react";
import { WheelOptionModel } from "../model/WheelOptionModel";
import { AddOptionForm } from "./AddOptionForm";
import { WheelOption } from "./WheelOption";
import { api } from "../utils/api";
import { ImportFormDropzone } from "./ImportFormDropzone";
import { DeleteAllOptions } from "./DeleteAllOptions";

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
    const now = new Date;
    const saveOptionsData = {
      name: now.getTime(),
      options: wheelOptions
    }
    api
    .post("/export", saveOptionsData, { responseType: "blob" })
    .then((response) => response.data)
    .then((data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${saveOptionsData.name}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  function handleShuffleOptions() {
    const rearrengedOptions = wheelOptions;
    for(let i = rearrengedOptions.length - 1; i > 0; i--) {
      const toChange = Math.floor(Math.random() * (i + 1));
      [rearrengedOptions[i], rearrengedOptions[toChange]] = [rearrengedOptions[toChange], rearrengedOptions[i]]
    }

    handleWheelOptions(rearrengedOptions);
  }

  return (
    <>
      <div 
        className={`flex h-[600px] flex-col justify-start items-center p-5 bg-zinc-600 border-white border-[3px] rounded-md transition-all duration-300 ease-out ${
          isModalOpen ? 'opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <header className="w-full flex justify-between items-start">
          <b className="text-white text-xl">Options</b>
          <div>
            <button onClick={() => handleShuffleOptions()}>
              <Shuffle size={20} weight="bold" className='text-white mr-4' />
            </button>
            <ImportFormDropzone handleWheelOptions={handleWheelOptions} isModalOpen={isModalOpen} />
            <button disabled={wheelOptions.length ? false : true} onClick={() => handleOptionsSaveFile()}>
              <FloppyDisk size={20} weight="bold" className={`text-white mr-4 ${
                wheelOptions.length ? 'opacity-100' : 'opacity-30'
              }`} />
            </button>
            <DeleteAllOptions wheelOptions={wheelOptions} handleWheelOptions={handleWheelOptions} />
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