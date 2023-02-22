import { FormEvent, useState } from 'react';
import './styles/global.css';

interface RoulleteOption {
  title: string;
  percentage: number;
}

export function App() {
  const [option, setOption] = useState<string>('');
  const [percentage, setPercentage] = useState<number>(100);
  const [rouletteOptions, setRouletteOptions] = useState<RoulleteOption[]>([]);

  function handleAddOption(event: FormEvent) {
    event.preventDefault();

    if (option) {
      setRouletteOptions([...rouletteOptions, { title: option, percentage }]);
    }
  }

  function handleChooseWinner() {
    console.log("Winner");
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-zinc-700'>
      <div className='w-1/2 flex flex-col items-center justify-center gap-2 mr-4'>
        <button 
          className='px-8 py-2 bg-purple-500 text-white rounded-lg font-bold' 
          type='button' 
          onClick={() => handleChooseWinner()}
        >
          Rolar
        </button>
      </div>
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
    </div>
  )
}