import { useEffect, useState } from 'react';
import { OptionsMenu } from './components/OptionsMenu';
import { WheelOfFortune } from './components/WheelOfFortune';
import { WheelOptionModel } from './model/WheelOptionModel';
import './styles/global.css';

const optionsTestingObject: WheelOptionModel[] = [
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

const storagedOptions = localStorage.getItem('savedOptions');
let currentSavedWheelOptions: WheelOptionModel[] = [];
if (storagedOptions) {
  currentSavedWheelOptions = JSON.parse(storagedOptions);
}

export function App() {
  const [wheelOptions, setWheelOptions] = useState<WheelOptionModel[]>(currentSavedWheelOptions);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(true);

  function handleWheelOptions(options: WheelOptionModel[]) {
    setWheelOptions([...options]);
  }

  function handleOpenModal() {
    setIsOptionsModalOpen(true);
  }

  function handleCloseModal() {
    setIsOptionsModalOpen(false);
  }

  useEffect(() => {
    localStorage.setItem('savedOptions', JSON.stringify(wheelOptions));
  }, [wheelOptions]);

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-zinc-700'>
      <div className={`flex w-1/2 flex-col items-center justify-center gap-2 mr-4 transition-all duration-300 ${
        isOptionsModalOpen ? '-translate-x-0' : 'translate-x-1/4'
      }`}>
        <WheelOfFortune options={wheelOptions} />
      </div>

      <OptionsMenu
        wheelOptions={wheelOptions} 
        handleWheelOptions={handleWheelOptions}
        isModalOpen={isOptionsModalOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />

      {/* { isOptionsModalOpen ? (
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
      } */}
      
    </div>
  )
}