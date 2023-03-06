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

  function handleRemoveOption(index: number) {
    const updatedOptions = wheelOptions.filter((option) => wheelOptions.indexOf(option) !== index);
    handleWheelOptions(updatedOptions);
  }

  return (
    <div className='flex h-[600px] flex-col justify-start items-center gap-2 p-3 bg-zinc-600 border-white border-[3px] rounded-md'>
      <b className="text-white text-xl">Options</b>
      <AddOptionForm saveOption={handleNewOption} />
      {wheelOptions.map((option, index) => 
          <WheelOption
            key={`${option.title}-${index}`}
            index={index}
            option={option} 
            removeOption={handleRemoveOption}
          />
        )}
    </div>
  )
}