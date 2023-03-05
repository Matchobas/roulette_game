import { X } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { AddOptionForm } from './components/AddOptionForm';
import { Roulette } from './components/Roulette';
import { RouletteOption } from './components/RouletteOption';
import { RouletteOptionModel } from './model/RouletteOptionModel';
import './styles/global.css';

export function App() {
  const [rouletteOptions, setRouletteOptions] = useState<RouletteOptionModel[]>([]);
  const [winner, setWinner] = useState('');
  const [spin, setSpin] = useState(false);

  function handleNewOption(option: RouletteOptionModel) {
    setRouletteOptions([...rouletteOptions, option]);
  }

  function handleRemoveOption(index: number) {
    const updatedOptions = rouletteOptions.filter((option) => rouletteOptions.indexOf(option) !== index);
    setRouletteOptions(updatedOptions);
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

  function stopRoulette() {
    setSpin(false);
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-zinc-700'>
      <div className='w-1/2 flex flex-col items-center justify-center gap-2 mr-4'>
        <Roulette options={rouletteOptions} spin={spin} stopSpin={stopRoulette} />
        {/* <span className='text-3xl text-white font-extrabold'>{winner}</span> */}
        <button 
          className='px-8 py-2 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors' 
          type='button' 
          onClick={() => {
            handleChooseWinner()
            setSpin(true)
          }}
        >
          Spin
        </button>
      </div>
      <div className='flex flex-col justify-center items-center gap-6'>
        <AddOptionForm saveOption={handleNewOption} />
        {rouletteOptions.map((option, index) => 
            <RouletteOption 
              key={`${option.title}-${index}`}
              index={index}
              option={option} 
              removeOption={handleRemoveOption}
            />
          )}
      </div>
    </div>
  )
}