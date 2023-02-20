import { FormEvent, useState } from 'react';
import './styles/global.css';

export function App() {
  const [option, setOption] = useState<string>('');
  const [rouletteOptions, setRouletteOptions] = useState<string[]>([]);

  function handleAddOption(event: FormEvent) {
    event.preventDefault();

    if (option) {
      setRouletteOptions([...rouletteOptions, option]);
    }
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-zinc-700'>
      <form
        className='flex flex-col items-center justify-center gap-3'
        onSubmit={(event) => {handleAddOption(event)}}
      >
        <input
          type={'text'}
          placeholder={'Add a new roulette option'}
          onChange={(e) => setOption(e.target.value)}
          className='p-2 ring-4 ring-blue-800'
        />
        <button type='submit' className='w-40 h-10 bg-zinc-500 text-white rounded-lg hover:bg-zinc-600 transition-colors'>
          Adicionar
        </button>
      </form>
      <div className='font-extrabold'>
        {rouletteOptions}
      </div>
    </div>
  )
}