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
    <>
      <form
        onSubmit={(event) => {handleAddOption(event)}}
      >
        <input
          type={'text'}
          placeholder={'Add your roulette option'}
          onChange={(e) => setOption(e.target.value)}
        />
        <button type='submit'>
          Adicionar
        </button>
      </form>
      <div className='w-full h-screen font-extrabold flex items-center justify-center'>
        {rouletteOptions}
      </div>
    </>
  )
}