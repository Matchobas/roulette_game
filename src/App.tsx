import { ArrowLeft} from 'phosphor-react';
import { useEffect, useState } from 'react';
import { OptionsMenu } from './components/OptionsMenu';
import { WheelOfFortune } from './components/WheelOfFortune';
import { WheelOptionModel } from './model/WheelOptionModel';
import './styles/global.css';

const optionsTest: WheelOptionModel[] = [
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
  {
    title: "D",
    percentage: 100
  },
]

export function App() {
  const [wheelOptions, setWheelOptions] = useState<WheelOptionModel[]>([]);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(true);

  function handleWheelOptions(options: WheelOptionModel[]) {
    setWheelOptions([...options]);
  }

  function handleOptionsModal() {
    setIsOptionsModalOpen(!isOptionsModalOpen);
  }

  useEffect(() => {
    const currentSavedWheelOptions = localStorage.getItem('savedOptions');
    if (currentSavedWheelOptions) {
      console.log(JSON.parse(currentSavedWheelOptions));
      setWheelOptions(JSON.parse(currentSavedWheelOptions));
    }
  }, []);

  useEffect(() => {
    console.log(wheelOptions);
    if (wheelOptions.length > 0) localStorage.setItem('savedOptions', JSON.stringify(wheelOptions));
  }, [wheelOptions]);

  return (
    <div className='w-full h-screen flex items-center justify-center bg-zinc-700'>
      <div className='w-1/2 flex flex-col items-center justify-center gap-2 mr-4'>
        <WheelOfFortune options={wheelOptions} />
      </div>

      { isOptionsModalOpen ? (
          <OptionsMenu 
            wheelOptions={wheelOptions} 
            handleWheelOptions={handleWheelOptions} 
            handleOptionsModal={handleOptionsModal}
          />
        ) : (
          <button
            className='fixed right-28'
            onClick={() => handleOptionsModal()}
          >
            <ArrowLeft size={32} className="text-white" />
          </button>
        )
      }
      
    </div>
  )
}