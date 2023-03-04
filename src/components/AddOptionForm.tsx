import { FormEvent, useState } from "react";
import { RouletteOptionModel } from "../model/RouletteOptionModel";

interface AddOptionForm {
  saveOption: (option: RouletteOptionModel) => void;
}

export function AddOptionForm({ saveOption }: AddOptionForm) {
  const [option, setOption] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(100);

  function handleAddOption(event: FormEvent) {
    event.preventDefault();

    const newOption = { title: option, percentage };
    if (option) {
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
            onChange={(e) => setPercentage(Number(e.target.value))}
            className='w-12 p-2 mr-[2px] rounded-l-md'
          />
          <input
            type={'text'}
            placeholder={'Add a new roulette option'}
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className='p-2 h-10'
          />
          <button type='submit' className='min-w-[60px] px-2 h-10 bg-zinc-500 text-white rounded-r-md hover:bg-zinc-600 transition-colors'>
            Add
          </button>
        </div>
      </form>
  )
}