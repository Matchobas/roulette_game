import { X } from "phosphor-react"
import { WheelOptionModel } from "../model/WheelOptionModel"

interface WheelOptionProps {
  option: WheelOptionModel;
  updateOption: (percentage: number, title: string, index: number) => void;
  removeOption: (index: number) => void;
  index: number;
}

export function WheelOption({ option, updateOption, removeOption, index }: WheelOptionProps) {
  return (
    <div className='w-full min-h-[37px] flex justify-between items-center bg-gray-900 rounded-md'>
      <div className="flex items-center">
        <input
          type={'text'}
          defaultValue={option.percentage}
          value={option.percentage}
          onChange={(e) => {
            const valueAsNumber = Number(e.target.value);
            if (!isNaN(valueAsNumber)) {           
              updateOption(valueAsNumber, option.title, index);
            } else {
              updateOption(option.percentage, option.title, index);
            }
          }}
          className='font-extrabold text-white w-12 p-2 mr-[2px] bg-gray-900 rounded-md'
        />
        <span className='font-extrabold text-white'>
          {option.title}
        </span>
      </div>
      <button 
        type='button' 
        onClick={() => { 
          removeOption(index); 
        }}
      >
        <X size={14} color="white" className='mr-2'/>
      </button>
    </div>
  )
}