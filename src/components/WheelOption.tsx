import { X } from "phosphor-react"
import { WheelOptionModel } from "../model/WheelOptionModel"

interface WheelOptionProps {
  option: WheelOptionModel;
  removeOption: (index: number) => void;
  index: number;
}

export function WheelOption({ option, removeOption, index }: WheelOptionProps) {
  return (
    <div className='w-full min-h-[37px] flex justify-between items-center bg-gray-900 rounded-md'>
      <div className="flex items-center">
        <span className='font-extrabold text-white ml-2'>
          {option.percentage}
        </span>
        <span className='font-extrabold text-white ml-5'>
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