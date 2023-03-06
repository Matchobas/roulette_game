import { X } from 'phosphor-react';
import { useMemo, useState } from 'react';
import { AddOptionForm } from './components/AddOptionForm';
import { WheelOfFortune } from './components/WheelOfFortune';
import { WheelOption } from './components/WheelOption';
import { WheelOptionModel } from './model/WheelOptionModel';
import './styles/global.css';

export function App() {
  const [wheelOptions, setWheelOptions] = useState<WheelOptionModel[]>([]);
  const [winner, setWinner] = useState('');
  const [spin, setSpin] = useState(false);

  function handleNewOption(option: WheelOptionModel) {
    setWheelOptions([...wheelOptions, option]);
  }

  function handleRemoveOption(index: number) {
    const updatedOptions = wheelOptions.filter((option) => wheelOptions.indexOf(option) !== index);
    setWheelOptions(updatedOptions);
  }

  const chancesArray = useMemo(() => {
    const wheelChances: string[] = [];
    wheelOptions.forEach((wheel) => {
      let amount = wheel.percentage;
      while (amount > 0) {
        wheelChances.push(wheel.title);
        amount -= 1;
      }
    });

    return wheelChances;
  }, [wheelOptions]);

  function handleChooseWinner() {
    const winnerIndex = Math.floor(Math.random() * chancesArray.length);

    setWinner(chancesArray[winnerIndex]);
  }

  function stopWheel() {
    setSpin(false);
  }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-zinc-700'>
      <div className='w-1/2 flex flex-col items-center justify-center gap-2 mr-4'>
        <WheelOfFortune options={wheelOptions} spin={spin} stopSpin={stopWheel} />
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
      <div className='flex flex-col justify-center items-center gap-2'>
        <AddOptionForm saveOption={handleNewOption} />
        {wheelOptions.map((option, index) => 
            <WheelOption 
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