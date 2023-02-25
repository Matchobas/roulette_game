import { useMemo, useState } from 'react';
import { AddOptionForm } from './components/AddOptionForm';
import { RoulleteOption } from './model/RoulleteOption';
import './styles/global.css';

export function App() {
  const [rouletteOptions, setRouletteOptions] = useState<RoulleteOption[]>([]);
  const [winner, setWinner] = useState('');

  function handleNewOption(option: RoulleteOption) {
    setRouletteOptions([...rouletteOptions, option]);
  }

  const chancesArray = useMemo(() => {
    const roulleteChances: string[] = [];
    rouletteOptions.forEach((roullete) => {
      let amount = roullete.percentage;
      while (amount > 0) {
        roulleteChances.push(roullete.title);
        amount -= 1;
      }
    });

    return roulleteChances;
  }, [rouletteOptions]);

  function handleChooseWinner() {
    const winnerIndex = Math.floor(Math.random() * chancesArray.length);

    setWinner(chancesArray[winnerIndex]);
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-zinc-700'>
      <div className='w-1/2 flex flex-col items-center justify-center gap-2 mr-4'>
        <span className='text-3xl text-white font-extrabold'>{winner}</span>
        <button 
          className='px-8 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors' 
          type='button' 
          onClick={() => handleChooseWinner()}
        >
          Rolar
        </button>
      </div>
      <AddOptionForm rouletteOptions={rouletteOptions} saveOption={handleNewOption} />
    </div>
  )
}