import { X } from "phosphor-react"
import { RouletteOptionModel } from "../model/RouletteOptionModel"

interface RouletteOptionProps {
  option: RouletteOptionModel;
  removeOption: (index: number) => void;
  index: number;
}

export function RouletteOption({ option, removeOption, index }: RouletteOptionProps) {
  return (
    <div className='flex justify-center items-center'>
      <span className='font-extrabold text-white'>
        {option.percentage}
      </span>
      <span className='font-extrabold text-white ml-2'>
        {option.title}
      </span>
      <button 
        type='button' 
        onClick={() => { 
          removeOption(index); 
        }}
      >
        <X size={14} color="white" className='ml-5'/>
      </button>
    </div>
  )
}