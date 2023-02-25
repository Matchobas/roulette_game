import { FormEvent, useState } from "react";
import { RoulleteOption } from "../model/RoulleteOption";

interface AddOptionForm {
  saveOption: (option: RoulleteOption) => void;
  rouletteOptions: RoulleteOption[];
}

export function AddOptionForm({ saveOption, rouletteOptions }: AddOptionForm) {
  const [option, setOption] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(100);

  function handleAddOption(event: FormEvent) {
    event.preventDefault();

    const newOption = { title: option, percentage };
    if (option) {
      saveOption(newOption);
    }
  }
  
  return (
    <div className='flex flex-col justify-center items-center gap-6'>
        <form
          className='flex flex-col items-center justify-center gap-3'
          onSubmit={(event) => {handleAddOption(event)}}
        >
          <div>
            <input
              type={'text'}
              defaultValue={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              className='w-12 p-2 ring-4 ring-blue-800 mr-2'
            />
            <input
              type={'text'}
              placeholder={'Add a new roulette option'}
              onChange={(e) => setOption(e.target.value)}
              className='p-2 ring-4 ring-blue-800'
            />
          </div>
          <button type='submit' className='w-40 h-10 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600 transition-colors'>
            Adicionar
          </button>
        </form>
        {rouletteOptions.map((option, index) => {
          return (
            <div key={`${option.title}-${index}`}>
              <span className='font-extrabold text-white'>
                {`${option.percentage} `}
              </span>
              <span className='font-extrabold text-white'>
                {option.title}
              </span>
            </div>
          )
        })}
      </div>
  )
}