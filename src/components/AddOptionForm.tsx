import { Plus } from "phosphor-react";
import { FormEvent, useState } from "react";
import { WheelOptionModel } from "../model/WheelOptionModel";

interface AddOptionForm {
  saveOption: (option: WheelOptionModel) => void;
}

export function AddOptionForm({ saveOption }: AddOptionForm) {
  const [option, setOption] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(100);

  function handleAddOption(event: FormEvent) {
    event.preventDefault();

    const newOption = { title: option, percentage };
    if (option && percentage > 0) {
      saveOption(newOption);
    }

    setOption('');
  }
  
  return (
      <form
        className='flex flex-col items-center justify-center gap-3'
        onSubmit={(event) => {handleAddOption(event)}}
      >
        <div>
          <input
            type={'text'}
            defaultValue={percentage}
            value={percentage}
            onChange={(e) => {
              const valueAsNumber = Number(e.target.value);
              if (!isNaN(valueAsNumber)) {           
                setPercentage(valueAsNumber)
              } else {
                setPercentage((prev) => prev);
              }
            }}
            className='w-12 p-2 mr-[2px] rounded-l-md'
          />
          <input
            type={'text'}
            placeholder={'Add a new option to the wheel'}
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className='p-2 h-10'
          />
          <button type='submit' className='min-w-[60px] px-2 h-10 bg-zinc-400 text-white rounded-r-md hover:bg-zinc-500 transition-colors'>
            {/* <Plus size={14} /> */}
            Add
          </button>
        </div>
      </form>
  )
}