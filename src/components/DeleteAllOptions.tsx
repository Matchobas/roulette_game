import { Trash } from "phosphor-react";
import { WheelOptionModel } from "../model/WheelOptionModel"

interface DeleteAllOptionsProps {
  wheelOptions: WheelOptionModel[];
  handleWheelOptions: (options: WheelOptionModel[]) => void;
}

export function DeleteAllOptions({ wheelOptions, handleWheelOptions }: DeleteAllOptionsProps) {
  return (
    <button disabled={wheelOptions.length ? false : true} onClick={() => handleWheelOptions([])}>
      <Trash size={20} weight="bold" className={`text-white mr-4 ${
        wheelOptions.length ? 'opacity-100' : 'opacity-30'
      }`} />
    </button>
  )
}