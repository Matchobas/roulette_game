import { WheelOptionModel } from "../model/WheelOptionModel";
import { AddOptionForm } from "./AddOptionForm";
import { WheelOption } from "./WheelOption";

interface OptionMenuProps {
  wheelOptions: WheelOptionModel[];
  handleWheelOptions: (options: WheelOptionModel[]) => void;
}

export function OptionsMenu({ wheelOptions, handleWheelOptions }: OptionMenuProps) {
  function handleNewOption(option: WheelOptionModel) {
    handleWheelOptions([...wheelOptions, option]);
  }

  function handleUpdateOption(percentage: number, title: string, index: number) {
    wheelOptions[index].percentage = percentage;
    wheelOptions[index].title = title;

    console.log(wheelOptions[index].title);
  
    handleWheelOptions([...wheelOptions]);
  }

  function handleRemoveOption(index: number) {
    const updatedOptions = wheelOptions.filter((option) => wheelOptions.indexOf(option) !== index);
    handleWheelOptions(updatedOptions);
  }

  return (
    <div className='flex h-[600px] flex-col justify-start items-center p-5 bg-zinc-600 border-white border-[3px] rounded-md'>
      <b className="text-white text-xl">Options</b>
      <AddOptionForm saveOption={handleNewOption} />
      <div className="w-full flex flex-col items-center gap-2 overflow-y-auto">
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
  )
}